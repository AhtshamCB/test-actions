/* eslint-disable react-native/no-inline-styles */
import {NavigatorParamList} from '../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useRef} from 'react';
import {View, ViewStyle, TouchableOpacity, StatusBar, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ConfigActions, selector} from '@app/redux';
import {isTablet} from 'react-native-device-info';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {Header} from '@app/components';
import {FullscreenIcon} from '@app/svg';
import WebView from 'react-native-webview';
import {useOrientation} from '@app/hook';
import {goBack} from '@app/navigators';

export const GameDetails: FC<
  StackScreenProps<NavigatorParamList, 'gameDetails'>
> = ({navigation, route}) => {
  const {sourceGame} = route.params || '';
  const dispatch = useDispatch();
  const webViewRef = useRef(null);
  const orientationApp = useOrientation();
  const {orientation, isFullScreen, orientationOpenApp} = useSelector(
    selector.config,
  );
  const {userInfo} = useSelector(selector.user);

  const handleMessage = async event => {
    const message = event.nativeEvent.data; // Extract the message from the event object
    if (message === 'gameEnded') {
      dispatch(ConfigActions.setOrientation('portrait'));
      setTimeout(() => {
        goBack();
      }, 300);
    }
  };

  return (
    <View style={CONTAINER}>
      {orientation === 'portrait' && !isFullScreen && (
        <View
          style={{
            height: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(80)
                : verticalScale(60)
              : verticalScale(85),
          }}>
          <Header title={'Game'} onBackPress={() => navigation.goBack()} />
        </View>
      )}
      <View
        style={{
          backgroundColor: color.gray10,
          flex: 1,
        }}>
        {orientation === 'portrait' && !isFullScreen && (
          <View
            style={{
              padding: 10,
              width: isTablet() ? '95%' : '90%',
              height: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(70)
                  : verticalScale(50)
                : verticalScale(40),
              borderRadius: 10,
              backgroundColor: color.white,
              marginTop: verticalScale(15),
              marginLeft: isTablet()
                ? orientationApp === 'PORTRAIT'
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(5)
                    : horizontalScale(10)
                  : horizontalScale(10)
                : horizontalScale(18),
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontFamily: typography.promptSemiBold,
                fontWeight: '500',
                color: color.black1,
                fontSize: isTablet()
                  ? orientation === 'portrait'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? moderateScale(16)
                      : moderateScale(18)
                    : moderateScale(16)
                  : moderateScale(16),
                paddingHorizontal: 10,
                flex: 1,
              }}>
              {`Hi ${userInfo?.me?.kid?.name}!`}
              <Text
                style={{
                  fontFamily: typography.promptRegular,
                  fontWeight: '400',
                  color: color.dark5,
                  fontSize: isTablet()
                    ? orientation === 'portrait'
                      ? orientationOpenApp === 'LANDSCAPE'
                        ? moderateScale(8)
                        : moderateScale(10)
                      : moderateScale(12)
                    : moderateScale(14),
                }}>
                {" (Let's play some games 🙂)"}
              </Text>
            </Text>
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
                  : '40%'
                : isTablet()
                ? '100%'
                : '100%',
            width: '100%',
            marginTop:
              orientation === 'portrait' ? verticalScale(15) : verticalScale(0),
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
              uri: sourceGame,
            }}
            mixedContentMode={'always'}
            onMessage={handleMessage}
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
            style={FULLSCREEN_BUTTON}
            onPress={() => {
              if (isTablet()) {
                dispatch(ConfigActions.setIsFullScreen(!isFullScreen));
                StatusBar.setHidden(true);
                if (orientation === 'portrait') {
                  // dispatch(ConfigActions.setOrientationGame('landscape'));
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
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const FULLSCREEN_BUTTON: ViewStyle = {
  width: 20,
  height: 20,
  backgroundColor: color.purple,
  justifyContent: 'center',
  alignItems: 'center',
};
