import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ILoginInput } from '../@types'

export class LoginInput {
  data: ILoginInput | null
  isValid: boolean
  error: string | null

  constructor(request: FastifyRequest) {
    const loginUserSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const validation = loginUserSchema.safeParse(request.body)

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
