import {gql} from '@apollo/client';

export const PRIVATE_PLAN_QUERY = gql`
  query {
    privatePlan(lang: "vi", switchToStandardCurrency: 1) {
      commitmentLevel {
        _id
        key
        name
        price
        totalPrice
        discount
        freeTrial
        billInfo
        isCanUpgrade
        interval
        intervalCount
        isBestValue
      }
      isStandardCurrency
    }
  }
`;
