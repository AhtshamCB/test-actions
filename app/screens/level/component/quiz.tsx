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
import {
  AlertComponent,
  ButtonLinearGradient,
  CountdownTimerSecond,
  Text,
} from '@app/components';
import {
  BackButtonQuizIcon,
  CorrectIcon,
  KeyIcon,
  NextButtonQuizIcon,
  StepFinishQuiz,
  WrongIcon,
} from '@app/svg';
import {useDispatch, useSelector} from 'react-redux';
import {LessonActions, selector} from '@app/redux';
import Carousel from 'react-native-reanimated-carousel';
import PaginationDot from 'react-native-animated-pagination-dot';
import {useLessons, useOrientation, useSubmitLesson} from '@app/hook';
import {EXAM_STATUS, QUESTION_STATUS, STATUS, TYPE} from '@app/utils/contants';
//
import {isTablet} from 'react-native-device-info';
import {Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PopupNextLevel} from '../component/popup-next-level/popup-next-level';
import {InstructionPopup} from '../component/instruction-popup/instruction-popup';

const NEXT_ICON = require('../images/next.png');
const PREV_ICON = require('../images/prev.png');

export const Quiz = ({
  accessToken,
  lessonId,
  triggerGetLesson,
  onBackToIntroductionPart,
  onGoToStoryPart,
  pushTimeLearning,
  questionStatus,
}) => {
  const type = 'question';
  const caroulselRef = useRef<any>(null);
  const orientation = useOrientation();
  const dispatch = useDispatch();

  useEffect(() => {
    getQuizLessonDetail({
      payload: {
        lessonId: lessonId,
      },
    });
    createQuestionSession({
      payload: {
        lessonId: lessonId,
      },
    });
  }, []);

  const {
    getQuizLessonDetail,
    isLoading,
    createQuestionSession,
    questionSessionId,
  } = useLessons();

  const {userInfo} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);
  const {
    quizLessonDetail,
    arrayAnswerLesson,
    arrayQuizSubmitLesson,
    quizSubmitLessonDetail,
    countNumberOfTimesQuestionAnswers,
    lessonDetail,
  } = useSelector(selector.lessons);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [answerId, setAnswerId] = useState();
  const [questionId, setQuestionId] = useState();
  const [isUserSubmitLastQuestion, setIsUserSubmitLastQuestion] =
    useState<boolean>(false);
  const [showFooterButton, setShowFooterButton] = useState<boolean>(false);
  const [isVisibleInstructionPopup, setIsVisibleInstructionPopup] =
    useState<boolean>(false);
  const [isVisibleFailed, setIsVisibleFailed] = useState<boolean>(false);
  const [isReNewQuiz, setIsReNewQuiz] = useState<boolean>(false);

  const findIndexInProgress = quizLessonDetail?.findIndex(
    item => item?.status === STATUS.IN_PROGRESS,
  );

  useEffect(() => {
    const listQuestionCompleted =
      quizLessonDetail?.filter(x => x.status === QUESTION_STATUS.COMPLETED) ||
      [];
    const isQuizAgain =
      lessonDetail?.questionStatus === QUESTION_STATUS.COMPLETED;
    const checkAllStatusCompleted = quizLessonDetail?.every(
      x => x.status === QUESTION_STATUS.COMPLETED,
    );
    if (!checkAllStatusCompleted && !isQuizAgain) {
      listQuestionCompleted?.map(item => {
        const dataAnswer = item.answers.find(x => x.key === item.answerKey);
        const dataRightAnswer = item.answers.find(
          x => x.key === item.rightAnswerKey,
        );
        dispatch(
          LessonActions.setArrayAnswerLesson({
            questionId: item._id,
            answerKey: dataAnswer?.key,
            answerId: dataAnswer?._id,
            success: dataAnswer?.key === dataRightAnswer?.key,
            status: item?.status,
          }),
        );
        dispatch(
          LessonActions.setArrayQuizSubmitLesson({
            earned: item?.earned,
            success: dataAnswer?.key === dataRightAnswer?.key,
            status: item?.status,
            rightAnswerKey: item.rightAnswerKey,
            rightAnswerId: dataRightAnswer?._id,
          }),
        );
        dispatch(
          LessonActions.setQuizSubmitLesson({
            earned: item?.earned,
            success: dataAnswer?.key === dataRightAnswer?.key,
            rightAnswerKey: item.rightAnswerKey,
            rightAnswerId: dataRightAnswer?._id,
          }),
        );
      });
    }
  }, [quizLessonDetail]);

  const {submitLesson} = useSubmitLesson(
    accessToken,
    lessonId,
    type,
    questionId,
    selectedAnswer,
    answerId,
    questionSessionId,
  );

  useEffect(() => {
    getQuizLessonDetail({
      payload: {
        lessonId: lessonId,
      },
    });
    createQuestionSession({
      payload: {
        lessonId: lessonId,
      },
    });
    setActiveSlide(0);
  }, [isReNewQuiz]);

  useEffect(() => {
    setActiveSlide(
      quizLessonDetail?.findIndex(item => item?.status === STATUS.IN_PROGRESS),
    );
  }, [findIndexInProgress]);

  useEffect(() => {
    const isQuizAgain =
      lessonDetail?.questionStatus === QUESTION_STATUS.COMPLETED;

    if (isUserSubmitLastQuestion) {
      if (
        userInfo?.me?.role === TYPE.KID ||
        userInfo?.me?.role === TYPE.STUDENT
      ) {
        if (
          quizSubmitLessonDetail?.questionSessionStatus ===
            EXAM_STATUS.FAILED &&
          !isQuizAgain
        ) {
          setTimeout(() => {
            dispatch(
              LessonActions.setCountNumberOfTimesQuestionAnswers(
                countNumberOfTimesQuestionAnswers + 1,
              ),
            );
            setIsVisibleFailed(true);
          }, 15000);
        } else {
          setTimeout(() => {
            setIsVisible(true);
            setShowFooterButton(true);
          }, 15000);
        }
      }
    }
  }, [isUserSubmitLastQuestion]);

  const answerLength = quizLessonDetail?.map(item => item.answers);

  const [activeSlide, setActiveSlide] =
    useState<number>(findIndexInProgress) || 0;

  const _onSnapToItem = index => {
    setActiveSlide(index);
  };

  const panGestureHandlerProps = {
    activeOffsetX: 0,
    failOffsetX: 0,
  };

  const isLastQuestion = activeSlide === quizLessonDetail?.length - 1;

  const guide = `<p><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;">Welcome to the Quiz section, where you'll put your financial knowledge to the test. There are 5 quizzes waiting for you to conquer. </span></p>
  <p><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;">Your goal is to answer at least 4 out of 5 questions correctly to move on to the next section. Each correct answer will earn you $20.</span></p>
  <p><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;">If you answer 3 questions or fewer correctly, you'll get a second chance to try again. After the second try, if you still haven't achieved the required score, you'll need to go back to the previous section (Lesson Introduction) and brush up on your knowledge before attempting the quiz again.</span></p>
  <p><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;"><strong>Here's how it works:</strong></span></p>
  <p><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;"><strong>Answering Quizzes:</strong></span></p>
  <ul>
  <li><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;">Read each question carefully and select the best answer from the options provided.</span></li>
  <li><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;">Remember, each question challenges your understanding of the financial topics you've learned.</span></li>
  </ul>
  <p><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;"><strong>Completion and Rewards:</strong></span></p>
  <ul>
  <li><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;">To proceed to the next section, make sure you've answered at least 4 questions correctly.</span></li>
  </ul>
  <p><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;">Remember, the quizzes are designed to reinforce what you've learned and help you solidify your financial expertise. So, give it your all, and let's see how much you've mastered the world of finance. Best of luck, and let the learning and earning begin!</span><br></p>`;

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
                : verticalScale(35),
              width: isTablet()
                ? orientation === 'PORTRAIT'
                  ? '70%'
                  : orientationOpenApp === 'LANDSCAPE'
                  ? '50%'
                  : '70%'
                : '75%',
            },
          ]}>
          <Text
            text={item?.question}
            style={[
              QUESTION_TEXT,
              {
                fontSize: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? moderateScale(12)
                    : moderateScale(12)
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
                  paddingHorizontal: isTablet() ? 30 : 20,
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
                        : horizontalScale(25),
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
                  paddingHorizontal: isTablet() ? 30 : 20,
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
                        : horizontalScale(25),
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
                        ? verticalScale(200)
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
                        await setSelectedAnswer(answer?.key);
                        await setQuestionId(item?._id);
                        await setAnswerId(answer?._id);
                        await submitLesson();
                        if (isLastQuestion) {
                          pushTimeLearning();
                          setIsUserSubmitLastQuestion(true);
                        }
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
                                    : moderateScale(10),
                              },
                            ]}
                            text={
                              (userInfo?.me?.role === TYPE.KID ||
                                userInfo?.me?.role === TYPE.STUDENT) &&
                              quizSubmitLessonDetail?.earned !== 0
                                ? `You Are Right! You Earned $${quizSubmitLessonDetail?.earned}`
                                : 'You Are Right!'
                            }
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
                                      : moderateScale(10),
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
                  paddingHorizontal: isTablet() ? 30 : 20,
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
                        : horizontalScale(25),
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
                  paddingHorizontal: isTablet() ? 30 : 10,
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
        <View
          style={[
            BOTTOM_VIEW,
            {
              top: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(30)
                  : verticalScale(20)
                : verticalScale(15),
            },
          ]}
        />
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
          3. Quiz:{' '}
          {questionStatus === QUESTION_STATUS.INPROGRESS ? (
            <Text
              style={[
                LESSON_DESCRIPTION,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(11)
                      : moderateScale(13),
                },
              ]}>
              You will earn $100 when you answer all questions below correctly
            </Text>
          ) : (
            <Text
              style={[
                LESSON_DESCRIPTION,
                {
                  fontSize:
                    orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(11)
                      : moderateScale(13),
                },
              ]}>
              The more you answer, the more you earn. Have you ever answered all
              5 questions correctly?
            </Text>
          )}
        </Text>
      </View>
      <View
        style={[
          KEY_VIEW,
          {
            top: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(40)
                  : verticalScale(30)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(30)
                : verticalScale(20)
              : verticalScale(30),
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
                  ? verticalScale(-90)
                  : verticalScale(-90)
                : orientationOpenApp === 'LANDSCAPE'
                ? questionStatus === QUESTION_STATUS.INPROGRESS
                  ? verticalScale(-140)
                  : verticalScale(-170)
                : verticalScale(-90)
              : Platform.OS === 'ios'
              ? verticalScale(30)
              : verticalScale(40),
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
                    : horizontalScale(430)
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
                    : verticalScale(350)
                }
                ref={caroulselRef}
                data={quizLessonDetail || []}
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
                        ? verticalScale(-270)
                        : verticalScale(-120)
                      : orientationOpenApp === 'LANDSCAPE'
                      ? verticalScale(-150)
                      : verticalScale(-120)
                    : Platform.OS === 'ios'
                    ? verticalScale(60)
                    : verticalScale(60),
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
      <View
        style={[
          BUTTON_LINEAR_GRADIENT_CONTAINER,
          {
            marginTop: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(0)
                  : verticalScale(-10)
                : orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(30)
                : verticalScale(10)
              : verticalScale(0),
          },
        ]}>
        {isTablet() ? (
          <View>
            {questionStatus === QUESTION_STATUS.COMPLETED ||
            showFooterButton ? (
              <>
                <View
                  style={[
                    BUTTON_LINEAR_GRADIENT_VIEW,
                    {
                      marginLeft:
                        orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(10)
                            : horizontalScale(20)
                          : horizontalScale(20),
                      marginTop:
                        orientation === 'PORTRAIT'
                          ? verticalScale(30)
                          : verticalScale(10),
                    },
                  ]}>
                  <ButtonLinearGradient
                    text={'Back'}
                    style={[
                      BUTTON_LINEAR_GRADIENT_CONTENT,
                      {
                        width: horizontalScale(80),
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(60)
                            : verticalScale(40),
                        marginTop: verticalScale(20),
                      },
                    ]}
                    textStyle={TEXT_CONFIRM}
                    onPress={onBackToIntroductionPart}
                  />
                  <StepFinishQuiz
                    width={isTablet() ? 200 : 120}
                    height={isTablet() ? 100 : 70}
                    props={undefined}
                  />
                  <ButtonLinearGradient
                    text={'Next To Story'}
                    style={[
                      BUTTON_LINEAR_GRADIENT_CONTENT,
                      {
                        width: horizontalScale(80),
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(60)
                            : verticalScale(40),
                        marginTop: verticalScale(20),
                      },
                    ]}
                    textStyle={TEXT_CONFIRM}
                    onPress={onGoToStoryPart}
                  />
                </View>
              </>
            ) : (
              <View
                style={[
                  BUTTON_LINEAR_GRADIENT_VIEW,
                  {
                    marginTop:
                      questionStatus === QUESTION_STATUS.INPROGRESS
                        ? orientation === 'PORTRAIT'
                          ? verticalScale(30)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(10)
                          : verticalScale(30)
                        : verticalScale(10),
                  },
                ]}>
                <View
                  style={[
                    BUTTON_LINEAR_GRADIENT_CONTENT,
                    {
                      width: horizontalScale(80),
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(60)
                          : verticalScale(40),
                      marginTop: verticalScale(20),
                    },
                  ]}
                />
                <StepFinishQuiz
                  width={isTablet() ? 200 : 120}
                  height={isTablet() ? 100 : 70}
                  props={undefined}
                />
                <ButtonLinearGradient
                  text={'Back'}
                  style={[
                    BUTTON_LINEAR_GRADIENT_CONTENT,
                    {
                      width: horizontalScale(80),
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(60)
                          : verticalScale(40),
                      marginTop: verticalScale(20),
                    },
                  ]}
                  textStyle={TEXT_CONFIRM}
                  onPress={onBackToIntroductionPart}
                />
              </View>
            )}
          </View>
        ) : (
          <>
            <StepFinishQuiz
              width={isTablet() ? 200 : 120}
              height={isTablet() ? 100 : 70}
              props={undefined}
            />
            {questionStatus === QUESTION_STATUS.COMPLETED ||
            showFooterButton ? (
              <>
                <View style={BUTTON_LINEAR_GRADIENT_VIEW}>
                  <ButtonLinearGradient
                    text={'Back'}
                    style={BUTTON_LINEAR_GRADIENT_CONTENT}
                    textStyle={TEXT_CONFIRM}
                    onPress={onBackToIntroductionPart}
                  />

                  <ButtonLinearGradient
                    text={'Next To Story'}
                    style={BUTTON_LINEAR_GRADIENT_CONTENT}
                    textStyle={TEXT_CONFIRM}
                    onPress={onGoToStoryPart}
                  />
                </View>
              </>
            ) : (
              <ButtonLinearGradient
                text={'Back'}
                style={[
                  BUTTON_LINEAR_GRADIENT_CONTENT,
                  {marginTop: verticalScale(2)},
                ]}
                textStyle={TEXT_CONFIRM}
                onPress={onBackToIntroductionPart}
              />
            )}
          </>
        )}
      </View>
      <PopupNextLevel
        isVisible={isVisible}
        title={
          questionStatus === QUESTION_STATUS.INPROGRESS
            ? 'You Earned '
            : 'You Earned More '
        }
        subtitle={`$${quizSubmitLessonDetail?.totalEarnedQuiz}`}
        description={
          questionStatus === QUESTION_STATUS.INPROGRESS
            ? 'This result was recorded from your initial attempt at the quizzes.'
            : 'You have just completed the Quizzes'
        }
        onClose={() => setIsVisible(false)}
        confirmBtTitle={'Next To Story'}
        onConfirm={async () => {
          setIsVisible(false);
          triggerGetLesson();
          onGoToStoryPart();
        }}
      />
      <AlertComponent
        isVisible={isVisibleFailed}
        backgroundStyle={{height: verticalScale(65)}}
        title={
          countNumberOfTimesQuestionAnswers <= 1
            ? 'Your Result'
            : 'Second Try Result'
        }
        titleStyle={TITLE_POPUP}
        subtitle={
          countNumberOfTimesQuestionAnswers <= 1
            ? "Oops. Let's Try Again! To pass this Quiz, you need at least 4 correct answers."
            : 'Unfortunately! You have to learn again the Introduction before doing the Quiz again.'
        }
        subtitleStyle={[
          SUB_TITLE_MODAL,
          {
            fontSize: isTablet() ? moderateScale(8) : moderateScale(12),
            marginTop: verticalScale(30),
          },
        ]}
        confirmBtTitle={
          countNumberOfTimesQuestionAnswers <= 1
            ? 'Second Try'
            : 'Back To Introduction'
        }
        confirmTextStyle={{
          fontSize: isTablet() ? moderateScale(10) : moderateScale(12),
        }}
        containerButtonStyle={CONTAINER_BUTTON_POPUP}
        onConfirm={() => {
          if (countNumberOfTimesQuestionAnswers <= 1) {
            setIsVisibleFailed(false);
            setIsReNewQuiz(!isReNewQuiz);
            setIsUserSubmitLastQuestion(false);
            dispatch(LessonActions.setQuizSubmitLesson(''));
            dispatch(LessonActions.setSubmitLesson(''));
            dispatch(LessonActions.resetArrayAnswerLesson());
            dispatch(LessonActions.resetArrayQuizSubmitLesson());
            // dispatch(LessonActions.setQuizLessonDetail([]));
          } else {
            setIsUserSubmitLastQuestion(false);
            dispatch(LessonActions.setQuizSubmitLesson(''));
            dispatch(LessonActions.resetArrayAnswerLesson());
            dispatch(LessonActions.resetArrayQuizSubmitLesson());
            dispatch(LessonActions.setCountNumberOfTimesQuestionAnswers(0));
            // dispatch(LessonActions.setQuizLessonDetail([]));
            onBackToIntroductionPart();
            setIsVisibleFailed(false);
          }
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
        onClose={() => setIsVisibleInstructionPopup(false)}
      />
    </ScrollView>
  );
};

const CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
};
const CONTENT: ViewStyle = {
  paddingHorizontal: horizontalScale(12),
  marginStart: isTablet() ? horizontalScale(0) : horizontalScale(10),
};
const BOTTOM_VIEW: ViewStyle = {
  borderBottomColor: color.yellow,
  borderBottomWidth: 3,
  width: isTablet() ? horizontalScale(25) : horizontalScale(70),
  position: 'absolute',
  zIndex: 10,
  height: 5,
  right: 0,
  left: isTablet() ? horizontalScale(8) : horizontalScale(0),
};
const LESSON_TITLE: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '600',
  color: color.purple,
};
const LESSON_DESCRIPTION: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '600',
  color: color.black1,
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
const BUTTON_LINEAR_GRADIENT_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const TEXT_CONFIRM: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: isTablet() ? moderateScale(10) : moderateScale(14),
};
const BUTTON_LINEAR_GRADIENT_CONTENT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: moderateScale(50),
  width: horizontalScale(150),
  height: verticalScale(40),
  marginTop: verticalScale(-10),
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
const BUTTON_LINEAR_GRADIENT_VIEW: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around',
  marginTop: verticalScale(10),
};
const TEXT_TIME_COUNTDOWN_SECOND: TextStyle = {
  fontSize: isTablet() ? moderateScale(9) : moderateScale(12),
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  textAlign: 'center',
  marginTop: verticalScale(10),
};
const PAGINATIONDOT_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
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
