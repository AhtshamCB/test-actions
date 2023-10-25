/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  BackHandler,
  TouchableOpacity,
  ImageStyle,
  ImageBackground,
  Platform,
} from 'react-native';
//
import {useMutation} from '@apollo/client';
import {REGISTER_OTP_QUERY} from '@app/apollo/query/register-otp-query';
//
import {ButtonLinearGradient, Text} from '@app/components';
import {
  color,
  horizontalScale,
  moderateScale,
  spacing,
  typography,
  verticalScale,
} from '@app/theme';
import {useOtpCD, useQuickVerifyOtp} from '@app/hook';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useTranslation} from 'react-i18next';
import {BackgroundStudy3, TranslationIcon} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TYPE} from '@app/utils/contants';

const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const EmailVerificationByPhone = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const {data, isResetPasswordScreen, isSchoolRegisterScreen, isFromSchool} =
    route?.params;
  const [otp, setOtp] = useState<string | undefined>();

  const onCompletedQuicVerifyOtp = () => {
    if (isResetPasswordScreen) {
      navigation.navigate('resetWithNewPassword', {
        data: data,
        code: otp,
        isFromSchool: isFromSchool,
      });
    } else if (isSchoolRegisterScreen) {
      navigation.navigate('setPasswordRegionSchool', {data: data, code: otp});
    } else {
      navigation.navigate('createName', {dataSignUp: data, otp: otp});
    }
  };

  const {quickVerifyOtp, error, setError} = useQuickVerifyOtp(
    data?.registerOtp?.email,
    isSchoolRegisterScreen || isFromSchool ? TYPE.SCHOOL : TYPE.PARENT,
    otp,
    onCompletedQuicVerifyOtp,
  );

  const [registerOtp] = useMutation(REGISTER_OTP_QUERY);
  const {startTimer, showTimeOut, timeOutText} = useOtpCD();
  useEffect(() => {
    const backAction = () => {
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const _onCompleteFillOtp = async () => {
    await quickVerifyOtp();
  };
  const _onResend = async () => {
    startTimer();
    const dataRes = await registerOtp({
      variables: {
        email: data?.registerOtp?.email,
        type:
          isSchoolRegisterScreen || isFromSchool ? TYPE.SCHOOL : TYPE.PARENT,
        action: isResetPasswordScreen ? 'resetPassword' : 'signup',
      },
    });
    const code = dataRes?.data?.registerOtp?.code;
    setOtp(code);
  };

  const validateOtp = (otp: string) => {
    const regex = /\d/g;
    if (otp.match(regex)?.length === 6) {
      return true;
    }
  };

  const _onCodeChanged = async code => {
    setError('');
    if (validateOtp(code)) {
      await setOtp(code);
      await quickVerifyOtp();
    }
  };

  return (
    <View style={CONTAINER_VIEW}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={KEYBOARD_VIEW}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={Platform.OS === 'android' ? 100 : 50}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={true}>
        <ImageBackground
          source={HEADER_BACKGROUND}
          style={[
            BACKGROUND_CONTAINER,
            {
              height: verticalScale(400),
              top: verticalScale(-20),
            },
          ]}>
          <View style={TRANSLATION_VIEW}>
            <View style={TRANSLATION_CONTAINER}>
              <TouchableOpacity
                style={[DIRECTION_VIEW, {top: verticalScale(10)}]}
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
          <BackgroundStudy3 />
        </ImageBackground>

        <View style={BODY}>
          <Text
            text={`${t('email_verification')}`}
            style={CREATE_ACCOUNT_TITLE}
          />
          <Text
            text={`${t('check_your_email_to_get_otp_code')}`}
            style={DESCRIPTION}
          />
          <View style={INPUT_CONTAINER}>
            <OTPInputView
              style={{width: '100%', height: 100}}
              pinCount={6}
              onCodeChanged={_onCodeChanged}
              codeInputFieldStyle={UNDER_LINE_STYLE_BASE}
            />
            {error && <Text text={error} style={TEXT_ERROR} />}
            <ButtonLinearGradient
              text={`${t('verify')}`}
              style={BUTTON_LOGIN_VIEW}
              textStyle={TEXT_LOGIN}
              onPress={_onCompleteFillOtp}
            />
            <View style={FOOTER_CONTENT}>
              <TouchableOpacity disabled={showTimeOut} onPress={_onResend}>
                {showTimeOut ? (
                  <Text text={timeOutText} style={BT_TEXT_GRAY} />
                ) : (
                  <Text text={`${t('resend')}`} style={BT_TEXT} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
  marginTop: verticalScale(5),
};
const KEYBOARD_VIEW: ViewStyle = {
  flex: 1,
  marginTop: 10,
};
const BODY: ViewStyle = {
  marginHorizontal: 5,
  padding: 10,
};
const CREATE_ACCOUNT_TITLE: TextStyle = {
  fontSize: moderateScale(32),
  fontWeight: '700',
  color: color.dark1,
  fontFamily: typography.promptBold,
};

const DESCRIPTION: TextStyle = {
  fontSize: moderateScale(14),
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
};
const INPUT_CONTAINER: ViewStyle = {
  // flex: 1,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: verticalScale(40),
  marginTop: 20,
};
const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
  fontWeight: '600',
  fontFamily: typography.promptBold,
  fontSize: moderateScale(16),
};
const FOOTER_CONTENT: ViewStyle = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
};
const BT_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  color: color.gray3,
  fontWeight: '400',
  marginTop: spacing.base,
};
const BT_TEXT_GRAY: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.palette.gray8C,
  marginTop: 7,
};
const UNDER_LINE_STYLE_BASE: TextStyle = {
  width: horizontalScale(40),
  height: verticalScale(50),
  borderWidth: 1,
  borderRadius: 10,
  borderColor: color.dark5,
  color: color.mainBlack,
  fontSize: 36,
  padding: 0,
  fontFamily: typography.promptRegular,
};
const BACKGROUND_CONTAINER: ImageStyle = {
  height: 400,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
};
const TEXT_ERROR: TextStyle = {
  fontSize: 15,
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  textAlign: 'center',
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
