import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useOrientation} from '@app/hook';
import {OnBoarding2PortraitTablet} from './onboarding-2-portrait-tablet';
import {Onboarding2TabletLandscape} from './onboarding-2-lanscape-tablet';

export const Onboarding2ByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <View style={CONTAINER_VIEW}>
      {orientation === 'PORTRAIT' ? (
        <OnBoarding2PortraitTablet navigation={navigation} />
      ) : (
        <Onboarding2TabletLandscape navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
};
