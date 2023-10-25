import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowLeftBoldIcon = ({
  width = 24,
  height = 24,
  fill = '#374957',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}>
      <Path
        d="M15 7l-5 5 5 5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
