import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const WrongIcon = ({width = 25, height = 25, props}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12.7554} cy={11.9934} r={11.7861} fill="#fff" />
      <Path
        d="M17.451 7.298L8.06 16.69M8.06 7.298l9.391 9.392"
        stroke="red"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};
