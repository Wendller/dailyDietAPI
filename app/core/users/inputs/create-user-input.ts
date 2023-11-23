import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ICreateUserRequest } from '../@types'

export class CreateUserInput {
  data: ICreateUserRequest | null
  isValid: boolean
  error: string | null

  constructor(request: FastifyRequest) {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const validation = createUserSchema.safeParse(request.body)

    if (validation.success) {
      this.isValid = true
      this.data = validation.data
      this.error = null
    } else {
      this.isValid = false
      this.data = null
      this.error = validation.error.toString()
    }
  }
}
