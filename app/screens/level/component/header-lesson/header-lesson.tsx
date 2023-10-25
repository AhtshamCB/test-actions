/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextStyle, View, ViewStyle, TouchableOpacity} from 'react-native';
import type {ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
//
import {HeaderLessonProps} from './header-lesson.props';

//
import {color, horizontalScale, verticalScale} from '@app/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackButtonIcon, FullscreenIcon} from '@app/svg';
import {Text} from '@app/components';
import {isTablet} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

/**
 * Simple header
 */
export const HeaderLesson = function HeaderLesson({
  style,
  title,
  headerStyle,
  onBackPress,
  isShowRight,
  isShowLeft = true,
  onRightPress,
  isShowImage,
}: HeaderLessonProps) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const {orientationOpenApp} = useSelector(selector.config);

  const insets = useSafeAreaInsets();

  const containerStyles = [SUB_CONTAINER, {paddingTop: insets.top}, style];
  const headerStyles = [HEADER_TITLE, headerStyle];

  const _onGoBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        CONTAINER,
        {
          height: isTablet()
            ? orientationOpenApp === 'LANDSCAPE'
              ? verticalScale(70)
              : verticalScale(50)
            : verticalScale(85),
        },
      ]}>
      <View style={containerStyles}>
        {isShowLeft ? (
          <TouchableOpacity
            onPress={_onGoBack}
            style={{marginTop: verticalScale(10), width: 20, height: 20}}>
            <BackButtonIcon />
          </TouchableOpacity>
        ) : (
          <View style={HEADER_LEFT_CONTAINER} />
        )}

        <View style={TITLE_CONTAINER}>
          <Text style={headerStyles} text={title} />
        </View>
        {isShowRight ? (
          <TouchableOpacity onPress={onRightPress} style={TITLE_RIGHT}>
            {isShowImage && <FullscreenIcon />}
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};
const CONTAINER: ViewStyle = {
  width: '100%',
};
const HEADER_LEFT_CONTAINER: ViewStyle = {
  flex: 0.3,
};
const SUB_CONTAINER: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  flexDirection: 'row',
  paddingHorizontal: 15,
  paddingVertical: 6,
  paddingBottom: 15, // TODO
};
const HEADER_TITLE: TextStyle = {
  maxWidth: '80%',
  color: color.mainBlack,
  fontSize: 18,
  textAlign: 'center',
  marginLeft: 20,
  fontWeight: '700',
};
const TITLE_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
};
const TITLE_RIGHT: ViewStyle = {
  marginTop: 8,
  width: 30,
  height: 30,
  backgroundColor: color.purple,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: horizontalScale(110),
};
