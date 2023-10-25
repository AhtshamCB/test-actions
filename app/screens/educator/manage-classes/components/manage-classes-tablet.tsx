import React from 'react';
import {View, ViewStyle} from 'react-native';
//
import {color} from '@app/theme';
import {useOrientation} from '@app/hook';
import {ManageClassesPortraitTablet} from './manage-classes-portrait-tablet';
import {ManageClassesLandscapeTablet} from './manage-classes-landscape-tablet';

export const ManageClassesTablet = ({route}) => {
  const orientation = useOrientation();

  return (
    <View style={CONTAINER}>
      {orientation === 'PORTRAIT' ? (
        <ManageClassesPortraitTablet />
      ) : (
        <ManageClassesLandscapeTablet route={route} />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
