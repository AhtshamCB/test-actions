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
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {InputObject} from '@app/models';
import {useVerifyPassword} from '@app/hook';
import {validatePassword} from '@app/utils';
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
import {
  ArrowDownIcon,
  EyeCrossedIcon,
  EyeIcon,
  TranslationIcon,
} from '@app/svg';
import CountryPicker, {
  getAllCountries,
  FlagType,
} from 'react-native-country-picker-modal';

const BACKGROUND_STUDY = require('@app/components/images/background-study-8.png');
const BACKGROUND_PORTRAIT_TABLET = require('@app/components/images/background-portrait-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const SetPasswordRegionSchoolTabletPortrait = ({navigation, route}) => {
  const {data} = route?.params || '';
  const {t, i18n} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);

  const [isVisiblePassword, setVisiblePassword] = useState(true);
  const [isVisibleSelectCountry, setIsVisibleSelectCountry] =
    useState<boolean>(false);
  const [country, setCountry] = useState<InputObject>({
    value: 'SG',
    error: '',
  });
  const [nameCountry, setNameCountry] = useState<any>('Singapore');
  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });

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
      <View style={CONTENT}>
        <View style={BODY}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            scrollEnabled={true}
            style={{width: 1000}}
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
                      ? verticalScale(250)
                      : verticalScale(180),
                },
              ]}>
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
              <View style={{width: horizontalScale(180)}}>
                <Text
                  text={`${t('enter_your_password_and_select_your_country')}`}
                  style={[
                    TITLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(11),
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  marginTop:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(40)
                      : verticalScale(40),
                }}>
                <TextInput
                  style={[
                    INPUT_COMMON,
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
                          ? horizontalScale(2)
                          : horizontalScale(8),
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
                        : verticalScale(45),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(150)
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
            </View>
            <ButtonLinearGradient
              text={`${t('continue')}`}
              style={[
                BUTTON_LOGIN_VIEW,
                {
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(45),
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
                      ? moderateScale(10)
                      : moderateScale(12),
                },
              ]}
              onPress={onPressEmailVerification}
            />
            <View style={FOOTER}>
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
                  : horizontalScale(190),
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
                  ? horizontalScale(130)
                  : horizontalScale(230),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(350)
                  : verticalScale(200),
              marginTop: verticalScale(25),
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
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.black1,
  marginBottom: verticalScale(10),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.black1,
  flex: 1,
};
const IMAGE_BACKGROUND: ImageStyle = {
  width: horizontalScale(190),
  height: verticalScale(850),
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
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: horizontalScale(5),
};
const FOOTER: ViewStyle = {
  marginTop: verticalScale(15),
  marginLeft: horizontalScale(25),
};
const FOOTER_TEXT: TextStyle = {
  fontWeight: '500',
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
const INPUT_COMMON: ViewStyle = {
  height: verticalScale(45),
  width: horizontalScale(200),
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginTop: 20,
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
