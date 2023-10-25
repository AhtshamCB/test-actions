import {color} from '@app/theme';
import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const EyeIcon = ({width = 20, height = 20, fill = color.gray3}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_718_23421)" fill={fill}>
        <Path d="M23.82 11.181C22.944 9.261 19.5 3 12 3S1.057 9.261.179 11.181a1.969 1.969 0 000 1.64C1.057 14.739 4.499 21 11.999 21s10.944-6.261 11.822-8.181a1.968 1.968 0 000-1.638zM12 19c-6.307 0-9.25-5.366-10-6.989C2.75 10.366 5.693 5 12 5c6.292 0 9.236 5.343 10 7-.764 1.657-3.708 7-10 7z" />
        <Path d="M12 7a5 5 0 105 5 5.006 5.006 0 00-5-5zm0 8a3 3 0 110-5.998A3 3 0 0112 15z" />
      </G>
      <Defs>
        <ClipPath id="clip0_718_23421">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
