import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {CreateAccountTabletPortrait} from './create-account-portrait-tablet';
import {CreateAccountTabletLandscape} from './create-account-landscape-tablet';

export const CreateAccountByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <CreateAccountTabletPortrait navigation={navigation} />
      ) : (
        <CreateAccountTabletLandscape navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
