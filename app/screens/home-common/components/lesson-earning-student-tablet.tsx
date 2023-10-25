/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  Text as RNText,
  Image,
  TextStyle,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useGrade, useOrientation} from '@app/hook';
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
import {DashboardStudentLevel} from './dashboard-student-level';
import {LineChart} from 'react-native-chart-kit';
import Svg, {Rect, Text as TextSVG} from 'react-native-svg';

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

export const LessonEarningStudentTablet = () => {
  const orientation = useOrientation();
  const screenWidth = Dimensions.get('window').width;
  const {orientationOpenApp} = useSelector(selector.config);
  const {
    dashboardStudentSummary,
    dashboardStudentEarning,
    dashboardStudentValueChart,
  } = useSelector(selector.dashboard) || '';
  const {infoDashboardStudent} = useSelector(selector.user);

  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [toolTipSaveVisible, setToolTipSaveVisible] = useState<boolean>(false);
  const [toolTipSpendVisible, setToolTipSpendVisible] =
    useState<boolean>(false);
  const [toolTipShareVisible, setToolTipShareVisible] =
    useState<boolean>(false);

  const [refreshing, setRefreshing] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<any>({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    dateName: '',
    dataTimeName: '',
  });

  useEffect(() => {
    getLearningDashboardStudent({
      payload: {
        studentId: infoDashboardStudent?._id,
        lang: 'vi',
      },
    });
  }, []);

  useEffect(() => {
    getLearningDashboardStudent({
      payload: {
        studentId: infoDashboardStudent?._id,
        lang: 'vi',
      },
    });
  }, [infoDashboardStudent?._id]);

  const {getLearningDashboardStudent, dataValueChartStudent, isLoading} =
    useGrade();

  const label =
    (dashboardStudentValueChart &&
      dashboardStudentValueChart.length > 0 &&
      dashboardStudentValueChart?.map(item => item?.shortDay)) ||
    [];

  const dataValue =
    (dashboardStudentValueChart &&
      dashboardStudentValueChart.length > 0 &&
      dashboardStudentValueChart?.map(item => item?.value)) ||
    [];

  const dataDateName =
    (dashboardStudentValueChart &&
      dashboardStudentValueChart.length > 0 &&
      dashboardStudentValueChart?.map(item => item?.dateName)) ||
    [];

  const dataTimeName =
    (dashboardStudentValueChart &&
      dashboardStudentValueChart.length > 0 &&
      dashboardStudentValueChart?.map(item => item?.timeName)) ||
    [];

  const data = {
    labels: label,
    datasets: [
      {
        data: dataValue,
        dataSet: dataDateName,
        dataTimeName: dataTimeName,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: color.white,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: color.white,
    backgroundGradientToOpacity: 0,
    color: () => '#FFC700',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    labelColor: () => color.black1,
    fillShadowGradient: '#FFC700',
    fillShadowGradientOpacity: 1,
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: color.gray6,
      strokeDasharray: '2',
    },
    propsForLabels: {
      fontFamily: typography.promptRegular,
      fontSize: 9,
      color: color.black1,
    },
  };

  const decorator = () => {
    return tooltipPos?.visible ? (
      <View style={SHADOWN}>
        <Svg>
          <Rect
            x={tooltipPos.x - 70}
            y={tooltipPos.y - 10}
            width="100"
            height="45"
            fill={color.white}
          />
          <TextSVG
            x={tooltipPos.x - 20}
            y={tooltipPos.y + 10}
            fill={color.purple}
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle">
            {tooltipPos?.dataTimeName === '' ? 0 : tooltipPos?.dataTimeName}
            <TextSVG
              x={tooltipPos.x - 20}
              y={tooltipPos.y + 30}
              fill={color.purple}
              fontSize="13"
              fontWeight="400"
              textAnchor="middle">
              {`${tooltipPos?.dateName}`}
            </TextSVG>
          </TextSVG>
        </Svg>
      </View>
    ) : null;
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getLearningDashboardStudent({
      payload: {
        studentId: infoDashboardStudent?._id,
        lang: 'vi',
      },
    });
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  const renderLinechart = () => {
    if (dataValueChartStudent && dataValueChartStudent.length > 0) {
      const handleDataPointClick = dataPoint => {
        const resultDateName = dataPoint?.dataset?.dataSet?.find(
          (item, index) => index === dataPoint?.index,
        );
        const resultTimeName = dataPoint?.dataset?.dataTimeName?.find(
          (item, index) => index === dataPoint?.index,
        );
        let isSamePoint =
          tooltipPos.x === dataPoint.x && tooltipPos.y === dataPoint.y;
        isSamePoint
          ? setTooltipPos(previousState => ({
              ...previousState,
              value: dataPoint?.dataset?.dataTimeName,
              dateName: resultDateName,
              dataTimeName: resultTimeName,
              visible: !previousState.visible,
            }))
          : setTooltipPos({
              x: dataPoint.x,
              value: dataPoint?.dataset?.dataTimeName,
              dateName: resultDateName,
              dataTimeName: resultTimeName,
              y: dataPoint.y,
              visible: true,
            });
      };

      return (
        <LineChart
          data={data}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          bezier
          style={{right: orientationOpenApp === 'LANDSCAPE' ? 10 : 40}}
          withHorizontalLabels={true}
          decorator={decorator}
          onDataPointClick={handleDataPointClick}
        />
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  if (isLoading) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{backgroundColor: color.gray2}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <DashboardStudentLevel />
      </View>
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
                  style={[
                    TEXT_TITLE_COMMON,
                    {marginRight: horizontalScale(10)},
                  ]}
                />
              </View>
            </View>

            <View style={CONTAINER_SUBTITLE_VIEW}>
              <View style={SUBTITLE_VIEW}>
                <RNText style={TEXT_SUBTITLE_COMMON}>{`${amountFormat(
                  dashboardStudentSummary?.earning || 0,
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
                  style={[
                    TEXT_TITLE_COMMON,
                    {marginRight: horizontalScale(10)},
                  ]}
                />
              </View>
            </View>

            <View style={CONTAINER_SUBTITLE_VIEW}>
              <View style={SUBTITLE_VIEW}>
                <RNText style={TEXT_SUBTITLE_COMMON}>
                  {dashboardStudentSummary?.dayInTraining || 0}
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
                  style={[
                    TEXT_TITLE_COMMON,
                    {marginRight: horizontalScale(10)},
                  ]}
                />
              </View>
            </View>

            <View style={CONTAINER_SUBTITLE_VIEW}>
              <View style={SUBTITLE_VIEW}>
                <RNText style={TEXT_SUBTITLE_COMMON}>
                  {dashboardStudentSummary?.completedLessons || 0}
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
                        dashboardStudentEarning?.investments?.balance || 0,
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
                        dashboardStudentEarning?.investments?.gameBalance || 0,
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
                        dashboardStudentEarning?.investments?.balance +
                          dashboardStudentEarning?.investments?.gameBalance ||
                          0,
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
                      text={`${amountFormat(
                        dashboardStudentEarning?.investments?.balance || 0,
                      )}`}
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
                        dashboardStudentEarning?.spending?.balance || 0,
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
                        dashboardStudentEarning?.spending?.gameBalance || 0,
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
                        dashboardStudentEarning?.spending?.balance +
                          dashboardStudentEarning?.spending?.gameBalance || 0,
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
                      text={`${amountFormat(
                        dashboardStudentEarning?.spending?.balance || 0,
                      )}`}
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
                        dashboardStudentEarning?.sharing?.balance || 0,
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
                        dashboardStudentEarning?.sharing?.gameBalance || 0,
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
                        dashboardStudentEarning?.sharing?.balance +
                          dashboardStudentEarning?.sharing?.gameBalance || 0,
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
                      text={`${amountFormat(
                        dashboardStudentEarning?.sharing?.balance || 0,
                      )}`}
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
              text={`${amountFormat(dashboardStudentEarning?.balance || 0)}`}
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
            <TouchableOpacity style={BUTTON_VIEW}>
              <BuildMyWorldTabletButton
                width={orientation === 'PORTRAIT' ? 190 : 237}
                props={undefined}
              />
            </TouchableOpacity>
            <BackgroundStudy8 />
          </View>
        </View>
      </View>
      <View style={ACTIVITY_CONTAINER}>
        <Text text={'Learning hours'} style={ACTIVITIES_TEXT} />
        <View style={LEARNING_HOURS_VIEW_CONTAINER}>
          <View style={LEARNING_HOURS_VIEW_BODY}>
            <Text text={'Hours'} style={LEARNING_HOURS_TEXT} />
          </View>
          <View style={LINE_CHART_CONTAINER}>{renderLinechart()}</View>
        </View>
      </View>
    </ScrollView>
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
  width: horizontalScale(150),
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
  fontSize: moderateScale(11.5),
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
  padding: 10,
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: verticalScale(0),
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
  fontSize: moderateScale(10),
  color: color.purple,
  fontWeight: '400',
  textAlign: 'center',
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const SHADOWN: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};
const ACTIVITY_CONTAINER: ViewStyle = {
  height: 'auto',
  backgroundColor: color.white,
  width: '100%',
  marginTop: 15,
  borderRadius: 5,
  marginBottom: 20,
};
const ACTIVITIES_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(14),
  fontWeight: '600',
  color: color.black1,
  padding: 10,
};
const LEARNING_HOURS_VIEW_BODY: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: verticalScale(120),
  flex: 0.08,
};
const LEARNING_HOURS_TEXT: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(10),
  color: color.black1,
  transform: [{rotate: '270deg'}],
  width: horizontalScale(150),
};
const LINE_CHART_CONTAINER: ViewStyle = {
  flex: 1,
  marginBottom: verticalScale(90),
};
const LEARNING_HOURS_VIEW_CONTAINER: ViewStyle = {
  marginTop: 20,
  flexDirection: 'row',
};
