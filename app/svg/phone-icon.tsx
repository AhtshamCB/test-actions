import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const ContactPhoneIcon = props => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_718_23121)">
        <Path
          d="M14.2 16.262a12.148 12.148 0 01-6.454-6.469l3.406-3.406L4.887.122 1.716 3.293A5.893 5.893 0 000 7.5C0 14.748 9.252 24 16.5 24a5.893 5.893 0 004.207-1.716l3.17-3.171-6.264-6.265-3.413 3.414zm5.094 4.608A3.91 3.91 0 0116.5 22C10.267 22 2 13.733 2 7.5a3.91 3.91 0 011.13-2.793L4.887 2.95l3.437 3.437-2.935 2.935.246.614a14.37 14.37 0 008.446 8.436l.606.231 2.926-2.927 3.437 3.437-1.756 1.757zM24 2.5V7h-2V3.443l-5.591 5.591-1.41-1.414L20.616 2H17V0h4.529a2.488 2.488 0 012.47 2.5z"
          fill="#374957"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_718_23121">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
