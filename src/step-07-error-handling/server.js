import buildGateway from './index.js'
import Fastify from 'fastify'
import { mercuriusFederationPlugin } from '@mercuriusjs/federation'

import { service1 } from './services/service1.js'
import { service2 } from './services/service2.js'

const createService = async (port, { schema, resolvers }) => {
  const service = Fastify()

  service.register(mercuriusFederationPlugin, {
    schema,
    resolvers,
    graphiql: true,
    jit: 1
  })
  await service.listen({ port })

  return service
}

const start = async () => {
  const gateway = buildGateway()
  await createService(4001, service1)
  await createService(4002, service2)
  await gateway.listen({ port: 3000 })
}

start()
