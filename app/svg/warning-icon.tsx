import {color} from '@app/theme';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const WarningIcon = ({width = 24, height = 24}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        fill={color.white}
        stroke={color.purple}
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3l10 18H2L12 3zm0 6v6m0 1v2"
      />
    </Svg>
  );
};
