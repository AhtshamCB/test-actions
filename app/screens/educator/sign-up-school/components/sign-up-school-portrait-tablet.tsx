/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageStyle,
  Image,
  TextInput,
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
  typography,
  verticalScale,
} from '@app/theme';
import {TYPE} from '@app/utils/contants';
import {useTranslation} from 'react-i18next';
import {isValidWorkingMailAddress} from '@app/utils';
import {InputObject} from '@app/models';
import {TranslationIcon} from '@app/svg';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

const BACKGROUND_STUDY = require('@app/components/images/background-study-8.png');
const BACKGROUND_PORTRAIT_TABLET = require('@app/components/images/background-portrait-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const SignUpSchoolTabletPortrait = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);

  const [schoolRegisterOtp] = useMutation(REGISTER_OTP_QUERY);
  const [email, setEmail] = useState<InputObject>({
    value: '',
    error: '',
  });

  const onChangeEmail = text => {
    setEmail({value: text.trim(), error: ''});
  };

  const isValidData = useMemo(
    () => email.value && isValidWorkingMailAddress(email.value),
    [email],
  );

  const onPressEmailVerification = async () => {
    if (isValidData) {
      const dataRes = await schoolRegisterOtp({
        variables: {
          email: email.value,
          type: TYPE.SCHOOL,
          action: 'signup',
        },
      }).catch(res => {
        const errorData = res.graphQLErrors.map(error => error.message);
        setEmail({value: email.value, error: errorData});
      });
      if (dataRes?.data) {
        navigation.navigate('emailVerification', {
          data: dataRes?.data,
          isSchoolRegisterScreen: true,
        });
      }
    } else {
      if (email.value === '') {
        setEmail({value: email.value, error: `*${t('enter_your_email')}`});
      } else {
        setEmail({value: email.value, error: `*${t('invalid_working_email')}`});
      }
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
            <View
              style={[
                CONTAINER_HEADER_VIEW,
                {
                  marginTop:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(250)
                      : verticalScale(180),
                },
              ]}>
              <Text
                text={`${t('start_your_student_financial_success')}`}
                style={[
                  TITLE,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(10)
                        : moderateScale(11),
                  },
                ]}
              />
              <View style={{width: horizontalScale(180)}}>
                <Text
                  text={`${t('create_school_account')}`}
                  style={[
                    SUBTITLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(20)
                          : moderateScale(21),
                    },
                  ]}
                />
              </View>
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
                        ? horizontalScale(140)
                        : horizontalScale(180),
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                  },
                ]}
                onChangeText={onChangeEmail}
                value={email.value}
                placeholder="Email"
                keyboardType="default"
                placeholderTextColor={color.dark4}
              />
              {email.error && (
                <Text
                  text={email.error}
                  style={[
                    TEXT_ERROR,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                    },
                  ]}
                />
              )}
            </View>
            <ButtonLinearGradient
              text={`${t('continue')}`}
              style={[
                BUTTON_LOGIN_VIEW,
                {
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(45),
                  width:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(140)
                      : horizontalScale(180),
                },
              ]}
              textStyle={[
                TEXT_LOGIN,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(12),
                },
              ]}
              onPress={onPressEmailVerification}
            />
            <View style={FOOTER}>
              <Text
                text={`${t('manage_your_classes')}`}
                style={[
                  FOOTER_TEXT,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(7)
                        : moderateScale(8.5),
                  },
                ]}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>

        <ImageBackground
          source={BACKGROUND_PORTRAIT_TABLET}
          style={[
            IMAGE_BACKGROUND,
            {
              width:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(130)
                  : horizontalScale(190),
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
                  ? horizontalScale(130)
                  : horizontalScale(210),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(350)
                  : verticalScale(200),
              marginTop: verticalScale(25),
            }}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>
    </View>
  );
};

const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',
  paddingHorizontal: horizontalScale(10),
  width: '100%',
};
const CONTENT: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(20),
};
const BODY: ViewStyle = {
  flex: 1,
  paddingHorizontal: 10,
};
const LOGO_VIEW: ViewStyle = {
  paddingHorizontal: 10,
  flexDirection: 'row',
};
const TITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(12),
  fontWeight: '400',
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
  marginLeft: horizontalScale(10),
};
const INPUT_EMAIL: ViewStyle = {
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
};
const IMAGE_BACKGROUND: ImageStyle = {
  width: horizontalScale(190),
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
  marginLeft: horizontalScale(10),
};

const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
};
const TEXT_ERROR: TextStyle = {
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: horizontalScale(5),
};
const FOOTER: ViewStyle = {
  marginTop: verticalScale(15),
  marginLeft: horizontalScale(20),
};
const FOOTER_TEXT: TextStyle = {
  fontWeight: '500',
  color: color.gray7,
  fontFamily: typography.promptMedium,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(50),
  marginLeft: horizontalScale(40),
  justifyContent: 'center',
  alignItems: 'center',
};
