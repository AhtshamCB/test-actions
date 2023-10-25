/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from '@app/components';
import {HomeIcon, LeaderboardTabIcon, ManageKidsIcon} from '@app/svg';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {Animated, Platform, TouchableOpacity, ViewStyle} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {LeaderboardSchool, ManageStudents, SchoolHome} from '@app/screens';
import {TextStyle} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

export function BottomTabbarClass() {
  const {orientationOpenApp} = useSelector(selector.config);

  const _renderIcon = (routeName: string, selectedTab: any) => {
    if (routeName === 'Home') {
      return (
        <HomeIcon
          fill={routeName === selectedTab ? color.purple : color.black1}
          props={undefined}
        />
      );
    } else if (
      routeName === 'Manage Classes' ||
      routeName === 'Manage Students'
    ) {
      return (
        <ManageKidsIcon
          fill={routeName === selectedTab ? color.purple : color.black1}
          props={undefined}
        />
      );
    } else if (routeName === 'Leaderboard') {
      return (
        <LeaderboardTabIcon
          fill={routeName === selectedTab ? color.purple : color.black1}
          props={undefined}
        />
      );
    }
  };

  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(routeName);
        }}
        style={TABBAR_ITEM}>
        {_renderIcon(routeName, selectedTab)}
        {selectedTab === routeName && (
          <Text
            text={routeName}
            style={[
              TEXT_BOTTOM_TABBAR,
              {
                color: selectedTab === routeName ? color.purple : color.black1,
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(8)
                    : moderateScale(10)
                  : moderateScale(10),
              },
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={BOTTOM_BAR}
      shadowStyle={SHADOW}
      height={70}
      circleWidth={50}
      bgColor={color.white}
      initialRouteName="Home"
      borderTopLeftRight
      screenOptions={{
        headerShown: false,
      }}
      renderCircle={({navigate, routeName, selectedTab}) => {
        return (
          <Animated.View style={BTN_CIRCEL_DOWN}>
            <TouchableOpacity
              style={[
                BTN_CIRCEL_DOWN_VIEW,
                {
                  marginTop:
                    selectedTab === 'Manage Students'
                      ? isTablet()
                        ? 25
                        : 25
                      : 0,
                },
              ]}
              onPress={() => {
                navigate(routeName);
              }}>
              <ManageKidsIcon />
              {selectedTab === 'Manage Students' && (
                <Text
                  text={'Manage Students'}
                  style={[
                    TEXT_BOTTOM_TABBAR,
                    {
                      color:
                        selectedTab === 'Manage Students'
                          ? color.purple
                          : color.black1,
                      width: isTablet() ? horizontalScale(100) : 100,
                      height: isTablet()
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(30)
                          : verticalScale(15)
                        : verticalScale(20),
                      top:
                        Platform.OS === 'android'
                          ? verticalScale(0)
                          : isTablet()
                          ? verticalScale(10)
                          : verticalScale(3.5),
                      fontSize: isTablet()
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10)
                        : moderateScale(10),
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      }}
      tabBar={renderTabBar}>
      <CurvedBottomBar.Screen
        name="Home"
        position="LEFT"
        component={SchoolHome}
      />

      <CurvedBottomBar.Screen
        name="Manage Students"
        component={({navigate}) => (
          <ManageStudents
            navigation={navigate}
            route={{params: {isFromTabbar: true}}}
          />
        )}
        position="CIRCLE"
      />

      <CurvedBottomBar.Screen
        name="Leaderboard"
        component={LeaderboardSchool}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
}
const TABBAR_ITEM: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
};
const SHADOW: ViewStyle = {
  shadowColor: '#DDDDDD',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 1,
  shadowRadius: 5,
};
const BOTTOM_BAR: ViewStyle = {};
const BTN_CIRCEL_DOWN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const BTN_CIRCEL_DOWN: ViewStyle = {
  width: 30,
  height: 30,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
};
const TEXT_BOTTOM_TABBAR: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(10),
  fontWeight: '400',
  textAlign: 'center',
};
