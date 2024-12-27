import Fastify from 'fastify'
import mercurius from 'mercurius'
import { typeDefs, resolvers } from './graphql.js'
import { makeExecutableSchema } from '@graphql-tools/schema'

export default function buildServer() {
  const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    }
  })

  server.register(mercurius, {
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
  })

  return server
}
