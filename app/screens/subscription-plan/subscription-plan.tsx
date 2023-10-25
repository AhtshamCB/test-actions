/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect} from 'react';
import {ActivityIndicator, View, ViewStyle} from 'react-native';
//
import {MemberShip, PrivatePlan, PrivatePlanSchool} from './components';
import {Text} from '@app/components';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {color} from '@app/theme';
import {useGetStatusMembership, useGetSystemSettings, useKids} from '@app/hook';
import {useTranslation} from 'react-i18next';
import {isTablet} from 'react-native-device-info';
import {PrivatePlanTablet} from './components/private-plan-tablet';
import {MEMBER_SHIP_STATUS} from '@app/utils/contants';
import {PrivatePlanSchoolTablet} from './components/private-plan-school-tablet';

export const SubscriptionPlan: FC<
  StackScreenProps<NavigatorParamList, 'subscriptionPlan'>
> = ({navigation, route}) => {
  const {isFromTabbar, isFromSchool} = route?.params || '';
  const isFocused = useIsFocused();
  const {i18n} = useTranslation();
  const {accessToken, activeKidInfo, userInfo} = useSelector(selector.user);
  const {getActiveKids, loadingActiveKids} = useKids(accessToken);
  const {getSystemSettings} = useGetSystemSettings();
  const {memberShipStatus} = useGetStatusMembership(activeKidInfo?.activeFor);

  useEffect(() => {
    getActiveKids();
  }, [i18n.language]);

  useEffect(() => {
    if (isFocused) {
      getActiveKids();
      getSystemSettings();
    }
  }, [isFocused]);

  if (loadingActiveKids) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  const renderSubscriptionPlanParents = () => {
    switch (memberShipStatus) {
      case MEMBER_SHIP_STATUS.SUBSCRIBED:
        return (
          <MemberShip navigation={navigation} isFromTabbar={isFromTabbar} />
        );
      case MEMBER_SHIP_STATUS.STILL_ACTIVE:
        return (
          <MemberShip navigation={navigation} isFromTabbar={isFromTabbar} />
        );
      case MEMBER_SHIP_STATUS.NOT_SUBSCRIBED:
        return (
          <>
            {isTablet() ? (
              <PrivatePlanTablet
                navigation={navigation}
                isFromTabbar={isFromTabbar}
              />
            ) : (
              <PrivatePlan
                navigation={navigation}
                isFromTabbar={isFromTabbar}
              />
            )}
          </>
        );
    }
  };

  const renderSubscriptionPlanSchool = () => (
    <>
      {isTablet() ? (
        <PrivatePlanSchoolTablet isFromTabbar={isFromTabbar} />
      ) : (
        <PrivatePlanSchool isFromTabbar={isFromTabbar} />
      )}
    </>
  );

  return (
    <View style={CONTAINER_VIEW}>
      {userInfo?.me?.role === 'school' || isFromSchool
        ? renderSubscriptionPlanSchool()
        : renderSubscriptionPlanParents()}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
