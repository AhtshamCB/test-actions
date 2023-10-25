import React from 'react';
import {View, ViewStyle} from 'react-native';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {Text} from '@app/components';
import {TextStyle} from 'react-native';
import Lottie from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

const HOURGLASS = require('../images/hourglass.json');
const BUILD_MY_WORLD = require('@app/components/images/background-build-my-world.png');

export const BuildFinancialFreedomByPhone = () => {
  return (
    <View style={CONTAINER}>
      <View>
        <FastImage
          source={BUILD_MY_WORLD}
          style={{width: horizontalScale(380), height: verticalScale(280)}}
          resizeMode={'cover'}
        />
      </View>
      <Text text={'Coming soon! ❤️'} style={TITLE_TEXT} />
      <View style={ICON_VIEW}>
        <Lottie source={HOURGLASS} autoPlay loop autoSize style={LOTTIE} />
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(15),
  color: color.black1,
  textAlign: 'center',
  marginTop: verticalScale(10),
  padding: 10,
};
const ICON_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(15),
};
const LOTTIE: ViewStyle = {
  width: horizontalScale(100),
  height: verticalScale(100),
};
