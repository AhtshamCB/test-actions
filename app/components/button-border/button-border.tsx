import React from 'react';
import {Text} from '../text/text';
import {ButtonBorderProps} from './button-border.props';
import {TouchableOpacity, Image, TextStyle, ViewStyle} from 'react-native';
import {color, typography} from '@app/theme';
/**
 * App main button linear gradient component
 *
 */
export function ButtonBorder(props: ButtonBorderProps) {
  // grab the props
  const {
    text,
    isIcon,
    onPress,
    textStyle,
    containerStyle,
    disabled,
    image,
    imageStyle,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      style={[
        BUTTON_CONTAINER,
        DIRECTION_VIEW,
        containerStyle,
        disabled && DISABLE_BUTTON,
      ]}
      onPress={onPress}>
      <Text text={text} style={[TEXT_COMMON, textStyle]} />
      {isIcon && <Image source={image} style={imageStyle} />}
    </TouchableOpacity>
  );
}

const BUTTON_CONTAINER: ViewStyle = {
  borderColor: color.purple,
  borderRadius: 100,
  borderWidth: 1,
  height: 38,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
};
const TEXT_COMMON: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: 14,
  fontWeight: '400',
  color: color.purple,
};

const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
};

const DISABLE_BUTTON: ViewStyle = {
  opacity: 0.3,
};
