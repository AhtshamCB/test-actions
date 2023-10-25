import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

export const LessonsIcon = (props: SvgProps) => (
  <Svg
    width={49}
    height={49}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle opacity={0.1} cx={24.5} cy={24.5} r={24.5} fill="#FFC700" />
    <Path
      d="M31 17.92 23 14v18h-2v-1.73c-1.79.35-3 .99-3 1.73 0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97v-9.05l6-3.06Z"
      fill="#DB14FB"
    />
  </Svg>
);
