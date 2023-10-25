import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const DashboardIcon = ({width = 20, height = 20, props}) => {
  return (
    <Svg
      width={width}
      height={height}
      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium teefi-i4bv87-MuiSvgIcon-root"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="DashboardIcon"
      {...props}>
      <Path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </Svg>
  );
};
