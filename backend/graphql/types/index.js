const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID
    email: String
    first_name: String
    last_name: String
    initials: String
    title: String
    image_url: String
  }

  type Auth {
    token: String
    user: User    
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books(email: String, password: String): [Book]
  }
  type Mutation {
    register(email: String, password: String, firstName: String, lastName: String, title: String): Auth
    login(email: String, password: String): Auth
  }
`;

module.exports = typeDefs;
