/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  ImageBackground,
  ImageStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
//
import {REGISTER_OTP_QUERY} from '@app/apollo/query/register-otp-query';
import {useMutation} from '@apollo/client';
import {InputObject} from '@app/models';
//
import {ButtonLinearGradient, Text} from '@app/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {BackgroundStudy2, TranslationIcon} from '@app/svg';
import {TYPE} from '@app/utils/contants';
import {useTranslation} from 'react-i18next';

const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const ResetPasswordByPhoneWithEmail = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const {isFromSchool} = route?.params || '';
  const [registerOtp] = useMutation(REGISTER_OTP_QUERY);
  const [email, setEmail] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [errors, setError] = useState('');

  const onChangeEmail = text => {
    setEmail({value: text.trim(), error: ''});
    setError('');
  };

  const isValidData = useMemo(() => email.value, [email]);

  const onPressEmailVerification = async () => {
    if (isValidData) {
      const dataRes = await registerOtp({
        variables: {
          email: email.value,
          type: isFromSchool ? TYPE.SCHOOL : TYPE.PARENT,
          action: 'resetPassword',
        },
      });
      if (dataRes?.data?.errors) {
        setError(dataRes?.data?.errors[0]?.message);
      } else {
        navigation.navigate('emailVerification', {
          data: dataRes?.data,
          isResetPasswordScreen: true,
          isFromSchool: isFromSchool,
        });
      }
    } else {
      if (email.value === '') {
        setEmail({value: email.value, error: `*${t('enter_your_email')}`});
      }
    }
  };

  return (
    <View style={CONTAINER_VIEW}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={CONTAINER}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={Platform.OS === 'android' ? 100 : 50}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={true}>
        <ImageBackground
          source={HEADER_BACKGROUND}
          style={BACKGROUND_CONTAINER}>
          <View style={TRANSLATION_VIEW}>
            <View style={TRANSLATION_CONTAINER}>
              <TouchableOpacity
                style={[DIRECTION_VIEW, {top: verticalScale(70)}]}
                onPress={() => {
                  if (i18n.language === 'en') {
                    i18n.changeLanguage('vi');
                  } else {
                    i18n.changeLanguage('en');
                  }
                }}>
                <View
                  style={{
                    marginTop: verticalScale(2),
                  }}>
                  <TranslationIcon width={20} height={20} props={undefined} />
                </View>
                <Text
                  text={i18n?.language?.toLocaleUpperCase()}
                  style={[
                    SUBTITLE,
                    {
                      marginStart: 10,
                      color: color.purple,
                      fontSize: moderateScale(16),
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <BackgroundStudy2 width={385} height={450} />
        </ImageBackground>
        <View style={BODY}>
          <View style={CONTAINER_HEADER_VIEW}>
            <Text
              text={`${t('reset_password')}`}
              style={CREATE_ACCOUNT_TITLE}
            />
            <Text text={`${t('rest_password_content')}`} style={DESCRIPTION} />
          </View>
          <View style={INPUT_CONTAINER}>
            <TextInput
              style={INPUT_EMAIL}
              onChangeText={onChangeEmail}
              value={email.value}
              placeholder={`${t('email')}`}
              keyboardType="default"
              placeholderTextColor={color.dark4}
            />
            {email.error && <Text text={email.error} style={TEXT_ERROR} />}
            {errors && <Text text={email.error} style={TEXT_ERROR} />}
          </View>
          <ButtonLinearGradient
            text={`${t('send_reset_otp')}`}
            style={BUTTON_LOGIN_VIEW}
            textStyle={TEXT_LOGIN}
            onPress={onPressEmailVerification}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  marginTop: 20,
};
const BODY: ViewStyle = {
  marginHorizontal: 5,
};
const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 25,
};
const BACKGROUND_CONTAINER: ImageStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: verticalScale(400),
};
const CREATE_ACCOUNT_TITLE: TextStyle = {
  fontSize: moderateScale(25),
  fontWeight: '700',
  color: color.dark1,
  fontFamily: typography.promptBold,
};

const DESCRIPTION: TextStyle = {
  fontSize: moderateScale(11),
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
  marginStart: 5,
  textAlign: 'center',
};
const INPUT_CONTAINER: ViewStyle = {
  marginTop: verticalScale(20),
};
const INPUT_EMAIL: ViewStyle = {
  height: verticalScale(40),
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginStart: 20,
  marginEnd: 20,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: verticalScale(40),
  marginStart: 20,
  marginEnd: 20,
  marginTop: 40,
};
const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
  fontSize: moderateScale(14),
};
const TEXT_ERROR: TextStyle = {
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  marginLeft: horizontalScale(20),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(14),
  fontWeight: '500',
  color: color.black1,
};
const TRANSLATION_VIEW: ViewStyle = {
  alignSelf: 'flex-end',
};
const TRANSLATION_CONTAINER: ViewStyle = {
  marginRight: horizontalScale(15),
  marginTop: verticalScale(-10),
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
