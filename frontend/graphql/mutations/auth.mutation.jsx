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
