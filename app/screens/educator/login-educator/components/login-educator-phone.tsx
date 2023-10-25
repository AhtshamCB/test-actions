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
import {color, moderateScale, typography, verticalScale} from '@app/theme';
//
import {useTranslation} from 'react-i18next';
import {InputObject} from '@app/models';
import {TYPE} from '@app/utils/contants';
//
import {BackgroundStudy5, EyeCrossedIcon, EyeIcon} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const LoginEducatorByPhone = ({navigation}) => {
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
          resizeMode="stretch"
          source={HEADER_BACKGROUND}
          style={[
            BACKGROUND_CONTAINER,
            {
              height: verticalScale(360),
              top: isIPhone8PlusOrBelow()
                ? verticalScale(-10)
                : verticalScale(-20),
            },
          ]}>
          <BackgroundStudy5 />
        </ImageBackground>
        <View
          style={{
            flex: 1,
            top: isIPhone8PlusOrBelow() ? verticalScale(0) : verticalScale(-20),
          }}>
          <View style={CONTAINER_HEADER_VIEW}>
            <Text
              text={`${t('start_your_student_financial_success')}`}
              style={TITLE}
            />
            <View>
              <View style={DIRECTION_VIEW}>
                <Text
                  text={`${t('sign_in_teefi_educator')}`}
                  style={SUBTITLE}
                />
              </View>
            </View>
          </View>
          <View style={BUTTON_KIDS_PARENTS_LOGIN_CONTAINER}>
            <TouchableOpacity
              style={[
                BUTTON_COMMON_LOGIN,
                {
                  borderColor: onPressSchool ? color.purple : color.dark4,
                  width: '32%',
                },
              ]}
              onPress={onPressSchoolLogin}>
              <Text
                text={'School'}
                style={[
                  KIDS_TEXT,
                  {
                    color: onPressSchool ? color.purple : color.dark4,
                    fontFamily: onPressSchool
                      ? typography.promptBold
                      : typography.promptRegular,
                    fontWeight: onPressSchool ? '700' : '400',
                  },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                BUTTON_COMMON_LOGIN,
                {
                  borderColor: onPressTeacher ? color.purple : color.dark4,
                  width: '32%',
                },
              ]}
              onPress={onPressTeacherLogin}>
              <Text
                text={'Teacher'}
                style={[
                  KIDS_TEXT,
                  {
                    color: onPressTeacher ? color.purple : color.dark4,
                    fontFamily: onPressTeacher
                      ? typography.promptBold
                      : typography.promptRegular,
                    fontWeight: onPressTeacher ? '700' : '400',
                  },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                BUTTON_COMMON_LOGIN,
                {
                  borderColor: onPressStudent ? color.purple : color.dark4,
                  width: '32%',
                },
              ]}
              onPress={onPressStudentLogin}>
              <Text
                text={'Student'}
                style={[
                  KIDS_TEXT,
                  {
                    color: onPressStudent ? color.purple : color.dark4,
                    fontFamily: onPressStudent
                      ? typography.promptBold
                      : typography.promptRegular,
                    fontWeight: onPressStudent ? '700' : '400',
                  },
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={INPUT_CONTAINER}>
            <TextInput
              style={INPUT_EMAIL}
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
          {onPressSchool && (
            <ButtonLinearGradient
              text={`${t('sign_in_school')}`}
              style={BUTTON_LOGIN_VIEW}
              textStyle={TEXT_LOGIN}
              onPress={onPressLoginWithSchool}
            />
          )}
          {onPressTeacher && (
            <ButtonLinearGradient
              text={`${t('sign_in_teacher')}`}
              style={BUTTON_LOGIN_VIEW}
              textStyle={TEXT_LOGIN}
              onPress={onPressLoginWithGrade}
            />
          )}
          {onPressStudent && (
            <ButtonLinearGradient
              text={`${t('sign_in_student')}`}
              style={BUTTON_LOGIN_VIEW}
              textStyle={TEXT_LOGIN}
              onPress={onPressLoginWithStudent}
            />
          )}

          <View>
            {onPressTeacher || onPressStudent ? (
              <View style={[FOOTER, {marginTop: 0}]}>
                <Text
                  text={
                    onPressTeacher
                      ? 'Ask your manager for class username and password'
                      : 'Ask your teacher for username and password'
                  }
                  style={TEXT_FOOTER}
                />
              </View>
            ) : (
              <View style={[FOOTER, {marginTop: 15}]}>
                <Text
                  text={`${t('forgot_password')}`}
                  style={FOOTER_TEXT}
                  onPress={() =>
                    navigation.navigate('resetPasswordWithEmail', {
                      isFromSchool: true,
                    })
                  }
                />
                <Text
                  text={'|'}
                  style={[FOOTER_TEXT, {marginStart: 10, marginEnd: 10}]}
                />
                <Text
                  text={`${t('create_an_account')}`}
                  style={FOOTER_TEXT}
                  onPress={() => navigation.navigate('signUpSchool')}
                />
              </View>
            )}
          </View>
          <View
            style={[
              LOGIN_PARENT_KID_VIEW,
              {
                marginTop: onPressSchool
                  ? verticalScale(10)
                  : verticalScale(-5),
              },
            ]}>
            <Text
              text={'Parent Sign In'}
              style={LOGIN_PARENT_KID_TEXT}
              onPress={() => navigation.navigate('login')}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: isIPhone8PlusOrBelow()
                ? verticalScale(5)
                : verticalScale(20),
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
const TITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.black1,
  marginBottom: verticalScale(0),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(20),
  fontWeight: '500',
  color: color.black1,
};

const INPUT_CONTAINER: ViewStyle = {
  marginTop: 5,
};
const INPUT_EMAIL: any = {
  height: 46,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginStart: 20,
  marginEnd: 20,
  fontSize: moderateScale(11),
};
const INPUT_PASSWORD: any = {
  height: 46,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginTop: 15,
  marginStart: 20,
  marginEnd: 20,
  fontSize: moderateScale(11),
};
const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 35,
  bottom: 12,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: 46,
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
  padding: isIPhone8PlusOrBelow() ? 10 : 20,
};
const BUTTON_COMMON_LOGIN: ViewStyle = {
  backgroundColor: color.white,
  height: 42,
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
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
const LOGIN_PARENT_KID_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const LOGIN_PARENT_KID_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.purple,
  paddingHorizontal: 10,
};
