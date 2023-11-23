import { IEnvPort } from '../../ports/env-validator-port'

import { z } from 'zod'

export class EnvZodAdapter implements IEnvPort {
  NODE_ENV: string
  DATABASE_URL: string
  PORT: number

  constructor(env: NodeJS.ProcessEnv) {
    const envSchema = z.object({
      NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('production'),
      DATABASE_URL: z.string().optional(),
      PORT: z.coerce.number().default(8080),
    })

    const _env = envSchema.safeParse(env)

    if (_env.success === false) {
      console.error('⚠️ Invalid environment variables!', _env.error.format())

      throw new Error('Invalid environment variables!')
    }

    this.NODE_ENV = String(env.NODE_ENV)
    this.DATABASE_URL = String(env.DATABASE_URL)
    this.PORT = Number(env.PORT)
  }
}
