import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowUpVectorIcon = props => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.47 3.47a.75.75 0 011.06 0l6 6a.75.75 0 11-1.06 1.06l-4.72-4.72V20a.75.75 0 01-1.5 0V5.81l-4.72 4.72a.75.75 0 11-1.06-1.06l6-6z"
        fill="#F300FF"
      />
    </Svg>
  );
};
