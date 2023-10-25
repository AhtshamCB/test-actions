import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {OnBoarding4PortraitTablet} from './onboarding-4-portrait-tablet';
import {Onboarding4TabletLandscape} from './onboarding-4-lanscape-tablet';

export const Onboarding4ByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <OnBoarding4PortraitTablet navigation={navigation} />
      ) : (
        <Onboarding4TabletLandscape navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
