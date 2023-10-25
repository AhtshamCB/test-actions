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
import {ButtonLinearGradient, Text} from '@app/components';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selector, UserActions} from '@app/redux';
import {useDispatch, useSelector} from 'react-redux';

const BACKGROUND_STUDY = require('@app/components/images/background-study-7.png');
const BACKGROUND_PORTRAIT_TABLET = require('@app/components/images/background-portrait-tablet.png');
const LOGO = require('@app/components/images/logo.png');
const NEXT_ICON = require('@app/components/images/next-icon.png');

export const SignUpSuccessTabletPortrait = ({navigation}) => {
  const dispatch = useDispatch();
  const {orientationOpenApp} = useSelector(selector.config);
  const {userInfo} = useSelector(selector.user);

  return (
    <View>
      <View style={CONTENT}>
        <View style={BODY}>
          <View style={LOGO_VIEW}>
            <Image source={LOGO} style={IMAGE_LOGO} resizeMode="contain" />
          </View>

          <View
            style={[
              INPUT_CONTAINER,
              {
                marginTop:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(250)
                    : verticalScale(200),
                marginLeft:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(20)
                    : horizontalScale(10),
              },
            ]}>
            <Text
              text={'Thank You'}
              style={[
                TITLE,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(34)
                      : moderateScale(38),
                },
              ]}
            />
            <Text
              text={'Lets Make the Financial Future you Always Dreamt Of!'}
              style={[
                SUBTITLE,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(12),
                },
              ]}
            />
            <ButtonLinearGradient
              text={'Move To Dashboard'}
              style={[
                BUTTON_LOGIN_VIEW,
                {
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(60)
                      : verticalScale(40),
                  width:
                    orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(150)
                      : horizontalScale(180),
                },
              ]}
              textStyle={[
                TEXT_LOGIN,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(12),
                },
              ]}
              isIcon
              image={NEXT_ICON}
              onPress={async () => {
                if (userInfo?.role === 'parent') {
                  navigation.navigate('addKids');
                  await AsyncStorage.setItem('isLogin', JSON.stringify(true));
                  dispatch(UserActions.setIsLoggedIn(true));
                } else {
                  navigation.navigate('schoolDrawer');
                  await AsyncStorage.setItem('isLogin', JSON.stringify(true));
                  dispatch(UserActions.setIsLoggedIn(true));
                }
              }}
            />
          </View>
        </View>

        <ImageBackground
          source={BACKGROUND_PORTRAIT_TABLET}
          style={[
            IMAGE_BACKGROUND,
            {
              width:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(130)
                  : horizontalScale(180),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(1100)
                  : verticalScale(850),
            },
          ]}>
          <Image
            source={BACKGROUND_STUDY}
            style={{
              width:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(100)
                  : horizontalScale(200),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(350)
                  : verticalScale(250),
              marginTop: verticalScale(20),
            }}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>
    </View>
  );
};

const CONTENT: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(20),
};
const BODY: ViewStyle = {
  flex: 1,
  paddingHorizontal: 10,
};
const LOGO_VIEW: ViewStyle = {
  paddingHorizontal: 10,
  flexDirection: 'row',
};
const TITLE: TextStyle = {
  fontFamily: typography.promptBold,

  fontWeight: '700',
  color: color.purple,
  marginBottom: verticalScale(10),
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '400',
  color: color.gray3,
  textAlign: 'center',
};

const INPUT_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const IMAGE_BACKGROUND: ImageStyle = {
  width: horizontalScale(180),
  height: verticalScale(850),
  alignItems: 'center',
};
const IMAGE_LOGO: ImageStyle = {
  width: 200,
  height: 97,
  marginTop: verticalScale(40),
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,

  marginTop: verticalScale(20),
  marginLeft: horizontalScale(10),
  flexDirection: 'row',
};

const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',

  marginRight: horizontalScale(5),
};
