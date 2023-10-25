import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const CorrectIcon = ({width = 25, height = 25, props}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12.7554} cy={12.578} r={11.7861} fill="#fff" />
      <Path
        d="M6.101 14.418l2.893 2.893 10.16-10.16"
        stroke="#38CE00"
        strokeWidth={2.11027}
        strokeLinecap="round"
      />
    </Svg>
  );
};
