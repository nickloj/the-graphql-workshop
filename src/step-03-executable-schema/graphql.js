import SQL from '@nearform/sql'

async function loadPets(db) {
  const { rows } = await db.query('SELECT * FROM pets')

  return rows
}

async function ownersByPetNames(db, petNames) {
  const { rows } = await db.query(
    SQL`
      SELECT owners.*
      FROM owners
      INNER JOIN pets
        ON pets.owner = owners.id
        AND pets.name = ANY(${petNames})
      ORDER BY
        ARRAY_POSITION((${petNames}), pets.name)`
  )
  return rows
}

const schema = `
  type Person {
    name: String!
  }

  type Pet {
    name: String!
    owner: Person
  }

  type Query {
    pets: [Pet]
  }
`

const resolvers = {
  Query: {
    pets(_, __, context) {
      return loadPets(context.app.pg)
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

export { schema, resolvers, loaders }
