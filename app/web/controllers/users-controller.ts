import { FastifyReply, FastifyRequest } from 'fastify'
import CreateUserCommand from '../../core/users/commands/create-user-command'
import { CreateUserInput } from '../../core/users/inputs/create-user-input'
import { LoginInput } from '../../core/users/inputs/login-input'
import LoginUserCommand from '../../core/users/commands/login-user-command'
import LogoutUserCommand from '../../core/users/commands/logout-user-command'
import { IRequestInput } from '../@types'
import { ListMealsInput } from '../../core/users/inputs/list-meals-input'
import ListMealsCommand from '../../core/users/commands/list-meals-command'
import { MetricsInput } from '../../core/users/inputs/metrics-input'
import UserMetricsCommand from '../../core/users/commands/user-metrics-command'

export default class UsersController {
  public async create(request: FastifyRequest, reply: FastifyReply) {
    const input = new CreateUserInput(request)

    if (input.isValid && input.data) {
      const createUserCommand = new CreateUserCommand()
      const user = await createUserCommand.execute(input.data)

      reply.status(201).send({ user })
    } else {
      reply
        .status(400)
        .send({ message: input.error && JSON.parse(input.error) })
    }
  }

  public async login(request: FastifyRequest, reply: FastifyReply) {
    const input = new LoginInput(request)

    if (input.isValid && input.data) {
      const loginUserCommand = new LoginUserCommand()

      const sessionId = request.cookies.sessionId

      if (!sessionId) {
        const newSessionID = await loginUserCommand.execute(input.data)

        reply
          .cookie('sessionId', newSessionID, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 7,
          })
          .status(200)
          .send({ message: 'welcome, you are logged in ' })
      }

      reply.status(200).send({ message: 'you are already logged in' })
    } else {
      reply
        .status(400)
        .send({ message: input.error && JSON.parse(input.error) })
    }
  }

  public async logout(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = request.cookies.sessionId

    if (sessionId) {
      const logoutUserCommand = new LogoutUserCommand()

      await logoutUserCommand.execute(sessionId)

      reply
        .clearCookie('sessionId')
        .status(200)
        .send({ message: 'you are logged out' })
    } else {
      reply.status(200).send({ message: 'you were not logged in' })
    }
  }

  public async listMeals(request: IRequestInput, reply: FastifyReply) {
    const input = new ListMealsInput(request)

    if (input.isValid && input.data) {
      const listMealsCommand = new ListMealsCommand()
      const sessionId = request.cookies.sessionId || ''
      const listMealsCommandInput = {
        ...input.data,
        sessionId,
      }

      const meals = await listMealsCommand.execute(listMealsCommandInput)

      reply.status(200).send({ meals })
    } else {
      reply
        .status(400)
        .send({ message: input.error && JSON.parse(input.error) })
    }
  }

  public async metrics(request: IRequestInput, reply: FastifyReply) {
    const input = new MetricsInput(request)

    if (input.isValid && input.data) {
      const userMetricsCommand = new UserMetricsCommand()
      const sessionId = request.cookies.sessionId || ''
      const userMetricsCommandInput = {
        ...input.data,
        sessionId,
      }

      const metrics = await userMetricsCommand.execute(userMetricsCommandInput)

      reply.status(200).send({ metrics })
    } else {
      reply
        .status(400)
        .send({ message: input.error && JSON.parse(input.error) })
    }
  }
}
