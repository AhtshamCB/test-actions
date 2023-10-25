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
import {REGISTER_OTP_QUERY} from '@app/apollo/query/register-otp-query';
import {useMutation} from '@apollo/client';
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
import {isValidWorkingMailAddress} from '@app/utils/general';
import {useTranslation} from 'react-i18next';
import {BackgroundStudy6, TranslationIcon} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TYPE} from '@app/utils/contants';

const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const SignUpSchoolByPhone = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [schoolRegisterOtp] = useMutation(REGISTER_OTP_QUERY);
  const [email, setEmail] = useState<InputObject>({
    value: '',
    error: '',
  });

  const onChangeEmail = text => {
    setEmail({value: text.trim(), error: ''});
  };

  const isValidData = useMemo(
    () => email.value && isValidWorkingMailAddress(email.value),
    [email],
  );

  const onPressEmailVerification = async () => {
    if (isValidData) {
      const dataRes = await schoolRegisterOtp({
        variables: {
          email: email.value,
          type: TYPE.SCHOOL,
          action: 'signup',
        },
      }).catch(res => {
        const errorData = res.graphQLErrors.map(error => error.message);
        setEmail({value: email.value, error: errorData});
      });
      if (dataRes?.data) {
        navigation.navigate('emailVerification', {
          data: dataRes?.data,
          isSchoolRegisterScreen: true,
        });
      }
    } else {
      if (email.value === '') {
        setEmail({value: email.value, error: `*${t('enter_your_email')}`});
      } else {
        setEmail({value: email.value, error: `*${t('invalid_working_email')}`});
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
              text={`${t('start_your_student_financial_success')}`}
              style={TITLE}
            />
            <Text text={`${t('create_school_account')}`} style={SUBTITLE} />
          </View>
          <View style={INPUT_CONTAINER}>
            <TextInput
              style={INPUT_EMAIL}
              onChangeText={onChangeEmail}
              value={email.value}
              placeholder={`${t('school_working_email')}`}
              keyboardType="default"
              placeholderTextColor={color.dark4}
            />
            {email.error && <Text text={email.error} style={TEXT_ERROR} />}
          </View>
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
const INPUT_CONTAINER: ViewStyle = {
  marginTop: 20,
};
const INPUT_EMAIL: any = {
  height: 46,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: color.dark5,
  paddingHorizontal: 15,
  marginEnd: 20,
  marginStart: 20,
  fontSize: moderateScale(11),
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
  fontSize: moderateScale(12),
  fontWeight: '500',
  color: color.black1,
  marginBottom: verticalScale(0),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(26),
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
