import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ICreateMealRequest } from '../@types'

export class CreateMealInput {
  data: ICreateMealRequest | null
  isValid: boolean
  error: string | null

  constructor(request: FastifyRequest) {
    const createUserSchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
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
