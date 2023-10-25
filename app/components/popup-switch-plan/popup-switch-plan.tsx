import React, {FC} from 'react';
import {View, ViewStyle, TextStyle, Text as RNText} from 'react-native';
import Modal from 'react-native-modal';
//
import {PopupSwitchPlanProps} from './popup-switch-plan.props';
import {ButtonLinearGradient, ButtonBorder} from '@app/components';

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

export const PopupSwitchPlan: FC<PopupSwitchPlanProps> = ({
  isVisible,
  title,
  titleStyle,
  money,
  moneyStyle,
  subtitle,
  subtitleStyle,
  description,
  descriptionStyle,
  nextDescription,
  nextDescriptionStyle,
  dateExpired,
  dateExpiredStyle,
  discount,
  discountStyle,
  nextDiscountText,
  nextDiscountStyle,
  switchToText,
  cancelText,
  onConfirm,
  onClose,
}) => {
  const {i18n} = useTranslation();
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
        <RNText style={[TITLE_MODAL, titleStyle]}>
          {title}
          <RNText style={[MONEY_MODAL, moneyStyle]}>{money}</RNText>
        </RNText>

        <View style={BODY}>
          <RNText style={[SUB_TITLE_MODAL, subtitleStyle]}>
            {subtitle}
            <RNText style={[DESCRIPTION_MODAL, descriptionStyle]}>
              {description}
              {i18n.language === 'en' && (
                <RNText style={[DESCRIPTION_MODAL, dateExpiredStyle]}>
                  {dateExpired}
                </RNText>
              )}
              <RNText style={[DESCRIPTION_MODAL, nextDiscountStyle]}>
                {nextDiscountText}
              </RNText>
              <RNText style={[DISCOUNT_MODAL, discountStyle]}>
                {discount}
              </RNText>
              <RNText style={[DESCRIPTION_MODAL, nextDescriptionStyle]}>
                {nextDescription}
              </RNText>
            </RNText>
          </RNText>
        </View>
        <View style={CONTAINER_BUTTON}>
          <ButtonLinearGradient
            text={switchToText}
            style={[
              BUTTON_LOGIN_MODAL_VIEW,
              {
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(35),
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(80)
                    : horizontalScale(100)
                  : horizontalScale(150),
              },
            ]}
            textStyle={TEXT_MODAL_LOGIN}
            onPress={onConfirm}
          />
          <ButtonBorder
            text={cancelText}
            containerStyle={[
              BUTTON_BORDER_CONTAINER,
              {
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(40)
                  : verticalScale(35),
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(80)
                    : horizontalScale(100)
                  : horizontalScale(150),
              },
            ]}
            onPress={onClose}
            textStyle={SWITCH_TEXT}
          />
        </View>
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
const MODAL: ViewStyle = {};

const BODY: ViewStyle = {
  paddingHorizontal: horizontalScale(5),
};
const TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: 27,
  color: color.black1,
  textAlign: 'center',
  marginTop: 10,
  fontWeight: '600',
};
const MONEY_MODAL: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: 27,
  color: color.purple,
  textAlign: 'center',
  fontWeight: '600',
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 14,
  color: color.black1,
  textAlign: 'left',
  fontWeight: '700',
};
const DISCOUNT_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 14,
  color: color.black1,
  textAlign: 'left',
  marginTop: 12,
  fontWeight: '700',
};
const DESCRIPTION_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 14,
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

  marginTop: 20,
  marginStart: 40,
  marginEnd: 40,
  width: isTablet() ? horizontalScale(100) : horizontalScale(150),
};
const TEXT_MODAL_LOGIN: TextStyle = {
  textAlign: 'center',
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
};
const SWITCH_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
};
