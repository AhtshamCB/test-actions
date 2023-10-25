import {gql} from '@apollo/client';

export const UPDATE_ME_QUERY = gql`
  mutation updateMeProfile(
    $firstName: String
    $lastName: String
    $address: String
    $country: String
  ) {
    updateMe(
      firstName: $firstName
      lastName: $lastName
      address: $address
      country: $country
    ) {
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
