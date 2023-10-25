import React from 'react';
import {View, ViewStyle} from 'react-native';
//
import {color} from '@app/theme';
import {useOrientation} from '@app/hook';
import {ManageStudentsPortraitTablet} from './manage-students-portrait-tablet';
import {ManageStudentsLandscapeTablet} from './manage-students-landscape-tablet';

export const ManageStudentsTablet = ({route}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER}>
      {orientation === 'PORTRAIT' ? (
        <ManageStudentsPortraitTablet />
      ) : (
        <ManageStudentsLandscapeTablet route={route} />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
