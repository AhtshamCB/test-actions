import {gql} from '@apollo/client';

export const INIT_ACCOUNT_TYPE_QUERY = gql`
  mutation studentInitAccountType($isForMe: Int!) {
    studentInitAccount(isForMe: $isForMe) {
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
        age
        memberType
        status
      }
      role
      activeFor {
        isMe
        _id
        memberType
        isEnroll
      }
      memberType
    }
  }
`;
