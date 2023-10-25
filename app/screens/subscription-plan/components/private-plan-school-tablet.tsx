/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import {
  ButtonLinearGradient,
  Header,
  Text,
  ContactPopupConfirm,
} from '@app/components';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {useTranslation} from 'react-i18next';
//
import {useGetStatusMembership, useOrientation, useSchool} from '@app/hook';
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
import {goBack} from '@app/navigators';
import {SCHOOL_ACCESS_STATUS} from '@app/utils/contants';
import Tooltip from 'react-native-walkthrough-tooltip';

const NEXT_ICON = require('@app/components/images/next-icon.png');

export function PrivatePlanSchoolTablet({isFromTabbar}) {
  const {t} = useTranslation();
  const orientation = useOrientation();
  const [toolTipVisible, setToolTipVisible] = useState<number>();

  useEffect(() => {
    getEducatorSubscriptionPlans();
  }, []);

  const {renderAccessStatusSchool} = useGetStatusMembership(null);

  const {
    getEducatorSubscriptionPlans,
    isLoading,
    dataEducatorSubscriptionPlans,
  } = useSchool();

  const {userInfo} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);
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
            {dataEducatorSubscriptionPlans?.educatorSubscriptionPlans?.map(
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
                            ? orientation === 'PORTRAIT'
                              ? verticalScale(340)
                              : verticalScale(360)
                            : verticalScale(260),
                      },
                    ]}>
                    {item?.isBestValue && (
                      <View
                        style={{
                          position: 'absolute',
                          flexDirection: 'row',
                          zIndex: 100,
                          alignSelf: 'flex-start',
                          top:
                            orientationOpenApp === 'LANDSCAPE'
                              ? verticalScale(-20)
                              : verticalScale(-15),
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
                        fontSize: moderateScale(26),
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
                                  ? moderateScale(24)
                                  : moderateScale(30)
                                : orientation === 'LANDSCAPE'
                                ? moderateScale(32)
                                : moderateScale(32),
                          },
                        ]}
                      />

                      <Text
                        text={`/${t('mo')}/${t('student')}`}
                        style={[
                          COMMON_TITLE,
                          {
                            marginTop:
                              orientation === 'PORTRAIT'
                                ? orientationOpenApp === 'LANDSCAPE'
                                  ? verticalScale(45)
                                  : verticalScale(39)
                                : orientationOpenApp === 'LANDSCAPE'
                                ? verticalScale(55)
                                : verticalScale(40),
                            fontSize:
                              orientation === 'PORTRAIT'
                                ? orientationOpenApp === 'LANDSCAPE'
                                  ? moderateScale(13)
                                  : moderateScale(16)
                                : orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(16)
                                : moderateScale(18),
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
                      <Text
                        text={item?.billInfo}
                        style={[
                          PER_TITLE,
                          {
                            fontSize:
                              orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(8)
                                : moderateScale(10),
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
                                orientationOpenApp === 'LANDSCAPE'
                                  ? moderateScale(8)
                                  : moderateScale(10),
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

                    <ButtonLinearGradient
                      text={renderAccessStatusSchool()}
                      style={[
                        BUTTON_LOGIN_VIEW,
                        {
                          width:
                            orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(120)
                              : horizontalScale(130),
                          height:
                            orientationOpenApp === 'LANDSCAPE'
                              ? verticalScale(60)
                              : verticalScale(40),
                        },
                      ]}
                      textStyle={[
                        TEXT_CONFIRM,
                        {
                          fontSize:
                            orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(9)
                              : moderateScale(10),
                        },
                      ]}
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
        <ContactPopupConfirm
          isVisible={isVisibleContactTeeFiFullAccess}
          backgroundStyle={{
            height:
              orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(120)
                  : verticalScale(80)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(120)
                : verticalScale(80),
          }}
          title="TeeFi Contact"
          subtitle="Our support:"
          onClose={() => setIsVisibleContactTeeFiFullAccess(false)}
        />
        <ContactPopupConfirm
          isVisible={isVisibleContactTeeFiNotVerified}
          backgroundStyle={{
            height:
              orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(200)
                  : verticalScale(150)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(150)
                : verticalScale(110),
          }}
          title="Your Account Has Not Activited By TeeFi!"
          titleStyle={{
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(18)
                : moderateScale(21),
          }}
          subtitle="We Are Processing And Will Inform You Via Email"
          subtitleStyle={{
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(10)
                : moderateScale(12),
          }}
          description="Our support:"
          descriptionStyle={{marginTop: verticalScale(20)}}
          onClose={() => setIsVisibleContactTeeFiNotVerified(false)}
        />
        <ContactPopupConfirm
          isVisible={isVisibleContactTeeFiExpired}
          backgroundStyle={{
            height:
              orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(140)
                : verticalScale(100),
          }}
          title="Your Account Has Expired!"
          titleStyle={{
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(18)
                : moderateScale(21),
          }}
          subtitle="Please Contact School For Subscription Renewal"
          subtitleStyle={{
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(10)
                : moderateScale(12),
          }}
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

  color: color.gray3,
};
const SALE_OFF_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(10),
  color: color.purple,
  textAlignVertical: 'center',
};
const TEXT_CONFIRM: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontFamily: typography.promptBold,
  fontWeight: '700',
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
  // padding: 25,
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
const NEXT_IMAGE_STYLE: ImageStyle = {
  marginStart: 10,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,

  marginStart: 100,
  marginEnd: 100,
  flexDirection: 'row',
  marginTop: verticalScale(20),
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
  color: color.black1,
  textAlign: 'left',
};
