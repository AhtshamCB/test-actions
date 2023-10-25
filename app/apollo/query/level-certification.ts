import {gql} from '@apollo/client';

export const LEVEL_CERTIFICATIONS_QUERY = gql`
  query {
    levelCertifications(lang: "vi") {
      keyName
      key
      name
      image
      note
      status
      fileUrl
    }
  }
`;
