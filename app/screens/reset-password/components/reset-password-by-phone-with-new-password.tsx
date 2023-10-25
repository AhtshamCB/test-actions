/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  TouchableOpacity,
  ImageStyle,
  ImageBackground,
  Platform,
} from 'react-native';
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RESET_PASSWORD_QUERY} from '@app/apollo/query/reset-password-query';
import {useMutation} from '@apollo/client';
import {InputObject} from '@app/models';
//
import {useDispatch} from 'react-redux';
import {UserActions} from '@app/redux';
//
import {ButtonLinearGradient, Text, Header} from '@app/components';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {
  BackgroundStudy2,
  EyeCrossedIcon,
  EyeIcon,
  TranslationIcon,
} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//
import {TYPE} from '@app/utils/contants';
import {useTranslation} from 'react-i18next';

const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const ResetByPhoneWithNewPassword = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
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
    <View style={CONTAINER_VIEW}>
      <Header
        title={`${t('new_password')}`}
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={CONTAINER}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={Platform.OS === 'android' ? 100 : 50}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={true}>
        <ImageBackground
          source={HEADER_BACKGROUND}
          style={BACKGROUND_CONTAINER}>
          <View style={TRANSLATION_VIEW}>
            <View style={TRANSLATION_CONTAINER}>
              <TouchableOpacity
                style={[DIRECTION_VIEW, {top: verticalScale(70)}]}
                onPress={() => {
                  if (i18n.language === 'en') {
                    i18n.changeLanguage('vi');
                  } else {
                    i18n.changeLanguage('en');
                  }
                }}>
                <View
                  style={{
                    marginTop: verticalScale(2),
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
          </View>
          <BackgroundStudy2 width={385} height={450} />
        </ImageBackground>
        <View style={BODY}>
          <View style={CONTAINER_HEADER_VIEW}>
            <Text
              text={`${t('enter_new_password')}`}
              style={CREATE_ACCOUNT_TITLE}
            />
          </View>
          <View style={INPUT_CONTAINER}>
            <TextInput
              style={INPUT_EMAIL}
              onChangeText={onChangePassword}
              value={password.value}
              placeholder={`${t('new_password')}`}
              keyboardType="default"
              placeholderTextColor={color.dark4}
              secureTextEntry={isVisiblePassword}
            />
            <TouchableOpacity
              style={EYE_VIEW}
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
            style={BUTTON_LOGIN_VIEW}
            textStyle={TEXT_LOGIN}
            onPress={onPressResetPassword}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  marginTop: 20,
};
const BODY: ViewStyle = {
  marginHorizontal: 5,
};
const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 25,
};
const BACKGROUND_CONTAINER: ImageStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: verticalScale(400),
};
const CREATE_ACCOUNT_TITLE: TextStyle = {
  fontSize: moderateScale(25),
  fontWeight: '700',
  color: color.dark1,
  fontFamily: typography.promptBold,
};
const INPUT_CONTAINER: ViewStyle = {
  marginTop: 20,
};
const INPUT_EMAIL: ViewStyle = {
  height: verticalScale(40),
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginStart: 20,
  marginEnd: 20,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: verticalScale(40),
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20,
};
const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
  fontSize: moderateScale(14),
};
const TEXT_ERROR: TextStyle = {
  fontSize: 15,
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
};
const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 35,
  top: 15,
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(14),
  fontWeight: '500',
  color: color.black1,
};
const TRANSLATION_VIEW: ViewStyle = {
  alignSelf: 'flex-end',
};
const TRANSLATION_CONTAINER: ViewStyle = {
  marginRight: horizontalScale(15),
  marginTop: verticalScale(-10),
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
