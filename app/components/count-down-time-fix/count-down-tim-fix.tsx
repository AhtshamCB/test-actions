import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from '../text/text';
import moment from 'moment';
import {color, horizontalScale, moderateScale, typography} from '@app/theme';
import {TextStyle} from 'react-native';
import {ViewStyle} from 'react-native';
import {isTablet} from 'react-native-device-info';

interface CountdownProps {
  secondsFinish: number;
}
interface TimerTextProps {
  time: number;
  title: string;
}

export const CountDownTimeFix: React.FC<CountdownProps> = ({
  secondsFinish,
}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const countdownDate = moment();
    countdownDate.add(secondsFinish, 'seconds');

    const interval = setInterval(() => {
      const currentTime = moment();
      const secondsLeft = countdownDate.diff(currentTime, 'seconds');
      setTimeLeft(secondsLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsFinish]);

  const daysLeft = Math.floor(timeLeft / (24 * 60 * 60));
  const hoursLeft = Math.floor((timeLeft / (60 * 60)) % 24);
  const minutesLeft = Math.floor((timeLeft / 60) % 60);
  const secondsLeft = timeLeft % 60;

  return (
    <View style={CONTAINER}>
      <TimerText time={daysLeft} title={'DAYS'} />
      <TimerText time={hoursLeft} title={'HOURS'} />
      <TimerText time={minutesLeft} title={'MINUTES'} />
      <TimerText time={secondsLeft} title={'SECONDS'} />
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
};
const CONTAINER_TIME: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: isTablet() ? horizontalScale(40) : 60,
  height: isTablet() ? horizontalScale(25) : 60,
  borderRadius: isTablet() ? horizontalScale(40 / 2) : 30,
  backgroundColor: color.purple1,
  marginHorizontal: horizontalScale(6),
};
const TIME_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: isTablet() ? moderateScale(12) : moderateScale(20),
  color: color.purple,
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: isTablet() ? moderateScale(4.5) : moderateScale(8),
  color: color.purple,
};
