/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Text} from '@app/components';
import {
  BuildFinancialFreedomIcon,
  HomeIcon,
  LevelCertificateIcon,
  LeaderBoardIcon,
  GameConsoleIcon,
} from '@app/svg';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {Animated, Platform, TouchableOpacity, ViewStyle} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {
  KidHome,
  MyMoney,
  LevelCertificate,
  BuildFinancialFreedom,
  Leaderboard,
} from '@app/screens';
import {TextStyle} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

export function BottomTabbarKid() {
  const {orientationOpenApp} = useSelector(selector.config);
  const _renderIcon = (routeName: string, selectedTab: any) => {
    if (routeName === 'Home') {
      return (
        <HomeIcon
          fill={routeName === selectedTab ? color.purple : color.black1}
          props={undefined}
        />
      );
    } else if (routeName === 'Games') {
      return (
        <GameConsoleIcon
          fill={routeName === selectedTab ? color.purple : color.black1}
        />
      );
    } else if (routeName === 'Build My World') {
      return (
        <BuildFinancialFreedomIcon
          fill={routeName === selectedTab ? color.purple : color.black1}
          props={undefined}
        />
      );
    } else if (routeName === 'Certifications') {
      return (
        <LevelCertificateIcon
          fill={routeName === selectedTab ? color.purple : color.black1}
          props={undefined}
        />
      );
    } else if (routeName === 'Leaderboard') {
      return (
        <LeaderBoardIcon
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
      initialRouteName="home"
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
                    selectedTab === 'Build My World'
                      ? isTablet()
                        ? 25
                        : 20
                      : 0,
                },
              ]}
              onPress={() => {
                navigate(routeName);
              }}>
              <BuildFinancialFreedomIcon />
              {selectedTab === 'Build My World' && (
                <Text
                  text={'Build My World'}
                  style={[
                    TEXT_BOTTOM_TABBAR,
                    {
                      color:
                        selectedTab === 'Build My World'
                          ? color.purple
                          : color.black1,
                      width: isTablet() ? horizontalScale(100) : 120,
                      top:
                        Platform.OS === 'android'
                          ? verticalScale(0)
                          : isTablet()
                          ? verticalScale(10)
                          : verticalScale(4),
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
      <CurvedBottomBar.Screen name="Home" position="LEFT" component={KidHome} />
      <CurvedBottomBar.Screen
        name="Games"
        component={MyMoney}
        position="LEFT"
      />
      <CurvedBottomBar.Screen
        name="Build My World"
        component={BuildFinancialFreedom}
        position="CIRCLE"
      />
      <CurvedBottomBar.Screen
        name="Certifications"
        component={({navigate}) => (
          <LevelCertificate
            navigation={navigate}
            route={{params: {isFromTabbar: true}}}
          />
        )}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name="Leaderboard"
        component={({navigate}) => (
          <Leaderboard
            navigation={navigate}
            route={{params: {isFromTabbar: true}}}
          />
        )}
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
  fontSize: moderateScale(10),
  fontWeight: '400',
  textAlign: 'center',
};
