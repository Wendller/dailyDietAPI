import AppError from '../../common/errors'
import { Meal } from '../../models/meal'
import UserRepository, {
  IUserRepository,
} from '../../users/repositories/user-repository'
import { IDeleteMealCommandInput } from '../@types'
import MealRepository, {
  IMealRepository,
} from '../repositories/meal-repository'

export default class DeleteMealCommand {
  mealRepository: IMealRepository
  userRepository: IUserRepository

  constructor() {
    this.mealRepository = new MealRepository()
    this.userRepository = new UserRepository()
  }

  public async execute(inputData: IDeleteMealCommandInput): Promise<void> {
    const raw = await this.mealRepository.getById(inputData.id)

    if (!raw) {
      throw new AppError('meal not found', 404)
    } else {
      const meal = new Meal(raw)

      const currentUser = await this.userRepository.getBySessionID(
        inputData.sessionId,
      )

      const isUserAllowed = currentUser.id === meal.userId

      if (isUserAllowed) {
        await this.mealRepository.delete(meal.id)
      } else {
        throw new AppError('not allowed', 405)
      }
    }
  }
}
