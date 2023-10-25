import {gql} from '@apollo/client';

export const HOME_QUERY = gql`
  query {
    me(lang: "vi") {
      _id
      userId
      name
      avatar
      email
      status
      childs {
        _id
        name
        avatar
        gender
        birthday
        memberType
        status
        isEnroll
      }
      role
      activeFor {
        isMe
        _id
        memberType
        isEnroll
        info {
          _id
          name
          avatar
          gender
          birthday
        }
      }
      paymentCard {
        paymentMethodId
        memberType
      }
      memberType
      hasPinSecurity
    }
  }
`;
