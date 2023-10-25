import {NavigatorParamList} from '@app/navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {View, ViewStyle, Text, TouchableOpacity} from 'react-native';

export const Parents: FC<StackScreenProps<NavigatorParamList, 'parents'>> = ({
  navigation,
}) => {
  return (
    <View style={CONTAINER}>
      <Text>Parents Screen</Text>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
