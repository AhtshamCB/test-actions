import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const SearchIcon = props => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l4.79 4.79-1.06 1.06-4.79-4.79z"
        fill="#080341"
      />
    </Svg>
  );
};
