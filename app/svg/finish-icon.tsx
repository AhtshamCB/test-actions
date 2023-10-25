import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const FinishIcon = ({fill = '#F300FF', props}) => (
  <Svg
    width={18}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={9.143} cy={9.492} r={8.595} fill={fill} />
    <Path
      d="m4.776 10.25 2.406 2.406 6.328-6.328"
      stroke="#fff"
      strokeWidth={2}
    />
  </Svg>
);
