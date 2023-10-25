import {gql} from '@apollo/client';

export const CHECK_USERNAME_QUERY = gql`
  mutation checkUsername($username: String!) {
    checkUsernameUnique(username: $username) {
      isUnique
    }
  }
`;
