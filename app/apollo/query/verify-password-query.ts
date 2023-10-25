import {gql} from '@apollo/client';

export const VERIFY_PASSWORD_QUERY = gql`
  mutation verifyPasswordMutation($password: String!) {
    verifyPassword(passwordInput: {password: $password}) {
      isSuccess
    }
  }
`;
