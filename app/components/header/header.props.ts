import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  headerStyle?: StyleProp<TextStyle>;
  onBackPress?: () => void;
  onReceiptPress?: () => void;
  onLovePress?: () => void;
  isShowRight?: boolean;
  isShowLeft?: boolean;
  textRight?: string;
  onRightPress?: () => void;
  isShowImage?: boolean;
}
