import * as React from 'react';
import Svg, {Rect, Defs, LinearGradient, Stop} from 'react-native-svg';

const BorderButton = ({style, props}) => (
  <Svg
    style={[style]}
    width={103}
    height={66}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      x={0.5}
      y={1.406}
      width={102}
      height={64}
      rx={28.5}
      stroke="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={123.5}
        y1={33.906}
        x2={-5.5}
        y2={28.906}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#DB14FB" />
        <Stop offset={1} stopColor="#DB14FB" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default BorderButton;
