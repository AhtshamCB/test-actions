import {gql} from '@apollo/client';

export const UPSERT_PIN_CODE_QUERY = gql`
  mutation pinCode($pinCode: String!, $newPinCode: String!) {
    upsertPinCode(pinCode: $pinCode, newPinCode: $newPinCode) {
      _id
    }
  }
`;
