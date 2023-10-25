/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  PopupDeleteAccount,
  Text,
  ButtonBorder,
  ButtonLinearGradient,
  Header,
  ChangePasswordPopup,
  ContactPopupConfirm,
} from '@app/components';
import {
  isIPhone8PlusOrBelow,
  useGetSchoolDashboard,
  useGetStatusMembership,
  useMe,
  useOrientation,
  useSchool,
} from '@app/hook';
import {InputObject} from '@app/models';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {leftTrim} from '@app/utils/general';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {ArrowDownIcon, EditIcon} from '@app/svg';
//
import {showToastMessage} from '@app/utils';
import {useTranslation} from 'react-i18next';
import CountryPicker, {
  getAllCountries,
  FlagType,
} from 'react-native-country-picker-modal';
import {isTablet} from 'react-native-device-info';
import {
  EducatorRoleData,
  SchoolTitleOptionData,
  SCHOOL_ACCESS_STATUS,
} from '@app/utils/contants';
import {Dropdown} from 'react-native-element-dropdown';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {TextInput} from 'react-native-paper';

export const AccountSchoolSettings: FC<
  StackScreenProps<NavigatorParamList, 'accountSchoolSettings'>
> = () => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();
  const orientation = useOrientation();

  const {userInfo, accessToken} = useSelector(selector.user);
  const {isBetaVersion, orientationOpenApp} = useSelector(selector.config);

  const [isGetUser, setIsGetUser] = useState<boolean>(false);
  const [isVisiblePopupDeleteAccount, setIsVisiblePopupDeleteAccount] =
    useState<boolean>(false);
  const [isVisibleUpdatePassword, setIsVisibleUpdatePassword] =
    useState<boolean>(false);
  const [isVisibleSelectCountry, setIsVisibleSelectCountry] =
    useState<boolean>(false);
  const [
    isVisibleContactTeeFiNotVerified,
    setIsVisibleContactTeeFiNotVerified,
  ] = useState<boolean>(false);
  const [isVisibleContactTeeFiFullAccess, setIsVisibleContactTeeFiFullAccess] =
    useState<boolean>(false);
  const [isVisibleContactTeeFiExpired, setIsVisibleContactTeeFiExpired] =
    useState<boolean>(false);

  const [title, setTitle] = useState<InputObject>({
    value: userInfo?.me?.school?.title || '',
    error: '',
  });
  const [firstName, setFirstName] = useState<InputObject>({
    value: userInfo?.me?.firstName || '',
    error: '',
  });
  const [lastName, setLastName] = useState<InputObject>({
    value: userInfo?.me?.lastName || '',
    error: '',
  });
  const [schoolName, setSchoolName] = useState<InputObject>({
    value: userInfo?.me?.school?.schoolName || '',
    error: '',
  });
  const [address, setAddress] = useState<InputObject>({
    value: userInfo?.me?.address || '',
    error: '',
  });
  const [countryCode, setCountryCode] = useState<InputObject>({
    value: userInfo?.me?.country || '',
    error: '',
  });

  const [schoolRole, setSchoolRole] = useState<InputObject>({
    value: userInfo?.me?.school?.educatorRole || '',
    error: '',
  });

  const [isFocusTitle, setIsFocusTitle] = useState(false);
  const [isFocusEducatorRole, setIsFocusEducatorRole] = useState(false);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [nameCountry, setNameCountry] = useState<any>('');

  const onCompletedUpdateMeProfile: any = () => {
    showToastMessage('Update User Info Successfully', 'success', {
      bottomOffset: 80,
    });
  };

  const {getMeInfo, loadingMeInfo} = useMe(accessToken) || '';

  const {updateSchoolSettings} = useGetSchoolDashboard();
  const {checkSchoolIsNotVerify} = useSchool();

  const {renderAccessStatusSchoolSettings, renderAccessStatusSchool} =
    useGetStatusMembership(null);

  useEffect(() => {
    getMeInfo();
  }, [isGetUser]);

  useEffect(() => {
    if (isFocused) {
      getMeInfo();
    }
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      const resCon = await getAllCountries(FlagType.FLAT);
      const resNameCountry = resCon?.find(
        items => items?.cca2 === countryCode?.value,
      )?.name;
      if (!resNameCountry) {
        setNameCountry('Singapore');
        setCountryCode({value: 'SG', error: ''});
      } else {
        setNameCountry(resNameCountry);
      }
    })();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMeInfo();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  const onChangeFirstName = text => {
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setFirstName({value: onlyLetter, error: ''});
      }
    } else {
      setFirstName({value: onlyLetter, error: ''});
    }
  };

  const onChangeLastName = text => {
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setLastName({value: onlyLetter, error: ''});
      }
    } else {
      setLastName({value: onlyLetter, error: ''});
    }
  };

  const onChangeSchoolName = text => {
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setSchoolName({value: onlyLetter, error: ''});
      }
    } else {
      setSchoolName({value: onlyLetter, error: ''});
    }
  };

  const onChangeAddress = text => {
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setAddress({value: onlyLetter, error: ''});
      }
    } else {
      setAddress({value: onlyLetter, error: ''});
    }
  };

  const onSelectCountry = async item => {
    setCountryCode({value: item?.cca2, error: ''});
    const resCon = await getAllCountries(FlagType.FLAT);
    const resNameCountry = resCon.find(
      items => items.cca2 === item?.cca2,
    )?.name;
    setNameCountry(resNameCountry);
  };

  const isValidData = useMemo(
    () =>
      firstName.value || lastName.value || address.value || countryCode.value,
    [firstName, lastName, address, countryCode],
  );

  const onSave = async () => {
    await updateSchoolSettings({
      payload: {
        title: title.value,
        firstName: firstName.value,
        lastName: lastName.value,
        educatorRole: schoolRole.value,
        schoolName: schoolName.value,
        address: address.value,
        country: countryCode.value,
      },
    });
    await (onCompletedUpdateMeProfile && onCompletedUpdateMeProfile());
    await setIsGetUser(!isGetUser);
  };

  const renderItemDropdown = item => {
    return (
      <View style={{padding: 10}}>
        <Text
          text={item.label}
          style={[
            ITEM_DROPDOWN_TEXT,
            {
              fontSize: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(8)
                  : moderateScale(10)
                : moderateScale(12),
            },
          ]}
        />
        <View style={SEPARATE_DROPDOWN} />
      </View>
    );
  };

  const renderLabel = text => {
    return (
      <Text
        text={text}
        style={[
          LABEL,
          {
            paddingHorizontal: horizontalScale(5),
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(7)
                : moderateScale(8)
              : moderateScale(12),
          },
        ]}
      />
    );
  };

  const renderTablet = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={[INFO_INPUT_CONTENT, {marginTop: verticalScale(20)}]}>
            {renderLabel('Title')}
            <Dropdown
              style={[
                INPUT_NAME_COMMON,
                {
                  paddingHorizontal:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(5)
                      : horizontalScale(10),
                  borderColor: color.gray3,
                  borderWidth: 1,
                  borderRadius: 40,
                  height:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40),
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(160)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(170)
                      : horizontalScale(220),
                },
              ]}
              itemContainerStyle={{
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(40)
                    : verticalScale(30),
              }}
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
                  ? title?.value === ''
                    ? userInfo?.me?.school?.title
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
          <View style={[INFO_INPUT_CONTENT, {marginTop: verticalScale(20)}]}>
            {renderLabel('Educator Role')}
            <Dropdown
              style={[
                INPUT_NAME_COMMON,
                {
                  paddingHorizontal:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(5)
                      : horizontalScale(10),
                  borderColor: color.gray3,
                  borderWidth: 1,
                  borderRadius: 40,
                  height:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40),
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(160)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(170)
                      : horizontalScale(220),
                },
              ]}
              itemContainerStyle={{
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(40)
                    : verticalScale(30),
              }}
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
                  ? schoolRole?.value === ''
                    ? userInfo?.me?.school?.educatorRole
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
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={INFO_INPUT_CONTENT}>
            <TextInput
              label={'First Name'}
              mode={'outlined'}
              style={[
                INPUT_NAME_COMMON,
                {
                  height:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40),
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(160)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(170)
                      : horizontalScale(220),
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
                borderColor: color.gray3,
                borderWidth: 1,
              }}
              activeOutlineColor={color.black1}
              outlineColor={color.black1}
            />
          </View>
          <View style={INFO_INPUT_CONTENT}>
            <TextInput
              label={'Last Name'}
              mode={'outlined'}
              style={[
                INPUT_NAME_COMMON,
                {
                  height:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40),
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(160)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(170)
                      : horizontalScale(220),
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
                borderColor: color.gray3,
                borderWidth: 1,
              }}
              activeOutlineColor={color.black1}
              outlineColor={color.black1}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={INFO_INPUT_CONTENT}>
            <TextInput
              label={'School Name'}
              mode={'outlined'}
              style={[
                INPUT_NAME_COMMON,
                {
                  height:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40),
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(160)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(170)
                      : horizontalScale(220),
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10),
                },
              ]}
              onChangeText={onChangeSchoolName}
              value={schoolName.value}
              placeholder={`${t('schoolName')}`}
              keyboardType="default"
              placeholderTextColor={color.dark4}
              outlineStyle={{
                borderColor: color.gray3,
                borderWidth: 1,
              }}
              activeOutlineColor={color.black1}
              outlineColor={color.black1}
            />
          </View>
          <View style={INFO_INPUT_CONTENT}>
            <TextInput
              label={'School Address'}
              mode={'outlined'}
              style={[
                INPUT_NAME_COMMON,
                {
                  height:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40),
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(160)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(170)
                      : horizontalScale(220),
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10),
                },
              ]}
              onChangeText={onChangeAddress}
              value={address.value}
              placeholder={`${t('address')}`}
              keyboardType="default"
              placeholderTextColor={color.dark4}
              outlineStyle={{
                borderColor: color.gray3,
                borderWidth: 1,
              }}
              activeOutlineColor={color.black1}
              outlineColor={color.black1}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={[INFO_INPUT_CONTENT, {marginTop: verticalScale(20)}]}>
            {renderLabel('Country')}
            <TouchableOpacity
              onPress={() => setIsVisibleSelectCountry(!isVisibleSelectCountry)}
              style={[
                INPUT_NAME_COMMON,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: horizontalScale(10),
                  borderColor: color.gray3,
                  borderWidth: 1,
                  borderRadius: 40,
                  height:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40),
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(160)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(170)
                      : horizontalScale(220),
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10),
                },
              ]}>
              <CountryPicker
                visible={isVisibleSelectCountry}
                withCallingCode
                countryCode={countryCode?.value}
                onSelect={onSelectCountry}
                withFilter={true}
                containerButtonStyle={[
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
          <View style={INFO_INPUT_CONTENT}>
            <TextInput
              label={'Email'}
              mode={'outlined'}
              style={[
                INPUT_COMMON,
                {
                  opacity: 0.6,
                  height:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40),
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(160)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(170)
                      : horizontalScale(220),
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10),
                },
              ]}
              value={userInfo?.me?.email}
              placeholderTextColor={color.dark4}
              editable={false}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderPhone = () => {
    return (
      <View>
        <View style={[INFO_INPUT_CONTENT, {marginTop: verticalScale(20)}]}>
          {renderLabel('Title')}
          <Dropdown
            style={[
              INPUT_NAME_COMMON,
              {
                paddingHorizontal: horizontalScale(15),
                borderColor: color.gray3,
                borderWidth: 1,
                borderRadius: 20,
                height: verticalScale(40),
              },
            ]}
            itemContainerStyle={{height: 35}}
            placeholderStyle={PLACEHOLDER_STYLE}
            selectedTextStyle={SELECTED_TEXT_STYLE}
            data={SchoolTitleOptionData}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={
              !isFocusTitle
                ? title?.value === ''
                  ? userInfo?.me?.school?.title
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
        <View style={[INFO_INPUT_CONTENT, {marginTop: verticalScale(20)}]}>
          {renderLabel('Educator Role')}
          <Dropdown
            style={[
              INPUT_NAME_COMMON,
              {
                paddingHorizontal: horizontalScale(15),
                borderColor: color.gray3,
                borderWidth: 1,
                borderRadius: 20,
                height: verticalScale(40),
              },
            ]}
            itemContainerStyle={{height: 35}}
            placeholderStyle={PLACEHOLDER_STYLE}
            selectedTextStyle={SELECTED_TEXT_STYLE}
            data={EducatorRoleData}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={
              !isFocusEducatorRole
                ? schoolRole?.value === ''
                  ? userInfo?.me?.school?.educatorRole
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
        <View style={INFO_INPUT_CONTENT}>
          <TextInput
            label={'First Name'}
            mode={'outlined'}
            style={[
              INPUT_NAME_COMMON,
              {
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(40),
              },
            ]}
            onChangeText={onChangeFirstName}
            value={firstName.value}
            placeholder={`${t('first_name')}`}
            keyboardType="default"
            placeholderTextColor={color.dark4}
            outlineStyle={{
              borderColor: color.gray3,
              borderWidth: 1,
            }}
            activeOutlineColor={color.black1}
            outlineColor={color.black1}
          />
        </View>
        <View style={INFO_INPUT_CONTENT}>
          <TextInput
            label={'Last Name'}
            mode={'outlined'}
            style={[
              INPUT_NAME_COMMON,
              {
                height: verticalScale(40),
              },
            ]}
            onChangeText={onChangeLastName}
            value={lastName.value}
            placeholder={`${t('last_name')}`}
            keyboardType="default"
            placeholderTextColor={color.dark4}
            outlineStyle={{
              borderColor: color.gray3,
              borderWidth: 1,
            }}
            activeOutlineColor={color.black1}
            outlineColor={color.black1}
          />
        </View>
        <View style={INFO_INPUT_CONTENT}>
          <TextInput
            label={'School Name'}
            mode={'outlined'}
            style={[
              INPUT_NAME_COMMON,
              {
                height: verticalScale(40),
              },
            ]}
            onChangeText={onChangeSchoolName}
            value={schoolName.value}
            placeholder={`${t('schoolName')}`}
            keyboardType="default"
            placeholderTextColor={color.dark4}
            outlineStyle={{
              borderColor: color.gray3,
              borderWidth: 1,
            }}
            activeOutlineColor={color.black1}
            outlineColor={color.black1}
          />
        </View>
        <View style={INFO_INPUT_CONTENT}>
          <TextInput
            label={'School Address'}
            mode={'outlined'}
            style={[
              INPUT_NAME_COMMON,
              {
                height: verticalScale(40),
                width: '100%',
              },
            ]}
            onChangeText={onChangeAddress}
            value={address.value}
            placeholder={`${t('address')}`}
            keyboardType="default"
            placeholderTextColor={color.dark4}
            outlineStyle={{
              borderColor: color.gray3,
              borderWidth: 1,
            }}
            activeOutlineColor={color.black1}
            outlineColor={color.black1}
          />
        </View>
        <View style={INFO_INPUT_CONTENT}>
          {renderLabel('Country')}
          <TouchableOpacity
            onPress={() => setIsVisibleSelectCountry(!isVisibleSelectCountry)}
            style={[
              INPUT_NAME_COMMON,
              {
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                height: verticalScale(40),
                paddingHorizontal: horizontalScale(10),
                borderColor: color.gray3,
                borderWidth: 1,
                borderRadius: 20,
              },
            ]}>
            <CountryPicker
              visible={isVisibleSelectCountry}
              withCallingCode
              countryCode={countryCode?.value}
              onSelect={onSelectCountry}
              withFilter={true}
              containerButtonStyle={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                },
              ]}
              onClose={() => setIsVisibleSelectCountry(false)}
            />
            <Text
              text={`${nameCountry}`}
              style={COUNTRY_TEXT}
              numberOfLines={1}
            />
            <ArrowDownIcon props={undefined} />
          </TouchableOpacity>
        </View>
        <View style={INFO_INPUT_CONTENT}>
          <TextInput
            label={'Email'}
            mode={'outlined'}
            style={[
              INPUT_COMMON,
              {
                opacity: 0.6,
                height: verticalScale(40),
              },
            ]}
            value={userInfo?.me?.email}
            placeholderTextColor={color.dark4}
            editable={false}
          />
        </View>
      </View>
    );
  };

  if (loadingMeInfo) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <View style={CONTAINER}>
      <Header
        title={'Account Settings'}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={BODY}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={INFO_CONTAINER}>
          <View style={INFO_CONTENT}>
            <Text
              text={`${t('basic_info')}`}
              style={[
                INFO_TEXT_COMMON,
                {
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(12)
                      : moderateScale(16)
                    : moderateScale(14),
                },
              ]}
            />
            <EditIcon fill={color.black1} />
          </View>
          {isTablet() ? renderTablet() : renderPhone()}

          {isTablet() ? (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <ButtonLinearGradient
                text={`${t('save')}`}
                disabled={!isValidData}
                style={[
                  BUTTON_SAVE_VIEW,
                  {
                    width:
                      orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(120)
                          : horizontalScale(160)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(160)
                        : horizontalScale(220),
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(40),
                  },
                ]}
                textStyle={[
                  TEXT_SAVE,
                  {
                    fontFamily: typography.promptBold,
                    fontWeight: '700',
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(9)
                        : moderateScale(10),
                  },
                ]}
                onPress={onSave}
              />
              <ButtonBorder
                text={`${t('change_password')}`}
                disabled={!isValidData}
                onPress={() => setIsVisibleUpdatePassword(true)}
                containerStyle={[
                  BUTTON_BORDER_CONTAINER,
                  {
                    width:
                      orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(120)
                          : horizontalScale(160)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(160)
                        : horizontalScale(220),
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(40),
                  },
                ]}
                textStyle={[
                  BUTTON_BORDER_TEXT,
                  {
                    fontSize:
                      orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(9)
                        : moderateScale(10),
                  },
                ]}
              />
            </View>
          ) : (
            <>
              <ButtonLinearGradient
                text={`${t('save')}`}
                style={[
                  BUTTON_SAVE_VIEW,
                  {
                    height: verticalScale(40),
                  },
                ]}
                textStyle={TEXT_SAVE}
                onPress={onSave}
              />
              <ButtonBorder
                text={`${t('change_password')}`}
                disabled={!isValidData}
                onPress={() => setIsVisibleUpdatePassword(true)}
                containerStyle={BUTTON_BORDER_CONTAINER}
                textStyle={BUTTON_BORDER_TEXT}
              />
            </>
          )}
        </View>
        <View style={INFO_CONTAINER}>
          <Text
            text={'Subscription Plan'}
            style={[
              INFO_TEXT_COMMON,
              {
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(12)
                    : moderateScale(16)
                  : moderateScale(14),
              },
            ]}
          />
          <View>
            {isTablet() ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    text={renderAccessStatusSchoolSettings()}
                    style={[
                      MEMBER_TYPE_TEXT,
                      {
                        textAlign: isTablet() ? 'left' : 'right',
                        width: isTablet()
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(100)
                            : horizontalScale(150)
                          : horizontalScale(120),
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}
                  />
                </View>
                <View>
                  <ButtonBorder
                    containerStyle={[
                      BUTTON_SAVE_VIEW,
                      {
                        justifyContent: 'space-around',
                        backgroundColor: color.white,
                        borderColor: color.purple,
                        width:
                          orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(120)
                            : horizontalScale(120),
                        marginTop: verticalScale(-20),
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(60)
                            : verticalScale(40),
                      },
                    ]}
                    textStyle={{
                      color: color.purple,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}
                    text={`${t('view_or_edit_membership')}`}
                    onPress={() => {
                      if (
                        userInfo?.me?.school?.accessStatus ===
                        SCHOOL_ACCESS_STATUS.FULL_ACCESS
                      ) {
                        setIsVisibleContactTeeFiFullAccess(true);
                      } else if (
                        userInfo?.me?.school?.accessStatus ===
                        SCHOOL_ACCESS_STATUS.NOT_ACTIVATED
                      ) {
                        setIsVisibleContactTeeFiNotVerified(true);
                      } else if (
                        userInfo?.me?.school?.accessStatus ===
                        SCHOOL_ACCESS_STATUS.EXPIRED
                      ) {
                        setIsVisibleContactTeeFiExpired(true);
                      }
                    }}
                  />
                </View>
              </View>
            ) : (
              <View>
                <View style={DIRECTION_VIEW}>
                  <Text text={'Status'} style={CURRENT_PACKAGE_TEXT} />
                  <Text
                    text={renderAccessStatusSchoolSettings()}
                    style={[
                      MEMBER_TYPE_TEXT,
                      {
                        width: horizontalScale(160),
                      },
                    ]}
                  />
                </View>

                <ButtonLinearGradient
                  disabled={isBetaVersion ? true : false}
                  text={renderAccessStatusSchool()}
                  style={[
                    BUTTON_SAVE_VIEW,
                    {
                      height: verticalScale(40),
                    },
                  ]}
                  textStyle={TEXT_SAVE}
                  onPress={() => {
                    if (
                      userInfo?.me?.school?.accessStatus ===
                      SCHOOL_ACCESS_STATUS.FULL_ACCESS
                    ) {
                      setIsVisibleContactTeeFiFullAccess(true);
                    } else if (
                      userInfo?.me?.school?.accessStatus ===
                      SCHOOL_ACCESS_STATUS.NOT_ACTIVATED
                    ) {
                      setIsVisibleContactTeeFiNotVerified(true);
                    } else if (
                      userInfo?.me?.school?.accessStatus ===
                      SCHOOL_ACCESS_STATUS.EXPIRED
                    ) {
                      setIsVisibleContactTeeFiExpired(true);
                    }
                  }}
                />
              </View>
            )}
          </View>
          <View>
            {!checkSchoolIsNotVerify(userInfo) && (
              <View>
                <View style={SEPARATE} />
                <View style={{marginTop: verticalScale(10)}}>
                  <Text
                    text={`${t('buy_student_accounts')}`}
                    style={[
                      INFO_TEXT_COMMON,
                      {
                        fontSize: isTablet()
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(12)
                            : moderateScale(16)
                          : moderateScale(14),
                      },
                    ]}
                  />
                  <View>
                    {isTablet() ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View style={{flexDirection: 'column'}}>
                          <Text
                            text={
                              userInfo?.me?.school?.accessStatus ===
                              SCHOOL_ACCESS_STATUS.FULL_ACCESS
                                ? 'Numbers Of Student Accounts:'
                                : 'Numbers Of Student Accounts (Previous Plan):'
                            }
                            style={[
                              MEMBER_TYPE_TEXT,
                              {
                                textAlign: isTablet() ? 'left' : 'right',
                                width: isTablet()
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? horizontalScale(100)
                                    : horizontalScale(150)
                                  : horizontalScale(120),
                              },
                            ]}
                          />
                        </View>
                        <LinearGradientText
                          colors={['#DB14FB', '#FFC700']}
                          text={`${userInfo?.me?.school?.studentLimit}`}
                          start={{x: 0.0, y: 0.9}}
                          textStyle={STUDENT_LIMIT_TEXT}
                        />
                      </View>
                    ) : (
                      <View>
                        <View style={[DIRECTION_VIEW, {alignItems: 'center'}]}>
                          <Text
                            text={
                              userInfo?.me?.school?.accessStatus ===
                              SCHOOL_ACCESS_STATUS.FULL_ACCESS
                                ? 'Numbers Of Student Accounts:'
                                : 'Numbers Of Student Accounts (Previous Plan):'
                            }
                            style={[
                              CURRENT_PACKAGE_TEXT,
                              {width: horizontalScale(180)},
                            ]}
                          />
                          <LinearGradientText
                            colors={['#DB14FB', '#FFC700']}
                            text={`${userInfo?.me?.school?.studentLimit}`}
                            start={{x: 0.0, y: 0.9}}
                            textStyle={STUDENT_LIMIT_TEXT}
                          />
                        </View>
                        <ButtonLinearGradient
                          disabled={isBetaVersion ? true : false}
                          text={`${t('request_to_teefi')}`}
                          style={[
                            BUTTON_SAVE_VIEW,
                            {
                              height: verticalScale(40),
                            },
                          ]}
                          textStyle={TEXT_SAVE}
                          onPress={() => {
                            setIsVisibleContactTeeFiFullAccess(true);
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={FOOTER}>
          {isTablet() ? (
            <ButtonBorder
              onPress={() => setIsVisiblePopupDeleteAccount(true)}
              containerStyle={[
                BUTTON_FOOTER_CONTAINER,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  width: horizontalScale(150),
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40),
                },
              ]}
              text={`${t('delete_account')}`}
              textStyle={[
                TEXT_FOOTER,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(9)
                      : moderateScale(10),
                },
              ]}
            />
          ) : (
            <ButtonBorder
              text={`${t('delete_account')}`}
              disabled={!isValidData}
              onPress={() => setIsVisiblePopupDeleteAccount(true)}
              containerStyle={[
                BUTTON_BORDER_CONTAINER,
                {
                  width: horizontalScale(300),
                },
              ]}
              textStyle={TEXT_FOOTER}
            />
          )}
        </View>
        <ContactPopupConfirm
          isVisible={isVisibleContactTeeFiFullAccess}
          backgroundStyle={{
            height: isIPhone8PlusOrBelow()
              ? verticalScale(90)
              : verticalScale(80),
          }}
          title="TeeFi Contact"
          subtitle="Our support:"
          onClose={() => setIsVisibleContactTeeFiFullAccess(false)}
        />
        <ContactPopupConfirm
          isVisible={isVisibleContactTeeFiNotVerified}
          backgroundStyle={{
            height: isIPhone8PlusOrBelow()
              ? verticalScale(150)
              : verticalScale(130),
          }}
          title="Your Account Has Not Activited By TeeFi!"
          titleStyle={{
            fontSize: moderateScale(21),
          }}
          subtitle="We Are Processing And Will Inform You Via Email"
          subtitleStyle={{fontSize: moderateScale(12)}}
          description="Our support:"
          descriptionStyle={{marginTop: verticalScale(20)}}
          onClose={() => setIsVisibleContactTeeFiNotVerified(false)}
        />
        <ContactPopupConfirm
          isVisible={isVisibleContactTeeFiExpired}
          backgroundStyle={{
            height: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(140)
                : verticalScale(100)
              : isIPhone8PlusOrBelow()
              ? verticalScale(110)
              : verticalScale(100),
          }}
          title="Your Account Has Expired!"
          titleStyle={{
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(18)
                : moderateScale(21)
              : moderateScale(22),
          }}
          subtitle="Please Contact School For Subscription Renewal"
          subtitleStyle={{
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(10)
                : moderateScale(12),
          }}
          description="Our support:"
          descriptionStyle={{marginTop: verticalScale(20)}}
          onClose={() => setIsVisibleContactTeeFiExpired(false)}
        />
        <ChangePasswordPopup
          isVisible={isVisibleUpdatePassword}
          onClose={() => setIsVisibleUpdatePassword(false)}
          onCompletedUpdatePassword={() => {
            setIsVisibleUpdatePassword(false);
            setIsGetUser(!isGetUser);
          }}
        />
        <PopupDeleteAccount
          isVisible={isVisiblePopupDeleteAccount}
          title="To See You Go"
          subtitle="Before you leave us, can you please take 1 minute to let us know"
          onClose={() => setIsVisiblePopupDeleteAccount(false)}
        />
      </ScrollView>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const BODY: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray4,
  marginTop: 10,
};
const INFO_CONTAINER: ViewStyle = {
  height: 'auto',
  padding: 20,
  backgroundColor: color.white,
  marginTop: 20,
  marginStart: 20,
  marginEnd: 20,
};
const INFO_CONTENT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const LABEL: TextStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  left: horizontalScale(10),
  top: verticalScale(-8),
  zIndex: 999,
};
const INFO_TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.black1,
};
const INFO_INPUT_CONTENT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: verticalScale(15),
};
const INPUT_NAME_COMMON: any = {
  width: isTablet() ? '50%' : '100%',
  backgroundColor: color.white,

  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
};
const INPUT_COMMON: any = {
  width: '100%',
  height: isTablet() ? verticalScale(40) : verticalScale(40),
  backgroundColor: color.white,
  paddingHorizontal: horizontalScale(5),
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
};
const CURRENT_PACKAGE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: isTablet() ? moderateScale(11) : moderateScale(12),
  color: color.gray3,
};
const MEMBER_TYPE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: isTablet() ? moderateScale(9) : moderateScale(12),
  color: color.purple,
  textAlign: 'right',
  marginTop: isTablet() ? verticalScale(5) : 0,
};
const SEPARATE: ViewStyle = {
  height: 2,
  backgroundColor: color.gray4,
  marginTop: 20,
  marginStart: -20,
  marginEnd: -20,
  padding: 0,
};
const FOOTER: ViewStyle = {
  height: 'auto',
  padding: 20,
  marginStart: 20,
  marginEnd: 20,
  justifyContent: 'center',
  marginBottom: verticalScale(80),
  alignItems: 'center',
  marginTop: verticalScale(-20),
};
const BUTTON_FOOTER_CONTAINER: ViewStyle = {
  width: isTablet() ? horizontalScale(140) : horizontalScale(140),
  height: isTablet() ? verticalScale(35) : verticalScale(40),
  borderColor: color.purple,
  borderRadius: 30,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const BUTTON_BORDER_CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  borderColor: color.purple,
  height: isTablet() ? verticalScale(40) : verticalScale(40),
};
const BUTTON_BORDER_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
  fontWeight: '400',
  color: color.purple,
};
const BUTTON_SAVE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,

  marginTop: 20,
};
const TEXT_SAVE: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
  fontWeight: '400',
};
const COUNTRY_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.black1,
  flex: 1,
};
const TEXT_FOOTER: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
};
const PLACEHOLDER_STYLE: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(14),
};
const SELECTED_TEXT_STYLE: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
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
  marginTop: isTablet() ? verticalScale(5) : verticalScale(10),
};
const STUDENT_LIMIT_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: moderateScale(36),
};
