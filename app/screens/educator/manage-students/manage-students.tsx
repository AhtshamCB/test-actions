import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';

import {color} from '@app/theme';

import {isTablet} from 'react-native-device-info';
import {ManageStudentsPhone} from './components/manage-students-phone';
import {ManageStudentsTablet} from './components/manage-students-tablet';

export const ManageStudents: FC<
  StackScreenProps<NavigatorParamList, 'manageStudents'>
> = ({route}) => {
  return (
    <View style={CONTAINER}>
      {!isTablet() ? (
        <ManageStudentsPhone />
      ) : (
        <ManageStudentsTablet route={route} />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
