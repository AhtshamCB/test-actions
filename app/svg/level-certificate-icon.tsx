import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const LevelCertificateIcon = ({fill = '#909090', props}) => (
  <Svg
    width={18}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.418 8.833a3.293 3.293 0 0 1 3.25-3.25 3.293 3.293 0 0 1 3.25 3.25 3.293 3.293 0 0 1-3.25 3.25 3.293 3.293 0 0 1-3.25-3.25Zm3.25 9.75L13 19.667V16.33a8.169 8.169 0 0 1-4.333 1.17 8.168 8.168 0 0 1-4.333-1.17v3.337M8.668 2.333a6.262 6.262 0 0 0-4.593 1.885 6.262 6.262 0 0 0-1.907 4.615 6.262 6.262 0 0 0 1.907 4.583 6.26 6.26 0 0 0 4.593 1.917 6.261 6.261 0 0 0 4.593-1.917 6.26 6.26 0 0 0 1.907-4.583 6.261 6.261 0 0 0-1.907-4.615 6.262 6.262 0 0 0-4.593-1.885Zm8.666 6.5a8.711 8.711 0 0 1-.617 3.034 8.493 8.493 0 0 1-1.55 2.686v8.364l-6.5-2.167-6.5 2.167v-8.364a8.558 8.558 0 0 1-2.166-5.72 8.32 8.32 0 0 1 2.524-6.11A8.374 8.374 0 0 1 8.668.167a8.374 8.374 0 0 1 6.142 2.556 8.318 8.318 0 0 1 2.524 6.11Z"
      fill={fill}
    />
  </Svg>
);
