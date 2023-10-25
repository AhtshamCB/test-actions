import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const DayTrainingIcon = ({width = 40, height = 40}) => (
  <Svg width={width} height={height} fill="none">
    <Circle opacity={0.1} cx={22} cy={22.5} r={22} fill="#FFC700" />
    <Path
      d="M27.837 14.867H15.265c-.992 0-1.796.804-1.796 1.796v12.572c0 .992.805 1.796 1.796 1.796h12.572c.992 0 1.796-.804 1.796-1.796V16.663c0-.992-.804-1.796-1.796-1.796ZM25.143 13.071v3.592m-7.184-3.592v3.592m-4.49 3.592h16.164m-11.674 3.592h.01m3.582 0h.01m3.582 0h.009m-7.193 3.592h.01m3.582 0h.01m3.582 0h.009"
      stroke="#DB14FB"
      strokeWidth={2.449}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
