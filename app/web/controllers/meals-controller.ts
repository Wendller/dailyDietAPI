import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateMealInput } from '../../core/meals/inputs/create-meal-input'
import CreateMealCommand from '../../core/meals/commands/create-meal-command'
import { UpdateMealInput } from '../../core/meals/inputs/update-meal-input'
import UpdateMealCommand from '../../core/meals/commands/update-meal-command'
import { IRequestInput } from '../@types'
import { DeleteMealInput } from '../../core/meals/inputs/delete-meal-input'
import DeleteMealCommand from '../../core/meals/commands/delete-meal-command'
import { GetMealInput } from '../../core/meals/inputs/get-meal-input'
import GetMealCommand from '../../core/meals/commands/get-meal-command'

export default class MealsController {
  public async create(request: FastifyRequest, reply: FastifyReply) {
    const input = new CreateMealInput(request)

    if (input.isValid && input.data) {
      const createMealCommand = new CreateMealCommand()
      const sessionId = request.cookies.sessionId || ''
      const createMealRequestBody = {
        ...input.data,
        sessionId,
      }

      const meal = await createMealCommand.execute(createMealRequestBody)

      reply.status(201).send({ meal })
    } else {
      reply
        .status(400)
        .send({ message: input.error && JSON.parse(input.error) })
    }
  }

  public async update(request: IRequestInput, reply: FastifyReply) {
    const input = new UpdateMealInput(request)

    if (input.isValid && input.data) {
      const updatedMealCommand = new UpdateMealCommand()
      const sessionId = request.cookies.sessionId || ''
      const updateMealRequestBody = {
        ...input.data,
        sessionId,
      }

      const updatedMeal = await updatedMealCommand.execute(
        updateMealRequestBody,
      )

      reply.status(200).send({ meal: updatedMeal })
    } else {
      reply
        .status(400)
        .send({ message: input.error && JSON.parse(input.error) })
    }
  }

  public async delete(request: IRequestInput, reply: FastifyReply) {
    const input = new DeleteMealInput(request)

    if (input.isValid && input.data) {
      const deleteMealCommand = new DeleteMealCommand()
      const sessionId = request.cookies.sessionId || ''
      const deleteMealRequestBody = {
        ...input.data,
        sessionId,
      }

      await deleteMealCommand.execute(deleteMealRequestBody)

      reply.status(204).send()
    } else {
      reply
        .status(400)
        .send({ message: input.error && JSON.parse(input.error) })
    }
  }

  public async get(request: IRequestInput, reply: FastifyReply) {
    const input = new GetMealInput(request)

    if (input.isValid && input.data) {
      const getMealCommand = new GetMealCommand()
      const sessionId = request.cookies.sessionId || ''
      const getMealRequestBody = {
        ...input.data,
        sessionId,
      }

      const meal = await getMealCommand.execute(getMealRequestBody)

      reply.status(200).send({ meal })
    } else {
      reply
        .status(400)
        .send({ message: input.error && JSON.parse(input.error) })
    }
  }
}
