/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  Platform,
} from 'react-native';
import type {ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
//
import {HeaderProps} from './header.props';
//
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  BackButtonIcon,
  ChangeCameraIcon,
  ChangePasswordIcon,
  NotificationIcon,
} from '@app/svg';
import {
  CameraScreen,
  ChangePasswordPopup,
  DropdownComponent,
  Text,
} from '@app/components';
import {isTablet} from 'react-native-device-info';
import {useGrade, useOrientation, useUploadFile} from '@app/hook';
import {useDispatch, useSelector} from 'react-redux';
import {selector, UserActions} from '@app/redux';
import FastImage from 'react-native-fast-image';
import {useUpdateMeAvatar} from '@app/hook/useUpdateMeAvatar';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

export const Header = function Header({onBackPress}: HeaderProps) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const {userInfo, infoDashboardStudent, accessToken} = useSelector(
    selector.user,
  );
  const {orientationOpenApp} = useSelector(selector.config);
  const orientation = useOrientation();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isShowCamera, setIsShowCamera] = useState<boolean>(false);
  const [isVisibleUpdatePassword, setIsVisibleUpdatePassword] =
    useState<boolean>(false);
  const [isGetUser, setIsGetUser] = useState<boolean>(false);

  const {uploadFile, fileData} = useUploadFile(accessToken);
  const {updateMeAvatar} = useUpdateMeAvatar(accessToken, fileData);

  useEffect(() => {
    getListStudents({
      payload: {
        gradeId: userInfo?.me?.grade?.gradeId,
        order: 'asc',
        all: true,
        sort: 'createdAt',
      },
    });
  }, []);

  const {getListStudents, dataListStudents} = useGrade();

  const _onGoBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const resultDataListStudents = dataListStudents?.data?.map(item => {
    return {
      label: item?.name,
      value: item?._id,
      ...item,
    };
  });

  const onShowCameraScreen = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsShowCamera(true);
    }, 500);
  };

  const onShowChangePassword = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisibleUpdatePassword(true);
    }, 500);
  };

  const onClose = () => {
    setIsVisibleUpdatePassword(false);
  };

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(async image => {
      await setIsShowCamera(false);
      const fileToUpload = {
        uri: image?.path,
        name:
          Platform.OS === 'ios'
            ? image?.filename
            : image?.path.split('/').pop(),
        type: image?.mime,
      };
      const data = new FormData();
      data.append('file', fileToUpload);
      await uploadFile(data);
      await updateMeAvatar();
      await setIsGetUser(!isGetUser);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      const fileToUpload = {
        uri: image?.path,
        name:
          Platform.OS === 'ios'
            ? image?.filename
            : image?.path.split('/').pop(),
        type: image?.mime,
      };
      const data = new FormData();
      data.append('file', fileToUpload);
      await uploadFile(data);
      await updateMeAvatar();
      await setIsGetUser(!isGetUser);
    });
  };

  return (
    <View style={[CONTAINER, {paddingTop: insets.top}]}>
      <View style={BODY}>
        <TouchableOpacity onPress={_onGoBack}>
          <BackButtonIcon />
        </TouchableOpacity>
        {resultDataListStudents && resultDataListStudents?.length > 0 && (
          <View style={DROP_DOWN_VIEW}>
            <DropdownComponent
              data={resultDataListStudents}
              style={[
                DROP_DOWN_CONTAINER,
                {
                  width: isTablet()
                    ? orientation === 'PORTRAIT'
                      ? horizontalScale(80)
                      : horizontalScale(80)
                    : horizontalScale(130),
                },
              ]}
              placeholderStyle={PLACE_HOLDER_TEXT}
              placeholder={infoDashboardStudent?.name}
              labelField="label"
              valueField="value"
              iconStyle={{top: verticalScale(3), left: horizontalScale(5)}}
              onChange={item => {
                dispatch(UserActions.setInfoDashboardStudent(item));
              }}
              numberOfLines={1}
              maxHeight={verticalScale(150)}
              renderItem={item => {
                return (
                  <>
                    <View
                      style={[
                        DROP_DOWN_ITEM,
                        {
                          backgroundColor:
                            infoDashboardStudent?.name === item?.label
                              ? color.purple
                              : color.white,
                          height: isTablet()
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? verticalScale(40)
                              : verticalScale(30)
                            : verticalScale(30),
                        },
                      ]}>
                      <Text
                        numberOfLines={1}
                        text={item.label}
                        style={[
                          ITEM_LABEL_TEXT,
                          {
                            color:
                              infoDashboardStudent?.name === item?.label
                                ? color.white
                                : color.gray3,
                          },
                        ]}
                      />
                    </View>
                    <View style={SEPARATE} />
                  </>
                );
              }}
            />
          </View>
        )}

        <View style={RIGHT_VIEW_CONTAINER}>
          <TouchableOpacity
            style={NOTI_VIEW}
            onPress={() => navigation.navigate('notificationDrawer')}>
            <NotificationIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <FastImage source={{uri: userInfo?.me?.avatar}} style={AVATAR} />
          </TouchableOpacity>
          <Modal
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            backdropColor={color.palette.mineShaft}
            backdropOpacity={0}
            animationInTiming={150}
            animationOutTiming={150}
            backdropTransitionOutTiming={0}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={[
              MODAL,
              SHADOWN,
              {
                top: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? verticalScale(-25)
                    : verticalScale(-25)
                  : Platform.OS === 'ios'
                  ? verticalScale(70)
                  : verticalScale(80),
                left: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? orientationOpenApp === 'LANDSCAPE'
                      ? horizontalScale(120)
                      : horizontalScale(200)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? horizontalScale(200)
                    : horizontalScale(330)
                  : horizontalScale(180),
                flex: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? 0.13
                    : 0.2
                  : 0.13,
              },
            ]}
            deviceHeight={2000}
            deviceWidth={isTablet() ? 2000 : 0}
            statusBarTranslucent>
            <TouchableOpacity
              style={BUTTON_COMMON}
              onPress={onShowCameraScreen}>
              <View style={CAMERA_VIEW}>
                <ChangeCameraIcon
                  width={14}
                  height={15}
                  fill={color.purple}
                  props={undefined}
                />
              </View>
              <Text text={'Change my avatar'} style={CAMERA_TEXT} />
            </TouchableOpacity>
            <View style={[SEPARATE, {marginTop: 10, opacity: 0.05}]} />
            <TouchableOpacity
              style={[BUTTON_COMMON, {marginBottom: 10}]}
              onPress={onShowChangePassword}>
              <View style={CAMERA_VIEW}>
                <ChangePasswordIcon
                  fill={color.purple}
                  props={undefined}
                  width={9}
                  height={12}
                />
              </View>
              <Text text={'Change password'} style={CAMERA_TEXT} />
            </TouchableOpacity>
          </Modal>
          <CameraScreen
            isVisibleCameraPopup={isShowCamera}
            onCloseCameraPopup={() => setIsShowCamera(false)}
            chooseImage={chooseImage}
            openCamera={openCamera}
          />
          <ChangePasswordPopup
            isVisible={isVisibleUpdatePassword}
            onClose={onClose}
            onCompletedUpdatePassword={() => {
              setIsVisibleUpdatePassword(false);
            }}
          />
        </View>
      </View>
    </View>
  );
};
const CONTAINER: ViewStyle = {
  top: verticalScale(10),
};
const BODY: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: horizontalScale(10),
};
const DROP_DOWN_VIEW: ViewStyle = {marginLeft: horizontalScale(40)};
const DROP_DOWN_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: isTablet() ? verticalScale(5) : 0,
};
const PLACE_HOLDER_TEXT: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: isTablet() ? moderateScale(12) : moderateScale(16),
  color: color.purple,
};
const DROP_DOWN_ITEM: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};
const ITEM_LABEL_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: isTablet() ? moderateScale(10) : moderateScale(13),
  textAlign: 'center',
  width: horizontalScale(130),
};
const SEPARATE: ViewStyle = {
  height: 1,
  width: '100%',
  backgroundColor: color.black1,
  opacity: 0.1,
  justifyContent: 'center',
  alignItems: 'center',
};
const RIGHT_VIEW_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
const NOTI_VIEW: ViewStyle = {
  top: 2,
};
const CAMERA_VIEW: ViewStyle = {
  width: 30,
  height: 30,
  backgroundColor: color.purple1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 40,
};
const CAMERA_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontSize: isTablet() ? moderateScale(11) : moderateScale(10),
  fontWeight: '400',
  color: color.black1,
};
const BUTTON_COMMON: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: 10,
};
const MODAL: ViewStyle = {
  backgroundColor: color.white,
  width: isTablet() ? horizontalScale(120) : horizontalScale(150),
  right: 0,
  top: 0,
  justifyContent: 'center',
};
const SHADOWN: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};
const AVATAR: any = {
  width: isTablet() ? horizontalScale(20) : 40,
  height: isTablet() ? horizontalScale(20) : 40,
  marginEnd: 20,
  borderRadius: 60,
  marginHorizontal: 20,
};
