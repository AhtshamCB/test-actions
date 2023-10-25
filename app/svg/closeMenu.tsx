import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const CloseMenu = (props: SvgProps) => (
  <Svg
    width={20}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M19 1 1.5 18.5M1 1l17.5 17.5"
      stroke="#151933"
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </Svg>
);
