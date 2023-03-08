const { gql } = require("@apollo/client");

export const SIGN_UP_USER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $company: String!
    $title: String!
    $country: String!
    $state: String!
    $skills: String
    $aboutMe: String!
    $linkedin: String
    $website: String
  ) {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      company: $company
      title: $title
      country: $country
      state: $state
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
