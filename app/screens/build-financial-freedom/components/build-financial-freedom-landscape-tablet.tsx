import React from 'react';
import {View, ViewStyle, TextStyle, Image} from 'react-native';
//
import {Text} from '@app/components';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

const BUILD_MY_WORLD = require('@app/components/images/background-build-my-world.png');

export const BuildFinancialFreedomLandscapeTablet = () => {
  const {orientationOpenApp} = useSelector(selector.config);

  return (
    <View style={CONTAINER}>
      <View>
        <Image
          source={BUILD_MY_WORLD}
          style={{
            width:
              orientationOpenApp === 'LANDSCAPE'
                ? horizontalScale(380)
                : horizontalScale(500),
            height:
              orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(570)
                : verticalScale(400),
          }}
          resizeMode="cover"
        />
      </View>
      <View style={CONTENT}>
        <Text
          text={'Coming Soon! 😍'}
          style={[
            TITLE_TEXT,
            {
              fontSize:
                orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(11)
                  : moderateScale(13),
            },
          ]}
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
const CONTENT: ViewStyle = {
  paddingHorizontal: 20,
  justifyContent: 'center',
  flex: 1,
  marginTop: verticalScale(-30),
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  textAlign: 'center',
  marginTop: verticalScale(-70),
  padding: 10,
};
