import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {SignUpSuccessTabletPortrait} from './sign-up-sucess-portrait-tablet';
import {SignUpSuccessTabletLandscape} from './sign-up-success-landscape-tablet';

export const SignUpSuccessByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <SignUpSuccessTabletPortrait navigation={navigation} />
      ) : (
        <SignUpSuccessTabletLandscape navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
