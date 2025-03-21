import Fastify from 'fastify'
import mercurius from 'mercurius'

import { schema, resolvers, loaders } from './graphql.js'
import config from './config.js'

export default function buildServer() {
  const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    }
  })

  server.register(import('@fastify/postgres'), {
    connectionString: config.PG_CONNECTION_STRING
  })

  server.register(mercurius, {
    schema,
    resolvers,
    loaders,
    graphiql: true
  })

  return server
}
