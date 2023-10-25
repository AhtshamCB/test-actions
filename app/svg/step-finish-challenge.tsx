import * as React from 'react';
import Svg, {Path, G, Defs, ClipPath} from 'react-native-svg';

export const StepFinishChallenge = ({width = 120, height = 50, props}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 339 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1606_77)">
        <Path
          opacity={0.3}
          d="M34.904 69.268c19.075 0 34.538-15.463 34.538-34.538C69.442 15.656 53.979.194 34.904.194 15.829.193.366 15.656.366 34.73c0 19.074 15.463 34.537 34.538 34.537z"
          fill="#F300FF"
        />
        <Path
          d="M34.843 57.041c12.348 0 22.358-10.01 22.358-22.358S47.19 12.325 34.843 12.325s-22.358 10.01-22.358 22.358 10.01 22.358 22.358 22.358z"
          fill="#F300FF"
        />
        <Path
          d="M119.218 51.013c9.347 0 16.924-7.577 16.924-16.924 0-9.346-7.577-16.923-16.924-16.923-9.346 0-16.923 7.577-16.923 16.923 0 9.347 7.577 16.924 16.923 16.924zM187.313 51.607c9.346 0 16.923-7.577 16.923-16.924 0-9.346-7.577-16.923-16.923-16.923-9.347 0-16.923 7.577-16.923 16.923 0 9.347 7.576 16.924 16.923 16.924zM254.711 51.607c9.346 0 16.923-7.577 16.923-16.924 0-9.346-7.577-16.923-16.923-16.923-9.347 0-16.923 7.577-16.923 16.923 0 9.347 7.576 16.924 16.923 16.924z"
          fill="#D9D9D9"
        />
        <Path
          d="M24.446 38.185l4.669 4.67 16.247-16.248"
          stroke="#fff"
          strokeWidth={3.0048}
          strokeLinecap="round"
        />
        <Path
          d="M70.353 34.09h31.942"
          stroke="#F300FF"
          strokeWidth={2}
          strokeLinecap="square"
          strokeDasharray="4 4"
        />
        <Path
          d="M137.644 34.09h31.941M204.889 34.09h31.941"
          stroke="#D9D9D9"
          strokeWidth={2}
          strokeLinecap="square"
          strokeDasharray="4 4"
        />
      </G>
      <Path
        d="M321.822 51.847c9.346 0 16.923-7.577 16.923-16.924 0-9.346-7.577-16.923-16.923-16.923-9.347 0-16.924 7.577-16.924 16.923 0 9.347 7.577 16.924 16.924 16.924z"
        fill="#D9D9D9"
      />
      <Path
        d="M272 34.33h31.941"
        stroke="#D9D9D9"
        strokeWidth={2}
        strokeLinecap="square"
        strokeDasharray="4 4"
      />
      <Defs>
        <ClipPath id="clip0_1606_77">
          <Path fill="#fff" d="M0 0H272V70H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
