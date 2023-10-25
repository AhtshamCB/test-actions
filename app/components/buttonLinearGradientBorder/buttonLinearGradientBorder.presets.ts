import {ViewStyle, TextStyle} from 'react-native';
import {color, typography} from '../../theme';

export const viewPresets: Record<string, ViewStyle> = {
  /**
   * Primary Outer Layer (Border)
   */
  outerStyles: {
    height: 60,
    width: 200,
    borderRadius: 30, // <-- Outer Bo
    backgroundColors: 'pink',
  } as ViewStyle,

  viewStyles: {
    borderRadius: 100,
    flex: 1,
    margin: 1.2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  innerStyles: {
    height: 40,
    width: 180,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
};

const BASE_TEXT_STYLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 16,
  fontWeight: '600',
};
export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  white: {
    ...BASE_TEXT_STYLE,
    color: color.white,
  } as TextStyle,

  disabled: {
    ...BASE_TEXT_STYLE,
    color: color.palette.gray89,
  } as TextStyle,
};

export type ButtonPresetNames = keyof typeof viewPresets;
