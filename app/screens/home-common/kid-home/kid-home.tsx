/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
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
  Linking,
} from 'react-native';
//
import {PopupFeedback, Text} from '@app/components';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';
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
import {
  MoneyIcon,
  DayTrainingIcon,
  LessonsIcon,
  BuildMyWorldButton,
  BackgroundStudy8,
  BuildMyWorldTabletButton,
  HintIcon,
} from '@app/svg';
//
import {
  useGetDashboardAlert,
  useGetSystemSettings,
  useMe,
  usePushFcmToken,
  useMyDashboard,
  useOrientation,
} from '@app/hook';
//
import Svg, {Rect, Text as TextSVG} from 'react-native-svg';
import {amountFormat} from '@app/utils/general';
//
import {LineChart} from 'react-native-chart-kit';
import {isTablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import i18n from '@app/i18next/i18n.config';
import Carousel from 'react-native-snap-carousel';
import {Level} from '../components/level';
import {LessonEarningTablet} from '../components/lesson-earning-tablet';
import {LearningHours} from '../components/learning-hours';
import Tooltip from 'react-native-walkthrough-tooltip';

const BACKGROUND_YELLOW = require('@app/components/images/background-yellow.png');
const BACKGROUND_PURPLE = require('@app/components/images/background-purple.png');
const INVESTMENT = require('../images/investment.png');
const SPENDING = require('../images/spending.png');
const SHARING = require('../images/sharing.png');
const BACKGROUND_INVESTMENT_SHARE = require('../images/background-investment-share.png');
const BACKGROUND_SPEND = require('../images/background-spend.png');

export const KidHome: FC<
  StackScreenProps<NavigatorParamList, 'kidHome'>
> = () => {
  const screenWidth = Dimensions.get('window').width;
  const isFocused = useIsFocused();
  const caroulselRef = useRef(null);
  const {t} = useTranslation();
  const orientation = useOrientation();

  const {summary, earning, valueChart} = useSelector(selector.dashboard) || '';
  const {isBetaVersion, orientationOpenApp} = useSelector(selector.config);
  const {
    accessToken,
    userInfo,
    pushToken,
    isLoggedIn,
    androidDeviceId,
    iOSDeviceId,
  } = useSelector(selector.user) || '';

  const {getMeInfo, loadingMeInfo} = useMe(accessToken) || '';
  const {getSystemSettings} = useGetSystemSettings();

  const [refreshing, setRefreshing] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<any>({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    dateName: '',
    dataTimeName: '',
  });

  const [isShowPopupFeedback, setIsShowPopupFeedback] =
    useState<boolean>(false);
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [toolTipSaveVisible, setToolTipSaveVisible] = useState<boolean>(false);
  const [toolTipSpendVisible, setToolTipSpendVisible] =
    useState<boolean>(false);
  const [toolTipShareVisible, setToolTipShareVisible] =
    useState<boolean>(false);

  const kidName = userInfo?.me?.name || '';

  const {pushFcmToken} = usePushFcmToken(
    accessToken,
    pushToken,
    Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
    Platform.OS,
  );

  useEffect(() => {
    getMeInfo();
    getMyDashboard();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      pushFcmToken();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isFocused) {
      getMeInfo();
      getMyDashboard();
      getSystemSettings();
      getDashboardAlert();
    }
  }, [isFocused]);

  useEffect(() => {
    getDashboardAlert();
  }, []);

  const {getDashboardAlert, loadingGetDashboardAlert, dashboardAlert} =
    useGetDashboardAlert(accessToken) || '';

  const {getMyDashboard, loadingDashboard, dataSource} =
    useMyDashboard(accessToken);

  const label =
    (valueChart &&
      valueChart.length > 0 &&
      valueChart?.map(item => item?.shortDay)) ||
    [];

  const dataValue =
    (valueChart &&
      valueChart.length > 0 &&
      valueChart?.map(item => item?.value)) ||
    [];

  const dataDateName =
    (valueChart &&
      valueChart.length > 0 &&
      valueChart?.map(item => item?.dateName)) ||
    [];

  const dataTimeName =
    (valueChart &&
      valueChart.length > 0 &&
      valueChart?.map(item => item?.timeName)) ||
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
    getMeInfo();
    getSystemSettings();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  const renderLinechart = () => {
    if (dataSource && dataSource.length > 0) {
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

  const renderItemDashboardAlert = ({item, index}) => {
    return (
      <View
        key={index}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        {isBetaVersion ? (
          <RNText
            style={[
              DASHBOARD_ALERT_TEXT,
              {
                fontSize: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(8)
                    : moderateScale(10)
                  : moderateScale(13),
              },
            ]}>
            {i18n.language === 'en'
              ? `Hey there ${kidName}, cool kid! 🙂 We're extremely curious and excited to hear your feedback on TeeFi. It's just 3 questions. `
              : `Bạn nhỏ ${kidName} ngầu, thân mến! 🙂 Những góp ý của bạn sẽ giúp nền tảng TeeFi tốt hơn mỗi ngày. Chỉ có 3 câu hỏi ngắn thôi. `}
            <RNText
              style={[
                DASHBOARD_ALERT_TEXT,
                {
                  textDecorationLine: 'underline',
                  color: color.blue1,
                  fontSize: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(8)
                      : moderateScale(10)
                    : moderateScale(13),
                },
              ]}
              onPress={() => setIsShowPopupFeedback(true)}>
              {i18n.language === 'en' ? 'CLICK HERE!' : 'BẤM VÀO ĐÂY NHA!'}
            </RNText>
          </RNText>
        ) : (
          <>
            <RNText
              style={[
                DASHBOARD_ALERT_TEXT,
                {
                  fontSize: isTablet()
                    ? moderateScale(10.5)
                    : moderateScale(13),
                  textAlignVertical: 'center',
                  fontFamily: typography.promptBold,
                  fontWeight: '700',
                },
              ]}>
              {`${item.content} `}
              {item.url && (
                <RNText
                  onPress={() => Linking.openURL(item.url)}
                  style={{
                    ...DASHBOARD_ALERT_TEXT,
                    textDecorationLine: 'underline',
                    color: color.blue1,
                  }}>
                  {item.urlTitle ||
                    (i18n.language === 'en'
                      ? 'CLICK HERE'
                      : 'BẤM VÀO ĐÂY NHA!')}
                </RNText>
              )}
            </RNText>
          </>
        )}
      </View>
    );
  };

  if (loadingDashboard || loadingMeInfo || loadingGetDashboardAlert) {
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
      {!isTablet() && (
        <View style={CONTAINER_CONTENT}>
          <View style={DIRECTION_VIEW}>
            <Text text={'Welcome, '} style={[WELCOME_TEXT, {flex: 0}]} />
            <Text text={`${kidName}!`} style={WELCOME_TEXT} numberOfLines={1} />
          </View>
        </View>
      )}

      <View
        style={{
          marginTop: isTablet()
            ? verticalScale(0)
            : dashboardAlert?.length > 0
            ? verticalScale(-20)
            : verticalScale(-10),
        }}>
        {dashboardAlert?.length > 0 && (
          <View style={CONTENT_VIEW}>
            <Carousel
              ref={caroulselRef}
              data={dashboardAlert}
              renderItem={renderItemDashboardAlert}
              sliderWidth={Dimensions.get('window').width - 20}
              itemWidth={Dimensions.get('window').width - 20}
              firstItem={0}
              inactiveSlideScale={1}
              loopClonesPerSide={2}
              loop={true}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={15000}
              enableSnap={false}
              scrollEnabled={false}
            />
          </View>
        )}

        <View
          style={{
            marginTop: isTablet()
              ? orientation === 'PORTRAIT'
                ? verticalScale(0)
                : verticalScale(5)
              : userInfo?.me?.role === 'student'
              ? verticalScale(-10)
              : verticalScale(0),
          }}>
          <Level dashboardAlert={dashboardAlert} />
        </View>
      </View>
      <View style={CONTAINER_THREE_VIEW}>
        <>
          {isTablet() ? (
            <>
              <LessonEarningTablet />
              <LearningHours />
            </>
          ) : (
            <>
              <View style={BODY_THREE_VIEW}>
                <View style={MONEY_VIEW}>
                  <MoneyIcon />
                </View>
                <View style={TITLE_VIEW}>
                  <Text
                    text={'Earnings from lessons'}
                    style={TEXT_TITLE_COMMON}
                  />
                </View>
                <View style={SUBTITLE_VIEW}>
                  <RNText style={TEXT_SUBTITLE_COMMON}>{`${amountFormat(
                    summary?.earning || 0,
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
                    {summary?.dayInTraining || 0}
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
                    {summary?.completedLessons || 0}
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
          )}
        </>

        {!isTablet() && (
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
                <Tooltip
                  isVisible={toolTipSaveVisible}
                  contentStyle={TOOL_TIP_CONTENT}
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
                      style={BACKGROUND_INVESTMENT_SHARE_SPEND}>
                      <Text
                        text={`${amountFormat(
                          earning?.investments?.balance || 0,
                        )}`}
                        style={INVESTMENT_TEXT}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </Tooltip>
              </View>
              <View style={FOOTER_VIEW_COMMON}>
                <Image
                  source={SPENDING}
                  style={EARN_MONEY_VIEW}
                  resizeMode="contain"
                />
                <Tooltip
                  isVisible={toolTipSpendVisible}
                  contentStyle={TOOL_TIP_CONTENT}
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
                  <TouchableOpacity
                    onPress={() => setToolTipSpendVisible(true)}>
                    <ImageBackground
                      source={BACKGROUND_SPEND}
                      resizeMode="contain"
                      style={BACKGROUND_INVESTMENT_SHARE_SPEND}>
                      <Text
                        text={`${amountFormat(
                          earning?.spending?.balance || 0,
                        )}`}
                        style={INVESTMENT_TEXT}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </Tooltip>
              </View>
              <View style={FOOTER_VIEW_COMMON}>
                <Image
                  source={SHARING}
                  style={EARN_MONEY_VIEW}
                  resizeMode="contain"
                />
                <Tooltip
                  isVisible={toolTipShareVisible}
                  contentStyle={TOOL_TIP_CONTENT}
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
                  <TouchableOpacity
                    onPress={() => setToolTipShareVisible(true)}>
                    <ImageBackground
                      source={BACKGROUND_INVESTMENT_SHARE}
                      resizeMode="contain"
                      style={BACKGROUND_INVESTMENT_SHARE_SPEND}>
                      <Text
                        text={`${amountFormat(earning?.sharing?.balance || 0)}`}
                        style={INVESTMENT_TEXT}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </Tooltip>
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
                        'This virtual earning is intended solely for your educational purposes.'
                      }
                      style={{
                        fontFamily: typography.promptRegular,
                        fontSize: moderateScale(10),
                        color: color.purple,
                        fontWeight: '400',
                      }}
                    />
                  }
                  placement="bottom"
                  onClose={() => setToolTipVisible(false)}>
                  <TouchableOpacity
                    style={{paddingHorizontal: horizontalScale(10)}}
                    onPress={() => setToolTipVisible(true)}>
                    <HintIcon width={20} height={20} />
                  </TouchableOpacity>
                </Tooltip>
              </View>
              <Text
                text={`${amountFormat(earning?.balance || 0)}`}
                style={EARN_MONEY_SUBTITLE_TEXT}
              />
            </View>
            <View style={SEPARATE} />

            <View style={BUILD_MY_WORLD_CONTAINER}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={BUTTON_VIEW}>
                  {isTablet() ? (
                    <BuildMyWorldTabletButton props={undefined} />
                  ) : (
                    <BuildMyWorldButton />
                  )}
                </TouchableOpacity>
                <Text text={'(Coming Soon)'} style={COMING_SOON_TEXT} />
              </View>
              <BackgroundStudy8 />
            </View>
          </View>
        )}
      </View>

      <PopupFeedback
        isVisible={isShowPopupFeedback}
        title={`${t('hi')}, ${kidName}!`}
        subtitle="YOUR FEEDBACK WILL HELP US SERVE YOU BETTER"
        onClose={() => setIsShowPopupFeedback(false)}
      />
    </ScrollView>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray4,
};
const CONTAINER_CONTENT: ViewStyle = {
  paddingVertical: verticalScale(20),
  paddingHorizontal: horizontalScale(10),
  marginTop: -15,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const WELCOME_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(25),
  fontWeight: '600',
  color: color.black1,
  flex: 1,
};
const CONTENT_VIEW: ViewStyle = {
  backgroundColor: color.yellow1,
  paddingHorizontal: horizontalScale(10),
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: verticalScale(5),
};
const DASHBOARD_ALERT_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  textAlign: 'center',
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
  fontSize: isTablet() ? moderateScale(14) : moderateScale(12),
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
  fontSize: isTablet() ? moderateScale(20) : moderateScale(16),
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
  fontSize: isTablet() ? moderateScale(14) : moderateScale(18),
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
  marginBottom: 70,
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
  left: horizontalScale(15),
};
const LEARNING_HOURS_VIEW_CONTAINER: ViewStyle = {
  marginTop: 20,
  flexDirection: 'row',
};
const LEARNING_HOURS_VIEW_BODY: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
  flex: isTablet() ? 0.05 : 0.05,
};
const LINE_CHART_CONTAINER: ViewStyle = {
  flex: 1,
};
const LINE_CHART_ITEM: ViewStyle = {
  right: 40,
};
const COMING_SOON_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(10),
  color: color.black1,
};
const TOOL_TIP_CONTENT: ViewStyle = {
  width: horizontalScale(130),
};
