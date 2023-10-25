import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {Header} from '@app/components';
import {color} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {ResetPasswordTabletWithEmail} from '../components/reset-password-by-tablet-with-email';
import {ResetPasswordByPhoneWithEmail} from '../components/reset-password-by-phone-with-email';

export const ResetPasswordWithEmail: FC<
  StackScreenProps<NavigatorParamList, 'resetPasswordWithEmail'>
> = ({navigation, route}) => {
  const {t} = useTranslation();
  return (
    <View style={CONTAINER_VIEW}>
      <Header
        title={`${t('reset_password')}`}
        onBackPress={() => navigation.goBack()}
      />
      {isTablet() ? (
        <ResetPasswordTabletWithEmail navigation={navigation} route={route} />
      ) : (
        <ResetPasswordByPhoneWithEmail navigation={navigation} route={route} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
