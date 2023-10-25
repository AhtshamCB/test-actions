import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

export const SettingDotIcon = props => {
  return (
    <Svg
      width={5}
      height={21}
      viewBox="0 0 5 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={2.85425} cy={2.85785} r={2.14575} fill="#151933" />
      <Circle cx={2.85425} cy={10.7526} r={2.14575} fill="#151933" />
      <Circle cx={2.85425} cy={18.6473} r={2.14575} fill="#151933" />
    </Svg>
  );
};
