export interface PopupEnterYourPinProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  /**
   * title
   */
  title?: string;
  /**
   * error
   */
  error?: string;
  /**
   * onCodeFilled
   */
  onCodeFilled?: (code) => void;

  /**
   * onCodeChanged
   */
  onCodeChanged?: (code) => void;

  /**
   * Close modal callback
   */
  onClose?: () => void;
}
