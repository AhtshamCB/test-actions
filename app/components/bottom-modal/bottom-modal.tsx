import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  TextStyle,
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
  ImageStyle,
} from 'react-native';
import Modal from 'react-native-modal';
//
import {Text} from '../text/text';
// import {SafeBottomButton} from '../safe-bottom-button/safe-bottom-button';
//
import {color, typography} from '@app/theme';

const CLOSE = require('./images/close.png');
/**
 * BottomModal
 */

interface BottomModalProps {
  isVisible: boolean;
  label?: string;
  titleComponent?: ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
}

export const BottomModal = function BottomModal({
  isVisible,
  label,
  titleComponent,
  onClose,
  children,
}: BottomModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor={color.palette.mineShaft}
      backdropOpacity={0.5}
      animationInTiming={150}
      animationOutTiming={150}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      style={MODAL}
      statusBarTranslucent>
      <KeyboardAvoidingView style={CONTAINER} behavior={'padding'}>
        {titleComponent || (
          <View style={HEADER}>
            <Text style={TITLE_STYLE} text={label} />
            <TouchableOpacity onPress={onClose}>
              <Image source={CLOSE} style={IMAGE} />
            </TouchableOpacity>
          </View>
        )}
        <View style={BODY}>{children}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const MODAL: ViewStyle = {
  justifyContent: 'flex-end',
  margin: 0,
};
const CONTAINER: ViewStyle = {
  justifyContent: 'center',
  backgroundColor: color.palette.white,
  // width: 390,
  height: 360,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  // flex: 0.5,
};
const HEADER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  // paddingTop: 13,
  paddingHorizontal: 15,
  paddingBottom: 9,
};
const TITLE_STYLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 20,
  color: color.dark1,
  fontWeight: '700',
  marginBottom: 20,
};
const BODY: ViewStyle = {};
const IMAGE: ImageStyle = {
  marginBottom: 20,
};
