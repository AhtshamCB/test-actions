/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useRef, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {SIGN_UP_QUERY} from '@app/apollo/query';
import CountryPicker, {
  getAllCountries,
  FlagType,
} from 'react-native-country-picker-modal';
import {
  ArrowDownIcon,
  EyeCrossedIcon,
  EyeIcon,
  TranslationIcon,
} from '@app/svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selector, UserActions} from '@app/redux';
import {useMe} from '@app/hook';

const BACKGROUND_STUDY = require('@app/components/images/background-study-8.png');
const BACKGROUND_PORTRAIT_TABLET = require('@app/components/images/background-portrait-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const CreateNameTabletPortrait = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);

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
    <View>
      <View style={CONTENT}>
        <View style={BODY}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            scrollEnabled={true}
            style={{width: horizontalScale(300)}}
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
                    setCountry({value: 'VN', error: ''});
                    setNameCountry('Vietnam');
                  } else {
                    i18n.changeLanguage('en');
                    setCountry({value: 'SG', error: ''});
                    setNameCountry('Singapore');
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
                      ? verticalScale(280)
                      : verticalScale(180),
                },
              ]}>
              <Text
                text={`${t('your_information')}`}
                style={[
                  TITLE,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(27)
                        : moderateScale(29),
                  },
                ]}
              />
              <View style={{width: horizontalScale(180)}}>
                <Text
                  text={`${t('enter_your_name_and_password')}`}
                  style={[
                    SUBTITLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(12),
                      paddingHorizontal: horizontalScale(5),
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
                        ? horizontalScale(180)
                        : horizontalScale(200),
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10),
                  },
                ]}
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
                  style={[
                    INPUT_PASSWORD,
                    {
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(60)
                          : verticalScale(45),
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(180)
                          : horizontalScale(200),
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
                  onFocus={_onFocus}
                  onBlur={_onBlur}
                />

                <TouchableOpacity
                  style={[
                    EYE_VIEW,
                    {
                      right:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(120)
                          : 35,
                      bottom:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(20)
                          : verticalScale(15),
                    },
                  ]}
                  onPress={() => setVisiblePassword(!isVisiblePassword)}>
                  {isVisiblePassword ? <EyeCrossedIcon /> : <EyeIcon />}
                </TouchableOpacity>
              </View>
              {password.error && (
                <Text text={password.error} style={TEXT_ERROR} />
              )}

              <TouchableOpacity
                onPress={() =>
                  setIsVisibleSelectCountry(!isVisibleSelectCountry)
                }
                style={[
                  INPUT_PASSWORD,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(45),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(180)
                        : horizontalScale(200),
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
                <Text
                  text={nameCountry}
                  style={[
                    COUNTRY_TEXT,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                    },
                  ]}
                  numberOfLines={1}
                />
                <ArrowDownIcon props={undefined} />
              </TouchableOpacity>
              {country.error && (
                <Text text={country.error} style={TEXT_ERROR} />
              )}
              {errors && <Text text={errors} style={TEXT_ERROR} />}
            </View>
            <ButtonLinearGradient
              disabled={disabled}
              text={`${t('signup')}`}
              style={[
                BUTTON_LOGIN_VIEW,
                {
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(45),
                  width:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(180)
                      : horizontalScale(200),
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
              onPress={_onPressContinue}
            />
            <Loading isVisibleLoading={isVisibleLoading} />
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
                  : horizontalScale(180),
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
                  ? horizontalScale(120)
                  : horizontalScale(200),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(400)
                  : verticalScale(190),
              marginTop: verticalScale(20),
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
  fontFamily: typography.promptBold,

  fontWeight: '700',
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
const COUNTRY_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.black1,
  flex: 1,
};
const INPUT_PASSWORD_CONTAINER: ViewStyle = {};
const INPUT_PASSWORD: ViewStyle = {
  height: verticalScale(45),
  width: horizontalScale(200),
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginTop: 15,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(50),
  marginLeft: horizontalScale(40),
  justifyContent: 'center',
  alignItems: 'center',
};
