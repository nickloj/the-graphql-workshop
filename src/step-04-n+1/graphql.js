import { loadPets, ownersByPetNames } from './lib/db.js'

const users = [
  {
    name: 'Alice',
    locale: 'en'
  },
  {
    name: 'Bob',
    locale: 'de'
  },
  {
    name: 'Johnny',
    locale: 'da'
  }
]

const schema = `
  type Person {
    name: String!
    locale: String!
  }

  type Pet {
    name: String!
    owner: Person
  }

  type Query {
    pets: [Pet]
    getUserByLocale: Person
  }
`

const resolvers = {
  Query: {
    pets(_, __, context) {
      return loadPets(context.app.pg)
    },
    getUserByLocale(_, __, context) {
      return users.find(u => u.locale === context.locale)
    }
  }
}

const loaders = {
  Pet: {
    async owner(queries, context) {
      const petNames = queries.map(({ obj }) => obj.name)
      return ownersByPetNames(context.app.pg, petNames)
    }
  }
}

const context = () => ({ locale: 'en' })

export { schema, resolvers, loaders, context }
