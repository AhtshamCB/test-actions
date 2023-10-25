import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {OnBoarding1PortraitTablet} from './onboarding-1-portrait-tablet';
import {Onboarding1TabletLandscape} from './onboarding-1-lanscape-tablet';

export const Onboarding1ByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <OnBoarding1PortraitTablet navigation={navigation} />
      ) : (
        <Onboarding1TabletLandscape navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
