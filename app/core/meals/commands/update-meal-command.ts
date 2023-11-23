import AppError from '../../common/errors'
import { Meal } from '../../models/meal'
import UserRepository, {
  IUserRepository,
} from '../../users/repositories/user-repository'
import { IUpdateMealCommandInput } from '../@types'
import MealRepository, {
  IMealRepository,
} from '../repositories/meal-repository'

export default class UpdateMealCommand {
  mealRepository: IMealRepository
  userRepository: IUserRepository

  constructor() {
    this.mealRepository = new MealRepository()
    this.userRepository = new UserRepository()
  }

  public async execute(inputData: IUpdateMealCommandInput): Promise<Meal> {
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
        const updatedMealRawList = await this.mealRepository.update({
          id: inputData.id,
          name: inputData.name,
          description: inputData.description,
          isOnDiet: inputData.isOnDiet,
          createdAt: inputData.createdAt,
        })

        return new Meal(updatedMealRawList[0])
      } else {
        throw new AppError('not allowed', 405)
      }
    }
  }
}
