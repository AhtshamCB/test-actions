/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text as RNText,
  Image,
  ImageBackground,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  Platform,
} from 'react-native';
//
import {AlertComponent, ButtonLinearGradient, Text} from '@app/components';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {CompletedIcon, InProgressIcon, UpComingIcon} from '@app/svg';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {useAttackLesson, useLessons, useOrientation} from '@app/hook';
import {useIsFocused} from '@react-navigation/native';
import {isTablet} from 'react-native-device-info';
import {HeaderLevelLesson} from '../component/header-level-lesson/header-level-lesson';
import {useTranslation} from 'react-i18next';
import {TYPE} from '@app/utils/contants';

const LINEAR_BUTTON = require('../images/linear-border-button.png');
const BACKGROUND_LEVEL_1 = require('../images/background-level-1.png');
const BACKGROUND_LEVEL_2 = require('../images/background-level-2.png');
const BACKGROUND_LEVEL_3 = require('../images/background-level-3.png');
const BACKGROUND_LEVEL_4 = require('../images/background-level-4.png');
const BACKGROUND_LEVEL_5 = require('../images/background-level-5.png');
const BACKGROUND_LEVEL_1_TABLET = require('../images/background-level-1-tablet.png');
const BACKGROUND_LEVEL_2_TABLET = require('../images/background-level-2-tablet.png');
const BACKGROUND_LEVEL_3_TABLET = require('../images/background-level-3-tablet.png');
const BACKGROUND_LEVEL_4_TABLET = require('../images/background-level-4-tablet.png');
const BACKGROUND_LEVEL_5_TABLET = require('../images/background-level-5-tablet.png');
const COMPLETED_ICON = require('../images/completed-icon.png');
const UPCOMING_ICON = require('../images/upcoming-icon.png');

export const LevelLessonsDetail: FC<
  StackScreenProps<NavigatorParamList, 'levelLessonsDetail'>
> = ({navigation, route}) => {
  const {level, isFromTeacherScreen} = route?.params || '';
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const orientation = useOrientation();

  const [lessonId, setLessonId] = useState<any>();
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [isShowWarningPopup, setIsShowWarningPopup] = useState<boolean>(false);

  const {userInfo, accessToken, activeKidInfo, infoDashboardStudent} =
    useSelector(selector.user);
  const {orientationOpenApp, isBetaVersion} = useSelector(selector.config);

  const {getListLessons, listLessons, isLoading} = useLessons();

  const {attackLesson} = useAttackLesson(accessToken, lessonId);

  useEffect(() => {
    getListLessons({
      payload: {
        level: level,
        studentId: infoDashboardStudent?._id ? infoDashboardStudent?._id : null,
      },
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getListLessons({
        payload: {
          level: level,
          studentId: infoDashboardStudent?._id
            ? infoDashboardStudent?._id
            : null,
        },
      });
    }
  }, [isFocused]);

  const onPressLesson = async item => {
    if (isFromTeacherScreen) {
      setIsShowWarningPopup(true);
    } else if (userInfo?.me?.role === TYPE.PARENT) {
      setIsShowPopup(true);
    } else {
      await setLessonId(item?._id);
      await attackLesson();
      navigation.navigate('lessonDetail', {
        level: level,
        lessonId: item?._id,
      });
    }
  };

  const onPressFinalTestExam = () => {
    if (isFromTeacherScreen) {
      setIsShowWarningPopup(true);
    } else {
      if (listLessons?.isPassedExam) {
        navigation.replace('levelLessonsDetail', {
          level: 'level2',
          studentId: '',
        });
      } else {
        navigation.navigate('finalTestLesson', {
          levelId: level,
        });
      }
    }
  };

  const renderBackgroundLevel = levelBackground => {
    switch (levelBackground) {
      case 'level1':
        return isTablet() ? BACKGROUND_LEVEL_1_TABLET : BACKGROUND_LEVEL_1;
      case 'level2':
        return isTablet() ? BACKGROUND_LEVEL_2_TABLET : BACKGROUND_LEVEL_2;
      case 'level3':
        return isTablet() ? BACKGROUND_LEVEL_3_TABLET : BACKGROUND_LEVEL_3;
      case 'level4':
        return isTablet() ? BACKGROUND_LEVEL_4_TABLET : BACKGROUND_LEVEL_4;
      case 'level5':
        return isTablet() ? BACKGROUND_LEVEL_5_TABLET : BACKGROUND_LEVEL_5;
    }
  };

  if (isLoading) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  const isShowTestButton = listLessons?.data?.find(
    item => item.order === 15 && item.status === 'completed',
  );

  const renderItem = ({item, index}) => {
    return (
      <View>
        <View style={LIST_CONTAINER} key={index}>
          <View style={LESSONS_CONTAINER}>
            <Text text={item.order} style={LESSONS_TEXT} />
          </View>
          <View style={TOPICS_CONTAINER}>
            <Text text={item.name} style={TOPICS_TEXT} />
            {item.order === 5 && isBetaVersion && (
              <Text
                text={
                  'This is the last lesson of Beta Trial. Unlock more amazing lessons with our LIVE version!'
                }
                style={[
                  TOPICS_TEXT,
                  {color: color.purple, fontSize: moderateScale(9)},
                ]}
              />
            )}
          </View>
          <View style={[CONTAINER_COMMON, {flex: 0.6}]}>
            {item?.status === 'completed' && (
              <>
                {isTablet() ? (
                  <Image source={COMPLETED_ICON} />
                ) : (
                  <CompletedIcon />
                )}

                <Text
                  text={'Completed'}
                  style={[
                    STATUS_TEXT,
                    {
                      fontSize: isTablet()
                        ? moderateScale(7)
                        : moderateScale(7),
                    },
                  ]}
                />
              </>
            )}
            {item?.status === 'inProgress' && (
              <>
                {isTablet() ? (
                  <ActivityIndicator size={'small'} color={color.purple} />
                ) : (
                  <InProgressIcon />
                )}
                {userInfo?.me?.role === TYPE.PARENT ||
                userInfo?.me?.role === TYPE.GRADE ? (
                  <Text
                    text={
                      userInfo?.me?.role === TYPE.PARENT
                        ? `${t('your_kid_learning_this_lesson')}`
                        : 'This student is learning this lesson!'
                    }
                    style={[
                      STATUS_TEXT,
                      {
                        color: color.gray3,
                        fontSize: isTablet()
                          ? moderateScale(9)
                          : moderateScale(7),
                      },
                    ]}
                  />
                ) : (
                  <Text
                    text={`${t('you_are_learning_this_lesson')}`}
                    style={[STATUS_TEXT, {color: color.gray3}]}
                  />
                )}
              </>
            )}
            {item?.status === 'upComing' && (
              <>
                {isTablet() ? (
                  <Image source={UPCOMING_ICON} />
                ) : (
                  <UpComingIcon />
                )}

                <Text
                  text={'Up Coming'}
                  style={[
                    STATUS_TEXT,
                    {
                      color: color.gray3,
                      fontSize: isTablet()
                        ? moderateScale(9)
                        : moderateScale(7),
                    },
                  ]}
                />
              </>
            )}
          </View>
          <View style={CONTAINER_COMMON}>
            {item?.status === 'completed' && (
              <TouchableOpacity
                style={LINEAR_BUTTON_CONTAINER}
                onPress={() => onPressLesson(item)}>
                <ImageBackground
                  source={LINEAR_BUTTON}
                  style={LINEAR_BUTTON_CONTAINER}>
                  <Text text={'Learn Again'} style={[LEARN_AGAIN_TEXT]} />
                </ImageBackground>
              </TouchableOpacity>
            )}
            {item?.status === 'inProgress' && (
              <TouchableOpacity
                onPress={() => onPressLesson(item)}
                style={BUTTON_VIEW}>
                <LinearGradient
                  colors={['#F300FF', '#FFBA00']}
                  start={{x: 0.1, y: 0.1}}
                  locations={[0, 1]}
                  style={LINEAR_BUTTON_VIEW}>
                  <Text
                    text={'Learn Now'}
                    style={[
                      LEARN_AGAIN_TEXT,
                      {
                        color: color.white,
                        opacity: 1,
                      },
                    ]}
                  />
                </LinearGradient>
              </TouchableOpacity>
            )}
            {item?.status === 'upComing' && (
              <TouchableOpacity style={LEARN_MORE_BUTTON} disabled>
                <Text
                  text={'Learn More'}
                  style={[LEARN_AGAIN_TEXT, {color: color.gray3}]}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={CONTAINER}>
      <HeaderLevelLesson
        isFromTeacherScreen={isFromTeacherScreen}
        onBackPress={() => navigation.goBack()}
      />
      <View
        style={[
          BACKGROUND_CONTAINER,
          {
            marginTop: isTablet()
              ? orientation === 'PORTRAIT'
                ? verticalScale(0)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(0)
                : verticalScale(20)
              : verticalScale(-10),
          },
        ]}>
        <Image
          source={renderBackgroundLevel(level)}
          style={[
            IMAGE_BACKGROUND,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(230)
                    : verticalScale(200)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(280)
                  : verticalScale(220)
                : verticalScale(220),
            },
          ]}
          resizeMode={
            isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? 'stretch'
                  : 'contain'
                : orientationOpenApp === 'LANDSCAPE'
                ? 'stretch'
                : 'cover'
              : 'stretch'
          }
        />
      </View>
      <View style={CONTAINER_VIEW}>
        <View style={CONTAINER_BODY}>
          <Text text={'Lessons'} style={TEXT_HEADER} />
          <Text text={'Topics'} style={TEXT_HEADER} />
          <Text text={'Status'} style={TEXT_HEADER} />
          <Text text={'Action'} style={TEXT_HEADER} />
        </View>
        <View style={LIST_VIEW}>
          <FlatList
            data={listLessons?.data}
            keyExtractor={item => item._id.toString()}
            renderItem={renderItem}
          />
          {isShowTestButton &&
            (userInfo.me.role === TYPE.KID ||
              userInfo.me.role === TYPE.STUDENT) && (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ButtonLinearGradient
                  text={
                    listLessons?.isPassedExam
                      ? 'Go To Level 2'
                      : '👉 Test Level 1'
                  }
                  style={BUTTON_ADD_KID_VIEW}
                  textStyle={TEXT_CONFIRM}
                  onPress={onPressFinalTestExam}
                />
              </View>
            )}
        </View>
      </View>
      <AlertComponent
        isVisible={isShowWarningPopup}
        title={'Notification!'}
        backgroundStyle={{
          height:
            orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(100)
              : verticalScale(80),
        }}
        titleStyle={TITLE_POPUP}
        subtitle={
          "As a teacher, you are allowed to monitor only your student' progress on this dashboard!"
        }
        subtitleStyle={[
          SUB_TITLE_MODAL,
          {
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(12)
                : moderateScale(14)
              : moderateScale(14),
          },
        ]}
        confirmBtTitle={'Close'}
        onConfirm={() => {
          setIsShowWarningPopup(false);
        }}
      />
      <Modal
        isVisible={isShowPopup}
        backdropColor={color.palette.mineShaft}
        backdropOpacity={0.5}
        animationInTiming={150}
        animationOutTiming={150}
        backdropTransitionOutTiming={0}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        style={MODAL}
        deviceHeight={2000}
        deviceWidth={isTablet() ? 2000 : 0}
        statusBarTranslucent>
        <View style={CONTAINER_MODAL}>
          <RNText
            style={[
              TITLE_MODAL,
              {
                fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
                fontFamily: typography.promptRegular,
                color: color.black1,
                textAlign: 'left',
              },
            ]}>
            {`${t('this_list_of_lessons')}`}{' '}
          </RNText>
          <View style={CONTAINER_BUTTON}>
            <ButtonLinearGradient
              text={`${t('understand')}`}
              style={[BUTTON_LOGIN_MODAL_VIEW]}
              textStyle={TEXT_MODAL_LOGIN}
              onPress={() => setIsShowPopup(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray4,
};
const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  marginTop: 20,
};
const BACKGROUND_CONTAINER: ViewStyle = {
  marginTop: verticalScale(10),
};
const IMAGE_BACKGROUND: ImageStyle = {
  width: 'auto',
};
const CONTAINER_BODY: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: horizontalScale(10),
  marginRight: horizontalScale(20),
};
const TEXT_HEADER: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: isTablet() ? moderateScale(10) : 16,
  fontWeight: '700',
  color: color.black1,
};
const LIST_VIEW: ViewStyle = {
  flex: 1,
  padding: 10,
};
const LIST_CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  borderRadius: 60,
  padding: 20,
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 10,
};
const LESSONS_CONTAINER: ViewStyle = {
  flex: 0.1,
};
const LESSONS_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(9) : 11,
  fontWeight: '400',
  color: color.gray5,
};
const TOPICS_CONTAINER: ViewStyle = {
  flex: isTablet() ? 0.6 : 0.5,
};
const TOPICS_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(9) : 10,
  fontWeight: '400',
  color: color.gray5,
};
const CONTAINER_COMMON: ViewStyle = {
  flex: 0.25,
  justifyContent: 'center',
  alignItems: 'center',
};
const STATUS_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(8) : 8,
  fontWeight: '400',
  color: color.primary,
  textAlign: 'center',
};
const LEARN_AGAIN_TEXT: TextStyle = {
  fontFamily: typography.promptSemiBold,
  fontSize: isTablet() ? moderateScale(8) : 10,
  fontWeight: '600',
  color: color.black1,
};
const LINEAR_BUTTON_CONTAINER: ImageStyle = {
  width: isTablet() ? 126 : Platform.OS === 'ios' ? 76 : 80,
  height: isTablet() ? 53 : Platform.OS === 'ios' ? 32 : 34,
  justifyContent: 'center',
  alignItems: 'center',
};
const LINEAR_BUTTON_VIEW: ViewStyle = {
  width: isTablet() ? 120 : 77,
  height: isTablet() ? 40 : 33,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 40,
};
const BUTTON_VIEW: ViewStyle = {
  shadowColor: '#52006A',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 20,
};
const LEARN_MORE_BUTTON: ViewStyle = {
  width: isTablet() ? 120 : 77,
  height: isTablet() ? 40 : 33,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 40,
  backgroundColor: color.gray6,
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const CONTAINER_MODAL: ViewStyle = {
  backgroundColor: color.white,
  justifyContent: 'center',
  padding: 20,
  width: isTablet() ? horizontalScale(300) : horizontalScale(350),
  borderRadius: 20,
};
const MODAL: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 20,
  color: color.dark1,
};
const CONTAINER_BUTTON: ViewStyle = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};
const BUTTON_LOGIN_MODAL_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  width: isTablet() ? horizontalScale(100) : horizontalScale(120),
  height: isTablet() ? 50 : 35,
  marginTop: 20,
};
const TEXT_MODAL_LOGIN: TextStyle = {
  textAlign: 'center',
  fontSize: isTablet() ? moderateScale(12) : moderateScale(14),
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: moderateScale(22),
  color: color.purple,
  paddingHorizontal: horizontalScale(10),
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  color: color.black1,
  textAlign: 'center',
  marginTop: verticalScale(30),
};
const BUTTON_ADD_KID_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  width: isTablet() ? 260 : 200,
  height: isTablet() ? 50 : 40,
  marginTop: isTablet() ? 10 : verticalScale(-10),
};
const TEXT_CONFIRM: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: isTablet() ? moderateScale(10) : moderateScale(14),
};
