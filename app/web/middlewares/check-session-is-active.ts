import { FastifyReply, FastifyRequest } from 'fastify'
import UserRepository from '../../core/users/repositories/user-repository'

export async function checkSessionIsActive(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId || ''
  const userRepository = new UserRepository()
  const loggedUser = await userRepository.getBySessionID(sessionId)

  if (!loggedUser) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
}
