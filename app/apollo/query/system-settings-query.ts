import {gql} from '@apollo/client';

export const SYSTEM_SETTINGS_QUERY = gql`
  query {
    systemSettings
  }
`;
