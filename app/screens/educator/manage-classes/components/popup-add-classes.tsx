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
//
import {Text, ButtonLinearGradient, CameraScreen} from '@app/components';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {color, moderateScale, typography, verticalScale} from '@app/theme';
import {CameraIcon, CloseMenu, EyeCrossedIcon, EyeIcon} from '@app/svg';
//
import {InputObject} from '@app/models';
import {
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils/general';
import {useTranslation} from 'react-i18next';
import {isTablet} from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';
import {useSchool, useUploadFile} from '@app/hook';
import {useMutation} from '@apollo/client';
import {CHECK_USERNAME_QUERY} from '@app/apollo/query';
import {debounce} from 'lodash';

export const PopupAddClasses = ({isVisible, onClose, onCompleted, onError}) => {
  const {t} = useTranslation();
  const {accessToken} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  const [gradeName, setGradeName] = useState<InputObject>({
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
  const [imageSelected, setImageSelected] = useState<any>('');
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [isVisiblePassword, setVisiblePassword] = useState(true);

  const isFocusNameRef = useRef<boolean>(false);
  const isFocusUsernameRef = useRef<boolean>(false);
  const [isFocusName, setIsFocusName] = useState<boolean>(false);
  const [isFocusUsername, setIsFocusUsername] = useState<boolean>(false);

  const {uploadFile, fileData} = useUploadFile(accessToken);

  useEffect(() => {
    isFocusNameRef.current = isFocusName;
    isFocusUsernameRef.current = isFocusUsername;
  });

  const onCompletedCreateClass = () => {
    onCompleted();
  };

  const onErrorCreateClass = () => {
    onError();
  };

  const {createGrade} = useSchool();

  const [checkUsername] = useMutation(CHECK_USERNAME_QUERY, {
    errorPolicy: 'all',
  });

  const debounceSearch = useCallback(
    debounce(text => {
      if (isFocusNameRef.current || isFocusUsernameRef.current) {
        onCheckUsernameUnique(text);
      }
    }, 300),
    [],
  );

  const onCheckUsernameUnique = async string => {
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

  const onFocus = () => {
    setIsFocusName(true);
  };

  const onBlur = () => {
    debounceSearch(gradeName.value);
    setIsFocusName(false);
  };

  const onFocusUsername = () => {
    setIsFocusUsername(true);
  };

  const onBlurUsername = () => {
    setIsFocusUsername(false);
  };

  const onEndNameEdit = () => {
    const value = gradeName.value;
    setGradeName({value: value, error: ''});

    const convertUsername = removeVietnameseTones(
      removeWhiteSpace(leftTrim(value).toLowerCase()),
    );
    setUsername({value: convertUsername, error: ''});
    onCheckUsernameUnique(convertUsername);

    setError('');
  };

  const onEndUsernameEdit = () => {
    const value = username.value;
    setUsername({value: value, error: ''});
    onCheckUsernameUnique(value);
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

  const onChangeGradeName = text => {
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setGradeName({value: onlyLetter, error: ''});
      }
    } else {
      setGradeName({value: onlyLetter, error: ''});
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

  const isValidData = useMemo(() => {
    return (
      gradeName.value &&
      username.value &&
      username.value.length > 6 &&
      !errors &&
      password.value &&
      password.value.length > 8
    );
  }, [gradeName, username, password]);

  const onPressAddClass = async () => {
    if (isValidData) {
      const res = await createGrade({
        payload: {
          username: username.value,
          avatar: fileData === '' ? null : fileData,
          password: password.value,
          gradeName: gradeName.value,
        },
      });
      if (res?.createGrade) {
        await (onCompletedCreateClass && onCompletedCreateClass());
      } else {
        await (onErrorCreateClass && onErrorCreateClass());
      }
    } else {
      if (!gradeName.value) {
        setGradeName({
          value: gradeName.value,
          error: '*Please enter Class Name',
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
    setGradeName({value: '', error: ''});
    setUsername({value: '', error: ''});
    setPassword({value: '', error: ''});
    setImageSelected('');
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
          <View style={BODY}>
            <View style={CONTENT}>
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
            </View>
            <TextInput
              style={[
                INPUT_NAME,
                {
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40)
                    : verticalScale(40),
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(9)
                    : moderateScale(11),
                },
              ]}
              onChangeText={onChangeGradeName}
              value={gradeName.value}
              placeholder={`${t('class_name')}`}
              keyboardType="default"
              placeholderTextColor={color.gray3}
              onBlur={onBlur}
              onFocus={onFocus}
              onEndEditing={onEndNameEdit}
            />
            {gradeName.error && (
              <Text text={gradeName.error} style={TEXT_ERROR} />
            )}
            <TextInput
              style={[
                INPUT_NAME,
                {
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(50)
                      : verticalScale(40)
                    : verticalScale(40),
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(9)
                    : moderateScale(11),
                },
              ]}
              onChangeText={onChangeUsername}
              value={username.value}
              placeholder={`${t('class_username')}`}
              keyboardType="default"
              placeholderTextColor={color.gray3}
              onBlur={onBlurUsername}
              onFocus={onFocusUsername}
              onEndEditing={onEndUsernameEdit}
            />
            {errors && <Text text={errors} style={TEXT_ERROR} />}
            {username.error && (
              <Text text={username.error} style={TEXT_ERROR} />
            )}
            <View style={INPUT_PASSWORD_CONTAINER}>
              <TextInput
                style={[
                  INPUT_PASSWORD,
                  {
                    height: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : verticalScale(40),
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
          <View>
            <ButtonLinearGradient
              text={`${t('add_class')}`}
              style={BUTTON_ADD_KID_VIEW}
              textStyle={TEXT_CONFIRM}
              onPress={onPressAddClass}
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
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  borderRadius: 20,
};
const CONTENT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
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
const INPUT_NAME: any = {
  height: isTablet() ? verticalScale(40) : 40,
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginTop: verticalScale(10),
};
const INPUT_PASSWORD: any = {
  height: isTablet() ? verticalScale(40) : 40,
  width: '100%',
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginTop: 10,
};
const BUTTON_ADD_KID_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  width: 260,
  height: 55,
  marginTop: 10,
};
const TEXT_CONFIRM: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: isTablet() ? moderateScale(10) : moderateScale(14),
};
const EYE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 20,
  bottom: isTablet() ? verticalScale(10) : 6,
};
const INPUT_PASSWORD_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
const CAMERA_VIEW: ViewStyle = {
  width: isTablet() ? 100 : 70,
  height: isTablet() ? 100 : 70,
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
const TEXT_ERROR: TextStyle = {
  fontSize: 12,
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: 5,
};
