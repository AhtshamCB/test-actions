import {NavigatorParamList} from '@app/navigators/app-navigator';
import {color} from '@app/theme';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {ViewStudentDashboardPhone} from './components/view-student-dashboard-phone';
import {ViewStudentDashboardTablet} from './components/view-student-dashboard-tablet';

export const ViewStudentDashboard: FC<
  StackScreenProps<NavigatorParamList, 'viewStudentDashboard'>
> = ({navigation}) => {
  return (
    <View style={CONTAINER}>
      {!isTablet() ? (
        <ViewStudentDashboardPhone navigation={navigation} />
      ) : (
        <ViewStudentDashboardTablet navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.gray2,
};
