/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {View, ViewStyle, TextStyle, ActivityIndicator} from 'react-native';
import {ButtonLinearGradient, Text} from '@app/components';
import {PopupNextLevel} from './popup-next-level/popup-next-level';
import {useDispatch, useSelector} from 'react-redux';
import {ConfigActions, LessonActions, selector} from '@app/redux';
import {StepFinishStory} from '@app/svg';
import {
  isIPhone8PlusOrBelow,
  useLessons,
  useOrientation,
  useSubmitLesson,
} from '@app/hook';
import {STATUS, TYPE} from '@app/utils/contants';
import {isTablet} from 'react-native-device-info';
import WebView from 'react-native-webview';

export const Story = ({
  accessToken,
  lessonId,
  triggerGetLesson,
  onGoToGamePart,
  onBackToQuizPart,
  pushTimeLearning,
}) => {
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const orientation = useOrientation();

  const type = 'story';

  useEffect(() => {
    getStoryLessonDetail({
      payload: {
        lessonId: lessonId,
      },
    });
  }, []);

  const {getStoryLessonDetail, isLoading} = useLessons();
  const {submitLesson} = useSubmitLesson(accessToken, lessonId, type);

  const {userInfo} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);
  const {storyLessonDetail, submitLessonDetail} =
    useSelector(selector.lessons) || '';

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showFooterButton, setShowFooterButton] = useState<boolean>(false);

  const onConfirm = async () => {
    setIsVisible(false);
    triggerGetLesson();
    onGoToGamePart();
    dispatch(LessonActions.setSubmitLesson(''));
  };

  const debugging = `
  const message = ${JSON.stringify('')};
  window.postMessage(JSON.stringify(message));
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
`;

  const onMessage = async event => {
    let dataPayload;
    try {
      dataPayload = JSON.parse(event.nativeEvent.data);
    } catch (e) {}
    if (dataPayload) {
      if (dataPayload.type === 'console') {
        console.info(`[console] ${JSON.stringify(dataPayload.data)}`);
      } else {
        if (dataPayload?.data?.log === 'fullscreen') {
          dispatch(ConfigActions.setOrientation('landscape'));
        }
        if (dataPayload?.data?.log === 'notfullscreen') {
          dispatch(ConfigActions.setOrientation('portrait'));
        }
        if (dataPayload?.data?.log === 'ended') {
          if (
            userInfo?.me?.role === TYPE.KID ||
            userInfo?.me?.role === TYPE.STUDENT
          ) {
            await submitLesson();
            await pushTimeLearning();
            setIsVisible(true);
            setShowFooterButton(true);
          }
        }
        console.log(dataPayload);
      }
    }
  };
  const [isCompletedStory, setIsCompletedStory] = useState(false);

  useEffect(() => {
    if (storyLessonDetail?.story?.status !== STATUS.COMPLETED) {
      setIsCompletedStory(false);
    } else {
      setIsCompletedStory(true);
    }
  }, [storyLessonDetail]);

  const webViewHtml = `
  <html>
    <head>
      <title>Story</title>
      <style>body, html { margin: 0; padding: 0; background-color: transparent; overflow: hidden; }</style>
    </head>
    <body>
      <iframe src="https://player.vimeo.com/video/${storyLessonDetail?.story?.src?.videoId}?h=${storyLessonDetail?.story?.src?.hashCode}" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen playsinline; encrypted-media"></iframe>
      <script src="https://player.vimeo.com/api/player.js"></script>
      <script>
        const iframe = document.querySelector('iframe');
        const player = new Vimeo.Player(iframe);
        let timeWatched = 0;
        let isSeeked = false;

        player.on('play', function() {
          console.log('played the video!');
          player.requestFullscreen();
        });

        player.setColor('#db14fb').then(function (color) {
          // the color that was set
        })
        .catch(function (error) {
        // an error occurred setting the color
        });

        if (${isCompletedStory} === false) {
          player.on('timeupdate', function (data) {
            if (data.seconds - 1 < timeWatched && data.seconds > timeWatched) {
              timeWatched = data.seconds;
            }
          });
          player.on('seeked', function (data) {
            if (isSeeked) {
              isSeeked = false;
              return;
            }
    
            if (timeWatched < data.seconds) {
              isSeeked = true;
              player.setCurrentTime(timeWatched);
            }
          });
        }

        player.on('ended', function() {
          console.log('ended');
        });

        player.on('fullscreenchange', function(data) {
          if (data.fullscreen === true) {
            console.log('fullscreen');
          }
          else {
            console.log('notfullscreen');
          }
        });
      </script>
    </body>
  </html>
`;

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
          marginTop: isTablet() ? verticalScale(0) : verticalScale(-10),
        },
      ]}>
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
        {orientation !== 'LANDSCAPE' && (
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
            4. Story:{' '}
            {storyLessonDetail?.story?.status !== STATUS.COMPLETED ? (
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
                You will earn $50 when you complete this story
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
                The more you watch, the more you earn. What did you learn from
                this story?
              </Text>
            )}
          </Text>
        )}
      </View>
      <View
        style={[
          VIDEO_CONTAINER,
          {
            marginTop: isTablet()
              ? orientation === 'PORTRAIT'
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(-5)
                  : verticalScale(20)
                : verticalScale(-15)
              : verticalScale(0),
            height: isTablet()
              ? orientation === 'PORTRAIT'
                ? '69%'
                : '90%'
              : isIPhone8PlusOrBelow()
              ? '60%'
              : '50%',
          },
        ]}>
        <WebView
          ref={playerRef}
          source={{html: webViewHtml}}
          onMessage={onMessage}
          injectedJavaScript={debugging}
          allowsFullscreenVideo
          allowsInlineMediaPlayback={isTablet() ? false : true}
          scrollEnabled={false}
          startInLoadingState={true}
        />
      </View>
      <View style={BUTTON_LINEAR_GRADIENT_CONTAINER}>
        {isTablet() ? (
          <View
            style={{
              marginTop:
                orientation === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(-5)
                    : verticalScale(20)
                  : 0,
            }}>
            {storyLessonDetail?.story?.status === STATUS.COMPLETED ||
            showFooterButton ? (
              <>
                <View
                  style={[
                    BUTTON_LINEAR_GRADIENT_VIEW,
                    {
                      justifyContent: 'space-around',
                      marginLeft: isTablet()
                        ? orientation === 'PORTRAIT'
                          ? orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(10)
                            : horizontalScale(20)
                          : orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(20)
                          : horizontalScale(35)
                        : horizontalScale(20),
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
                        marginTop:
                          orientation === 'PORTRAIT'
                            ? verticalScale(20)
                            : verticalScale(20),
                      },
                    ]}
                    textStyle={TEXT_CONFIRM}
                    onPress={onBackToQuizPart}
                  />
                  <StepFinishStory
                    width={isTablet() ? 200 : 120}
                    height={isTablet() ? 100 : 70}
                    props={undefined}
                  />
                  <ButtonLinearGradient
                    text={'Next To Game'}
                    style={[
                      BUTTON_LINEAR_GRADIENT_CONTENT,
                      {
                        width: horizontalScale(80),
                        height:
                          orientationOpenApp === 'LANDSCAPE'
                            ? verticalScale(60)
                            : verticalScale(40),
                        marginTop:
                          orientation === 'PORTRAIT'
                            ? verticalScale(20)
                            : verticalScale(20),
                      },
                    ]}
                    textStyle={TEXT_CONFIRM}
                    onPress={onGoToGamePart}
                  />
                </View>
              </>
            ) : (
              <View
                style={[
                  BUTTON_LINEAR_GRADIENT_VIEW,
                  {
                    justifyContent: 'space-around',
                    marginLeft: horizontalScale(20),
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

                      marginTop:
                        orientation === 'PORTRAIT'
                          ? verticalScale(20)
                          : verticalScale(20),
                    },
                  ]}
                />
                <StepFinishStory
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

                      marginTop:
                        orientation === 'PORTRAIT'
                          ? verticalScale(20)
                          : verticalScale(20),
                    },
                  ]}
                  textStyle={TEXT_CONFIRM}
                  onPress={onBackToQuizPart}
                />
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              marginTop: verticalScale(-10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <StepFinishStory
              width={isTablet() ? 200 : 120}
              height={isTablet() ? 100 : 70}
              props={undefined}
            />
            {storyLessonDetail?.story?.status === STATUS.COMPLETED ||
            showFooterButton ? (
              <>
                <View
                  style={[
                    BUTTON_LINEAR_GRADIENT_VIEW,
                    {
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginLeft: horizontalScale(20),
                    },
                  ]}>
                  <ButtonLinearGradient
                    text={'Back'}
                    style={BUTTON_LINEAR_GRADIENT_CONTENT}
                    textStyle={TEXT_CONFIRM}
                    onPress={onBackToQuizPart}
                  />

                  <ButtonLinearGradient
                    text={'Next To Game'}
                    style={BUTTON_LINEAR_GRADIENT_CONTENT}
                    textStyle={TEXT_CONFIRM}
                    onPress={onGoToGamePart}
                  />
                </View>
              </>
            ) : (
              <ButtonLinearGradient
                text={'Back'}
                style={BUTTON_LINEAR_GRADIENT_CONTENT}
                textStyle={TEXT_CONFIRM}
                onPress={onBackToQuizPart}
              />
            )}
          </View>
        )}
      </View>
      <PopupNextLevel
        isVisible={isVisible}
        title={
          storyLessonDetail?.story?.status === STATUS.COMPLETED
            ? 'You Earned More '
            : 'You Earned '
        }
        subtitle={`$${submitLessonDetail?.earned}`}
        description={
          'You have just completed the Story. Interesting? You may want to watch it again? 😉'
        }
        descriptionStyle={{
          width: isTablet()
            ? orientation === 'PORTRAIT'
              ? '100%'
              : '50%'
            : '100%',
        }}
        confirmBtTitle={'Next To Game'}
        onClose={() => {
          setIsCompletedStory(true);
          setIsVisible(false);
        }}
        onConfirm={onConfirm}
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
  marginTop: isTablet() ? verticalScale(-10) : verticalScale(10),
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
const VIDEO_CONTAINER: ViewStyle = {
  width: '100%',
  height: '60%',
  marginTop: isTablet() ? verticalScale(30) : verticalScale(0),
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
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const BOTTOM_VIEW: ViewStyle = {
  borderBottomColor: color.yellow,
  borderBottomWidth: 3,
  width: isTablet() ? horizontalScale(30) : horizontalScale(35),
  position: 'absolute',
  zIndex: 10,
  height: 5,
  right: 0,
  left: isTablet() ? horizontalScale(5) : horizontalScale(10),
};
