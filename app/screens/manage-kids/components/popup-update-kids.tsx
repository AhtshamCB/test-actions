import React, {useEffect, useState} from 'react';
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
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {useMutation} from '@apollo/client';
import {UPDATE_KIDS_QUERY} from '@app/apollo/query/update-kids-query';
//
import {color, moderateScale, typography} from '@app/theme';
import {CloseMenu, EyeCrossedIcon, EyeIcon} from '@app/svg';
//
import {InputObject} from '@app/models';
import {convertToLetterAndSpaceOnly, leftTrim} from '@app/utils/general';
import {useTranslation} from 'react-i18next';
import {isTablet} from 'react-native-device-info';

export const PopupUpdateKids = ({isVisible, onClose, onCompleted}) => {
  const {t} = useTranslation();
  const {accessToken, activeKidInfo} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  const [age, setAge] = useState<string>(
    activeKidInfo?.activeFor?.info?.birthday,
  );
  const [date, setDate] = useState(new Date('2016-01-01'));
  const [open, setOpen] = useState(false);
  const [isVisiblePassword, setVisiblePassword] = useState(true);
  const [name, setName] = useState<InputObject>({
    value: activeKidInfo?.activeFor?.info?.name || '',
    error: '',
  });

  const [password, setPassword] = useState<InputObject>({
    value: '',
    error: '',
  });

  useEffect(() => {
    setName({value: activeKidInfo?.activeFor?.info?.name, error: ''});
    setAge(activeKidInfo?.activeFor?.info?.birthday);
  }, [
    activeKidInfo?.activeFor?.info?.name,
    activeKidInfo?.activeFor?.info?.birthday,
  ]);

  const [updateKids] = useMutation(UPDATE_KIDS_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
      },
    },
    variables: {
      name: name.value,
      birthday: moment(date).format('YYYY-MM-DD'),
      password: password.value,
      _id: activeKidInfo?.activeFor?._id,
    },
    async onCompleted(data) {
      onCompleted && onCompleted(data?.updateChild);
    },
    onError(err) {
      console.log('=>>>>> error update kids', err);
    },
  });

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
    const onlyLetter = leftTrim(text);
    if (onlyLetter.length > 0) {
      if (onlyLetter.replace(' ', '') !== '') {
        setPassword({value: onlyLetter, error: ''});
      }
    } else {
      setPassword({value: onlyLetter, error: ''});
    }
  };

  const onPressUpdateKid = async () => {
    await updateKids();
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
          <View style={UPDATE_KID_DATA_VIEW}>
            <Text text={`${t('update_kids_data')}`} style={UPDATE_KIDS_TEXT} />
            <Text
              text={`${t('avatar_will_be_change_by_your_kid')}`}
              style={[
                AVATAR_WILL_BE_CHANGE_TEXT,
                {
                  fontSize: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10)
                    : moderateScale(10),
                },
              ]}
            />
          </View>
          <View style={BODY}>
            <TextInput
              style={INPUT_NAME}
              onChangeText={onChangeName}
              value={name.value}
              placeholder={`${t('name')}`}
              keyboardType="default"
              placeholderTextColor={color.gray3}
            />
            <TouchableOpacity
              style={BUTTON_AGE_RANGE}
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
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
            <View style={INPUT_PASSWORD_CONTAINER}>
              <TextInput
                style={INPUT_PASSWORD}
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
const UPDATE_KID_DATA_VIEW: ViewStyle = {
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
  fontSize: moderateScale(18),
  fontWeight: '700',
  color: color.black1,
};
const AVATAR_WILL_BE_CHANGE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,

  fontWeight: '400',
  color: color.purple,
};
