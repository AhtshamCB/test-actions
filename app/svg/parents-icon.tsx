import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ParentsIcon = ({fill = '#919191', props}) => (
  <Svg
    width={22}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M4.53 0c.686 0 1.344.274 1.83.762a2.606 2.606 0 0 1 0 3.676 2.582 2.582 0 0 1-3.66 0 2.606 2.606 0 0 1 0-3.676A2.582 2.582 0 0 1 4.53 0ZM2.587 6.5h3.883c.686 0 1.344.274 1.83.762.485.487.758 1.148.758 1.838v7.15H7.118V26H1.94v-9.75H0V9.1c0-.69.273-1.35.758-1.838a2.582 2.582 0 0 1 1.83-.762ZM16.177 0c.686 0 1.344.274 1.83.762a2.606 2.606 0 0 1 0 3.676 2.582 2.582 0 0 1-3.66 0 2.606 2.606 0 0 1 0-3.676A2.582 2.582 0 0 1 16.176 0Zm-1.942 26v-7.8h-3.882l3.352-9.867A2.58 2.58 0 0 1 16.177 6.5a2.58 2.58 0 0 1 2.471 1.833L22 18.2h-3.882V26h-3.883Z"
      fill={fill}
    />
  </Svg>
);
