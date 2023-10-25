/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {isTablet} from 'react-native-device-info';

import {Text, Header, AlertComponent} from '@app/components';
import {selector} from '@app/redux';

import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {HintIcon, RightSideSVG} from '@app/svg';

import {capitalizeWords} from '@app/utils/general';
import {isIPhone8PlusOrBelow, usePrivatePlan} from '@app/hook';
import Tooltip from 'react-native-walkthrough-tooltip';

export function PrivatePlan({navigation, isFromTabbar}) {
  const {t, i18n} = useTranslation();

  useEffect(() => {
    getPrivatePlan();
  }, []);

  const {getPrivatePlan, loadingGetPrivatePlan, dataPrivatePlan} =
    usePrivatePlan();

  const {userInfo} = useSelector(selector.user);
  const {isBetaVersion, endBetaDate, orientationOpenApp} = useSelector(
    selector.config,
  );

  const [isVisiblePaymentPopup, setIsVisiblePaymentPopup] =
    useState<boolean>(false);
  const [toolTipVisible, setToolTipVisible] = useState<number>();

  if (loadingGetPrivatePlan) {
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
        <Header
          title={`${t('membership')}`}
          onBackPress={() => navigation.navigate('parentDrawer')}
        />
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
        {isBetaVersion && (
          <Text
            text={`${t('subscription_activated_after_beta_version', {
              date: `${endBetaDate}`,
            })}`}
            style={[
              DESCRIPTION,
              {
                color: color.purple,
                fontSize: 15,
                fontFamily: typography.promptRegular,
                fontWeight: '400',
              },
            ]}
          />
        )}

        <View style={BODY}>
          {dataPrivatePlan?.privatePlan?.commitmentLevel?.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  TABLE_VIEW,
                  ELEVATION,
                  {
                    height: isIPhone8PlusOrBelow()
                      ? !item?.isBestValue
                        ? verticalScale(200)
                        : verticalScale(220)
                      : Platform.OS === 'ios'
                      ? verticalScale(220)
                      : verticalScale(210),
                  },
                ]}>
                {item?.isBestValue && (
                  <View
                    style={{
                      position: 'absolute',
                      flexDirection: 'row',
                      zIndex: 100,
                      left: 0,
                    }}>
                    <View style={SVG_VIEW}>
                      <Text
                        text={`${t('BEST VALUE')}`}
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
                  {userInfo?.me?.role === 'school' ? (
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
                              : verticalScale(20),
                          fontSize: isIPhone8PlusOrBelow()
                            ? moderateScale(16)
                            : moderateScale(16),
                          fontFamily: typography.promptRegular,
                          fontWeight: '400',
                        },
                      ]}
                    />
                  ) : (
                    <Text
                      // text={`/${t('month')}`}
                      text={item.interval ? `/${t('month')}` : ''}
                      style={COMMON_TITLE}
                    />
                  )}
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
              </View>
            );
          })}
        </View>
        <AlertComponent
          isVisible={isVisiblePaymentPopup}
          backgroundStyle={{height: verticalScale(55)}}
          title={`${t('join_back_teefi')}`}
          titleStyle={[
            TITLE_POPUP,
            {
              fontSize:
                i18n.language === 'en' ? moderateScale(18) : moderateScale(17),
              marginTop: verticalScale(10),
            },
          ]}
          subtitle={`${t('this_app_does_not_support')}`}
          subtitleStyle={SUB_TITLE_MODAL}
          confirmBtTitle={`${t('close')}`}
          confirmButtonStyle={{
            width: horizontalScale(100),
            height: verticalScale(35),
          }}
          containerButtonStyle={CONTAINER_BUTTON_POPUP}
          confirmTextStyle={{
            fontSize: moderateScale(12),
          }}
          onConfirm={() => setIsVisiblePaymentPopup(false)}
          onClose={() => setIsVisiblePaymentPopup(false)}
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
  marginTop: Platform.OS === 'android' ? 15 : isIPhone8PlusOrBelow() ? 23 : 23,
};
const PER_TITLE: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(14),
  color: color.dark1,
  textAlign: 'center',
};

const DESCRIPTION: TextStyle = {
  fontSize: isTablet() ? moderateScale(14) : moderateScale(12),
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
  marginTop: 5,
};
const SALE_OFF_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(14),
  color: color.purple,
  textAlignVertical: 'center',
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
const CONTAINER_BUTTON_POPUP: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  color: color.dark3,
  textAlign: 'center',
  marginTop: verticalScale(20),
  fontSize: moderateScale(12),
};

const TEXT_TOOLTIP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray1,
  textAlign: 'left',
};
