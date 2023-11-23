import AppError from '../../common/errors'
import { Meal } from '../../models/meal'
import { User } from '../../models/user'
import UserRepository, {
  IUserRepository,
} from '../../users/repositories/user-repository'
import { IListMealsCommandInput } from '../@types'

export default class ListMealsCommand {
  userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async execute(inputData: IListMealsCommandInput): Promise<Meal[]> {
    const raw = await this.userRepository.getById(inputData.userId)

    if (!raw) {
      throw new AppError('user not found', 404)
    } else {
      const isAllowed = new User(raw).sessionID === inputData.sessionId

      if (isAllowed) {
        const raws = await this.userRepository.getMeals(inputData.userId)

        const userMeals = []

        for (const raw of raws) {
          userMeals.push(new Meal(raw))
        }

        return userMeals
      } else {
        throw new AppError('not allowed', 405)
      }
    }
  }
}
