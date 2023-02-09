const { gql } = require("@apollo/client");

export const UPDATE_PROFILE = gql`
  mutation Mutation(
    $id: Int
    $firstName: String
    $lastName: String
    $company: String
    $title: String
    $yoe: String
    $imageUrl: String
    $openForWork: Boolean
  ) {
    updateProfile(
      id: $id
      firstName: $firstName
      lastName: $lastName
      company: $company
      title: $title
      yoe: $yoe
      imageUrl: $imageUrl
      openForWork: $openForWork
    ) {
      company
      first_name
      id
      image_url
      initials
      last_name
      open_for_work
      title
    }
  }
`;
