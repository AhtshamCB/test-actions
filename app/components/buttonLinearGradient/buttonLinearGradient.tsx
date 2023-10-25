import LinearGradient from 'react-native-linear-gradient';

import React from 'react';
import {Text} from '../text/text';
import {viewPresets, textPresets} from './buttonLinearGradient.presets';
import {ButtonLinearGradientProps} from './buttonLinearGradient.props';
import {TouchableOpacity, Image} from 'react-native';
/**
 * App main button linear gradient component
 *
 */
export function ButtonLinearGradient(props: ButtonLinearGradientProps) {
  // grab the props
  const {
    preset = 'white',
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    isIcon,
    image,
    imageStyle,
    ...rest
  } = props;
  const viewStyle = viewPresets[preset] || viewPresets.white;
  const viewStyles = [viewStyle, styleOverride];
  const textStyle = textPresets[preset] || textPresets.white;
  const textStyles = [textStyle, textStyleOverride];
  return (
    <TouchableOpacity {...rest}>
      <LinearGradient
        colors={['#DB14FB', '#FFBA00']}
        start={{x: 0.0, y: 0.2}}
        locations={[0, 1]}
        style={viewStyles}>
        <Text text={text} style={textStyles} />
        {isIcon && <Image source={image} style={imageStyle} />}
      </LinearGradient>
    </TouchableOpacity>
  );
}
