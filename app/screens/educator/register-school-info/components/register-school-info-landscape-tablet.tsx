/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {selector, UserActions} from '@app/redux';
import {useMe, useRegisterSchool} from '@app/hook';
import {EducatorRoleData, SchoolTitleOptionData} from '@app/utils/contants';
//

import {useTranslation} from 'react-i18next';
import {InputObject} from '@app/models';
import {TranslationIcon} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isTablet} from 'react-native-device-info';
import Modal from 'react-native-modal';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-paper';

const BACKGROUND_STUDY = require('@app/components/images/background-study-8.png');
const BACKGROUND_LANDSCAPE_TABLET = require('@app/components/images/background-landscape-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const RegisterSchoolInfoTabletLandscape = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {dataEmailAndCode, dataPassword, country} = route?.params || '';
  const {t, i18n} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);

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
  const [schoolRole, setSchoolRole] = useState<InputObject>({
    value: 'Manager',
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

  const [isVisible, setIsVisible] = useState(false);
  const [isFocusTitle, setIsFocusTitle] = useState(false);
  const [isFocusEducatorRole, setIsFocusEducatorRole] = useState(false);

  const onChangeFirstName = text => {
    setFirstName({value: text.trim(), error: ''});
  };

  const onChangeLastName = text => {
    setLastName({value: text.trim(), error: ''});
  };

  const onChangeSchoolName = text => {
    setSchoolName({value: text.trim(), error: ''});
  };

  const onChangeSchoolAddress = text => {
    setSchoolAddress({value: text.trim(), error: ''});
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
      schoolName.value &&
      schoolAddress.value &&
      studentAccountsRegister.value,
    [
      title,
      firstName,
      lastName,
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
          error: '*Please enter your firstName',
        });
      } else if (!lastName.value) {
        setLastName({
          value: lastName.value,
          error: '*Please enter your lastName',
        });
      } else if (!schoolRole.value) {
        setSchoolRole({
          value: schoolRole.value,
          error: '*Please enter your schoolRole',
        });
      } else if (!schoolName.value) {
        setSchoolName({
          value: schoolName.value,
          error: '*Please enter your schoolName',
        });
      } else if (!schoolAddress.value) {
        setSchoolAddress({
          value: schoolAddress.value,
          error: '*Please enter your schoolAddress',
        });
      } else if (!studentAccountsRegister.value) {
        setStudentAccountsRegister({
          value: studentAccountsRegister.value,
          error: '*Please enter your studentAccountsRegister',
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
            paddingHorizontal:
              orientationOpenApp === 'LANDSCAPE'
                ? horizontalScale(0)
                : horizontalScale(5),
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(7)
                : moderateScale(8),
          },
        ]}
      />
    );
  };

  const renderItemDropdown = item => {
    return (
      <View style={{padding: 10}}>
        <Text
          text={item.label}
          style={[
            ITEM_DROPDOWN_TEXT,
            {
              fontSize:
                orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(8)
                  : moderateScale(10),
            },
          ]}
        />
        <View style={SEPARATE_DROPDOWN} />
      </View>
    );
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
                  } else {
                    i18n.changeLanguage('en');
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
              <View
                style={[
                  CONTAINER_HEADER_VIEW,
                  {
                    paddingHorizontal:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(10)
                        : horizontalScale(20),
                  },
                ]}>
                <Text
                  text={`${t('register_for_your_school')}`}
                  style={[
                    SUBTITLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(16)
                          : moderateScale(18),
                    },
                  ]}
                />
              </View>

              <View
                style={{
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(5)
                      : horizontalScale(15),
                }}>
                <View
                  style={[INFO_INPUT_CONTENT, {marginTop: verticalScale(20)}]}>
                  {renderLabel('Title')}
                  <Dropdown
                    style={[
                      INPUT_NAME_COMMON,
                      {
                        paddingHorizontal:
                          orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(10)
                            : horizontalScale(15),
                        borderColor: color.dark5,
                        borderWidth: 1,
                        borderRadius: 40,
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(50)
                            : verticalScale(40),
                        width:
                          orientationOpenApp === 'LANDSCAPE' ? '85%' : '96%',
                      },
                    ]}
                    itemContainerStyle={{height: 35}}
                    placeholderStyle={[
                      PLACEHOLDER_STYLE,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}
                    selectedTextStyle={[
                      SELECTED_TEXT_STYLE,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
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
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: verticalScale(10),
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(-20)
                      : horizontalScale(5),
                }}>
                <TextInput
                  label={'First Name'}
                  mode={'outlined'}
                  style={[
                    INPUT_NAME_COMMON,
                    {
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(50)
                          : verticalScale(40),

                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(70)
                          : horizontalScale(105),
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
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
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(50)
                          : verticalScale(40),
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(70)
                          : horizontalScale(105),
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
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
              <View
                style={{
                  marginTop: verticalScale(20),
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(5)
                      : horizontalScale(15),
                }}>
                {renderLabel('Educator Role')}
                <Dropdown
                  style={[
                    INPUT_NAME_COMMON,
                    {
                      paddingHorizontal:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(10)
                          : horizontalScale(15),
                      borderColor: color.dark5,
                      borderWidth: 1,
                      borderRadius: 40,
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(50)
                          : verticalScale(40),
                      width: orientationOpenApp === 'LANDSCAPE' ? '85%' : '96%',
                    },
                  ]}
                  itemContainerStyle={{height: 35}}
                  placeholderStyle={[
                    PLACEHOLDER_STYLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                    },
                  ]}
                  selectedTextStyle={[
                    SELECTED_TEXT_STYLE,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
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
              <View
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: verticalScale(25),
                }}>
                <TextInput
                  label={'School Name'}
                  mode={'outlined'}
                  style={[
                    INPUT_NAME_COMMON,
                    {
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(50)
                          : verticalScale(40),
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(145)
                          : horizontalScale(220),
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
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
              <View
                style={{
                  marginTop: verticalScale(10),
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(8)
                      : horizontalScale(15),
                }}>
                <TextInput
                  label={'School Address'}
                  mode={'outlined'}
                  style={[
                    INPUT_NAME_COMMON,
                    {
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(50)
                          : verticalScale(40),
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(145)
                          : horizontalScale(220),
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
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

              <View
                style={{
                  marginTop: verticalScale(10),
                  marginLeft:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(8)
                      : horizontalScale(15),
                }}>
                <TextInput
                  label={'Student Account Register'}
                  mode={'outlined'}
                  style={[
                    INPUT_NAME_COMMON,
                    {
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(50)
                          : verticalScale(40),
                      width:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(145)
                          : horizontalScale(220),
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
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

              <ButtonLinearGradient
                disabled={disabled}
                text={`${t('done')}`}
                style={[
                  BUTTON_LOGIN_VIEW,
                  {
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40),
                    width:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(150)
                        : horizontalScale(220),
                    marginLeft:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(5)
                        : horizontalScale(15),
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
                    marginLeft:
                      orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(-20)
                        : horizontalScale(10),
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
          <Loading isVisibleLoading={isVisibleLoading} />
          <Modal
            isVisible={isVisible}
            supportedOrientations={['portrait', 'landscape']}
            onBackdropPress={() => setIsVisible(false)}
            backdropColor={color.palette.mineShaft}
            backdropOpacity={0.5}
            animationInTiming={150}
            animationOutTiming={150}
            backdropTransitionOutTiming={0}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={MODAL}
            deviceHeight={2000}
            deviceWidth={isTablet() ? 2000 : 0}
            statusBarTranslucent>
            <View style={CONTAINER}>
              {EducatorRoleData?.map(item => {
                return (
                  <TouchableOpacity
                    style={{flexDirection: 'column'}}
                    onPress={() => {
                      setSchoolRole({value: item.label, error: ''});
                      setIsVisible(false);
                    }}>
                    <Text
                      text={item.label}
                      style={{
                        fontFamily: typography.promptRegular,
                        fontWeight: '400',
                        fontSize: moderateScale(12),
                        color: color.black1,
                      }}
                    />
                    <View style={SEPARATE} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </Modal>
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
};
const BODY: ViewStyle = {
  marginHorizontal: 5,
  marginTop: verticalScale(-15),
};
const LOGO_IMAGE: ImageStyle = {
  width: 200,
  height: 97,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  marginTop: verticalScale(20),
};
const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.black1,
};
const FOOTER: ViewStyle = {
  alignItems: 'center',
  marginTop: verticalScale(5),
};
const FOOTER_TEXT: TextStyle = {
  fontWeight: '400',
  color: color.gray7,
  fontFamily: typography.promptMedium,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(10),
  marginLeft: horizontalScale(40),
  justifyContent: 'center',
  alignItems: 'center',
};
const SEPARATE: ViewStyle = {
  height: 20,
  width: '100%',
  backgroundColor: color.black1,
};
const MODAL: ViewStyle = {};
const CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  borderRadius: 20,
};
const PLACEHOLDER_STYLE: TextStyle = {
  fontSize: moderateScale(10),
};
const INPUT_NAME_COMMON: any = {
  backgroundColor: color.white,
  fontSize: moderateScale(10),
};
const INFO_INPUT_CONTENT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: verticalScale(15),
};
const SELECTED_TEXT_STYLE: TextStyle = {
  color: color.black1,
};

const ITEM_DROPDOWN_TEXT: TextStyle = {
  color: color.purple,
};
const SEPARATE_DROPDOWN: ViewStyle = {
  width: '100%',
  height: verticalScale(1),
  backgroundColor: color.gray2,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(5),
};
const LABEL: TextStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  left: horizontalScale(10),
  top: verticalScale(-8),
  zIndex: 999,
};
