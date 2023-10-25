import React from 'react';
import {View, ViewStyle} from 'react-native';
//
import {color} from '@app/theme';
import {useOrientation} from '@app/hook';
import {StudentsDetailPortraitTablet} from './students-detail-portrait-tablet';
import {StudentsDetailLandscapeTablet} from './students-detail-landscape-tablet';

export const StudentsDetailTablet = ({route}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER}>
      {orientation === 'PORTRAIT' ? (
        <StudentsDetailPortraitTablet route={route} />
      ) : (
        <StudentsDetailLandscapeTablet route={route} />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
