import { config } from 'dotenv'
import { EnvZodAdapter } from '../adapters/env-validator/zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const env = new EnvZodAdapter(process.env)

export default env
