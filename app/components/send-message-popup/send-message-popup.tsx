import React, {FC, useMemo, useState} from 'react';
import {View, ViewStyle, TextStyle, TextInput} from 'react-native';
import Modal from 'react-native-modal';
//
import {SendMessagePopupProps} from './send-message-popup.props';
import {ButtonBorder, ButtonLinearGradient, Text} from '@app/components';

import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import FastImage from 'react-native-fast-image';
import {InputObject} from '@app/models';
import {useOrientation, useSchool} from '@app/hook';
import {showToastMessage} from '@app/utils';
import {TYPE} from '@app/utils/contants';

const BACKGROUND = require('@app/components/images/background-alert.png');

export const SendMessagePopup: FC<SendMessagePopupProps> = ({
  isVisible,
  containerStyle,
  backgroundStyle,
  title,
  titleStyle,
  onClose,
  id,
}) => {
  const orientation = useOrientation();
  const {orientationOpenApp} = useSelector(selector.config);
  const {userInfo} = useSelector(selector.user);
  const {sendNotification} = useSchool();
  const [message, setMessage] = useState<InputObject>({
    value: '',
    error: '',
  });
  const onCompletedSendMessage = () => {
    onClose && onClose();
    showToastMessage('Send Message Successfully', 'success', {
      bottomOffset: 80,
    });
  };

  const onErrorSendMessage = () => {
    onClose && onClose();
    showToastMessage('Send Message Failed', 'error', {
      bottomOffset: 80,
    });
  };

  const onChangeTextInput = text => {
    setMessage({value: text, error: ''});
  };

  const isValidData = useMemo(
    () => message.value && message.value.length <= 256,
    [message],
  );

  const onSendNotification = async () => {
    if (isValidData) {
      const res = await sendNotification({
        payload: {
          message: message.value,
          to: id,
        },
      });
      if (res?.sendNotifications?.isSuccess) {
        setMessage({value: '', error: ''});
        onCompletedSendMessage();
      } else {
        setMessage({value: '', error: ''});
        onErrorSendMessage();
      }
    } else {
      if (message.value.length > 256) {
        setMessage({
          value: message.value,
          error:
            '⚠️ Warning: Character limit exceeded! Please shorten your message to 256 characters or less.',
        });
      } else if (!message.value) {
        setMessage({
          value: message.value,
          error: '*Require',
        });
      }
    }
  };

  const onClosePopup = () => {
    setMessage({value: '', error: ''});
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
      <View style={[CONTAINER, containerStyle]}>
        <FastImage
          source={BACKGROUND}
          style={[IMAGE_BACKGROUND_VIEW, backgroundStyle]}
          resizeMode={'stretch'}
        />
        <LinearGradientText
          colors={['#DB14FB', '#FFC700']}
          text={`${title}`}
          start={{x: 0.0, y: 0.9}}
          textStyle={[
            TITLE_MODAL,
            {
              fontSize: isTablet() ? moderateScale(30) : moderateScale(35),
            },
            titleStyle,
          ]}
        />
        <TextInput
          style={[
            INPUT_NAME,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(60)
                  : verticalScale(40)
                : verticalScale(40),
            },
          ]}
          onChangeText={onChangeTextInput}
          value={message.value}
          placeholder={
            userInfo?.me?.role === TYPE.SCHOOL
              ? 'Type Your Message To This Teacher'
              : 'Type Your Message To This Student'
          }
          keyboardType="default"
          placeholderTextColor={color.gray3}
        />
        {message.error && <Text text={message.error} style={TEXT_ERROR} />}
        <View style={CONTAINER_BUTTON}>
          <ButtonLinearGradient
            text={'Send'}
            style={[
              BUTTON_SAVE_VIEW,
              {
                height: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(40),
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(80)
                    : horizontalScale(120)
                  : horizontalScale(120),
              },
            ]}
            textStyle={TEXT_SAVE}
            onPress={onSendNotification}
          />
          <ButtonBorder
            text={'Close'}
            onPress={onClosePopup}
            textStyle={TEXT_MODAL_LOGIN}
            containerStyle={[
              CLOSE_BUTTON,
              {
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(35),
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(80)
                    : horizontalScale(120)
                  : horizontalScale(120),
              },
            ]}
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
  overflow: 'hidden',
};
const IMAGE_BACKGROUND_VIEW: any = {
  width: horizontalScale(600),
  position: 'absolute',
  top: 0,
  transform: [{rotate: '180deg'}],
};
const MODAL: ViewStyle = {};
const TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  textAlign: 'center',
  padding: 10,
};
const INPUT_NAME: any = {
  backgroundColor: color.white,
  paddingHorizontal: horizontalScale(10),
  fontSize: isTablet() ? moderateScale(9) : moderateScale(11),
  marginTop: verticalScale(20),
  width: '100%',
  borderColor: color.gray6,
  borderWidth: 1,
};
const CONTAINER_BUTTON: ViewStyle = {
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'row',
  width: '100%',
};
const TEXT_MODAL_LOGIN: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
  width: '100%',
};
const CLOSE_BUTTON: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: isTablet() ? verticalScale(40) : verticalScale(46),
  width: isTablet() ? horizontalScale(120) : horizontalScale(140),
  paddingHorizontal: isTablet() ? 20 : 20,
  marginTop: 20,
};
const BUTTON_SAVE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  marginTop: 20,
  width: horizontalScale(120),
};
const TEXT_SAVE: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
  fontWeight: '400',
};
const TEXT_ERROR: TextStyle = {
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
  alignSelf: 'flex-start',
  fontSize: moderateScale(11),
};
