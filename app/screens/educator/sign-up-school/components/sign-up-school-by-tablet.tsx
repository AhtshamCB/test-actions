import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {SignUpSchoolTabletPortrait} from './sign-up-school-portrait-tablet';
import {SignUpSchoolTabletLandscape} from './sign-up-school-landscape-tablet';

export const SignUpSchoolByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <SignUpSchoolTabletPortrait navigation={navigation} />
      ) : (
        <SignUpSchoolTabletLandscape navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
