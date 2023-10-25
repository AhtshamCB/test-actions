/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {AlertComponent, CountdownTimerSecond, Text} from '@app/components';
import {
  BackButtonQuizIcon,
  CorrectIcon,
  KeyIcon,
  NextButtonQuizIcon,
  WrongIcon,
} from '@app/svg';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import Carousel from 'react-native-reanimated-carousel';
import PaginationDot from 'react-native-animated-pagination-dot';
import {useLessons, useOrientation} from '@app/hook';
import {EXAM_STATUS, STATUS} from '@app/utils/contants';
//
import {isTablet} from 'react-native-device-info';
import {Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {InstructionPopup} from '../../component/instruction-popup/instruction-popup';
import {goBack} from '@app/navigators';
import {PopupNextLevel} from '../../component/popup-next-level/popup-next-level';

const NEXT_ICON = require('../../images/next.png');
const PREV_ICON = require('../../images/prev.png');

export const QuizFinalTestExam = ({levelId}) => {
  const caroulselRef = useRef<any>(null);
  const orientation = useOrientation();

  useEffect(() => {
    startExam({
      payload: {
        levelId: levelId,
      },
    });
  }, []);

  const {startExam, isLoading, submitExam, examId} = useLessons();

  const {orientationOpenApp} = useSelector(selector.config);
  const {
    quizFinalTestExam,
    arrayAnswerLesson,
    arrayQuizSubmitLesson,
    quizSubmitLessonDetail,
  } = useSelector(selector.lessons);

  const [isVisibleSuccess, setIsVisibleSuccess] = useState<boolean>(false);
  const [isVisibleFailed, setIsVisibleFailed] = useState<boolean>(false);
  const [isReNewTest, setIsReNewTest] = useState<boolean>(false);

  const [isUserSubmitLastQuestion, setIsUserSubmitLastQuestion] =
    useState<boolean>(false);
  const [isVisibleInstructionPopup, setIsVisibleInstructionPopup] =
    useState<boolean>(false);

  const findIndexInProgress = quizFinalTestExam?.findIndex(
    item => item?.status === STATUS.IN_PROGRESS,
  );

  useEffect(() => {
    startExam({
      payload: {
        levelId: levelId,
      },
    });
  }, [isReNewTest]);

  useEffect(() => {
    setActiveSlide(
      quizFinalTestExam?.findIndex(item => item?.status === STATUS.IN_PROGRESS),
    );
  }, [findIndexInProgress]);

  useEffect(() => {
    if (isUserSubmitLastQuestion) {
      setTimeout(() => {
        if (quizSubmitLessonDetail?.examStatus === EXAM_STATUS.PASSED) {
          setIsVisibleSuccess(true);
        } else {
          setIsVisibleFailed(true);
          setActiveSlide(0);
        }
      }, 16000);
    }
  }, [isUserSubmitLastQuestion]);

  const answerLength = quizFinalTestExam?.map(item => item.answers);

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const _onSnapToItem = index => {
    setActiveSlide(index);
  };

  const panGestureHandlerProps = {
    activeOffsetX: 0,
    failOffsetX: 0,
  };

  const isLastQuestion = activeSlide === quizFinalTestExam?.length - 1;

  const guide = `<p><span style="color: rgb(8,28,54);background-color: rgb(255,255,255);font-size: 15px;">🎉  Congratulations on completing 15 lessons in Level 1! You've made fantastic progress, and now it's time to put your knowledge to the test. This test consists of 30 questions designed to assess your understanding of the topics you've learned.</span></p>
  <p><span style="color: rgb(8,28,54);background-color: rgb(255,255,255);font-size: 15px;"><br>To successfully pass this test and advance to the next level, you'll need to answer at least 24 questions correctly. Don't worry, you've got this! Recall the lessons you've taken, think carefully, and select the answers that best match your learning.</span></p>
  <p><span style="color: rgb(8,28,54);background-color: rgb(255,255,255);font-size: 15px;"><br>👍 Good luck, and give it your best shot! Your dedication and effort will surely pay off. Remember, this test is a chance for you to demonstrate your growing financial knowledge. You've got what it takes to succeed!</span></p>`;

  const renderItem = ({item, index}) => {
    const findQuestionCompleted = arrayAnswerLesson?.find(
      items => items?.questionId === item?._id,
    );
    return (
      <ImageBackground
        source={{uri: item?.background?.mobile}}
        style={[
          ITEM_CONTAINER,
          {
            width: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? '100%'
                  : '100%'
                : orientationOpenApp === 'LANDSCAPE'
                ? '100%'
                : '100%'
              : 'auto',
            height: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(550)
                  : verticalScale(400)
                : orientationOpenApp === 'LANDSCAPE'
                ? 'auto'
                : verticalScale(400)
              : 'auto',
          },
        ]}
        resizeMode={
          isTablet()
            ? orientation === 'PORTRAIT'
              ? 'stretch'
              : orientationOpenApp === 'LANDSCAPE'
              ? 'stretch'
              : 'stretch'
            : Platform.OS === 'ios'
            ? 'stretch'
            : 'cover'
        }
        key={index}>
        <View
          style={[
            QUESTION_VIEW,
            {
              top: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(80)
                    : verticalScale(40)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(70)
                  : verticalScale(50)
                : Platform.OS === 'ios'
                ? verticalScale(30)
                : verticalScale(40),
              width: isTablet()
                ? orientation === 'PORTRAIT'
                  ? '70%'
                  : orientationOpenApp === 'LANDSCAPE'
                  ? '50%'
                  : '70%'
                : '80%',
            },
          ]}>
          <Text
            text={`${index + 1}. ${item?.question}`}
            style={[
              QUESTION_TEXT,
              {
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(14)
                    : moderateScale(14)
                  : Platform.OS === 'ios'
                  ? moderateScale(14)
                  : moderateScale(14),
              },
            ]}
          />
        </View>
        <View>
          <View style={BUTTON_VIEW}>
            {index > 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: Platform.OS === 'ios' ? 10 : 10,
                }}>
                <TouchableOpacity
                  style={[
                    BUTTON_SNAP_PREV,
                    {
                      marginLeft: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(80)
                            : horizontalScale(35)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(120)
                          : horizontalScale(35)
                        : horizontalScale(15),
                      marginTop: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(-150)
                            : verticalScale(-80)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(-10)
                          : verticalScale(-50)
                        : verticalScale(0),
                    },
                  ]}
                  onPress={() => {
                    caroulselRef.current.prev();
                  }}>
                  {isTablet() ? (
                    <FastImage
                      source={PREV_ICON}
                      style={{width: 57, height: 57}}
                    />
                  ) : (
                    <BackButtonQuizIcon />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: Platform.OS === 'ios' ? 10 : 10,
                }}>
                <View
                  style={[
                    BUTTON_SNAP_PREV,
                    {
                      marginLeft: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(80)
                            : horizontalScale(35)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(120)
                          : horizontalScale(35)
                        : horizontalScale(15),
                      marginTop: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(-150)
                            : verticalScale(143)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(-10)
                          : verticalScale(143)
                        : verticalScale(0),
                      width: 57,
                      height: 57,
                    },
                  ]}
                />
              </View>
            )}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                ITEM_CONTENT_CONTAINER,
                {
                  marginBottom: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(170)
                        : verticalScale(90)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(-5)
                      : verticalScale(80)
                    : verticalScale(10),
                },
              ]}>
              {item.answers.map((answer, indexAnswer) => {
                const findAnswer = arrayAnswerLesson?.find(
                  items => items?.answerId === answer?._id,
                );
                const findRightAnswer = arrayQuizSubmitLesson?.find(
                  rightAnswer => rightAnswer?.rightAnswerId === answer?._id,
                );
                const disableQuestion = arrayAnswerLesson?.find(
                  question => question?.questionId === item?._id,
                );
                return (
                  <View key={indexAnswer}>
                    <TouchableOpacity
                      disabled={!!disableQuestion}
                      style={[
                        BUTTON_ANSWER_CONTAINER,
                        {
                          borderColor:
                            (findAnswer?.answerId &&
                              findAnswer?.success === true) ||
                            findRightAnswer
                              ? color.green
                              : findAnswer?.answerId &&
                                findAnswer?.success === false
                              ? color.red
                              : color.white,
                          borderWidth: 1.2,
                        },
                      ]}
                      onPress={async () => {
                        if (isLastQuestion) {
                          setIsUserSubmitLastQuestion(true);
                        }
                        await submitExam({
                          payload: {
                            examId: examId,
                            questionId: item?._id,
                            answerKey: answer?.key,
                          },
                          questionId: item?._id,
                          answerKey: answer?.key,
                          answerId: answer?._id,
                        });
                      }}>
                      <View style={INDEX_VIEW}>
                        <Text text={answer?.keyLocal} style={INDEX_TEXT} />
                      </View>
                      <View
                        style={[
                          ANSWER_VIEW_CONTAINER,
                          {
                            width: isTablet()
                              ? orientation === 'PORTRAIT'
                                ? orientationOpenApp === 'LANDSCAPE'
                                  ? horizontalScale(160)
                                  : horizontalScale(200)
                                : horizontalScale(200)
                              : horizontalScale(220),

                            height: isTablet()
                              ? orientation === 'PORTRAIT'
                                ? orientationOpenApp === 'LANDSCAPE'
                                  ? verticalScale(70)
                                  : verticalScale(60)
                                : orientationOpenApp === 'LANDSCAPE'
                                ? verticalScale(70)
                                : verticalScale(60)
                              : verticalScale(48),
                            alignItems: 'flex-start',
                          },
                        ]}>
                        <Text
                          text={answer?.value}
                          style={[
                            ANSWER_TEXT,
                            {
                              fontSize: isTablet()
                                ? orientationOpenApp === 'LANDSCAPE'
                                  ? moderateScale(8)
                                  : moderateScale(9)
                                : Platform.OS === 'ios'
                                ? moderateScale(11)
                                : moderateScale(10),
                            },
                          ]}
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={ANSWER_RIGHT_WRONG_CONTAINER}>
                      {findAnswer?.answerId && findAnswer?.success === true && (
                        <View style={ANSWER_RIGHT_WRONG_VIEW}>
                          <CorrectIcon
                            width={isTablet() ? 25 : 20}
                            height={isTablet() ? 25 : 20}
                            props={undefined}
                          />
                          <Text
                            style={[
                              RIGHT_ANSWER_TEXT,
                              {
                                fontSize:
                                  orientationOpenApp === 'LANDSCAPE'
                                    ? moderateScale(8)
                                    : moderateScale(12),
                              },
                            ]}
                            text={'You Are Right!'}
                          />
                        </View>
                      )}
                      {findAnswer?.answerId &&
                        findAnswer?.success === false && (
                          <View style={ANSWER_RIGHT_WRONG_VIEW}>
                            <WrongIcon
                              width={isTablet() ? 25 : 20}
                              height={isTablet() ? 25 : 20}
                              props={undefined}
                            />
                            <Text
                              style={[
                                RIGHT_ANSWER_TEXT,
                                {
                                  fontSize:
                                    orientationOpenApp === 'LANDSCAPE'
                                      ? moderateScale(8)
                                      : moderateScale(12),
                                },
                              ]}
                              text={'Sorry! You are wrong!'}
                            />
                          </View>
                        )}
                    </View>
                  </View>
                );
              })}
              {isUserSubmitLastQuestion === true && (
                <CountdownTimerSecond textStyle={TEXT_TIME_COUNTDOWN_SECOND} />
              )}
            </ScrollView>
            {findQuestionCompleted && isLastQuestion === false ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: Platform.OS === 'ios' ? 10 : 10,
                }}>
                <TouchableOpacity
                  style={[
                    BUTTON_SNAP_NEXT,
                    {
                      marginRight: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(80)
                            : horizontalScale(35)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(120)
                          : horizontalScale(50)
                        : horizontalScale(15),
                      marginTop: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(-150)
                            : verticalScale(-80)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(0)
                          : verticalScale(-50)
                        : verticalScale(0),
                    },
                  ]}
                  onPress={async () => {
                    caroulselRef.current.next();
                  }}>
                  {isTablet() ? (
                    <FastImage
                      source={NEXT_ICON}
                      style={{width: 57, height: 57}}
                    />
                  ) : (
                    <NextButtonQuizIcon />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: Platform.OS === 'ios' ? 10 : 10,
                }}>
                <View
                  style={[
                    BUTTON_SNAP_NEXT,
                    {
                      marginRight: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(80)
                            : horizontalScale(35)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(120)
                          : horizontalScale(50)
                        : horizontalScale(15),
                      marginTop: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(-150)
                            : verticalScale(150)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(0)
                          : verticalScale(150)
                        : verticalScale(0),
                      width: 57,
                      height: 57,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    );
  };

  if (isLoading) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        CONTAINER,
        {
          marginTop: isTablet()
            ? orientation === 'PORTRAIT'
              ? verticalScale(-10)
              : verticalScale(-10)
            : 0,
        },
      ]}
      scrollEnabled={isTablet() ? true : false}>
      <View style={CONTENT}>
        <Text
          style={[
            LESSON_TITLE,
            {
              fontSize:
                orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(11)
                  : moderateScale(13),
            },
          ]}>
          Level 1 Test
        </Text>
      </View>
      <View
        style={[
          KEY_VIEW,
          {
            top: isTablet()
              ? orientation === 'PORTRAIT'
                ? verticalScale(30)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(0)
                : verticalScale(20)
              : verticalScale(10),
          },
        ]}>
        <TouchableOpacity onPress={() => setIsVisibleInstructionPopup(true)}>
          <KeyIcon width={isTablet() ? 35 : 24} height={isTablet() ? 35 : 24} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          QUIZ_CONTAINER,
          {
            marginTop: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(-20)
                  : verticalScale(-80)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(-170)
                : verticalScale(-80)
              : Platform.OS === 'ios'
              ? verticalScale(40)
              : verticalScale(50),
          },
        ]}>
        <View
          style={[
            QUIZ_IMAGE,
            {
              height: isTablet()
                ? orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(650)
                    : verticalScale(500)
                  : orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(700)
                  : verticalScale(500)
                : verticalScale(280),
            },
          ]}>
          <View style={BODY}>
            <View
              style={[
                CAROUSEL_CONTAINER,
                {
                  marginLeft: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? 0
                      : orientationOpenApp === 'LANDSCAPE'
                      ? 0
                      : horizontalScale(150)
                    : 0,
                },
              ]}>
              <Carousel
                width={
                  isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(350)
                        : horizontalScale(400)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(420)
                      : horizontalScale(550)
                    : horizontalScale(450)
                }
                height={
                  isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(800)
                        : verticalScale(500)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(600)
                      : verticalScale(500)
                    : Platform.OS === 'ios'
                    ? verticalScale(370)
                    : verticalScale(370)
                }
                ref={caroulselRef}
                data={quizFinalTestExam || []}
                renderItem={renderItem}
                loop={false}
                onSnapToItem={_onSnapToItem}
                panGestureHandlerProps={panGestureHandlerProps}
                defaultIndex={activeSlide === -1 ? 0 : activeSlide}
                enabled={true}
                snapEnabled={true}
              />
            </View>

            <View
              style={[
                PAGINATIONDOT_CONTAINER,
                {
                  marginTop: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(-180)
                        : verticalScale(-120)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(-150)
                      : verticalScale(-120)
                    : Platform.OS === 'ios'
                    ? verticalScale(65)
                    : verticalScale(70),
                },
              ]}>
              <PaginationDot
                activeDotColor={color.purple}
                inactiveDotColor={color.purple}
                curPage={activeSlide === -1 ? 0 : activeSlide}
                maxPage={answerLength?.length}
              />
            </View>
          </View>
        </View>
      </View>
      <PopupNextLevel
        isVisible={isVisibleSuccess}
        title={'Congratulations, Super Star!'}
        titleStyle={{
          fontSize: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(16)
              : moderateScale(22)
            : moderateScale(12),
          marginTop: verticalScale(40),
        }}
        description={`- You did it: ${quizSubmitLessonDetail?.totalRightAnswer}/30 \n- Your hard work and dedication have paid off. You've successfully mastered this lesson's concepts and aced the test. Keep up the great work, and continue to explore the exciting world of financial knowledge with TeeFi. You're on your way to becoming a financial superstar! 🌟🎉`}
        descriptionStyle={{
          fontSize: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(8)
              : moderateScale(10)
            : moderateScale(12),
          textAlign: 'left',
          marginTop: verticalScale(5),
          width: isTablet()
            ? orientation === 'PORTRAIT'
              ? '80%'
              : '50%'
            : '100%',
        }}
        confirmButtonStyle={{
          height: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(45)
              : verticalScale(40)
            : verticalScale(40),
          width: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? horizontalScale(80)
              : horizontalScale(100)
            : horizontalScale(80),
        }}
        confirmTextStyle={{
          fontSize: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? moderateScale(10)
              : moderateScale(12)
            : moderateScale(12),
        }}
        onClose={() => setIsVisibleSuccess(false)}
        confirmBtTitle={'Done!'}
        onConfirm={async () => {
          setIsVisibleSuccess(false);
          goBack();
        }}
      />
      <AlertComponent
        isVisible={isVisibleFailed}
        backgroundStyle={{height: verticalScale(65)}}
        title={"Oops, Let's Try Again!"}
        titleStyle={TITLE_POPUP}
        subtitle={`- Your correct results: ${quizSubmitLessonDetail?.totalRightAnswer}/30 \n- To pass the test, you need at least 24 correct answers. Don't worry, everyone faces challenges while learning. Remember, practice makes perfect! Good luck! 💪🌟`}
        subtitleStyle={SUB_TITLE_MODAL}
        confirmBtTitle={'Try Again'}
        confirmTextStyle={{
          fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
        }}
        confirmButtonStyle={{
          width: isTablet() ? horizontalScale(80) : horizontalScale(200),
          height: isTablet() ? 40 : 46,
        }}
        containerButtonStyle={CONTAINER_BUTTON_POPUP}
        onConfirm={() => {
          setIsVisibleFailed(false);
          setIsReNewTest(!isReNewTest);
          setIsUserSubmitLastQuestion(false);
        }}
      />
      <InstructionPopup
        isVisible={isVisibleInstructionPopup}
        title={'Quiz Instructions: Test Your Knowledge!'}
        backgroundHeight={{
          height: isTablet()
            ? orientation === 'PORTRAIT'
              ? orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(135)
                : verticalScale(90)
              : verticalScale(90)
            : verticalScale(90),
        }}
        guide={guide}
        onClose={() => {
          setIsVisibleInstructionPopup(false);
        }}
      />
    </ScrollView>
  );
};

const CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
};
const CONTENT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const LESSON_TITLE: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '600',
  color: color.purple,
};
const KEY_VIEW: ViewStyle = {
  justifyContent: 'flex-end',
  position: 'absolute',
  zIndex: 100,
  right: 0,
};
const QUIZ_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const QUIZ_IMAGE: ViewStyle = {
  width: isTablet() ? horizontalScale(400) : horizontalScale(700),
};
const BODY: ViewStyle = {
  position: 'absolute',
  top: 20,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
};
const QUESTION_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const QUESTION_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '600',
  color: color.black1,
  textAlign: 'center',
};
const BUTTON_ANSWER_CONTAINER: ViewStyle = {
  marginTop: isTablet() ? verticalScale(20) : verticalScale(8),
  borderRadius: moderateScale(8),
  backgroundColor: color.white,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};
const ANSWER_VIEW_CONTAINER: ViewStyle = {
  justifyContent: 'center',
};
const INDEX_VIEW: ViewStyle = {
  width: isTablet() ? 30 : 20,
  height: isTablet() ? 30 : 20,
  borderRadius: moderateScale(60),
  backgroundColor: color.purple1,
  justifyContent: 'center',
  alignItems: 'center',
  marginStart: horizontalScale(10),
};
const INDEX_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(10),
  fontWeight: '600',
  color: color.black1,
  textAlign: 'center',
};
const ANSWER_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.black1,
  marginStart: horizontalScale(10),
};
const CAROUSEL_CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const ITEM_CONTAINER: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  marginTop: verticalScale(50),
};
const BUTTON_VIEW: ViewStyle = {
  flexDirection: 'row',
  flex: 1,
};
const ITEM_CONTENT_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};
const BUTTON_SNAP_NEXT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const BUTTON_SNAP_PREV: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const RIGHT_ANSWER_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '500',
  color: color.purple,
  marginStart: horizontalScale(5),
};
const ANSWER_RIGHT_WRONG_CONTAINER: ViewStyle = {
  alignSelf: 'flex-start',
  justifyContent: 'center',
  alignItems: 'center',
};
const ANSWER_RIGHT_WRONG_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: isTablet() ? verticalScale(8) : verticalScale(5),
};
const PAGINATIONDOT_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const TEXT_TIME_COUNTDOWN_SECOND: TextStyle = {
  fontSize: isTablet() ? moderateScale(9) : moderateScale(12),
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  textAlign: 'center',
  marginTop: verticalScale(10),
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  color: color.purple,
};
const CONTAINER_BUTTON_POPUP: ViewStyle = {
  marginStart: 20,
  marginEnd: 20,
};
const SUB_TITLE_MODAL: TextStyle = {
  fontFamily: typography.promptRegular,
  color: color.black1,
  textAlign: 'left',
  marginTop: verticalScale(25),
  alignSelf: 'flex-start',
};
