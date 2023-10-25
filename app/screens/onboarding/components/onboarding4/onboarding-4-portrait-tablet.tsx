import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImageBackground, TextStyle, View, ViewStyle} from 'react-native';
//
import {
  ButtonLinearGradient,
  ButtonLinearGradientBorder,
  Screen,
  Text,
} from '@app/components';
import {typography, color, moderateScale} from '@app/theme';

import {OnBording4PortraitTabSvg} from '@app/svg/onbording';
//
import {LinearGradientText} from 'react-native-linear-gradient-text';
const FOOTER = require('../../images/footer2.png');

export const OnBoarding4PortraitTablet = ({navigation}) => {
  const [isFinishedOnboarding, setIsFinishedOnboarding] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const isFinishOnboarding = await AsyncStorage.getItem(
          'isFinishOnboarding',
        );
        setIsFinishedOnboarding(isFinishOnboarding);
      } catch (e) {
        console.log('e', e);
      } finally {
      }
    })();
  }, []);

  const parentKidOnPress = async () => {
    if (isFinishedOnboarding) {
      navigation.navigate('login');
    } else {
      await AsyncStorage.setItem('isFinishOnboarding', JSON.stringify(true));
      navigation.navigate('login');
    }
  };

  return (
    <Screen preset="fixed" backgroundColor={color.yellow3}>
      <View style={IMAGE_VIEW}>
        <OnBording4PortraitTabSvg
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
            text="Ready to Begin?"
            start={{x: 0.0, y: 0.9}}
            textStyle={LINEAR_TEXT}
          />

          <Text
            text={
              'Leave A Financial Legacy for Your Child and Students from Today'
            }
            style={{...DESCRIPTION, fontSize: moderateScale(12)}}
          />
        </View>
        <View style={BUTTON_CONTAINER}>
          <ButtonLinearGradient
            onPress={parentKidOnPress}
            text={'Parent & Kid'}
            style={BUTTON_SYLE}
            textStyle={{...BUTTON_TEXT, color: '#fff'}}
          />
          <ButtonLinearGradientBorder
            preset="white"
            innerButtonColors={['#ffffff', '#ffffff']}
            borderColors={['#DB14FB', '#ffbb00']}
            onPress={() => navigation.navigate('loginEducator')}
            style={{...BUTTON_SYLE}}
            innerStyle={BUTTON_INNER_STYLE}>
            <Text style={BUTTON_TEXT}>Educator & Student</Text>
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
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: '10%',
};

const BUTTON_INNER_STYLE: ViewStyle = {
  width: moderateScale(188),
  height: moderateScale(53),
  borderRadius: moderateScale(150),
};

const BUTTON_SYLE: ViewStyle = {
  width: moderateScale(190),
  height: moderateScale(55),
  borderRadius: moderateScale(150),
  alignItems: 'center',
  justifyContent: 'center',
};

const BUTTON_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: '600',
  fontFamily: typography.promptRegular,
  color: color.yellow4,
};
