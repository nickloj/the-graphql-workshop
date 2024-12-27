import { posts } from '../data.js'

const service2 = {
  schema: `

  type Post @key(fields: "id") {
    id: String!
    title: String
    content: String
    author: User
  }

  type User @key(fields: "id") @extends {
    id: String! @external
    name: String @external
    posts: [Post]
  }
  extend type Query {
    post(id: ID!): Post
  }

`,
  resolvers: {
    Query: {
      post: (_, { id }) => {
        return posts.find(p => p.id == id)
      }
    },
    Post: {
      author: post => {
        return {
          __typename: 'User',
          id: post.authorId
        }
      }
    },
    User: {
      posts: user => {
        return posts.filter(p => p.authorId === user.id)
      }
    }
  }
}

export { service2 }
