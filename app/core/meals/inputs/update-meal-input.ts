import { z } from 'zod'
import { IUpdateMealRequest } from '../@types'
import { IRequestInput } from '../../../web/@types'

export class UpdateMealInput {
  data: IUpdateMealRequest | null
  isValid: boolean
  error: string | null

  constructor(request: IRequestInput) {
    const updateUserSchema = z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
      createdAt: z.string(),
    })

    const validation = updateUserSchema.safeParse({
      ...request.params,
      ...request.body,
    })

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
