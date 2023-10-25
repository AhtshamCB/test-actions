import {NavigatorParamList} from '../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {View, ViewStyle, Text, TouchableOpacity} from 'react-native';

export const Details: FC<StackScreenProps<NavigatorParamList, 'details'>> = ({
  navigation,
}) => {
  return (
    <View style={CONTAINER}>
      <Text>Details Screen</Text>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
