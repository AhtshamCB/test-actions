import React from 'react';
import {Image, ImageBackground, TextStyle, View, ViewStyle} from 'react-native';
//
import {Screen, Text, ButtonLinearGradientBorder} from '@app/components';
import {typography, color, verticalScale, moderateScale} from '@app/theme';
import {OnBording2MobileSvg} from '@app/svg/onbording';
import {Dot} from '@app/svg';
//
import {LinearGradientText} from 'react-native-linear-gradient-text';

const NEXT_IMAGE = require('../../images/next2.png');
const FOOTER = require('../../images/footer2.png');

export const OnBoarding2ByPhone = ({navigation}) => {
  return (
    <Screen preset="fixed" backgroundColor={color.yellow3}>
      <View style={IMAGE_VIEW}>
        <OnBording2MobileSvg />
      </View>
      <ImageBackground source={FOOTER} style={BODY}>
        <View style={CONTENT}>
          <Text text={'Unlock'} style={TITLE} />
          <LinearGradientText
            colors={['#DB14FB', '#FFC700', '#FFC700']}
            text="Financial Wisdom "
            start={{x: 0.0, y: 0.2}}
            textStyle={LINEAR_TEXT}
          />
          <Text
            text={'Game-based Curriculums Teach Your Child Smart Money Habits'}
            style={DESCRIPTION}
          />
        </View>
        <View style={BUTTON_CONTAINER}>
          <Dot activeDot={1} dotsCount={4} props={undefined} />
          <ButtonLinearGradientBorder
            onPress={() => navigation.navigate('onboarding3')}>
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
  marginTop: 10,
};
const TITLE: TextStyle = {
  fontSize: moderateScale(24),
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
};
const DESCRIPTION: TextStyle = {
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
};
const LINEAR_TEXT: TextStyle = {
  fontSize: moderateScale(36),
  fontFamily: typography.promptBold,
};

const BODY: ViewStyle = {
  marginTop: 50,
  paddingHorizontal: 30,
  flex: 1,
  height: verticalScale(700),
};
const CONTENT: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
};

const BUTTON_CONTAINER: ViewStyle = {
  marginBottom: 30,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};
