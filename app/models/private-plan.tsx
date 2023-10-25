import {LEARNING_PLAN_TIME_CONSTANTS_TYPE} from '@app/utils/contants';

export interface CommitmentLevel {
  key: LEARNING_PLAN_TIME_CONSTANTS_TYPE;
  name: string;
  price: string;
  totalPrice: string;
  discount: string;
  freeTrial: string;
  billInfo: string;
  _id: string;
  isCanUpgrade?: boolean;
  interval?: string;
  intervalCount?: number;
  isBestValue: boolean;
}

export interface GetPrivatePlanResType {
  privatePlan: {commitmentLevel: CommitmentLevel[]; isStandardCurrency: number};
}
