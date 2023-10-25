import {gql} from '@apollo/client';

export const SELF_CHANGE_PASSWORD_QUERY = gql`
  mutation selfChangePassword($oldPassword: String!, $newPassword: String!) {
    selfChangePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      isUpdated
    }
  }
`;
