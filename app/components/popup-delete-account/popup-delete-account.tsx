/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
//
import {PopupDeleteAccountProps} from './popup-delete-account.props';
import {
  Text,
  ButtonLinearGradient,
  RadioButton,
  ButtonBorder,
} from '@app/components';

import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {Checkbox} from '../checkbox/checkbox';
import {isTablet} from 'react-native-device-info';
import {InputObject} from '@app/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selector, UserActions} from '@app/redux';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  isIPhone8PlusOrBelow,
  useDeleteAccount,
  useLogout,
  useOrientation,
  useReasonDeleteUser,
} from '@app/hook';
import FastImage from 'react-native-fast-image';

const BACKGROUND = require('@app/components/images/background-alert.png');

export const PopupDeleteAccount: FC<PopupDeleteAccountProps> = ({
  isVisible,
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  onClose,
}) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const {accessToken} = useSelector(selector.user);
  const orientation = useOrientation();
  const {orientationOpenApp} = useSelector(selector.config);

  const [feedback, setFeedback] = useState<InputObject>({
    value: '',
    error: '',
  });
  const [valueCheckbox, setValueCheckbox] = useState<boolean>(false);
  const [dataResult, setDataResult] = useState<any>();
  const [errorReasonSelected, setErrorReasonSelected] = useState<string>('');
  const [errorCheckbox, setErrorCheckbox] = useState<string>('');
  const [reasonSelected, setReasonSelected] = useState<string>('');

  const {getReasonDeleteUser, reason} = useReasonDeleteUser(accessToken);
  const {logout} = useLogout(accessToken);

  useEffect(() => {
    if (isVisible) {
      getReasonDeleteUser();
    }
  }, [isVisible]);

  useEffect(() => {
    setDataResult(reason);
  }, [reason]);

  const onCompletedDeleteUser = async () => {
    await logout();
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
      await AsyncStorage.setItem('isFinishOnboarding', JSON.stringify(true));
    } else {
      await AsyncStorage.multiRemove(asyncStorageKeys);
      await AsyncStorage.setItem('isFinishOnboarding', JSON.stringify(true));
    }
    dispatch(UserActions.signOut());
    navigation.navigate('login');
  };

  const {deleteUser} = useDeleteAccount(
    accessToken,
    feedback.value,
    reasonSelected,
    onCompletedDeleteUser,
  );

  const onChangeFeedback = text => {
    setFeedback({value: text.trim(), error: ''});
  };

  const onPressCheckbox = () => {
    setErrorCheckbox('');
    setValueCheckbox(!valueCheckbox);
  };

  const onPressRadioButton = item => {
    setErrorReasonSelected('');
    setDataResult(
      dataResult?.map(itemData => ({
        ...itemData,
        selected: itemData.id === item.id && !itemData.selected,
      })),
    );
  };

  const isValidData = useMemo(() => {
    const valueDataResult = dataResult?.filter(item => item.selected === true);
    return feedback.value && valueDataResult?.length > 0 && valueCheckbox;
  }, [feedback, valueCheckbox, dataResult]);

  const onConfirm = async () => {
    if (isValidData) {
      onClose && onClose();
      const valueDataResult = dataResult?.find(item => item.selected === true);
      await setReasonSelected(valueDataResult.reason);
      await deleteUser();
      await (onCompletedDeleteUser && onCompletedDeleteUser());
    } else {
      const valueDataResult = dataResult?.filter(
        item => item.selected === true,
      );
      if (valueDataResult?.length === 0) {
        setErrorReasonSelected('*Please enter your reason');
      } else if (feedback.value === '') {
        setFeedback({
          value: feedback.value,
          error: '*Please enter your feedback',
        });
      } else if (!valueCheckbox) {
        setErrorCheckbox('*Require');
      }
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
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
      <KeyboardAvoidingView behavior="padding" style={CONTAINER}>
        <View
          style={{
            height: 'auto',
            backgroundColor: color.white,
            borderRadius: 10,
            overflow: 'hidden',
            width: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? orientation === 'PORTRAIT'
                  ? 'auto'
                  : horizontalScale(320)
                : horizontalScale(320)
              : horizontalScale(320),
          }}>
          <FastImage
            source={BACKGROUND}
            style={[
              IMAGE_BACKGROUND_VIEW,
              {
                height:
                  Platform.OS === 'android'
                    ? verticalScale(180)
                    : isIPhone8PlusOrBelow()
                    ? verticalScale(180)
                    : isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(170)
                        : verticalScale(100)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(160)
                      : verticalScale(100)
                    : verticalScale(150),
              },
            ]}
            resizeMode={'stretch'}
          />
          <LinearGradientText
            colors={['#DB14FB', '#FFC700']}
            text={'We Are Sorry'}
            start={{x: 0.0, y: 0.9}}
            textStyle={LINEAR_TEXT}
          />
          <Text style={[TITLE_MODAL, titleStyle]} text={title} />
          <Text text={subtitle} style={[SUB_TITLE_MODAL, subtitleStyle]} />
          <View style={BODY}>
            <View style={DIRECTION_VIEW}>
              <View style={VIEW_ICON} />
              <Text
                text={'Please share reason for leaving (REQUIRED)'}
                style={[
                  REQUIRED_TEXT,
                  {
                    fontSize: isTablet()
                      ? moderateScale(10)
                      : moderateScale(12),
                  },
                ]}
              />
            </View>
            <View style={RADIO_VIEW}>
              {dataResult?.map(item => {
                return (
                  <RadioButton
                    onPress={() => onPressRadioButton(item)}
                    selected={item.selected}
                    key={item.id}>
                    {item.reason}
                  </RadioButton>
                );
              })}
              {errorReasonSelected && (
                <Text
                  text={errorReasonSelected}
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
            </View>
          </View>
          <View style={[BODY]}>
            <View style={REQUIRED_VIEW}>
              <View style={[VIEW_ICON]} />
              <Text
                text={
                  'Would you be willing to provide feedback about your experience with our product/service? (REQUIRED)'
                }
                style={[
                  REQUIRED_TEXT,
                  {
                    fontSize: isTablet()
                      ? moderateScale(10)
                      : moderateScale(12),
                  },
                ]}
              />
            </View>
            <View style={TEXT_INPUT_VIEW}>
              <TextInput
                style={INPUT_NAME_COMMON}
                onChangeText={onChangeFeedback}
                value={feedback.value}
                placeholder=""
                keyboardType="default"
                placeholderTextColor={color.dark4}
              />
              {feedback.error && (
                <Text
                  text={feedback.error}
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
            </View>

            <TouchableOpacity
              style={[DIRECTION_VIEW, {marginTop: 15, width: '90%'}]}
              onPress={onPressCheckbox}>
              <Checkbox value={valueCheckbox} onToggle={onPressCheckbox} />
              <Text
                text={
                  "I understand that I will lose all my students' learning data on TeeFi when I delete my account"
                }
                style={{
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(12)
                    : moderateScale(12),
                  fontFamily: typography.promptRegular,
                  fontWeight: '400',
                }}
              />
            </TouchableOpacity>
            {errorCheckbox && (
              <Text
                text={errorCheckbox}
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
          </View>

          <View
            style={[
              CONTAINER_BUTTON,
              {
                flexDirection: isTablet() ? 'row' : 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(-25)
                      : verticalScale(10)
                    : 0
                  : 0,
                marginVertical: verticalScale(20),
              },
            ]}>
            <ButtonLinearGradient
              text="Cancel"
              style={[
                BUTTON_LOGIN_MODAL_VIEW,
                {
                  width: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(100)
                        : horizontalScale(120)
                      : horizontalScale(120)
                    : horizontalScale(200),
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40)
                    : verticalScale(45),
                },
              ]}
              textStyle={[
                TEXT_MODAL_LOGIN,
                {
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(9)
                      : moderateScale(10)
                    : moderateScale(13),
                },
              ]}
              onPress={() => {
                setErrorReasonSelected('');
                setFeedback({value: '', error: ''});
                setErrorCheckbox('');
                setValueCheckbox(false);
                onClose && onClose();
              }}
            />
            <ButtonBorder
              text="Permanently Delete Account"
              containerStyle={[
                BUTTON_BORDER_CONTAINER,
                {
                  width: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(100)
                        : horizontalScale(120)
                      : horizontalScale(120)
                    : horizontalScale(200),

                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40)
                    : verticalScale(45),
                },
              ]}
              onPress={onConfirm}
              textStyle={[
                TEXT_MODAL_DELETE,
                {
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(9)
                      : moderateScale(10)
                    : moderateScale(13),
                },
              ]}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  maxHeight: 20000,
};
const MODAL: ViewStyle = {};
const IMAGE_BACKGROUND_VIEW: any = {
  width: horizontalScale(1000),
  position: 'absolute',
  top: 0,
  transform: [{rotate: '180deg'}],
};
const BODY: ViewStyle = {
  padding: 10,
  marginTop: verticalScale(15),
};
const TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptLight,
  fontSize: isTablet() ? moderateScale(18) : moderateScale(32),
  color: color.black1,
  textAlign: 'center',
  marginTop: -10,
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(9) : moderateScale(12),
  color: color.black1,
  textAlign: 'center',
  fontWeight: '400',
  paddingHorizontal: 60,
};
const RADIO_VIEW: ViewStyle = {
  marginTop: 10,
  alignItems: 'flex-start',
  height: 'auto',
};
const REQUIRED_VIEW: ViewStyle = {
  flexDirection: 'row',
  width: '90%',
  // justifyContent: 'center',
  alignItems: 'center',
};
const TEXT_INPUT_VIEW: ViewStyle = {
  justifyContent: 'center',
};
const VIEW_ICON: ViewStyle = {
  width: 15,
  height: 15,
  backgroundColor: color.purple,
  borderRadius: 40,
  marginEnd: 10,
  alignSelf: 'center',
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
const REQUIRED_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,

  color: color.black1,
  textAlign: 'left',
  fontWeight: '400',
};
const CONTAINER_BUTTON: ViewStyle = {
  width: '100%',
  marginTop: -10,
};
const BUTTON_LOGIN_MODAL_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,

  marginTop: 20,
  marginStart: 40,
  marginEnd: 40,
};
const BUTTON_BORDER_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,

  marginTop: 20,
  marginStart: 40,
  marginEnd: 40,
};
const TEXT_MODAL_LOGIN: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptBold,
  fontWeight: '700',
};
const TEXT_MODAL_DELETE: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptRegular,
  fontWeight: '400',
};
const LINEAR_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(25) : moderateScale(35),
  fontFamily: typography.promptBold,
  fontWeight: '700',
  textAlign: 'center',
  marginTop: 10,
};
const INPUT_NAME_COMMON: ViewStyle = {
  width: '100%',
  height: isTablet() ? verticalScale(55) : verticalScale(45),
  backgroundColor: color.white,
  paddingHorizontal: 15,
  borderRadius: 10,
  borderColor: color.black1,
  borderWidth: 1,
  marginTop: 20,
};
const TEXT_ERROR: TextStyle = {
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: verticalScale(5),
};
