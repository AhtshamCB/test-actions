/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
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

export const PopupUpdateClasses = ({
  isVisible,
  gradeId,
  onClose,
  onCompleted,
  onError,
  className,
}) => {
  const {t} = useTranslation();
  const {accessToken} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);
  const [isVisiblePassword, setVisiblePassword] = useState(true);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<any>('');

  const {uploadFile, fileData} = useUploadFile(accessToken);
  const [name, setName] = useState<InputObject>({
    value: className || '',
    error: '',
  });
  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });

  useEffect(() => {
    setName({value: className, error: ''});
  }, [className]);

  const {updateGrade} = useSchool();

  const onCompletedUpdateClass = () => {
    onCompleted && onCompleted();
  };

  const onErrorUpdateClass = () => {
    onError && onError();
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

  const isValidData = useMemo(() => {
    return (
      name.value ||
      (password.value && password.value.length > 8) ||
      imageSelected
    );
  }, [name, password, imageSelected]);

  const onPressUpdateGrade = async () => {
    if (isValidData) {
      const res = await updateGrade({
        payload: {
          gradeId: gradeId,
          gradeName: name.value ? name.value : null,
          password: password.value ? password.value : null,
          avatar: fileData !== null ? fileData : null,
        },
      });
      if (res?.updateGrade) {
        await onCompletedUpdateClass();
      } else {
        await onErrorUpdateClass();
      }
    } else {
      if (!name.value) {
        setName({
          value: name.value,
          error: '*Please enter Class Name',
        });
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
    setPassword({value: '', error: ''});
    setImageSelected('');
    onClose && onClose();
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
          <View style={CONTENT}>
            <Text
              text={`${t('update_class_account')}`}
              style={[
                UPDATE_KIDS_TEXT,
                {
                  fontSize: isTablet() ? moderateScale(14) : moderateScale(18),
                },
              ]}
            />
          </View>
          <View style={BODY}>
            <View
              style={[
                CONTENT,
                {
                  padding: 10,
                },
              ]}>
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
              onChangeText={onChangeName}
              value={name.value}
              placeholder={name.value ? name.value : 'New Class Name'}
              keyboardType="default"
              placeholderTextColor={color.gray3}
            />
            {name.error && <Text text={name.error} style={TEXT_ERROR} />}
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
                placeholder={`${t('new_password')}`}
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
              text={`${t('save')}`}
              style={BUTTON_ADD_KID_VIEW}
              textStyle={TEXT_CONFIRM}
              onPress={onPressUpdateGrade}
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
const INPUT_NAME: ViewStyle = {
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
};
const INPUT_PASSWORD: ViewStyle = {
  height: 40,
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
  bottom: verticalScale(12),
};
const INPUT_PASSWORD_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const UPDATE_KIDS_TEXT: TextStyle = {
  fontFamily: typography.promptBold,

  fontWeight: '700',
  color: color.black1,
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
const TEXT_ERROR: TextStyle = {
  fontSize: 12,
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: 5,
};
