import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const MyMoneyIcon = ({fill = '#374957', props}) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_721_29360)">
        <Path
          d="M19 8v-.932A5.073 5.073 0 0013.932 2H13V0h-2v2h-.932a5.068 5.068 0 00-1.6 9.875L11 12.72V20h-.932A3.071 3.071 0 017 16.932V16H5v.932A5.073 5.073 0 0010.068 22H11v2h2v-2h.932a5.068 5.068 0 001.6-9.875L13 11.28V4h.932A3.071 3.071 0 0117 7.068V8h2zm-4.1 6.021A3.068 3.068 0 0113.932 20H13v-6.613l1.9.634zM11 10.613l-1.9-.634A3.068 3.068 0 0110.068 4H11v6.613z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_721_29360">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
