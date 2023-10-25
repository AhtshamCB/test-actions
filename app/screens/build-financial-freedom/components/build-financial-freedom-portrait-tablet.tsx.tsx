import React from 'react';
import {Image, View, ViewStyle} from 'react-native';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {Text} from '@app/components';
import {TextStyle} from 'react-native';
import {selector} from '@app/redux';
import {useSelector} from 'react-redux';

const BUILD_MY_WORLD = require('@app/components/images/background-build-my-world.png');

export const BuildFinancialFreedomPortraitTablet = () => {
  const {orientationOpenApp} = useSelector(selector.config);

  return (
    <View style={CONTAINER}>
      <View>
        <Image
          source={BUILD_MY_WORLD}
          style={{
            width:
              orientationOpenApp === 'LANDSCAPE'
                ? horizontalScale(300)
                : horizontalScale(400),
            height: verticalScale(500),
          }}
          resizeMode="cover"
        />
      </View>

      <View>
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
  backgroundColor: color.white,
};

const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  textAlign: 'center',
  padding: 10,
};
