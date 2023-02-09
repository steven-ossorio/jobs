const { gql } = require("@apollo/client");

export const FETCH_PROFILE = gql`
  query Query($userId: Int) {
    fetchProfile(userId: $userId) {
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
