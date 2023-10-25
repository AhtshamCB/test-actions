import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {color} from '@app/theme';
//
import {isTablet} from 'react-native-device-info';
import {LoginEducatorByTablet} from './components/login-educator-tablet';
import {LoginEducatorByPhone} from './components/login-educator-phone';

export const LoginEducator: FC<
  StackScreenProps<NavigatorParamList, 'loginEducator'>
> = ({navigation}) => {
  return (
    <View style={CONTAINER_VIEW}>
      {isTablet() ? (
        <LoginEducatorByTablet navigation={navigation} />
      ) : (
        <LoginEducatorByPhone navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
