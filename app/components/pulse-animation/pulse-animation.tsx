/* eslint-disable react-hooks/exhaustive-deps */
import {color} from '@app/theme';
import React, {useState, useEffect, FC} from 'react';
import {View, Animated, Easing, ViewStyle} from 'react-native';
import {PulseAnimationProps} from './pulse-animation.props';

export const PulseAnimation: FC<PulseAnimationProps> = ({circleColor}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.7,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  return (
    <View style={CONTAINER}>
      <View style={CIRCLE_CONTAINER}>
        <Animated.View
          style={[CIRCLE, {transform: [{scale: scaleValue}]}, circleColor]}
        />
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const CIRCLE_CONTAINER: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 100,
  backgroundColor: color.white,
  justifyContent: 'center',
  alignItems: 'center',
};
const CIRCLE: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 50,
  backgroundColor: color.green,
};
