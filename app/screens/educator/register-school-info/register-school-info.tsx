import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {Header} from '@app/components';
import {color} from '@app/theme';
import {useTranslation} from 'react-i18next';
import {isTablet} from 'react-native-device-info';
import {RegisterSchoolInfoByPhone} from './components/register-school-info-by-phone';
import {RegisterSchoolByTablet} from './components/register-school-info-by-tablet';

export const RegisterSchoolInfo: FC<
  StackScreenProps<NavigatorParamList, 'registerSchoolInfo'>
> = ({navigation, route}) => {
  const {t} = useTranslation();

  return (
    <View style={CONTAINER_VIEW}>
      <Header
        title={`${t('create_an_account')}`}
        onBackPress={() => navigation.goBack()}
      />
      {isTablet() ? (
        <RegisterSchoolByTablet navigation={navigation} route={route} />
      ) : (
        <RegisterSchoolInfoByPhone navigation={navigation} route={route} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
