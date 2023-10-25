import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {CreateNameTabletPortrait} from './create-name-portrait-tablet';
import {CreateNameTabletLandscape} from './create-name-landscape-tablet';

export const CreateNameByTablet = ({navigation, route}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <CreateNameTabletPortrait navigation={navigation} route={route} />
      ) : (
        <CreateNameTabletLandscape navigation={navigation} route={route} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
