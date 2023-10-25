/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  ImageBackground,
  ImageStyle,
  Image,
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
import {TYPE} from '@app/utils/contants';
import {useTranslation} from 'react-i18next';
import {TranslationIcon} from '@app/svg';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

const BACKGROUND_STUDY = require('@app/components/images/background-study-5.png');
const BACKGROUND_LANDSCAPE_TABLET = require('@app/components/images/background-landscape-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const ResetPasswordTabletLandscapeWithEmail = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const {isFromSchool} = route?.params || '';
  const {orientationOpenApp} = useSelector(selector.config);

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
    <View>
      <View style={CONTAINER_VIEW}>
        <ImageBackground
          source={BACKGROUND_LANDSCAPE_TABLET}
          style={[
            IMAGE_CONTAINER,
            {
              width:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(240)
                  : horizontalScale(300),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(800)
                  : verticalScale(630),
            },
          ]}>
          <Image
            source={BACKGROUND_STUDY}
            style={[
              IMAGE_BACKGROUND,
              {
                width:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(600)
                    : horizontalScale(400),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(600)
                    : verticalScale(400),
                marginLeft:
                  orientationOpenApp === 'LANDSCAPE' ? horizontalScale(30) : 0,
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
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(12),
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={BODY}>
              <View style={CONTAINER_HEADER_VIEW}>
                <Text
                  text={`${t('reset_password')}`}
                  style={[
                    CREATE_ACCOUNT_TITLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(24)
                          : moderateScale(28),
                    },
                  ]}
                />

                <Text
                  text={`${t('rest_password_content')}`}
                  style={[
                    DESCRIPTION,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8.3)
                          : moderateScale(9),
                    },
                  ]}
                />
              </View>
              <View style={INPUT_CONTAINER}>
                <TextInput
                  style={[
                    INPUT_EMAIL,
                    {
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(60)
                          : verticalScale(45),
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(150)
                          : horizontalScale(200),
                      marginLeft:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(5)
                          : 0,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                    },
                  ]}
                  onChangeText={onChangeEmail}
                  value={email.value}
                  placeholder={`${t('email')}`}
                  keyboardType="email-address"
                  placeholderTextColor={color.dark4}
                />
                {email.error && <Text text={email.error} style={TEXT_ERROR} />}
                {errors && <Text text={email.error} style={TEXT_ERROR} />}
              </View>

              <ButtonLinearGradient
                text={`${t('send_reset_otp')}`}
                style={[
                  BUTTON_LOGIN_VIEW,
                  {
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(40),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(150)
                        : horizontalScale(200),
                    marginLeft:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(10)
                        : 0,
                  },
                ]}
                textStyle={[
                  TEXT_LOGIN,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(9)
                        : moderateScale(12),
                  },
                ]}
                onPress={onPressEmailVerification}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginLeft: horizontalScale(10),
  marginTop: verticalScale(10),
};
const IMAGE_CONTAINER: ImageStyle = {
  alignItems: 'center',
  marginLeft: horizontalScale(-50),
};
const IMAGE_BACKGROUND: ImageStyle = {
  marginTop: verticalScale(30),
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
  paddingHorizontal: horizontalScale(10),
};
const BODY: ViewStyle = {
  marginHorizontal: 5,
  marginTop: verticalScale(50),
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
const INPUT_EMAIL: any = {
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginEnd: 20,
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
  paddingHorizontal: horizontalScale(5),
};
const CREATE_ACCOUNT_TITLE: TextStyle = {
  fontSize: moderateScale(28),
  fontWeight: '700',
  color: color.dark1,
  fontFamily: typography.promptBold,
};

const DESCRIPTION: TextStyle = {
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
  marginStart: 5,
  marginTop: verticalScale(5),
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
};
