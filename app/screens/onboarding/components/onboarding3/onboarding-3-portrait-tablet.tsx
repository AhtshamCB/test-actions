import React from 'react';
import {Image, ImageBackground, TextStyle, View, ViewStyle} from 'react-native';
//
import {ButtonLinearGradientBorder, Screen, Text} from '@app/components';
import {typography, color, moderateScale} from '@app/theme';
import {Dot} from '@app/svg';
import {OnBording3PortraitTabSvg} from '@app/svg/onbording';
import {LinearGradientText} from 'react-native-linear-gradient-text';

const NEXT_IMAGE = require('../../images/next2.png');
const FOOTER = require('../../images/footer2.png');

export const OnBoarding3PortraitTablet = ({navigation}) => {
  return (
    <Screen preset="fixed" backgroundColor={color.purple2}>
      <View style={IMAGE_VIEW}>
        <OnBording3PortraitTabSvg
          width={moderateScale(450)}
          height={moderateScale(450)}
        />
      </View>
      <ImageBackground
        source={FOOTER}
        style={{...BODY, height: moderateScale(700)}}>
        <View style={CONTENT}>
          <LinearGradientText
            colors={['#DB14FB', '#FFC700']}
            text="AI-Powered Interactive Learning"
            start={{x: 0.0, y: 0.9}}
            textStyle={LINEAR_TEXT}
          />

          <Text
            text={'Smart, Personalized Lessons for Your Child.'}
            style={{...DESCRIPTION, fontSize: moderateScale(12)}}
          />
        </View>
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
    </Screen>
  );
};

const IMAGE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  marginTop: 0,
};

const DESCRIPTION: TextStyle = {
  fontWeight: '400',
  color: color.gray1,
  textAlign: 'center',
  fontFamily: typography.promptRegular,
  padding: 10,
};
const LINEAR_TEXT: TextStyle = {
  fontSize: moderateScale(46),
  fontFamily: typography.promptBold,
  fontWeight: '700',
  textAlign: 'center',
};

const BODY: ViewStyle = {
  flex: 1,
};
const CONTENT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
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
