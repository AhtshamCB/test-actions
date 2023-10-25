/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  TextStyle,
  TextInput,
  ActivityIndicator,
  BackHandler,
  ImageBackground,
  Platform,
  Text as RNText,
  Linking,
} from 'react-native';
//
import AsyncStorage from '@react-native-async-storage/async-storage';
//
import {useMutation} from '@apollo/client';
import {LOGIN_QUERY} from '@app/apollo/query/login-query';
//
import {useDispatch} from 'react-redux';
import {UserActions} from '@app/redux';
//
import {isIPhone8PlusOrBelow, useMe} from '@app/hook';
//
import {ButtonLinearGradient, Loading, Screen, Text} from '@app/components';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
//
import {useTranslation} from 'react-i18next';
import {InputObject} from '@app/models';
import {TYPE} from '@app/utils/contants';
//
import {
  BackgroundStudy5,
  EyeCrossedIcon,
  EyeIcon,
  TranslationIcon,
} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isTablet} from 'react-native-device-info';

const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const LoginByPhone = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('isFinishOnboarding', JSON.stringify(true));
      } catch (e) {
        console.log('e', e);
      } finally {
      }
    })();
  }, []);

  const [token, setToken] = useState('');
  const [errors, setError] = useState('');
  const [isVisibleLoading, setIsVisibleLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [username, setUsername] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [isVisiblePassword, setVisiblePassword] = useState(true);
  const [onPressKids, setOnPressKids] = useState<boolean>(false);
  const [onPressParents, setOnPressParents] = useState<boolean>(true);

  const [parentLogin] = useMutation(LOGIN_QUERY, {errorPolicy: 'all'});
  const [kidLogin] = useMutation(LOGIN_QUERY, {errorPolicy: 'all'});
  const {getMeInfo, loadingMeInfo} = useMe(token);

  const onChangeEmail = text => {
    setEmail({value: text.trim(), error: ''});
    setError('');
  };

  const onChangeUsername = text => {
    setUsername({value: text.trim(), error: ''});
    setError('');
  };

  const onChangePassword = text => {
    setPassword({value: text, error: ''});
    setError('');
  };

  const isValidData = useMemo(
    () => email.value && password.value,
    [email, password],
  );

  const isValidKidData = useMemo(
    () => username.value && password.value,
    [username, password],
  );

  const onPressLoginWithParents = async () => {
    if (isValidData) {
      setIsVisibleLoading(true);
      const dataLogin = await parentLogin({
        variables: {
          username: email.value,
          type: TYPE.PARENT,
          password: password.value,
        },
      });
      if (dataLogin?.errors) {
        setIsVisibleLoading(false);
        setError(dataLogin?.errors[0]?.message);
      } else {
        setIsVisibleLoading(false);
        setToken(dataLogin?.data?.doLogin?.token);
        await AsyncStorage.setItem(
          'userToken',
          dataLogin?.data?.doLogin?.token,
        );
        await AsyncStorage.setItem('isLogin', JSON.stringify(true));
        dispatch(UserActions.setToken(dataLogin?.data?.doLogin?.token, ''));
        await getMeInfo();
        dispatch(UserActions.setIsLoggedIn(true));
        navigation.navigate('parentDrawer');
      }
    } else {
      if (email.value === '') {
        setEmail({value: email.value, error: '*Enter your email'});
      } else if (password.value === '') {
        setPassword({
          value: password.value,
          error: '*Enter your password',
        });
      }
    }
  };

  const onPressLoginWithChild = async () => {
    if (isValidKidData) {
      const dataLogin = await kidLogin({
        variables: {
          username: username.value,
          password: password.value,
          type: TYPE.KID,
        },
      });
      if (dataLogin?.errors) {
        setError(dataLogin?.errors[0]?.message);
      } else {
        // TODO
        setToken(dataLogin?.data?.doLogin?.token);
        await AsyncStorage.setItem(
          'userToken',
          dataLogin?.data?.doLogin?.token,
        );
        await AsyncStorage.setItem('isLogin', JSON.stringify(true));
        dispatch(UserActions.setToken(dataLogin?.data?.doLogin?.token, ''));
        dispatch(UserActions.setIsLoggedIn(true));
        navigation.navigate('kidDrawer');
      }
      //TODO
    } else {
      if (username.value === '') {
        setUsername({
          value: username.value,
          error: '*Enter your username',
        });
      } else if (password.value === '') {
        setPassword({
          value: password.value,
          error: ' *Enter your password',
        });
      }
    }
  };

  const onPressKidsLogin = () => {
    i18n.changeLanguage('en');
    setOnPressKids(true);
    setOnPressParents(false);
    setUsername({value: '', error: ''});
    setPassword({value: '', error: ''});
  };

  const onPressParentsLogin = () => {
    setOnPressKids(false);
    setOnPressParents(true);
    setEmail({value: '', error: ''});
    setPassword({value: '', error: ''});
  };

  if (loadingMeInfo) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <Screen preset="fixed" backgroundColor={color.white}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={CONTAINER}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={Platform.OS === 'android' ? 100 : -120}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={true}>
        <ImageBackground
          source={HEADER_BACKGROUND}
          style={[
            BACKGROUND_CONTAINER,
            {
              height: verticalScale(400),
              top: isIPhone8PlusOrBelow()
                ? verticalScale(-20)
                : verticalScale(-40),
            },
          ]}>
          <View style={TRANSLATION_VIEW}>
            {onPressParents ? (
              <View style={TRANSLATION_CONTAINER}>
                <TouchableOpacity
                  style={[
                    DIRECTION_VIEW,
                    {
                      top: verticalScale(35),
                      position: 'absolute',
                      zIndex: 20,
                      right: 0,
                    },
                  ]}
                  onPress={() => {
                    if (i18n.language === 'en') {
                      i18n.changeLanguage('vi');
                    } else {
                      i18n.changeLanguage('en');
                    }
                  }}>
                  <View
                    style={{
                      marginTop: isTablet()
                        ? verticalScale(8)
                        : verticalScale(2),
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
            ) : (
              <View style={TRANSLATION_CONTAINER} />
            )}
          </View>
          <BackgroundStudy5 />
        </ImageBackground>
        <View
          style={{
            flex: 1,
            top: isIPhone8PlusOrBelow()
              ? verticalScale(-20)
              : verticalScale(-40),
          }}>
          <View style={CONTAINER_HEADER_VIEW}>
            <View>
              <View style={DIRECTION_VIEW}>
                <Text text={`${t('sign_in_teefi')}`} style={SUBTITLE} />
              </View>
            </View>
          </View>
          <View style={BUTTON_KIDS_PARENTS_LOGIN_CONTAINER}>
            <TouchableOpacity
              style={[
                BUTTON_KIDS_PARENTS_LOGIN,
                {borderColor: onPressKids ? color.purple : color.dark4},
              ]}
              onPress={onPressKidsLogin}>
              <Text
                text={'Kids'}
                style={[
                  KIDS_TEXT,
                  {
                    color: onPressKids ? color.purple : color.dark4,
                    fontFamily: onPressKids
                      ? typography.promptBold
                      : typography.promptRegular,
                    fontWeight: onPressKids ? '700' : '400',
                  },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                BUTTON_KIDS_PARENTS_LOGIN,
                {borderColor: onPressParents ? color.purple : color.dark4},
              ]}
              onPress={onPressParentsLogin}>
              <Text
                text={'Parents'}
                style={[
                  KIDS_TEXT,
                  {
                    color: onPressParents ? color.purple : color.dark4,
                    fontFamily: onPressParents
                      ? typography.promptBold
                      : typography.promptRegular,
                    fontWeight: onPressParents ? '700' : '400',
                  },
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={INPUT_CONTAINER}>
            <TextInput
              style={INPUT_EMAIL}
              onChangeText={onPressKids ? onChangeUsername : onChangeEmail}
              value={onPressKids ? username.value : email.value}
              placeholder={onPressKids ? `${t('username')}` : `${t('email')}`}
              keyboardType="email-address"
              placeholderTextColor={color.dark4}
              returnKeyType="next"
            />

            {onPressKids
              ? username.error && (
                  <Text text={username.error} style={TEXT_ERROR} />
                )
              : email.error && <Text text={email.error} style={TEXT_ERROR} />}
            <View>
              <TextInput
                style={INPUT_PASSWORD}
                onChangeText={onChangePassword}
                value={password.value}
                placeholder={`${t('password')}`}
                keyboardType="default"
                placeholderTextColor={color.dark4}
                secureTextEntry={isVisiblePassword}
              />

              <TouchableOpacity
                style={EYE_VIEW}
                onPress={() => setVisiblePassword(!isVisiblePassword)}>
                {isVisiblePassword ? <EyeCrossedIcon /> : <EyeIcon />}
              </TouchableOpacity>
            </View>
            {password.error && (
              <Text text={password.error} style={TEXT_ERROR} />
            )}
            {errors && <Text text={errors} style={TEXT_ERROR} />}
          </View>
          {onPressKids ? (
            <ButtonLinearGradient
              text={`${t('sign_in_kids')}`}
              style={BUTTON_LOGIN_VIEW}
              textStyle={TEXT_LOGIN}
              onPress={onPressLoginWithChild}
            />
          ) : (
            <ButtonLinearGradient
              text={`${t('sign_in_parents')}`}
              style={BUTTON_LOGIN_VIEW}
              textStyle={TEXT_LOGIN}
              onPress={onPressLoginWithParents}
            />
          )}

          <View>
            {onPressKids ? (
              <View style={[FOOTER, {marginTop: 0}]}>
                <Text
                  text={'Ask your parents for username and password'}
                  style={TEXT_FOOTER}
                />
              </View>
            ) : (
              <View style={[FOOTER, {marginTop: 15}]}>
                <Text
                  text={`${t('forgot_password')}`}
                  style={FOOTER_TEXT}
                  onPress={() => navigation.navigate('resetPasswordWithEmail')}
                />
                <Text
                  text={'|'}
                  style={[FOOTER_TEXT, {marginStart: 10, marginEnd: 10}]}
                />
                <Text
                  text={`${t('create_an_account')}`}
                  style={FOOTER_TEXT}
                  onPress={() => navigation.navigate('createAccount')}
                />
              </View>
            )}
          </View>
          <View
            style={[
              LOGIN_EDUCATOR_VIEW,
              {
                marginTop: onPressParents
                  ? verticalScale(10)
                  : verticalScale(-5),
              },
            ]}>
            <Text
              text={'School Sign In'}
              style={LOGIN_EDUCATOR_TEXT}
              onPress={() => navigation.navigate('loginEducator')}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: verticalScale(10),
            }}>
            <RNText
              style={{
                fontFamily: typography.promptRegular,
                fontWeight: '400',
                fontSize: moderateScale(12),
                color: color.gray3,
              }}>
              {'By signing in, you agree with our '}
              <RNText
                onPress={() => Linking.openURL('https://www.teefi.io/privacy')}
                style={{
                  fontFamily: typography.promptRegular,
                  fontWeight: '400',
                  fontSize: moderateScale(12),
                  color: color.purple,
                  textDecorationLine: 'underline',
                }}>
                {'Privacy Policy'}
              </RNText>
            </RNText>
          </View>
        </View>
        <Loading isVisibleLoading={isVisibleLoading} />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
};
const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(20),
  fontWeight: '500',
  color: color.black1,
};

const INPUT_CONTAINER: ViewStyle = {
  marginTop: isIPhone8PlusOrBelow() ? verticalScale(-2) : 5,
};
const INPUT_EMAIL: ViewStyle = {
  height: isIPhone8PlusOrBelow() ? 38 : 46,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginStart: 20,
  marginEnd: 20,
};
const INPUT_PASSWORD: ViewStyle = {
  height: isIPhone8PlusOrBelow() ? 38 : 46,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginTop: 15,
  marginStart: 20,
  marginEnd: 20,
};
const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 50,
  bottom: isIPhone8PlusOrBelow() ? 8 : 12,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: isIPhone8PlusOrBelow() ? 38 : 46,
  marginTop: 20,
  marginStart: 20,
  marginEnd: 20,
};

const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
  fontSize: moderateScale(16),
};
const FOOTER: ViewStyle = {
  flexDirection: 'row',
  marginTop: 15,
  justifyContent: 'center',
  alignItems: 'center',
};
const FOOTER_TEXT: TextStyle = {
  fontSize: moderateScale(12),
  fontWeight: '500',
  color: color.black1,
  fontFamily: typography.promptMedium,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const TEXT_ERROR: TextStyle = {
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: 30,
};

const BACKGROUND_CONTAINER: ImageStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const KIDS_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(14),
  fontWeight: '500',
  color: color.purple,
};
const BUTTON_KIDS_PARENTS_LOGIN_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 20,
  marginTop: isIPhone8PlusOrBelow() ? verticalScale(-10) : 0,
};
const BUTTON_KIDS_PARENTS_LOGIN: ViewStyle = {
  backgroundColor: color.white,
  width: '48%',
  height: isIPhone8PlusOrBelow() ? 38 : 42,
  borderRadius: 26,
  borderColor: color.purple,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const TEXT_FOOTER: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.dark4,
  paddingHorizontal: 10,
  paddingVertical: 10,
};
const TRANSLATION_VIEW: ViewStyle = {
  alignSelf: 'flex-end',
};
const TRANSLATION_CONTAINER: ViewStyle = {
  marginRight: horizontalScale(15),
  marginTop: verticalScale(-10),
  top: verticalScale(-20),
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
const LOGIN_EDUCATOR_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const LOGIN_EDUCATOR_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.purple,
  paddingHorizontal: 10,
};
