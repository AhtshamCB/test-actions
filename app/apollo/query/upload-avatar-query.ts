import {gql} from '@apollo/client';

export const UPDATE_AVATAR_ME_QUERY = gql`
  mutation updateMeProfile($avatar: URL) {
    updateMe(avatar: $avatar) {
      _id
      address
      avatar
      birthday
      country
      email
      firstName
      gender
      id
      lastName
      memberType
      name
      paymentCard {
        memberType
        paymentMethodId
      }
      role
      status
      username
    }
  }
`;
