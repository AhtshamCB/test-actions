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
import {EyeCrossedIcon, EyeIcon} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BACKGROUND_STUDY = require('@app/components/images/background-study-6.png');
const BACKGROUND_PORTRAIT_TABLET = require('@app/components/images/background-portrait-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const LoginEducatorByTabletPortrait = ({navigation}) => {
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

  const [classUsernameTeacher, setClassUsernameTeacher] = useState<InputObject>(
    {
      value: '',
      error: '',
    },
  );

  const [classUsernameStudent, setClassUsernameStudent] = useState<InputObject>(
    {
      value: '',
      error: '',
    },
  );
  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [isVisiblePassword, setVisiblePassword] = useState(true);
  const [onPressSchool, setOnPressSchool] = useState<boolean>(true);
  const [onPressTeacher, setOnPressTeacher] = useState<boolean>(false);
  const [onPressStudent, setOnPressStudent] = useState<boolean>(false);

  const [schoolLogin] = useMutation(LOGIN_QUERY, {errorPolicy: 'all'});
  const {getMeInfo, loadingMeInfo} = useMe(token);

  const onChangeEmail = text => {
    setEmail({value: text.trim(), error: ''});
    setError('');
  };

  const onChangeClassUsername = text => {
    if (onPressTeacher) {
      setClassUsernameTeacher({value: text.trim(), error: ''});
      setError('');
    } else if (onPressStudent) {
      setClassUsernameStudent({value: text.trim(), error: ''});
      setError('');
    }
  };

  const onChangePassword = text => {
    setPassword({value: text.trim(), error: ''});
    setError('');
  };

  const isValidData = useMemo(
    () => email.value && password.value,
    [email, password],
  );

  const isValidGradeData = useMemo(
    () => classUsernameTeacher.value && password.value,
    [classUsernameTeacher, password],
  );

  const isValidStudentData = useMemo(
    () => classUsernameStudent.value && password.value,
    [classUsernameStudent, password],
  );

  const onPressLoginWithSchool = async () => {
    if (isValidData) {
      setIsVisibleLoading(true);
      const dataLogin = await schoolLogin({
        variables: {
          username: email.value,
          type: TYPE.SCHOOL,
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
        navigation.navigate('schoolDrawer');
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

  const onPressLoginWithGrade = async () => {
    if (isValidGradeData) {
      setIsVisibleLoading(true);
      const dataLogin = await schoolLogin({
        variables: {
          username: classUsernameTeacher.value,
          type: TYPE.GRADE,
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
        navigation.navigate('schoolDrawer');
      }
    } else {
      if (classUsernameTeacher.value === '') {
        setClassUsernameTeacher({
          value: classUsernameStudent.value,
          error: '*Enter your class name',
        });
      } else if (password.value === '') {
        setPassword({
          value: password.value,
          error: '*Enter your password',
        });
      }
    }
  };

  const onPressLoginWithStudent = async () => {
    if (isValidStudentData) {
      setIsVisibleLoading(true);
      const dataLogin = await schoolLogin({
        variables: {
          username: classUsernameStudent.value,
          type: TYPE.STUDENT,
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
        navigation.navigate('kidDrawer');
      }
    } else {
      if (classUsernameStudent.value === '') {
        setClassUsernameStudent({
          value: classUsernameStudent.value,
          error: '*Enter your student name',
        });
      } else if (password.value === '') {
        setPassword({
          value: password.value,
          error: '*Enter your password',
        });
      }
    }
  };

  const onPressSchoolLogin = () => {
    i18n.changeLanguage('en');
    setOnPressSchool(true);
    setOnPressTeacher(false);
    setOnPressStudent(false);
    setEmail({value: '', error: ''});
    setPassword({value: '', error: ''});
  };

  const onPressTeacherLogin = () => {
    setOnPressSchool(false);
    setOnPressStudent(false);
    setOnPressTeacher(true);
    setClassUsernameTeacher({value: '', error: ''});
    setPassword({value: '', error: ''});
  };

  const onPressStudentLogin = () => {
    setOnPressSchool(false);
    setOnPressTeacher(false);
    setOnPressStudent(true);
    setClassUsernameStudent({value: '', error: ''});
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
            style={{width: horizontalScale(1000)}}
            scrollEnabled={true}
            extraScrollHeight={120}
            keyboardShouldPersistTaps="handled"
            scrollToOverflowEnabled={true}
            enableAutomaticScroll={true}>
            <View
              style={{
                paddingHorizontal: 30,
                flexDirection: 'row',
              }}>
              <Image
                source={LOGO}
                style={{
                  width: 200,
                  height: 97,
                  marginTop: verticalScale(40),
                }}
                resizeMode="contain"
              />
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
              <View>
                <View style={DIRECTION_VIEW}>
                  <Text
                    text={'Educators Sign In'}
                    style={[
                      SUBTITLE,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(22)
                            : moderateScale(26),
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={BUTTON_KIDS_PARENTS_LOGIN_CONTAINER}>
              <TouchableOpacity
                style={[
                  BUTTON_KIDS_PARENTS_LOGIN,
                  {
                    borderColor: onPressSchool ? color.purple : color.dark4,
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(55)
                        : horizontalScale(70),
                  },
                ]}
                onPress={onPressSchoolLogin}>
                <Text
                  text={'School'}
                  style={[
                    BUTTON_COMMON_TEXT,
                    {
                      color: onPressSchool ? color.purple : color.dark4,
                      fontFamily: onPressSchool
                        ? typography.promptBold
                        : typography.promptRegular,
                      fontWeight: onPressSchool ? '700' : '400',
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
                    borderColor: onPressTeacher ? color.purple : color.dark4,
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(55)
                        : horizontalScale(70),
                  },
                ]}
                onPress={onPressTeacherLogin}>
                <Text
                  text={'Teacher'}
                  style={[
                    BUTTON_COMMON_TEXT,
                    {
                      color: onPressTeacher ? color.purple : color.dark4,
                      fontFamily: onPressTeacher
                        ? typography.promptBold
                        : typography.promptRegular,
                      fontWeight: onPressTeacher ? '700' : '400',
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
                    borderColor: onPressStudent ? color.purple : color.dark4,
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(55)
                        : horizontalScale(70),
                  },
                ]}
                onPress={onPressStudentLogin}>
                <Text
                  text={'Student'}
                  style={[
                    BUTTON_COMMON_TEXT,
                    {
                      color: onPressStudent ? color.purple : color.dark4,
                      fontFamily: onPressStudent
                        ? typography.promptBold
                        : typography.promptRegular,
                      fontWeight: onPressStudent ? '700' : '400',
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
                        ? horizontalScale(175)
                        : horizontalScale(220),
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                  },
                ]}
                onChangeText={
                  onPressSchool ? onChangeEmail : onChangeClassUsername
                }
                value={
                  onPressSchool
                    ? email.value
                    : onPressTeacher
                    ? classUsernameTeacher.value
                    : onPressStudent
                    ? classUsernameStudent.value
                    : null
                }
                placeholder={
                  onPressSchool
                    ? `${t('school_working_email')}`
                    : onPressTeacher
                    ? `${t('class_username')}`
                    : `${t('student_username')}`
                }
                keyboardType="email-address"
                placeholderTextColor={color.dark4}
                returnKeyType="next"
              />
              {onPressTeacher && classUsernameTeacher.error && (
                <Text text={classUsernameTeacher.error} style={TEXT_ERROR} />
              )}
              {onPressStudent && classUsernameStudent.error && (
                <Text text={classUsernameStudent.error} style={TEXT_ERROR} />
              )}
              {onPressSchool && email.error && (
                <Text text={email.error} style={TEXT_ERROR} />
              )}
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
                        ? horizontalScale(175)
                        : horizontalScale(220),
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
                        ? horizontalScale(150)
                        : horizontalScale(185),
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

            {onPressSchool && (
              <ButtonLinearGradient
                text={'School Sign In'}
                style={[
                  BUTTON_LOGIN_VIEW,
                  {
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(45),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(175)
                        : horizontalScale(220),
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
                onPress={onPressLoginWithSchool}
              />
            )}
            {onPressTeacher && (
              <ButtonLinearGradient
                text={'Teacher Sign In'}
                style={[
                  BUTTON_LOGIN_VIEW,
                  {
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(45),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(175)
                        : horizontalScale(220),
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
                onPress={onPressLoginWithGrade}
              />
            )}
            {onPressStudent && (
              <ButtonLinearGradient
                text={'Student Sign In'}
                style={[
                  BUTTON_LOGIN_VIEW,
                  {
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(45),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(175)
                        : horizontalScale(220),
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
                onPress={onPressLoginWithStudent}
              />
            )}

            <View>
              {onPressTeacher || onPressStudent ? (
                <View
                  style={[
                    FOOTER,
                    {
                      marginTop: verticalScale(20),
                      marginLeft: horizontalScale(40),
                    },
                  ]}>
                  <Text
                    text={
                      onPressTeacher
                        ? 'Ask your manager for class username and password'
                        : 'Ask your teacher for username and password'
                    }
                    style={[
                      TEXT_FOOTER,
                      {
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
                      marginLeft: horizontalScale(50),
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
                            : moderateScale(12),
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
                    onPress={() => navigation.navigate('signUpSchool')}
                  />
                </View>
              )}
            </View>
            <View
              style={[
                LOGIN_EDUCATOR_VIEW,
                {
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(65)
                      : horizontalScale(50),
                },
              ]}>
              <Text
                text={'Parent Sign In'}
                style={[
                  LOGIN_EDUCATOR_TEXT,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                    paddingHorizontal:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(20)
                        : horizontalScale(45),
                  },
                ]}
                onPress={() => navigation.navigate('login')}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginLeft:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(50)
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
            width:
              orientationOpenApp === 'LANDSCAPE'
                ? horizontalScale(110)
                : horizontalScale(160),
            height:
              orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(1100)
                : verticalScale(850),
            alignItems: 'center',
          }}>
          <Image
            source={BACKGROUND_STUDY}
            style={{
              width:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(150)
                  : horizontalScale(250),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(300)
                  : verticalScale(230),
              marginTop: verticalScale(25),
            }}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>
      <Loading isVisibleLoading={isVisibleLoading} />
    </View>
  );
};

const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',

  paddingHorizontal: horizontalScale(10),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptBold,

  fontWeight: '700',
  color: color.black1,
};

const INPUT_CONTAINER: ViewStyle = {
  marginTop: 5,
  marginLeft: horizontalScale(10),
};
const INPUT_EMAIL: any = {
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginEnd: 20,
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
  marginLeft: horizontalScale(10),
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
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: 30,
  marginLeft: horizontalScale(-10),
};
const BUTTON_COMMON_TEXT: TextStyle = {
  fontFamily: typography.promptBold,

  fontWeight: '500',
  color: color.purple,
};
const BUTTON_KIDS_PARENTS_LOGIN_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: verticalScale(20),
  width: '100%',
  marginLeft: horizontalScale(10),
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

  fontWeight: '400',
  color: color.dark4,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
const LOGIN_EDUCATOR_VIEW: ViewStyle = {
  justifyContent: 'center',
  marginTop: verticalScale(10),
};
const LOGIN_EDUCATOR_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.purple,
};
