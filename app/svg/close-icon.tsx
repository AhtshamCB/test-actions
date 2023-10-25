import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const CloseIcon = ({width = 24, height = 24}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 18l-6-6m0 0L6 6m6 6l6-6m-6 6l-6 6"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
