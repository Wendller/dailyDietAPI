import { z } from 'zod'
import { IGetMealRequest } from '../@types'
import { IRequestInput } from '../../../web/@types'

export class GetMealInput {
  data: IGetMealRequest | null
  isValid: boolean
  error: string | null

  constructor(request: IRequestInput) {
    const getUserSchema = z.object({ id: z.string() })

    const validation = getUserSchema.safeParse({
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
