/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageStyle,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
//
import {useMutation} from '@apollo/client';
//
import {ButtonLinearGradient, Loading, Text} from '@app/components';
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
import {InputObject} from '@app/models';
import {leftTrim} from '@app/utils';
import {useDispatch} from 'react-redux';
import {SIGN_UP_QUERY} from '@app/apollo/query';
import CountryPicker, {
  getAllCountries,
  FlagType,
} from 'react-native-country-picker-modal';
import {
  ArrowDownIcon,
  BackgroundStudy6,
  EyeCrossedIcon,
  EyeIcon,
  TranslationIcon,
} from '@app/svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserActions} from '@app/redux';
import {useMe} from '@app/hook';

const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const CreateNameByPhone = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const {dataSignUp, otp} = route?.params;

  const [name, setName] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [errors, setError] = useState('');
  const [isVisiblePassword, setVisiblePassword] = useState(true);
  const [isFocusTextInput, setIsFocusTextInput] = useState<boolean>(false);
  const isFocusTextInputRef = useRef<boolean>(false);
  const [token, setToken] = useState('');
  const [isVisibleSelectCountry, setIsVisibleSelectCountry] =
    useState<boolean>(false);
  const [country, setCountry] = useState<InputObject>({
    value: 'SG',
    error: '',
  });
  const [nameCountry, setNameCountry] = useState<any>('Singapore');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState<boolean>(false);

  useEffect(() => {
    isFocusTextInputRef.current = isFocusTextInput;
  });

  const [parentSignup] = useMutation(SIGN_UP_QUERY, {errorPolicy: 'all'});

  const {getMeInfo} = useMe(token);

  const onChangeName = text => {
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setName({value: onlyLetter, error: ''});
      }
    } else {
      setName({value: onlyLetter, error: ''});
    }
  };

  const onChangePassword = text => {
    setPassword({value: text, error: ''});
  };

  const onSelectCountry = async item => {
    setCountry({value: item?.cca2, error: ''});
    const resCon = await getAllCountries(FlagType.FLAT);
    const resultNameCountry = resCon.find(
      items => items.cca2 === item?.cca2,
    )?.name;
    setNameCountry(resultNameCountry);
  };

  const isValidData = useMemo(
    () => name.value && password.value && country.value,
    [name, password, country],
  );

  const _onPressContinue = async () => {
    if (isValidData) {
      setDisabled(true);
      setIsVisibleLoading(true);
      const dataRes = await parentSignup({
        variables: {
          email: dataSignUp?.registerOtp?.email,
          code: otp,
          type: TYPE.PARENT,
          password: password.value,
          name: name.value,
          country: country.value,
        },
      }).catch(res => {
        setDisabled(false);
        const errors = res.graphQLErrors.map(error => error.message);
        setError(errors);
      });
      const {doSignUp} = dataRes?.data;
      if (doSignUp) {
        setIsVisibleLoading(false);
        setToken(doSignUp?.token);
        await AsyncStorage.setItem('userToken', doSignUp?.token);
        dispatch(UserActions.setToken(doSignUp?.token, ''));
        await getMeInfo();
        navigation.navigate('signUpSuccess');
      }
    } else {
      setDisabled(false);
      if (!name.value) {
        setName({value: name.value, error: '*Enter your name'});
      } else if (!password.value) {
        setPassword({value: password.value, error: '*Enter your password'});
      } else if (!country.value) {
        setCountry({value: country.value, error: '*Require'});
      }
    }
  };

  const _onFocus = () => {
    setIsFocusTextInput(true);
  };

  const _onBlur = async () => {
    setIsFocusTextInput(false);
  };
  return (
    <View style={CONTAINER_VIEW}>
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
          style={[
            BACKGROUND_CONTAINER,
            {
              height: verticalScale(400),
              top: verticalScale(-40),
            },
          ]}>
          <View style={TRANSLATION_VIEW}>
            <View style={TRANSLATION_CONTAINER}>
              <TouchableOpacity
                style={[DIRECTION_VIEW, {top: verticalScale(10)}]}
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
          <BackgroundStudy6 />
        </ImageBackground>
        <View style={BODY}>
          <View style={CONTAINER_HEADER_VIEW}>
            <Text
              text={`${t('your_information')}`}
              style={CREATE_ACCOUNT_TITLE}
            />
            <Text
              text={`${t('enter_your_name_and_password')}`}
              style={DESCRIPTION}
            />
          </View>
          <View style={INPUT_CONTAINER}>
            <TextInput
              style={INPUT_EMAIL}
              onChangeText={onChangeName}
              value={name.value}
              placeholder={`${t('first_name')}`}
              keyboardType="default"
              placeholderTextColor={color.dark4}
              onBlur={_onBlur}
              onFocus={_onFocus}
              returnKeyType="next"
            />
            {name.error && <Text text={name.error} style={TEXT_ERROR} />}
            {errors && <Text text={errors} style={TEXT_ERROR} />}
            <View style={INPUT_PASSWORD_CONTAINER}>
              <TextInput
                style={INPUT_PASSWORD}
                onChangeText={onChangePassword}
                value={password.value}
                placeholder={`${t('password')}`}
                keyboardType="default"
                placeholderTextColor={color.dark4}
                secureTextEntry={isVisiblePassword}
                onFocus={_onFocus}
                onBlur={_onBlur}
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

            <TouchableOpacity
              onPress={() => setIsVisibleSelectCountry(!isVisibleSelectCountry)}
              style={[
                INPUT_PASSWORD,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                },
              ]}>
              <CountryPicker
                visible={isVisibleSelectCountry}
                withCallingCode
                withFilter={true}
                countryCode={country.value}
                onSelect={onSelectCountry}
                containerButtonStyle={[
                  // INPUT_NAME_COMMON,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  },
                ]}
                onClose={() => setIsVisibleSelectCountry(false)}
              />
              <Text text={nameCountry} style={COUNTRY_TEXT} numberOfLines={1} />
              <ArrowDownIcon props={undefined} />
            </TouchableOpacity>
            {country.error && <Text text={country.error} style={TEXT_ERROR} />}
            {errors && <Text text={errors} style={TEXT_ERROR} />}
          </View>
          <ButtonLinearGradient
            disabled={disabled}
            text={`${t('signup')}`}
            style={BUTTON_LOGIN_VIEW}
            textStyle={TEXT_LOGIN}
            onPress={_onPressContinue}
          />
        </View>
        <Loading isVisibleLoading={isVisibleLoading} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  marginTop: 10,
};
const INPUT_CONTAINER: ViewStyle = {
  marginTop: 20,
};
const INPUT_EMAIL: ViewStyle = {
  height: 46,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginEnd: 20,
  marginStart: 20,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: 46,
  marginStart: 20,
  marginEnd: 20,
  marginTop: 20,
};
const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
  fontSize: moderateScale(14),
};
const TEXT_ERROR: TextStyle = {
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  marginLeft: horizontalScale(25),
};
const BODY: ViewStyle = {
  marginHorizontal: 5,
  marginTop: verticalScale(-50),
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
const CREATE_ACCOUNT_TITLE: TextStyle = {
  fontSize: moderateScale(24),
  fontWeight: '700',
  color: color.dark1,
  fontFamily: typography.promptBold,
};

const DESCRIPTION: TextStyle = {
  fontSize: moderateScale(14),
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
};

const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 35,
  bottom: 12,
};
const COUNTRY_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.black1,
  flex: 1,
};
const INPUT_PASSWORD_CONTAINER: ViewStyle = {};
const INPUT_PASSWORD: ViewStyle = {
  height: verticalScale(40),
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginTop: 15,
  marginStart: 20,
  marginEnd: 20,
};
