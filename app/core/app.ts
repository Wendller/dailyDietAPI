import fastify from 'fastify'
import { mealsRoutes, usersRoutes } from '../web/routes'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)
app.register(usersRoutes, { prefix: 'users' })
app.register(mealsRoutes, { prefix: 'users/meals' })
