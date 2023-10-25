/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
//
import {AlertComponentProps} from './alert-component.props';
import {Text, ButtonLinearGradient, ButtonBorder} from '@app/components';

import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {CloseMenu, WarningIcon} from '@app/svg';
import {isTablet} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import FastImage from 'react-native-fast-image';

const BACKGROUND = require('@app/components/images/background-alert.png');

export const AlertComponent: FC<AlertComponentProps> = ({
  isVisible,
  isShowIcon,
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  nextSubtitle,
  nextSubtitleStyle,
  imageCode,
  confirmBtTitle,
  onConfirm,
  onClose,
  isShowRightButton = false,
  cancelBtTitle,
  confirmButtonStyle,
  cancelButtonStyle,
  isShowTextInput = false,
  onChangeText,
  valueTextInput,
  textInputPlaceholder,
  isShowWarningIcon = false,
  error,
  backgroundStyle,
  cancelTextStyle,
  confirmTextStyle,
  containerButtonStyle,
  errorText,
}) => {
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
      <View
        style={[
          CONTAINER,
          {
            width: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? horizontalScale(250)
                : horizontalScale(300)
              : horizontalScale(350),
            overflow: 'hidden',
          },
        ]}>
        <FastImage
          source={BACKGROUND}
          style={[IMAGE_BACKGROUND_VIEW, backgroundStyle]}
          resizeMode={'stretch'}
        />
        {isShowIcon ? (
          <TouchableOpacity style={ICON_VIEW} onPress={onClose}>
            <CloseMenu />
          </TouchableOpacity>
        ) : null}
        {imageCode ? <Image source={imageCode} style={IMAGE} /> : null}

        <View style={ICON_TITLE_VIEW}>
          {isShowWarningIcon && (
            <WarningIcon
              width={isTablet() ? 50 : 40}
              height={isTablet() ? 50 : 40}
            />
          )}
          <Text style={[TITLE_MODAL, titleStyle]} text={title} />
        </View>

        {subtitle ? (
          <Text style={[SUB_TITLE_MODAL, subtitleStyle]} text={subtitle} />
        ) : null}
        {nextSubtitle ? (
          <Text
            style={[NEXT_SUB_TITLE_MODAL, nextSubtitleStyle]}
            text={nextSubtitle}
          />
        ) : null}
        <View style={CONTAINER_BUTTON}>
          {isShowTextInput ? (
            <>
              <TextInput
                style={[
                  INPUT,
                  {
                    height: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(50)
                        : verticalScale(40)
                      : verticalScale(45),
                    borderColor: error ? color.red : color.gray4,
                    borderWidth: 1,
                  },
                ]}
                onChangeText={onChangeText}
                value={valueTextInput}
                placeholder={textInputPlaceholder}
                keyboardType="default"
                placeholderTextColor={color.gray3}
                secureTextEntry
              />
            </>
          ) : null}
          {errorText && (
            <Text
              text={errorText}
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
          {isShowRightButton ? (
            <View style={[DIRECTION_VIEW, containerButtonStyle]}>
              <ButtonLinearGradient
                text={confirmBtTitle}
                style={[BUTTON_COMMON, confirmButtonStyle]}
                textStyle={[TEXT_MODAL_LOGIN, confirmTextStyle]}
                onPress={onConfirm}
              />

              <View style={{width: horizontalScale(10)}} />
              <ButtonBorder
                text={cancelBtTitle}
                containerStyle={[BUTTON_COMMON, cancelButtonStyle]}
                textStyle={[TEXT_MODAL_LOGIN, cancelTextStyle]}
                onPress={onClose}
              />
            </View>
          ) : (
            <ButtonLinearGradient
              text={confirmBtTitle}
              style={[BUTTON_LOGIN_MODAL_VIEW, confirmButtonStyle]}
              textStyle={[TEXT_MODAL_LOGIN, confirmTextStyle]}
              onPress={onConfirm}
            />
          )}
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
const MODAL: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const IMAGE_BACKGROUND_VIEW: any = {
  width: horizontalScale(400),
  height: verticalScale(80),
  position: 'absolute',
  top: 0,
  transform: [{rotate: '180deg'}],
};
const ICON_VIEW: ViewStyle = {
  alignItems: 'flex-end',
  width: '100%',
};
const ICON_TITLE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: verticalScale(-10),
};
const IMAGE: ImageStyle = {
  width: 40,
  height: 40,
};
const TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 20,
  color: color.dark1,
  textAlign: 'center',
  marginTop: 10,
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 14,
  color: color.dark3,
  textAlign: 'center',
  marginTop: 12,
};
const NEXT_SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 14,
  color: color.dark3,
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
  width: isTablet() ? horizontalScale(100) : horizontalScale(200),
  height: isTablet() ? 50 : 46,
  marginTop: 20,
};
const TEXT_MODAL_LOGIN: TextStyle = {
  textAlign: 'center',
  fontSize: isTablet() ? moderateScale(12) : moderateScale(14),
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
};
const BUTTON_COMMON: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: 46,
  marginTop: 20,
  width: horizontalScale(135),
};
const INPUT: any = {
  backgroundColor: color.gray4,
  paddingHorizontal: 20,
  width: '100%',
  marginTop: verticalScale(10),
  fontSize: isTablet() ? moderateScale(9) : moderateScale(12),
};
const TEXT_ERROR: TextStyle = {
  fontWeight: '400',
  color: color.red,
  fontFamily: typography.promptRegular,
  marginTop: 5,
};
