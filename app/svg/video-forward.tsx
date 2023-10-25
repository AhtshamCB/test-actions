import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const VideoForward = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25pt"
      height="25pt"
      viewBox="0 0 25 25"
      {...props}>
      <Path
        d="M7.375 24.644a12.298 12.298 0 007.857 2.835c7.078 0 12.779-6.01 12.779-13.479 0-7.468-5.7-13.48-12.778-13.48-5.112 0-9.73 3.317-11.696 7.985"
        transform="matrix(-.86207 0 0 .89286 24.569 0)"
        fill="none"
        strokeWidth={1}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        stroke="#fff"
        strokeOpacity={1}
        strokeMiterlimit={4}
      />
      <Path
        d="M8.354 21.258c0-2.288-1.763-4.147-3.933-4.147S.492 18.97.492 21.258c0 2.293 1.758 4.148 3.929 4.148 2.17 0 3.933-1.855 3.933-4.148zm0 0M2.554.52l.983 7.985 7.568-1.037"
        transform="matrix(-.86207 0 0 .89286 24.569 0)"
        fill="none"
        strokeWidth={1}
        strokeLinecap="square"
        strokeLinejoin="miter"
        stroke="#fff"
        strokeOpacity={1}
        strokeMiterlimit={4}
      />
      <Path
        d="M9.777 15.625h-.851V11.34H7.539v-.645c.797-.02 1.344-.488 1.477-1.144h.761zm.973-1.648l.832-.266c.05.75.574 1.258 1.29 1.258.679 0 1.23-.477 1.23-1.227 0-.836-.575-1.258-1.239-1.258-.406 0-.797.168-1.043.442-.3-.121-.558-.246-.851-.356l.746-3.02h3.023v.845H12.29l-.426 1.742c.258-.301.715-.45 1.168-.45 1.121 0 1.946.758 1.946 2.016 0 1.145-.832 2.07-2.106 2.07-1.219 0-2.043-.843-2.121-1.796zm0 0"
        stroke="none"
        fillRule="nonzero"
        fill="#fff"
        fillOpacity={1}
      />
    </Svg>
  );
};
