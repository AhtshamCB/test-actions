import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
//
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {color} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {StudentsDetailPhone} from './components/students-detail-phone';
import {StudentsDetailTablet} from './components/students-detail-tablet';

export const StudentsDetail: FC<
  StackScreenProps<NavigatorParamList, 'studentsDetail'>
> = ({route}) => {
  return (
    <View style={CONTAINER}>
      {!isTablet() ? (
        <StudentsDetailPhone route={route} />
      ) : (
        <StudentsDetailTablet route={route} />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
