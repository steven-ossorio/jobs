const { gql } = require("@apollo/client");

export const UPDATE_PROFILE = gql`
  mutation Mutation(
    $userId: Int
    $firstName: String
    $lastName: String
    $aboutMe: String
    $company: String
    $title: String
    $yoe: Int
    $openForWork: Boolean
    $recentlyLaidOff: Boolean
    $imageUrl: String
    $resume: String
  ) {
    updateProfile(
      id: $userId
      firstName: $firstName
      lastName: $lastName
      aboutMe: $aboutMe
      company: $company
      title: $title
      yoe: $yoe
      openForWork: $openForWork
      recentlyLaidOff: $recentlyLaidOff
      imageUrl: $imageUrl
      resume: $resume
    ) {
      id
      firstName
      lastName
      initials
      aboutMe
      company
      title
      yoe
      isOpenForWork
      recentlyLaidOff
      image_url
    }
  }
`;
