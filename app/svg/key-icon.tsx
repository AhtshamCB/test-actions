import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

export const KeyIcon = ({width = 24, height = 24}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G
        stroke="#db14fb"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Circle cx={8} cy={15} r={3} />
        <Path d="M10 12.586L17.086 5.5" />
        <Path d="M16.9142 7L18 8.08579" />
        <Path d="M14.4142 9.5L15.5 10.5858" />
      </G>
    </Svg>
  );
};
