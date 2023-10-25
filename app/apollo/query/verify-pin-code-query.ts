import {gql} from '@apollo/client';

export const VERIFY_PIN_CODE_QUERY = gql`
  query pinCode($pinCode: String!) {
    verifyPinCode(pinCode: $pinCode) {
      isVerified
    }
  }
`;
