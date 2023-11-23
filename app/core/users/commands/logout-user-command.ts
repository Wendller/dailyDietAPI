import UserRepository, {
  IUserRepository,
} from '../repositories/user-repository'

export default class LogoutUserCommand {
  userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async execute(sessionID: string): Promise<void> {
    return await this.userRepository.resetSessionID(sessionID)
  }
}
