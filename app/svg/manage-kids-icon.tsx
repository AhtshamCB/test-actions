import * as React from 'react';
import Svg, {Circle, G, Path, Defs, ClipPath} from 'react-native-svg';

export const ManageKidsIcon = props => {
  return (
    <Svg
      width={54}
      height={54}
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={26.9999} cy={26.754} r={26.2538} fill="#F300FF" />
      <G clipPath="url(#clip0_904_19)" fill="#fff">
        <Path d="M25.125 24.5a6.75 6.75 0 10-6.75-6.75 6.757 6.757 0 006.75 6.75zm0-11.25a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM38.625 22.25v-3.376h-2.25v3.375H33v2.25h3.375v3.375h2.25V24.5H42v-2.25h-3.375zM29.673 26.75h-9.096A5.584 5.584 0 0015 32.328v5.674h2.25v-5.674a3.33 3.33 0 013.327-3.326h9.096A3.33 3.33 0 0133 32.327v5.674h2.25v-5.674a5.583 5.583 0 00-5.577-5.576z" />
      </G>
      <Defs>
        <ClipPath id="clip0_904_19">
          <Path fill="#fff" transform="translate(15 11)" d="M0 0H27V27H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
