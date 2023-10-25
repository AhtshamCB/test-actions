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
} from '@app/components';
import {useGetStatusMembership, useMe, useOrientation} from '@app/hook';
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
// import {PopupEnterYourPin} from '@app/components/popup-enter-your-pin/popup-enter-your-pin';
// import {UPSERT_PIN_CODE_QUERY} from '@app/apollo/query/upsert-pin-code-query';
import {ChangePasswordPopup} from '@app/components';
//
import {showToastMessage} from '@app/utils';
import {useTranslation} from 'react-i18next';
import CountryPicker, {
  getAllCountries,
  FlagType,
} from 'react-native-country-picker-modal';
import {isTablet} from 'react-native-device-info';
import {TextInput} from 'react-native-paper';

export const AccountSettings: FC<
  StackScreenProps<NavigatorParamList, 'accountSettings'>
> = ({}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();
  const orientation = useOrientation();

  const {userInfo, accessToken, activeKidInfo} = useSelector(selector.user);
  const {isBetaVersion, orientationOpenApp} = useSelector(selector.config);
  // const [pinCode, setPinCode] = useState('');
  // const [newPinCode, setNewPinCode] = useState('');
  const [isGetUser, setIsGetUser] = useState<boolean>(false);
  // const [isVisiblePopupPin, setIsVisiblePopupPin] = useState<boolean>(false);
  const [isVisiblePopupDeleteAccount, setIsVisiblePopupDeleteAccount] =
    useState<boolean>(false);
  const [isVisibleUpdatePassword, setIsVisibleUpdatePassword] =
    useState<boolean>(false);
  const [isVisibleSelectCountry, setIsVisibleSelectCountry] =
    useState<boolean>(false);

  const [firstName, setFirstName] = useState<InputObject>({
    value: userInfo?.me?.firstName || '',
    error: '',
  });
  const [lastName, setLastName] = useState<InputObject>({
    value: userInfo?.me?.lastName || '',
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

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [nameCountry, setNameCountry] = useState<any>('');

  const onCompletedUpdateMeProfile: any = () => {
    showToastMessage('Update User Info Successfully', 'success', {
      bottomOffset: 80,
    });
  };

  const {updateMeProfile, getMeInfo, loadingMeInfo} = useMe(
    accessToken,
    firstName.value,
    lastName.value,
    address.value,
    countryCode.value,
    onCompletedUpdateMeProfile,
  );

  const {renderStatusMemberShip} = useGetStatusMembership(
    activeKidInfo?.activeFor,
  );

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

  // const [upsertPinCode] = useMutation(UPSERT_PIN_CODE_QUERY, {
  //   fetchPolicy: 'no-cache',
  //   context: {
  //     headers: {
  //       authorization: accessToken,
  //     },
  //   },
  //   variables: {
  //     pinCode: pinCode,
  //     newPinCode: '',
  //   },
  //   async onCompleted(data) {
  //     if (data?.upsertPinCode) {
  //       dispatch(UserActions.setUserPin(pinCode));
  //       setIsVisiblePopupPin(false);
  //     }
  //   },
  //   onError(err) {
  //     console.log('onerror', err);
  //   },
  // });

  // const [upsertWithNewPinCode] = useMutation(UPSERT_PIN_CODE_QUERY, {
  //   fetchPolicy: 'no-cache',
  //   context: {
  //     headers: {
  //       authorization: accessToken,
  //     },
  //   },
  //   variables: {
  //     pinCode: userPin,
  //     newPinCode: newPinCode,
  //   },
  //   async onCompleted(data) {
  //     if (data?.upsertPinCode) {
  //       dispatch(UserActions.setUserPin(newPinCode));
  //       setIsVisiblePopupPin(false);
  //     }
  //   },
  //   onError(err) {
  //     console.log('onerror', err);
  //   },
  // });

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
    await updateMeProfile();
    await (onCompletedUpdateMeProfile && onCompletedUpdateMeProfile());
    await setIsGetUser(!isGetUser);
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
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40)
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
              label={'Address'}
              mode={'outlined'}
              style={[
                INPUT_NAME_COMMON,
                {
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40)
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
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40)
                    : verticalScale(40),
                  paddingHorizontal: horizontalScale(10),
                  borderColor: color.gray3,
                  borderWidth: 1,
                  borderRadius: 40,
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(120)
                        : horizontalScale(160)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(170)
                      : horizontalScale(220),
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={INFO_INPUT_CONTENT}>
            <TextInput
              label={'Email'}
              mode={'outlined'}
              style={[
                INPUT_NAME_COMMON,
                {
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40)
                    : verticalScale(40),
                  opacity: 0.6,
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

          <ButtonLinearGradient
            text={`${t('save')}`}
            disabled={!isValidData}
            style={[
              BUTTON_SAVE_VIEW,
              {
                width:
                  orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(60)
                      : horizontalScale(75)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(80)
                    : horizontalScale(100),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40),
                marginTop: verticalScale(20),
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
                      ? horizontalScale(60)
                      : horizontalScale(75)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(80)
                    : horizontalScale(100),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40),
                marginTop: verticalScale(20),
              },
            ]}
            textStyle={[
              BUTTON_BORDER_TEXT,
              {
                fontSize:
                  orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(8)
                    : moderateScale(9.5),
              },
            ]}
          />
        </View>
      </View>
    );
  };

  const renderPhone = () => {
    return (
      <View>
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
            value={firstName?.value}
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
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(40),
              },
            ]}
            onChangeText={onChangeLastName}
            value={lastName?.value}
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
            label={'Email'}
            mode={'outlined'}
            style={[
              INPUT_NAME_COMMON,
              {
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(40),
                opacity: 0.6,
              },
            ]}
            value={userInfo?.me?.email}
            placeholderTextColor={color.dark4}
            editable={false}
          />
        </View>
        <View style={INFO_INPUT_CONTENT}>
          <TextInput
            label={'Address'}
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
            onChangeText={onChangeAddress}
            value={address?.value}
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
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(40),
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
          {!isTablet() && (
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
            text={`${t('plan')}`}
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
                    text={renderStatusMemberShip()}
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
                      navigation.navigate('subscriptionPlan', {
                        isFromTabbar: false,
                      });
                    }}
                  />
                </View>
              </View>
            ) : (
              <View>
                <View style={DIRECTION_VIEW}>
                  <Text
                    text={`${t('current_plan')}`}
                    style={CURRENT_PACKAGE_TEXT}
                  />
                  <Text
                    text={renderStatusMemberShip()}
                    style={[
                      MEMBER_TYPE_TEXT,
                      {
                        width: horizontalScale(160),
                      },
                    ]}
                  />
                </View>
                {isBetaVersion ? (
                  <ButtonBorder
                    containerStyle={[
                      BUTTON_SAVE_VIEW,
                      {
                        justifyContent: 'space-around',
                        backgroundColor: color.white,
                        borderColor: color.purple,
                      },
                    ]}
                    textStyle={{
                      color: color.purple,
                      fontSize: isTablet()
                        ? moderateScale(10)
                        : moderateScale(12),
                    }}
                    text={`${t('view_or_edit_membership')}`}
                    onPress={() => {
                      navigation.navigate('subscriptionPlan', {
                        isFromTabbar: false,
                      });
                    }}
                  />
                ) : (
                  <ButtonLinearGradient
                    disabled={isBetaVersion ? true : false}
                    text={`${t('view_or_edit_membership')}`}
                    style={[
                      BUTTON_SAVE_VIEW,
                      {
                        height: verticalScale(40),
                      },
                    ]}
                    textStyle={TEXT_SAVE}
                    onPress={() => {
                      navigation.navigate('subscriptionPlan', {
                        isFromTabbar: false,
                      });
                    }}
                  />
                )}
              </View>
            )}
          </View>

          <View style={SEPARATE} />
          <View style={[ADD_CHILDREN_VIEW, DIRECTION_VIEW]}>
            <Text
              text={`${t('add_kids_settings')}`}
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
            <ButtonBorder
              containerStyle={[
                BUTTON_MANAGE_CHILD_CONTAINER,
                {
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40),
                },
              ]}
              text={`${t('manage_account')}`}
              textStyle={[
                ADD_KIDS_TEXT,
                {
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(9)
                      : moderateScale(10)
                    : moderateScale(12),
                },
              ]}
              onPress={() => {
                navigation.navigate('manageKids', {isFromTabbar: false});
              }}
            />
          </View>
        </View>
        <View style={FOOTER}>
          {isTablet() ? (
            <View>
              {isBetaVersion ? (
                <View style={FOOTER_CONTAINER}>
                  <ButtonBorder
                    onPress={() => setIsVisiblePopupDeleteAccount(true)}
                    containerStyle={[
                      BUTTON_FOOTER_CONTAINER,
                      {
                        marginTop: 20,
                        width:
                          orientation === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(80)
                              : horizontalScale(100)
                            : orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(100)
                            : horizontalScale(150),
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
                  <ButtonBorder
                    disabled={isBetaVersion ? true : false}
                    containerStyle={[
                      BUTTON_FOOTER_CONTAINER,
                      {
                        marginTop: 20,
                        width:
                          orientation === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(80)
                              : horizontalScale(100)
                            : orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(120)
                            : horizontalScale(150),
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(60)
                            : verticalScale(40),
                        opacity: 0.4,
                        backgroundColor: color.white,
                        borderColor: color.gray3,
                      },
                    ]}
                    text={`${t('download_invoices')}`}
                    textStyle={[
                      TEXT_FOOTER,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                        color: color.gray3,
                      },
                    ]}
                    onPress={() => navigation.navigate('invoices')}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%',
                    paddingHorizontal: 10,
                    marginBottom: verticalScale(30),
                    marginLeft:
                      orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(10)
                          : horizontalScale(15)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(20)
                        : horizontalScale(25),
                  }}>
                  <ButtonBorder
                    onPress={() => setIsVisiblePopupDeleteAccount(true)}
                    containerStyle={[
                      BUTTON_FOOTER_CONTAINER,
                      {
                        marginTop: 20,
                        width:
                          orientation === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(120)
                              : horizontalScale(150)
                            : orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(150)
                            : horizontalScale(180),
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
                  <ButtonBorder
                    disabled={isBetaVersion ? true : false}
                    containerStyle={[
                      BUTTON_FOOTER_CONTAINER,
                      {
                        marginTop: 20,
                        width:
                          orientation === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(120)
                              : horizontalScale(150)
                            : orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(150)
                            : horizontalScale(180),
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(60)
                            : verticalScale(40),

                        justifyContent: 'space-around',
                      },
                    ]}
                    text={`${t('download_invoices')}`}
                    textStyle={[
                      TEXT_FOOTER,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      },
                    ]}
                    onPress={() => navigation.navigate('invoices')}
                  />
                </View>
              )}
            </View>
          ) : (
            <>
              <View style={BODY_FOOTER}>
                {isBetaVersion ? (
                  <ButtonBorder
                    disabled={isBetaVersion ? true : false}
                    containerStyle={[
                      BUTTON_FOOTER_CONTAINER,
                      {
                        marginTop: 0,
                        justifyContent: 'space-around',
                        opacity: 0.4,
                        backgroundColor: color.white,
                        borderColor: color.gray3,
                      },
                    ]}
                    text={`${t('download_invoices')}`}
                    textStyle={[TEXT_FOOTER, {color: color.gray3}]}
                    onPress={() => navigation.navigate('invoices')}
                  />
                ) : (
                  <ButtonBorder
                    disabled={isBetaVersion ? true : false}
                    containerStyle={[
                      BUTTON_FOOTER_CONTAINER,
                      {marginTop: 0, justifyContent: 'space-around'},
                    ]}
                    text={`${t('download_invoices')}`}
                    textStyle={TEXT_FOOTER}
                    onPress={() => navigation.navigate('invoices')}
                  />
                )}

                <View style={VIEW_PADDING} />
                <ButtonBorder
                  onPress={() => setIsVisiblePopupDeleteAccount(true)}
                  containerStyle={[BUTTON_FOOTER_CONTAINER, {marginTop: 0}]}
                  text={`${t('delete_account')}`}
                  textStyle={TEXT_FOOTER}
                />
              </View>
            </>
          )}
        </View>
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
const LABEL: TextStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  left: horizontalScale(10),
  top: verticalScale(-8),
  zIndex: 999,
  paddingHorizontal: horizontalScale(5),
  fontSize: moderateScale(12),
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
const INFO_TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.black1,
};
const INFO_INPUT_CONTENT: ViewStyle = {
  marginTop: verticalScale(15),
};
const INPUT_NAME_COMMON: any = {
  width: '100%',
  backgroundColor: color.white,
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
  fontSize: moderateScale(12),
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
const ADD_CHILDREN_VIEW: ViewStyle = {
  alignItems: 'center',
};
const BUTTON_MANAGE_CHILD_CONTAINER: ViewStyle = {
  width: isTablet() ? horizontalScale(120) : horizontalScale(120),
  height: isTablet() ? verticalScale(40) : verticalScale(40),
  borderColor: color.purple,
  borderRadius: 30,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  bottom: 10,
};
const FOOTER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  paddingHorizontal: 10,
  marginBottom: verticalScale(30),
};
const FOOTER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 70,
};
const BUTTON_FOOTER_CONTAINER: ViewStyle = {
  width: isTablet() ? horizontalScale(140) : horizontalScale(140),
  height: isTablet() ? verticalScale(35) : verticalScale(40),
  borderColor: color.purple,
  borderRadius: 100,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
};
const BODY_FOOTER: ViewStyle = {
  flexDirection: 'row',
  marginTop: 20,
  paddingHorizontal: 10,
  marginBottom: 40,
};
const VIEW_PADDING: ViewStyle = {
  padding: 20,
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
const ADD_KIDS_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
};
const TEXT_FOOTER: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
};
