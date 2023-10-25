/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  Text as RNText,
  Image,
  ImageStyle,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import {
  AlertComponent,
  CameraScreen,
  Header,
  Loading,
  Text,
} from '@app/components';
//
import {useIsFocused, useNavigation} from '@react-navigation/native';
//
import {useMutation} from '@apollo/client';
import {CHECK_USERNAME_QUERY} from '@app/apollo/query/check-username-query';
//
import {useDispatch, useSelector} from 'react-redux';
import {selector, UserActions} from '@app/redux';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {
  CameraIcon,
  DuplicateIcon,
  EditIcon,
  EyeCrossedIcon,
  EyeIcon,
  FinishIcon,
  HintIcon,
  TrashIcon,
} from '@app/svg';
import {TextInput} from 'react-native-gesture-handler';
import {InputObject} from '@app/models';
import {
  formatDayMonthYear,
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils/general';
//
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {debounce} from 'lodash';
//
import {PopupUpdateKids} from '../components/popup-update-kids';
import {
  useKids,
  useGetStatusMembership,
  useCreateKids,
  useUploadFile,
} from '@app/hook';
import {MEMBER_SHIP_STATUS} from '@app/utils/contants';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-community/clipboard';
import {useTranslation} from 'react-i18next';
import Tooltip from 'react-native-walkthrough-tooltip';

export const ManageKidsPhone = ({route}) => {
  const {isFromTabbar, isFromSignup} = route?.params;
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {t, i18n} = useTranslation();
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);

  const [checkUsername] = useMutation(CHECK_USERNAME_QUERY, {
    errorPolicy: 'all',
  });

  const {accessToken, childId} = useSelector(selector.user);
  const {isBetaVersion} = useSelector(selector.config);

  const [name, setName] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [username, setUsername] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [errorsBirthday, setErrorBirthday] = useState('');
  const [errors, setError] = useState('');
  const [age, setAge] = useState<string>('');
  const [date, setDate] = useState(new Date('2016-01-01'));
  const [open, setOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState<any>('');
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [isFocusName, setIsFocusName] = useState<boolean>(false);
  const [isFocusUsername, setIsFocusUsername] = useState<boolean>(false);
  const [isGetUser, setIsGetUser] = useState<boolean>(false);
  const [isVisiblePassword, setVisiblePassword] = useState(true);
  const [isVisibleDeleteKids, setIsVisibleDeleteKids] =
    useState<boolean>(false);
  const [isVisibleUpdateKids, setIsVisibleUpdateKids] =
    useState<boolean>(false);
  const isFocusNameRef = useRef<boolean>(false);
  const isFocusUsernameRef = useRef<boolean>(false);
  const [childIds, setChildIds] = useState<any>();
  const [isVisibleLoading, setIsVisibleLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const {activeKidInfo} = useSelector(selector.user);

  const {getActiveKids, loadingActiveKids} = useKids(accessToken);
  const {uploadFile, fileData} = useUploadFile(accessToken);

  const onCompletedActiveChild = () => {
    setIsGetUser(!isGetUser);
  };

  const {changeWatchingKid} = useKids(
    accessToken,
    activeKidInfo?.activeFor?._id,
    onCompletedActiveChild,
  );

  const onCompletedCreateChild = () => {
    if (isBetaVersion) {
      setIsVisibleLoading(false);
      setIsGetUser(!isGetUser);
      dispatch(UserActions.setChildId(dataCreateKids?.createChild?._id));
    } else {
      setIsGetUser(!isGetUser);
      setIsVisibleLoading(false);
      dispatch(UserActions.setChildId(dataCreateKids?.createChild?._id));
    }
  };

  const onFailedCreateChild = () => {
    setIsVisibleLoading(false);
  };

  const {createChild, dataCreateKids} = useCreateKids(
    accessToken,
    name.value,
    username.value,
    password.value,
    age,
    fileData,
    onCompletedCreateChild,
    onFailedCreateChild,
  );

  const {renderStatusMemberShip, getMemberShipStatus} = useGetStatusMembership(
    activeKidInfo?.activeFor,
  );

  const onCompletedDeleteKids = async () => {
    await setIsVisibleDeleteKids(false);
    await getActiveKids();
    await (onCompletedActiveChild && onCompletedActiveChild());
  };

  const {deleteKids} = useKids(accessToken, childIds, onCompletedDeleteKids);

  useEffect(() => {
    isFocusNameRef.current = isFocusName;
    isFocusUsernameRef.current = isFocusUsername;
  });
  useEffect(() => {
    getActiveKids();
    setAge('');
    setName({value: '', error: ''});
    setUsername({value: '', error: ''});
    setPassword({value: '', error: ''});
  }, [isGetUser]);

  useEffect(() => {
    if (isFocused) {
      getActiveKids();
      setAge('');
      setName({value: '', error: ''});
      setUsername({value: '', error: ''});
      setPassword({value: '', error: ''});
    }
    return () => setIsCopied(false);
  }, [isFocused, isGetUser]);

  useEffect(() => {
    getActiveKids();
  }, [childId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getActiveKids();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(async image => {
      await setShowCamera(false);
      await setImageSelected(image?.path);
      const fileToUpload = {
        uri: image?.path,
        name:
          Platform.OS === 'ios'
            ? image?.filename
            : image?.path.split('/').pop(),
        type: image?.mime,
      };
      const data = new FormData();
      data.append('file', fileToUpload);
      await uploadFile(data);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      await setImageSelected(image?.path);
      const fileToUpload = {
        uri: image?.path,
        name:
          Platform.OS === 'ios'
            ? image?.filename
            : image?.path.split('/').pop(),
        type: image?.mime,
      };
      const data = new FormData();
      data.append('file', fileToUpload);
      await uploadFile(data);
      await setShowCamera(false);
    });
  };

  const onShowCameraScreen = () => {
    setShowCamera(true);
  };

  const _debounceSearch = useCallback(
    debounce(text => {
      if (isFocusNameRef.current || isFocusUsernameRef.current) {
        _onCheckUsernameUnique(text);
      }
    }, 300),
    [],
  );

  const _onCheckUsernameUnique = async string => {
    const value = string;
    const dataRes = await checkUsername({
      variables: {
        username: value,
      },
    });
    if (dataRes?.data?.checkUsernameUnique?.isUnique === 1) {
      //TODO
    } else {
      setError('*Username is already exits');
    }
  };

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

  const onChangeUsername = text => {
    setError('');
    const onlyLetter = removeVietnameseTones(
      removeWhiteSpace(leftTrim(text).toLowerCase()),
    );
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setUsername({value: onlyLetter, error: ''});
      }
    } else {
      setUsername({value: onlyLetter, error: ''});
    }
  };

  const onChangePassword = text => {
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setPassword({value: onlyLetter, error: ''});
      }
    } else {
      setPassword({value: onlyLetter, error: ''});
    }
  };

  const _onFocus = () => {
    setIsFocusName(true);
  };

  const _onBlur = () => {
    _debounceSearch(name.value);
    setIsFocusName(false);
  };

  const _onFocusUsername = () => {
    setIsFocusUsername(true);
  };

  const _onBlurUsername = () => {
    setIsFocusUsername(false);
  };

  const _onEndNameEdit = () => {
    const value = name.value;
    setName({value: value, error: ''});

    const convertUsername = removeVietnameseTones(
      removeWhiteSpace(leftTrim(value).toLowerCase()),
    );
    setUsername({value: convertUsername, error: ''});
    _onCheckUsernameUnique(convertUsername);

    setError('');
  };

  const _onEndUsernameEdit = () => {
    const value = username.value;
    setUsername({value: value, error: ''});
    _onCheckUsernameUnique(value);
  };

  const onPressAddKid = async () => {
    if (isValidData) {
      setIsVisibleLoading(true);
      await createChild();
      if (dataCreateKids?.createChild?._id) {
        setIsVisibleLoading(false);
        await (onCompletedCreateChild && onCompletedCreateChild());
      }
    } else {
      if (name.value === '') {
        setName({value: name.value, error: '*Please enter name'});
      } else if (age === '') {
        setErrorBirthday('*Please enter birthday');
      } else if (username.value === '') {
        setUsername({value: name.value, error: '*Please enter username'});
      } else if (password.value === '') {
        setPassword({value: password.value, error: '*Please enter password'});
      }
    }
  };

  const isValidData = useMemo(() => {
    return name.value && age !== '' && username.value && password.value;
  }, [name, age, username, password]);

  const onConfirmDeleteKids = async () => {
    await setChildIds(activeKidInfo?.activeFor?._id);
    await deleteKids();
    await (onCompletedDeleteKids && onCompletedDeleteKids());
  };

  if (loadingActiveKids) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <View style={CONTAINER}>
      {!isFromTabbar ? (
        <View style={TABBAR_VIEW}>
          <Header
            title={`${t('manage_kids_header')}`}
            onBackPress={() => {
              if (isFromSignup) {
                navigation.navigate('parentDrawer');
              } else {
                navigation.goBack();
              }
            }}
          />
        </View>
      ) : null}
      <KeyboardAvoidingView
        behavior={activeKidInfo?.childs?.length <= 1 ? 'padding' : 'position'}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={[
            CONTAINER_VIEW,
            {
              marginTop: isFromTabbar ? 0 : 20,
              marginBottom: isFromTabbar
                ? 10
                : Platform.OS === 'android'
                ? 0
                : 50,
            },
          ]}>
          <View>
            {activeKidInfo?.activeFor?.info && (
              <View
                style={[
                  CONTENT,
                  {
                    marginBottom: 10,
                    borderColor: activeKidInfo?.activeFor?.isSubscribed
                      ? color.purple
                      : color.white,
                    borderWidth:
                      activeKidInfo?.activeFor?.isSubscribed === true ? 1 : 0,
                  },
                  ELEVATION,
                ]}>
                {getMemberShipStatus() === MEMBER_SHIP_STATUS.SUBSCRIBED && (
                  <View style={FINISH_ICON_VIEW}>
                    <FinishIcon props={undefined} />
                  </View>
                )}
                {getMemberShipStatus() === MEMBER_SHIP_STATUS.STILL_ACTIVE && (
                  <View style={FINISH_ICON_VIEW}>
                    <FinishIcon props={undefined} />
                  </View>
                )}
                <View
                  style={[DIRECTION_VIEW, {justifyContent: 'space-between'}]}>
                  <Text
                    text={renderStatusMemberShip()}
                    style={[
                      SUBSCRIPTION_TEXT,
                      {
                        fontSize: moderateScale(10),
                      },
                    ]}
                  />

                  <TouchableOpacity
                    onPress={() => setIsVisibleUpdateKids(true)}
                    style={{alignItems: 'flex-end', flex: 0.5}}>
                    <EditIcon fill={color.black1} />
                  </TouchableOpacity>
                </View>
                {getMemberShipStatus() ===
                  MEMBER_SHIP_STATUS.NOT_SUBSCRIBED && (
                  <TouchableOpacity
                    onPress={() => setIsVisibleDeleteKids(true)}
                    style={{alignItems: 'flex-end', marginTop: 5}}>
                    <TrashIcon />
                  </TouchableOpacity>
                )}

                <View style={BODY_CONTAINER}>
                  <FastImage
                    source={{uri: activeKidInfo?.activeFor?.info?.avatar}}
                    style={PROFILE_PICTURE}
                  />
                  <View style={FLEX_DIRECTION_COMMON}>
                    <Text
                      text={activeKidInfo?.activeFor?.info?.name}
                      style={TEXT_COMMON}
                    />
                    <Text text={' - '} style={TEXT_COMMON} />
                    <Text
                      text={formatDayMonthYear(
                        activeKidInfo?.activeFor?.info?.birthday,
                      )}
                      style={[TEXT_COMMON, {marginTop: 1}]}
                    />
                  </View>
                  <View style={FLEX_DIRECTION_COMMON}>
                    <Text
                      text={'Username: '}
                      style={[USER_NAME_TEXT_COMMON, {color: color.gray3}]}
                    />
                    <Text
                      text={activeKidInfo?.activeFor?.info?.username}
                      style={[USER_NAME_TEXT_COMMON, {color: color.black1}]}
                    />
                    <TouchableOpacity
                      style={DUPLICATE_VIEW}
                      onPress={() => {
                        Clipboard.setString(
                          activeKidInfo?.activeFor?.info?.username,
                        );
                        setIsCopied(true);
                      }}>
                      <DuplicateIcon
                        fill={isCopied ? color.purple : color.black1}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={CONTENT}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                text={`${t('create_a_new_kid_account')}`}
                style={ADD_KID_DATA_TEXT}
              />
              <Tooltip
                isVisible={toolTipVisible}
                topAdjustment={Platform.OS === 'android' ? -50 : 0}
                showChildInTooltip={false}
                content={
                  <RNText style={PROVIDE_TEXT}>
                    {`${t('please_provide_the')}`}{' '}
                    <RNText style={[PROVIDE_TEXT, {color: color.purple}]}>
                      {`${t('username').toLowerCase()}`}
                    </RNText>
                    {i18n.language === 'en' ? (
                      <RNText style={PROVIDE_TEXT}>{` ${t('and')}`} </RNText>
                    ) : (
                      <RNText style={PROVIDE_TEXT}>{`${t('and')}`} </RNText>
                    )}
                    <RNText style={[PROVIDE_TEXT, {color: color.purple}]}>
                      {`${t('password').toLowerCase()}`}{' '}
                    </RNText>
                    <RNText style={PROVIDE_TEXT}>{`${t(
                      'do_not_share',
                    )}`}</RNText>
                  </RNText>
                }
                placement="bottom"
                onClose={() => setToolTipVisible(false)}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    paddingHorizontal: horizontalScale(10),
                  }}
                  onPress={() => setToolTipVisible(true)}>
                  <HintIcon width={20} height={20} />
                </TouchableOpacity>
              </Tooltip>
            </View>
            <View style={DIRECTION_VIEW}>
              <TouchableOpacity
                style={CAMERA_VIEW}
                onPress={onShowCameraScreen}>
                {imageSelected ? (
                  <Image
                    source={{uri: imageSelected}}
                    style={AVATAR}
                    resizeMode="cover"
                  />
                ) : (
                  <CameraIcon fill={undefined} props={undefined} />
                )}
              </TouchableOpacity>
              <View style={BODY}>
                <TextInput
                  style={INPUT_NAME}
                  onChangeText={onChangeName}
                  value={name.value}
                  placeholder={`${t('name')}`}
                  keyboardType="default"
                  placeholderTextColor={color.gray3}
                  onBlur={_onBlur}
                  onFocus={_onFocus}
                  onEndEditing={_onEndNameEdit}
                />
                {name.error && <Text text={name.error} style={TEXT_ERROR} />}
                <TouchableOpacity
                  style={BUTTON_AGE_RANGE}
                  onPress={() => setOpen(true)}>
                  <Text
                    text={
                      age === '' ? `${t('birthday')}` : formatDayMonthYear(age)
                    }
                    style={age === '' ? AGE_RANGE_TEXT_NULL : AGE_RANGE_TEXT}
                  />
                  <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={date}
                    minimumDate={new Date('2004-01-01')}
                    maximumDate={new Date('2016-12-31')}
                    onConfirm={dateRes => {
                      const formatDate = moment(dateRes).format('YYYY-MM-DD');
                      setOpen(false);
                      setDate(dateRes);
                      setAge(formatDate);
                      setErrorBirthday('');
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </TouchableOpacity>
                {errorsBirthday && (
                  <Text text={errorsBirthday} style={TEXT_ERROR} />
                )}
              </View>
            </View>
            <View style={USER_NAME_PASSWORD_VIEW}>
              <TextInput
                style={INPUT_USER_NAME}
                onChangeText={onChangeUsername}
                value={username.value}
                placeholder={`${t('username')}`}
                keyboardType="default"
                placeholderTextColor={color.gray3}
                onBlur={_onBlurUsername}
                onFocus={_onFocusUsername}
                onEndEditing={_onEndUsernameEdit}
              />
              {errors && <Text text={errors} style={TEXT_ERROR} />}
              <View style={INPUT_PASSWORD_CONTAINER}>
                <TextInput
                  style={INPUT_PASSWORD}
                  onChangeText={onChangePassword}
                  value={password.value}
                  placeholder={`${t('password')}`}
                  keyboardType="default"
                  placeholderTextColor={color.gray3}
                  secureTextEntry={isVisiblePassword}
                />

                <TouchableOpacity
                  style={EYE_VIEW}
                  onPress={() => setVisiblePassword(!isVisiblePassword)}>
                  {isVisiblePassword ? <EyeIcon /> : <EyeCrossedIcon />}
                </TouchableOpacity>
              </View>
              {password.error && (
                <Text text={password.error} style={TEXT_ERROR} />
              )}
            </View>
          </View>
          <View style={PROVIDE_VIEW}>
            <TouchableOpacity
              style={BUTTON_FOOTER_CONTAINER}
              onPress={onPressAddKid}>
              <Text text={`${t('create_account')}`} style={ADD_ANOTHER_KID} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <AlertComponent
        isVisible={isVisibleDeleteKids}
        isShowIcon
        isShowRightButton
        backgroundStyle={{height: verticalScale(70)}}
        title={`${t('are_you_sure_delete_kid')}`}
        titleStyle={TITLE_POPUP}
        confirmBtTitle={`${t('yes')}`}
        containerButtonStyle={CONTAINER_BUTTON_POPUP}
        cancelBtTitle={`${t('no_thanks')}`}
        onConfirm={onConfirmDeleteKids}
        onClose={() => setIsVisibleDeleteKids(false)}
        onCancel={() => setIsVisibleDeleteKids(false)}
      />
      <PopupUpdateKids
        isVisible={isVisibleUpdateKids}
        onClose={() => setIsVisibleUpdateKids(false)}
        onCompleted={async () => {
          await setIsVisibleUpdateKids(false);
          await setIsGetUser(!isGetUser);
          await changeWatchingKid();
        }}
      />
      <CameraScreen
        isVisibleCameraPopup={showCamera}
        onCloseCameraPopup={() => setShowCamera(false)}
        chooseImage={chooseImage}
        openCamera={openCamera}
      />
      <Loading isVisibleLoading={isVisibleLoading} />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
const TABBAR_VIEW: ViewStyle = {
  backgroundColor: color.white,
  height: Platform.OS === 'ios' ? 100 : 50,
};
const CONTAINER_VIEW: ViewStyle = {
  backgroundColor: color.gray4,
};
const CONTENT: ViewStyle = {
  backgroundColor: color.white,
  margin: 20,
  padding: 15,
  marginEnd: 20,
  marginStart: 20,
};
const BODY: ViewStyle = {
  flex: 1,
};
const ADD_KID_DATA_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(16),
  fontWeight: '500',
  color: color.black1,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: 10,
  justifyContent: 'center',
};
const CAMERA_VIEW: ViewStyle = {
  width: 70,
  height: 70,
  borderRadius: 100,
  backgroundColor: color.gray4,
  justifyContent: 'center',
  alignItems: 'center',
};
const INPUT_NAME: ViewStyle = {
  width: '95%',
  height: Platform.OS === 'ios' ? verticalScale(30) : 40,
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginStart: 20,
};
const BUTTON_AGE_RANGE: ViewStyle = {
  height: verticalScale(30),
  width: '95%',
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginStart: 20,
  marginTop: 10,
  justifyContent: 'center',
};
const AGE_RANGE_TEXT_NULL: TextStyle = {
  fontSize: 13,
  color: color.gray3,
  marginTop: 5,
};
const AGE_RANGE_TEXT: TextStyle = {
  fontSize: 13,
  fontWeight: '400',
  color: color.black1,
  fontFamily: typography.promptRegular,
  marginTop: 5,
};
const USER_NAME_PASSWORD_VIEW: ViewStyle = {
  marginTop: 20,
};
const INPUT_USER_NAME: ViewStyle = {
  height: Platform.OS === 'ios' ? verticalScale(30) : 40,
  width: '100%',
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginStart: 5,
};
const INPUT_PASSWORD: ViewStyle = {
  height: Platform.OS === 'ios' ? verticalScale(30) : 40,
  width: '100%',
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginStart: 10,
  marginTop: 10,
};
const PROVIDE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 30,
  flex: 1,
  marginBottom: 70,
  marginTop: -40,
};
const PROVIDE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.gray3,
  textAlign: 'left',
};
const ADD_ANOTHER_KID: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.purple,
  textAlign: 'center',
};
const BUTTON_FOOTER_CONTAINER: ViewStyle = {
  width: 'auto',
  height: verticalScale(40),
  borderColor: color.purple,
  borderRadius: 30,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  marginTop: 10,
};
const PROFILE_PICTURE: any = {
  width: 88,
  height: 88,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: color.white,
};
const BODY_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
};
const TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(14),
  fontWeight: '500',
  color: color.black1,
  textAlign: 'center',
};
const TEXT_ERROR: TextStyle = {
  fontSize: 12,
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: 30,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const FINISH_ICON_VIEW: ViewStyle = {
  position: 'absolute',
  zIndex: 2,
  top: -10,
  right: 10,
};
const ELEVATION: ViewStyle = {
  shadowColor: '#52006A',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 20,
};
const SUBSCRIPTION_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(14),
  fontWeight: '400',
  color: color.purple,
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: 16,
  color: color.black1,
};
const CONTAINER_BUTTON_POPUP: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
  marginTop: verticalScale(20),
};
const AVATAR: ImageStyle = {
  width: 70,
  height: 70,
  borderRadius: 60,
};
const FLEX_DIRECTION_COMMON: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
};
const USER_NAME_TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(14),
  color: color.gray3,
  fontWeight: '400',
};
const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 20,
  bottom: 6,
};
const INPUT_PASSWORD_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
const DUPLICATE_VIEW: ViewStyle = {
  paddingHorizontal: horizontalScale(10),
};
