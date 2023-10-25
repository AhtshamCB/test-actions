import {ImageStyle, TextStyle} from 'react-native';

export interface PopupCancelSubscriptionProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  /**
   * Image code
   */
  imageCode?: string;

  /**
   * Name text
   */
  name?: string;

  /**
   * Name Style
   */
  nameStyle?: any;

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
   * Next Description
   */
  nextDescription?: string;

  /**
   * Subtitle style
   */
  nextDescriptionStyle?: any;

  /**
   * Confirm text style
   */
  confirmTextStyle?: TextStyle;

  /**
   * Confirm Button title
   */
  confirmBtTitle?: string;

  /**
   * Main Button , confirm alert callback
   */
  onConfirm: () => void;

  /**
   * Close modal callback
   */
  onClose?: () => void;

  /**
   * backgroundStyle
   */
  backgroundStyle?: ImageStyle;
}
