import * as React from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
  Image,
  View,
} from 'react-native';
//
import {Text} from '../text/text';
import {viewPresets, textPresets} from './button.presets';
import {ButtonProps} from './button.props';
//
import {color, spacing} from '@app/theme';

/**
 * App main button component
 *
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = 'white',
    text,
    disabled,
    style: styleOverride,
    textStyle: textStyleOverride,
    disableStyle,
    disableTextStyle,
    children,
    fetching,
    isIcon,
    image,
    imageStyle,
    ...rest
  } = props;

  const viewStyle = viewPresets[preset] || viewPresets.white;
  const viewStyles = [
    CONTAINER,
    viewStyle,
    styleOverride,
    disabled ? disableStyle || viewPresets.disabled : null,
  ];
  const textStyle = textPresets[preset] || textPresets.white;
  const textStyles = [
    textStyle,
    textStyleOverride,
    disabled ? disableTextStyle || textPresets.disabled : null,
  ];

  const content = children || (
    <View style={CONTENT}>
      <Text text={text} style={textStyles} />
      {isIcon && <Image source={image} style={imageStyle} />}
    </View>
  );

  return (
    <TouchableOpacity
      disabled={disabled || fetching}
      style={viewStyles}
      {...rest}>
      {fetching ? (
        <ActivityIndicator style={LOADING} color={color.palette.white} />
      ) : (
        content
      )}
    </TouchableOpacity>
  );
}

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
const LOADING: ViewStyle = {
  marginLeft: spacing.base,
};
const CONTENT: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
