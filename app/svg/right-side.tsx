import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const RightSideSVG = props => (
  <Svg
    width={20}
    height={45}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="m6.528 22 12.32-15.512C20.929 3.866 19.063 0 15.715 0H0v44h15.715c3.348 0 5.214-3.866 3.133-6.488L6.527 22Z"
      fill="#DB14FB"
    />
  </Svg>
);
