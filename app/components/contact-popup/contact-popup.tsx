import React, {FC} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
//
import {ContactPopupProps} from './contact-popup.props';
import {Text, ButtonBorder} from '@app/components';

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
import {ContactPhoneIcon, MailIcon} from '@app/svg';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import FastImage from 'react-native-fast-image';

const BACKGROUND = require('@app/components/images/background-alert.png');

export const ContactPopupConfirm: FC<ContactPopupProps> = ({
  isVisible,
  containerStyle,
  backgroundStyle,
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  description,
  descriptionStyle,
  onClose,
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
        {subtitle ? (
          <Text style={[SUBTITLE_MODAL, subtitleStyle]} text={subtitle} />
        ) : null}
        {description ? (
          <Text
            style={[DESCRIPTION_MODAL, descriptionStyle]}
            text={description}
          />
        ) : null}
        <TouchableOpacity
          style={CONTAINER_BUTTON_VIEW}
          onPress={() => {
            Linking.openURL(`tel:${+84915514778}`);
          }}>
          <ContactPhoneIcon />
          <Text text={'+84915514778'} style={TEXT_COMMON} />
        </TouchableOpacity>

        <TouchableOpacity
          style={CONTAINER_BUTTON_VIEW}
          onPress={() => {
            Linking.openURL('mailto:help@teefi.io');
          }}>
          <MailIcon />
          <Text text={'help@teefi.io'} style={TEXT_COMMON} />
        </TouchableOpacity>

        <View style={CONTAINER_BUTTON}>
          <ButtonBorder
            text={'Close'}
            onPress={onClose}
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
                    ? horizontalScale(90)
                    : horizontalScale(120)
                  : horizontalScale(80),
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
const SUBTITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(14) : moderateScale(16),
  color: color.black1,
  textAlign: 'center',
};
const DESCRIPTION_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(14) : moderateScale(16),
  color: color.black1,
  textAlign: 'center',
};
const TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(12) : moderateScale(14),
  color: color.purple,
  textAlign: 'center',
  fontWeight: '400',
  paddingHorizontal: horizontalScale(10),
};
const CONTAINER_BUTTON_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 5,
  marginTop: verticalScale(5),
};
const CONTAINER_BUTTON: ViewStyle = {
  justifyContent: 'center',
  alignSelf: 'flex-end',
};
const TEXT_MODAL_LOGIN: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(12) : moderateScale(14),
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
