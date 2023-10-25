import React, {FC} from 'react';
import {View, ViewStyle, Image, ImageStyle, Platform} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useOrientation} from '@app/hook';
import {color, verticalScale} from '@app/theme';
//
import {useDispatch, useSelector} from 'react-redux';
import {LessonActions, selector} from '@app/redux';
//
import {HeaderLesson} from '../component/header-lesson/header-lesson';
//
import {isTablet} from 'react-native-device-info';
import {QuizFinalTestExam} from './components/quiz-final-test';

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

export const FinalTestLesson: FC<
  StackScreenProps<NavigatorParamList, 'finalTestLesson'>
> = ({navigation, route}) => {
  const {levelId} = route?.params || '';
  const dispatch = useDispatch();
  const orientationTablet = useOrientation();

  const {orientation, isFullScreen, orientationOpenApp} = useSelector(
    selector.config,
  );

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
                  title={renderTitleLevel('level1')}
                  onBackPress={() => {
                    dispatch(LessonActions.setSubmitLesson(''));
                    dispatch(LessonActions.resetArrayAnswerLesson());
                    dispatch(LessonActions.resetArrayQuizSubmitLesson());
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
                      source={renderBackgroundLevel('level1')}
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
                </>
              </>
            </>
          ) : null}
        </>
      ) : (
        <>
          {orientation !== 'landscape' && (
            <HeaderLesson
              title={renderTitleLevel('level 1')}
              onBackPress={() => {
                dispatch(LessonActions.setSubmitLesson(''));
                dispatch(LessonActions.resetArrayAnswerLesson());
                dispatch(LessonActions.resetArrayQuizSubmitLesson());
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
        <QuizFinalTestExam levelId={levelId} />
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
const LESSON_PROCESS_VIEW: ViewStyle = {
  flex: 1,
};
