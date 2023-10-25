import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowRightIcon = ({width = 15, height = 15, fill = '#374957'}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.412 24L6 22.588l9.881-9.881a1 1 0 000-1.414L6.017 1.431 7.431.017l9.862 9.862a3 3 0 010 4.242L7.412 24z"
        fill={fill}
      />
    </Svg>
  );
};
