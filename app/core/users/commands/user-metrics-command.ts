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

        const totalMealsOutDiet =
          await this.userRepository.getTotalMealsOutDiet(inputData.userId)

        const mealsInOrder = await this.userRepository.getOrderedMeals(
          inputData.userId,
        )

        let bestMealSequence = 0
        let mealsSequence = ''

        for (const meal of mealsInOrder)
          mealsSequence += String(meal.is_on_diet)

        const onDietSequences = mealsSequence.split('0')

        for (const sequence of onDietSequences) {
          if (sequence.length > bestMealSequence)
            bestMealSequence = sequence.length
        }

        return {
          totalMeals: totalMeals[0].totalMeals,
          totalMealsOnDiet: totalMealsOnDiet[0].totalMealsOnDiet,
          totalMealsOutDiet: totalMealsOutDiet[0].totalMealsOutDiet,
          bestDietSequence: bestMealSequence,
        }
      } else {
        throw new AppError('not allowed', 405)
      }
    }
  }
}
