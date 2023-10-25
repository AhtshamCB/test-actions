import {gql} from '@apollo/client';

export const LIST_INVOICE_QUERY = gql`
  query {
    listInvoice(lang: "vi") {
      _id
      amount
      fileUrl
      createdAt
    }
  }
`;
