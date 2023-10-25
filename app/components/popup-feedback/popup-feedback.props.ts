import {TextStyle} from 'react-native';

export interface PopupFeedbackProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  data?: any;

  /**
   * Name text
   */
  name?: any;

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
   * Subtitle style
   */
  descriptionStyle?: TextStyle;

  /**
   * Confirm text style
   */
  confirmTextStyle?: TextStyle;

  /**
   * Confirm Button title
   */
  confirmBtTitle?: string;

  /**
   * Confirm Button
   */
  onConfirm?: () => void;

  /**
   * Check disable Button
   */
  isDisableButton?: boolean;

  /**
   * Close modal callback
   */
  onClose?: () => void;
}
