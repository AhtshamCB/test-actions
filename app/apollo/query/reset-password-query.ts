import {gql} from '@apollo/client';

export const RESET_PASSWORD_QUERY = gql`
  mutation resetPasswordStudent(
    $email: String!
    $code: String!
    $type: String!
    $password: String!
  ) {
    resetPassword(
      email: $email
      code: $code
      type: $type
      password: $password
    ) {
      email
      type
      token
    }
  }
`;
