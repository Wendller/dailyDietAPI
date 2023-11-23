import { HashBcryptAdapter } from '../../adapters/hash/bcrypt'
import { ILoginInput } from '../@types'
import UserRepository, {
  IUserRepository,
} from '../repositories/user-repository'
import AppError from '../../common/errors'
import { randomUUID } from 'crypto'

export default class LoginUserCommand {
  userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async execute(inputData: ILoginInput): Promise<string> {
    const user = await this.userRepository.getByEmail(inputData.email)

    if (!user) {
      throw new AppError('Invalid user', 401)
    } else {
      const bcryptAdapter = new HashBcryptAdapter()
      const passwordPass = await bcryptAdapter.compare(
        inputData.password,
        user.password,
      )

      if (!passwordPass) {
        throw new AppError('Invalid login', 403)
      }

      const sessionID = randomUUID()

      await this.userRepository.updateSessionID(user.id, sessionID)

      return sessionID
    }
  }
}
