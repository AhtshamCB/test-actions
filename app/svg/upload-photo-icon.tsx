import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const UploadPhotoIcon = ({fill = '#374957', props}) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_718_23873)" fill={fill}>
        <Path d="M21 0H3a3 3 0 00-3 3v21h24V3a3 3 0 00-3-3zM3 2h18a1 1 0 011 1v17.586L11.121 9.707a3 3 0 00-4.242 0L2 14.586V3a1 1 0 011-1zM2 17.414l6.293-6.293a1 1 0 011.414 0L20.586 22H2v-4.586z" />
        <Path d="M16 10a3 3 0 100-6.001 3 3 0 000 6zm0-4a1 1 0 110 2 1 1 0 010-2z" />
      </G>
      <Defs>
        <ClipPath id="clip0_718_23873">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
