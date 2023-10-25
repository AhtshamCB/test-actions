import {ImageStyle} from 'react-native';

export interface InstructionPopupProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  /**
   * Title component
   */
  title: string;

  /**
   * Close modal callback
   */
  onClose?: () => void;

  /**
   * Guide
   */
  guide: string;

  /**
   * Background Height Style
   */
  backgroundHeight?: ImageStyle;

  /**
   * Height Style
   */
  height?: ImageStyle;
}
