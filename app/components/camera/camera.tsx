/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, TextStyle, View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {color, typography, verticalScale} from '@app/theme';
import {CameraIcon, UploadPhotoIcon} from '@app/svg';
import {Text} from '../text/text';
import {isTablet} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';

export const CameraScreen = ({
  isVisibleCameraPopup,
  onCloseCameraPopup,
  chooseImage,
  openCamera,
}: {
  isVisibleCameraPopup: boolean;
  onCloseCameraPopup: () => void;
  chooseImage: () => void;
  openCamera: () => void;
}) => {
  const {orientationOpenApp} = useSelector(selector.config);
  return (
    <Modal
      isVisible={isVisibleCameraPopup}
      onBackdropPress={onCloseCameraPopup}
      backdropColor={color.palette.mineShaft}
      backdropOpacity={0.5}
      animationInTiming={150}
      animationOutTiming={150}
      backdropTransitionOutTiming={0}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={MODAL}
      deviceHeight={2000}
      deviceWidth={isTablet() ? 2000 : 0}
      statusBarTranslucent>
      <View
        style={[
          OPTIONS,
          {
            top: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? verticalScale(110)
                : verticalScale(100)
              : verticalScale(30),
          },
        ]}>
        <Pressable style={OPTION} onPress={chooseImage}>
          <UploadPhotoIcon fill={color.purple} props={undefined} />
          <Text text={'Upload Photo'} style={TEXT} />
        </Pressable>
        <Pressable style={OPTION} onPress={openCamera}>
          <CameraIcon fill={color.purple} props={undefined} />
          <Text text={'Camera'} style={TEXT} />
        </Pressable>
      </View>
    </Modal>
  );
};

const OPTIONS: ViewStyle = {
  backgroundColor: color.white,
  flexDirection: 'row',
  borderTopRightRadius: 30,
  borderTopLeftRadius: 30,
  justifyContent: 'flex-end',
  height: verticalScale(110),
};
const OPTION: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: 14,
  color: color.purple,
  marginTop: 2,
};
const MODAL: ViewStyle = {
  justifyContent: 'flex-end',
  marginLeft: 0,
  marginRight: 0,
};
