import {gql} from '@apollo/client';

export const QUICK_VERIFY_OTP_QUERY = gql`
  mutation QuickVerifyOtp($email: String!, $code: String!, $type: String!) {
    quickVerifyOtp(email: $email, code: $code, type: $type) {
      isValid
    }
  }
`;
