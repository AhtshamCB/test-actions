import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const VideoPause = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="60pt"
      height="60pt"
      viewBox="0 0 25 25"
      {...props}>
      <Path
        d="M34.92 18c0 9.343-7.577 16.92-16.92 16.92-9.343 0-16.92-7.577-16.92-16.92C1.08 8.657 8.657 1.08 18 1.08c9.343 0 16.92 7.577 16.92 16.92zm0 0"
        transform="scale(.69444)"
        fill="none"
        strokeWidth={1}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        stroke="#fff"
        strokeOpacity={1}
        strokeMiterlimit={4}
      />
      <Path
        d="M13.36 10.783h1.569v14.434h-1.57zm7.711 0h1.57v14.434h-1.57zm0 0"
        transform="scale(.69444)"
        fillRule="evenodd"
        fill="#fff"
        fillOpacity={1}
        strokeWidth={1}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        stroke="#fff"
        strokeOpacity={1}
        strokeMiterlimit={4}
      />
    </Svg>
  );
};
