import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

export const CheckboxRoundIcon = props => {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect x={0.5} y={0.5} width={14} height={14} rx={2.5} stroke="#9F9F9F" />
    </Svg>
  );
};
