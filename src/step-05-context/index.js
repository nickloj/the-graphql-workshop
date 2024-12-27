import Fastify from 'fastify'
import mercurius from 'mercurius'
import { schema, resolvers } from './graphql.js'

export default function buildServer() {
  const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    }
  })

  server.register(mercurius, {
    schema,
    resolvers,
    context: () => ({
      locale: 'en'
    }),
    graphiql: true
  })

  server.ready(() => {
    server.graphql.addHook('preParsing', async function () {
      server.log.info('preParsing called')
    })

    server.graphql.addHook('preValidation', async function () {
      server.log.info('preValidation called')
    })

    server.graphql.addHook('preExecution', async function (schema, document) {
      server.log.info('preExecution called')
      return {
        document,
        errors: [new Error('foo')]
      }
    })

    server.graphql.addHook('onResolution', async function () {
      server.log.info('onResolution called')
    })
  })

  return server
}
