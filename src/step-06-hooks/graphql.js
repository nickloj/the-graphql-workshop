import mercurius from 'mercurius'
const { ErrorWithProps } = mercurius

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Johnny' }
]

const schema = `
  type Query {
    add(x: Int!, y: Int!): Int
    findUser(id: Int!): User
  }

  type User {
    id: Int!
    name: String!
  }
`

const resolvers = {
  Query: {
    add: async (_, obj) => {
      const { x, y } = obj
      return x + y
    },
    findUser: async (_, obj) => {
      const { id } = obj
      const user = users.find(user => user.id === id)
      if (user) return user
      throw new ErrorWithProps('User not found', {
        code: 'USER_NOT_FOUND',
        id
      })
    }
  }
}

export { schema, resolvers }
