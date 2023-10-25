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
import {InputObject} from '@app/models';
//
import {EducatorRoleData, SchoolTitleOptionData} from '@app/utils/contants';
import {useTranslation} from 'react-i18next';
import {TranslationIcon} from '@app/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {isTablet} from 'react-native-device-info';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-paper';
import {leftTrim} from '@app/utils';

const BACKGROUND_STUDY = require('@app/components/images/background-study-8.png');
const BACKGROUND_PORTRAIT_TABLET = require('@app/components/images/background-portrait-yellow-tablet.png');
const LOGO = require('@app/components/images/logo.png');

export const RegisterSchoolInfoTabletPortrait = ({navigation, route}) => {
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
      <View style={CONTENT}>
        <View style={BODY}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            scrollEnabled={true}
            style={{width: horizontalScale(220)}}
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
            <View
              style={[
                CONTAINER_HEADER_VIEW,
                {
                  marginTop:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(110)
                      : verticalScale(100),
                },
              ]}>
              <View
                style={{
                  width: horizontalScale(180),
                  marginTop: verticalScale(35),
                }}>
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
                  marginTop:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(40)
                      : verticalScale(20),
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
                            ? horizontalScale(5)
                            : horizontalScale(15),
                        borderColor: color.dark5,
                        borderWidth: 1,
                        borderRadius: 40,
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(50)
                            : verticalScale(40),
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
                  justifyContent: 'space-between',
                  marginTop: verticalScale(10),
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
                          : horizontalScale(95),
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
                          : horizontalScale(95),
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
              <View style={{marginTop: verticalScale(20)}}>
                {renderLabel('Educator Role')}
                <Dropdown
                  style={[
                    INPUT_NAME_COMMON,
                    {
                      paddingHorizontal:
                        orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(5)
                          : horizontalScale(15),
                      borderColor: color.dark5,
                      borderWidth: 1,
                      borderRadius: 40,
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(50)
                          : verticalScale(40),
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
              <View style={{marginTop: verticalScale(10)}}>
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
                      width: 'auto',
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
              <View style={{marginTop: verticalScale(10)}}>
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
                      width: 'auto',
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

              <View style={{marginTop: verticalScale(10)}}>
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
                      width: 'auto',
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
          <Loading isVisibleLoading={isVisibleLoading} />
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
const LABEL: TextStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  left: horizontalScale(10),
  top: verticalScale(-8),
  zIndex: 999,
};
const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
};
const FOOTER: ViewStyle = {
  marginTop: verticalScale(5),
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
const INPUT_NAME_COMMON: any = {
  width: '100%',
  backgroundColor: color.white,
  fontSize: moderateScale(10),
};
const INFO_INPUT_CONTENT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: verticalScale(15),
};
const SELECTED_TEXT_STYLE: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
  color: color.black1,
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
