import React from 'react';
import {
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {ButtonPresetNames} from './buttonLinearGradientBorder.presets';

export interface ButtonLinearGradientBorderProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string;

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Disable text style
   */
  disableStyle?: StyleProp<ViewStyle>;

  /**
   * Disable text style
   */
  disableTextStyle?: StyleProp<TextStyle>;

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames;

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode;

  /**
   * Disable button
   */
  disabled?: boolean;

  /**
   * Fetching
   */
  fetching?: boolean;

  /**
   * Image
   */
  image?: any;

  /**
   * IsIcon
   */
  isIcon?: boolean;

  /**
   * IsIcon
   */
  imageStyle?: ImageStyle;

  /**
   * Border color array
   */
  borderColors?: [string];
  innerButtonColors?: [];
  ViewStyles?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;

  /**
   * containerStyle
   */
  containerStyle?: StyleProp<ViewStyle>;
}
