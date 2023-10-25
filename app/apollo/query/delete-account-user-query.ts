import {gql} from '@apollo/client';

export const DELETE_ACCOUNT_QUERY = gql`
  mutation deleteAccountUser($reason: String!, $adviseUs: String!) {
    deleteSelfAccount(reason: $reason, adviseUs: $adviseUs) {
      isDelete
    }
  }
`;
