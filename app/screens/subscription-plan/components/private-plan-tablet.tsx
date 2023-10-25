/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Header, Text} from '@app/components';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {useTranslation} from 'react-i18next';
//
import {useOrientation, usePrivatePlan} from '@app/hook';
import {capitalizeWords} from '@app/utils/general';
import {DidYouKnow, HintIcon, RightSideSVG} from '@app/svg';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import Tooltip from 'react-native-walkthrough-tooltip';

export function PrivatePlanTablet({navigation, isFromTabbar}) {
  const {t, i18n} = useTranslation();
  const orientation = useOrientation();

  const {orientationOpenApp} = useSelector(selector.config);
  const {getPrivatePlan, dataPrivatePlan, loadingGetPrivatePlan} =
    usePrivatePlan();
  const {userInfo} = useSelector(selector.user);
  const [toolTipVisible, setToolTipVisible] = useState<number>();

  useEffect(() => {
    getPrivatePlan();
  }, []);

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
          style={{backgroundColor: color.white}}
        />
      )}

      <View
        style={[CONTAINER, {marginTop: isFromTabbar === undefined ? -20 : 20}]}>
        <View
          style={[
            BODY,
            {
              marginTop:
                orientation === 'PORTRAIT'
                  ? verticalScale(20)
                  : verticalScale(30),
            },
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {dataPrivatePlan?.privatePlan?.commitmentLevel?.map(
              (item, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      TABLE_VIEW,
                      ELEVATION,
                      {
                        width:
                          orientation === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(133)
                              : horizontalScale(175)
                            : orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(180)
                            : horizontalScale(235),
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(250)
                            : verticalScale(260),
                      },
                    ]}>
                    {item?.isBestValue && (
                      <View
                        style={{
                          position: 'absolute',
                          flexDirection: 'row',
                          zIndex: 100,
                          right:
                            orientation === 'PORTRAIT'
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? horizontalScale(68)
                                : horizontalScale(87)
                              : orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(115)
                              : horizontalScale(148),
                          top:
                            orientationOpenApp === 'LANDSCAPE'
                              ? verticalScale(-20)
                              : verticalScale(-15),
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
                        fontSize:
                          i18n.language === 'en'
                            ? moderateScale(28)
                            : moderateScale(26),
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.black1,
                        marginTop: item?.isBestValue
                          ? verticalScale(22)
                          : verticalScale(20),
                      }}
                    />
                    <View style={DIRECTION_VIEW}>
                      <Text
                        text={`${item?.price}`}
                        style={[
                          PRICE_TITLE,
                          {
                            fontSize:
                              orientation === 'PORTRAIT'
                                ? orientationOpenApp === 'LANDSCAPE'
                                  ? userInfo?.me?.role === 'school'
                                    ? moderateScale(26)
                                    : moderateScale(29)
                                  : userInfo?.me?.role === 'school'
                                  ? moderateScale(32)
                                  : moderateScale(36)
                                : userInfo?.me?.role === 'school'
                                ? orientation === 'LANDSCAPE'
                                  ? moderateScale(36)
                                  : moderateScale(32)
                                : moderateScale(36),
                          },
                        ]}
                      />
                      {userInfo?.me?.role === 'school' ? (
                        <Text
                          text={`/${t('mon')}/${t('student')}`}
                          style={[
                            COMMON_TITLE,
                            {
                              marginTop:
                                orientation === 'PORTRAIT'
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? verticalScale(45)
                                    : userInfo?.me?.role === 'school'
                                    ? verticalScale(42)
                                    : verticalScale(45)
                                  : orientationOpenApp === 'LANDSCAPE'
                                  ? userInfo?.me?.role === 'school'
                                    ? verticalScale(60)
                                    : verticalScale(45)
                                  : userInfo?.me?.role === 'school'
                                  ? verticalScale(46)
                                  : verticalScale(45),
                              fontSize:
                                orientation === 'PORTRAIT'
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? userInfo?.me?.role === 'school'
                                      ? moderateScale(15)
                                      : moderateScale(18)
                                    : moderateScale(18)
                                  : orientationOpenApp === 'LANDSCAPE'
                                  ? userInfo?.me?.role === 'school'
                                    ? moderateScale(18)
                                    : moderateScale(18)
                                  : moderateScale(18),
                            },
                          ]}
                        />
                      ) : (
                        <Text
                          // text={`/${t('month')}`}
                          text={item.interval ? `/${t('month')}` : ''}
                          style={[
                            COMMON_TITLE,
                            {
                              marginTop:
                                orientation === 'PORTRAIT'
                                  ? verticalScale(45)
                                  : orientationOpenApp === 'LANDSCAPE'
                                  ? verticalScale(60)
                                  : verticalScale(45),
                            },
                          ]}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        text={item?.billInfo}
                        style={[
                          PER_TITLE,
                          {
                            fontSize:
                              i18n.language === 'en'
                                ? moderateScale(10)
                                : moderateScale(9),
                          },
                        ]}
                      />
                      {item?.discount && (
                        <Text
                          text={` (${item?.discount})`}
                          style={[
                            SALE_OFF_TEXT,
                            {
                              fontSize:
                                i18n.language === 'en'
                                  ? moderateScale(10)
                                  : moderateScale(9),
                            },
                          ]}
                        />
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
                          <HintIcon width={20} height={20} fill={color.gray3} />
                        </TouchableOpacity>
                      </Tooltip>
                    </View>
                  </View>
                );
              },
            )}
          </View>
        </View>
        <View
          style={[
            IMAGE_FOOTER_VIEW,
            {
              marginBottom:
                orientation === 'PORTRAIT'
                  ? verticalScale(250)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(20)
                  : verticalScale(50),
            },
          ]}>
          <View style={IMAGE_FOOTER_VIEW_CONTENT}>
            <View style={IMAGE_DIRECTION}>
              <View style={IMAGE_FOOTER_VIEW_COTENT_BODY}>
                <DidYouKnow />
                <Text
                  text={`${t('did_you_know')}`}
                  style={[
                    DID_YOU_KNOW_TEXT,
                    {
                      width: horizontalScale(30),
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(235)
                        : horizontalScale(310)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(325)
                      : horizontalScale(430),
                  height:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(70)
                        : verticalScale(45)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(45),
                  backgroundColor: color.purple1,
                  justifyContent: 'center',
                  right: horizontalScale(5),
                }}>
                <Text
                  text={`${t('did_you_know_content')}`}
                  style={[
                    DID_YOU_KNOW_CONTENT_TEXT,
                    {
                      width:
                        orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(220)
                            : horizontalScale(280)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(320)
                          : horizontalScale(430),
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
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
  marginTop: 20,
};
const PRICE_TITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '500',
  marginTop: verticalScale(22),
  color: color.dark1,
};
const COMMON_TITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '500',
  fontSize: moderateScale(18),
  color: color.dark1,
  textAlignVertical: 'center',
  marginTop: verticalScale(45),
};
const PER_TITLE: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
};
const SALE_OFF_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.purple,
};
const BODY: ViewStyle = {
  flex: 1,
  marginBottom: verticalScale(35),
};
const TABLE_VIEW: ViewStyle = {
  backgroundColor: color.white,
  borderRadius: 8,
  marginVertical: 10,
  alignItems: 'center',
  marginTop: 30,
};
const ELEVATION: ViewStyle = {
  shadowColor: '#52006A',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 4,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(-30),
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const IMAGE_FOOTER_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
};
const SVG_VIEW: ViewStyle = {
  backgroundColor: color.primary,
  width: 160,
  height: 44,
  alignItems: 'center',
  justifyContent: 'center',
};
const BEST_VALUE_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: '700',
  color: color.white,
  fontFamily: typography.promptBold,
};
const DID_YOU_KNOW_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '600',
  fontSize: moderateScale(8),
  flex: 1,
  textAlign: 'center',
};
const DID_YOU_KNOW_CONTENT_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  textAlign: 'left',
  fontSize: moderateScale(8),
  color: color.purple,
  marginLeft: horizontalScale(10),
};
const IMAGE_FOOTER_VIEW_CONTENT: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 10000,
  backgroundColor: color.purple,
};
const IMAGE_DIRECTION: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
const IMAGE_FOOTER_VIEW_COTENT_BODY: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 10000,
  backgroundColor: color.purple1,
  marginLeft: horizontalScale(5),
  justifyContent: 'center',
  alignItems: 'center',
};

const TEXT_TOOLTIP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray1,
  textAlign: 'left',
};
