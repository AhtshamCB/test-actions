/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TextStyle,
  Platform,
} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {Text} from '@app/components';
import {useLessons, useOrientation} from '@app/hook';
import {color, moderateScale, typography, verticalScale} from '@app/theme';
//
import {useDispatch, useSelector} from 'react-redux';
import {ConfigActions, LessonActions, selector} from '@app/redux';
//
import {Introduction} from '../component/introduction';
import {Quiz} from '../component/quiz';
import {Story} from '../component/story';
import {Game} from '../component/game';
//
import {HeaderLesson} from '../component/header-lesson/header-lesson';
import {usePushTimeLearning} from '@app/hook/usePushTimeLearning';
//
import {isTablet} from 'react-native-device-info';
import {LESSON_STEP} from '@app/utils/contants';
import {Challenge} from '../component/challenge';

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

export const LessonDetail: FC<
  StackScreenProps<NavigatorParamList, 'lessonDetail'>
> = ({navigation, route}) => {
  const {level, lessonId} = route?.params || '';
  const dispatch = useDispatch();
  const orientationTablet = useOrientation();

  const {accessToken} = useSelector(selector.user);
  const {lessonDetail} = useSelector(selector.lessons) || '';
  const {orientation, isFullScreen, orientationOpenApp} = useSelector(
    selector.config,
  );

  const lessonProcess = lessonDetail?.currentPart;

  useEffect(() => {
    getLessonDetail({
      payload: {
        lessonId: lessonId,
      },
    });
    setResultLessonPart(lessonProcess);
    dispatch(ConfigActions.setOrientation('portrait'));
  }, []);

  useEffect(() => {
    setResultLessonPart(lessonProcess);
  }, [lessonProcess]);

  const {getLessonDetail} = useLessons();

  const {pushLearningTime, timeLearning, triggerSetTimeLearning} =
    usePushTimeLearning(lessonId);

  const [resultLessonPart, setResultLessonPart] = useState<any>(lessonProcess);
  useState<boolean>(false);

  const renderLessonProcess = lesson => {
    switch (lesson) {
      case LESSON_STEP.CHALLENGE:
        return (
          <Challenge
            accessToken={accessToken}
            lessonId={lessonId}
            onGoToIntroduction={async () => {
              dispatch(LessonActions.setSubmitLesson(''));
              triggerSetTimeLearning(new Date());
              setResultLessonPart('introduction');
            }}
            triggerTimeLearning={() => triggerSetTimeLearning(new Date())}
            pushTimeLearning={async () => {
              await pushLearningTime(timeLearning);
            }}
          />
        );
      case LESSON_STEP.INTRODUCTION:
        return (
          <Introduction
            accessToken={accessToken}
            lessonId={lessonId}
            triggerGetLesson={getLessonDetail}
            onGoBackToChallenge={() => {
              triggerSetTimeLearning(new Date());
              dispatch(LessonActions.setSubmitLesson(''));
              setResultLessonPart('challenge');
            }}
            onGoQuizPart={async () => {
              dispatch(LessonActions.setSubmitLesson(''));
              triggerSetTimeLearning(new Date());
              setResultLessonPart('question');
            }}
            pushTimeLearning={async () => {
              await pushLearningTime(timeLearning);
            }}
          />
        );
      case LESSON_STEP.QUESTIONS:
        return (
          <Quiz
            accessToken={accessToken}
            lessonId={lessonId}
            questionStatus={lessonDetail?.questionStatus}
            triggerGetLesson={getLessonDetail}
            onGoToStoryPart={async () => {
              triggerSetTimeLearning(new Date());
              setResultLessonPart('story');
            }}
            onBackToIntroductionPart={() => {
              triggerSetTimeLearning(new Date());
              dispatch(LessonActions.setSubmitLesson(''));
              setResultLessonPart('introduction');
              dispatch(LessonActions.setQuizSubmitLesson(''));
              dispatch(LessonActions.resetArrayAnswerLesson());
              dispatch(LessonActions.resetArrayQuizSubmitLesson());
              dispatch(LessonActions.setCountNumberOfTimesQuestionAnswers(0));
            }}
            pushTimeLearning={async () => {
              await pushLearningTime(timeLearning);
            }}
          />
        );
      case LESSON_STEP.STORY:
        return (
          <Story
            accessToken={accessToken}
            lessonId={lessonId}
            triggerGetLesson={getLessonDetail}
            onGoToGamePart={async () => {
              triggerSetTimeLearning(new Date());
              dispatch(LessonActions.setSubmitLesson(''));
              setResultLessonPart('game');
            }}
            onBackToQuizPart={() => {
              triggerSetTimeLearning(new Date());
              dispatch(LessonActions.setSubmitLesson(''));
              setResultLessonPart('question');
            }}
            pushTimeLearning={async () => {
              await pushLearningTime(timeLearning);
            }}
          />
        );
      case LESSON_STEP.GAME:
        return (
          <Game
            accessToken={accessToken}
            lessonId={lessonId}
            onGoToNextLesson={async () => {
              navigation.pop(1);
              triggerSetTimeLearning(new Date());
              dispatch(LessonActions.resetArrayAnswerLesson());
              dispatch(LessonActions.resetArrayQuizSubmitLesson());
            }}
            triggerTimeLearning={() => triggerSetTimeLearning(new Date())}
            pushTimeLearning={async () => {
              await pushLearningTime(timeLearning);
            }}
            onBackToStoryPart={() => {
              triggerSetTimeLearning(new Date());
              setResultLessonPart('story');
            }}
            onBackToIntroduction={() => {
              triggerSetTimeLearning(new Date());
              setResultLessonPart('introduction');
            }}
          />
        );
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

  const renderTitleLevel = levelTitle => {
    switch (levelTitle) {
      case 'level1':
        return 'Level 1';
      case 'level2':
        return 'Level 2';
      case 'level3':
        return 'Level 3';
      case 'level4':
        return 'Level 4';
      case 'level5':
        return 'Level 5';
    }
  };

  return (
    <View style={CONTAINER}>
      {orientationTablet === 'PORTRAIT' ? (
        <>
          {isFullScreen === false ? (
            <>
              <>
                <HeaderLesson
                  title={renderTitleLevel(level)}
                  onBackPress={() => {
                    dispatch(LessonActions.setSubmitLesson(''));
                    dispatch(LessonActions.setQuizSubmitLesson(''));
                    dispatch(LessonActions.resetArrayAnswerLesson());
                    dispatch(LessonActions.resetArrayQuizSubmitLesson());
                    dispatch(
                      LessonActions.setCountNumberOfTimesQuestionAnswers(0),
                    );
                    navigation.goBack();
                  }}
                  isShowLeft={orientation === 'portrait' ? true : false}
                />
                <>
                  <View
                    style={[
                      BACKGROUND_CONTAINER,
                      {
                        marginTop: isTablet()
                          ? orientationTablet === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? verticalScale(-10)
                              : verticalScale(-20)
                            : verticalScale(-10)
                          : Platform.OS === 'ios'
                          ? verticalScale(-10)
                          : verticalScale(20),
                      },
                    ]}>
                    <Image
                      source={renderBackgroundLevel(level)}
                      style={[
                        IMAGE_BACKGROUND,
                        {
                          height: isTablet()
                            ? orientationTablet === 'PORTRAIT'
                              ? verticalScale(200)
                              : verticalScale(210)
                            : verticalScale(210),
                        },
                      ]}
                      resizeMode={
                        isTablet()
                          ? orientationTablet === 'PORTRAIT'
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
                  <View
                    style={[
                      CONTENT,
                      {
                        marginTop: isTablet()
                          ? orientationTablet === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? verticalScale(15)
                              : verticalScale(-5)
                            : verticalScale(10)
                          : verticalScale(10),
                      },
                    ]}>
                    <Text
                      text={`Lesson ${lessonDetail?.order || ''}: `}
                      style={[
                        LESSON_TITLE,
                        {
                          fontSize: isTablet()
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(14)
                              : moderateScale(16)
                            : moderateScale(15),
                        },
                      ]}
                    />
                    <Text
                      text={lessonDetail?.name}
                      style={[
                        LESSON_DESCRIPTION,
                        {
                          fontSize: isTablet()
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(14)
                              : moderateScale(16)
                            : moderateScale(15),
                        },
                      ]}
                    />
                  </View>
                </>
              </>
            </>
          ) : null}
        </>
      ) : (
        <>
          {orientation !== 'landscape' && (
            <HeaderLesson
              title={`Lesson ${lessonDetail?.order}: ${lessonDetail?.name}`}
              onBackPress={() => {
                dispatch(LessonActions.setSubmitLesson(''));
                dispatch(LessonActions.setQuizSubmitLesson(''));
                dispatch(LessonActions.resetArrayAnswerLesson());
                dispatch(LessonActions.resetArrayQuizSubmitLesson());
                dispatch(LessonActions.setCountNumberOfTimesQuestionAnswers(0));
                navigation.goBack();
              }}
              isShowLeft={orientation === 'portrait' ? true : false}
            />
          )}
        </>
      )}

      <View
        style={[
          LESSON_PROCESS_VIEW,
          {
            marginTop: isTablet()
              ? orientation === 'portrait'
                ? verticalScale(20)
                : verticalScale(10)
              : verticalScale(10),
          },
        ]}>
        {renderLessonProcess(resultLessonPart)}
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const BACKGROUND_CONTAINER: ViewStyle = {};
const IMAGE_BACKGROUND: ImageStyle = {
  width: '100%',
};
const CONTENT: ViewStyle = {
  paddingHorizontal: 20,
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'center',
};
const LESSON_TITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: isTablet() ? moderateScale(16) : moderateScale(15),
  fontWeight: '700',
  color: color.purple,
};
const LESSON_DESCRIPTION: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  color: color.black1,
  flex: 1,
};
const LESSON_PROCESS_VIEW: ViewStyle = {
  flex: 1,
};
