/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  ViewStyle,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  ImageStyle,
  Text as RNText,
  Dimensions,
  RefreshControl,
  TextStyle,
  Platform,
  FlatList,
  Linking,
} from 'react-native';
//
import {PopupFeedback, PulseAnimation, Text} from '@app/components';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';
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
//
import {
  LessonsIcon,
  DayTrainingIcon,
  TotalStudentJoinIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TotalClassesJoin,
  BanIcon,
} from '@app/svg';
//
import {
  useMe,
  usePushFcmToken,
  useGetDashboardAlert,
  useGetSystemSettings,
  useGetSchoolDashboard,
  useOrientation,
} from '@app/hook';
//
import {isTablet} from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
//
import {Level} from '../components/level';
import {StudentPerformance} from '../components/student-performance';
import {LessonEarningSchoolTablet} from '../components/lesson-earning-school-tablet';
import {LearningSchoolHours} from '../components/learning-school-hours';
import i18n from '@app/i18next/i18n.config';

const BACKGROUND_YELLOW = require('@app/components/images/background-yellow.png');
const BACKGROUND_PURPLE = require('@app/components/images/background-purple.png');

export const SchoolHome: FC<
  StackScreenProps<NavigatorParamList, 'schoolHome'>
> = () => {
  // const mockupData = [
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64afcdb5433a33f38b61dff5',
  //     avatar:
  //       'https://d2csac8bc0t9gj.cloudfront.net/userUpload/image/1689243061454_avatar.png',
  //     name: 'student17',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4eaafc290d9d61f5df5e5',
  //     avatar:
  //       'https://d2csac8bc0t9gj.cloudfront.net/userUpload/image/1689578154808_avatar.png',
  //     name: 'student 20',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4f0b17d9df2b7ffa274f5',
  //     avatar: 'https://d262vvtdg2hlt6.cloudfront.net/avatar/student.png',
  //     name: 'student21',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4f0b67d9df2b7ffa2750c',
  //     avatar: 'https://d262vvtdg2hlt6.cloudfront.net/avatar/student.png',
  //     name: 'student22',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4f3e07d9df2b7ffa27dcd',
  //     avatar: 'https://d262vvtdg2hlt6.cloudfront.net/avatar/student.png',
  //     name: 'student 24',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64afcdb5433a33f38b61dff5',
  //     avatar:
  //       'https://d2csac8bc0t9gj.cloudfront.net/userUpload/image/1689243061454_avatar.png',
  //     name: 'student17',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4eaafc290d9d61f5df5e5',
  //     avatar:
  //       'https://d2csac8bc0t9gj.cloudfront.net/userUpload/image/1689578154808_avatar.png',
  //     name: 'student 20',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4f0b17d9df2b7ffa274f5',
  //     avatar: 'https://d262vvtdg2hlt6.cloudfront.net/avatar/student.png',
  //     name: 'student21',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4f0b67d9df2b7ffa2750c',
  //     avatar: 'https://d262vvtdg2hlt6.cloudfront.net/avatar/student.png',
  //     name: 'student22',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4f3e07d9df2b7ffa27dcd',
  //     avatar: 'https://d262vvtdg2hlt6.cloudfront.net/avatar/student.png',
  //     name: 'student 24',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64afcdb5433a33f38b61dff5',
  //     avatar:
  //       'https://d2csac8bc0t9gj.cloudfront.net/userUpload/image/1689243061454_avatar.png',
  //     name: 'student17',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4eaafc290d9d61f5df5e5',
  //     avatar:
  //       'https://d2csac8bc0t9gj.cloudfront.net/userUpload/image/1689578154808_avatar.png',
  //     name: 'student 20',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4f0b17d9df2b7ffa274f5',
  //     avatar: 'https://d262vvtdg2hlt6.cloudfront.net/avatar/student.png',
  //     name: 'student21',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4f0b67d9df2b7ffa2750c',
  //     avatar: 'https://d262vvtdg2hlt6.cloudfront.net/avatar/student.png',
  //     name: 'student22',
  //   },
  //   {
  //     __typename: 'OnlineStudentObjectType',
  //     _id: '64b4f3e07d9df2b7ffa27dcd',
  //     avatar: 'https://d262vvtdg2hlt6.cloudfront.net/avatar/student.png',
  //     name: 'student 24',
  //   },
  // ];
  const isFocused = useIsFocused();
  const caroulselRef = useRef<any>(null);
  const scrollViewRef = useRef<any>(null);
  const orientation = useOrientation();

  const {
    accessToken,
    userInfo,
    pushToken,
    isLoggedIn,
    androidDeviceId,
    iOSDeviceId,
  } = useSelector(selector.user) || '';
  const {orientationOpenApp} = useSelector(selector.config);

  const {getMeInfo, loadingMeInfo} = useMe(accessToken) || '';
  const {getSystemSettings} = useGetSystemSettings();

  useEffect(() => {
    getDashboardAlert();
  }, []);
  const {getDashboardAlert, loadingGetDashboardAlert, dashboardAlert} =
    useGetDashboardAlert(accessToken) || '';
  const {pushFcmToken} = usePushFcmToken(
    accessToken,
    pushToken,
    Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
    Platform.OS,
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isShowPopupFeedback, setIsShowPopupFeedback] =
    useState<boolean>(false);

  const schoolName = userInfo?.me?.school?.schoolName || '';
  const gradeName = userInfo?.me?.grade?.gradeName || '';

  const renderName = role => {
    switch (role) {
      case 'school': {
        return schoolName;
      }
      case 'grade': {
        return gradeName;
      }
    }
  };

  useEffect(() => {
    getMeInfo();
    getSchoolDashboard();
    getListStudentOnline();
    getListLeaderboard();
    getStudentPerformance();
    getLearningHours();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      pushFcmToken();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isFocused) {
      getMeInfo();
      getSchoolDashboard();
      getSystemSettings();
      getListStudentOnline();
      getListLeaderboard();
      getStudentPerformance();
      getLearningHours();
    }
  }, [isFocused]);

  const {
    getSchoolDashboard,
    isLoading,
    dataSchoolDashboard,
    dataSource,
    getListLeaderboard,
    getListStudentOnline,
    dataStudentsOnline,
    getStudentPerformance,
    getLearningHours,
    dataLearningHour,
  } = useGetSchoolDashboard();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMeInfo();
    getSystemSettings();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  const renderItemDashboardAlert = ({item, index}) => {
    return (
      <View
        key={index}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <>
          <RNText
            style={[
              DASHBOARD_ALERT_TEXT,
              {
                fontSize: isTablet() ? moderateScale(10.5) : moderateScale(13),
                textAlignVertical: 'center',
                fontFamily: typography.promptBold,
                fontWeight: '700',
              },
            ]}>
            {`${item.content} `}
            {item.url && (
              <RNText
                onPress={() => Linking.openURL(item.url)}
                style={{
                  ...DASHBOARD_ALERT_TEXT,
                  textDecorationLine: 'underline',
                  color: color.blue1,
                }}>
                {item.urlTitle ||
                  (i18n.language === 'en' ? 'CLICK HERE' : 'BẤM VÀO ĐÂY NHA!')}
              </RNText>
            )}
          </RNText>
        </>
      </View>
    );
  };

  if (isLoading || loadingMeInfo || loadingGetDashboardAlert) {
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
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {!isTablet() && (
        <View style={CONTAINER_CONTENT}>
          <View style={DIRECTION_VIEW}>
            <Text text={'Welcome, '} style={[WELCOME_TEXT, {flex: 0}]} />
            <Text
              text={`${renderName(userInfo?.me?.role)}!`}
              style={WELCOME_TEXT}
              numberOfLines={1}
            />
          </View>
        </View>
      )}
      {dashboardAlert?.length > 0 && (
        <View style={IMAGE_CONTAINER}>
          <View
            style={[
              CONTENT_VIEW,
              {
                paddingVertical:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(10)
                    : verticalScale(5),
              },
            ]}>
            <Carousel
              ref={caroulselRef}
              data={dashboardAlert}
              renderItem={renderItemDashboardAlert}
              sliderWidth={Dimensions.get('window').width - 20}
              itemWidth={Dimensions.get('window').width - 20}
              firstItem={0}
              inactiveSlideScale={1}
              loopClonesPerSide={2}
              loop={true}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={15000}
              enableSnap={false}
              scrollEnabled={false}
            />
          </View>
        </View>
      )}
      <View
        style={{marginTop: isTablet() ? verticalScale(0) : verticalScale(-15)}}>
        <Level dashboardAlert={dashboardAlert} />
      </View>
      <View style={CONTAINER_THREE_VIEW}>
        <>
          {isTablet() ? (
            <>
              <LessonEarningSchoolTablet
                dataSchoolDashboard={dataSchoolDashboard}
                dataStudentsOnline={dataStudentsOnline}
              />
              <LearningSchoolHours dataSource={dataLearningHour} />
              <StudentPerformance dataSource={dataSource} />
            </>
          ) : (
            <>
              {userInfo?.me?.role === 'school' && (
                <View style={BODY_THREE_VIEW}>
                  <View style={MONEY_VIEW}>
                    <TotalClassesJoin props={undefined} />
                  </View>
                  <View
                    style={[TITLE_VIEW, {marginRight: horizontalScale(40)}]}>
                    <Text text={'Total Classes'} style={TEXT_TITLE_COMMON} />
                  </View>
                  <View style={[SUBTITLE_VIEW, {marginStart: 20}]}>
                    <RNText style={TEXT_SUBTITLE_COMMON}>
                      {dataSchoolDashboard?.totalClass || 0}
                    </RNText>
                  </View>

                  <View style={ALIGN_VIEW}>
                    <Image source={BACKGROUND_PURPLE} style={HEIGHT_COMMON} />
                  </View>
                </View>
              )}
              <View style={BODY_THREE_VIEW}>
                <View style={MONEY_VIEW}>
                  <TotalStudentJoinIcon props={undefined} />
                </View>
                <View style={TITLE_VIEW}>
                  <Text
                    text={'Total Students Joined'}
                    style={TEXT_TITLE_COMMON}
                  />
                </View>
                <View style={SUBTITLE_VIEW}>
                  <RNText style={TEXT_SUBTITLE_COMMON}>
                    {dataSchoolDashboard?.totalStudentJoined}
                  </RNText>
                </View>

                <View style={ALIGN_VIEW}>
                  <Image source={BACKGROUND_YELLOW} style={HEIGHT_COMMON} />
                </View>
              </View>
              <View style={BODY_THREE_VIEW}>
                <View style={MONEY_VIEW}>
                  <DayTrainingIcon />
                </View>
                <View style={[TITLE_VIEW, {marginRight: horizontalScale(40)}]}>
                  <Text text={'Days In Training'} style={TEXT_TITLE_COMMON} />
                </View>
                <View style={SUBTITLE_VIEW}>
                  <RNText style={TEXT_SUBTITLE_COMMON}>
                    {dataSchoolDashboard?.totalDayInTraining || 0}
                  </RNText>
                </View>

                <View style={ALIGN_VIEW}>
                  <Image source={BACKGROUND_PURPLE} style={HEIGHT_COMMON} />
                </View>
              </View>
              {userInfo?.me?.role === 'grade' && (
                <View style={BODY_THREE_VIEW}>
                  <View style={MONEY_VIEW}>
                    <LessonsIcon />
                  </View>
                  <View
                    style={[TITLE_VIEW, {marginRight: horizontalScale(40)}]}>
                    <Text
                      text={'Completed Lessons'}
                      style={TEXT_TITLE_COMMON}
                    />
                  </View>
                  <View style={[SUBTITLE_VIEW, {marginStart: 20}]}>
                    <RNText style={TEXT_SUBTITLE_COMMON}>
                      {dataSchoolDashboard?.totalCompletedLesson || 0}
                    </RNText>
                  </View>

                  <View style={ALIGN_VIEW}>
                    <Image source={BACKGROUND_YELLOW} style={HEIGHT_COMMON} />
                  </View>
                </View>
              )}
              <StudentPerformance dataSource={dataSource} />
            </>
          )}
        </>
        {!isTablet() && (
          <View style={FOOTER}>
            <Text
              text={'Online Students'}
              style={[
                ONLINE_STUDENT_TEXT,
                {
                  padding: 10,
                },
              ]}
            />
            {dataStudentsOnline?.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: verticalScale(10),
                  zIndex: 10,
                }}>
                {dataStudentsOnline?.length > 4 && (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 30,
                      height: 30,
                      borderRadius: 60,
                      backgroundColor: color.purple1,
                      borderColor: color.purple,
                      borderWidth: 1,
                      position: 'absolute',
                      zIndex: 10,
                      left: 10,
                      top: verticalScale(40),
                    }}
                    onPress={() => {
                      scrollViewRef?.current?.scrollTo({
                        index: 0,
                        animated: true,
                      });
                    }}>
                    <ArrowLeftIcon width={10} height={10} fill={color.purple} />
                  </TouchableOpacity>
                )}
                <ScrollView
                  ref={scrollViewRef}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
                  <FlatList
                    scrollEnabled={false}
                    data={dataStudentsOnline}
                    horizontal
                    keyExtractor={item => item._id}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          key={index}
                          style={{
                            paddingLeft: 40,
                          }}>
                          <ImageBackground
                            source={{
                              uri: item.avatar,
                            }}
                            imageStyle={{borderRadius: 100}}
                            style={{
                              width: 50,
                              height: 50,
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            }}>
                            <View style={{bottom: verticalScale(15)}}>
                              <PulseAnimation
                                circleColor={{backgroundColor: color.purple}}
                              />
                            </View>
                          </ImageBackground>
                          <Text text={item.name} style={NAME_ONLINE_TEXT} />
                        </View>
                      );
                    }}
                  />
                </ScrollView>
                {dataStudentsOnline?.length > 4 && (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 30,
                      height: 30,
                      borderRadius: 60,
                      backgroundColor: color.purple1,
                      borderColor: color.purple,
                      borderWidth: 1,
                      position: 'absolute',
                      zIndex: 10,
                      right: 10,
                      top: verticalScale(40),
                    }}
                    onPress={() => {
                      scrollViewRef?.current?.scrollToEnd({
                        animated: true,
                      });
                    }}>
                    <ArrowRightIcon
                      width={10}
                      height={10}
                      fill={color.purple}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View style={NO_STUDENT_ONLINE_VIEW}>
                <BanIcon width={15} height={15} fill={color.gray3} />
                <Text
                  text={'No Students Online'}
                  style={[
                    NO_STUDENT_ONLINE_TEXT,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(10)
                          : moderateScale(12),
                      marginHorizontal: horizontalScale(5),
                    },
                  ]}
                />
              </View>
            )}
            <View
              style={{
                alignItems: 'flex-end',
                position: 'absolute',
                justifyContent: 'flex-end',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}>
              <Image source={BACKGROUND_PURPLE} />
            </View>
          </View>
        )}
        {!isTablet() && <LearningSchoolHours dataSource={dataLearningHour} />}
        <View
          style={{
            marginBottom: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(100)
                  : verticalScale(50)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(100)
                : verticalScale(50)
              : Platform.OS === 'android'
              ? verticalScale(130)
              : verticalScale(100),
          }}
        />
      </View>
      <PopupFeedback
        isVisible={isShowPopupFeedback}
        title={`Hi, ${renderName(userInfo?.me?.role)}!`}
        subtitle="YOUR FEEDBACK WILL HELP US SERVE YOU BETTER"
        onClose={() => setIsShowPopupFeedback(false)}
      />
    </ScrollView>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray4,
};
const CONTAINER_CONTENT: ViewStyle = {
  paddingVertical: verticalScale(20),
  paddingHorizontal: horizontalScale(10),
  marginTop: isTablet() ? verticalScale(-10) : verticalScale(-10),
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const WELCOME_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(20),
  fontWeight: '600',
  color: color.black1,
  flex: 1,
};
const IMAGE_CONTAINER: ViewStyle = {
  marginTop: isTablet() ? verticalScale(0) : verticalScale(-20),
};
const CONTENT_VIEW: ViewStyle = {
  paddingHorizontal: horizontalScale(5),
  backgroundColor: color.yellow1,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
};
const CONTAINER_THREE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const BODY_THREE_VIEW: ViewStyle = {
  height: 74,
  backgroundColor: color.white,
  width: '100%',
  marginTop: 15,
  borderRadius: 5,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const TEXT_TITLE_COMMON: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: moderateScale(12),
  fontWeight: '400',
  color: color.black1,
  textAlign: 'left',
};
const TEXT_SUBTITLE_COMMON: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: 24,
  fontWeight: '600',
  color: color.black1,
};
const MONEY_VIEW: ViewStyle = {
  marginStart: 20,
};
const SUBTITLE_VIEW: ViewStyle = {
  marginStart: 20,
};
const TITLE_VIEW: ViewStyle = {
  justifyContent: 'center',
  flex: 1,
  marginHorizontal: horizontalScale(20),
};
const ALIGN_VIEW: ViewStyle = {
  alignItems: 'flex-end',
};
const FOOTER: ViewStyle = {
  backgroundColor: color.white,
  width: '100%',
};
const ONLINE_STUDENT_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: moderateScale(13),
  fontWeight: '600',
  color: color.black1,
  flex: 1,
};
const HEIGHT_COMMON: ImageStyle = {
  height: 75,
};
const DASHBOARD_ALERT_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(10) : moderateScale(10.5),
  fontWeight: '400',
  color: color.black1,
  textAlign: 'center',
  lineHeight: isTablet() ? 22 : 18,
};
const NAME_ONLINE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(10),
  color: color.gray3,
  marginTop: verticalScale(5),
};
const NO_STUDENT_ONLINE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray3,
  textAlign: 'center',
};
const NO_STUDENT_ONLINE_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: verticalScale(20),
  marginTop: verticalScale(-20),
};
