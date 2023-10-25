import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const HintIcon = ({width = 24, height = 24, fill = '#374957'}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_718_23631)" fill={fill}>
        <Path d="M12 24a12 12 0 1112-12 12.013 12.013 0 01-12 12zm0-22a10 10 0 1010 10A10.011 10.011 0 0012 2z" />
        <Path d="M13 15h-2v-.743a3.953 3.953 0 011.964-3.5 2 2 0 001-2.125 2.024 2.024 0 00-1.6-1.595A2 2 0 0010 9H8a4 4 0 115.93 3.505 1.982 1.982 0 00-.93 1.752V15zM13 17h-2v2h2v-2z" />
      </G>
      <Defs>
        <ClipPath id="clip0_718_23631">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
