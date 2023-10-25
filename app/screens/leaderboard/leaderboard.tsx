/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useCallback, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {CupIcon, CupIconTablet} from '@app/svg';
import {Text} from '@app/components';
import {useMyDashboard} from '@app/hook/useMyDashboard';
//
import FastImage from 'react-native-fast-image';
import {isTablet} from 'react-native-device-info';
import {isIPhone8PlusOrBelow} from '@app/hook';
import LinearGradient from 'react-native-linear-gradient';

const AVATAR_DEFAULT = require('./images/avatar-default.png');

export const Leaderboard: FC<
  StackScreenProps<NavigatorParamList, 'leaderboard'>
> = () => {
  const {leaderboardInfo} = useSelector(selector.dashboard);
  const {accessToken} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {getMyDashboard, loadingDashboard} = useMyDashboard(accessToken);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMyDashboard();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);
  if (loadingDashboard) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }
  return (
    <ScrollView
      style={CONTAINER}
      contentContainerStyle={CONTENT_CONTAINER}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {leaderboardInfo?.map((item, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <LinearGradient
              colors={['#F300FF', '#FFBA00']}
              start={{x: 0.1, y: 0.1}}
              locations={[0, 1]}
              style={[
                CONTAINER_ITEM,
                {
                  marginTop: verticalScale(15),
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(70)
                      : verticalScale(50)
                    : isIPhone8PlusOrBelow()
                    ? verticalScale(53)
                    : verticalScale(50),
                },
              ]}>
              <View style={CUP_VIEW}>
                {isTablet() ? <CupIconTablet /> : <CupIcon />}
              </View>
              <FastImage
                source={item?.avatar ? {uri: item?.avatar} : AVATAR_DEFAULT}
                style={AVATAR}
              />
              <Text
                text={item.name}
                style={[
                  NAME_TEXT,
                  {
                    fontSize: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(12)
                        : moderateScale(14)
                      : moderateScale(14),
                  },
                ]}
                numberOfLines={1}
              />
              <Text
                text={`${item.balance}`}
                style={[
                  MONEY_TEXT,
                  {
                    color: color.white,
                    marginRight: index === 0 ? horizontalScale(2) : 0,
                  },
                ]}
              />
            </LinearGradient>
          ) : (
            <View
              style={[
                CONTAINER_ITEM,
                {
                  backgroundColor:
                    index === 1
                      ? color.purple
                      : index === 2
                      ? color.yellow
                      : index === 3
                      ? color.purple1
                      : index === 4
                      ? color.yellow2
                      : color.white,
                  marginTop: verticalScale(15),
                  height: isTablet()
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(70)
                      : verticalScale(50)
                    : isIPhone8PlusOrBelow()
                    ? verticalScale(53)
                    : verticalScale(50),
                },
              ]}
              key={index}>
              <Text
                text={`${index + 1}`}
                style={[
                  NUMBER_TEXT,
                  {
                    fontSize: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(12)
                        : moderateScale(14)
                      : moderateScale(14),
                  },
                ]}
              />
              <FastImage
                source={item?.avatar ? {uri: item?.avatar} : AVATAR_DEFAULT}
                style={AVATAR}
              />
              <Text
                text={item.name}
                style={[
                  NAME_TEXT,
                  {
                    fontSize: isTablet()
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(12)
                        : moderateScale(14)
                      : moderateScale(14),
                  },
                ]}
                numberOfLines={1}
              />
              <Text
                text={`${item.balance}`}
                style={[
                  MONEY_TEXT,
                  {
                    color:
                      index === 1
                        ? color.white
                        : index === 2
                        ? color.white
                        : color.black1,
                    marginRight: index === 0 ? horizontalScale(2) : 0,
                  },
                ]}
              />
            </View>
          )}
        </React.Fragment>
      ))}
      <View style={{marginBottom: verticalScale(100)}} />
    </ScrollView>
  );
};
const CONTAINER_ITEM: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 15,
  paddingHorizontal: isTablet() ? 50 : 10,
  width: '100%',
  backgroundColor: color.white,
  justifyContent: 'space-around',
};
const CONTENT_CONTAINER: ViewStyle = {
  alignItems: 'center',
  marginTop: isTablet() ? verticalScale(20) : verticalScale(-2),
};
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
const NUMBER_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(14) : moderateScale(14),
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  flex: 0.1,
  color: color.gray3,
};
const NAME_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(14) : moderateScale(14),
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  marginStart: isTablet() ? horizontalScale(10) : horizontalScale(10),
  color: color.black1,
  flex: 1,
};
const MONEY_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(14) : moderateScale(16),
  fontFamily: typography.promptSemiBold,
  fontWeight: '600',
};
const AVATAR: any = {
  width: 40,
  height: 40,
  borderRadius: 60,
};
const CUP_VIEW: ViewStyle = {
  flex: 0.12,
  marginStart: horizontalScale(-3),
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
