import {TextStyle, ViewStyle} from 'react-native';

export interface SendMessagePopupProps {
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
  titleStyle?: TextStyle;

  /**
   * Close modal callback
   */
  onClose?: () => void;

  /**
   * Id Class
   */
  id?: any;
}
