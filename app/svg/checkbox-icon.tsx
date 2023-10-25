import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const CheckboxIcon = props => {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_718_23176)" fill="#374957">
        <Path d="M24 24H0V3a3 3 0 013-3h18a3 3 0 013 3v21zM2 22h20V3a1 1 0 00-1-1H3a1 1 0 00-1 1v19z" />
        <Path d="M9.333 17.92a1.984 1.984 0 01-1.414-.587l-4.626-4.626 1.414-1.414 4.626 4.626 9.96-9.959 1.414 1.414-9.959 9.96a1.988 1.988 0 01-1.415.585z" />
      </G>
      <Defs>
        <ClipPath id="clip0_718_23176">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
