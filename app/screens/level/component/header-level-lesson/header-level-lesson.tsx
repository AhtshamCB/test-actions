/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import type {ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
//
import {HeaderLevelLessonProps} from './header-level-lesson.props';
import {Text} from '@app/components';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeftBoldIcon} from '@app/svg';
import Carousel from 'react-native-reanimated-carousel';
import {
  isIPhone8PlusOrBelow,
  useGetDailyInspiring,
  useOrientation,
} from '@app/hook';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {isTablet} from 'react-native-device-info';
import {SCHOOL_ACCESS_STATUS, TYPE} from '@app/utils/contants';
import {useTranslation} from 'react-i18next';

/**
 * Simple header
 */
export const HeaderLevelLesson = function HeaderLevelLesson({
  style,
  headerStyle,
  onBackPress,
  isShowRight,
  isShowLeft = true,
  textRight,
  onRightPress,
  isFromTeacherScreen,
}: HeaderLevelLessonProps) {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const caroulselRef = useRef(null);
  const orientation = useOrientation();

  const {accessToken, userInfo} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  const insets = useSafeAreaInsets();

  const containerStyles = [SUB_CONTAINER, {paddingTop: insets.top}, style];
  const headerStyles = [HEADER_TITLE, headerStyle];

  useEffect(() => {
    getDailyInspiring();
  }, []);

  const {getDailyInspiring, loadingGetDailyInspiring, dailyInspiring} =
    useGetDailyInspiring(accessToken) || '';

  const _onGoBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const renderStatusForSchool = status => {
    switch (status) {
      case SCHOOL_ACCESS_STATUS.TRIAL:
        return 'As you are using the 14-Day Free Trial, you only have access to 5 lessons below.';
      case SCHOOL_ACCESS_STATUS.FULL_ACCESS:
        return 'Explore the lessons below! Only your students will have other experiences with our rewards linked in the lessons.';
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={DAILY_CONTAINER}>
        <Text
          text={item}
          style={[
            DAILY_TEXT,
            {
              fontSize: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(9)
                    : moderateScale(11)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(10)
                  : moderateScale(11)
                : moderateScale(11),
              height: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(45)
                  : verticalScale(20)
                : verticalScale(20),
            },
          ]}
        />
      </View>
    );
  };

  if (loadingGetDailyInspiring) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <View style={CONTAINER}>
      <View style={containerStyles}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={_onGoBack}>
          {isShowLeft && (
            <ArrowLeftBoldIcon width={30} height={30} fill={color.purple} />
          )}
        </TouchableOpacity>
        {(userInfo?.me?.role === TYPE.GRADE ||
          userInfo?.me?.role === TYPE.SCHOOL) && (
          <View style={[DAILY_CONTAINER]}>
            <Text
              text={
                isFromTeacherScreen
                  ? "As a teacher, you are allowed to monitor only your student' progress on this dashboard!"
                  : renderStatusForSchool(
                      userInfo?.me?.school?.accessStatus ||
                        userInfo?.me?.grade?.accessStatus,
                    )
              }
              style={[
                DAILY_TEXT,
                {
                  height: 'auto',
                  fontSize: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(9)
                        : moderateScale(11)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(11)
                    : moderateScale(11),

                  width: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? '100%'
                      : isFromTeacherScreen
                      ? '100%'
                      : orientationOpenApp === 'LANDSCAPE'
                      ? '100%'
                      : '70%'
                    : isIPhone8PlusOrBelow()
                    ? '90%'
                    : isFromTeacherScreen
                    ? '90%'
                    : '95%',
                },
              ]}
            />
          </View>
        )}
        {userInfo?.me?.role === TYPE.PARENT && (
          <View style={[DAILY_CONTAINER]}>
            <Text
              text={`${t('allowed_to_monitor_only_your_kids')}`}
              style={[
                DAILY_TEXT,
                {
                  height: 'auto',
                  fontSize: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(9)
                        : moderateScale(10.5)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(10)
                      : moderateScale(12)
                    : moderateScale(12),
                  width: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? '100%'
                      : '100%'
                    : isIPhone8PlusOrBelow()
                    ? '90%'
                    : '100%',
                },
              ]}
            />
          </View>
        )}
        {(userInfo?.me?.role === TYPE.KID ||
          userInfo?.me?.role === TYPE.STUDENT) && (
          <Carousel
            width={
              isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(280)
                    : horizontalScale(350)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? horizontalScale(380)
                  : horizontalScale(500)
                : horizontalScale(350)
            }
            ref={caroulselRef}
            data={dailyInspiring}
            renderItem={renderItem}
            loop={true}
            autoPlay={true}
            autoPlayInterval={15000}
            height={
              isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(50)
                  : verticalScale(20)
                : verticalScale(40)
            }
            enabled={false}
            snapEnabled={false}
          />
        )}
        {isShowRight && (
          <TouchableOpacity onPress={onRightPress} style={TITLE_RIGHT}>
            <Text style={headerStyles} text={textRight} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const CONTAINER: ViewStyle = {
  width: '100%',
  top: isTablet() ? verticalScale(20) : verticalScale(0),
};
const SUB_CONTAINER: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  flexDirection: 'row',
  paddingHorizontal: 15,
  paddingVertical: 6,
  paddingBottom: 15,
};
const HEADER_TITLE: TextStyle = {
  maxWidth: '80%',
  color: color.mainBlack,
  fontSize: 18,
  textAlign: 'center',
  marginLeft: 20,
  flex: 1,
  fontWeight: '700',
};
const TITLE_RIGHT: ViewStyle = {
  marginTop: 8,
  height: 25,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const DAILY_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};
const DAILY_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,
  color: color.mainBlack,
  textAlign: 'center',
  fontWeight: '500',
  height: verticalScale(20),
};
