import { knex as knexSetup, Knex } from 'knex'
import env from '../core/env'

export const knexConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './app/infra/db/migrations',
  },
}

export const knex = knexSetup(knexConfig)
