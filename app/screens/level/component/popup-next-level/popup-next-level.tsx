/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  ViewStyle,
  Image,
  TextStyle,
  Text as RNText,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
//
import {PopupNextLevelProps} from './popup-next-level.props';
import {ButtonLinearGradient, Text} from '@app/components';
//
import {
  color,
  horizontalScale,
  moderateScale,
  spacing,
  typography,
  verticalScale,
} from '@app/theme';
//
import {isTablet} from 'react-native-device-info';
import {CloseMenu} from '@app/svg';
import {useOrientation} from '@app/hook';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

const CONGRATS = require('@app/components/images/congrats-background.png');
const CONGRATS_LANDSCAPE = require('@app/components/images/congrats-background-landscape.png');
const NEXT_ICON = require('@app/components/images/next-icon.png');

export const PopupNextLevel: FC<PopupNextLevelProps> = ({
  isVisible,
  onConfirm,
  onClose,
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  description,
  descriptionStyle,
  confirmBtTitle,
  isGamePart,
  confirmButtonStyle,
  confirmTextStyle,
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
        {!isGamePart && (
          <TouchableOpacity
            style={[
              CONTENT_CLOSE_MENU,
              {
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? 30
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(50)
                    : horizontalScale(110)
                  : 10,
              },
            ]}
            onPress={onClose}>
            <CloseMenu />
          </TouchableOpacity>
        )}

        <Image
          source={
            orientationOpenApp === 'LANDSCAPE' ? CONGRATS_LANDSCAPE : CONGRATS
          }
          style={{
            width: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(250)
                  : horizontalScale(330)
                : horizontalScale(280)
              : horizontalScale(330),
            height: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(800)
                  : verticalScale(700)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(770)
                : verticalScale(560)
              : Platform.OS === 'ios' ? verticalScale(500) : verticalScale(600),
          }}
        />
        <View
          style={[
            CONTENT,
            {
              top: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(550)
                    : verticalScale(450)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(500)
                  : verticalScale(350)
                : verticalScale(320),
            },
          ]}>
          <RNText style={[TITLE_TEXT, titleStyle]}>
            {title}
            <RNText style={[SUB_TITLE_TEXT, subtitleStyle]}>{subtitle}</RNText>
          </RNText>
          <Text
            style={[
              DESCRIPTION_TEXT,
              descriptionStyle,
              // {
              //   width: isTablet()
              //     ? orientation === 'PORTRAIT'
              //       ? '100%'
              //       : '50%'
              //     : '100%',
              // },
            ]}
            text={description}
          />
          <View style={CONTAINER_BUTTON}>
            <ButtonLinearGradient
              text={confirmBtTitle}
              style={[
                BUTTON_NEXT_VIEW,
                {
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(45)
                    : verticalScale(40),
                },
                confirmButtonStyle,
              ]}
              textStyle={[NEXT_TEXT, confirmTextStyle]}
              onPress={onConfirm}
              isIcon
              image={NEXT_ICON}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const MODAL: ViewStyle = {
  margin: spacing.section,
};
const CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(25),
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(20),
  color: color.primary,
  textAlign: 'center',
  fontWeight: '400',
};
const SUB_TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: isTablet() ? moderateScale(30) : moderateScale(27),
  color: color.primary,
  textAlign: 'center',
  fontWeight: '700',
  marginTop: isTablet() ? verticalScale(20) : 0,
};
const DESCRIPTION_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  color: color.gray3,
  textAlign: 'center',
  fontWeight: '400',
  marginTop: isTablet() ? verticalScale(20) : 0,
};
const CONTAINER_BUTTON: ViewStyle = {
  marginTop: isTablet() ? verticalScale(10) : 0,
};
const BUTTON_NEXT_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: moderateScale(60),
  width: horizontalScale(190),

  marginTop: verticalScale(20),
  marginBottom: verticalScale(25),
  flexDirection: 'row',
};
const NEXT_TEXT: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontSize: isTablet() ? moderateScale(13) : moderateScale(14),
  paddingHorizontal: horizontalScale(10),
};
const CONTENT: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: isTablet() ? verticalScale(40) : verticalScale(20),
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
};
const CONTENT_CLOSE_MENU: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  top: 10,
  alignItems: 'center',
  zIndex: 2,
};
