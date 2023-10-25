/* eslint-disable no-unneeded-ternary */
import React from 'react';
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
} from 'react-native';
import type {ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
//
import {HeaderPDFProps} from './header-pdf.props';
import {Text} from '@app/components';
//
import {color, horizontalScale, typography, verticalScale} from '@app/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackButtonIcon, SettingDotIcon, ShareIcon} from '@app/svg';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {isTablet} from 'react-native-device-info';
import {useOrientation} from '@app/hook';

/**
 * Simple header
 */
export const HeaderPDF = function HeaderPDF({
  style,
  title,
  headerStyle,
  onBackPress,
  isShowRight,
  isShowLeft = true,
  onRightPress,
}: HeaderPDFProps) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const insets = useSafeAreaInsets();
  const orientation = useOrientation();

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
    <View style={CONTAINER}>
      <View style={CONTENT}>
        <TouchableOpacity onPress={_onGoBack}>
          {isShowLeft && <BackButtonIcon />}
        </TouchableOpacity>
        <Text style={headerStyles} text={title} />
        {isShowRight && (
          <Menu>
            <MenuTrigger
              customStyles={{
                TriggerTouchableComponent: TouchableOpacity,
              }}>
              <SettingDotIcon />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                marginRight: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? horizontalScale(10)
                    : horizontalScale(-20)
                  : horizontalScale(40),
                marginTop: verticalScale(20),
                width: isTablet() ? horizontalScale(50) : horizontalScale(100),
              }}>
              <MenuOption>
                <TouchableOpacity
                  style={[BUTTON_COMMON, {marginBottom: 10, marginRight: 10}]}
                  onPress={onRightPress}>
                  <View style={CAMERA_VIEW}>
                    <ShareIcon
                      fill={color.purple}
                      props={undefined}
                      width={14}
                      height={15}
                    />
                  </View>
                  <Text text={'Share'} style={CAMERA_TEXT} />
                </TouchableOpacity>
              </MenuOption>
            </MenuOptions>
          </Menu>
        )}
      </View>
    </View>
  );
};
const CONTAINER: ViewStyle = {
  width: '100%',
  top: 20,
};
const CONTENT: ViewStyle = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginTop: verticalScale(20),
  paddingHorizontal: horizontalScale(10),
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
  // fontFamily: typography.bold,
  fontSize: 18,
  textAlign: 'center',
  marginLeft: 20,
  flex: 1,
  fontWeight: '700',
};
const BUTTON_COMMON: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: 10,
};
const CAMERA_VIEW: ViewStyle = {
  width: 30,
  height: 30,
  backgroundColor: color.purple1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 40,
};
const CAMERA_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 10,
  fontWeight: '400',
  color: color.black1,
};
