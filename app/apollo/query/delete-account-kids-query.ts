import {gql} from '@apollo/client';

export const DELETE_ACCOUNT_KIDS_QUERY = gql`
  mutation deleteAccountKidsMutation($password: String!) {
    kidDeleteAccount(deleteKidInput: {password: $password}) {
      isSuccess
    }
  }
`;
