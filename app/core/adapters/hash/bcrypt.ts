import { IHashProviderPort } from '../../ports/hash-provider-port'
import { hash, compare } from 'bcrypt'

export class HashBcryptAdapter implements IHashProviderPort {
  async compare(input: string, hash: string): Promise<boolean> {
    return await compare(input, hash)
  }

  async hash(input: string): Promise<string> {
    const saltRounds = 10

    return await hash(input, saltRounds)
  }
}
