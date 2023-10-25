import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const CameraIcon = ({
  width = 24,
  height = 24,
  fill = '#374957',
  props,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_718_23123)" fill={fill}>
        <Path d="M21 4h-2.508l-3.086-4H8.593L5.508 4H3a3 3 0 00-3 3v17h24V7a3 3 0 00-3-3zM9.577 2h4.847l1.542 2H8.034l1.543-2zM22 22H2V7a1 1 0 011-1h18a1 1 0 011 1v15z" />
        <Path d="M12 8a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" />
      </G>
      <Defs>
        <ClipPath id="clip0_718_23123">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
