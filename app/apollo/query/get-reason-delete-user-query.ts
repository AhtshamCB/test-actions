import {gql} from '@apollo/client';

export const REASON_DELETE_USER_QUERY = gql`
  query {
    initDeleteUser(lang: "vi") {
      reasons
    }
  }
`;
