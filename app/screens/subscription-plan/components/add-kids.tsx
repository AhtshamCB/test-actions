/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ViewStyle, TextStyle} from 'react-native';
import {ButtonLinearGradient, Header, Text} from '@app/components';
import {color, typography} from '@app/theme';

export function AddKids({navigation, isFromTabbar}) {
  return (
    <View style={CONTAINER_VIEW}>
      {isFromTabbar !== undefined && (
        <Header
          title={'Subscription Plan'}
          onBackPress={() => navigation.goBack()}
          style={{backgroundColor: color.white}}
        />
      )}

      <View
        style={[CONTAINER, {marginTop: isFromTabbar === undefined ? 0 : 20}]}>
        <View style={BODY}>
          <View style={[TABLE_VIEW, ELEVATION]}>
            <Text
              text={
                "To start the 14-Day Free Trial, please provide your child's information"
              }
            />
            <ButtonLinearGradient
              text={'Add My Kid'}
              style={BUTTON_LOGIN_VIEW}
              textStyle={TEXT_CONFIRM}
              onPress={() =>
                navigation.navigate('manageKids', {isFromTabbar: false})
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  padding: 15,
  backgroundColor: color.gray4,
  marginTop: 20,
};
const TEXT_CONFIRM: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontFamily: typography.promptBold,
  fontWeight: '700',
};
const BODY: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 200,
};
const TABLE_VIEW: ViewStyle = {
  backgroundColor: 'white',
  borderRadius: 8,
  width: '100%',
  marginVertical: 10,
  alignItems: 'center',
  padding: 20,
  marginTop: 30,
};
const ELEVATION: ViewStyle = {
  shadowColor: '#52006A',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 20,
};
const BUTTON_LOGIN_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  marginTop: 20,
  width: 150,
  height: 46,
  // marginStart: 10,
  // marginEnd: 10,
};
