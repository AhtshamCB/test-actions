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
import {OnBording3MobileSvg} from '@app/svg/onbording';

const BACKGROUND_LANDSCAPE_TABLET = require('../../images/table-side-panel.png');
const NEXT_IMAGE = require('../../images/next.png');

export const Onboarding3TabletLandscape = ({navigation}) => {
  return (
    <View style={CONTAINER_VIEW}>
      <View style={LEFT_CONTAINER}>
        <OnBording3MobileSvg width={'80%'} height={'80%'} />
      </View>

      <ImageBackground
        source={BACKGROUND_LANDSCAPE_TABLET}
        style={IMAGE_CONTAINER}>
        <LinearGradientText
          colors={['#DB14FB', '#FFC700']}
          text="AI-Powered"
          start={{x: 0.0, y: 0.9}}
          textStyle={{...LINEAR_TEXT, fontSize: moderateScale(36)}}
        />

        <LinearGradientText
          colors={['#DB14FB', '#FFC700']}
          text="Interactive Learning"
          start={{x: 0.0, y: 0.9}}
          textStyle={LINEAR_TEXT}
        />

        <Text
          text={'Smart, Personalized Lessons for Your Child.'}
          style={DESCRIPTION}
        />

        <View style={BUTTON_CONTAINER}>
          <Dot activeDot={2} dotsCount={4} props={undefined} />
          <ButtonLinearGradientBorder
            style={BUTTON_OUTER_STYLE}
            innerStyle={BUTTON_INNER_STYLE}
            onPress={() => navigation.navigate('onboarding4')}>
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
  backgroundColor: color.purple2,
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

const LINEAR_TEXT: TextStyle = {
  fontSize: moderateScale(23),
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
