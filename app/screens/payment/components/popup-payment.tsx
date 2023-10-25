/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ViewStyle, ImageStyle, TextStyle, Image} from 'react-native';
import Modal from 'react-native-modal';
import {Text, ButtonLinearGradient} from '@app/components';

import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {ImageBackground} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {useOrientation} from '@app/hook';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

const BACKGROUND_HEADER = require('@app/components/images/background-alert.png');
const STUDY = require('@app/components/images/background-study-7.png');

export const PopupPayment = ({
  isVisible,
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  buttonTitle,
  onConfirm,
  onClose,
}) => {
  const orientation = useOrientation();
  const {orientationOpenApp} = useSelector(selector.config);
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
      <View style={CONTAINER}>
        <ImageBackground
          source={BACKGROUND_HEADER}
          style={[
            BACKGROUND_CONTAINER,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? verticalScale(420)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(450)
                  : verticalScale(360)
                : 350,
            },
          ]}>
          <Image source={STUDY} style={IMAGE} resizeMode="contain" />
        </ImageBackground>
        <Text style={[TITLE_MODAL, titleStyle]} text={title} />
        {subtitle ? (
          <Text style={[SUB_TITLE_MODAL, subtitleStyle]} text={subtitle} />
        ) : null}
        <View style={CONTAINER_BUTTON}>
          <ButtonLinearGradient
            text={buttonTitle}
            style={[
              BUTTON_LOGIN_MODAL_VIEW,
              {
                width: isTablet() ? horizontalScale(180) : horizontalScale(200),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(50)
                  : verticalScale(40),
              },
            ]}
            textStyle={[
              TEXT_MODAL_LOGIN,
              {
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(12)
                    : moderateScale(14)
                  : moderateScale(16),
              },
            ]}
            onPress={onConfirm}
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
};
const MODAL: ViewStyle = {
  // margin: 40,
};
const IMAGE: ImageStyle = {
  width: isTablet() ? 350 : 300,
  height: isTablet() ? 500 : 400,
  transform: [{rotate: '180deg'}],
};
const TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 36,
  color: color.purple,
  textAlign: 'center',
  marginTop: 10,
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
  color: color.gray3,
  textAlign: 'center',
  marginTop: 12,
};
const CONTAINER_BUTTON: ViewStyle = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};
const BUTTON_LOGIN_MODAL_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,

  marginEnd: 30,
  marginStart: 30,
  marginTop: 20,
  marginBottom: verticalScale(40),
};
const TEXT_MODAL_LOGIN: TextStyle = {
  textAlign: 'center',
};
const BACKGROUND_CONTAINER: ImageStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  transform: [{rotate: '180deg'}],
};
