import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {color} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {SignUpSuccessByTablet} from './components/sign-up-success-by-tablet';
import {SignUpSuccessByPhone} from './components/sign-up-success-by-phone';

export const SignUpSuccess: FC<
  StackScreenProps<NavigatorParamList, 'signUpSuccess'>
> = ({navigation}) => {
  return (
    <View style={CONTAINER_VIEW}>
      {isTablet() ? (
        <SignUpSuccessByTablet navigation={navigation} />
      ) : (
        <SignUpSuccessByPhone navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
