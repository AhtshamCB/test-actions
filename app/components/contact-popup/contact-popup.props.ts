import {TextStyle, ViewStyle} from 'react-native';

export interface ContactPopupProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  /**
   * Container style
   */
  containerStyle?: ViewStyle;

  /**
   * Background style
   */
  backgroundStyle?: any;

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
  subtitleStyle?: TextStyle;

  /**
   * Description text
   */
  description?: string;

  /**
   * Description style
   */
  descriptionStyle?: TextStyle;

  /**
   * Close modal callback
   */
  onClose?: () => void;
}
