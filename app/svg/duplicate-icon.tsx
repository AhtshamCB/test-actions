import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const DuplicateIcon = ({fill = '#374957'}) => {
  return (
    <Svg width={12} height={16} viewBox="0 0 20 24" fill="none">
      <Path
        d="M20 4.145L15.986 0H8a3 3 0 00-3 3v1H3a3 3 0 00-3 3v17h16v-5h4V4.145zM14 22H2V7a1 1 0 011-1h2v13h9v3zm-7-5V3a1 1 0 011-1h6v4h4v11H7z"
        fill={fill}
      />
    </Svg>
  );
};
