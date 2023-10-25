import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {color} from '@app/theme';
//
import {isTablet} from 'react-native-device-info';
import {LoginByTablet} from './components/login-tablet';
import {LoginByPhone} from './components/login-phone';

export const Login: FC<StackScreenProps<NavigatorParamList, 'login'>> = ({
  navigation,
}) => {
  return (
    <View style={CONTAINER_VIEW}>
      {isTablet() ? (
        <LoginByTablet navigation={navigation} />
      ) : (
        <LoginByPhone navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
