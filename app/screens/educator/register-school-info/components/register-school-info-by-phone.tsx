/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
//
import {useDispatch} from 'react-redux';
import {UserActions} from '@app/redux';
import {InputObject} from '@app/models';
//
import {ButtonLinearGradient, Loading, Text} from '@app/components';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {useMe, useRegisterSchool} from '@app/hook';
import {EducatorRoleData, SchoolTitleOptionData} from '@app/utils/contants';
//
import {useTranslation} from 'react-i18next';
import {BackgroundStudy6, TranslationIcon} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {leftTrim} from '@app/utils';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-paper';

const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const RegisterSchoolInfoByPhone = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {dataEmailAndCode, dataPassword, country} = route?.params || '';
  const {t, i18n} = useTranslation();

  const [token, setToken] = useState('');
  const [isVisibleLoading, setIsVisibleLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [title, setTitle] = useState<InputObject>({
    value: 'Mr',
    error: '',
  });
  const [firstName, setFirstName] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [lastName, setLastName] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [schoolName, setSchoolName] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [schoolAddress, setSchoolAddress] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [studentAccountsRegister, setStudentAccountsRegister] =
    useState<InputObject>({
      value: '',
      error: '',
    });

  const [schoolRole, setSchoolRole] = useState<InputObject>({
    value: 'Manager',
    error: '',
  });
  const [isFocusTitle, setIsFocusTitle] = useState(false);
  const [isFocusEducatorRole, setIsFocusEducatorRole] = useState(false);

  const onChangeFirstName = text => {
    setFirstName({value: leftTrim(text), error: ''});
  };

  const onChangeLastName = text => {
    setLastName({value: leftTrim(text), error: ''});
  };

  const onChangeSchoolName = text => {
    setSchoolName({value: leftTrim(text), error: ''});
  };

  const onChangeSchoolAddress = text => {
    setSchoolAddress({value: leftTrim(text), error: ''});
  };

  const onChangeStudentAccountsRegister = text => {
    setStudentAccountsRegister({value: text, error: ''});
  };

  const {getMeInfo} = useMe(token);

  const {registerSchool} = useRegisterSchool(
    schoolAddress.value,
    country,
    schoolRole.value,
    dataEmailAndCode?.registerOtp?.email,
    firstName.value,
    lastName.value,
    dataEmailAndCode?.registerOtp?.code,
    title.value,
    dataPassword,
    schoolName.value,
    parseInt(studentAccountsRegister.value, 10),
  );

  const isValidData = useMemo(
    () =>
      title.value &&
      firstName.value &&
      lastName.value &&
      schoolRole &&
      schoolName.value &&
      schoolAddress.value &&
      studentAccountsRegister.value,
    [
      title,
      firstName,
      lastName,
      schoolRole,
      schoolName,
      schoolAddress,
      studentAccountsRegister,
    ],
  );

  const onPressEmailVerification = async () => {
    if (isValidData) {
      setDisabled(true);
      setIsVisibleLoading(true);
      const dataRes = await registerSchool();
      if (dataRes?.data) {
        setIsVisibleLoading(false);
        setToken(dataRes?.data?.registerSchool?.token);
        await AsyncStorage.setItem(
          'userToken',
          dataRes?.data?.registerSchool?.token,
        );
        dispatch(
          UserActions.setToken(dataRes?.data?.registerSchool?.token, ''),
        );
        await getMeInfo();
        navigation.navigate('signUpSuccess');
      } else {
        setDisabled(false);
        setIsVisibleLoading(false);
      }
    } else {
      if (!title.value) {
        setTitle({value: title.value, error: '*Please enter your title'});
      } else if (!firstName.value) {
        setFirstName({
          value: firstName.value,
          error: '*Please enter your First Name',
        });
      } else if (!lastName.value) {
        setLastName({
          value: lastName.value,
          error: '*Please enter your Last Name',
        });
      } else if (!schoolRole.value) {
        setSchoolRole({
          value: schoolRole.value,
          error: '*Please enter your Educator Role',
        });
      } else if (!schoolName.value) {
        setSchoolName({
          value: schoolName.value,
          error: '*Please enter your School Name',
        });
      } else if (!schoolAddress.value) {
        setSchoolAddress({
          value: schoolAddress.value,
          error: '*Please enter your School Address',
        });
      } else if (!studentAccountsRegister.value) {
        setStudentAccountsRegister({
          value: studentAccountsRegister.value,
          error: '*Please enter your Student Accounts Register',
        });
      }
    }
  };

  const renderLabel = text => {
    return (
      <Text
        text={text}
        style={[
          LABEL,
          {
            paddingHorizontal: horizontalScale(5),
            fontSize: moderateScale(12),
          },
        ]}
      />
    );
  };

  const renderItemDropdown = item => {
    return (
      <View style={{padding: 10}}>
        <Text text={item.label} style={ITEM_DROPDOWN_TEXT} />
        <View style={SEPARATE_DROPDOWN} />
      </View>
    );
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
              height: verticalScale(340),
              top: verticalScale(-50),
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
                      fontSize: moderateScale(14),
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
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
            <Text text={`${t('register_for_your_school')}`} style={SUBTITLE} />
          </View>
          <View style={INPUT_CONTAINER}>
            <View style={INPUT_TITLE_VIEW}>
              {renderLabel('Title')}
              <Dropdown
                style={[
                  INPUT_NAME_COMMON,
                  {
                    paddingHorizontal: horizontalScale(15),
                    borderColor: color.dark5,
                    borderWidth: 1,
                    borderRadius: 40,
                    height: verticalScale(35),
                    width: '100%',
                  },
                ]}
                itemContainerStyle={{height: 35}}
                placeholderStyle={[
                  PLACEHOLDER_STYLE,
                  {
                    fontSize: moderateScale(12),
                  },
                ]}
                selectedTextStyle={[
                  SELECTED_TEXT_STYLE,
                  {
                    fontSize: moderateScale(12),
                  },
                ]}
                data={SchoolTitleOptionData}
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder={
                  !isFocusTitle
                    ? title.value === ''
                      ? '...'
                      : title.value
                    : '...'
                }
                value={title.value}
                onFocus={() => setIsFocusTitle(true)}
                onBlur={() => setIsFocusTitle(false)}
                onChange={item => {
                  setTitle({value: item.value, error: ''});
                  setIsFocusTitle(false);
                }}
                renderItem={renderItemDropdown}
              />
            </View>
            <View style={INPUT_FIRST_LAST_NAME_COMMON_VIEW}>
              <TextInput
                label={'First Name'}
                mode={'outlined'}
                style={[
                  INPUT_NAME_COMMON,
                  {
                    height: verticalScale(35),
                    width: horizontalScale(170),
                    fontSize: moderateScale(12),
                  },
                ]}
                onChangeText={onChangeFirstName}
                value={firstName.value}
                placeholder={`${t('first_name')}`}
                keyboardType="default"
                placeholderTextColor={color.dark4}
                outlineStyle={{
                  borderColor: firstName.error ? color.red : color.dark5,
                  borderWidth: 1,
                }}
                activeOutlineColor={color.black1}
                outlineColor={color.black1}
              />
              <View style={{width: horizontalScale(5)}} />
              <TextInput
                label={'Last Name'}
                mode={'outlined'}
                style={[
                  INPUT_NAME_COMMON,
                  {
                    height: verticalScale(35),
                    width: horizontalScale(170),
                    fontSize: moderateScale(12),
                  },
                ]}
                onChangeText={onChangeLastName}
                value={lastName.value}
                placeholder={`${t('last_name')}`}
                keyboardType="default"
                placeholderTextColor={color.dark4}
                outlineStyle={{
                  borderColor: lastName.error ? color.red : color.dark5,
                  borderWidth: 1,
                }}
                activeOutlineColor={color.black1}
                outlineColor={color.black1}
              />
            </View>
            <View style={INPUT_EDUCATOR_ROLE_VIEW}>
              {renderLabel('Educator Role')}
              <Dropdown
                style={[
                  INPUT_NAME_COMMON,
                  {
                    paddingHorizontal: horizontalScale(15),
                    borderColor: color.dark5,
                    borderWidth: 1,
                    borderRadius: 40,
                    height: verticalScale(35),
                    width: '100%',
                  },
                ]}
                itemContainerStyle={{height: 35}}
                placeholderStyle={[
                  PLACEHOLDER_STYLE,
                  {
                    fontSize: moderateScale(12),
                  },
                ]}
                selectedTextStyle={[
                  SELECTED_TEXT_STYLE,
                  {
                    fontSize: moderateScale(12),
                  },
                ]}
                data={EducatorRoleData}
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder={
                  !isFocusEducatorRole
                    ? schoolRole.value === ''
                      ? '...'
                      : schoolRole.value
                    : '...'
                }
                value={schoolRole.value}
                onFocus={() => setIsFocusEducatorRole(true)}
                onBlur={() => setIsFocusEducatorRole(false)}
                onChange={item => {
                  setSchoolRole({value: item.value, error: ''});
                  setIsFocusEducatorRole(false);
                }}
                renderItem={renderItemDropdown}
              />
            </View>
            <View style={INPUT_VIEW_COMMON}>
              <TextInput
                label={'School Name'}
                mode={'outlined'}
                style={[
                  INPUT_NAME_COMMON,
                  {
                    height: verticalScale(35),
                    width: 'auto',
                    fontSize: moderateScale(12),
                  },
                ]}
                onChangeText={onChangeSchoolName}
                value={schoolName.value}
                placeholder={`${t('school_name')}`}
                keyboardType="default"
                placeholderTextColor={color.dark4}
                outlineStyle={{
                  borderColor: schoolName.error ? color.red : color.dark5,
                  borderWidth: 1,
                }}
                activeOutlineColor={color.black1}
                outlineColor={color.black1}
              />
            </View>
            <View style={INPUT_VIEW_COMMON}>
              <TextInput
                label={'School Address'}
                mode={'outlined'}
                style={[
                  INPUT_NAME_COMMON,
                  {
                    height: verticalScale(35),
                    width: 'auto',
                    fontSize: moderateScale(12),
                  },
                ]}
                onChangeText={onChangeSchoolAddress}
                value={schoolAddress.value}
                placeholder={`${t('address')}`}
                keyboardType="default"
                placeholderTextColor={color.dark4}
                outlineStyle={{
                  borderColor: schoolAddress.error ? color.red : color.dark5,
                  borderWidth: 1,
                }}
                activeOutlineColor={color.black1}
                outlineColor={color.black1}
              />
            </View>

            <View style={INPUT_VIEW_COMMON}>
              <TextInput
                label={'Student Account Register'}
                mode={'outlined'}
                style={[
                  INPUT_NAME_COMMON,
                  {
                    height: verticalScale(35),
                    width: 'auto',
                    fontSize: moderateScale(12),
                  },
                ]}
                onChangeText={onChangeStudentAccountsRegister}
                value={studentAccountsRegister.value}
                placeholder={`${t('how_many_student_account_register')}`}
                keyboardType="number-pad"
                placeholderTextColor={color.dark4}
                outlineStyle={{
                  borderColor: studentAccountsRegister.error
                    ? color.red
                    : color.dark5,
                  borderWidth: 1,
                }}
                activeOutlineColor={color.black1}
                outlineColor={color.black1}
              />
            </View>
          </View>
          <ButtonLinearGradient
            disabled={disabled}
            text={`${t('done')}`}
            style={BUTTON_LOGIN_VIEW}
            textStyle={TEXT_LOGIN}
            onPress={onPressEmailVerification}
          />
          <View style={FOOTER}>
            <Text text={`${t('manage_your_classes')}`} style={FOOTER_TEXT} />
          </View>
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
  marginTop: 20,
};
const INPUT_CONTAINER: ViewStyle = {
  marginTop: verticalScale(0),
  justifyContent: 'center',
};
const INPUT_TITLE_VIEW: ViewStyle = {
  marginTop: verticalScale(10),
  marginLeft: horizontalScale(10),
  marginRight: horizontalScale(10),
};
const INPUT_FIRST_LAST_NAME_COMMON_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(10),
};
const INPUT_EDUCATOR_ROLE_VIEW: ViewStyle = {
  marginTop: verticalScale(15),
  marginLeft: horizontalScale(10),
  marginRight: horizontalScale(10),
};
const INPUT_VIEW_COMMON: ViewStyle = {
  marginTop: verticalScale(10),
  marginLeft: horizontalScale(10),
  marginRight: horizontalScale(10),
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: 46,
  marginStart: 20,
  marginEnd: 20,
  marginTop: verticalScale(10),
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
const BODY: ViewStyle = {
  marginHorizontal: 5,
  marginTop: verticalScale(-60),
};
const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(15),
};
const BACKGROUND_CONTAINER: ImageStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: verticalScale(400),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(20),
  fontWeight: '700',
  color: color.black1,
};
const TRANSLATION_VIEW: ViewStyle = {
  alignSelf: 'flex-end',
};
const TRANSLATION_CONTAINER: ViewStyle = {
  marginRight: horizontalScale(15),
  marginTop: verticalScale(10),
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
const PLACEHOLDER_STYLE: TextStyle = {
  fontSize: moderateScale(11),
  color: color.black1,
};
const SELECTED_TEXT_STYLE: TextStyle = {
  fontSize: moderateScale(11),
  color: color.black1,
};
const ITEM_DROPDOWN_TEXT: TextStyle = {
  fontSize: moderateScale(12),
  color: color.purple,
};
const SEPARATE_DROPDOWN: ViewStyle = {
  width: '100%',
  height: verticalScale(1),
  backgroundColor: color.gray2,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(10),
};
const LABEL: TextStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  left: horizontalScale(10),
  top: verticalScale(-8),
  zIndex: 999,
};
const INPUT_NAME_COMMON: any = {
  backgroundColor: color.white,
  fontSize: moderateScale(10),
};
