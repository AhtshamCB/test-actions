import {gql} from '@apollo/client';

export const SUBSCRIBE_QUERY = gql`
  mutation subscribe($membershipId: MongoId!) {
    subscribe(membershipId: $membershipId) {
      isSuccess
      success
    }
  }
`;
