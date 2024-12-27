import Fastify from 'fastify'
import mercuriusGateway from '@mercuriusjs/gateway'

export default function buildGateway() {
  const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    }
  })

  server.register(mercuriusGateway, {
    jit: 1,
    graphiql: true,
    gateway: {
      services: [
        { name: 'users', url: 'http://localhost:4001/graphql' },
        { name: 'posts', url: 'http://localhost:4002/graphql' }
      ]
    }
  })

  return server
}
