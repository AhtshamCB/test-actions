/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  ImageStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  ButtonLinearGradient,
  Text,
  Header,
  ContactPopupConfirm,
} from '@app/components';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {useTranslation} from 'react-i18next';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {HintIcon, RightSideSVG} from '@app/svg';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {capitalizeWords} from '@app/utils/general';
import {isTablet} from 'react-native-device-info';
import {
  isIPhone8PlusOrBelow,
  useGetStatusMembership,
  useSchool,
} from '@app/hook';
import {goBack} from '@app/navigators';
import {SCHOOL_ACCESS_STATUS} from '@app/utils/contants';
import Tooltip from 'react-native-walkthrough-tooltip';

const NEXT_ICON = require('@app/components/images/next-icon.png');

export function PrivatePlanSchool({isFromTabbar}) {
  const {t} = useTranslation();
  const {orientationOpenApp} = useSelector(selector.config);

  useEffect(() => {
    getEducatorSubscriptionPlans();
  }, []);
  const [toolTipVisible, setToolTipVisible] = useState<number>();
  const {renderAccessStatusSchool} = useGetStatusMembership(null);

  const {
    getEducatorSubscriptionPlans,
    isLoading,
    dataEducatorSubscriptionPlans,
  } = useSchool();

  const {userInfo} = useSelector(selector.user);
  const [
    isVisibleContactTeeFiNotVerified,
    setIsVisibleContactTeeFiNotVerified,
  ] = useState<boolean>(false);
  const [isVisibleContactTeeFiFullAccess, setIsVisibleContactTeeFiFullAccess] =
    useState<boolean>(false);
  const [isVisibleContactTeeFiExpired, setIsVisibleContactTeeFiExpired] =
    useState<boolean>(false);

  if (isLoading) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }
  return (
    <View style={CONTAINER_VIEW}>
      {isFromTabbar !== undefined && (
        <Header title={`${t('membership')}`} onBackPress={() => goBack()} />
      )}

      <View
        style={[
          CONTAINER,
          {
            marginTop:
              isFromTabbar !== undefined
                ? 20
                : Platform.OS === 'ios'
                ? isIPhone8PlusOrBelow()
                  ? verticalScale(-20)
                  : 0
                : verticalScale(-20),
          },
        ]}>
        <View style={BODY}>
          {dataEducatorSubscriptionPlans?.educatorSubscriptionPlans?.map(
            (item, index) => (
              <View
                key={index}
                style={[
                  TABLE_VIEW,
                  ELEVATION,
                  {
                    height: isIPhone8PlusOrBelow()
                      ? !item?.isBestValue
                        ? verticalScale(280)
                        : verticalScale(310)
                      : Platform.OS === 'ios'
                      ? verticalScale(280)
                      : verticalScale(300),
                  },
                ]}>
                {item.isBestValue && (
                  <View
                    style={{
                      position: 'absolute',
                      flexDirection: 'row',
                      zIndex: 100,
                      left: 0,
                    }}>
                    <View style={SVG_VIEW}>
                      <Text
                        text={`${t('BEST-VALUE')}`}
                        style={BEST_VALUE_TEXT}
                      />
                    </View>
                    <RightSideSVG />
                  </View>
                )}
                <LinearGradientText
                  colors={['#DB14FB', '#FFC700']}
                  text={capitalizeWords(item?.name)}
                  start={{x: 0.0, y: 0.9}}
                  textStyle={{
                    fontSize: moderateScale(36),
                    fontFamily: typography.promptBold,
                    fontWeight: '700',
                    color: color.black1,
                    marginTop: isIPhone8PlusOrBelow()
                      ? !item.isBestValue
                        ? verticalScale(10)
                        : verticalScale(40)
                      : verticalScale(40),
                    textAlign: 'center',
                  }}
                />
                <View style={DIRECTION_VIEW}>
                  <Text
                    text={`${item?.price}`}
                    style={[
                      PRICE_TITLE,
                      {
                        fontSize:
                          Platform.OS === 'ios'
                            ? userInfo?.me?.role === 'school'
                              ? moderateScale(35)
                              : moderateScale(45)
                            : moderateScale(45),
                      },
                    ]}
                  />

                  <Text
                    text={`/${t('mo')}/${t('student')}`}
                    style={[
                      COMMON_TITLE,
                      {
                        marginTop:
                          Platform.OS === 'android'
                            ? 15
                            : isIPhone8PlusOrBelow()
                            ? verticalScale(20)
                            : verticalScale(14),
                        fontSize: isIPhone8PlusOrBelow()
                          ? moderateScale(16)
                          : moderateScale(22),
                        fontFamily: typography.promptRegular,
                        fontWeight: '400',
                      },
                    ]}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text text={item?.billInfo} style={PER_TITLE} />
                  {item?.discount && (
                    <Text text={` (${item?.discount})`} style={SALE_OFF_TEXT} />
                  )}

                  <Tooltip
                    contentStyle={{height: 'auto', width: 'auto'}}
                    isVisible={toolTipVisible === index}
                    content={
                      <Text
                        style={[
                          TEXT_TOOLTIP,
                          {
                            fontSize:
                              orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(8)
                                : moderateScale(10),
                          },
                        ]}>
                        <Text> {`${t('subscription_tooltip')} `} </Text>
                      </Text>
                    }
                    placement="bottom"
                    onClose={() => setToolTipVisible(null)}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: horizontalScale(10),
                      }}
                      onPress={() => setToolTipVisible(index)}>
                      <HintIcon width={15} height={15} fill={color.gray3} />
                    </TouchableOpacity>
                  </Tooltip>
                </View>

                <ButtonLinearGradient
                  text={renderAccessStatusSchool()}
                  style={BUTTON_LOGIN_VIEW}
                  textStyle={TEXT_CONFIRM}
                  onPress={() => {
                    if (
                      userInfo?.me?.school?.accessStatus ===
                      SCHOOL_ACCESS_STATUS.FULL_ACCESS
                    ) {
                      setIsVisibleContactTeeFiFullAccess(true);
                    } else if (
                      userInfo?.me?.school?.accessStatus ===
                      SCHOOL_ACCESS_STATUS.NOT_ACTIVATED
                    ) {
                      setIsVisibleContactTeeFiNotVerified(true);
                    } else if (
                      userInfo?.me?.school?.accessStatus ===
                      SCHOOL_ACCESS_STATUS.EXPIRED
                    ) {
                      setIsVisibleContactTeeFiExpired(true);
                    }
                  }}
                  isIcon
                  image={NEXT_ICON}
                  imageStyle={NEXT_IMAGE_STYLE}
                />
              </View>
            ),
          )}
        </View>
        <ContactPopupConfirm
          isVisible={isVisibleContactTeeFiFullAccess}
          backgroundStyle={{
            height: isIPhone8PlusOrBelow()
              ? verticalScale(90)
              : verticalScale(80),
          }}
          title="TeeFi Contact"
          subtitle="Our support:"
          onClose={() => setIsVisibleContactTeeFiFullAccess(false)}
        />
        <ContactPopupConfirm
          isVisible={isVisibleContactTeeFiNotVerified}
          backgroundStyle={{
            height: isIPhone8PlusOrBelow()
              ? verticalScale(150)
              : verticalScale(130),
          }}
          title="Your Account Has Not Activited By TeeFi!"
          titleStyle={{
            fontSize: moderateScale(21),
          }}
          subtitle="We Are Processing And Will Inform You Via Email"
          subtitleStyle={{fontSize: moderateScale(12)}}
          description="Our support:"
          descriptionStyle={{marginTop: verticalScale(20)}}
          onClose={() => setIsVisibleContactTeeFiNotVerified(false)}
        />
        <ContactPopupConfirm
          isVisible={isVisibleContactTeeFiExpired}
          backgroundStyle={{
            height: isIPhone8PlusOrBelow()
              ? verticalScale(110)
              : verticalScale(100),
          }}
          title="Your Account Has Expired!"
          titleStyle={{
            fontSize: moderateScale(21),
          }}
          subtitle="Please Contact School For Subscription Renewal"
          subtitleStyle={{fontSize: moderateScale(12)}}
          description="Our support:"
          descriptionStyle={{marginTop: verticalScale(20)}}
          onClose={() => setIsVisibleContactTeeFiExpired(false)}
        />
      </View>
    </View>
  );
}

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  padding: 15,
  backgroundColor: color.gray4,
};
const PRICE_TITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '500',

  color: color.dark1,
  textAlign: 'center',
};
const COMMON_TITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '500',
  fontSize: 26,
  color: color.dark1,
  textAlignVertical: 'center',
  marginTop: Platform.OS === 'android' ? 15 : isIPhone8PlusOrBelow() ? 35 : 23,
};
const PER_TITLE: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(14),
  color: color.dark1,
  textAlign: 'center',
};
const SALE_OFF_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(14),
  color: color.purple,
  textAlignVertical: 'center',
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: verticalScale(50),
  marginStart: horizontalScale(50),
  marginEnd: horizontalScale(50),
  flexDirection: 'row',
  marginTop: verticalScale(20),
};
const NEXT_IMAGE_STYLE: ImageStyle = {
  marginStart: 10,
  // tintColor: color.gray3,
};
const TEXT_CONFIRM: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: isTablet() ? moderateScale(16) : moderateScale(14),
};
const BODY: ViewStyle = {
  marginTop: verticalScale(5),
};
const TABLE_VIEW: ViewStyle = {
  backgroundColor: 'white',
  borderRadius: 8,
  width: '100%',
  marginVertical: 10,
  height: verticalScale(340),
};
const ELEVATION: ViewStyle = {
  shadowColor: '#52006A',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 20,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const BEST_VALUE_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: '700',
  color: color.white,
  fontFamily: typography.promptBold,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
};
const SVG_VIEW: ViewStyle = {
  backgroundColor: color.primary,
  width: 160,
  height: 44,
  alignItems: 'center',
  justifyContent: 'center',
};

const TEXT_TOOLTIP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray1,
  textAlign: 'left',
};
