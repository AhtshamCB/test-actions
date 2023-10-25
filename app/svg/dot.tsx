import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

export const Dot = ({dotsCount = 4, activeDot = 0, props}) => {
  let xPosition = 0;
  const width = dotsCount * 10 + 10;
  const height = 6;
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {Array.from(Array(dotsCount), (e, i) => {
        const isActive = i === activeDot;
        if (activeDot + 1 === i) {
          xPosition = xPosition + 20;
        } else if (i !== 0) {
          xPosition = xPosition + 10;
        }
        return (
          <Rect
            x={xPosition}
            width={isActive ? 17 : 7}
            fill={isActive ? '#DB14FB' : '#050505'}
            opacity={isActive ? 1 : 0.1}
            rx={3}
            y={0.1}
            height={5}
          />
        );
      })}
    </Svg>
  );
};
