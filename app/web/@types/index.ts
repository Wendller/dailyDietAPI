import { FastifyRequest } from 'fastify'

export interface IParams {
  id?: string
}

export interface IBody {
  name: string
  description: string
  isOnDiet: string
  createdAt: string
}

export type IRequestInput = FastifyRequest<{
  Body?: IBody
  Params: IParams
}>
