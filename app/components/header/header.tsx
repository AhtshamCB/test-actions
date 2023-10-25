import React from 'react';
import {TextStyle, View, ViewStyle, TouchableOpacity} from 'react-native';
import type {ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
//
import {HeaderProps} from './header.props';
import {Text} from '../text/text';
//
import {color} from '@app/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackButtonIcon} from '@app/svg';
import {isTablet} from 'react-native-device-info';

/**
 * Simple header
 */
export const Header = function Header({
  style,
  title,
  headerStyle,
  onBackPress,
  isShowRight,
  isShowLeft = true,
  onRightPress,
  textRight,
}: HeaderProps) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

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
    <View style={CONTAINER}>
      <View style={containerStyles}>
        <TouchableOpacity onPress={_onGoBack}>
          {isShowLeft && <BackButtonIcon />}
        </TouchableOpacity>
        <Text style={headerStyles} text={title} />
        {isShowRight && (
          <TouchableOpacity onPress={onRightPress} style={TITLE_RIGHT}>
            <Text style={headerStyles} text={textRight} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const CONTAINER: ViewStyle = {
  width: '100%',
  top: 20,
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
  marginLeft: isTablet() ? 35 : 25,
  fontWeight: '700',
  flex: 1,
};

const TITLE_RIGHT: ViewStyle = {
  marginTop: 8,
  height: 30,
};
