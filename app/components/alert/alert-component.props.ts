import {TextStyle, ViewStyle} from 'react-native';

export interface AlertComponentProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  /**
   * show , hide icon
   */
  isShowIcon?: boolean;

  /**
   * Image code
   */
  imageCode?: any;

  /**
   * Title text
   */
  title?: string;

  /**
   * Title style
   */
  titleStyle?: any;

  /**
   * Subtitle
   */
  subtitle?: string;

  /**
   * Subtitle style
   */
  subtitleStyle?: any;

  /**
   * Next Subtitle
   */
  nextSubtitle?: string;

  /**
   * Next Subtitle style
   */
  nextSubtitleStyle?: any;

  /**
   * Confirm text style
   */
  confirmTextStyle?: TextStyle;

  /**
   * Container Button Style
   */
  containerButtonStyle?: any;

  /**
   * Confirm Button Style
   */
  confirmButtonStyle?: ViewStyle;

  /**
   * Confirm Button title
   */
  confirmBtTitle?: string;

  /**
   * Main Button , confirm alert callback
   */
  onConfirm: () => void;

  /**
   * Cancel text style
   */
  cancelTextStyle?: TextStyle;

  /**
   * Cancel Button Style
   */
  cancelButtonStyle?: ViewStyle;

  /**
   * Confirm Button title
   */
  cancelBtTitle?: string;

  /**
   * Cancel Button , confirm alert callback
   */
  onCancel?: () => void;

  /**
   * Close modal callback
   */
  onClose?: () => void;

  /**
   * Show right button
   */
  isShowRightButton?: boolean;

  /**
   * Show text input
   */
  isShowTextInput?: boolean;

  /**
   * Show warning icon
   */
  isShowWarningIcon?: boolean;

  /**
   * Change text input
   */
  onChangeText?: (text) => void;

  /**
   * Value text input
   */
  valueTextInput?: string;

  /**
   * text input place holder
   */
  textInputPlaceholder?: string;

  /**
   * text error
   */
  error?: boolean;

  /**
   * Background Style
   */
  backgroundStyle?: ViewStyle;

  /**
   * text error
   */
  errorText?: string;
}
