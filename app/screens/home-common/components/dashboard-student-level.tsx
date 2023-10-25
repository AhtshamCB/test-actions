/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  Platform,
} from 'react-native';
import {isIPhone8PlusOrBelow, useOrientation} from '@app/hook';
import {selector} from '@app/redux';
import {color, horizontalScale, moderateScale, verticalScale} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';

const LEVEL_1 = require('../images/level1.png');
const LEVEL_2 = require('../images/level2.png');
const LEVEL_3 = require('../images/level3.png');
const LEVEL_4 = require('../images/level4.png');
const LEVEL_5 = require('../images/level5.png');
const LEVEL_1_LANDSCAPE = require('../images/level-1-landscape.png');
const LEVEL_2_LANDSCAPE = require('../images/level-2-landscape.png');
const LEVEL_3_LANDSCAPE = require('../images/level-3-landscape.png');
const LEVEL_4_LANDSCAPE = require('../images/level-4-landscape.png');
const LEVEL_5_LANDSCAPE = require('../images/level-5-landscape.png');
const TeePig = require('@app/components/images/teePig.json');

export const DashboardStudentLevel = () => {
  const orientation = useOrientation();
  const navigation: any = useNavigation();
  const {dashboardStudentCurrentLevel} = useSelector(selector.dashboard) || '';
  const {infoDashboardStudent} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  const onPressLevel = (level: string) => {
    navigation.navigate('levelLessonsDetail', {
      level: level,
      studentId: infoDashboardStudent?._id,
      isFromTeacherScreen: true,
    });
  };

  return (
    <View>
      {dashboardStudentCurrentLevel === 'level1' && (
        <ImageBackground
          source={isTablet() ? LEVEL_1_LANDSCAPE : LEVEL_1}
          resizeMode={
            isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? 'stretch'
                  : 'cover'
                : orientationOpenApp === 'LANDSCAPE'
                ? 'cover'
                : 'stretch'
              : Platform.OS === 'ios'
              ? 'stretch'
              : 'cover'
          }
          style={[
            IMAGE_LEVEL,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(350)
                    : verticalScale(280)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(550)
                  : verticalScale(400)
                : isIPhone8PlusOrBelow()
                ? verticalScale(650)
                : verticalScale(508),
              width: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(300)
                    : horizontalScale(380)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(450)
                  : horizontalScale(620)
                : horizontalScale(400),
              right: isTablet()
                ? orientation === 'PORTRAIT'
                  ? horizontalScale(3)
                  : horizontalScale(42)
                : horizontalScale(10),
              top: isTablet() ? (orientation === 'PORTRAIT' ? -5 : -10) : -3,
            },
          ]}>
          <View
            style={{
              right: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(120)
                    : horizontalScale(160)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(170)
                  : horizontalScale(220)
                : horizontalScale(140),
              bottom: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(-100)
                    : verticalScale(-80)
                  : verticalScale(-150)
                : verticalScale(60),
            }}>
            <Lottie
              source={TeePig}
              autoPlay
              loop
              autoSize
              style={{
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? horizontalScale(120)
                      : horizontalScale(150)
                    : horizontalScale(100)
                  : horizontalScale(100),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? verticalScale(120)
                      : verticalScale(150)
                    : verticalScale(100)
                  : verticalScale(100),
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_1,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(0)
                      : verticalScale(0)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(15)
                    : verticalScale(15)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(-190)
                  : verticalScale(-160),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(65)
                      : horizontalScale(90)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(100)
                    : horizontalScale(135)
                  : 10,
              },
            ]}
            onPress={() => {
              onPressLevel('level1');
            }}
          />
        </ImageBackground>
      )}
      {dashboardStudentCurrentLevel === 'level2' && (
        <ImageBackground
          source={isTablet() ? LEVEL_2_LANDSCAPE : LEVEL_2}
          resizeMode={
            isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? 'stretch'
                  : 'cover'
                : orientationOpenApp === 'LANDSCAPE'
                ? 'cover'
                : 'stretch'
              : Platform.OS === 'ios'
              ? 'stretch'
              : 'cover'
          }
          style={[
            IMAGE_LEVEL,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(350)
                    : verticalScale(280)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(550)
                  : verticalScale(430)
                : isIPhone8PlusOrBelow()
                ? verticalScale(650)
                : verticalScale(508),
              width: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(300)
                    : horizontalScale(380)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(450)
                  : horizontalScale(620)
                : horizontalScale(400),
              right: isTablet()
                ? orientation === 'PORTRAIT'
                  ? horizontalScale(3)
                  : horizontalScale(42)
                : horizontalScale(10),
              top: isTablet() ? (orientation === 'PORTRAIT' ? -5 : -10) : -3,
            },
          ]}>
          <View
            style={{
              right: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(100)
                    : horizontalScale(140)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(150)
                  : horizontalScale(200)
                : horizontalScale(160),
              top: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(20)
                    : verticalScale(20)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(0)
                  : verticalScale(0)
                : verticalScale(40),
            }}>
            <Lottie
              source={TeePig}
              autoPlay
              loop
              autoSize
              style={{
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? horizontalScale(120)
                      : horizontalScale(150)
                    : horizontalScale(100)
                  : horizontalScale(100),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? verticalScale(120)
                      : verticalScale(150)
                    : verticalScale(100)
                  : verticalScale(100),
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_2_1,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                bottom: verticalScale(120),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(40)
                      : verticalScale(25)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(60)
                    : verticalScale(55)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(-195)
                  : verticalScale(-150),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(65)
                      : horizontalScale(90)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(100)
                    : horizontalScale(135)
                  : 0,
              },
            ]}
            onPress={() => {
              onPressLevel('level1');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_2_2,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                bottom: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(125)
                      : verticalScale(105)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(170)
                    : verticalScale(130)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(85)
                  : verticalScale(80),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(55)
                      : horizontalScale(80)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(85)
                    : horizontalScale(110)
                  : isIPhone8PlusOrBelow()
                  ? horizontalScale(15)
                  : horizontalScale(10),
              },
            ]}
            onPress={() => {
              onPressLevel('level2');
            }}
          />
        </ImageBackground>
      )}
      {dashboardStudentCurrentLevel === 'level3' && (
        <ImageBackground
          source={isTablet() ? LEVEL_3_LANDSCAPE : LEVEL_3}
          resizeMode={
            isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? 'stretch'
                  : 'cover'
                : orientationOpenApp === 'LANDSCAPE'
                ? 'cover'
                : 'stretch'
              : Platform.OS === 'ios'
              ? 'stretch'
              : 'cover'
          }
          style={[
            IMAGE_LEVEL,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(350)
                    : verticalScale(280)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(550)
                  : verticalScale(430)
                : isIPhone8PlusOrBelow()
                ? verticalScale(650)
                : verticalScale(508),
              width: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(300)
                    : horizontalScale(380)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(450)
                  : horizontalScale(620)
                : horizontalScale(400),
              right: isTablet()
                ? orientation === 'PORTRAIT'
                  ? horizontalScale(3)
                  : horizontalScale(42)
                : horizontalScale(10),
              top: isTablet() ? (orientation === 'PORTRAIT' ? -5 : -10) : -3,
            },
          ]}>
          <View
            style={{
              right: isTablet() ? horizontalScale(0) : horizontalScale(165),
              top: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(0)
                    : verticalScale(10)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(0)
                  : verticalScale(0)
                : verticalScale(220),
            }}>
            <Lottie
              source={TeePig}
              autoPlay
              loop
              autoSize
              style={{
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? horizontalScale(120)
                      : horizontalScale(150)
                    : horizontalScale(100)
                  : horizontalScale(100),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? verticalScale(120)
                      : verticalScale(150)
                    : verticalScale(100)
                  : verticalScale(100),
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_3_1,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(70)
                      : verticalScale(50)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(80)
                    : verticalScale(70)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(-170)
                  : verticalScale(-120),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(65)
                      : horizontalScale(90)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(100)
                    : horizontalScale(135)
                  : 0,
              },
            ]}
            onPress={() => {
              onPressLevel('level1');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_3_2,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                bottom: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(90)
                      : verticalScale(70)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(120)
                    : verticalScale(80)
                  : verticalScale(50),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(45)
                      : horizontalScale(65)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(70)
                    : horizontalScale(95)
                  : horizontalScale(15),
              },
            ]}
            onPress={() => {
              onPressLevel('level2');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_3_3,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(-100)
                      : verticalScale(-85)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(-100)
                    : verticalScale(-70)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(90)
                  : verticalScale(40),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(-20)
                      : horizontalScale(-25)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(-30)
                    : horizontalScale(-45)
                  : horizontalScale(45),
              },
            ]}
            onPress={() => {
              onPressLevel('level3');
            }}
          />
        </ImageBackground>
      )}
      {dashboardStudentCurrentLevel === 'level4' && (
        <ImageBackground
          source={isTablet() ? LEVEL_4_LANDSCAPE : LEVEL_4}
          resizeMode={
            isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? 'stretch'
                  : 'cover'
                : orientationOpenApp === 'LANDSCAPE'
                ? 'cover'
                : 'stretch'
              : Platform.OS === 'ios'
              ? 'stretch'
              : 'cover'
          }
          style={[
            IMAGE_LEVEL,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(350)
                    : verticalScale(280)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(550)
                  : verticalScale(430)
                : isIPhone8PlusOrBelow()
                ? verticalScale(650)
                : verticalScale(508),
              width: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(300)
                    : horizontalScale(380)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(450)
                  : horizontalScale(620)
                : horizontalScale(400),
              right: isTablet()
                ? orientation === 'PORTRAIT'
                  ? horizontalScale(3)
                  : horizontalScale(42)
                : horizontalScale(10),
              top: isTablet() ? (orientation === 'PORTRAIT' ? -5 : -10) : -3,
            },
          ]}>
          <View
            style={{
              left: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(70)
                    : horizontalScale(95)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(110)
                  : horizontalScale(150)
                : horizontalScale(70),
              top: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(230)
                    : verticalScale(200)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(280)
                  : verticalScale(230)
                : verticalScale(230),
            }}>
            <Lottie
              source={TeePig}
              autoPlay
              loop
              autoSize
              style={{
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? horizontalScale(120)
                      : horizontalScale(150)
                    : horizontalScale(100)
                  : horizontalScale(100),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? verticalScale(120)
                      : verticalScale(150)
                    : verticalScale(100)
                  : verticalScale(100),
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_4_1,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(100)
                      : verticalScale(85)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(120)
                    : verticalScale(110)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(-140)
                  : verticalScale(-90),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(70)
                      : horizontalScale(90)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(103)
                    : horizontalScale(135)
                  : horizontalScale(0),
              },
            ]}
            onPress={() => {
              onPressLevel('level1');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_4_2,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(50)
                      : horizontalScale(65)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(70)
                    : horizontalScale(95)
                  : horizontalScale(15),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(-50)
                      : verticalScale(-40)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(-80)
                    : verticalScale(-50)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(-30)
                  : verticalScale(-20),
              },
            ]}
            onPress={() => {
              onPressLevel('level2');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_4_3,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(-50)
                      : verticalScale(-40)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(-40)
                    : verticalScale(-30)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(120)
                  : verticalScale(70),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? horizontalScale(-20)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(-25)
                    : horizontalScale(-35)
                  : isIPhone8PlusOrBelow()
                  ? horizontalScale(65)
                  : horizontalScale(60),
              },
            ]}
            onPress={() => {
              onPressLevel('level3');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_4_4,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                bottom: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(150)
                      : verticalScale(125)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(150)
                    : verticalScale(120)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(65)
                  : verticalScale(90),
                left: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(60)
                      : horizontalScale(80)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(95)
                    : horizontalScale(125)
                  : horizontalScale(35),
              },
            ]}
            onPress={() => {
              onPressLevel('level4');
            }}
          />
        </ImageBackground>
      )}
      {dashboardStudentCurrentLevel === 'level5' && (
        <ImageBackground
          source={isTablet() ? LEVEL_5_LANDSCAPE : LEVEL_5}
          resizeMode={
            isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? 'stretch'
                  : 'cover'
                : orientationOpenApp === 'LANDSCAPE'
                ? 'cover'
                : 'stretch'
              : Platform.OS === 'ios'
              ? 'stretch'
              : 'cover'
          }
          style={[
            IMAGE_LEVEL,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(350)
                    : verticalScale(280)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(550)
                  : verticalScale(430)
                : isIPhone8PlusOrBelow()
                ? verticalScale(650)
                : verticalScale(508),
              width: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(300)
                    : horizontalScale(380)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(450)
                  : horizontalScale(620)
                : horizontalScale(400),
              right: isTablet()
                ? orientation === 'PORTRAIT'
                  ? horizontalScale(3)
                  : horizontalScale(42)
                : horizontalScale(10),
              top: isTablet() ? (orientation === 'PORTRAIT' ? -5 : -10) : -3,
            },
          ]}>
          <View
            style={{
              left: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(95)
                    : horizontalScale(135)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(150)
                  : horizontalScale(190)
                : horizontalScale(150),
              bottom: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(-100)
                    : verticalScale(-100)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(-50)
                  : verticalScale(-40)
                : verticalScale(30),
            }}>
            <Lottie
              source={TeePig}
              autoPlay
              loop
              autoSize
              style={{
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? horizontalScale(120)
                      : horizontalScale(150)
                    : horizontalScale(100)
                  : horizontalScale(100),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? orientation === 'PORTRAIT'
                      ? verticalScale(120)
                      : verticalScale(150)
                    : verticalScale(100)
                  : verticalScale(100),
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_5_1,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(140)
                      : verticalScale(110)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(150)
                    : verticalScale(130)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(-120)
                  : verticalScale(-60),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(65)
                      : horizontalScale(95)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(100)
                    : horizontalScale(135)
                  : isIPhone8PlusOrBelow()
                  ? horizontalScale(0)
                  : horizontalScale(5),
              },
            ]}
            onPress={() => {
              onPressLevel('level1');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_5_2,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? verticalScale(-30)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(-40)
                    : verticalScale(-20)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(0)
                  : verticalScale(10),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(45)
                      : horizontalScale(65)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(70)
                    : horizontalScale(95)
                  : isIPhone8PlusOrBelow()
                  ? horizontalScale(15)
                  : horizontalScale(20),
              },
            ]}
            onPress={() => {
              onPressLevel('level2');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_5_3,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? verticalScale(-15)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(-10)
                    : verticalScale(0)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(145)
                  : verticalScale(100),
                right: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? horizontalScale(-20)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(-25)
                    : horizontalScale(-30)
                  : horizontalScale(60),
              },
            ]}
            onPress={() => {
              onPressLevel('level3');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_5_5,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                bottom: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(250)
                      : verticalScale(200)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(330)
                    : verticalScale(260)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(215)
                  : verticalScale(200),
                left: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(40)
                      : horizontalScale(55)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(65)
                    : horizontalScale(85)
                  : isIPhone8PlusOrBelow()
                  ? horizontalScale(50)
                  : horizontalScale(55),
              },
            ]}
            onPress={() => {
              onPressLevel('level5');
            }}
          />
          <TouchableOpacity
            style={[
              BUTTON_LEVEL_5_4,
              {
                width: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(30)
                    : horizontalScale(40)
                  : horizontalScale(50),
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(70)
                    : verticalScale(60)
                  : verticalScale(50),
                bottom: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(180)
                      : verticalScale(150)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(185)
                    : verticalScale(145)
                  : isIPhone8PlusOrBelow()
                  ? verticalScale(100)
                  : verticalScale(120),
                left: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(65)
                      : horizontalScale(90)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(100)
                    : horizontalScale(132)
                  : isIPhone8PlusOrBelow()
                  ? horizontalScale(35)
                  : horizontalScale(40),
              },
            ]}
            onPress={() => {
              onPressLevel('level4');
            }}
          />
        </ImageBackground>
      )}
    </View>
  );
};

const IMAGE_LEVEL: ImageStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const BUTTON_LEVEL_1: ViewStyle = {
  backgroundColor: color.transparent,
  width: horizontalScale(30),
  height: verticalScale(30),
  borderRadius: moderateScale(50),
  right: 6,
};
const BUTTON_LEVEL_2_1: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
  right: 5,
};
const BUTTON_LEVEL_2_2: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_3_1: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
  right: 5,
};
const BUTTON_LEVEL_3_2: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_3_3: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_4_1: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_4_2: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_4_3: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_4_4: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_5_1: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_5_2: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_5_3: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_5_4: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
const BUTTON_LEVEL_5_5: ViewStyle = {
  backgroundColor: color.transparent,
  borderRadius: moderateScale(50),
};
