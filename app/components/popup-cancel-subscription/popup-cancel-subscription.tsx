import React, {FC} from 'react';
import {View, ViewStyle, TextStyle, Text as RNText} from 'react-native';
import Modal from 'react-native-modal';
//
import {PopupCancelSubscriptionProps} from './popup-cancel-subscription.props';
import {Text, ButtonLinearGradient, ButtonBorder} from '@app/components';

import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {isTablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import FastImage from 'react-native-fast-image';
import {useOrientation} from '@app/hook';

const BACKGROUND = require('@app/components/images/background-alert.png');

export const PopupCancelSubscription: FC<PopupCancelSubscriptionProps> = ({
  isVisible,
  title,
  titleStyle,
  name,
  subtitle,
  subtitleStyle,
  description,
  descriptionStyle,
  nextDescription,
  nextDescriptionStyle,
  onConfirm,
  onClose,
  backgroundStyle,
  nameStyle,
}) => {
  const {t} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);
  const orientation = useOrientation();

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
        <FastImage
          source={BACKGROUND}
          style={[IMAGE_BACKGROUND_VIEW, backgroundStyle]}
          resizeMode={'stretch'}
        />
        <LinearGradientText
          colors={['#DB14FB', '#FFC700']}
          text={`${name}`}
          start={{x: 0.0, y: 0.9}}
          textStyle={[LINEAR_TEXT, nameStyle]}
        />
        <Text style={[TITLE_MODAL, titleStyle]} text={title} />

        <View style={[BODY]}>
          <RNText style={[SUB_TITLE_MODAL, subtitleStyle]}>
            {subtitle}
            <RNText style={[DESCRIPTION_MODAL, descriptionStyle]}>
              {description}
              <RNText style={[NEXT_DESCRIPTION_MODAL, nextDescriptionStyle]}>
                {nextDescription}
              </RNText>
            </RNText>
          </RNText>
        </View>

        <View style={CONTAINER_BUTTON}>
          <ButtonBorder
            text={`${t('cancel_my_subscriptions')}`}
            containerStyle={[
              BUTTON_BORDER_CONTAINER,
              {
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(40),
                width: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(80)
                      : horizontalScale(100)
                    : horizontalScale(100)
                  : horizontalScale(180),
              },
            ]}
            onPress={onConfirm}
            textStyle={[
              TEXT_MODAL_CANCEL_SUBSCRIPTIONS,
              {
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(8)
                    : moderateScale(10)
                  : moderateScale(13),
              },
            ]}
          />
          <ButtonLinearGradient
            text={`${t('no_thanks')}`}
            style={[
              BUTTON_LOGIN_MODAL_VIEW,
              {
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(40),
                width: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(80)
                      : horizontalScale(100)
                    : horizontalScale(100)
                  : horizontalScale(180),
              },
            ]}
            textStyle={[
              TEXT_MODAL_LOGIN,
              {
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(8)
                    : moderateScale(10)
                  : moderateScale(14),
              },
            ]}
            onPress={onClose}
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
const BODY: ViewStyle = {
  padding: 10,
};
const TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptLight,
  fontSize: isTablet() ? moderateScale(14) : moderateScale(15.5),
  color: color.dark1,
  textAlign: 'center',
  marginTop: isTablet() ? -8 : 10,
  paddingHorizontal: 15,
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
  color: color.black1,
  textAlign: 'left',
  marginTop: 12,
  fontWeight: '700',
};
const DESCRIPTION_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
  color: color.black1,
  textAlign: 'left',
  marginTop: 12,
  fontWeight: '400',
};
const NEXT_DESCRIPTION_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
  color: color.black1,
  textAlign: 'left',
  marginTop: 12,
  fontWeight: '400',
};
const CONTAINER_BUTTON: ViewStyle = {
  width: '100%',
  flexDirection: isTablet() ? 'row' : 'column',
  justifyContent: 'center',
  alignItems: 'center',
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
  height: isTablet() ? verticalScale(40) : verticalScale(50),
  width: isTablet() ? horizontalScale(100) : horizontalScale(180),
  marginTop: 20,
  marginStart: 40,
  marginEnd: 40,
};
const TEXT_MODAL_LOGIN: TextStyle = {
  fontSize: isTablet() ? moderateScale(10.5) : moderateScale(14),
  textAlign: 'center',
};
const TEXT_MODAL_CANCEL_SUBSCRIPTIONS: TextStyle = {
  textAlign: 'center',
};
const LINEAR_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(40) : moderateScale(36),
  fontFamily: typography.promptBold,
  fontWeight: '700',
  textAlign: 'center',
};
