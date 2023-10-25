import {gql} from '@apollo/client';

export const KID_QUERY = gql`
  query {
    kidMe(lang: "vi") {
      _id
      name
      avatar
      status
      birthday
      activeFor {
        _id
        memberType
        isEnroll
      }
      paymentCard {
        paymentMethodId
        memberType
      }
    }
  }
`;
