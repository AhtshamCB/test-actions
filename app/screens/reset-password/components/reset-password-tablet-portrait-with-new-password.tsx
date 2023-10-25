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
import {useMutation} from '@apollo/client';
import {InputObject} from '@app/models';
//
import {ButtonLinearGradient, Header, Text} from '@app/components';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selector, UserActions} from '@app/redux';
import {RESET_PASSWORD_QUERY} from '@app/apollo/query';
import {useDispatch, useSelector} from 'react-redux';
import {EyeCrossedIcon, EyeIcon, TranslationIcon} from '@app/svg';

const BACKGROUND_STUDY = require('@app/components/images/background-study-5.png');
const BACKGROUND_PORTRAIT_TABLET = require('@app/components/images/background-portrait-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const ResetPasswordTabletPortraitWithNewPassword = ({
  navigation,
  route,
}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const {orientationOpenApp} = useSelector(selector.config);

  const {data, code, isFromSchool} = route?.params;

  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [errors, setError] = useState('');
  const [isVisiblePassword, setVisiblePassword] = useState(true);

  const [resetPassword] = useMutation(RESET_PASSWORD_QUERY);

  const onChangePassword = text => {
    setPassword({value: text.trim(), error: ''});
    setError('');
  };

  const isValidData = useMemo(() => password.value, [password]);

  const onPressResetPassword = async () => {
    if (isValidData) {
      const dataRes = await resetPassword({
        variables: {
          email: data?.registerOtp?.email,
          code: code,
          type: isFromSchool ? TYPE.SCHOOL : TYPE.PARENT,
          password: password.value,
        },
      });
      if (dataRes?.data) {
        await AsyncStorage.setItem(
          'userToken',
          dataRes?.data?.resetPassword?.token,
        );
        dispatch(UserActions.setToken(dataRes?.data?.resetPassword?.token, ''));
        await AsyncStorage.setItem('isLogin', JSON.stringify(true));
        dispatch(UserActions.setIsLoggedIn(true));
        isFromSchool
          ? navigation.navigate('schoolDrawer')
          : navigation.navigate('parentDrawer');
      }
    } else {
      if (password.value === '') {
        setPassword({value: password.value, error: '*Enter your password'});
      }
    }
  };

  return (
    <View>
      <Header
        title={`${t('new_password')}`}
        onBackPress={() => navigation.goBack()}
      />
      <View style={CONTENT}>
        <View style={BODY}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            scrollEnabled={true}
            style={{width: horizontalScale(550)}}
            extraScrollHeight={120}
            keyboardShouldPersistTaps="handled"
            scrollToOverflowEnabled={true}
            enableAutomaticScroll={true}>
            <View style={LOGO_VIEW}>
              <Image source={LOGO} style={IMAGE_LOGO} resizeMode="contain" />
              <View style={TRANSLATION_CONTAINER}>
                <TouchableOpacity
                  style={[
                    DIRECTION_VIEW,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      // top: verticalScale(15),
                    },
                  ]}
                  onPress={() => {
                    if (i18n.language === 'en') {
                      i18n.changeLanguage('vi');
                    } else {
                      i18n.changeLanguage('en');
                    }
                  }}>
                  <View>
                    <TranslationIcon width={20} height={20} props={undefined} />
                  </View>
                  <Text
                    text={i18n?.language?.toLocaleUpperCase()}
                    style={[
                      SUBTITLE,
                      {
                        marginStart: 10,
                        color: color.purple,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                        fontFamily: typography.promptRegular,
                        fontWeight: '400',
                        flex: 0,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                CONTAINER_HEADER_VIEW,
                {
                  marginTop:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(300)
                      : verticalScale(200),
                },
              ]}>
              <Text text={`${t('reset_password')}`} style={TITLE} />
              <View style={{width: horizontalScale(180)}}>
                <Text
                  text={`${t('enter_new_password')}`}
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
            <View style={INPUT_CONTAINER}>
              <TextInput
                style={[
                  INPUT_PASSWORD,
                  {
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(45),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(150)
                        : horizontalScale(180),
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                  },
                ]}
                onChangeText={onChangePassword}
                value={password.value}
                placeholder={`${t('new_password')}`}
                keyboardType="default"
                placeholderTextColor={color.dark4}
                secureTextEntry={isVisiblePassword}
              />
              <TouchableOpacity
                style={[
                  EYE_VIEW,
                  {
                    left:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(130)
                        : horizontalScale(150),
                    top:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(20)
                        : verticalScale(15),
                  },
                ]}
                onPress={() => setVisiblePassword(!isVisiblePassword)}>
                {isVisiblePassword ? <EyeCrossedIcon /> : <EyeIcon />}
              </TouchableOpacity>
              {password.error && (
                <Text text={password.error} style={TEXT_ERROR} />
              )}
              {errors && <Text text={errors} style={TEXT_ERROR} />}
            </View>
            <ButtonLinearGradient
              text={'Done'}
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
              onPress={onPressResetPassword}
            />
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
                  : horizontalScale(160),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(1100)
                  : verticalScale(850),
            },
          ]}>
          <Image
            source={BACKGROUND_STUDY}
            style={[
              IMAGE,
              {
                width:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(150)
                    : horizontalScale(250),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(400)
                    : verticalScale(230),
              },
            ]}
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
  fontSize: moderateScale(30),
  fontWeight: '500',
  color: color.black1,
  marginBottom: verticalScale(10),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.gray1,
  flex: 1,
};
const TRANSLATION_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const INPUT_CONTAINER: ViewStyle = {
  marginTop: verticalScale(30),
  marginLeft: horizontalScale(10),
};
const INPUT_PASSWORD: ViewStyle = {
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginEnd: 20,
};
const IMAGE_BACKGROUND: ImageStyle = {
  width: horizontalScale(190),
  height: verticalScale(850),
  alignItems: 'center',
};
const IMAGE: ImageStyle = {
  width: horizontalScale(400),
  height: verticalScale(280),
  marginTop: verticalScale(20),
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
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: horizontalScale(5),
};
const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(50),
  marginLeft: horizontalScale(40),
  justifyContent: 'center',
  alignItems: 'center',
};
