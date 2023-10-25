import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Menu = props => (
  <Svg
    width={43}
    height={27}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M0 27h43v-4.5H0V27Zm0-11.25h43v-4.5H0v4.5ZM0 0v4.5h43V0H0Z"
      fill="#DB14FB"
    />
  </Svg>
);

export default Menu;
