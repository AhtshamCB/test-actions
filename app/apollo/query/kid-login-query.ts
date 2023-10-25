import {gql} from '@apollo/client';

export const KID_LOGIN_QUERY = gql`
  mutation kidLogin($username: String!, $password: String!) {
    childLogin(username: $username, password: $password) {
      token
    }
  }
`;
