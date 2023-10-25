import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {color} from '@app/theme';
import {isTablet} from 'react-native-device-info';
//
import {ResetByPhoneWithNewPassword} from '../components/reset-password-by-phone-with-new-password';
import {ResetPasswordTabletWithNewPassword} from '../components/reset-password-by-tablet-with-new-password';

export const ResetWithNewPassword: FC<
  StackScreenProps<NavigatorParamList, 'resetWithNewPassword'>
> = ({navigation, route}) => {
  return (
    <View style={CONTAINER_VIEW}>
      {isTablet() ? (
        <ResetPasswordTabletWithNewPassword
          navigation={navigation}
          route={route}
        />
      ) : (
        <ResetByPhoneWithNewPassword navigation={navigation} route={route} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
