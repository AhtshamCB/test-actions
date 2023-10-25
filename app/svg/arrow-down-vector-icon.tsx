import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ArrowDownVectorIcon = props => {
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
        d="M12 3.25a.75.75 0 01.75.75v14.19l4.72-4.72a.75.75 0 111.06 1.06l-6 6a.75.75 0 01-1.06 0l-6-6a.75.75 0 111.06-1.06l4.72 4.72V4a.75.75 0 01.75-.75z"
        fill="#F300FF"
      />
    </Svg>
  );
};
