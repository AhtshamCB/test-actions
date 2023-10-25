import React, {useState, useEffect} from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {color, horizontalScale, moderateScale, typography} from '@app/theme';
import {Text} from '@app/components';

interface TimerTextProps {
  time: number;
  title: string;
}

const CountdownTimer = ({initialMinutes, initialSeconds}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval: any = null;

    if (minutes === 0 && seconds === 0) {
      // Timer has reached zero, reset to initial values
      clearInterval(interval);
      return;
    }

    interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  return (
    <View style={CONTAINER}>
      <View style={CONTAINER_TIME}>
        <TimerText
          time={minutes.toString().padStart(2, '0')}
          title={'MINUTES'}
        />
      </View>
      <View>
        <TimerText
          time={seconds.toString().padStart(2, '0')}
          title={'SECONDS'}
        />
      </View>
    </View>
  );
};

const TimerText = ({time, title}: TimerTextProps) => {
  return (
    <View style={CONTAINER_TIME}>
      <Text text={`${time}`} style={TIME_TEXT} />
      <Text text={title} style={TITLE_TEXT} />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
const CONTAINER_TIME: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: isTablet() ? horizontalScale(40) : 50,
  height: isTablet() ? horizontalScale(25) : 50,
  borderRadius: isTablet() ? horizontalScale(40 / 2) : 30,
  backgroundColor: color.purple1,
  marginHorizontal: horizontalScale(6),
};
const TIME_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: isTablet() ? moderateScale(12) : moderateScale(14),
  color: color.purple,
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: isTablet() ? moderateScale(4.5) : moderateScale(6),
  color: color.purple,
};

export default CountdownTimer;
