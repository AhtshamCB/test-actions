import {gql} from '@apollo/client';

export const SIGN_UP_QUERY = gql`
  mutation parentSignUp(
    $email: String!
    $code: String!
    $type: String!
    $password: String!
    $name: String!
    $country: String!
  ) {
    doSignUp(
      email: $email
      code: $code
      type: $type
      password: $password
      name: $name
      country: $country
    ) {
      email
      role
      token
    }
  }
`;
