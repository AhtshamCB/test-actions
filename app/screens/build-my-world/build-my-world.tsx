import {NavigatorParamList} from '../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {View, ViewStyle, Text} from 'react-native';

export const BuildMyWorld: FC<
  StackScreenProps<NavigatorParamList, 'buildMyWorld'>
> = ({navigation}) => {
  return (
    <View style={CONTAINER}>
      <Text>Build My World Screen</Text>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
