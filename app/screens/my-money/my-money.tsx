import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {color} from '@app/theme';
import {isTablet} from 'react-native-device-info';
import {MyMoneyByTablet} from './components/my-money-by-tablet';
import {MyMoneyByPhone} from './components/my-money-by-phone';

export const MyMoney: FC<StackScreenProps<NavigatorParamList, 'myMoney'>> = ({
  navigation,
}) => {
  return (
    <View style={CONTAINER}>
      {isTablet() ? (
        <MyMoneyByTablet navigation={navigation} />
      ) : (
        <MyMoneyByPhone navigation={navigation} />
      )}
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
