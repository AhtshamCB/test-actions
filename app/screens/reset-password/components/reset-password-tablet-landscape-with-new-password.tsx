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
import {useDispatch, useSelector} from 'react-redux';
import {RESET_PASSWORD_QUERY} from '@app/apollo/query';
import {selector, UserActions} from '@app/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EyeCrossedIcon, EyeIcon, TranslationIcon} from '@app/svg';

const BACKGROUND_STUDY = require('@app/components/images/background-study-5.png');
const BACKGROUND_LANDSCAPE_TABLET = require('@app/components/images/background-landscape-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const ResetPasswordTabletLandscapeWithNewPassword = ({
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
              <View style={TRANSLATION_CONTAINER}>
                <TouchableOpacity
                  style={[
                    DIRECTION_VIEW,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      top: verticalScale(15),
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
            <View style={BODY}>
              <View style={CONTAINER_HEADER_VIEW}>
                <Text
                  text={`${t('reset_password')}`}
                  style={[
                    CREATE_ACCOUNT_TITLE,
                    {
                      fontSize:
                        i18n.language === 'en'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(26)
                            : moderateScale(28)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(22)
                          : moderateScale(24),
                    },
                  ]}
                />
                <Text text={`${t('enter_new_password')}`} style={DESCRIPTION} />
              </View>
              <View
                style={{
                  marginTop:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(20)
                      : verticalScale(15),
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(15)
                      : horizontalScale(5),
                }}>
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
                          : horizontalScale(200),
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
                      right:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(30)
                          : horizontalScale(50),
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
                    height: 55,
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(150)
                        : horizontalScale(200),
                    marginLeft:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(15)
                        : horizontalScale(0),
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
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(10),
};
const IMAGE_CONTAINER: ImageStyle = {
  width: horizontalScale(300),
  height: verticalScale(600),
  alignItems: 'center',
  marginLeft: horizontalScale(-50),
};
const IMAGE_BACKGROUND: ImageStyle = {
  width: horizontalScale(300),
  height: verticalScale(400),
  marginTop: verticalScale(20),
  marginLeft: horizontalScale(20),
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
  paddingHorizontal: horizontalScale(20),
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
const TRANSLATION_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(20),
};
const INPUT_PASSWORD: any = {
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
const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginLeft: horizontalScale(40),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(12),
  fontWeight: '500',
  color: color.black1,
  flex: 1,
};
