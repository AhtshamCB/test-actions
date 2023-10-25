import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';

import {color} from '@app/theme';

import {isTablet} from 'react-native-device-info';
import {ManageClassesPhone} from './components/manage-classes-phone';
import {ManageClassesTablet} from './components/manage-classes-tablet';

export const ManageClasses: FC<
  StackScreenProps<NavigatorParamList, 'manageClasses'>
> = ({route}) => {
  return (
    <View style={CONTAINER}>
      {!isTablet() ? (
        <ManageClassesPhone />
      ) : (
        <ManageClassesTablet route={route} />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
