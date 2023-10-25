import * as React from 'react';
import Svg, {Mask, Path, G} from 'react-native-svg';

export const SettingIcon = props => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Mask
      id="a"
      style={{
        maskType: 'luminance',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}>
      <Path
        d="M9.142 21.704a9.998 9.998 0 0 1-4.348-2.652 3 3 0 0 0-2.591-4.918 10.046 10.046 0 0 1 .255-5.015H2.5a3 3 0 0 0 2.692-4.325A9.984 9.984 0 0 1 9.326 2.48a3 3 0 0 0 5.348 0 9.984 9.984 0 0 1 4.134 2.314 3.001 3.001 0 0 0 2.734 4.325 10.06 10.06 0 0 1 .255 5.015 3 3 0 0 0-2.591 4.919 9.999 9.999 0 0 1-4.348 2.651 3.001 3.001 0 0 0-5.716 0Z"
        fill="#151933"
        stroke="#fff"
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <Path
        d="M12 15.619a3.5 3.5 0 1 0 0-6.999 3.5 3.5 0 0 0 0 6.999Z"
        fill="#151933"
        stroke="#000"
        strokeWidth={4}
        strokeLinejoin="round"
      />
    </Mask>
    <G mask="url(#a)">
      <Path d="M0 .119h24v24H0v-24Z" fill="#909090" />
    </G>
  </Svg>
);
