import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const BackButtonIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M.293 7.293a1 1 0 0 0 0 1.414l6.364 6.364a1 1 0 0 0 1.414-1.414L2.414 8l5.657-5.657A1 1 0 0 0 6.657.93L.293 7.293ZM1 9h20.571V7H1v2Z"
      fill="#151933"
    />
  </Svg>
);
