import {gql} from '@apollo/client';

export const ENROLL_QUERY = gql`
  mutation enrollPayment($memberType: String!, $enrollFor: String!) {
    enroll(memberType: $memberType, enrollFor: $enrollFor) {
      invoiceId
      payUrl
    }
  }
`;
