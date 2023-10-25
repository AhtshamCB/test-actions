import {gql} from '@apollo/client';

export const UPDATE_KIDS_QUERY = gql`
  mutation updateKid(
    $name: String!
    $birthday: String!
    $password: String!
    $avatar: String
    $_id: String!
  ) {
    updateChild(
      name: $name
      birthday: $birthday
      password: $password
      avatar: $avatar
      _id: $_id
    ) {
      _id
      name
      avatar
      status
      birthday
    }
  }
`;
