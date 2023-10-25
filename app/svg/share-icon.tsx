import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const ShareIcon = ({
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
      <G clipPath="url(#clip0_718_24021)">
        <Path
          d="M19.333 14.668a4.66 4.66 0 00-3.839 2.024l-6.509-2.94a4.574 4.574 0 00.005-3.487l6.5-2.954a4.66 4.66 0 10-.827-2.643c.004.263.031.526.08.786l-6.91 3.14a4.668 4.668 0 10-.015 6.827l6.928 3.128a4.731 4.731 0 00-.079.785 4.667 4.667 0 104.666-4.666zm0-12.667a2.667 2.667 0 11.002 5.334 2.667 2.667 0 01-.002-5.334zM4.667 14.668a2.667 2.667 0 11-.002-5.335 2.667 2.667 0 01.002 5.335zM19.333 22a2.667 2.667 0 110-5.335 2.667 2.667 0 010 5.335z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_718_24021">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
