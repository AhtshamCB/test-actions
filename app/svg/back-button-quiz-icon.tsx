import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

export const BackButtonQuizIcon = props => {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 85 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M.5 40.313c0 21.963 18.779 39.812 42 39.812s42-17.849 42-39.812C84.5 18.349 65.721.5 42.5.5S.5 18.35.5 40.313z"
        fill="url(#paint0_linear_292_14435)"
        stroke="#F300FF"
      />
      <Path
        d="M50.164 29.078L34.836 40.313l15.328 11.234"
        stroke="#F300FF"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_292_14435"
          x1={110.87}
          y1={80.6252}
          x2={-19.0817}
          y2={23.1417}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
