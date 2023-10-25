/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
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
import {isTablet} from 'react-native-device-info';
import {useOrientation} from '@app/hook';

export const StudentPerformance = dataSource => {
  const screenWidth = isTablet()
    ? Dimensions.get('window').width + 80
    : Dimensions.get('window').width + 30;
  const {valueChart} = useSelector(selector.dashboard);
  const {orientationOpenApp} = useSelector(selector.config);
  const orientation = useOrientation();

  const [tooltipPos, setTooltipPos] = useState<any>({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    dateName: '',
    dataTimeName: '',
  });

  const label =
    (valueChart?.length > 0 && valueChart.map(item => item?.shortDay)) || [];
  const dataValue =
    (valueChart?.length > 0 && valueChart.map(item => item?.value)) || [];
  const dataDateName =
    (valueChart?.length > 0 && valueChart.map(item => item?.dateName)) || [];
  const dataTimeName =
    (valueChart?.length > 0 && valueChart.map(item => item?.timeName)) || [];

  const data = {
    labels: label,
    datasets: [
      {
        data: dataValue,
        dataSet: dataDateName,
        dataTimeName,
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

  const decorator = () =>
    tooltipPos?.visible ? (
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

  const renderLinechart = () => {
    if (dataSource?.dataSource && dataSource?.dataSource.length > 0) {
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
          height={isTablet() ? verticalScale(250) : 200}
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

  return (
    <View
      style={[
        ACTIVITY_CONTAINER,
        {
          height: isTablet()
            ? orientation === 'PORTRAIT'
              ? orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(350)
                : verticalScale(320)
              : orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(350)
              : verticalScale(320)
            : 'auto',
        },
      ]}>
      <Text
        text={"Students' Learning Hours"}
        style={[
          ACTIVITIES_TEXT,
          {
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(10)
                : moderateScale(14)
              : moderateScale(13),
            padding: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? 20
                : 10
              : 10,
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
  backgroundColor: color.white,
  width: '100%',
  marginStart: isTablet() ? 10 : 50,
  marginEnd: isTablet() ? 10 : 50,
  marginTop: 15,
  borderRadius: 5,
  marginBottom: 20,
};
const ACTIVITIES_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,

  fontWeight: '600',
  color: color.black1,
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
  left: isTablet() ? horizontalScale(10) : horizontalScale(20),
};
const LEARNING_HOURS_VIEW_CONTAINER: ViewStyle = {
  marginTop: 20,
  flexDirection: 'row',
};
const LINE_CHART_CONTAINER: ViewStyle = {
  flex: 1,
  marginBottom: isTablet() ? verticalScale(90) : 0,
  marginHorizontal: isTablet() ? horizontalScale(15) : 0,
};
const LINE_CHART_ITEM: ViewStyle = {
  right: isTablet() ? 40 : 20,
};
