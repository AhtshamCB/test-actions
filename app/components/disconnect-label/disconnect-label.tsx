/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ImageStyle, TextStyle, View, ViewStyle, Image} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
//
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/redux';
import ConfigTypes, {ConfigState} from '@app/redux/config-redux';
//
import {Text, Button} from '@app/components';
//
import {color, typography, spacing, radius} from '@app/theme';
import {RefreshIcon} from '@app/svg';

const DISCONNECT = require('./disconnect.png');
/**
 * Describe your component here
 */
export function DisconnectLabel() {
  const {isNetworkConnected} = useSelector<RootState>(
    state => state.config,
  ) as ConfigState;
  const dispatch = useDispatch();
  const setIsNetworkConnected = isConnected =>
    dispatch(ConfigTypes.setIsNetworkConnected(isConnected));

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const {isConnected, isInternetReachable} = state || {};
      if (!isConnected && !isInternetReachable) {
        setIsNetworkConnected(false);
      } else {
        setIsNetworkConnected(true);
      }
    });
    // To unsubscribe to these update, just use:
    return () => {
      unsubscribe();
    };
  }, []);

  const _onCloseModal = () => {
    setIsNetworkConnected(true);
  };

  return (
    <Modal
      isVisible={!isNetworkConnected}
      backdropColor={color.palette.mineShaft}
      backdropOpacity={0.5}
      animationInTiming={150}
      animationOutTiming={150}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      style={MODAL}
      statusBarTranslucent>
      <View style={CONTAINER}>
        <Image source={DISCONNECT} style={IMAGE} />
        <Text style={TITLE_TEXT} text={'Opps!'} />
        <Text
          style={SUB_TITLE_TEXT}
          text={
            'Poor network connection. Please check your connectivity and try again'
          }
        />
        <Button style={CONFIRM_BT} onPress={_onCloseModal}>
          <Text style={CONFIRM_TEXT_STYLE} text={'Refresh'} />
          <RefreshIcon />
        </Button>
      </View>
    </Modal>
  );
}
const MODAL: ViewStyle = {
  margin: spacing.section,
};
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  borderRadius: radius.tiny,
  paddingTop: 60,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 23,
};
const IMAGE: ImageStyle = {
  width: 104,
  height: 104,
  position: 'absolute',
  top: -52,
};
const TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 24,
  color: color.palette.black1A,
  textAlign: 'center',
  marginBottom: spacing.base,
};
const SUB_TITLE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: typography.size.regular,
  color: color.palette.gray50,
  textAlign: 'center',
  marginVertical: spacing.medium,
};
const CONFIRM_BT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: 5,
  marginTop: 16,
  marginBottom: 10,
};
const CONFIRM_TEXT_STYLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: 15,
  color: color.black1,
  paddingHorizontal: 10,
};
