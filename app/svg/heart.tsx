import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const HeartIcon = props => {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M17.5.917a6.4 6.4 0 00-5.5 3.3 6.4 6.4 0 00-5.5-3.3A6.8 6.8 0 000 7.967c0 6.775 10.956 14.6 11.422 14.932l.578.41.578-.41C13.044 22.57 24 14.742 24 7.967a6.8 6.8 0 00-6.5-7.05z"
        fill="#F300FF"
      />
    </Svg>
  );
};
