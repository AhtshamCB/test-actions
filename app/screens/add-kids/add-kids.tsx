/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  Text as RNText,
  ImageStyle,
  ScrollView,
  TextInput,
  Platform,
  Image,
} from 'react-native';
//
import {Header, Text, CameraScreen, Loading} from '@app/components';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {useMutation} from '@apollo/client';
import {CHECK_USERNAME_QUERY} from '@app/apollo/query/check-username-query';
//
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {debounce} from 'lodash';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {CameraIcon, HintIcon} from '@app/svg';
import {InputObject} from '@app/models';
import {
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils/general';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {useCreateKids, useOrientation, useUploadFile} from '@app/hook';
import {PopupPayment} from '../payment/components/popup-payment';
import {useTranslation} from 'react-i18next';
import {isTablet} from 'react-native-device-info';
import Tooltip from 'react-native-walkthrough-tooltip';

export const AddKids: FC<StackScreenProps<NavigatorParamList, 'addKids'>> = ({
  navigation,
}) => {
  const {t, i18n} = useTranslation();
  const orientation = useOrientation();
  const {orientationOpenApp} = useSelector(selector.config);

  const [checkUsername] = useMutation(CHECK_USERNAME_QUERY, {
    errorPolicy: 'all',
  });

  const {accessToken} = useSelector(selector.user);

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
  const [errors, setError] = useState('');
  const [errorsBirthday, setErrorBirthday] = useState<boolean>(false);
  const [age, setAge] = useState<string>('');
  const [date, setDate] = useState(new Date('2016-01-01'));
  const [open, setOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState<string>('');
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [isFocusName, setIsFocusName] = useState<boolean>(false);
  const [isFocusUsername, setIsFocusUsername] = useState<boolean>(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState<boolean>(false);
  const isFocusNameRef = useRef<boolean>(false);
  const isFocusUsernameRef = useRef<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);

  const {uploadFile, fileData} = useUploadFile(accessToken);
  const {isBetaVersion} = useSelector(selector.config);

  const onCompletedCreateChild = () => {
    if (isBetaVersion) {
      setIsVisibleLoading(false);
      setName({value: '', error: ''});
      setAge('');
      setUsername({value: '', error: ''});
      setPassword({value: '', error: ''});
      navigation.navigate('parentDrawer');
    } else {
      setTimeout(() => {
        setIsVisibleLoading(false);
        setName({value: '', error: ''});
        setAge('');
        setUsername({value: '', error: ''});
        setPassword({value: '', error: ''});
        navigation.navigate('parentDrawer');
      }, 500);
    }
  };

  const onFailedCreateChild = () => {
    setIsVisibleLoading(false);
  };

  const {createChild} = useCreateKids(
    accessToken,
    name.value,
    username.value,
    password.value,
    age,
    fileData,
    onCompletedCreateChild,
    onFailedCreateChild,
  );

  useEffect(() => {
    isFocusNameRef.current = isFocusName;
    isFocusUsernameRef.current = isFocusUsername;
  });

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
        name: image?.filename,
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
        uri:
          Platform?.OS === 'ios'
            ? image?.path
            : image?.path.replace('file:///', 'file://'),
        name:
          Platform?.OS === 'ios'
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

  const isValidData = useMemo(() => {
    return name.value && age !== '' && username.value && password.value;
  }, [name, age, username, password]);

  const onPressAddKid = async () => {
    if (isValidData) {
      await setIsVisibleLoading(true);
      await createChild();
      await (onCompletedCreateChild && onCompletedCreateChild());
    } else {
      if (!name.value) {
        setName({value: name.value, error: '*Please enter name'});
      } else if (!age) {
        setErrorBirthday(true);
      } else if (!username.value) {
        setUsername({value: name.value, error: '*Please enter username'});
      } else if (!password.value) {
        setPassword({value: password.value, error: '*Please enter password'});
      }
    }
  };

  return (
    <View style={CONTAINER}>
      <Header
        title={`${t('create_a_new_kid_account_first')}`}
        onBackPress={() => {
          navigation.navigate('parentDrawer');
        }}
      />

      <ScrollView style={CONTAINER_VIEW}>
        <View style={CONTENT}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              text={`${t('create_a_new_kid_account')}`}
              style={[
                ADD_KID_DATA_TEXT,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? orientation === 'PORTRAIT'
                        ? moderateScale(10.5)
                        : moderateScale(12)
                      : moderateScale(13),
                },
              ]}
            />
            <Tooltip
              isVisible={toolTipVisible}
              topAdjustment={Platform.OS === 'android' ? -50 : 0}
              contentStyle={{
                width:
                  orientation === 'PORTRAIT'
                    ? 'auto'
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(250)
                    : horizontalScale(400),

                height:
                  orientation === 'PORTRAIT'
                    ? 'auto'
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(50),
              }}
              showChildInTooltip={false}
              content={
                <RNText style={PROVIDE_TEXT}>
                  {`${t('please_provide_the')}`}{' '}
                  <RNText style={[PROVIDE_TEXT, {color: color.purple}]}>{`${t(
                    'username',
                  ).toLowerCase()}`}</RNText>
                  {i18n.language === 'en' ? (
                    <RNText style={PROVIDE_TEXT}>{` ${t('and')}`} </RNText>
                  ) : (
                    <RNText style={PROVIDE_TEXT}>{`${t('and')}`} </RNText>
                  )}
                  <RNText style={[PROVIDE_TEXT, {color: color.purple}]}>
                    {`${t('password').toLowerCase()}`}{' '}
                  </RNText>
                  <RNText style={PROVIDE_TEXT}>{`${t('do_not_share')}`}</RNText>
                </RNText>
              }
              placement="bottom"
              onClose={() => setToolTipVisible(false)}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={() => setToolTipVisible(true)}>
                <HintIcon width={20} height={20} />
              </TouchableOpacity>
            </Tooltip>
          </View>
          <View style={DIRECTION_VIEW}>
            {imageSelected ? (
              <TouchableOpacity
                style={CAMERA_VIEW}
                onPress={onShowCameraScreen}>
                <Image source={{uri: imageSelected}} style={AVATAR} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={CAMERA_VIEW}
                onPress={onShowCameraScreen}>
                <CameraIcon props={undefined} />
              </TouchableOpacity>
            )}
            <View style={BODY}>
              <TextInput
                style={[
                  INPUT_NAME,
                  {
                    borderColor: name.error ? color.red : color.gray4,
                    borderWidth: 1,
                  },
                ]}
                onChangeText={onChangeName}
                value={name.value}
                placeholder={`${t('name')}`}
                keyboardType="default"
                placeholderTextColor={color.gray3}
                onBlur={_onBlur}
                onFocus={_onFocus}
                onEndEditing={_onEndNameEdit}
              />
              <TouchableOpacity
                style={[
                  BUTTON_AGE_RANGE,
                  {
                    borderColor: errorsBirthday ? color.red : color.gray4,
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setOpen(true)}>
                <Text
                  text={age === '' ? `${t('birthday')}` : age}
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
                    setErrorBirthday(false);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={USER_NAME_PASSWORD_VIEW}>
            <TextInput
              style={[
                INPUT_USER_NAME,
                {borderColor: errors ? color.red : color.gray4, borderWidth: 1},
              ]}
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
            <TextInput
              style={[
                INPUT_PASSWORD,
                {
                  borderColor: password.error ? color.red : color.gray4,
                  borderWidth: 1,
                },
              ]}
              onChangeText={onChangePassword}
              value={password.value}
              placeholder={`${t('password')}`}
              keyboardType="default"
              placeholderTextColor={color.gray3}
              secureTextEntry
            />
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
      <CameraScreen
        isVisibleCameraPopup={showCamera}
        onCloseCameraPopup={() => setShowCamera(false)}
        chooseImage={chooseImage}
        openCamera={openCamera}
      />
      <Loading isVisibleLoading={isVisibleLoading} />
      <PopupPayment
        isVisible={showModalSuccess}
        onConfirm={() => {
          setShowModalSuccess(false);
          navigation.navigate('parentDrawer');
        }}
        title={'Thank you'}
        subtitle={"Let's make the financial future you've always dream of!"}
        buttonTitle={'Move to Dashboard'}
        titleStyle={undefined}
        subtitleStyle={undefined}
        onClose={undefined}
      />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};

const CONTAINER_VIEW: ViewStyle = {
  backgroundColor: color.gray4,
  marginTop: 20,
};
const CONTENT: ViewStyle = {
  backgroundColor: color.white,
  margin: 20,
  padding: 20,
  marginEnd: 20,
  marginStart: 20,
};
const BODY: ViewStyle = {
  flex: 1,
};
const ADD_KID_DATA_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,

  fontWeight: '500',
  color: color.black1,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: 10,
  justifyContent: 'center',
  alignItems: 'center',
};
const CAMERA_VIEW: ViewStyle = {
  width: isTablet() ? 90 : 70,
  height: isTablet() ? 90 : 70,
  borderRadius: 60,
  backgroundColor: color.gray4,
  justifyContent: 'center',
  alignItems: 'center',
};
const INPUT_NAME: ViewStyle = {
  height: isTablet()
    ? verticalScale(50)
    : Platform.OS === 'ios'
    ? verticalScale(35)
    : 40,
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginStart: 20,
};
const BUTTON_AGE_RANGE: ViewStyle = {
  height: isTablet()
    ? verticalScale(50)
    : Platform.OS === 'ios'
    ? verticalScale(35)
    : 40,
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
  height: isTablet()
    ? verticalScale(50)
    : Platform.OS === 'ios'
    ? verticalScale(35)
    : 40,
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginStart: 10,
};
const INPUT_PASSWORD: ViewStyle = {
  height: isTablet()
    ? verticalScale(50)
    : Platform.OS === 'ios'
    ? verticalScale(35)
    : 40,
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
  fontSize: isTablet() ? moderateScale(8) : moderateScale(10),
  fontWeight: '400',
  color: color.gray3,
  textAlign: 'left',
};
const ADD_ANOTHER_KID: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
  fontWeight: '400',
  color: color.purple,
  textAlign: 'center',
};
const BUTTON_FOOTER_CONTAINER: ViewStyle = {
  width: isTablet() ? horizontalScale(100) : moderateScale(130),
  height: isTablet() ? verticalScale(55) : verticalScale(40),
  borderColor: color.purple,
  borderRadius: 30,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  marginTop: 10,
};
const TEXT_ERROR: TextStyle = {
  fontSize: isTablet() ? moderateScale(8) : moderateScale(10),
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: 30,
};
const AVATAR: ImageStyle = {
  width: isTablet() ? 90 : 70,
  height: isTablet() ? 90 : 70,
  borderRadius: 60,
};
