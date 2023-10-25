import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const BanIcon = ({width = 24, height = 24, fill = '#374957'}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_718_23026)">
        <Path
          d="M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm0 2a9.949 9.949 0 016.324 2.262L4.262 18.324A9.992 9.992 0 0112 2zm0 20a9.949 9.949 0 01-6.324-2.262L19.738 5.676A9.993 9.993 0 0112 22z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_718_23026">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
