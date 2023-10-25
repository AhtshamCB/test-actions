/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  View,
  ViewStyle,
  Text as RNText,
  Image,
  TextStyle,
  ImageBackground,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useOrientation} from '@app/hook';
import {selector} from '@app/redux';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';

import {PulseAnimation, Text} from '@app/components';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BanIcon,
  DayTrainingIcon,
  TotalClassesJoin,
  TotalStudentJoinIcon,
} from '@app/svg';
import {TYPE} from '@app/utils/contants';

const BACKGROUND_YELLOW_TABLET = require('@app/components/images/background-yellow-tablet.png');
const BACKGROUND_PURPLE_TABLET = require('@app/components/images/background-purple-tablet.png');
const COMPLETED_LESSONS = require('../images/completed-lessons.png');

export const LessonEarningSchoolTablet = ({
  dataSchoolDashboard,
  dataStudentsOnline,
}) => {
  const {orientationOpenApp} = useSelector(selector.config);
  const {userInfo} = useSelector(selector.user);
  const orientation = useOrientation();
  const scrollViewRef = useRef<any>(null);
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

  return (
    <View>
      <View style={CONTAINER}>
        <View style={DIRECTION_COLUMN}>
          {userInfo?.me?.role === TYPE.SCHOOL && (
            <View
              style={[
                BODY_THREE_VIEW,
                {
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(90)
                        : horizontalScale(115)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(120)
                      : horizontalScale(160),
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(210)
                      : verticalScale(155),
                },
              ]}>
              <View style={CONTENT_ICON_TEXT}>
                <View style={MONEY_VIEW}>
                  <TotalClassesJoin width={40} height={40} props={undefined} />
                </View>
                <View style={[TITLE_VIEW]}>
                  <Text
                    text={'Total Classes'}
                    style={[
                      TEXT_TITLE_COMMON,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={CONTAINER_SUBTITLE_VIEW}>
                <View style={SUBTITLE_VIEW}>
                  <RNText
                    style={[
                      TEXT_SUBTITLE_COMMON,
                      {
                        fontSize:
                          orientation === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(18)
                              : moderateScale(16)
                            : moderateScale(16),
                      },
                    ]}>
                    {dataSchoolDashboard?.totalClass || 0}
                  </RNText>
                </View>

                <View style={ALIGN_VIEW}>
                  <Image
                    source={BACKGROUND_PURPLE_TABLET}
                    style={{
                      height:
                        orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(115)
                            : verticalScale(90)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(120)
                          : verticalScale(85),
                    }}
                  />
                </View>
              </View>
            </View>
          )}
          <View
            style={[
              BODY_THREE_VIEW,
              {
                width:
                  orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(90)
                      : horizontalScale(115)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(120)
                    : horizontalScale(160),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(210)
                    : verticalScale(155),
              },
            ]}>
            <View style={CONTENT_ICON_TEXT}>
              <View style={MONEY_VIEW}>
                <TotalStudentJoinIcon
                  width={40}
                  height={40}
                  props={undefined}
                />
              </View>
              <View style={TITLE_VIEW}>
                <Text
                  text={'Total Students Joined'}
                  style={[
                    TEXT_TITLE_COMMON,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                    },
                  ]}
                />
              </View>
            </View>

            <View style={CONTAINER_SUBTITLE_VIEW}>
              <View
                style={[
                  SUBTITLE_VIEW,
                  {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                  },
                ]}>
                <RNText
                  style={[
                    TEXT_SUBTITLE_COMMON,
                    {
                      fontSize:
                        orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(18)
                            : moderateScale(16)
                          : moderateScale(16),
                    },
                  ]}>
                  {dataSchoolDashboard?.totalStudentJoined}
                </RNText>
              </View>

              <View style={[ALIGN_VIEW, {flex: 1}]}>
                <Image
                  source={BACKGROUND_YELLOW_TABLET}
                  style={{
                    height:
                      orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(115)
                          : verticalScale(90)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(120)
                        : verticalScale(85),
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              BODY_THREE_VIEW,
              {
                width:
                  orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(90)
                      : horizontalScale(115)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(120)
                    : horizontalScale(160),
                height:
                  orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(210)
                    : verticalScale(155),
              },
            ]}>
            <View style={CONTENT_ICON_TEXT}>
              <View style={MONEY_VIEW}>
                <DayTrainingIcon width={50} height={50} />
              </View>
              <View style={[TITLE_VIEW]}>
                <Text
                  text={'Days In Training'}
                  style={[
                    TEXT_TITLE_COMMON,
                    {
                      fontSize:
                        orientationOpenApp === 'LANDSCAPE'
                          ? moderateScale(8)
                          : moderateScale(10),
                    },
                  ]}
                />
              </View>
            </View>

            <View style={CONTAINER_SUBTITLE_VIEW}>
              <View style={SUBTITLE_VIEW}>
                <RNText
                  style={[
                    TEXT_SUBTITLE_COMMON,
                    {
                      fontSize:
                        orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(18)
                            : moderateScale(16)
                          : moderateScale(16),
                    },
                  ]}>
                  {dataSchoolDashboard?.totalDayInTraining || 0}
                </RNText>
              </View>

              <View style={ALIGN_VIEW}>
                <Image
                  source={BACKGROUND_PURPLE_TABLET}
                  style={{
                    height:
                      orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(115)
                          : verticalScale(90)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(120)
                        : verticalScale(85),
                  }}
                />
              </View>
            </View>
          </View>
          {userInfo?.me?.role === TYPE.GRADE && (
            <View
              style={[
                BODY_THREE_VIEW,
                {
                  width:
                    orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(90)
                        : horizontalScale(115)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(120)
                      : horizontalScale(160),
                  height:
                    orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(210)
                      : verticalScale(155),
                },
              ]}>
              <View style={CONTENT_ICON_TEXT}>
                <View style={MONEY_VIEW}>
                  <FastImage source={COMPLETED_LESSONS} style={IMAGE} />
                </View>
                <View style={[TITLE_VIEW]}>
                  <Text
                    text={'Completed Lessons'}
                    style={[
                      TEXT_TITLE_COMMON,
                      {
                        fontSize:
                          orientationOpenApp === 'LANDSCAPE'
                            ? moderateScale(8)
                            : moderateScale(10),
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={CONTAINER_SUBTITLE_VIEW}>
                <View style={SUBTITLE_VIEW}>
                  <RNText
                    style={[
                      TEXT_SUBTITLE_COMMON,
                      {
                        fontSize:
                          orientation === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(18)
                              : moderateScale(16)
                            : moderateScale(16),
                      },
                    ]}>
                    {dataSchoolDashboard?.totalCompletedLesson || 0}
                  </RNText>
                </View>

                <View style={ALIGN_VIEW}>
                  <Image
                    source={BACKGROUND_YELLOW_TABLET}
                    style={{
                      height:
                        orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(115)
                            : verticalScale(90)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(120)
                          : verticalScale(85),
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
      <View
        style={[
          FOOTER,
          {
            width: 'auto',
            height:
              orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(180)
                : verticalScale(150),
          },
        ]}>
        <Text
          text={'Online Students'}
          style={[
            ONLINE_STUDENT_TEXT,
            {
              fontSize:
                orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(10)
                  : moderateScale(14),
              padding: 10,
            },
          ]}
        />
        {dataStudentsOnline?.length !== 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
            }}>
            {dataStudentsOnline?.length > 8 && (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  backgroundColor: color.purple1,
                  borderColor: color.purple,
                  borderWidth: 1,
                  position: 'absolute',
                  zIndex: 10,
                  left: 10,
                  top: verticalScale(20),
                  opacity: 0.6,
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
                horizontal
                scrollEnabled={false}
                data={dataStudentsOnline}
                keyExtractor={item => item._id}
                renderItem={({item, index}) => {
                  return (
                    <View
                      key={index}
                      style={{
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <ImageBackground
                        source={{
                          uri: item?.avatar,
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
            {dataStudentsOnline?.length > 8 && (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 60,
                  backgroundColor: color.purple1,
                  borderColor: color.purple,
                  borderWidth: 1,
                  position: 'absolute',
                  zIndex: 10,
                  right: 10,
                  top: verticalScale(20),
                  opacity: 0.6,
                }}
                onPress={() => {
                  scrollViewRef?.current?.scrollToEnd({
                    animated: true,
                  });
                }}>
                <ArrowRightIcon width={10} height={10} fill={color.purple} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={NO_STUDENT_ONLINE_VIEW}>
            <BanIcon />
            <Text
              text={'No students online'}
              style={[
                NO_STUDENT_ONLINE_TEXT,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(9)
                      : moderateScale(12),
                  marginHorizontal: horizontalScale(5),
                },
              ]}
            />
          </View>
        )}

        <View style={BACKGROUND_ONLINE_STUDENT_VIEW}>
          <Image
            source={BACKGROUND_PURPLE_TABLET}
            style={{
              height:
                orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(115)
                    : verticalScale(90)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(120)
                  : verticalScale(85),
            }}
          />
        </View>
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: 10,
  width: '100%',
  justifyContent: 'space-between',
};
const DIRECTION_COLUMN: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
};
const CONTENT_ICON_TEXT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: verticalScale(10),
};
const BODY_THREE_VIEW: ViewStyle = {
  backgroundColor: color.white,
  marginTop: 15,
  borderRadius: 5,
  justifyContent: 'space-between',
  alignItems: 'center',
};
const IMAGE: any = {
  width: 40,
  height: 40,
};
const TEXT_TITLE_COMMON: TextStyle = {
  fontFamily: typography.promptRegular,

  fontWeight: '400',
  color: color.black1,
};
const CONTAINER_SUBTITLE_VIEW: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
};
const TEXT_SUBTITLE_COMMON: TextStyle = {
  fontFamily: typography.promptSemiBold,

  fontWeight: '600',
  color: color.black1,
};
const MONEY_VIEW: ViewStyle = {
  marginStart: 20,
};
const SUBTITLE_VIEW: ViewStyle = {
  marginStart: 50,
  marginTop: verticalScale(10),
};
const TITLE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};
const ALIGN_VIEW: ViewStyle = {
  alignItems: 'flex-end',
};
const FOOTER: ViewStyle = {
  backgroundColor: color.white,
  paddingHorizontal: 10,
  marginTop: 15,
  borderRadius: 5,
};
const NAME_ONLINE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray3,
  textAlign: 'center',
  marginTop: verticalScale(5),
};
const NO_STUDENT_ONLINE_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: verticalScale(30),
};
const NO_STUDENT_ONLINE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  textAlign: 'center',
};
const ONLINE_STUDENT_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontWeight: '600',
  color: color.black1,
};
const BACKGROUND_ONLINE_STUDENT_VIEW: ViewStyle = {
  alignItems: 'flex-end',
  position: 'absolute',
  justifyContent: 'flex-end',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};
