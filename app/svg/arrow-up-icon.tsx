import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowUpIcon = ({fill = '#374957', props}) => (
  <Svg
    width={14}
    height={9}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12.293 8.207 7 2.914 1.707 8.207.293 6.793 5.586 1.5a2 2 0 0 1 2.828 0l5.293 5.293-1.414 1.414Z"
      fill={fill}
    />
  </Svg>
);
