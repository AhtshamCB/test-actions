import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const DownloadIcon = ({
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
      <G clipPath="url(#clip0_718_23363)" fill={fill}>
        <Path d="M12.032 19a2.992 2.992 0 002.122-.878l3.92-3.922-1.415-1.41-3.633 3.634L13 0h-2l.026 16.408-3.62-3.62L5.992 14.2l3.92 3.919a2.992 2.992 0 002.12.881z" />
        <Path d="M22 16v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v5a3 3 0 003 3h18a3 3 0 003-3v-5h-2z" />
      </G>
      <Defs>
        <ClipPath id="clip0_718_23363">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
