import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';

import {color} from '@app/theme';

import {isTablet} from 'react-native-device-info';
import {ManageKidsPhone} from './components/manage-kids-phone';
import {ManageKidsTablet} from './components/manage-kids-tablet';

export const ManageKids: FC<
  StackScreenProps<NavigatorParamList, 'manageKids'>
> = ({route}) => {
  return (
    <View style={CONTAINER}>
      {!isTablet() ? (
        <ManageKidsPhone route={route} />
      ) : (
        <ManageKidsTablet route={route} />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
