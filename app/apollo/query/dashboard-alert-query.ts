import {gql} from '@apollo/client';

export const DASHBOARD_ALERT_QUERY = gql`
  query {
    dashboardAlert {
      content
      url
      urlTitle
    }
  }
`;
