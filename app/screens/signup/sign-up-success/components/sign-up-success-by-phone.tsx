import React from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageBackground,
} from 'react-native';
//
import {useDispatch, useSelector} from 'react-redux';
import {selector, UserActions} from '@app/redux';
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
import {BackgroundStudy9} from '@app/svg';

const NEXT_ICON = require('@app/components/images/next-icon.png');
const HEADER_BACKGROUND = require('@app/components/images/header.png');

export const SignUpSuccessByPhone = ({navigation}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(selector.user);
  return (
    <View style={CONTAINER_VIEW}>
      <ImageBackground source={HEADER_BACKGROUND} style={BACKGROUND_CONTAINER}>
        <View style={IMAGE_VIEW}>
          <BackgroundStudy9 width={350} />
        </View>
      </ImageBackground>
      <View style={BODY}>
        <View style={CONTAINER_HEADER_VIEW}>
          <Text text={'Thank You'} style={CREATE_ACCOUNT_TITLE} />
          <Text
            text={'Congratulation! Your account has been successfully created'}
            style={DESCRIPTION}
          />
        </View>
        <View style={INPUT_CONTAINER}>
          <ButtonLinearGradient
            text={'Move To Dashboard'}
            style={BUTTON_LOGIN_VIEW}
            textStyle={TEXT_LOGIN}
            isIcon
            image={NEXT_ICON}
            onPress={async () => {
              if (userInfo?.me?.role === 'parent') {
                navigation.navigate('addKids');
                await AsyncStorage.setItem('isLogin', JSON.stringify(true));
                dispatch(UserActions.setIsLoggedIn(true));
              } else if (userInfo?.me?.role === 'school') {
                navigation.navigate('schoolDrawer');
                await AsyncStorage.setItem('isLogin', JSON.stringify(true));
                dispatch(UserActions.setIsLoggedIn(true));
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
const INPUT_CONTAINER: ViewStyle = {
  marginTop: 20,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  height: verticalScale(40),
  marginStart: 20,
  marginEnd: 20,
  flexDirection: 'row',
  marginTop: verticalScale(10),
};
const TEXT_LOGIN: TextStyle = {
  textAlign: 'center',
  fontSize: moderateScale(16),
  marginRight: horizontalScale(10),
};
const BODY: ViewStyle = {
  marginHorizontal: 5,
  marginTop: verticalScale(70),
};
const CONTAINER_HEADER_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
};
const BACKGROUND_CONTAINER: ImageStyle = {
  height: verticalScale(450),
  justifyContent: 'center',
  alignItems: 'center',
};
const CREATE_ACCOUNT_TITLE: TextStyle = {
  fontSize: moderateScale(36),
  fontWeight: '700',
  color: color.purple,
  fontFamily: typography.promptBold,
};

const DESCRIPTION: TextStyle = {
  fontSize: moderateScale(13),
  fontWeight: '400',
  color: color.gray1,
  fontFamily: typography.promptRegular,
  textAlign: 'center',
  marginTop: verticalScale(10),
};
const IMAGE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  marginTop: verticalScale(0),
};
