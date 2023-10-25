import {gql} from '@apollo/client';

export const GET_KIDS_QUERY = gql`
  query {
    kids(lang: "vn") {
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
        membershipName
        subscriptionStatus
        info {
          avatar
          birthday
          gender
          name
          username
        }
      }
    }
  }
`;
