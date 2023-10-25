/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useMyDashboard} from '@app/hook';
import {selector} from '@app/redux';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import Svg, {Rect, Text as TextSVG} from 'react-native-svg';

import {Text} from '@app/components';
import {useSelector} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';
import {useIsFocused} from '@react-navigation/native';
import {isTablet} from 'react-native-device-info';

export const LearningHours = () => {
  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get('window').width;
  const {accessToken, childId} = useSelector(selector.user);
  const {valueChart} = useSelector(selector.dashboard);
  const {orientationOpenApp} = useSelector(selector.config);

  useEffect(() => {
    if (isFocused) {
      getMyDashboard();
    }
  }, [isFocused]);

  useEffect(() => {
    getMyDashboard();
  }, [childId]);

  const {getMyDashboard, loadingDashboard, dataSource} =
    useMyDashboard(accessToken);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    dateName: '',
    dataTimeName: '',
  });

  const label = valueChart?.map(item => item?.shortDay) || [];
  const dataValue = valueChart?.map(item => item?.value) || [];
  const dataDateName = valueChart?.map(item => item?.dateName) || [];
  const dataTimeName = valueChart?.map(item => item?.timeName) || [];

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
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
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
      fontSize:
        orientationOpenApp === 'LANDSCAPE'
          ? moderateScale(7)
          : moderateScale(9),
      color: color.black1,
    },
  };

  const decorator = () => {
    if (tooltipPos?.visible) {
      return (
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
              {tooltipPos?.dataTimeName || 0}
              <TextSVG
                x={tooltipPos.x - 20}
                y={tooltipPos.y + 30}
                fill={color.purple}
                fontSize="13"
                fontWeight="400"
                textAnchor="middle">
                {tooltipPos?.dateName}
              </TextSVG>
            </TextSVG>
          </Svg>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderLinechart = () => {
    if (!dataSource || dataSource.length === 0) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    const handleDataPointClick = dataPoint => {
      const resultDateName = dataPoint?.dataset?.dataSet?.[dataPoint?.index];
      const resultTimeName =
        dataPoint?.dataset?.dataTimeName?.[dataPoint?.index];
      const isSamePoint =
        tooltipPos.x === dataPoint.x && tooltipPos.y === dataPoint.y;

      if (isSamePoint) {
        setTooltipPos(previousState => ({
          ...previousState,
          value: dataPoint?.dataset?.dataTimeName,
          dateName: resultDateName,
          dataTimeName: resultTimeName,
          visible: !previousState.visible,
        }));
      } else {
        setTooltipPos({
          x: dataPoint.x,
          value: dataPoint?.dataset?.dataTimeName,
          dateName: resultDateName,
          dataTimeName: resultTimeName,
          y: dataPoint.y,
          visible: true,
        });
      }
    };

    return (
      <LineChart
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={{
          left: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? horizontalScale(10)
              : horizontalScale(10)
            : 40,
        }}
        withHorizontalLabels={true}
        decorator={decorator}
        onDataPointClick={handleDataPointClick}
      />
    );
  };

  if (loadingDashboard) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <View style={ACTIVITY_CONTAINER}>
      <Text
        text={'Learning hours'}
        style={[
          ACTIVITIES_TEXT,
          {
            fontSize:
              orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(12)
                : moderateScale(14),
          },
        ]}
      />
      <View style={LEARNING_HOURS_VIEW_CONTAINER}>
        <View style={LINE_CHART_CONTAINER}>{renderLinechart()}</View>
      </View>
    </View>
  );
};

const ACTIVITY_CONTAINER: ViewStyle = {
  height: 'auto',
  backgroundColor: color.white,
  width: '100%',
  marginStart: 10,
  marginEnd: 10,
  marginTop: 15,
  borderRadius: 5,
  marginBottom: 20,
};
const ACTIVITIES_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,

  fontWeight: '600',
  color: color.black1,
  padding: 10,
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
const LINE_CHART_CONTAINER: ViewStyle = {
  flex: 1,
  marginBottom: verticalScale(90),
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
