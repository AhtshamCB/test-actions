import {ActiveFor} from '@app/models';
import {
  LEARNING_PLAN_TIME_CONSTANTS,
  LEARNING_PLAN_TIME_CONSTANTS_TYPE,
  MEMBER_SHIP_TITLE_CONDITION,
  MEMBER_SHIP_TITLE_CONDITION_TYPE,
} from '@app/utils/contants';
import {useTranslation} from 'react-i18next';

export const useSubscription = () => {
  const {t} = useTranslation();
  const checkIsActivePackage = ({
    memberType,
    activeFor,
  }: {
    memberType: LEARNING_PLAN_TIME_CONSTANTS_TYPE;
    activeFor: ActiveFor;
  }) => {
    return activeFor?.memberType === memberType;
  };

  const getMembershipStringLevel = ({
    membershipType,
    titleCondition,
  }: {
    membershipType: LEARNING_PLAN_TIME_CONSTANTS_TYPE;
    titleCondition: MEMBER_SHIP_TITLE_CONDITION_TYPE;
  }) => {
    switch (membershipType) {
      case LEARNING_PLAN_TIME_CONSTANTS.MONTHLY: {
        switch (titleCondition) {
          case MEMBER_SHIP_TITLE_CONDITION.SUBSCRIBE_LEVEL:
            return t('subscribe_monthly');
          case MEMBER_SHIP_TITLE_CONDITION.CANCEL_LEVEL:
            return t('cancel_plan');
          case MEMBER_SHIP_TITLE_CONDITION.SWITCH_LEVEL:
            return t('switch_to_monthly');
          case MEMBER_SHIP_TITLE_CONDITION.SHORT_NAME_LEVEL:
            return t('mon');
          default:
            return '';
        }
      }

      case LEARNING_PLAN_TIME_CONSTANTS.YEARLY: {
        switch (titleCondition) {
          case MEMBER_SHIP_TITLE_CONDITION.SUBSCRIBE_LEVEL:
            return t('subscribe_yearly');
          case MEMBER_SHIP_TITLE_CONDITION.CANCEL_LEVEL:
            return t('cancel_plan');
          case MEMBER_SHIP_TITLE_CONDITION.SWITCH_LEVEL:
            return t('switch_to_yearly');
          case MEMBER_SHIP_TITLE_CONDITION.SHORT_NAME_LEVEL:
            return t('year');
          default:
            return '';
        }
      }

      case LEARNING_PLAN_TIME_CONSTANTS.QUARTERLY: {
        switch (titleCondition) {
          case MEMBER_SHIP_TITLE_CONDITION.SUBSCRIBE_LEVEL:
            return t('subscribe_quarterly');
          case MEMBER_SHIP_TITLE_CONDITION.CANCEL_LEVEL:
            return t('cancel_plan');
          case MEMBER_SHIP_TITLE_CONDITION.SWITCH_LEVEL:
            return t('switch_to_quarterly');
          case MEMBER_SHIP_TITLE_CONDITION.SHORT_NAME_LEVEL:
            return t('quarterly');
          default:
            return '';
        }
      }
      case LEARNING_PLAN_TIME_CONSTANTS.LIFETIME: {
        switch (titleCondition) {
          case MEMBER_SHIP_TITLE_CONDITION.SUBSCRIBE_LEVEL:
            return t('subscribe_lifetime');
          case MEMBER_SHIP_TITLE_CONDITION.CANCEL_LEVEL:
            return t('cancel_plan');
          case MEMBER_SHIP_TITLE_CONDITION.SWITCH_LEVEL:
            return t('switch_to_lifetime');
          case MEMBER_SHIP_TITLE_CONDITION.SHORT_NAME_LEVEL:
            return t('lifetime');
          default:
            return '';
        }
      }

      default:
        return '';
    }
  };
  return {
    checkIsActivePackage,
    getMembershipStringLevel,
  };
};
