/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {ButtonLinearGradient, Text} from '@app/components';
import {PopupNextLevel} from './popup-next-level/popup-next-level';
import {useDispatch, useSelector} from 'react-redux';
import {ConfigActions, LessonActions, selector} from '@app/redux';
import {FullscreenIcon, KeyIcon, StepFinishGame} from '@app/svg';
import {useLessons, useSubmitGameLesson} from '@app/hook';
import {STATUS, TYPE} from '@app/utils/contants';
import {isTablet} from 'react-native-device-info';
import WebView from 'react-native-webview';
import {debounce} from 'lodash';
import {InstructionPopup} from './instruction-popup/instruction-popup';

export const Game = ({
  accessToken,
  lessonId,
  onBackToStoryPart,
  onGoToNextLesson,
  pushTimeLearning,
  onBackToIntroduction,
  triggerTimeLearning,
}) => {
  const dispatch = useDispatch();
  const type = 'game';
  const webViewRef = useRef(null);

  const {userInfo} = useSelector(selector.user);
  const {orientation, isFullScreen, orientationOpenApp} = useSelector(
    selector.config,
  );
  const {gameLessonDetail, submitLessonDetail} =
    useSelector(selector.lessons) || '';

  useEffect(() => {
    getGameLessonDetail({
      payload: {
        lessonId: lessonId,
      },
    });
  }, []);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isVisibleInstructionPopup, setIsVisibleInstructionPopup] =
    useState<boolean>(false);

  const {getGameLessonDetail, isLoading} = useLessons();
  const {submitGameLesson} = useSubmitGameLesson(
    accessToken,
    lessonId,
    type,
    score,
  );

  const debounceSubmitGame = useCallback(
    debounce(() => {
      endGame();
    }, 1000),
    [],
  );

  const endGame = async () => {
    if (
      userInfo?.me?.role === TYPE.KID ||
      userInfo?.me?.role === TYPE.STUDENT
    ) {
      await pushTimeLearning();
      await setScore(150);
      await submitGameLesson();
    }
  };

  const onConfirm = async () => {
    setIsVisible(false);
    if (gameLessonDetail?.game?.status !== STATUS.COMPLETED) {
      onGoToNextLesson();
    } else {
      onBackToIntroduction();
    }
    dispatch(LessonActions.setSubmitLesson(''));
  };

  const handleMessage = async event => {
    const message = event.nativeEvent.data; // Extract the message from the event object
    if (message === 'gameStarted') {
      triggerTimeLearning();
    } else if (message === 'gameEnded') {
      dispatch(ConfigActions.setOrientation('portrait'));
      setIsVisible(true);
      setTimeout(() => {
        debounceSubmitGame();
      }, 300);
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

  return (
    <View
      style={[
        CONTAINER,
        {
          marginTop: isTablet()
            ? verticalScale(-15)
            : orientation === 'portrait'
            ? verticalScale(10)
            : verticalScale(-10),
        },
      ]}>
      {orientation === 'portrait' && !isFullScreen && (
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
            5. Game:{' '}
            {gameLessonDetail?.game?.status !== STATUS.COMPLETED ? (
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
                You will earn $150 when you complete this game
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
                The more you play, the more you earn. What key learnings did you
                gain from playing this game?
              </Text>
            )}
          </Text>
        </View>
      )}
      {orientation === 'portrait' && (
        <View
          style={[
            KEY_VIEW,
            {
              top: isTablet()
                ? orientation === 'portrait'
                  ? verticalScale(40)
                  : verticalScale(-40)
                : verticalScale(20),
            },
          ]}>
          <TouchableOpacity onPress={() => setIsVisibleInstructionPopup(true)}>
            <KeyIcon
              width={isTablet() ? 35 : 24}
              height={isTablet() ? 35 : 24}
            />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          height:
            orientation === 'portrait'
              ? isTablet()
                ? isFullScreen
                  ? '60%'
                  : '70%'
                : '54%'
              : isTablet()
              ? '100%'
              : '100%',
          width: '100%',
          marginTop:
            orientation === 'portrait' ? verticalScale(20) : verticalScale(0),
        }}>
        <WebView
          ref={webViewRef}
          webContentsDebuggingEnabled={true}
          startInLoadingState={true}
          javaScriptEnabled
          injectedJavaScript={`(function(){
            window.postMessage = function(data) {
              window.ReactNativeWebView.postMessage(data);
            };
          })()`}
          source={{
            uri: gameLessonDetail?.game?.src,
          }}
          onMessage={handleMessage}
          mixedContentMode={'always'}
        />
      </View>
      <View
        style={{
          justifyContent: orientation === 'landscape' ? 'center' : 'flex-end',
          alignItems: orientation === 'landscape' ? 'center' : 'flex-end',
          marginRight: horizontalScale(5),
          marginTop: verticalScale(5),
          position: orientation === 'landscape' ? 'absolute' : 'relative',
          right: orientation === 'landscape' ? 10 : 0,
          bottom: orientation === 'landscape' ? 10 : 0,
        }}>
        <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            backgroundColor: color.purple,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (isTablet()) {
              dispatch(ConfigActions.setIsFullScreen(!isFullScreen));
              StatusBar.setHidden(true);
              if (orientation === 'portrait') {
                dispatch(ConfigActions.setOrientationGame('landscape'));
                dispatch(ConfigActions.setOrientation('landscape'));
                StatusBar.setHidden(true);
              } else {
                dispatch(ConfigActions.setOrientationGame('default'));
                dispatch(ConfigActions.setOrientation('portrait'));
              }
            } else {
              if (orientation === 'portrait') {
                dispatch(ConfigActions.setOrientation('landscape'));
                StatusBar.setHidden(true);
              } else {
                dispatch(ConfigActions.setOrientation('portrait'));
              }
            }
          }}>
          <FullscreenIcon />
        </TouchableOpacity>
      </View>
      {isTablet() ? (
        <View
          style={[
            BUTTON_LINEAR_GRADIENT_CONTAINER,
            {
              marginTop: verticalScale(20),
            },
          ]}>
          {gameLessonDetail?.game?.status === STATUS.COMPLETED ? (
            <>
              <View style={[BUTTON_LINEAR_GRADIENT_VIEW]}>
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
                    },
                  ]}
                  textStyle={TEXT_CONFIRM}
                  onPress={onBackToStoryPart}
                />
                <View style={{marginTop: verticalScale(-20)}}>
                  <StepFinishGame
                    width={isTablet() ? 200 : 120}
                    height={isTablet() ? 100 : 70}
                    props={undefined}
                  />
                </View>
                <ButtonLinearGradient
                  text={'Lessons List'}
                  style={[
                    BUTTON_LINEAR_GRADIENT_CONTENT,
                    {
                      width: horizontalScale(80),
                      height:
                        orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(60)
                          : verticalScale(40),
                    },
                  ]}
                  textStyle={TEXT_CONFIRM}
                  onPress={onGoToNextLesson}
                />
              </View>
            </>
          ) : (
            <View style={[BUTTON_LINEAR_GRADIENT_VIEW]}>
              <View
                style={[
                  BUTTON_LINEAR_GRADIENT_CONTENT,
                  {
                    width: horizontalScale(80),
                    height:
                      orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(40),
                  },
                ]}
              />
              <View style={{marginTop: verticalScale(-20)}}>
                <StepFinishGame
                  width={isTablet() ? 200 : 120}
                  height={isTablet() ? 100 : 70}
                  props={undefined}
                />
              </View>
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
                  },
                ]}
                textStyle={TEXT_CONFIRM}
                onPress={onBackToStoryPart}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={BUTTON_LINEAR_GRADIENT_CONTAINER}>
          <StepFinishGame
            width={isTablet() ? 200 : 120}
            height={isTablet() ? 100 : 70}
            props={undefined}
          />
          {submitLessonDetail?.success === true ||
          gameLessonDetail?.game?.status === STATUS.COMPLETED ? (
            <>
              <View style={[BUTTON_LINEAR_GRADIENT_VIEW]}>
                <ButtonLinearGradient
                  text={'Back'}
                  style={BUTTON_LINEAR_GRADIENT_CONTENT}
                  textStyle={TEXT_CONFIRM}
                  onPress={onBackToStoryPart}
                />

                <ButtonLinearGradient
                  text={'Lessons List'}
                  style={BUTTON_LINEAR_GRADIENT_CONTENT}
                  textStyle={TEXT_CONFIRM}
                  onPress={onGoToNextLesson}
                />
              </View>
            </>
          ) : (
            <ButtonLinearGradient
              text={'Back'}
              style={[
                BUTTON_LINEAR_GRADIENT_CONTENT,
                {marginTop: verticalScale(10)},
              ]}
              textStyle={TEXT_CONFIRM}
              onPress={onBackToStoryPart}
            />
          )}
        </View>
      )}

      <InstructionPopup
        isVisible={isVisibleInstructionPopup}
        backgroundHeight={{
          height: isTablet() ? verticalScale(90) : verticalScale(80),
        }}
        title={'Game Story'}
        guide={gameLessonDetail?.game?.guide}
        onClose={() => setIsVisibleInstructionPopup(false)}
      />

      <PopupNextLevel
        isVisible={isVisible}
        isGamePart={true}
        title={
          gameLessonDetail?.game?.status === STATUS.COMPLETED
            ? 'You Earned More '
            : 'You Earned '
        }
        subtitle={`$${submitLessonDetail?.earned || '150'}`}
        description={'You have just completed the Game'}
        descriptionStyle={{
          width: isTablet()
            ? orientation === 'PORTRAIT'
              ? '100%'
              : '50%'
            : '100%',
        }}
        onClose={() => setIsVisible(false)}
        onConfirm={onConfirm}
        confirmBtTitle={
          gameLessonDetail?.game?.status === STATUS.COMPLETED
            ? 'Back To Introduction!'
            : 'Back To Dashboard!'
        }
      />
    </View>
  );
};
const CONTAINER: ViewStyle = {
  flex: 1,
};
const CONTENT: ViewStyle = {
  paddingHorizontal: horizontalScale(12),
  marginStart: isTablet() ? horizontalScale(0) : horizontalScale(10),
  marginTop: isTablet() ? verticalScale(5) : verticalScale(-10),
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
const BUTTON_LINEAR_GRADIENT_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
const TEXT_CONFIRM: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontFamily: typography.promptBold,
  fontWeight: '700',
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const BOTTOM_VIEW: ViewStyle = {
  borderBottomColor: color.yellow,
  borderBottomWidth: 3,
  width: horizontalScale(35),
  position: 'absolute',
  zIndex: 10,
  height: 5,
  right: 0,
  left: isTablet() ? horizontalScale(10) : horizontalScale(10),
};
const BUTTON_LINEAR_GRADIENT_VIEW: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around',
};
const BUTTON_LINEAR_GRADIENT_CONTENT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: moderateScale(50),
  width: horizontalScale(150),
  height: verticalScale(40),
};
