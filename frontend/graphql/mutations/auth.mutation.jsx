const { gql } = require("@apollo/client");

export const SIGN_UP_USER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $title: String!
    $country: String!
    $state: String!
  ) {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      title: $title
      country: $country
      state: $state
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
