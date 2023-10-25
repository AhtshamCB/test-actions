import React, {FC} from 'react';

import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {Screen} from '@app/components';
import {color} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {Onboarding4ByTablet} from '../components/onboarding4/onboarding-4-by-tablet';
import {OnBoarding4ByPhone} from '../components/onboarding4/onboarding-4-by-phone';

export const OnBoarding4: FC<
  StackScreenProps<NavigatorParamList, 'onboarding4'>
> = ({navigation}) => {
  return (
    <Screen preset="fixed" backgroundColor={color.white}>
      {isTablet() ? (
        <Onboarding4ByTablet navigation={navigation} />
      ) : (
        <OnBoarding4ByPhone navigation={navigation} />
      )}
    </Screen>
  );
};
