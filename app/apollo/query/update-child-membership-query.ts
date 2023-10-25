import {gql} from '@apollo/client';

export const UPDATE_CHILD_MEMBERSHIP_QUERY = gql`
  mutation updateMembershipQuery($membershipId: MongoId!) {
    updateMembership(membershipId: $membershipId) {
      childs {
        _id
        address
        avatar
        balance
        birthday
        country
        firstName
        gender
        lastName
        name
      }
      activeFor {
        _id
        enrollExpireTime
        isEnroll
        isSubscribed
        isNewKid
        cancelAtPeriodEnd
        info {
          avatar
          birthday
          gender
          name
        }
      }
    }
  }
`;
