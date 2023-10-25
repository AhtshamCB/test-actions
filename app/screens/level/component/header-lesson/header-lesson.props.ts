import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface HeaderLessonProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  headerStyle?: StyleProp<TextStyle>;
  onBackPress?: () => void;
  isShowRight?: boolean;
  isShowLeft?: boolean;
  textRight?: string;
  onRightPress?: () => void;
  isShowImage?: boolean;
}
