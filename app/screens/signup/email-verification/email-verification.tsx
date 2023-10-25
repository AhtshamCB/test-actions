import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {color} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {EmailVerificationByPhone} from './components/email-verification-by-phone';
import {EmailVerificationByTablet} from './components/email-verification-by-tablet';
import {Header} from '@app/components';
import {useTranslation} from 'react-i18next';

export const EmailVerification: FC<
  StackScreenProps<NavigatorParamList, 'emailVerification'>
> = ({navigation, route}) => {
  const {t} = useTranslation();
  const {isResetPasswordScreen} = route?.params || '';
  return (
    <View style={CONTAINER_VIEW}>
      <Header
        title={
          isResetPasswordScreen
            ? `${t('reset_password')}`
            : `${t('create_an_account')}`
        }
        onBackPress={() => navigation.goBack()}
      />
      {isTablet() ? (
        <EmailVerificationByTablet navigation={navigation} route={route} />
      ) : (
        <EmailVerificationByPhone navigation={navigation} route={route} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
