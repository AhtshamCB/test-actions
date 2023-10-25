import {gql} from '@apollo/client';

export const REGISTER_SCHOOL_QUERY = gql`
  mutation educatorSignupMutation(
    $address: String
    $country: String
    $educatorRole: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $otpCode: String!
    $password: String!
    $schoolName: String!
    $studentLimit: Int!
    $title: String!
  ) {
    registerSchool(
      createSchoolInput: {
        address: $address
        country: $country
        educatorRole: $educatorRole
        email: $email
        firstName: $firstName
        lastName: $lastName
        otpCode: $otpCode
        password: $password
        schoolName: $schoolName
        studentLimit: $studentLimit
        title: $title
      }
    ) {
      email
      name
      refreshToken
      role
      token
    }
  }
`;
