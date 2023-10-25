/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  ImageStyle,
} from 'react-native';
//
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
//
import {Text, ButtonLinearGradient, CameraScreen} from '@app/components';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {CameraIcon, CloseMenu, EyeCrossedIcon, EyeIcon} from '@app/svg';
//
import {InputObject} from '@app/models';
import {
  formatDayMonthYear,
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils/general';
import {useTranslation} from 'react-i18next';
import {isTablet} from 'react-native-device-info';
import {useGrade, useOrientation, useUploadFile} from '@app/hook';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {useMutation} from '@apollo/client';
import {CHECK_USERNAME_QUERY} from '@app/apollo/query';
import {debounce} from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';

export const PopupAddStudent = ({isVisible, onClose, onCompleted, onError}) => {
  const {t} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);
  const orientation = useOrientation();
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

  const [errorsBirthday, setErrorBirthday] = useState('');
  const [errors, setError] = useState('');
  const [age, setAge] = useState<string>('');
  const [date, setDate] = useState(new Date('2016-01-01'));
  const [open, setOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState<any>('');
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [isVisiblePassword, setVisiblePassword] = useState(true);
  const isFocusNameRef = useRef<boolean>(false);
  const isFocusUsernameRef = useRef<boolean>(false);
  const [isFocusName, setIsFocusName] = useState<boolean>(false);
  const [isFocusUsername, setIsFocusUsername] = useState<boolean>(false);

  useState<boolean>(false);

  const {uploadFile, fileData} = useUploadFile(accessToken);
  useEffect(() => {
    isFocusNameRef.current = isFocusName;
    isFocusUsernameRef.current = isFocusUsername;
  });

  const {addStudent} = useGrade();

  const [checkUsername] = useMutation(CHECK_USERNAME_QUERY, {
    errorPolicy: 'all',
  });

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

  const onShowCameraScreen = () => {
    setShowCamera(true);
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

  const onChangePassword = text => {
    const onlyLetter = removeVietnameseTones(
      removeWhiteSpace(leftTrim(text).toLowerCase()),
    );
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

  const onCompletedAddStudent = () => {
    onCompleted();
  };

  const onErrorAddStudent = () => {
    onError();
  };

  const isValidData = useMemo(() => {
    return (
      name.value &&
      username.value &&
      username.value.length > 6 &&
      password.value &&
      password.value.length > 8
    );
  }, [name, username, password]);

  const onPressAddStudent = async () => {
    if (isValidData) {
      const res = await addStudent({
        payload: {
          avatar: fileData !== null ? fileData : null,
          birthday: age ? age : null,
          name: name.value,
          password: password.value,
          username: username.value,
        },
      });
      if (res?.addStudent) {
        await (onCompletedAddStudent && onCompletedAddStudent());
      } else {
        await (onErrorAddStudent && onErrorAddStudent());
      }
    } else {
      if (!name.value) {
        setName({
          value: name.value,
          error: '*Please enter Student Name',
        });
      } else if (username.value.length > 0 && username.value.length < 6) {
        setUsername({
          value: username.value,
          error: '*username must be longer than or equal to 6 characters',
        });
      } else if (!username.value) {
        setUsername({value: username.value, error: '*Please enter Username'});
      } else if (!password.value) {
        setPassword({value: password.value, error: '*Please enter Password'});
      } else if (password.value.length > 0 && password.value.length < 8) {
        setPassword({
          value: password.value,
          error: '*Password must be longer than or equal to 8 characters',
        });
      }
    }
  };

  const onClosePopup = () => {
    setName({value: '', error: ''});
    setAge('');
    onClose && onClose();
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClosePopup}
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
          <TouchableOpacity style={ICON_VIEW} onPress={onClosePopup}>
            <CloseMenu />
          </TouchableOpacity>
          <View style={DIRECTION_VIEW}>
            <TouchableOpacity style={CAMERA_VIEW} onPress={onShowCameraScreen}>
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
                style={[
                  INPUT_NAME,
                  {
                    height: isTablet()
                      ? orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(50)
                          : verticalScale(35)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(45)
                        : verticalScale(35)
                      : Platform.OS === 'ios'
                      ? verticalScale(30)
                      : 40,
                    fontSize: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(9)
                      : moderateScale(11),
                    width: isTablet()
                      ? orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? '84%'
                          : '85%'
                        : orientationOpenApp === 'LANDSCAPE'
                        ? '89%'
                        : '90%'
                      : '82%',
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
              {name.error && <Text text={name.error} style={TEXT_ERROR} />}
              <TouchableOpacity
                style={[
                  BUTTON_AGE_RANGE,
                  {
                    height: isTablet()
                      ? orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(45)
                          : verticalScale(35)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(45)
                        : verticalScale(35)
                      : 40,
                    width: isTablet()
                      ? orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? '84%'
                          : '85%'
                        : orientationOpenApp === 'LANDSCAPE'
                        ? '89%'
                        : '90%'
                      : '82%',
                  },
                ]}
                onPress={() => setOpen(true)}>
                <Text
                  text={
                    age === '' ? `${t('birthday')}` : formatDayMonthYear(age)
                  }
                  style={[
                    age === '' ? AGE_RANGE_TEXT_NULL : AGE_RANGE_TEXT,
                    {
                      fontSize: isTablet()
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(9)
                        : moderateScale(11),
                    },
                  ]}
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

          <View style={{width: '100%', paddingHorizontal: horizontalScale(5)}}>
            <TextInput
              style={[
                INPUT_USER_NAME,
                {
                  height: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(45)
                        : verticalScale(35)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(45)
                      : verticalScale(35)
                    : 40,
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(9)
                    : moderateScale(11),
                },
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
            <View style={INPUT_PASSWORD_CONTAINER}>
              <TextInput
                style={[
                  INPUT_PASSWORD,
                  {
                    height: isTablet()
                      ? orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(45)
                          : verticalScale(35)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(45)
                        : verticalScale(35)
                      : 40,
                    fontSize: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(9)
                      : moderateScale(11),
                  },
                ]}
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

          <View style={BUTTON_ADD_KID_CONTAINER}>
            <ButtonLinearGradient
              text={'Add Student'}
              style={[
                BUTTON_ADD_KID_VIEW,
                {
                  width: isTablet() ? 260 : horizontalScale(160),
                  height: isTablet() ? 55 : verticalScale(40),
                },
              ]}
              textStyle={[
                TEXT_CONFIRM,
                {
                  fontSize: isTablet() ? moderateScale(10) : moderateScale(13),
                },
              ]}
              onPress={onPressAddStudent}
            />
          </View>
        </View>
        <CameraScreen
          isVisibleCameraPopup={showCamera}
          onCloseCameraPopup={() => setShowCamera(false)}
          chooseImage={chooseImage}
          openCamera={openCamera}
        />
      </Modal>
    </>
  );
};

const CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  padding: 20,
  borderRadius: 20,
};
const ICON_VIEW: ViewStyle = {
  alignItems: 'flex-end',
  width: '100%',
};
const MODAL: ViewStyle = {};
const BODY: ViewStyle = {
  width: '100%',
  padding: 10,
};
const CAMERA_VIEW: ViewStyle = {
  width: 70,
  height: 70,
  borderRadius: 100,
  backgroundColor: color.gray4,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
};
const AVATAR: ImageStyle = {
  width: 70,
  height: 70,
  borderRadius: 60,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: 10,
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginLeft: horizontalScale(5),
};
const INPUT_NAME: any = {
  width: isTablet() ? '90%' : '82%',
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
};
const INPUT_USER_NAME: any = {
  width: '100%',
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginStart: 5,
  marginTop: 10,
};
const INPUT_PASSWORD: any = {
  width: '100%',
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginStart: 10,
  marginTop: 10,
};
const TEXT_ERROR: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(11),
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
};
const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 20,
  bottom: verticalScale(10),
};
const INPUT_PASSWORD_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
const BUTTON_AGE_RANGE: ViewStyle = {
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginTop: 10,
  justifyContent: 'center',
};
const AGE_RANGE_TEXT_NULL: TextStyle = {
  color: color.gray3,
  marginTop: 5,
};
const AGE_RANGE_TEXT: TextStyle = {
  fontWeight: '400',
  color: color.black1,
  fontFamily: typography.promptRegular,
  marginTop: 5,
};
const BUTTON_ADD_KID_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(10),
};
const BUTTON_ADD_KID_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  marginTop: 10,
};
const TEXT_CONFIRM: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontFamily: typography.promptBold,
  fontWeight: '700',
};
