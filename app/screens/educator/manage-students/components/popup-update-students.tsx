/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInput,
} from 'react-native';
//
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
//
import {Text, ButtonLinearGradient} from '@app/components';
//
import {color, moderateScale, typography, verticalScale} from '@app/theme';
import {CloseMenu, EyeCrossedIcon, EyeIcon} from '@app/svg';
//
import {InputObject} from '@app/models';
import {
  convertToLetterAndSpaceOnly,
  leftTrim,
  removeVietnameseTones,
  removeWhiteSpace,
} from '@app/utils/general';
import {useTranslation} from 'react-i18next';
import {isTablet} from 'react-native-device-info';
import {useGrade, useOrientation} from '@app/hook';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

export const PopupUpdateStudent = ({
  isVisible,
  onClose,
  onCompleted,
  gradeId,
  onError,
  studentName,
}) => {
  const {t} = useTranslation();
  const orientation = useOrientation();
  const {orientationOpenApp} = useSelector(selector.config);
  const [age, setAge] = useState<string>('');
  const [date, setDate] = useState(new Date('2016-01-01'));
  const [open, setOpen] = useState(false);
  const [isVisiblePassword, setVisiblePassword] = useState(true);

  const [name, setName] = useState<InputObject>({
    value: '',
    error: '',
  });

  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });

  useEffect(() => {
    setName({value: studentName, error: ''});
  }, [studentName]);

  const {updateStudent} = useGrade();

  const onChangeName = text => {
    const onlyLetter = convertToLetterAndSpaceOnly(leftTrim(text));
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
    return name.value || (password.value && password.value.length > 8);
  }, [name, password]);

  const onPressUpdateKid = async () => {
    if (isValidData) {
      const res = await updateStudent({
        payload: {
          name: name.value,
          birthday: moment(date).format('YYYY-MM-DD'),
          password: password.value,
          avatar: null,
          _id: gradeId,
        },
      });
      if (res?.updateChild) {
        await onCompletedUpdateStudent();
      } else {
        await onErrorUpdateStudent();
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

  const onCompletedUpdateStudent = () => {
    onCompleted && onCompleted();
  };

  const onErrorUpdateStudent = () => {
    onError && onError();
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
          <View style={CONTENT}>
            <Text
              text={`${t('update_student_data')}`}
              style={UPDATE_KIDS_TEXT}
            />
            <Text
              text={`${t('avatar_will_be_change_by_your_student')}`}
              style={AVATAR_WILL_BE_CHANGE_TEXT}
            />
          </View>
          <View style={BODY}>
            <TextInput
              style={[
                INPUT_NAME,
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
              onChangeText={onChangeName}
              value={name.value}
              placeholder={'New Name'}
              keyboardType="default"
              placeholderTextColor={color.gray3}
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
                },
              ]}
              onPress={() => setOpen(true)}>
              <Text
                text={age === '' ? `${t('birthday')}` : age}
                style={
                  age === ''
                    ? [
                        AGE_RANGE_TEXT_NULL,
                        {
                          fontSize: isTablet()
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(8)
                              : moderateScale(9)
                            : moderateScale(11),
                        },
                      ]
                    : [
                        AGE_RANGE_TEXT,
                        {
                          fontSize: isTablet()
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(8)
                              : moderateScale(9)
                            : moderateScale(11),
                        },
                      ]
                }
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
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
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
              onPress={onPressUpdateKid}
            />
          </View>
        </View>
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
  height: 40,
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
};
const BUTTON_AGE_RANGE: ViewStyle = {
  height: 40,
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  marginTop: 10,
  justifyContent: 'center',
};
const AGE_RANGE_TEXT_NULL: TextStyle = {
  fontSize: isTablet() ? moderateScale(9) : moderateScale(11),
  color: color.gray3,
  marginTop: 5,
};
const AGE_RANGE_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(9) : moderateScale(11),
  fontWeight: '400',
  color: color.black1,
  fontFamily: typography.promptRegular,
  marginTop: 5,
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

const UPDATE_KIDS_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: isTablet() ? moderateScale(16) : moderateScale(18),
  fontWeight: '700',
  color: color.black1,
};
const AVATAR_WILL_BE_CHANGE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(8) : moderateScale(10),
  fontWeight: '400',
  color: color.purple,
};
const TEXT_ERROR: TextStyle = {
  fontSize: 12,
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  paddingHorizontal: 5,
};
