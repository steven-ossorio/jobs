const { gql } = require("@apollo/client");

export const SIGN_UP_USER = gql`
  mutation Register(
    $email: String
    $password: String
    $firstName: String
    $lastName: String
    $title: String
  ) {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      title: $title
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
