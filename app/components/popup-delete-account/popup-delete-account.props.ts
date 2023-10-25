import {TextStyle} from 'react-native';

export interface PopupDeleteAccountProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  /**
   * Name text
   */
  name?: string;

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
   * Close modal callback
   */
  onClose?: () => void;
}
