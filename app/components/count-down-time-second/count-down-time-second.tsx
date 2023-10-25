/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {color, typography} from '@app/theme';
import React, {useEffect, useState} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {View, Text} from 'react-native';

interface CountdownTimerSecondProps {
  callBackWhenTimeUp?: () => void;
  timeCountDownSeconds?: number;
  customRenderCountDowntime?: (
    countdownTime: number,
  ) => JSX.Element | undefined;
  textStyle?: StyleProp<TextStyle>;
}

export const CountdownTimerSecond = ({
  callBackWhenTimeUp = undefined,
  timeCountDownSeconds = 15,
  customRenderCountDowntime = undefined,
  textStyle,
}: CountdownTimerSecondProps) => {
  const [countdownTime, setCountdownTime] =
    useState<number>(timeCountDownSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime(prevCountdownTime => prevCountdownTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdownTime === 0) {
      callBackWhenTimeUp && callBackWhenTimeUp();
    }
  }, [countdownTime]);

  const renderCountDownTime = (countdownTime: number) => {
    if (customRenderCountDowntime) {
      return customRenderCountDowntime(countdownTime);
    }
    return (
      <Text style={textStyle}>
        After{' '}
        <Text
          style={[
            textStyle,
            {
              fontFamily: typography.promptBold,
              fontWeight: '700',
              color: color.purple,
            },
          ]}>
          {countdownTime}s
        </Text>
        <Text style={textStyle}> we will show your results of the Quiz</Text>
      </Text>
    );
  };

  return (
    <View>
      {countdownTime >= 0 ? renderCountDownTime(countdownTime) : null}
    </View>
  );
};
