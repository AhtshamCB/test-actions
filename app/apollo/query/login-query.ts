import {gql} from '@apollo/client';

export const LOGIN_QUERY = gql`
  mutation doLoginMutation(
    $username: String!
    $type: String!
    $password: String!
  ) {
    doLogin(username: $username, type: $type, password: $password) {
      id
      username
      role
      token
    }
  }
`;
