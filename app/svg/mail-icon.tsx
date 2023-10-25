import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const MailIcon = props => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 -4 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M442 279c0 .203-.039.395-.095.578L433 270l9-7v16zm-26.444 1.946l9.024-9.616 3.42 2.585 3.272-2.601 9.172 9.632c-.143.033-24.745.033-24.888 0zM414 279v-16l9 7-8.905 9.578A1.966 1.966 0 01414 279zm27-18l-13 10-13-10h26zm-1-2h-24a4 4 0 00-4 4v16a4 4 0 004 4h24a4 4 0 004-4v-16a4 4 0 00-4-4z"
        transform="translate(-412 -259)"
        fill="#000"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  );
};
