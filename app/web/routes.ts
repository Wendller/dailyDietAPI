import { FastifyInstance } from 'fastify'
import UsersController from './controllers/users-controller'
import MealsController from './controllers/meals-controller'
import { checkSessionIsActive } from './middlewares/check-session-is-active'
import { IBody, IParams } from './@types'

const usersController = new UsersController()
const mealsController = new MealsController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', usersController.create)
  app.post('/login', usersController.login)
  app.get('/logout', usersController.logout)
  app.get<{ Params: IParams }>(
    '/:userId/meals',
    { preHandler: [checkSessionIsActive] },
    usersController.listMeals,
  )
  app.get<{ Params: IParams }>(
    '/metrics/:userId',
    { preHandler: [checkSessionIsActive] },
    usersController.metrics,
  )
}

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [checkSessionIsActive] }, mealsController.create)
  app.get<{ Params: IParams }>(
    '/:id',
    { preHandler: [checkSessionIsActive] },
    mealsController.get,
  )
  app.put<{ Body: IBody; Params: IParams }>(
    '/:id',
    { preHandler: [checkSessionIsActive] },
    mealsController.update,
  )
  app.delete<{ Params: IParams }>(
    '/:id',
    { preHandler: [checkSessionIsActive] },
    mealsController.delete,
  )
}
