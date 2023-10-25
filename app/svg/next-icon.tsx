import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const NextIcon = ({fill = '#fff', props}) => (
  <Svg
    width={17}
    height={9}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.925 4.75a.552.552 0 0 0 0-.782L12.41.453a.552.552 0 0 0-.781.78l3.124 3.126-3.124 3.124a.552.552 0 0 0 .78.781l3.516-3.515ZM.859 4.91h14.675V3.807H.86v1.105Z"
      fill={fill}
    />
  </Svg>
);
