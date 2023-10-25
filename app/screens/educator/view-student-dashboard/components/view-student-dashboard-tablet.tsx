import React from 'react';
import {View, ViewStyle} from 'react-native';
import {color, verticalScale} from '@app/theme';
import {Header} from './header/header';
import {LessonEarningStudentTablet} from '@app/screens/home-common/components/lesson-earning-student-tablet';

export const ViewStudentDashboardTablet = ({navigation}) => {
  return (
    <View style={CONTAINER}>
      <Header onBackPress={() => navigation.goBack()} />
      <View style={BODY}>
        <LessonEarningStudentTablet />
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const BODY: ViewStyle = {
  flex: 1,
  paddingVertical: verticalScale(20),
};
