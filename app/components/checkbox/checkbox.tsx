import * as React from 'react';
import {TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {Text} from '../text/text';
import {spacing} from '../../theme';
import {CheckboxProps} from './checkbox.props';
import {CheckboxIcon, CheckboxRoundIcon} from '@app/svg';

const ROOT: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: spacing.tiny,
  alignSelf: 'flex-start',
};

const LABEL: TextStyle = {paddingLeft: spacing.medium};

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1;

  const rootStyle = [ROOT, props.style];

  const onPress = props.onToggle
    ? () => props.onToggle && props.onToggle(!props.value)
    : null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}>
      {props?.value ? <CheckboxIcon /> : <CheckboxRoundIcon />}
      <Text text={props.text} numberOfLines={numberOfLines} style={LABEL} />
    </TouchableOpacity>
  );
}
