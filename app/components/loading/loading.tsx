import React, {FC} from 'react';
import {ActivityIndicator, ViewStyle, View} from 'react-native';
//
import {LoadingProps} from './loading.props';
import {color} from '@app/theme';
import Modal from 'react-native-modal';
import {isTablet} from 'react-native-device-info';

export const Loading: FC<LoadingProps> = ({isVisibleLoading}) => {
  return (
    <Modal
      isVisible={isVisibleLoading}
      backdropColor={color.palette.mineShaft}
      backdropOpacity={0.5}
      animationInTiming={150}
      animationOutTiming={150}
      backdropTransitionOutTiming={0}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      deviceHeight={2000}
      deviceWidth={isTablet() ? 2000 : 0}
      statusBarTranslucent>
      <View style={LOADING_VIEW_POPUP}>
        <ActivityIndicator size="large" color={color.gray6} />
      </View>
    </Modal>
  );
};

const LOADING_VIEW_POPUP: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
};
