/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-boolean-cast */
import {useEffect, useState} from 'react';
import {
  MEMBER_SHIP_STATUS,
  SCHOOL_ACCESS_STATUS,
  TYPE,
} from '@app/utils/contants';
import {
  capitalizeFirstLetter,
  formatDate,
  formatDayMonthYear,
} from '@app/utils/general';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {useTranslation} from 'react-i18next';
import i18n from '@app/i18next/i18n.config';

export const useGetStatusMembership = activeFor => {
  const {t} = useTranslation();
  const [memberShipStatus, setMemberShipStatus] = useState<string>();
  const {isBetaVersion, endBetaDate} = useSelector(selector.config);
  const {userInfo} = useSelector(selector.user);

  useEffect(() => {
    setMemberShipStatus(getMemberShipStatus());
  }, [activeFor]);
  const getMemberShipStatus = () => {
    if (activeFor?.cancelAtPeriodEnd) {
      return MEMBER_SHIP_STATUS.STILL_ACTIVE;
    }
    return activeFor?.isSubscribed
      ? MEMBER_SHIP_STATUS.SUBSCRIBED
      : MEMBER_SHIP_STATUS.NOT_SUBSCRIBED;
  };

  const renderStatusMemberShip = () => {
    const {membershipName, enrollExpireTime} = activeFor;
    let date = formatDayMonthYear(enrollExpireTime);
    if (i18n.language !== 'vi') {
      date = formatDate(enrollExpireTime);
    }

    switch (memberShipStatus) {
      case MEMBER_SHIP_STATUS.SUBSCRIBED: {
        let membershipInfo = `${capitalizeFirstLetter(membershipName)}`;
        if (enrollExpireTime) {
          membershipInfo = `${membershipInfo} ${t(
            'subscribed_next_bill_date',
          )} ${date}`;
        }
        return membershipInfo;
      }
      case MEMBER_SHIP_STATUS.STILL_ACTIVE: {
        return `${t('still_active_until')} ${date}`;
      }
      case MEMBER_SHIP_STATUS.NOT_SUBSCRIBED: {
        if (isBetaVersion) {
          return `${t('subscription_activated_after_beta_version', {
            date: `${endBetaDate}`,
          })}`;
        }
        return t('not_subscribed');
      }
    }
  };

  const renderAccessStatusSchool = () => {
    switch (userInfo?.me?.school?.accessStatus) {
      case SCHOOL_ACCESS_STATUS.NOT_ACTIVATED:
        return 'Account Not Verified';
      case SCHOOL_ACCESS_STATUS.TRIAL:
        return 'Buy Student Accounts';
      case SCHOOL_ACCESS_STATUS.FULL_ACCESS:
        return 'Request TeeFi Support';
      case SCHOOL_ACCESS_STATUS.EXPIRED:
        return 'Subscription Renewal';
    }
  };

  const renderAccessStatusSchoolSettings = () => {
    switch (userInfo?.me?.school?.accessStatus) {
      case SCHOOL_ACCESS_STATUS.NOT_ACTIVATED:
        return 'Account Not Verified';
      case SCHOOL_ACCESS_STATUS.TRIAL:
        return '14-Day Free Trial';
      case SCHOOL_ACCESS_STATUS.FULL_ACCESS:
        return `${
          userInfo?.me?.school?.subscriptionPlan
        } Subscription. Next Bill Date: ${formatDate(
          userInfo?.me?.school?.expireTime,
        )}`;
      case SCHOOL_ACCESS_STATUS.EXPIRED:
        return ' Subscription Expired';
    }
  };

  const getTitleOfDateExpire = timeExpire => {
    if (!timeExpire) {
      return '';
    }

    if (
      memberShipStatus &&
      memberShipStatus === MEMBER_SHIP_STATUS.SUBSCRIBED
    ) {
      return `${t('next_bill_date')}: ${
        i18n.language === 'vi'
          ? formatDayMonthYear(timeExpire)
          : formatDate(timeExpire)
      }`;
    }
    return `${t('your_subscription_will_be_expired')} ${
      i18n.language === 'vi'
        ? formatDayMonthYear(timeExpire)
        : formatDate(timeExpire)
    }`;
  };

  const getMemberShipStatusOfKids = auth => {
    if (auth?.role === TYPE.KID || auth?.role === TYPE.STUDENT) {
      if (!!auth?.isSubscribed) {
        return MEMBER_SHIP_STATUS.SUBSCRIBED;
      } else {
        if (auth?.memberType) {
          return MEMBER_SHIP_STATUS.STILL_ACTIVE;
        } else {
          return MEMBER_SHIP_STATUS.NOT_SUBSCRIBED;
        }
      }
    }
    return MEMBER_SHIP_STATUS.NOT_SUBSCRIBED;
  };

  const getMemberShipStatusOfSchoolAndClasses = auth => {
    if (auth?.role === TYPE.SCHOOL || auth?.role === TYPE.GRADE) {
      if (auth?.accessStatus === SCHOOL_ACCESS_STATUS.NOT_ACTIVATED) {
        return SCHOOL_ACCESS_STATUS.NOT_ACTIVATED;
      } else if (auth?.accessStatus === SCHOOL_ACCESS_STATUS.TRIAL) {
        return SCHOOL_ACCESS_STATUS.TRIAL;
      } else {
        SCHOOL_ACCESS_STATUS.EXPIRED;
      }
    }
  };

  return {
    memberShipStatus,
    renderStatusMemberShip,
    getMemberShipStatus,
    getTitleOfDateExpire,
    getMemberShipStatusOfKids,
    renderAccessStatusSchool,
    renderAccessStatusSchoolSettings,
    getMemberShipStatusOfSchoolAndClasses,
  };
};
