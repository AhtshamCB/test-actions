import {gql} from '@apollo/client';

export const LOGOUT_QUERY = gql`
  mutation {
    logout {
      isSuccess
    }
  }
`;
