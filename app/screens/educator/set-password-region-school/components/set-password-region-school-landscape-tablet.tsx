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
import {ButtonLinearGradient, Text} from '@app/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {useTranslation} from 'react-i18next';
import {InputObject} from '@app/models';
import {validatePassword} from '@app/utils';
import {
  ArrowDownIcon,
  EyeCrossedIcon,
  EyeIcon,
  TranslationIcon,
} from '@app/svg';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import CountryPicker, {
  getAllCountries,
  FlagType,
} from 'react-native-country-picker-modal';
import {useVerifyPassword} from '@app/hook';

const BACKGROUND_STUDY = require('@app/components/images/background-study-8.png');
const BACKGROUND_LANDSCAPE_TABLET = require('@app/components/images/background-landscape-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const SetPasswordRegionSchoolTabletLandscape = ({navigation, route}) => {
  const {data} = route?.params || '';
  const {t, i18n} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);

  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [isVisiblePassword, setVisiblePassword] = useState(true);
  const [isVisibleSelectCountry, setIsVisibleSelectCountry] =
    useState<boolean>(false);
  const [country, setCountry] = useState<InputObject>({
    value: 'SG',
    error: '',
  });
  const [nameCountry, setNameCountry] = useState<any>('Singapore');

  const {verifyPassword} = useVerifyPassword(password.value);

  const onSelectCountry = async item => {
    setCountry({value: item?.cca2, error: ''});
    const resCon = await getAllCountries(FlagType.FLAT);
    const resultNameCountry = resCon.find(
      items => items.cca2 === item?.cca2,
    )?.name;
    setNameCountry(resultNameCountry);
  };

  const isValidData = useMemo(() => password.value.length > 8, [password]);

  const onChangePassword = text => {
    const onlyLetter = validatePassword(text.trim());
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setPassword({value: onlyLetter, error: ''});
      }
    } else {
      setPassword({value: onlyLetter, error: ''});
    }
  };

  const onPressEmailVerification = async () => {
    if (isValidData) {
      const dataRes = await verifyPassword();
      if (dataRes?.data) {
        navigation.navigate('registerSchoolInfo', {
          dataEmailAndCode: data,
          dataPassword: password.value,
          country: country.value,
        });
      } else {
        const error: any = dataRes?.errors;
        setPassword({value: password.value, error: `${error.message}`});
      }
    } else {
      if (password.value.length > 0 && password.value.length < 8) {
        setPassword({
          value: password.value,
          error: '*Password must be longer than or equal to 8 characters',
        });
      } else if (!password.value) {
        setPassword({
          value: password.value,
          error: '*Please enter your password',
        });
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
                  : verticalScale(600),
            },
          ]}>
          <Image
            source={BACKGROUND_STUDY}
            style={[
              IMAGE_BACKGROUND,
              {
                width:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(400)
                    : horizontalScale(300),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(350)
                    : verticalScale(250),
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
            <View style={[BODY]}>
              <View style={CONTAINER_HEADER_VIEW}>
                <Text
                  text={`${t('your_information')}`}
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
                <Text
                  text={`${t('enter_your_password_and_select_your_country')}`}
                  style={[
                    TITLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(11),
                    },
                  ]}
                />
              </View>

              <View
                style={{
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE' ? horizontalScale(5) : 0,
                }}>
                <TextInput
                  style={[
                    INPUT_COMMON,
                    {
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(60)
                          : verticalScale(40),
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(150)
                          : horizontalScale(210),
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
                      right:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(30)
                          : horizontalScale(35),
                      bottom:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(18)
                          : verticalScale(12),
                    },
                  ]}
                  onPress={() => setVisiblePassword(!isVisiblePassword)}>
                  {isVisiblePassword ? <EyeCrossedIcon /> : <EyeIcon />}
                </TouchableOpacity>
              </View>
              {password.error && (
                <Text
                  text={password.error}
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
              <View
                style={{
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE' ? horizontalScale(5) : 0,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    setIsVisibleSelectCountry(!isVisibleSelectCountry)
                  }
                  style={[
                    INPUT_COMMON,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(60)
                          : verticalScale(40),
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(150)
                          : horizontalScale(210),
                    },
                  ]}>
                  <CountryPicker
                    visible={isVisibleSelectCountry}
                    withCallingCode
                    withFilter={true}
                    countryCode={country.value}
                    onSelect={onSelectCountry}
                    containerButtonStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      height: verticalScale(35),
                    }}
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
              </View>
              <ButtonLinearGradient
                text={`${t('continue')}`}
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
                        : horizontalScale(200),
                  },
                ]}
                textStyle={[
                  TEXT_LOGIN,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(11)
                        : moderateScale(13),
                  },
                ]}
                onPress={onPressEmailVerification}
              />
              <View
                style={[
                  FOOTER,
                  {
                    marginRight:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(0)
                        : horizontalScale(20),
                  },
                ]}>
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
  alignItems: 'center',
  marginLeft: horizontalScale(-50),
};
const IMAGE_BACKGROUND: ImageStyle = {
  marginTop: verticalScale(100),
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
  paddingHorizontal: horizontalScale(15),
};
const BODY: ViewStyle = {
  marginHorizontal: 5,
  marginTop: verticalScale(70),
};
const LOGO_IMAGE: ImageStyle = {
  width: 200,
  height: 97,
  marginTop: verticalScale(40),
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,

  marginTop: verticalScale(20),
  marginLeft: horizontalScale(15),
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
  paddingHorizontal: 30,
};
const TITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '400',
  color: color.black1,
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.black1,
};
const FOOTER: ViewStyle = {
  alignItems: 'center',
  marginTop: verticalScale(15),
};
const FOOTER_TEXT: TextStyle = {
  fontWeight: '400',
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
const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
};
const COUNTRY_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  flex: 1,
};
const INPUT_COMMON: ViewStyle = {
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginTop: 15,
  marginStart: 20,
  marginEnd: 20,
};
