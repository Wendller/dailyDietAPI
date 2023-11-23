import { z } from 'zod'
import { IDeleteMealRequest } from '../@types'
import { IRequestInput } from '../../../web/@types'

export class DeleteMealInput {
  data: IDeleteMealRequest | null
  isValid: boolean
  error: string | null

  constructor(request: IRequestInput) {
    const deleteUserSchema = z.object({ id: z.string() })

    const validation = deleteUserSchema.safeParse({
      ...request.params,
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
