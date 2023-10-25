import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface HeaderLevelLessonProps {
  style?: StyleProp<ViewStyle>;
  title?: any;
  headerStyle?: StyleProp<TextStyle>;
  onBackPress?: () => void;
  isShowRight?: boolean;
  isShowLeft?: boolean;
  textRight?: string;
  onRightPress?: () => void;
  isFromTeacherScreen?: boolean;
}
