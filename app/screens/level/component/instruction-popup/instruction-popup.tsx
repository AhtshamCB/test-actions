/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, ViewStyle, TextStyle} from 'react-native';
import Modal from 'react-native-modal';
//
import {InstructionPopupProps} from './instruction-popup.props';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
//
import {isTablet} from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {ButtonLinearGradient} from '@app/components';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

const BACKGROUND = require('@app/components/images/background-alert.png');

export const InstructionPopup: FC<InstructionPopupProps> = ({
  isVisible,
  onClose,
  title,
  guide,
  backgroundHeight,
  height,
}) => {
  const {orientationOpenApp} = useSelector(selector.config);
  const fontSizeRender = isTablet() ? 18 : 14;

  const renderHTML = fontSize => `
  <!DOCTYPE html>
    <html>
      <head>
      <meta name="viewport" content="width=device-width" initial-scale="0" maximum-scale="0">
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600;700&display=swap');
        body {
          font-family: 'Prompt', sans-serif;
          font-size: ${fontSize}px;
        }
        </style>
      </head>
      <body>
        ${guide}
      </body>
    </html>
  `;

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
      deviceHeight={2000}
      deviceWidth={isTablet() ? 2000 : 0}
      statusBarTranslucent>
      <View style={[VIEW_CONTAINER, height]}>
        <View style={CONTAINER}>
          <FastImage
            source={BACKGROUND}
            style={[IMAGE_BACKGROUND_VIEW, backgroundHeight]}
            resizeMode={'stretch'}
          />
          <LinearGradientText
            colors={['#DB14FB', '#FFC700']}
            text={title}
            start={{x: 0.0, y: 0.9}}
            textStyle={{
              fontFamily: typography.promptBold,
              fontWeight: '700',
              textAlign: 'center',
              fontSize: isTablet() ? moderateScale(18) : moderateScale(20),
            }}
          />
        </View>
        <WebView
          originWhitelist={['*']}
          automaticallyAdjustContentInsets={false}
          source={{html: renderHTML(fontSizeRender), baseUrl: ''}}
          javaScriptEnabled
          startInLoadingState
          scalesPageToFit={true}
          bounces={false}
        />
        <View style={BUTTON_CLOSE_CONTAINER}>
          <ButtonLinearGradient
            text={'Close'}
            style={[
              BUTTON_CLOSE_VIEW,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(50)
                    : horizontalScale(70)
                  : horizontalScale(90),

                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(40),
              },
            ]}
            textStyle={TEXT_SAVE}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const VIEW_CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  borderRadius: 20,
  marginTop: verticalScale(10),
  maxHeight: verticalScale(700),
  flex: 1,
};
const CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  paddingVertical: verticalScale(20),
  overflow: 'hidden',
};
const IMAGE_BACKGROUND_VIEW: any = {
  width: horizontalScale(600),
  height: isTablet() ? verticalScale(70) : verticalScale(65),
  position: 'absolute',
  top: 0,
  transform: [{rotate: '180deg'}],
};
const BUTTON_CLOSE_CONTAINER: ViewStyle = {
  width: '100%',
  alignItems: 'flex-end',
  padding: 10,
};
const BUTTON_CLOSE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 100,
  marginTop: verticalScale(20),
};
const TEXT_SAVE: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptBold,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(14),
  fontWeight: '700',
};
