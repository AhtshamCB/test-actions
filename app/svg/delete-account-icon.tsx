import {color} from '@app/theme';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const DeleteAccountIcon = props => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={color.gray3}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M1 20a1 1 0 001 1h8a1 1 0 000-2H3.071A7.011 7.011 0 0110 13a5.044 5.044 0 10-3.377-1.337A9.01 9.01 0 001 20zm9-15a3 3 0 11-3 3 3 3 0 013-3zm12.707 9.707L20.414 17l2.293 2.293a1 1 0 11-1.414 1.414L19 18.414l-2.293 2.293a1 1 0 01-1.414-1.414L17.586 17l-2.293-2.293a1 1 0 011.414-1.414L19 15.586l2.293-2.293a1 1 0 011.414 1.414z" />
    </Svg>
  );
};
