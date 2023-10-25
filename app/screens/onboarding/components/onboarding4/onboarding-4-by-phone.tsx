import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImageBackground, TextStyle, View, ViewStyle} from 'react-native';
//
import {
  Screen,
  Text,
  ButtonLinearGradient,
  ButtonLinearGradientBorder,
} from '@app/components';
import {typography, color, verticalScale, moderateScale} from '@app/theme';
import {OnBording4MobileSvg} from '@app/svg/onbording';
//
import {LinearGradientText} from 'react-native-linear-gradient-text';

const FOOTER = require('../../images/footer2.png');

export const OnBoarding4ByPhone = ({navigation}) => {
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
        <OnBording4MobileSvg />
      </View>
      <ImageBackground source={FOOTER} style={BODY}>
        <View style={CONTENT}>
          <LinearGradientText
            colors={['#DB14FB', '#FFC700', '#FFC700']}
            text="Ready to"
            start={{x: 0.0, y: 0.2}}
            textStyle={LINEAR_TEXT}
          />
          <LinearGradientText
            colors={['#DB14FB', '#FFC700', '#FFC700']}
            text="Begin?"
            start={{x: 0.0, y: 0.2}}
            textStyle={LINEAR_TEXT}
          />
          <Text
            text={'Leave A Financial Legacy for Your Child from Today'}
            style={DESCRIPTION}
          />
        </View>
        <View style={BUTTON_CONTAINER}>
          <ButtonLinearGradient
            onPress={parentKidOnPress}
            text={'Parent & Kid'}
            style={BUTTON_SYLE}
          />
          <ButtonLinearGradientBorder
            preset="white"
            innerButtonColors={['#ffffff', '#ffffff']}
            borderColors={['#DB14FB', '#ffbb00']}
            onPress={() => navigation.navigate('loginEducator')}
            style={{...BUTTON_SYLE, marginTop: 15}}
            innerStyle={BUTTON_INNER_SYLE}>
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
  marginTop: 10,
};

const DESCRIPTION: TextStyle = {
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
};
const LINEAR_TEXT: TextStyle = {
  fontSize: moderateScale(32),
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
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

const BUTTON_SYLE: ViewStyle = {
  borderRadius: 25,
  width: 250,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
};

const BUTTON_INNER_SYLE: ViewStyle = {
  height: 48,
  width: 248,
};

const BUTTON_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: '600',
  fontFamily: typography.promptRegular,
  color: color.yellow4,
};
