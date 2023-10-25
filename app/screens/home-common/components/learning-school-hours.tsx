/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ViewStyle, TextStyle, Platform} from 'react-native';
import {selector} from '@app/redux';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {Text, BarChart} from '@app/components';
import {useSelector} from 'react-redux';
import {isTablet} from 'react-native-device-info';
import {BanIcon} from '@app/svg';
import {isIPhone8PlusOrBelow, useOrientation} from '@app/hook';

export const LearningSchoolHours = dataSource => {
  const res = dataSource?.dataSource?.map((item, index) => ({
    value: item.learningTime,
    label: item.name,
    text: item.learningTimeStr,
    frontColor: index % 2 === 0 ? color.purple : color.yellow,
  }));

  const maxLearningTime = dataSource?.dataSource?.reduce(
    (max, item) => Math.max(max, item.learningTime),
    0,
  );

  const {orientationOpenApp} = useSelector(selector.config);
  const orientation = useOrientation();

  const renderLinechart = () => {
    if (dataSource?.dataSource && dataSource?.dataSource.length > 0) {
      return (
        <BarChart
          maxValue={maxLearningTime}
          width={dataSource?.dataSource.length < 5 ? horizontalScale(1000) : 0}
          roundToDigits={2}
          noOfSections={5}
          barWidth={40}
          showYAxisIndices
          showFractionalValues
          data={res}
          dashGap={4}
          dashWidth={1}
          xAxisType="dashed"
          showVerticalLines={true}
          yAxisColor={'lightgray'}
          xAxisColor={'lightgray'}
          initialSpacing={horizontalScale(10)}
          spacing={horizontalScale(20)}
          xAxisTextNumberOfLines={2}
          xAxisLabelTextStyle={{
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(6)
                : moderateScale(7)
              : isIPhone8PlusOrBelow()
              ? moderateScale(9)
              : moderateScale(8),
            textAlign: 'center',
            top: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(20)
                  : verticalScale(15)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(20)
                : verticalScale(15)
              : verticalScale(5),
            height:
              Platform.OS === 'android'
                ? verticalScale(30)
                : isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(40)
                    : verticalScale(30)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(40)
                  : verticalScale(30)
                : verticalScale(25),
          }}
          yAxisTextStyle={{
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(7)
                : moderateScale(8)
              : moderateScale(10),
          }}
          renderTooltip={item => (
            <View
              style={[
                TOOL_TIP_CONTAINER,
                {
                  height: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(40)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40)
                    : verticalScale(40),
                  right: horizontalScale(20),
                },
              ]}>
              <Text
                text={item?.label}
                style={[
                  TOOL_TIP_TEXT,
                  {
                    color: color.black1,
                    fontSize: isTablet()
                      ? orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(12)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(10)
                        : moderateScale(12)
                      : moderateScale(12),
                  },
                ]}
              />
              <Text
                text={item?.text}
                style={[
                  TOOL_TIP_TEXT,
                  {
                    fontSize: isTablet()
                      ? orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(12)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(10)
                        : moderateScale(12)
                      : moderateScale(12),
                  },
                ]}
              />
            </View>
          )}
        />
      );
    } else {
      return (
        <View style={NO_DATA_VIEW}>
          <BanIcon width={15} height={15} fill={color.gray3} />
          <Text
            text={'No Data Available'}
            style={[
              NO_DATA_TEXT,
              {
                fontSize:
                  orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(10)
                    : moderateScale(12),
              },
            ]}
          />
        </View>
      );
    }
  };

  return (
    <View style={ACTIVITY_CONTAINER}>
      <Text
        text={'Class Learning Hours'}
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
      <View
        style={[
          LEARNING_HOURS_VIEW_CONTAINER,
          {
            marginVertical:
              Platform.OS === 'android'
                ? verticalScale(15)
                : isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(30)
                    : verticalScale(10)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(30)
                  : verticalScale(10)
                : verticalScale(10),
          },
        ]}>
        {renderLinechart()}
      </View>
    </View>
  );
};

const ACTIVITY_CONTAINER: ViewStyle = {
  height: 'auto',
  backgroundColor: color.white,
  width: '100%',
  marginStart: isTablet() ? 10 : 50,
  marginEnd: isTablet() ? 10 : 50,
  marginTop: isTablet() ? verticalScale(25) : 20,
  borderRadius: 5,
  marginBottom: 20,
};
const ACTIVITIES_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontWeight: '600',
  color: color.black1,
};
const LEARNING_HOURS_VIEW_CONTAINER: ViewStyle = {
  marginTop:
    Platform.OS === 'android'
      ? verticalScale(5)
      : isTablet()
      ? verticalScale(5)
      : verticalScale(10),
  flexDirection: 'row',
  marginLeft: horizontalScale(5),
};
const TOOL_TIP_CONTAINER: ViewStyle = {
  marginBottom: verticalScale(5),
  backgroundColor: color.white,
  width: 'auto',

  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: color.black1,
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 20,
  paddingHorizontal: horizontalScale(20),
};
const TOOL_TIP_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,

  fontWeight: '400',
  color: color.purple,
  textAlign: 'center',
  textAlignVertical: 'top',
};
const NO_DATA_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row',
};
const NO_DATA_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray3,
  textAlign: 'center',
  paddingHorizontal: horizontalScale(10),
};
