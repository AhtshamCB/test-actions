/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
//
import {REGISTER_OTP_QUERY} from '@app/apollo/query/register-otp-query';
import {useMutation} from '@apollo/client';
//
import {ButtonLinearGradient, Text} from '@app/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  color,
  horizontalScale,
  moderateScale,
  spacing,
  typography,
  verticalScale,
} from '@app/theme';
import {TYPE} from '@app/utils/contants';
import {useTranslation} from 'react-i18next';
import {useOtpCD, useQuickVerifyOtp} from '@app/hook';
import {BackHandler} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {TranslationIcon} from '@app/svg';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

const BACKGROUND_STUDY = require('../../images/study3.png');
const BACKGROUND_PORTRAIT_TABLET = require('@app/components/images/background-portrait-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const EmailVerificationTabletPortrait = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const {data, isResetPasswordScreen, isSchoolRegisterScreen} = route?.params;
  const {orientationOpenApp} = useSelector(selector.config);

  const [otp, setOtp] = useState<string | undefined>();

  const onCompletedQuicVerifyOtp = () => {
    if (isResetPasswordScreen) {
      navigation.navigate('resetWithNewPassword', {data: data, code: otp});
    } else if (isSchoolRegisterScreen) {
      navigation.navigate('setPasswordRegionSchool', {data: data, code: otp});
    } else {
      navigation.navigate('createName', {dataSignUp: data, otp: otp});
    }
  };

  const {quickVerifyOtp, error, setError} = useQuickVerifyOtp(
    data?.registerOtp?.email,
    isSchoolRegisterScreen ? TYPE.SCHOOL : TYPE.PARENT,
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
        type: isSchoolRegisterScreen ? TYPE.SCHOOL : TYPE.PARENT,
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
    <View>
      <View style={CONTENT}>
        <View style={BODY}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            scrollEnabled={true}
            style={{width: 1000}}
            extraScrollHeight={120}
            keyboardShouldPersistTaps="handled"
            scrollToOverflowEnabled={true}
            enableAutomaticScroll={true}>
            <View style={LOGO_VIEW}>
              <Image source={LOGO} style={IMAGE_LOGO} resizeMode="contain" />
              <TouchableOpacity
                style={[
                  DIRECTION_VIEW,
                  {
                    marginLeft:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(30)
                        : horizontalScale(40),
                  },
                ]}
                onPress={() => {
                  if (i18n.language === 'en') {
                    i18n.changeLanguage('vi');
                  } else {
                    i18n.changeLanguage('en');
                  }
                }}>
                <TranslationIcon width={20} height={20} props={undefined} />
                <Text
                  text={i18n?.language?.toUpperCase()}
                  style={[
                    SUBTITLE,
                    {
                      marginStart: 10,
                      color: color.purple,
                      fontSize: moderateScale(10),
                      flex: 0,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                CONTAINER_HEADER_VIEW,
                {
                  marginTop:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(280)
                      : verticalScale(200),
                },
              ]}>
              <Text
                text={`${t('email_verification')}`}
                style={[
                  TITLE,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(25)
                        : moderateScale(31),
                  },
                ]}
              />
              <View style={{width: horizontalScale(180)}}>
                <Text
                  text={`${t('check_your_email_to_get_otp_code')}`}
                  style={[
                    SUBTITLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(12),
                    },
                  ]}
                />
              </View>
            </View>
            <View
              style={[
                INPUT_CONTAINER,
                {
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(0)
                      : horizontalScale(0),
                },
              ]}>
              <OTPInputView
                style={{
                  width:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(190)
                      : horizontalScale(250),
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(100)
                      : 100,
                }}
                pinCount={6}
                onCodeChanged={_onCodeChanged}
                codeInputFieldStyle={{
                  width:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(25)
                      : horizontalScale(38),
                  height: verticalScale(70),
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: color.dark5,
                  color: color.mainBlack,
                  fontSize: 36,
                  padding: 0,
                  fontFamily: typography.promptRegular,
                }}
              />
              {error && <Text text={error} style={TEXT_ERROR} />}
              <ButtonLinearGradient
                text={`${t('verify')}`}
                style={[
                  BUTTON_LOGIN_VIEW,
                  {
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(45),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(170)
                        : horizontalScale(200),
                    marginLeft:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(10)
                        : horizontalScale(15),
                  },
                ]}
                textStyle={[
                  TEXT_LOGIN,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(10)
                        : moderateScale(13),
                  },
                ]}
                onPress={_onCompleteFillOtp}
              />
              <View style={FOOTER_CONTENT}>
                <TouchableOpacity
                  style={{
                    marginRight:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(175)
                        : horizontalScale(260),
                  }}
                  disabled={showTimeOut}
                  onPress={_onResend}>
                  {showTimeOut ? (
                    <Text text={timeOutText} style={BT_TEXT_GRAY} />
                  ) : (
                    <Text text={`${t('resend')}`} style={BT_TEXT} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <View style={{flex: 1}}>
          <ImageBackground
            source={BACKGROUND_PORTRAIT_TABLET}
            style={[
              IMAGE_BACKGROUND,
              {
                width:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(130)
                    : horizontalScale(180),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(1100)
                    : verticalScale(850),
              },
            ]}>
            <Image
              source={BACKGROUND_STUDY}
              style={{
                width:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(100)
                    : horizontalScale(250),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(350)
                    : verticalScale(230),
                marginTop: verticalScale(25),
              }}
              resizeMode="contain"
            />
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',
  width: '100%',
};
const CONTENT: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(20),
  width: '100%',
};
const BODY: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20,
};
const LOGO_VIEW: ViewStyle = {
  paddingHorizontal: 10,
  flexDirection: 'row',
};
const TITLE: TextStyle = {
  fontFamily: typography.promptBold,

  fontWeight: '700',
  color: color.black1,
  marginBottom: verticalScale(10),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.black1,
  flex: 1,
};

const INPUT_CONTAINER: ViewStyle = {
  marginTop: verticalScale(30),
};
const IMAGE_BACKGROUND: ImageStyle = {
  width: horizontalScale(180),
  height: verticalScale(850),
  alignItems: 'center',
};
const IMAGE_LOGO: ImageStyle = {
  width: 200,
  height: 97,
  marginTop: verticalScale(40),
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  marginTop: verticalScale(20),
};

const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
};
const TEXT_ERROR: TextStyle = {
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  marginRight: horizontalScale(200),
  flex: 1,
  width: '50%',
  textAlign: 'center',
};
const BT_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(8),
  color: color.gray3,
  fontWeight: '400',
  marginTop: spacing.base,
};
const BT_TEXT_GRAY: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.palette.gray8C,
  marginTop: 7,
};
const FOOTER_CONTENT: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  marginTop: verticalScale(5),
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(50),
  justifyContent: 'center',
  alignItems: 'center',
};
