import React, {FC} from 'react';
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {Screen} from '@app/components';
import {color} from '@app/theme';
//
import {isTablet} from 'react-native-device-info';
import {Onboarding3ByTablet} from '../components/onboarding3/onboarding-3-by-tablet';
import {OnBoarding3ByPhone} from '../components/onboarding3/onboarding-3-by-phone';

export const OnBoarding3: FC<
  StackScreenProps<NavigatorParamList, 'onboarding3'>
> = ({navigation}) => {
  return (
    <Screen preset="fixed" backgroundColor={color.white}>
      {isTablet() ? (
        <Onboarding3ByTablet navigation={navigation} />
      ) : (
        <OnBoarding3ByPhone navigation={navigation} />
      )}
    </Screen>
  );
};
