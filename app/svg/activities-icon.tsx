import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const ActivitesIcon = ({fill = '#374957', props}) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_721_29357)">
        <Path
          d="M24 19V4a3 3 0 00-3-3H3a3 3 0 00-3 3v15h11v2H6v2h12v-2h-5v-2h11zM3 3h18a1 1 0 011 1v9H2V4a1 1 0 011-1zM2 15h20v2H2v-2z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_721_29357">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
