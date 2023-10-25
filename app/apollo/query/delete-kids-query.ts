import {gql} from '@apollo/client';

export const DELETE_KIDS_QUERY = gql`
  mutation deleteKids($_id: String!) {
    deleteChild(_id: $_id) {
      success
    }
  }
`;
