import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowLeftIcon = ({width = 15, height = 15, fill = '#374957'}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.752 23.994l-9.873-9.873a3 3 0 010-4.242L16.746.012l1.414 1.414-9.867 9.867a1 1 0 000 1.414l9.873 9.873-1.414 1.414z"
        fill={fill}
      />
    </Svg>
  );
};
