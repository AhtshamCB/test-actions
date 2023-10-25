import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ChangePasswordIcon = ({
  width = 11,
  height = 14,
  fill = '#374957',
  props,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.753 10.3a1.202 1.202 0 100-2.405 1.202 1.202 0 000 2.405zm3.608-5.411a1.203 1.203 0 011.202 1.202v6.013a1.203 1.203 0 01-1.202 1.202H2.146a1.202 1.202 0 01-1.202-1.202V6.09A1.202 1.202 0 012.146 4.89h.601V3.686a3.006 3.006 0 016.012 0V4.89h.602zM5.753 1.883A1.804 1.804 0 003.95 3.687v1.202h3.607V3.686a1.804 1.804 0 00-1.804-1.803z"
        fill={fill}
      />
    </Svg>
  );
};
