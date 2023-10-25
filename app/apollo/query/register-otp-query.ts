import {gql} from '@apollo/client';

export const REGISTER_OTP_QUERY = gql`
  mutation registerOtps($email: String!, $type: String!, $action: String!) {
    registerOtp(email: $email, type: $type, action: $action) {
      id
      code
      email
    }
  }
`;
