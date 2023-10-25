import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowUpDownIcon = props => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="-1 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M54.894 6523.654L49.922 6519 45 6523.654l1.383 1.45 2.63-2.42V6539h2.007v-16.316l2.522 2.42 1.352-1.45zm6.753 9.243l-2.6 2.42v-16.246H57.04v16.245l-2.552-2.42-1.367 1.45 4.965 4.654 4.914-4.654-1.353-1.45z"
        transform="translate(-101 -6679) translate(56 160)"
        fill="#000"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  );
};
