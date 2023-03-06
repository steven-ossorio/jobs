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
  """
  Values returned dealing with Auth (SignUp/SignIn)
  """
  type Auth {
    token: String!
    user: User!
  }

  """
  All values that populates a Card. 
  """
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
    imageUrl: String
    socials: [Social]
  }

  """
  Socials of a User 
  """
  type Social {
    id: ID!
    name: String!
    url: String
  }

  """
  User basic values
  """
  type User {
    id: ID
    email: String
    first_name: String
    last_name: String
    initials: String
    title: String
    image_url: String
  }

  """
  Query is used to perform GET requests
  """
  type Query {
    fetchProfile(userId: Int): Profile 
    fetchProfiles(isOpenForWork: Boolean, recentlyLaidOff: Boolean, company: String, country: String, state: String, yoe: Int, limit: Int): [Profile]
  }

  """
  Mutation is used to perform POST requests
  """
  type Mutation {
    login(email: String, password: String): Auth
    register(email: String, password: String, firstName: String, lastName: String, title: String): Auth
    updateProfile(id: Int, firstName: String, lastName: String, aboutMe: String, company: String, title: String, yoe: Int, openForWork: Boolean, recentlyLaidOff: Boolean, imageUrl: String, resume: String): Profile
  }
`;

module.exports = typeDefs;
