/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
  TextStyle,
  TextInput,
  ActivityIndicator,
  BackHandler,
  ImageBackground,
  Text as RNText,
  Linking,
} from 'react-native';
//
import AsyncStorage from '@react-native-async-storage/async-storage';

//
import {useMutation} from '@apollo/client';
import {LOGIN_QUERY} from '@app/apollo/query/login-query';
//
import {useDispatch, useSelector} from 'react-redux';
import {selector, UserActions} from '@app/redux';
//
import {useMe} from '@app/hook';
//
import {ButtonLinearGradient, Loading, Text} from '@app/components';
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
  EyeCrossedIcon,
  EyeIcon,
  TranslationIcon,
  BackgroundStudy5,
} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BACKGROUND_PORTRAIT_TABLET = require('@app/components/images/background-portrait-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const LoginByTabletPortrait = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const {orientationOpenApp} = useSelector(selector.config);

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
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            style={{width: horizontalScale(300)}}
            scrollEnabled={true}
            extraScrollHeight={120}
            keyboardShouldPersistTaps="handled"
            scrollToOverflowEnabled={true}
            enableAutomaticScroll={true}>
            <View style={{paddingHorizontal: 30, flexDirection: 'row'}}>
              <Image
                source={LOGO}
                style={{
                  width: 200,
                  height: 97,
                  marginTop: verticalScale(40),
                }}
                resizeMode="contain"
              />
              {onPressParents ? (
                <View
                  style={[
                    TRANSLATION_CONTAINER,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: verticalScale(20),
                    },
                  ]}>
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
                      <TranslationIcon
                        width={20}
                        height={20}
                        props={undefined}
                      />
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
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{marginTop: verticalScale(38)}} />
              )}
            </View>
            <View
              style={[
                CONTAINER_HEADER_VIEW,
                {
                  marginTop:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(300)
                      : verticalScale(100),
                },
              ]}>
              <Text
                text={`${t(' ')}`}
                style={[
                  TITLE,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(10)
                        : moderateScale(12),
                  },
                ]}
              />
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
                  {
                    borderColor: onPressKids ? color.purple : color.dark4,
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(70)
                        : horizontalScale(95),
                  },
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
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(12),
                    },
                  ]}
                />
              </TouchableOpacity>
              <View style={{width: horizontalScale(5)}} />
              <TouchableOpacity
                style={[
                  BUTTON_KIDS_PARENTS_LOGIN,
                  {
                    borderColor: onPressParents ? color.purple : color.dark4,
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(70)
                        : horizontalScale(95),
                  },
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
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(12),
                    },
                  ]}
                />
              </TouchableOpacity>
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
                        ? horizontalScale(145)
                        : horizontalScale(195),
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                  },
                ]}
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
                        ? horizontalScale(145)
                        : horizontalScale(195),
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                  },
                ]}
                onChangeText={onChangePassword}
                value={password.value}
                placeholder={`${t('password')}`}
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
                        ? horizontalScale(125)
                        : horizontalScale(180),
                    bottom:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(17)
                        : verticalScale(12),
                  },
                ]}
                onPress={() => setVisiblePassword(!isVisiblePassword)}>
                {isVisiblePassword ? <EyeCrossedIcon /> : <EyeIcon />}
              </TouchableOpacity>
            </View>
            <View style={INPUT_CONTAINER}>
              {password.error && (
                <Text text={password.error} style={TEXT_ERROR} />
              )}
              {errors && <Text text={errors} style={TEXT_ERROR} />}
            </View>

            {onPressKids ? (
              <ButtonLinearGradient
                text={`${t('sign_in_kids')}`}
                style={[
                  BUTTON_LOGIN_VIEW,
                  {
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(45),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(145)
                        : horizontalScale(195),
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
                onPress={onPressLoginWithChild}
              />
            ) : (
              <ButtonLinearGradient
                text={`${t('sign_in_parents')}`}
                style={[
                  BUTTON_LOGIN_VIEW,
                  {
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(45),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(145)
                        : horizontalScale(195),
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
                onPress={onPressLoginWithParents}
              />
            )}

            <View>
              {onPressKids ? (
                <View
                  style={[
                    FOOTER,
                    {
                      marginTop: verticalScale(20),
                    },
                  ]}>
                  <Text
                    text={'Ask your parents for username and password'}
                    style={[
                      TEXT_FOOTER,
                      {
                        right:
                          orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(2)
                            : 0,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}
                  />
                </View>
              ) : (
                <View
                  style={[
                    FOOTER,
                    {
                      marginTop: verticalScale(20),
                      marginLeft:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(40)
                          : horizontalScale(50),
                    },
                  ]}>
                  <Text
                    text={`${t('forgot_password')}`}
                    style={[
                      FOOTER_TEXT,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}
                    onPress={() =>
                      navigation.navigate('resetPasswordWithEmail')
                    }
                  />
                  <Text
                    text={'|'}
                    style={[
                      FOOTER_TEXT,
                      {
                        marginStart: 10,
                        marginEnd: 10,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}
                  />
                  <Text
                    text={`${t('create_an_account')}`}
                    style={[
                      FOOTER_TEXT,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}
                    onPress={() => navigation.navigate('createAccount')}
                  />
                </View>
              )}
            </View>
            <View
              style={[
                LOGIN_EDUCATOR_VIEW,
                {
                  marginRight:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(120)
                      : horizontalScale(70),
                },
              ]}>
              <Text
                text={'School Sign In'}
                style={[
                  LOGIN_EDUCATOR_TEXT,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                  },
                ]}
                onPress={() => navigation.navigate('loginEducator')}
              />
            </View>

            <View
              style={{
                justifyContent: 'center',
                marginLeft:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(40)
                    : horizontalScale(45),
                marginTop: verticalScale(50),
              }}>
              <RNText
                style={{
                  fontFamily: typography.promptRegular,
                  fontWeight: '400',
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(6.8)
                      : moderateScale(9),
                  color: color.gray3,
                }}>
                {'By signing in, you agree with our '}
                <RNText
                  onPress={() =>
                    Linking.openURL('https://www.teefi.io/privacy')
                  }
                  style={{
                    fontFamily: typography.promptRegular,
                    fontWeight: '400',
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(6.8)
                        : moderateScale(9),
                    color: color.purple,
                    textDecorationLine: 'underline',
                  }}>
                  {'Privacy Policy'}
                </RNText>
              </RNText>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <ImageBackground
          source={BACKGROUND_PORTRAIT_TABLET}
          style={{
            width: horizontalScale(160),
            height: verticalScale(850),
            alignItems: 'center',
          }}>
          <BackgroundStudy5
            width={moderateScale(250)}
            height={moderateScale(250)}
          />
        </ImageBackground>
      </View>
      <Loading isVisibleLoading={isVisibleLoading} />
    </View>
  );
};

const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',

  paddingHorizontal: horizontalScale(20),
};
const TITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.black1,
  marginBottom: verticalScale(10),
  width: '60%',
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(25),
  fontWeight: '700',
  color: color.black1,
};

const INPUT_CONTAINER: ViewStyle = {
  marginTop: 5,
  marginLeft: horizontalScale(20),
};
const INPUT_EMAIL: any = {
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginEnd: 20,
  fontSize: moderateScale(10),
};
const INPUT_PASSWORD: any = {
  height: verticalScale(45),
  width: horizontalScale(180),
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginTop: verticalScale(20),
  fontSize: moderateScale(10),
};
const EYE_VIEW: ViewStyle = {
  position: 'absolute',
  right: 0,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,

  marginTop: verticalScale(20),
  marginLeft: horizontalScale(20),
};

const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
};
const FOOTER: ViewStyle = {
  flexDirection: 'row',
  marginTop: 15,
  alignItems: 'center',
  width: '100%',
  marginLeft: horizontalScale(35),
};
const FOOTER_TEXT: TextStyle = {
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
  fontSize: moderateScale(7),
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: 30,
  marginLeft: horizontalScale(-10),
};
const KIDS_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(12),
  fontWeight: '500',
  color: color.purple,
};
const BUTTON_KIDS_PARENTS_LOGIN_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: verticalScale(20),
  width: '100%',
  marginLeft: horizontalScale(20),
};
const BUTTON_KIDS_PARENTS_LOGIN: ViewStyle = {
  backgroundColor: color.white,
  width: '30%',
  height: 55,
  borderRadius: 26,
  borderColor: color.purple,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const TEXT_FOOTER: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.dark4,
};
const TRANSLATION_CONTAINER: ViewStyle = {
  marginLeft: horizontalScale(30),
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
const LOGIN_EDUCATOR_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(10),
};
const LOGIN_EDUCATOR_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.purple,
};
