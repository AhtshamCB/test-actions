import React from 'react';
import {View, ViewStyle} from 'react-native';
import {LessonEarningStudentPhone} from '@app/screens/home-common/components/lesson-earning-student-phone';
import {color, verticalScale} from '@app/theme';
import {Header} from './header/header';

export const ViewStudentDashboardPhone = ({navigation}) => {
  return (
    <View style={CONTAINER}>
      <Header onBackPress={() => navigation.goBack()} />
      <View style={BODY}>
        <LessonEarningStudentPhone />
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
  marginTop: verticalScale(20),
};
