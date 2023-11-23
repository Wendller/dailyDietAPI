import { randomUUID } from 'crypto'
import { HashBcryptAdapter } from '../../adapters/hash/bcrypt'
import { User } from '../../models/user'
import { ICreateUserRequest } from '../@types'
import UserRepository, {
  IUserRepository,
} from '../repositories/user-repository'
import AppError from '../../common/errors'

export default class CreateUserCommand {
  userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async execute(inputData: ICreateUserRequest): Promise<User | null> {
    const userAlreadyExists = await this.userRepository.getByEmail(
      inputData.email,
    )

    if (!userAlreadyExists) {
      const bcryptAdapter = new HashBcryptAdapter()
      const passwordHash = await bcryptAdapter.hash(inputData.password)

      const raw = await this.userRepository.create({
        id: randomUUID(),
        name: inputData.name,
        email: inputData.email,
        password: passwordHash,
      })

      return new User(raw[0])
    } else {
      throw new AppError('Email already in use', 400)
    }
  }
}
