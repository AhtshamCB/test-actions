/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  ImageStyle,
  Text as RNText,
  Dimensions,
  RefreshControl,
  TextStyle,
  Platform,
} from 'react-native';
//
import {Text} from '@app/components';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
//
import {MoneyIcon, DayTrainingIcon, LessonsIcon, HintIcon} from '@app/svg';
//
import {useGrade} from '@app/hook';
//
import Svg, {Rect, Text as TextSVG} from 'react-native-svg';
import {amountFormat} from '@app/utils/general';
//
import {LineChart} from 'react-native-chart-kit';
import Tooltip from 'react-native-walkthrough-tooltip';
import {DashboardStudentLevel} from './dashboard-student-level';

const BACKGROUND_YELLOW = require('@app/components/images/background-yellow.png');
const BACKGROUND_PURPLE = require('@app/components/images/background-purple.png');
const INVESTMENT = require('../images/investment.png');
const SPENDING = require('../images/spending.png');
const SHARING = require('../images/sharing.png');
const BACKGROUND_INVESTMENT_SHARE = require('../images/background-investment-share.png');
const BACKGROUND_SPEND = require('../images/background-spend.png');

export const LessonEarningStudentPhone = () => {
  const screenWidth = Dimensions.get('window').width;

  const {
    dashboardStudentSummary,
    dashboardStudentEarning,
    dashboardStudentValueChart,
  } = useSelector(selector.dashboard) || '';
  const {infoDashboardStudent} = useSelector(selector.user);

  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);

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
          style={LINE_CHART_ITEM}
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
      style={CONTAINER}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View
        style={{
          marginTop: Platform.OS === 'android' ? 0 : verticalScale(-10),
        }}>
        <DashboardStudentLevel />
      </View>
      <View style={CONTAINER_THREE_VIEW}>
        <>
          <View style={BODY_THREE_VIEW}>
            <View style={MONEY_VIEW}>
              <MoneyIcon />
            </View>
            <View style={TITLE_VIEW}>
              <Text text={'Earnings from lessons'} style={TEXT_TITLE_COMMON} />
            </View>
            <View style={SUBTITLE_VIEW}>
              <RNText style={TEXT_SUBTITLE_COMMON}>{`${amountFormat(
                dashboardStudentSummary?.earning || 0,
              )}`}</RNText>
            </View>

            <View style={ALIGN_VIEW}>
              <Image source={BACKGROUND_YELLOW} style={HEIGHT_COMMON} />
            </View>
          </View>
          <View style={BODY_THREE_VIEW}>
            <View style={MONEY_VIEW}>
              <DayTrainingIcon />
            </View>
            <View style={[TITLE_VIEW, {marginRight: horizontalScale(40)}]}>
              <Text text={'Days In Training'} style={TEXT_TITLE_COMMON} />
            </View>
            <View style={SUBTITLE_VIEW}>
              <RNText style={TEXT_SUBTITLE_COMMON}>
                {dashboardStudentSummary?.dayInTraining || 0}
              </RNText>
            </View>

            <View style={ALIGN_VIEW}>
              <Image source={BACKGROUND_PURPLE} style={HEIGHT_COMMON} />
            </View>
          </View>
          <View style={BODY_THREE_VIEW}>
            <View style={MONEY_VIEW}>
              <LessonsIcon />
            </View>
            <View style={[TITLE_VIEW, {marginRight: horizontalScale(40)}]}>
              <Text text={'Completed Lessons'} style={TEXT_TITLE_COMMON} />
            </View>
            <View style={[SUBTITLE_VIEW, {marginStart: 20}]}>
              <RNText style={TEXT_SUBTITLE_COMMON}>
                {dashboardStudentSummary?.completedLessons || 0}
              </RNText>
            </View>

            <View style={ALIGN_VIEW}>
              <Image source={BACKGROUND_YELLOW} style={HEIGHT_COMMON} />
            </View>
          </View>
          <View style={ACTIVITY_CONTAINER}>
            <Text text={'Learning hours'} style={ACTIVITIES_TEXT} />
            <View style={LEARNING_HOURS_VIEW_CONTAINER}>
              <View style={LEARNING_HOURS_VIEW_BODY} />
              <View style={LINE_CHART_CONTAINER}>{renderLinechart()}</View>
            </View>
          </View>
        </>

        <View style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <View>
              <Text text={'Save &\nInvestment'} style={FOOTER_TEXT_COMMON} />
            </View>
            <View
              style={{
                right: horizontalScale(18),
              }}>
              <Text text={'\nSpend'} style={FOOTER_TEXT_COMMON} />
            </View>
            <View>
              <Text text={'\nShare'} style={FOOTER_TEXT_COMMON} />
            </View>
          </View>
          <View style={FOOTER_BODY}>
            <View style={FOOTER_VIEW_COMMON}>
              <Image
                source={INVESTMENT}
                style={EARN_MONEY_VIEW}
                resizeMode="contain"
              />
              <ImageBackground
                source={BACKGROUND_INVESTMENT_SHARE}
                resizeMode="contain"
                style={BACKGROUND_INVESTMENT_SHARE_SPEND}>
                <Text
                  text={`${amountFormat(
                    dashboardStudentEarning?.investments?.balance || 0,
                  )}`}
                  style={INVESTMENT_TEXT}
                />
              </ImageBackground>
            </View>
            <View style={FOOTER_VIEW_COMMON}>
              <Image
                source={SPENDING}
                style={EARN_MONEY_VIEW}
                resizeMode="contain"
              />
              <ImageBackground
                source={BACKGROUND_SPEND}
                resizeMode="contain"
                style={BACKGROUND_INVESTMENT_SHARE_SPEND}>
                <Text
                  text={`${amountFormat(
                    dashboardStudentEarning?.spending?.balance || 0,
                  )}`}
                  style={INVESTMENT_TEXT}
                />
              </ImageBackground>
            </View>
            <View style={FOOTER_VIEW_COMMON}>
              <Image
                source={SHARING}
                style={EARN_MONEY_VIEW}
                resizeMode="contain"
              />
              <ImageBackground
                source={BACKGROUND_INVESTMENT_SHARE}
                resizeMode="contain"
                style={BACKGROUND_INVESTMENT_SHARE_SPEND}>
                <Text
                  text={`${amountFormat(
                    dashboardStudentEarning?.sharing?.balance || 0,
                  )}`}
                  style={INVESTMENT_TEXT}
                />
              </ImageBackground>
            </View>
          </View>
          <View style={[SEPARATE, {marginTop: 20}]} />
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
              <Text text={'Total Earnings'} style={EARN_MONEY_TEXT} />
              <Tooltip
                topAdjustment={Platform.OS === 'android' ? -50 : 0}
                isVisible={toolTipVisible}
                showChildInTooltip={false}
                content={
                  <Text
                    text={
                      'This virtual dashboardStudentEarning is intended solely for your educational purposes.'
                    }
                    style={{
                      fontFamily: typography.promptRegular,
                      fontSize: moderateScale(10),
                      color: color.purple,
                      fontWeight: '400',
                    }}
                  />
                }
                placement="top"
                onClose={() => setToolTipVisible(false)}>
                <TouchableOpacity
                  style={{paddingHorizontal: horizontalScale(10)}}
                  onPress={() => setToolTipVisible(true)}>
                  <HintIcon width={20} height={20} />
                </TouchableOpacity>
              </Tooltip>
            </View>
            <Text
              text={`${amountFormat(dashboardStudentEarning?.balance || 0)}`}
              style={EARN_MONEY_SUBTITLE_TEXT}
            />
          </View>
          <View style={{marginBottom: verticalScale(20)}} />
        </View>
      </View>
    </ScrollView>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray4,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
const CONTAINER_THREE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const BODY_THREE_VIEW: ViewStyle = {
  height: 74,
  backgroundColor: color.white,
  width: '100%',
  marginTop: 15,
  borderRadius: 5,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const TEXT_TITLE_COMMON: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.black1,
};
const TEXT_SUBTITLE_COMMON: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: 24,
  fontWeight: '600',
  color: color.black1,
};
const MONEY_VIEW: ViewStyle = {
  marginStart: 20,
};
const SUBTITLE_VIEW: ViewStyle = {
  marginStart: 50,
};
const TITLE_VIEW: ViewStyle = {
  justifyContent: 'center',
};
const ALIGN_VIEW: ViewStyle = {
  alignItems: 'flex-end',
};
const ACTIVITY_CONTAINER: ViewStyle = {
  height: 'auto',
  backgroundColor: color.white,
  width: '90%',
  marginStart: 50,
  marginEnd: 50,
  marginTop: 15,
  borderRadius: 5,
  marginBottom: 20,
};
const ACTIVITIES_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(12),
  fontWeight: '600',
  color: color.black1,
  padding: 10,
};
const FOOTER: ViewStyle = {
  height: 'auto',
  backgroundColor: color.white,
  width: '90%',
  marginStart: 50,
  marginEnd: 50,
  marginTop: 15,
  borderRadius: 5,
};
const FOOTER_BODY: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: verticalScale(20),
};
const FOOTER_CONTENT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: verticalScale(10),
  marginRight: horizontalScale(10),
};
const FOOTER_VIEW_COMMON: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const EARN_MONEY_VIEW: ImageStyle = {
  width: 100,
  height: 140,
  justifyContent: 'center',
  alignItems: 'flex-end',
};
const BACKGROUND_INVESTMENT_SHARE_SPEND: ViewStyle = {
  width: horizontalScale(100),
  height: verticalScale(40),
  justifyContent: 'center',
};
const INVESTMENT_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(13),
  fontWeight: '600',
  color: color.black1,
  textAlign: 'center',
};
const HEIGHT_COMMON: ImageStyle = {
  height: 75,
};
const FOOTER_TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(16),
  fontWeight: '600',
  color: color.black1,
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
  fontSize: moderateScale(18),
  fontWeight: '600',
  color: color.black1,
  marginTop: 5,
};
const EARN_MONEY_SUBTITLE_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 32,
  fontWeight: '700',
  color: color.primary,
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
const LEARNING_HOURS_VIEW_CONTAINER: ViewStyle = {
  marginTop: 20,
  flexDirection: 'row',
};

const LEARNING_HOURS_VIEW_BODY: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
  flex: 0.06,
};
const LINE_CHART_CONTAINER: ViewStyle = {
  flex: 1,
};
const LINE_CHART_ITEM: ViewStyle = {
  right: 40,
};
