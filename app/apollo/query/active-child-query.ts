import {gql} from '@apollo/client';

export const CHANGE_WATCHING_KID_QUERY = gql`
  mutation watchingKid($childId: String!) {
    changeWatchingKid(childId: $childId) {
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
        memberType
        name
        username
      }
      activeFor {
        _id
        enrollExpireTime
        isEnroll
        isSubscribed
        isNewKid
        cancelAtPeriodEnd
        memberType
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
