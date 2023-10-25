import {ViewStyle, TextStyle} from 'react-native';
import {color, typography} from '../../theme';

const BASE_CONTAINER: ViewStyle = {
  padding: 15,
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  borderRadius: 50,
  marginStart: 15,
  marginEnd: 15,
};

export const viewPresets: Record<string, ViewStyle> = {
  /**
   * Primary button
   */
  primary: {
    ...BASE_CONTAINER,
    backgroundColor: color.mainOrange,
  } as ViewStyle,

  white: {
    ...BASE_CONTAINER,
    borderWidth: 1,
    borderColor: color.white,
    backgroundColor: color.lightOrange,
  } as ViewStyle,

  disabled: {
    backgroundColor: color.palette.grayD3,
  } as ViewStyle,
};

const BASE_TEXT_STYLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 16,
  fontWeight: '400',
};
export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: {
    ...BASE_TEXT_STYLE,
    color: color.palette.white,
  } as TextStyle,

  white: {
    ...BASE_TEXT_STYLE,
    color: color.text,
  } as TextStyle,

  disabled: {
    ...BASE_TEXT_STYLE,
    color: color.palette.gray89,
  } as TextStyle,
};

export type ButtonPresetNames = keyof typeof viewPresets;
