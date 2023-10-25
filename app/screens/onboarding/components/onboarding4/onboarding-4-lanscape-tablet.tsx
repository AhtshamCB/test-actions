import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageStyle,
} from 'react-native';
//
import {
  ButtonLinearGradient,
  ButtonLinearGradientBorder,
  Text,
} from '@app/components';
import {color, moderateScale, typography, verticalScale} from '@app/theme';

import {LinearGradientText} from 'react-native-linear-gradient-text';
import {OnBording4MobileSvg} from '@app/svg/onbording';

const BACKGROUND_LANDSCAPE_TABLET = require('../../images/table-side-panel.png');

export const Onboarding4TabletLandscape = ({navigation}) => {
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
    <View style={CONTAINER_VIEW}>
      <View style={LEFT_CONTAINER}>
        <OnBording4MobileSvg width={'80%'} height={'80%'} />
      </View>

      <ImageBackground
        source={BACKGROUND_LANDSCAPE_TABLET}
        style={IMAGE_CONTAINER}>
        <View style={RIGHT_CONTAINER}>
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
            style={DESCRIPTION}
          />

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
              style={{...BUTTON_SYLE, marginLeft: 20}}
              innerStyle={BUTTON_INNER_STYLE}>
              <Text style={BUTTON_TEXT}>Educator & Student</Text>
            </ButtonLinearGradientBorder>
          </View>
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

const LEFT_CONTAINER: ImageStyle = {
  flex: 0.8,
  justifyContent: 'center',
  alignItems: 'center',
};

const IMAGE_CONTAINER: ImageStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const RIGHT_CONTAINER: ImageStyle = {
  width: '80%',
  height: '90%',
  alignItems: 'center',
  justifyContent: 'center',
};

const LINEAR_TEXT: TextStyle = {
  fontSize: moderateScale(25),
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
  marginTop: 20,
  alignItems: 'center',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
};

const BUTTON_SYLE: ViewStyle = {
  width: moderateScale(110),
  height: moderateScale(35),
  borderRadius: moderateScale(60),
  alignItems: 'center',
  justifyContent: 'center',
};

const BUTTON_INNER_STYLE: ViewStyle = {
  width: moderateScale(109),
  height: moderateScale(34),
  borderRadius: moderateScale(60),
};

const BUTTON_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: '600',
  fontFamily: typography.promptRegular,
  color: color.yellow4,
};
