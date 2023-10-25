import {gql} from '@apollo/client';

export const EDUCATOR_SUBSCRIPTION_PLANS_QUERY = gql`
  query educatorSubscriptionPlansQuery {
    educatorSubscriptionPlans {
      billInfo
      discount
      freeTrial
      interval
      intervalCount
      name
      price
      totalPrice
      key
    }
  }
`;
