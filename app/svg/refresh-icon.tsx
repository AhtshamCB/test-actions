import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const RefreshIcon = props => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_718_23961)" fill="#374957">
        <Path d="M12 2a10.032 10.032 0 017.122 3H15v2h5.143A1.859 1.859 0 0022 5.143V0h-2v3.078A11.982 11.982 0 000 12h2A10.011 10.011 0 0112 2zM22 12a9.986 9.986 0 01-17.122 7H9v-2H3.857A1.859 1.859 0 002 18.857V24h2v-3.078A11.983 11.983 0 0024 12h-2z" />
      </G>
      <Defs>
        <ClipPath id="clip0_718_23961">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
