// import mercurius from 'mercurius'
// const { ErrorWithProps } = mercurius

// const users = {
//   1: {
//     id: '1',
//     name: 'John'
//   },
//   2: {
//     id: '2',
//     name: 'Jane'
//   }
// }

// const schema = `
//   type Query {
//     findUser(id: String!): User
//   }

//   type User {
//     id: ID!
//     name: String
//   }
// `

// const resolvers = {
//   Query: {
//     findUser: (_, { id }) => {
//       const user = users.find(user => user.id === id)

//       if (user) {
//         return user
//       }

//       throw new ErrorWithProps('Invalid User ID', {
//         id,
//         code: 'USER_ID_INVALID'
//       })
//     }
//   }
// }

// export { schema, resolvers }
