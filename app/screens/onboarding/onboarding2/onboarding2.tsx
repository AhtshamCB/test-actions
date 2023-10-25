import React, {FC} from 'react';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {Screen} from '@app/components';
import {color} from '@app/theme';
//
import {isTablet} from 'react-native-device-info';
import {Onboarding2ByTablet} from '../components/onboarding2/onboarding-2-by-tablet';
import {OnBoarding2ByPhone} from '../components/onboarding2/onboarding-2-by-phone';

export const OnBoarding2: FC<
  StackScreenProps<NavigatorParamList, 'onboarding2'>
> = ({navigation}) => {
  return (
    <Screen preset="fixed" backgroundColor={color.white}>
      {isTablet() ? (
        <Onboarding2ByTablet navigation={navigation} />
      ) : (
        <OnBoarding2ByPhone navigation={navigation} />
      )}
    </Screen>
  );
};
