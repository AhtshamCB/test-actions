/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageStyle,
  Image,
  BackHandler,
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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useOtpCD, useQuickVerifyOtp} from '@app/hook';
import {TranslationIcon} from '@app/svg';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

const BACKGROUND_STUDY = require('../../images/study3.png');
const BACKGROUND_LANDSCAPE_TABLET = require('@app/components/images/background-landscape-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const EmailVerificationTabletLandscape = ({navigation, route}) => {
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
      <View style={CONTAINER_VIEW}>
        <ImageBackground
          source={BACKGROUND_LANDSCAPE_TABLET}
          style={[
            IMAGE_CONTAINER,
            {
              width:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(215)
                  : horizontalScale(290),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(800)
                  : verticalScale(600),
            },
          ]}>
          <Image
            source={BACKGROUND_STUDY}
            style={[
              IMAGE_BACKGROUND,
              {
                width:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(300)
                    : horizontalScale(350),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(400)
                    : verticalScale(350),
                marginLeft:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(35),
                marginTop:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(100)
                    : verticalScale(50),
              },
            ]}
            resizeMode="contain"
          />
        </ImageBackground>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          scrollEnabled={true}
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled={true}
          enableAutomaticScroll={true}>
          <View style={BODY_VIEW}>
            <View style={CONTENT}>
              <Image source={LOGO} style={LOGO_IMAGE} resizeMode="contain" />
              <TouchableOpacity
                style={DIRECTION_VIEW}
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
            <View style={BODY}>
              <View style={CONTAINER_HEADER_VIEW}>
                <Text
                  text={`${t('email_verification')}`}
                  style={[
                    CREATE_ACCOUNT_TITLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(24)
                          : moderateScale(25),
                    },
                  ]}
                />
                <Text
                  text={`${t('check_your_email_to_get_otp_code')}`}
                  style={DESCRIPTION}
                />
              </View>
              <View style={INPUT_CONTAINER}>
                <OTPInputView
                  style={{
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(200)
                        : horizontalScale(250),
                    height: 100,
                  }}
                  pinCount={6}
                  onCodeChanged={_onCodeChanged}
                  codeInputFieldStyle={{
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(30)
                        : horizontalScale(35),
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(75)
                        : verticalScale(60),
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
                          ? horizontalScale(190)
                          : horizontalScale(200),
                    },
                  ]}
                  textStyle={[
                    TEXT_LOGIN,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(11)
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
                          ? horizontalScale(0)
                          : horizontalScale(40),
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
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(20),
};
const IMAGE_CONTAINER: ImageStyle = {
  width: horizontalScale(300),
  height: verticalScale(600),
  alignItems: 'center',
  marginLeft: horizontalScale(-50),
};
const IMAGE_BACKGROUND: ImageStyle = {
  width: 450,
  height: 700,
  marginTop: verticalScale(20),
};
const BODY_VIEW: ViewStyle = {
  flex: 1,
};
const CONTENT: ViewStyle = {
  paddingHorizontal: 20,
  flexDirection: 'row',
};
const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',
  marginTop: verticalScale(30),
  paddingHorizontal: horizontalScale(5),
};
const BODY: ViewStyle = {
  marginHorizontal: 5,
  marginTop: verticalScale(70),
};
const LOGO_IMAGE: ImageStyle = {
  width: 200,
  height: 97,
  marginTop: verticalScale(40),
};
const INPUT_CONTAINER: ViewStyle = {
  marginTop: verticalScale(15),
  marginLeft: horizontalScale(5),
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  marginTop: verticalScale(20),
  marginLeft: horizontalScale(5),
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
  paddingHorizontal: 30,
  width: '50%',
  marginLeft: horizontalScale(50),
};
const CREATE_ACCOUNT_TITLE: TextStyle = {
  fontWeight: '700',
  color: color.dark1,
  fontFamily: typography.promptBold,
};

const DESCRIPTION: TextStyle = {
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
  marginStart: 5,
  marginTop: verticalScale(5),
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
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(50),
  marginLeft: horizontalScale(40),
  justifyContent: 'center',
  alignItems: 'center',
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(12),
  fontWeight: '500',
  color: color.black1,
  flex: 1,
};
