import {TextStyle} from 'react-native';

export interface PopupSwitchPlanProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  /**
   * Image code
   */
  imageCode?: any;

  /**
   * Money text
   */
  money?: string;

  /**
   * Title text
   */
  title?: string;

  /**
   * Title style
   */
  titleStyle?: TextStyle;

  /**
   * Money style
   */
  moneyStyle?: TextStyle;

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
   * NextDescription
   */
  nextDescription?: string;

  /**
   * Next Description style
   */
  nextDescriptionStyle?: TextStyle;
  /**
   * Subtitle style
   */
  descriptionStyle?: TextStyle;
  /**
   * Next Discount
   */
  nextDiscountText?: string;

  /**
   * Next Discount style
   */
  nextDiscountStyle?: TextStyle;

  /**
   * Date Expired
   */
  dateExpired?: string;

  /**
   * Date Expired style
   */
  dateExpiredStyle?: TextStyle;

  /**
   * Discount Text
   */
  discount?: string;

  /**
   * Subtitle style
   */
  discountStyle?: TextStyle;

  /**
   * Confirm text style
   */
  confirmTextStyle?: TextStyle;

  /**
   * Confirm Button title
   */
  confirmBtTitle?: string;

  /**
   * Switch To Text
   */
  switchToText?: string;

  /**
   * Cancel Text
   */
  cancelText?: string;

  /**
   * Main Button , confirm alert callback
   */
  onConfirm: () => void;

  /**
   * Close modal callback
   */
  onClose?: () => void;
}
