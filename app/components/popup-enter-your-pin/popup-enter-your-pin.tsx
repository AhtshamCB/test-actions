import React, {FC} from 'react';
import {View, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
//
import {PopupEnterYourPinProps} from './popup-enter-your-pin.props';
import {color, typography} from '@app/theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Text} from '../text/text';
import {CloseMenu} from '@app/svg';

export const PopupEnterYourPin: FC<PopupEnterYourPinProps> = ({
  isVisible,
  title,
  error,
  onCodeChanged,
  onCodeFilled,
  onClose,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={color.palette.mineShaft}
      backdropOpacity={0.5}
      animationInTiming={150}
      animationOutTiming={150}
      backdropTransitionOutTiming={0}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={MODAL}
      deviceHeight={2000}
      statusBarTranslucent>
      <View style={CONTAINER}>
        <TouchableOpacity onPress={onClose} style={BUTTON_CONTAINER}>
          <CloseMenu />
        </TouchableOpacity>
        <Text text={title} style={PIN_TEXT} />
        <OTPInputView
          secureTextEntry
          style={{width: '80%', height: 100}}
          pinCount={4}
          onCodeChanged={onCodeChanged}
          codeInputFieldStyle={UNDER_LINE_STYLE_BASE}
          onCodeFilled={onCodeFilled}
        />
        {error && <Text text={error} style={TEXT_ERROR} />}
      </View>
    </Modal>
  );
};

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: color.white,
  borderRadius: 20,
  marginStart: 20,
  marginEnd: 20,
};
const MODAL: ViewStyle = {
  // margin: 40,
};
const UNDER_LINE_STYLE_BASE: TextStyle = {
  width: 47,
  height: 56,
  borderWidth: 1,
  borderRadius: 10,
  borderColor: color.dark5,
  color: color.black1,
  fontSize: 36,
  padding: 0,
  fontFamily: typography.promptRegular,
};
const PIN_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 22,
  fontWeight: '400',
  color: color.black1,
};
const TEXT_ERROR: TextStyle = {
  fontSize: 15,
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
};
const BUTTON_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'flex-end',
  width: '100%',
  padding: 10,
  marginTop: -20,
  marginLeft: 20,
};
