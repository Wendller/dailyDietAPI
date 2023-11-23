import { z } from 'zod'
import { IMetricsRequest } from '../@types'
import { IRequestInput } from '../../../web/@types'

export class MetricsInput {
  data: IMetricsRequest | null
  isValid: boolean
  error: string | null

  constructor(request: IRequestInput) {
    const metricsSchema = z.object({ userId: z.string() })

    const validation = metricsSchema.safeParse({
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
