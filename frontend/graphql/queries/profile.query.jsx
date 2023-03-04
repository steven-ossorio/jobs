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

export const FETCH_PROFILES = gql`
  query FetchProfiles(
    $limit: Int
    $country: String
    $state: String
    $yoe: Int
    $company: String
    $recentlyLaidOff: Boolean
    $isOpenForWork: Boolean
  ) {
    fetchProfiles(
      limit: $limit
      country: $country
      state: $state
      yoe: $yoe
      company: $company
      recentlyLaidOff: $recentlyLaidOff
      isOpenForWork: $isOpenForWork
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
      socials {
        id
        name
        url
      }
    }
  }
`;
