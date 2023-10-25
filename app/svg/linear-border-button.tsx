import * as React from 'react';
import Svg, {
  SvgProps,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={77}
    height={33}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      x={0.125}
      y={0.125}
      width={75.841}
      height={32.056}
      rx={16.028}
      stroke="url(#a)"
      strokeWidth={0.25}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={-1.205}
        y1={19.824}
        x2={78.013}
        y2={19.016}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#DB14FB" />
        <Stop offset={1} stopColor="#FFC700" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
