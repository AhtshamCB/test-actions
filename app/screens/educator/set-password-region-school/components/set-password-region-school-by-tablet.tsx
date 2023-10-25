import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {SetPasswordRegionSchoolTabletPortrait} from './set-passwor-region-school-portrait-tablet';
import {SetPasswordRegionSchoolTabletLandscape} from './set-password-region-school-landscape-tablet';

export const SetPasswordRegionSchoolByTablet = ({navigation, route}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <SetPasswordRegionSchoolTabletPortrait
          navigation={navigation}
          route={route}
        />
      ) : (
        <SetPasswordRegionSchoolTabletLandscape
          navigation={navigation}
          route={route}
        />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
