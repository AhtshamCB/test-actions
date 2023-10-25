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
import {SignUpSchoolByPhone} from './components/sign-up-school-by-phone';
import {SignUpSchoolByTablet} from './components/sign-up-school-by-tablet';

export const SignUpSchool: FC<
  StackScreenProps<NavigatorParamList, 'signUpSchool'>
> = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <View style={CONTAINER_VIEW}>
      <Header
        title={`${t('create_an_account')}`}
        onBackPress={() => navigation.goBack()}
      />
      {isTablet() ? (
        <SignUpSchoolByTablet navigation={navigation} />
      ) : (
        <SignUpSchoolByPhone navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
