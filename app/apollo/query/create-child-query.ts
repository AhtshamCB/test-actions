import {gql} from '@apollo/client';

export const CREATE_CHILD_QUERY = gql`
  mutation createStudentChild(
    $name: String!
    $birthday: String!
    $username: String!
    $password: String!
    $avatar: String
  ) {
    createChild(
      avatar: $avatar
      birthday: $birthday
      lang: ""
      name: $name
      password: $password
      username: $username
    ) {
      _id
      avatar
      birthday
      name
      status
      username
    }
  }
`;
