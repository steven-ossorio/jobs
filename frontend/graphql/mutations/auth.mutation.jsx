const { gql } = require("@apollo/client");

export const SIGN_UP_USER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $country: String!
    $state: String!
    $company: String!
    $title: String!
    $isOpenForWork: Boolean!
    $recentlyLaidOff: Boolean!
    $yoe: Int!
    $skills: String
    $aboutMe: String
    $linkedin: String
    $website: String
  ) {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      country: $country
      state: $state
      company: $company
      title: $title
      isOpenForWork: $isOpenForWork
      recentlyLaidOff: $recentlyLaidOff
      yoe: $yoe
      skills: $skills
      aboutMe: $aboutMe
      linkedin: $linkedin
      website: $website
    ) {
      token
      user {
        id
      }
    }
  }
`;

export const SIGN_IN_USER = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;
