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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
const BACKGROUND_LANDSCAPE_TABLET = require('@app/components/images/background-landscape-tablet.png');
const LOGO = require('@app/components/images/logo.png');
const NEXT_ICON = require('@app/components/images/next-icon.png');

export const SignUpSuccessTabletLandscape = ({navigation}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  return (
    <View>
      <View style={CONTAINER_VIEW}>
        <ImageBackground
          source={BACKGROUND_LANDSCAPE_TABLET}
          style={[
            IMAGE_CONTAINER,
            {
              width:
                orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(240)
                  : horizontalScale(300),
              height:
                orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(800)
                  : verticalScale(600),
            },
          ]}>
          <Image
            source={BACKGROUND_STUDY}
            style={[
              IMAGE_BACKGROUND,
              {
                width:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(400)
                    : horizontalScale(300),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(400)
                    : verticalScale(250),
                marginTop:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(200)
                    : verticalScale(140),
                marginLeft:
                  orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(50)
                    : horizontalScale(20),
              },
            ]}
            resizeMode="contain"
          />
        </ImageBackground>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          scrollEnabled={true}
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled={true}
          enableAutomaticScroll={true}>
          <View style={BODY_VIEW}>
            <View style={CONTENT}>
              <Image source={LOGO} style={LOGO_IMAGE} resizeMode="contain" />
            </View>
            <View
              style={[
                BODY,
                {
                  marginTop:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(150)
                      : verticalScale(70),
                },
              ]}>
              <Text text={'Thank You'} style={TITLE} />
              <Text
                text={'Lets Make the Financial Future you Always Dreamt Of!'}
                style={SUBTITLE}
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
                  if (userInfo?.me?.role === 'parent') {
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
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: verticalScale(10),
};
const IMAGE_CONTAINER: ImageStyle = {
  alignItems: 'center',
  marginLeft: horizontalScale(-50),
};
const IMAGE_BACKGROUND: ImageStyle = {
  width: horizontalScale(300),
  height: verticalScale(250),
  marginTop: verticalScale(140),
};
const BODY_VIEW: ViewStyle = {
  flex: 1,
};
const CONTENT: ViewStyle = {
  paddingHorizontal: 20,
  flexDirection: 'row',
};
const BODY: ViewStyle = {
  marginHorizontal: 5,

  justifyContent: 'center',
  alignItems: 'center',
};
const LOGO_IMAGE: ImageStyle = {
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
const TITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(36),
  fontWeight: '700',
  color: color.purple,
};
const SUBTITLE: TextStyle = {
  fontFamily: typography.promptMedium,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.gray3,
  textAlign: 'center',
};
