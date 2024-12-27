import { users } from '../data.js'

const service1 = {
  schema: `
  extend type Query {
    me: User
  }
  
  type User @key(fields: "id") {
    id: String!
    name: String!
  }
  `,

  resolvers: {
    Query: {
      me: () => {
        return users[0]
      }
    },
    User: {
      __resolveReference: user => {
        return users.find(u => u.id === user.id)
      }
    }
  }
}

export { service1 }
