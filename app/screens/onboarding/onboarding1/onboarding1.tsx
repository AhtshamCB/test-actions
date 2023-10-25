import React, {FC} from 'react';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {Screen} from '@app/components';
import {color} from '@app/theme';
//
import {isTablet} from 'react-native-device-info';
import {Onboarding1ByTablet} from '../components/onboarding1/onboarding-1-by-tablet';
import {OnBoarding1ByPhone} from '../components/onboarding1/onboarding-1-by-phone';

export const OnBoarding1: FC<
  StackScreenProps<NavigatorParamList, 'onboarding1'>
> = ({navigation}) => {
  return (
    <Screen preset="fixed" backgroundColor={color.white}>
      {isTablet() ? (
        <Onboarding1ByTablet navigation={navigation} />
      ) : (
        <OnBoarding1ByPhone navigation={navigation} />
      )}
    </Screen>
  );
};
