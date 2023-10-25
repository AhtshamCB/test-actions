/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  ImageBackground,
  ImageStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
//
import {useVerifyPassword} from '@app/hook';
import {validatePassword} from '@app/utils';
import {InputObject} from '@app/models';
//
import {ButtonLinearGradient, Text} from '@app/components';
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
  BackgroundStudy6,
  EyeCrossedIcon,
  EyeIcon,
  TranslationIcon,
} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CountryPicker, {
  getAllCountries,
  FlagType,
} from 'react-native-country-picker-modal';

const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const SetPasswordRegionSchoolByPhone = ({navigation, route}) => {
  const {data} = route?.params || '';
  const {t, i18n} = useTranslation();

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

  const isValidData = useMemo(() => password.value.length > 8, [password]);

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
              top: verticalScale(-20),
            },
          ]}>
          <View style={TRANSLATION_VIEW}>
            <View style={TRANSLATION_CONTAINER}>
              <TouchableOpacity
                style={[DIRECTION_VIEW, {top: verticalScale(10)}]}
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
            <Text text={`${t('your_information')}`} style={TITLE} />
            <Text
              text={`${t('enter_your_password_and_select_your_country')}`}
              style={SUBTITLE}
            />
          </View>
          <View style={INPUT_PASSWORD_CONTAINER}>
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
          {password.error && <Text text={password.error} style={TEXT_ERROR} />}

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

          <ButtonLinearGradient
            text={`${t('continue')}`}
            style={BUTTON_LOGIN_VIEW}
            textStyle={TEXT_LOGIN}
            onPress={onPressEmailVerification}
          />
          <View style={FOOTER}>
            <Text text={`${t('manage_your_classes')}`} style={FOOTER_TEXT} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  marginTop: 20,
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
const FOOTER: ViewStyle = {
  alignItems: 'center',
  marginTop: verticalScale(10),
};
const FOOTER_TEXT: TextStyle = {
  fontSize: moderateScale(11),
  fontWeight: '500',
  color: color.gray7,
  fontFamily: typography.promptMedium,
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
const TITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(26),
  fontWeight: '500',
  color: color.black1,
  marginBottom: verticalScale(0),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(12),
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
const INPUT_PASSWORD: any = {
  height: verticalScale(40),
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginTop: 15,
  marginStart: 20,
  marginEnd: 20,
  fontSize: moderateScale(11),
};
