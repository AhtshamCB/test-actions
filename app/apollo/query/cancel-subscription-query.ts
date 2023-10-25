import {gql} from '@apollo/client';

export const CANCEL_SUBSCRIPTION_QUERY = gql`
  mutation cancelSubscription {
    cancelSubscriptionPlan(lang: "vi") {
      success
    }
  }
`;
