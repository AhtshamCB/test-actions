import {TextStyle} from 'react-native';

export interface PopupConfirmProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  /**
   * Container style
   */
  containerStyle?: TextStyle;

  /**
   * Title text
   */
  title?: string;

  /**
   * Title style
   */
  titleStyle?: any;

  /**
   * Subtitle text
   */
  subtitle?: string;

  /**
   * Title style
   */
  subtitleStyle?: any;

  /**
   * Description text
   */
  description?: string;

  /**
   * Description style
   */
  descriptionStyle?: TextStyle;

  /**
   * Main Button , confirm alert callback
   */
  onConfirm: () => void;

  /**
   * Close modal callback
   */
  onClose?: () => void;
}
