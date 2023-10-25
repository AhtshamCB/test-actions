import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

export const CompletedIcon = (props: SvgProps) => (
  <Svg
    width={8}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={4.113} cy={4.078} r={3.237} fill="#DB14FB" />
    <Path
      d="m2.263 4.309 1.233 1.156L5.96 3.153"
      stroke="#fff"
      strokeWidth={0.462}
      strokeLinecap="round"
    />
  </Svg>
);
