import React, {useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
//
import {Text, ButtonLinearGradient} from '@app/components';
import {color, moderateScale, typography, verticalScale} from '@app/theme';
import {InputObject} from '@app/models';
import {
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils/general';
import {CloseMenu} from '@app/svg';
import {useSelfChangePassword} from '@app/hook/useSelfChangePassword';
import {showToastMessage} from '@app/utils';
import {useTranslation} from 'react-i18next';
import {isTablet} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

export const ChangePasswordPopup = ({
  isVisible,
  onClose,
  onCompletedUpdatePassword,
}) => {
  const {t} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);

  const [error, setError] = useState('');

  const [oldPassword, setOldPassword] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [newPassword, setNewPassword] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState<InputObject>({
    value: '',
    error: '',
  });

  const onCompletedSelfChangePassword: any = () => {
    onCompletedUpdatePassword && onCompletedUpdatePassword();
    setOldPassword({value: '', error: ''});
    setNewPassword({value: '', error: ''});
    setConfirmNewPassword({value: '', error: ''});
    showToastMessage('Change Password Successfully', 'success', {
      bottomOffset: 80,
    });
  };
  const onErrorSelfChangePassword: any = () => {
    showToastMessage('Change Password Failed', 'error', {
      bottomOffset: 80,
    });
  };
  const {
    selfChangePassword,
    errorParentChangePassword,
    setErrorParentChangePassword,
  } = useSelfChangePassword();

  const onChangeOldPassword = text => {
    setError('');
    setErrorParentChangePassword('');
    const onlyLetter = removeVietnameseTones(
      removeWhiteSpace(leftTrim(text).toLowerCase()),
    );
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setOldPassword({value: onlyLetter, error: ''});
      }
    } else {
      setOldPassword({value: onlyLetter, error: ''});
    }
  };

  const onChangeNewPassword = text => {
    setError('');
    setErrorParentChangePassword('');
    const onlyLetter = removeVietnameseTones(
      removeWhiteSpace(leftTrim(text).toLowerCase()),
    );
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setNewPassword({value: onlyLetter, error: ''});
      }
    } else {
      setNewPassword({value: onlyLetter, error: ''});
    }
  };

  const onChangeConfirmNewPassword = text => {
    setError('');
    setErrorParentChangePassword('');
    const onlyLetter = removeVietnameseTones(
      removeWhiteSpace(leftTrim(text).toLowerCase()),
    );
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setConfirmNewPassword({value: onlyLetter, error: ''});
      }
    } else {
      setConfirmNewPassword({value: onlyLetter, error: ''});
    }
  };

  const onConfirmUpdatePassword = async () => {
    if (isValidData) {
      try {
        const res = await selfChangePassword({
          payload: {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
          },
        });
        if (res?.selfChangePassword?.isUpdated) {
          await onCompletedSelfChangePassword();
        } else {
          await onErrorSelfChangePassword();
        }
      } catch (err) {
        console.log('error', err);
      }
    } else {
      if (oldPassword.value.length > 0 && oldPassword.value.length < 8) {
        setOldPassword({
          value: oldPassword.value,
          error: '*Old Password must be longer than or equal to 8 characters',
        });
      } else if (newPassword.value.length > 0 && newPassword.value.length < 8) {
        setNewPassword({
          value: newPassword.value,
          error: '*New Password must be longer than or equal to 8 characters',
        });
      } else if (
        confirmNewPassword.value.length > 0 &&
        confirmNewPassword.value.length < 8
      ) {
        setConfirmNewPassword({
          value: confirmNewPassword.value,
          error:
            '*Confirm New Password must be longer than or equal to 8 characters',
        });
      } else if (!oldPassword.value) {
        setOldPassword({
          value: newPassword.value,
          error: '*Please enter Old Password',
        });
      } else if (!newPassword.value) {
        setNewPassword({
          value: newPassword.value,
          error: '*Please enter New Password',
        });
      } else if (!confirmNewPassword.value) {
        setConfirmNewPassword({
          value: confirmNewPassword.value,
          error: '*Please enter Confirm New Password',
        });
      } else if (newPassword.value !== confirmNewPassword.value) {
        setError('* Password and confirm password does not match');
      }
    }
  };

  const isValidData = useMemo(() => {
    return (
      oldPassword.value &&
      newPassword.value &&
      newPassword.value.length > 8 &&
      confirmNewPassword.value &&
      confirmNewPassword.value.length > 8 &&
      newPassword.value === confirmNewPassword.value
    );
  }, [oldPassword, newPassword, confirmNewPassword]);

  const onClosePopup = () => {
    setError('');
    setOldPassword({value: '', error: ''});
    setNewPassword({value: '', error: ''});
    setConfirmNewPassword({value: '', error: ''});
    setErrorParentChangePassword('');
    onClose && onClose();
  };

  return (
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
        <View>
          <Text text={`${t('change_password')}`} style={CHANGE_PASSWORD_TEXT} />
        </View>
        <View style={BODY}>
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
                    : moderateScale(10)
                  : moderateScale(11),
              },
            ]}
            onChangeText={onChangeOldPassword}
            value={oldPassword.value}
            placeholder={`${t('old_password')}`}
            keyboardType="default"
            placeholderTextColor={color.gray3}
            secureTextEntry
          />
          {oldPassword.error && (
            <Text
              text={oldPassword.error}
              style={[
                TEXT_ERROR,
                {
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10)
                    : moderateScale(12),
                },
              ]}
            />
          )}
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
                    : moderateScale(10)
                  : moderateScale(11),
              },
            ]}
            onChangeText={onChangeNewPassword}
            value={newPassword.value}
            placeholder={`${t('new_password')}`}
            keyboardType="default"
            placeholderTextColor={color.gray3}
            secureTextEntry
          />
          {newPassword.error && (
            <Text
              text={newPassword.error}
              style={[
                TEXT_ERROR,
                {
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10)
                    : moderateScale(12),
                },
              ]}
            />
          )}
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
                    : moderateScale(10)
                  : moderateScale(11),
              },
            ]}
            onChangeText={onChangeConfirmNewPassword}
            value={confirmNewPassword.value}
            placeholder={`${t('confirm_new_password')}`}
            keyboardType="default"
            placeholderTextColor={color.gray3}
            secureTextEntry
          />
          {confirmNewPassword.error && (
            <Text
              text={confirmNewPassword.error}
              style={[
                TEXT_ERROR,
                {
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10)
                    : moderateScale(12),
                },
              ]}
            />
          )}
          {error && (
            <Text
              text={error}
              style={[
                TEXT_ERROR,
                {
                  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
                },
              ]}
            />
          )}
          {errorParentChangePassword && (
            <Text
              text={`*${errorParentChangePassword}`}
              style={[
                TEXT_ERROR,
                {
                  fontSize: isTablet() ? moderateScale(12) : moderateScale(12),
                },
              ]}
            />
          )}
        </View>
        <View>
          <ButtonLinearGradient
            text={`${t('change_password')}`}
            style={BUTTON_ADD_KID_VIEW}
            textStyle={TEXT_CONFIRM}
            onPress={onConfirmUpdatePassword}
          />
        </View>
      </View>
    </Modal>
  );
};

const CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  justifyContent: 'center',
  alignItems: 'center',
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
const CHANGE_PASSWORD_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: isTablet() ? moderateScale(12) : moderateScale(14),
  color: color.black1,
};
const INPUT_NAME: any = {
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(11),
};
const INPUT_PASSWORD: any = {
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
const TEXT_ERROR: TextStyle = {
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
};
