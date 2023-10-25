import {TextStyle, ViewStyle} from 'react-native';

export interface PopupNextLevelProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

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
  titleStyle?: TextStyle;

  /**
   * Subtitle
   */
  subtitle?: string;

  /**
   * Subtitle style
   */
  subtitleStyle?: TextStyle;

  /**
   * Description
   */
  description?: string;

  /**
   * Description style
   */
  descriptionStyle?: TextStyle;

  /**
   * Confirm text style
   */
  confirmTextStyle?: TextStyle;

  /**
   * Confirm button style
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
   * show , hide image
   */
  isShowImage?: boolean;

  /**
   * isGamePart
   */
  isGamePart?: boolean;
}
