/**
 * List all types in regards to the application
 *
 * REMEMBER
 *    1 - Set types in alphabetic order
 *    2 - Query + Mutation will be at the end of the page
 *    3 - Naming should also follow a alphabetic ordering when possible
 *
 * @todo Update to Apollo Federation if lines reach over 1000
 *
 * @author Steven Ossorio-Agudelo
 */
const typeDefs = `#graphql
  type Auth {
    token: String
    user: User    
  }

  type Profile {
    id: ID
    firstName: String
    lastName: String
    initials: String
    aboutMe: String
    company: String
    title: String
    yoe: Int
    isOpenForWork: Boolean
    recentlyLaidOff: Boolean
    image_url: String
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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    fetchProfile(userId: Int): Profile 
  }
  type Mutation {
    register(email: String, password: String, firstName: String, lastName: String, title: String): Auth
    login(email: String, password: String): Auth
    updateProfile(id: Int, firstName: String, lastName: String, aboutMe: String, company: String, title: String, yoe: Int, openForWork: Boolean, recentlyLaidOff: Boolean, imageUrl: String, resume: String): Profile
  }
`;

module.exports = typeDefs;
