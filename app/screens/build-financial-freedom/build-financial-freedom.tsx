import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {color} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {BuildFinancialFreedomByPhone} from './components/build-financial-freedom-by-phone';
import {BuildFinancialFreedomByTablet} from './components/build-financial-freedom-by-tablet';

export const BuildFinancialFreedom: FC<
  StackScreenProps<NavigatorParamList, 'buildFinancialFreedom'>
> = () => {
  return (
    <View style={CONTAINER}>
      {isTablet() ? (
        <BuildFinancialFreedomByTablet />
      ) : (
        <BuildFinancialFreedomByPhone />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
