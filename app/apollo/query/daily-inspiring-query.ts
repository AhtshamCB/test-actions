import {gql} from '@apollo/client';

export const DAILY_INSPIRING_QUERY = gql`
  query {
    dailyInspiring
  }
`;
