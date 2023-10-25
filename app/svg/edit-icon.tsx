import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const EditIcon = ({fill = '#909090'}) => (
  <Svg width={13} height={16} fill="none">
    <Path
      d="m2.134 14.083.963-.16 4.94-6.914-1.122-.802-4.94 6.914.16.962Zm8.676-8.56-3.402-2.4L9.027.86l3.387 2.42-1.604 2.245ZM.989 15.688l-.486-2.921 6.072-8.497 3.407 2.434L3.909 15.2l-2.92.487Zm6.487-9.079-.56-.4 1.122.801-.562-.4Z"
      fill={fill}
    />
  </Svg>
);
