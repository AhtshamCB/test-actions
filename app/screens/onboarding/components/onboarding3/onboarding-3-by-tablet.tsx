import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {OnBoarding3PortraitTablet} from './onboarding-3-portrait-tablet';
import {Onboarding3TabletLandscape} from './onboarding-3-lanscape-tablet';

export const Onboarding3ByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <OnBoarding3PortraitTablet navigation={navigation} />
      ) : (
        <Onboarding3TabletLandscape navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
