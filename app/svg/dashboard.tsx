import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const Dashboard = ({fill = '#919191', props}) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M2.222 20a2.143 2.143 0 0 1-1.57-.652A2.143 2.143 0 0 1 0 17.778V2.222c0-.61.217-1.134.652-1.57A2.143 2.143 0 0 1 2.222 0H8.89v20H2.222Zm8.89 0V10H20v7.778c0 .61-.217 1.134-.652 1.57a2.143 2.143 0 0 1-1.57.652H11.11Zm0-12.222V0h6.666c.61 0 1.134.217 1.57.652.435.436.652.96.652 1.57v5.556h-8.889Z"
      fill={fill}
    />
  </Svg>
);
