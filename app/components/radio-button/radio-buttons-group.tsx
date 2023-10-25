import {color, moderateScale, typography} from '@app/theme';
import React from 'react';
import {TextStyle, TouchableOpacity, View} from 'react-native';

import {ViewStyle} from 'react-native';
import { isTablet } from 'react-native-device-info';
import {Text} from '../text/text';

export const RadioButton = ({onPress, selected, children}) => {
  return (
    <View style={RADIO_BUTTON_CONTAINER}>
      <TouchableOpacity onPress={onPress} style={RADIO_BUTTON}>
        {selected ? <View style={RADIO_BUTTON_ICON} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={RADIO_BUTTON_TEXT} text={children} />
      </TouchableOpacity>
    </View>
  );
};

const RADIO_BUTTON_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 45,
  paddingVertical: 5,
};
const RADIO_BUTTON: ViewStyle = {
  height: 20,
  width: 20,
  backgroundColor: '#F8F8F8',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: color.gray7,
  alignItems: 'center',
  justifyContent: 'center',
};
const RADIO_BUTTON_ICON: ViewStyle = {
  height: 14,
  width: 14,
  borderRadius: 7,
  backgroundColor: color.gray3,
};
const RADIO_BUTTON_TEXT: TextStyle = {
  fontSize: isTablet() ? moderateScale(10) : 12,
  marginLeft: 16,
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray8,
};
