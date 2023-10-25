import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const VideoPlay = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="60pt"
      height="60pt"
      viewBox="0 0 25 25"
      {...props}>
      <Path
        d="M12.5 0C5.625 0 0 5.625 0 12.5S5.625 25 12.5 25 25 19.375 25 12.5 19.375 0 12.5 0zm4.375 13.125l-6.25 4.688c-.156.078-.313.156-.469.156-.156 0-.234 0-.312-.078-.313-.157-.469-.391-.469-.703V7.813c0-.313.156-.547.469-.704.234-.156.547-.078.781.079l6.25 4.687c.234.156.313.39.313.625 0 .234-.079.469-.313.625zm0 0"
        stroke="none"
        fillRule="nonzero"
        fill="#fff"
        fillOpacity={1}
      />
    </Svg>
  );
};
