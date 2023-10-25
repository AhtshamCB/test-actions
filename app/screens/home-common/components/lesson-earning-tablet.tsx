/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  Text as RNText,
  Image,
  TextStyle,
} from 'react-native';
import {useOrientation} from '@app/hook';
import {selector} from '@app/redux';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';

import {BackgroundStudy8, BuildMyWorldTabletButton, HintIcon} from '@app/svg';
import {Text} from '@app/components';
import {useSelector} from 'react-redux';
import {amountFormat} from '@app/utils';
import FastImage from 'react-native-fast-image';
import Tooltip from 'react-native-walkthrough-tooltip';

const BACKGROUND_YELLOW_TABLET = require('@app/components/images/background-yellow-tablet.png');
const BACKGROUND_PURPLE_TABLET = require('@app/components/images/background-purple-tablet.png');
const INVESTMENT = require('../images/investment.png');
const SPENDING = require('../images/spending.png');
const SHARING = require('../images/sharing.png');
const BACKGROUND_INVESTMENT_SHARE = require('../images/background-investment-share.png');
const BACKGROUND_SPEND = require('../images/background-spend.png');
const TOTAL_EARNING = require('../images/total-earning.png');
const DAYS_IN_TRAINING = require('../images/days-in-training.png');
const COMPLETED_LESSONS = require('../images/completed-lessons.png');

export const LessonEarningTablet = () => {
  const {summary, earning} = useSelector(selector.dashboard);
  const {orientationOpenApp} = useSelector(selector.config);
  const orientation = useOrientation();

  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [toolTipSaveVisible, setToolTipSaveVisible] = useState<boolean>(false);
  const [toolTipSpendVisible, setToolTipSpendVisible] =
    useState<boolean>(false);
  const [toolTipShareVisible, setToolTipShareVisible] =
    useState<boolean>(false);

  return (
    <View style={CONTAINER}>
      <View style={DIRECTION_COLUMN}>
        <View
          style={[
            BODY_THREE_VIEW,
            {
              width:
                orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(130)
                    : horizontalScale(180)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(180)
                  : horizontalScale(250),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(210)
                  : verticalScale(150),
            },
          ]}>
          <View style={CONTENT_ICON_TEXT}>
            <View style={MONEY_VIEW}>
              <FastImage source={TOTAL_EARNING} style={IMAGE} />
            </View>
            <View style={[TITLE_VIEW]}>
              <Text
                text={'Earnings from lessons'}
                style={[TEXT_TITLE_COMMON, {marginRight: horizontalScale(10)}]}
              />
            </View>
          </View>

          <View style={CONTAINER_SUBTITLE_VIEW}>
            <View style={SUBTITLE_VIEW}>
              <RNText style={TEXT_SUBTITLE_COMMON}>{`${amountFormat(
                summary?.earning || 0,
              )}`}</RNText>
            </View>

            <View style={ALIGN_VIEW}>
              <Image
                source={BACKGROUND_YELLOW_TABLET}
                style={{
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(90)
                      : verticalScale(80),
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            BODY_THREE_VIEW,
            {
              width:
                orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(130)
                    : horizontalScale(180)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(180)
                  : horizontalScale(250),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(210)
                  : verticalScale(150),
            },
          ]}>
          <View style={CONTENT_ICON_TEXT}>
            <View style={MONEY_VIEW}>
              <FastImage source={DAYS_IN_TRAINING} style={IMAGE} />
            </View>
            <View style={[TITLE_VIEW]}>
              <Text
                text={'Days In Training'}
                style={[TEXT_TITLE_COMMON, {marginRight: horizontalScale(10)}]}
              />
            </View>
          </View>

          <View style={CONTAINER_SUBTITLE_VIEW}>
            <View style={SUBTITLE_VIEW}>
              <RNText style={TEXT_SUBTITLE_COMMON}>
                {summary?.dayInTraining || 0}
              </RNText>
            </View>

            <View style={ALIGN_VIEW}>
              <Image
                source={BACKGROUND_PURPLE_TABLET}
                style={{
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(90)
                      : verticalScale(80),
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            BODY_THREE_VIEW,
            {
              width:
                orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(130)
                    : horizontalScale(180)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(180)
                  : horizontalScale(250),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(210)
                  : verticalScale(150),
            },
          ]}>
          <View style={CONTENT_ICON_TEXT}>
            <View style={MONEY_VIEW}>
              <FastImage source={COMPLETED_LESSONS} style={IMAGE} />
            </View>
            <View style={[TITLE_VIEW]}>
              <Text
                text={'Completed Lessons'}
                style={[TEXT_TITLE_COMMON, {marginRight: horizontalScale(10)}]}
              />
            </View>
          </View>

          <View style={CONTAINER_SUBTITLE_VIEW}>
            <View style={SUBTITLE_VIEW}>
              <RNText style={TEXT_SUBTITLE_COMMON}>
                {summary?.completedLessons || 0}
              </RNText>
            </View>

            <View style={ALIGN_VIEW}>
              <Image
                source={BACKGROUND_YELLOW_TABLET}
                style={{
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(90)
                      : verticalScale(80),
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          FOOTER,
          {
            width:
              orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(135)
                  : horizontalScale(175)
                : orientationOpenApp === 'LANDSCAPE'
                ? horizontalScale(180)
                : horizontalScale(220),
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: verticalScale(10),
            marginRight: horizontalScale(10),
          }}>
          <View>
            <Text
              text={'Save &\nInvestment'}
              style={[
                FOOTER_TEXT_COMMON,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(9.5)
                      : moderateScale(11.5),
                  textAlign: 'left',
                },
              ]}
            />
          </View>
          <View
            style={{
              right:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(5)
                  : horizontalScale(8),
            }}>
            <Text
              text={'\nSpend'}
              style={[
                FOOTER_TEXT_COMMON,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(9.5)
                      : moderateScale(11.5),
                  textAlign: 'left',
                },
              ]}
            />
          </View>
          <View
            style={{
              left:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(5)
                  : horizontalScale(0),
            }}>
            <Text
              text={'\nShare'}
              style={[
                FOOTER_TEXT_COMMON,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(9.5)
                      : moderateScale(11.5),
                },
              ]}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: verticalScale(20),
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={INVESTMENT}
              style={EARN_MONEY_VIEW}
              resizeMode="contain"
            />
            <Tooltip
              isVisible={toolTipSaveVisible}
              contentStyle={[TOOL_TIP_CONTENT, {width: horizontalScale(80)}]}
              content={
                <View>
                  <RNText
                    style={{
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
                      color: color.black1,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}>
                    From Lessons:{' '}
                    <RNText
                      style={{
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.black1,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      }}>{`${amountFormat(
                      earning?.investments?.balance || 0,
                    )}`}</RNText>
                  </RNText>
                  <RNText
                    style={{
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
                      color: color.black1,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}>
                    From BMW:{' '}
                    <RNText
                      style={{
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.black1,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      }}>{`${amountFormat(
                      earning?.investments?.gameBalance || 0,
                    )}`}</RNText>
                  </RNText>
                  <RNText
                    style={{
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
                      color: color.black1,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}>
                    Total:{' '}
                    <RNText
                      style={{
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.purple,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      }}>{`${amountFormat(
                      earning?.investments?.balance +
                        earning?.investments?.gameBalance || 0,
                    )}`}</RNText>
                  </RNText>
                </View>
              }
              placement="bottom"
              onClose={() => setToolTipSaveVisible(false)}>
              <TouchableOpacity onPress={() => setToolTipSaveVisible(true)}>
                <ImageBackground
                  source={BACKGROUND_INVESTMENT_SHARE}
                  resizeMode="contain"
                  style={[
                    BACKGROUND_INVESTMENT_SHARE_SPEND,
                    {
                      height:
                        orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(45)
                            : verticalScale(30)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(55)
                          : verticalScale(30),
                    },
                  ]}>
                  <Text
                    text={`${amountFormat(earning?.investments?.balance || 0)}`}
                    style={INVESTMENT_TEXT}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </Tooltip>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={SPENDING}
              style={EARN_MONEY_VIEW}
              resizeMode="contain"
            />
            <Tooltip
              isVisible={toolTipSpendVisible}
              contentStyle={[TOOL_TIP_CONTENT, {width: horizontalScale(80)}]}
              content={
                <View>
                  <RNText
                    style={{
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
                      color: color.black1,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}>
                    From Lessons:{' '}
                    <RNText
                      style={{
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.black1,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      }}>{`${amountFormat(
                      earning?.spending?.balance || 0,
                    )}`}</RNText>
                  </RNText>
                  <RNText
                    style={{
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
                      color: color.black1,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}>
                    From BMW:{' '}
                    <RNText
                      style={{
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.black1,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      }}>{`${amountFormat(
                      earning?.spending?.gameBalance || 0,
                    )}`}</RNText>
                  </RNText>
                  <RNText
                    style={{
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
                      color: color.black1,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}>
                    Total:{' '}
                    <RNText
                      style={{
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.purple,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      }}>{`${amountFormat(
                      earning?.spending?.balance +
                        earning?.spending?.gameBalance || 0,
                    )}`}</RNText>
                  </RNText>
                </View>
              }
              placement="bottom"
              onClose={() => setToolTipSpendVisible(false)}>
              <TouchableOpacity onPress={() => setToolTipSpendVisible(true)}>
                <ImageBackground
                  source={BACKGROUND_SPEND}
                  resizeMode="contain"
                  style={[
                    BACKGROUND_INVESTMENT_SHARE_SPEND,
                    {
                      height:
                        orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(45)
                            : verticalScale(30)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(55)
                          : verticalScale(30),
                    },
                  ]}>
                  <Text
                    text={`${amountFormat(earning?.spending?.balance || 0)}`}
                    style={INVESTMENT_TEXT}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </Tooltip>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={SHARING}
              style={EARN_MONEY_VIEW}
              resizeMode="contain"
            />
            <Tooltip
              isVisible={toolTipShareVisible}
              contentStyle={[TOOL_TIP_CONTENT, {width: horizontalScale(80)}]}
              content={
                <View>
                  <RNText
                    style={{
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
                      color: color.black1,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}>
                    From Lessons:{' '}
                    <RNText
                      style={{
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.black1,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      }}>{`${amountFormat(
                      earning?.sharing?.balance || 0,
                    )}`}</RNText>
                  </RNText>
                  <RNText
                    style={{
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
                      color: color.black1,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}>
                    From BMW:{' '}
                    <RNText
                      style={{
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.black1,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      }}>{`${amountFormat(
                      earning?.sharing?.gameBalance || 0,
                    )}`}</RNText>
                  </RNText>
                  <RNText
                    style={{
                      fontFamily: typography.promptRegular,
                      fontWeight: '400',
                      color: color.black1,
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(9)
                          : moderateScale(10),
                    }}>
                    Total:{' '}
                    <RNText
                      style={{
                        fontFamily: typography.promptBold,
                        fontWeight: '700',
                        color: color.purple,
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(9)
                            : moderateScale(10),
                      }}>{`${amountFormat(
                      earning?.sharing?.balance +
                        earning?.sharing?.gameBalance || 0,
                    )}`}</RNText>
                  </RNText>
                </View>
              }
              placement="bottom"
              onClose={() => setToolTipShareVisible(false)}>
              <TouchableOpacity onPress={() => setToolTipShareVisible(true)}>
                <ImageBackground
                  source={BACKGROUND_INVESTMENT_SHARE}
                  resizeMode="contain"
                  style={[
                    BACKGROUND_INVESTMENT_SHARE_SPEND,
                    {
                      height:
                        orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(45)
                            : verticalScale(30)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(55)
                          : verticalScale(30),
                    },
                  ]}>
                  <Text
                    text={`${amountFormat(earning?.sharing?.balance || 0)}`}
                    style={INVESTMENT_TEXT}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </Tooltip>
          </View>
        </View>
        <View style={[SEPARATE, {marginTop: verticalScale(30)}]} />
        <View
          style={[
            DIRECTION_VIEW,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
            },
          ]}>
          <View
            style={[
              DIRECTION_VIEW,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text
              text={'Total Earnings'}
              style={[
                EARN_MONEY_TEXT,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(12)
                      : moderateScale(10),
                },
              ]}
            />
            <Tooltip
              isVisible={toolTipVisible}
              contentStyle={TOOL_TIP_CONTENT}
              content={
                <Text
                  text={
                    'This virtual earning is intended solely for your educational purposes.'
                  }
                  style={TEXT_HINT}
                />
              }
              placement="bottom"
              onClose={() => setToolTipVisible(false)}>
              <TouchableOpacity
                style={{paddingHorizontal: horizontalScale(5)}}
                onPress={() => setToolTipVisible(true)}>
                <HintIcon width={20} height={20} />
              </TouchableOpacity>
            </Tooltip>
          </View>
          <Text
            text={`${amountFormat(earning?.balance || 0)}`}
            style={[
              EARN_MONEY_SUBTITLE_TEXT,
              {
                fontSize:
                  orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(20)
                    : moderateScale(25),
              },
            ]}
          />
        </View>
        <View style={SEPARATE} />
        <View style={BUILD_MY_WORLD_CONTAINER}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={BUTTON_VIEW}>
              <BuildMyWorldTabletButton
                width={orientation === 'PORTRAIT' ? 190 : 237}
                props={undefined}
              />
            </TouchableOpacity>
            <Text text={'(Coming Soon)'} style={COMING_SOON_TEXT} />
          </View>

          <BackgroundStudy8 />
        </View>
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: 10,
  width: '100%',
  justifyContent: 'space-between',
};
const DIRECTION_COLUMN: ViewStyle = {
  flexDirection: 'column',
};
const CONTENT_ICON_TEXT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: verticalScale(10),
};
const BODY_THREE_VIEW: ViewStyle = {
  backgroundColor: color.white,
  marginTop: 15,
  borderRadius: 5,
  justifyContent: 'space-between',
  alignItems: 'center',
};
const IMAGE: any = {
  width: 67,
  height: 67,
};
const TEXT_TITLE_COMMON: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(10),
  fontWeight: '400',
  color: color.black1,
};
const CONTAINER_SUBTITLE_VIEW: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
};
const TEXT_SUBTITLE_COMMON: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(25),
  fontWeight: '600',
  color: color.black1,
};
const MONEY_VIEW: ViewStyle = {
  marginStart: 20,
};
const SUBTITLE_VIEW: ViewStyle = {
  marginStart: 50,
  marginTop: verticalScale(10),
};
const TITLE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const ALIGN_VIEW: ViewStyle = {
  alignItems: 'flex-end',
};
const FOOTER: ViewStyle = {
  height: 'auto',
  backgroundColor: color.white,
  marginStart: 20,
  marginEnd: 20,
  marginTop: 15,
  borderRadius: 5,
};
const EARN_MONEY_VIEW: ImageStyle = {
  width: 100,
  height: 140,
  justifyContent: 'center',
  alignItems: 'flex-end',
};
const BACKGROUND_INVESTMENT_SHARE_SPEND: ViewStyle = {
  width: horizontalScale(50),
  justifyContent: 'center',
};
const INVESTMENT_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(10),
  fontWeight: '600',
  color: color.black1,
  textAlign: 'center',
};
const FOOTER_TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontWeight: '600',
  color: color.black1,
  textAlign: 'center',
};
const SEPARATE: ViewStyle = {
  height: 2,
  backgroundColor: color.black1,
  marginStart: 20,
  marginEnd: 20,
  opacity: 0.2,
};
const EARN_MONEY_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(14),
  fontWeight: '600',
  color: color.black1,
  marginTop: 5,
};
const EARN_MONEY_SUBTITLE_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  color: color.primary,
};
const BUTTON_VIEW: ViewStyle = {
  shadowColor: '#52006A',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 20,
};
const BUILD_MY_WORLD_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  padding: 20,
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: verticalScale(5),
};
const COMING_SOON_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(8),
  color: color.black1,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
const TOOL_TIP_CONTENT: ViewStyle = {
  height: 'auto',
  width: horizontalScale(150),
};
const TEXT_HINT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(7.5),
  color: color.black1,
  fontWeight: '400',
  textAlign: 'center',
};
