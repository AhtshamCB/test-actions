import React from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageStyle,
  Image,
} from 'react-native';
//
import {ButtonLinearGradientBorder, Text} from '@app/components';
import {color, moderateScale, typography, verticalScale} from '@app/theme';
import {Dot} from '@app/svg';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {OnBording2MobileSvg} from '@app/svg/onbording';

const BACKGROUND_LANDSCAPE_TABLET = require('../../images/table-side-panel.png');
const NEXT_IMAGE = require('../../images/next.png');

export const Onboarding2TabletLandscape = ({navigation}) => {
  return (
    <View style={CONTAINER_VIEW}>
      <View style={LEFT_CONTAINER}>
        <OnBording2MobileSvg width={'80%'} height={'80%'} />
      </View>

      <ImageBackground
        source={BACKGROUND_LANDSCAPE_TABLET}
        style={IMAGE_CONTAINER}>
        <Text text={'Unlock'} style={{...TITLE, fontSize: moderateScale(24)}} />
        <LinearGradientText
          colors={['#DB14FB', '#FFC700']}
          text="Financial Wisdom"
          start={{x: 0.0, y: 0.9}}
          textStyle={LINEAR_TEXT}
        />

        <Text
          text={'Game-based Curriculums Teach Your Child Smart Money Habits'}
          style={DESCRIPTION}
        />

        <View style={BUTTON_CONTAINER}>
          <Dot activeDot={1} dotsCount={4} props={undefined} />
          <ButtonLinearGradientBorder
            style={BUTTON_OUTER_STYLE}
            innerStyle={BUTTON_INNER_STYLE}
            onPress={() => navigation.navigate('onboarding3')}>
            <Image source={NEXT_IMAGE} />
          </ButtonLinearGradientBorder>
        </View>
      </ImageBackground>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flexDirection: 'row',
  flex: 1,
  marginTop: verticalScale(10),
  backgroundColor: color.yellow3,
};
const IMAGE_CONTAINER: ImageStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const LEFT_CONTAINER: ImageStyle = {
  flex: 0.8,
  justifyContent: 'center',
  alignItems: 'center',
};
const TITLE: TextStyle = {
  fontWeight: '400',
  color: color.black1,
  fontFamily: typography.promptRegular,
};

const LINEAR_TEXT: TextStyle = {
  fontSize: moderateScale(30),
  fontFamily: typography.promptBold,
  fontWeight: '700',
};

const DESCRIPTION: TextStyle = {
  fontWeight: '400',
  color: color.gray1,
  textAlign: 'center',
  fontFamily: typography.promptRegular,
  padding: 10,
  fontSize: moderateScale(9),
};

const BUTTON_CONTAINER: ViewStyle = {
  marginBottom: 50,
  alignItems: 'center',
  width: '100%',
};

const BUTTON_OUTER_STYLE: ViewStyle = {
  width: moderateScale(190),
  height: moderateScale(55),
  borderRadius: moderateScale(150),
  marginTop: 20,
};

const BUTTON_INNER_STYLE: ViewStyle = {
  width: moderateScale(175),
  height: moderateScale(40),
  borderRadius: moderateScale(150),
};
