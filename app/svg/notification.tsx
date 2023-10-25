import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

export const NotificationIcon = ({width = 21, height = 27}) => (
  <Svg width={width} height={height} viewBox="0 0 21 27" fill="none">
    <Path
      d="M17.435 11.02a7.103 7.103 0 10-14.205 0v9.47h14.205v-9.47zm2.368 10.259l.473.63a.592.592 0 01-.473.948H.863a.592.592 0 01-.474-.947l.474-.631v-10.26a9.47 9.47 0 1118.94 0v10.26zM7.373 24.04h5.92a2.96 2.96 0 11-5.92 0z"
      fill="#151933"
    />
    <Circle cx={16.1581} cy={4.31241} r={4.23664} fill="#F300FF" />
  </Svg>
);
