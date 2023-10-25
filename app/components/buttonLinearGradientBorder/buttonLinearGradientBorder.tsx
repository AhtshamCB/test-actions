import LinearGradient from 'react-native-linear-gradient';

import React from 'react';
import {viewPresets} from './buttonLinearGradientBorder.presets';
import {ButtonLinearGradientBorderProps} from './buttonLinearGradientBorder.props';
import {TouchableOpacity, View} from 'react-native';
/**
 * App main button linear gradient component
 *
 */
export function ButtonLinearGradientBorder(
  props: ButtonLinearGradientBorderProps,
) {
  // grab the props
  const {
    borderColors = ['#ffbb0020', '#DB14FB'],
    innerButtonColors = ['#DB14FB', '#ffbb00'],
    style: outerStyleOverride,
    innerStyle: innerStyleOverride,
    ViewStyles: ViewStylesOverrides,
    children,
    ...rest
  } = props;
  const outerContainerStyles = [viewPresets.outerStyles, outerStyleOverride];
  const ViewStyles = [viewPresets.viewStyles, ViewStylesOverrides];
  const InnerButtonStyles = [viewPresets.innerStyles, innerStyleOverride];
  return (
    <TouchableOpacity {...rest}>
      <LinearGradient // for creation of border
        colors={borderColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={outerContainerStyles}>
        <View style={ViewStyles}>
          <LinearGradient
            colors={innerButtonColors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={InnerButtonStyles}>
            {children}
          </LinearGradient>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
