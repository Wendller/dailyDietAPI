import { z } from 'zod'
import { IListMealsRequest } from '../@types'
import { IRequestInput } from '../../../web/@types'

export class ListMealsInput {
  data: IListMealsRequest | null
  isValid: boolean
  error: string | null

  constructor(request: IRequestInput) {
    const listMealsSchema = z.object({ userId: z.string() })

    const validation = listMealsSchema.safeParse({
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
