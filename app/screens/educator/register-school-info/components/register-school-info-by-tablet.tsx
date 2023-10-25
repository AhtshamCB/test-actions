import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {RegisterSchoolInfoTabletPortrait} from './register-school-info-portrait-tablet';
import {RegisterSchoolInfoTabletLandscape} from './register-school-info-landscape-tablet';

export const RegisterSchoolByTablet = ({navigation, route}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <RegisterSchoolInfoTabletPortrait
          navigation={navigation}
          route={route}
        />
      ) : (
        <RegisterSchoolInfoTabletLandscape
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
