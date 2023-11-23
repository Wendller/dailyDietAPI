import { randomUUID } from 'crypto'
import { Meal } from '../../models/meal'
import UserRepository, {
  IUserRepository,
} from '../../users/repositories/user-repository'
import { ICreateMealCommandInput } from '../@types'
import MealRepository, {
  IMealRepository,
} from '../repositories/meal-repository'

export default class CreateMealCommand {
  mealRepository: IMealRepository
  userRepository: IUserRepository

  constructor() {
    this.mealRepository = new MealRepository()
    this.userRepository = new UserRepository()
  }

  public async execute(
    inputData: ICreateMealCommandInput,
  ): Promise<Meal | null> {
    const loggedUser = await this.userRepository.getBySessionID(
      inputData.sessionId,
    )

    const raw = await this.mealRepository.create({
      id: randomUUID(),
      name: inputData.name,
      description: inputData.description,
      isOnDiet: inputData.isOnDiet,
      userId: loggedUser.id,
    })

    return new Meal(raw[0])
  }
}
