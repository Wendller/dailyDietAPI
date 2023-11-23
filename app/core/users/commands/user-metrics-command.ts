import AppError from '../../common/errors'
import { User } from '../../models/user'
import UserRepository, {
  IUserRepository,
} from '../repositories/user-repository'
import { IMetricsCommandInput, IMetricsResponse } from '../@types'
import MealRepository, {
  IMealRepository,
} from '../../meals/repositories/meal-repository'

export default class UserMetricsCommand {
  userRepository: IUserRepository
  mealRepository: IMealRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.mealRepository = new MealRepository()
  }

  public async execute(
    inputData: IMetricsCommandInput,
  ): Promise<IMetricsResponse> {
    const raw = await this.userRepository.getById(inputData.userId)

    if (!raw) {
      throw new AppError('user not found', 404)
    } else {
      const isAllowed = new User(raw).sessionID === inputData.sessionId

      if (isAllowed) {
        const totalMeals = await this.userRepository.getTotalMeals(
          inputData.userId,
        )

        const totalMealsOnDiet = await this.userRepository.getTotalMealsOnDiet(
          inputData.userId,
        )

        const totalMealsOnuyDiet =
          await this.userRepository.getTotalMealsOutDiet(inputData.userId)

        const mealsInOrder = await this.userRepository.getOrderedMeals(
          inputData.userId,
        )

        let bestMealSequence = 0
        let isSequenceStarted = false
        let stopSequence = false

        while (!stopSequence && mealsInOrder.length > 0) {
          for (const meal of mealsInOrder) {
            if (!isSequenceStarted && meal.is_on_diet === 1) {
              isSequenceStarted = true
              bestMealSequence++
            } else if (isSequenceStarted && meal.is_on_diet === 1) {
              bestMealSequence++
            } else {
              stopSequence = true
              break
            }
          }
        }

        return {
          totalMeals: totalMeals[0].totalMeals,
          totalMealsOnDiet: totalMealsOnDiet[0].totalMealsOnDiet,
          totalMealsOutDiet: totalMealsOnuyDiet[0].totalMealsOutDiet,
          bestDietSequence: bestMealSequence,
        }
      } else {
        throw new AppError('not allowed', 405)
      }
    }
  }
}
