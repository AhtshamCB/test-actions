import React, {FC} from 'react';
import {View, ViewStyle, Text as RNText, TextStyle} from 'react-native';
import Modal from 'react-native-modal';
//
import {PopupConfirmProps} from './popup-confirm.props';
import {Text, ButtonLinearGradient, ButtonBorder} from '@app/components';

import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

export const PopupConfirm: FC<PopupConfirmProps> = ({
  isVisible,
  containerStyle,
  title,
  subtitle,
  description,
  subtitleStyle,
  titleStyle,
  descriptionStyle,
  onConfirm,
  onClose,
}) => {
  const {t, i18n} = useTranslation();
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
        <RNText style={[TITLE_MODAL, titleStyle]}>
          {title}{' '}
          <RNText style={[SUBTITLE_MODAL, subtitleStyle]}>{subtitle}</RNText>
        </RNText>
        {description && (
          <Text
            style={[DESCRIPTION_MODAL, descriptionStyle]}
            text={description}
          />
        )}
        <View style={CONTAINER_BUTTON}>
          <ButtonLinearGradient
            text={`${t('yes')}`}
            style={[
              BUTTON_LOGIN_MODAL_VIEW,
              {
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(35),
              },
            ]}
            textStyle={[
              TEXT_MODAL_LOGIN,
              {
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(10)
                    : moderateScale(12)
                  : moderateScale(13),
              },
            ]}
            onPress={onConfirm}
          />
          <ButtonBorder
            text={`${t('no_thanks')}`}
            onPress={onClose}
            textStyle={[
              TEXT_MODAL_LOGIN,
              {
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(10)
                    : moderateScale(12)
                  : moderateScale(13),
              },
            ]}
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
                  : i18n.language === 'en'
                  ? horizontalScale(120)
                  : horizontalScale(150),
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
};
const MODAL: ViewStyle = {
  // margin: 40,
};
const TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 20,
  color: color.black1,
  textAlign: 'center',
  marginTop: 10,
};
const SUBTITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 16,
  color: color.black1,
  textAlign: 'center',
  marginTop: 10,
};
const DESCRIPTION_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 16,
  color: color.black1,
  textAlign: 'center',
  marginTop: 10,
};
const CONTAINER_BUTTON: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
};
const BUTTON_LOGIN_MODAL_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  paddingHorizontal: isTablet() ? 100 : 60,
  marginTop: 20,
};
const TEXT_MODAL_LOGIN: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptRegular,

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
