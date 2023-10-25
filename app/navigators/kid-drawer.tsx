/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  Platform,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
//
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawerContent} from './components/custom-drawer-content';
//
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
//
import {CameraScreen, PulseAnimation, Text} from '@app/components';
import {
  ChangeCameraIcon,
  ChangePasswordIcon,
  Dashboard,
  LevelCertificateIcon,
  MenuIcon,
  NotificationIcon,
} from '@app/svg';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {LevelCertificate} from '@app/screens';
//
import {ChangePasswordPopup} from '@app/components';
import {useUpdateMeAvatar} from '@app/hook/useUpdateMeAvatar';
//
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import {BottomTabbarKid} from './bottom-tab-kid';
import {useMe, useOrientation, useUploadFile} from '@app/hook';
import {isTablet} from 'react-native-device-info';
import {formatDateHeader} from '@app/utils';
import {useTranslation} from 'react-i18next';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const AVATAR_DEFAULT = require('./images/avatar-default.png');

export type DrawerNavigatorParamList = {
  home: undefined;
  details: undefined;
  parents: any;
  kidTabBar: undefined;
  notification: any;
  levelCertificate: {isFromTabbar: boolean};
  notificationDrawer: any;
};
const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

export function KidDrawer() {
  const {t} = useTranslation();
  const orientation = useOrientation();

  const {userInfo, accessToken} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  // const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isShowCamera, setIsShowCamera] = useState<boolean>(false);
  const [isVisibleUpdatePassword, setIsVisibleUpdatePassword] =
    useState<boolean>(false);
  const [isGetUser, setIsGetUser] = useState<boolean>(false);

  const {uploadFile, fileData} = useUploadFile(accessToken);

  const {updateMeAvatar} = useUpdateMeAvatar(accessToken, fileData);

  const {getMeInfo} = useMe(accessToken) || '';

  useEffect(() => {
    getMeInfo();
  }, [isGetUser]);

  const onShowCameraScreen = () => {
    setTimeout(() => {
      setIsShowCamera(true);
    }, 500);
  };

  const onShowChangePassword = () => {
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
    <>
      <Drawer.Navigator
        useLegacyImplementation={false}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="kidTabBar"
          component={BottomTabbarKid}
          options={({navigation}) => ({
            headerTintColor: color.purple,
            title: 'Dashboard',
            headerTitleAlign: 'center',
            drawerStyle: {
              backgroundColor: color.white,
              width: isTablet() ? horizontalScale(150) : horizontalScale(280),
            },
            headerStyle: {
              backgroundColor: color.white,
              height: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(80)
                  : verticalScale(60)
                : Platform.OS === 'ios'
                ? verticalScale(80)
                : verticalScale(105),
            },
            headerTitleStyle: {
              color: color.black1,
            },
            headerLeft: () => {
              return (
                <>
                  {isTablet() ? (
                    <View
                      style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <MenuIcon />
                      </TouchableOpacity>
                      <Text
                        text={`${t('welcome')} ${userInfo?.me?.name || ''}`}
                        style={[
                          WELCOME_TEXT,
                          {
                            fontSize:
                              orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(16)
                                : moderateScale(14),
                          },
                        ]}
                        numberOfLines={1}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{marginLeft: horizontalScale(10)}}
                      onPress={() => navigation.openDrawer()}>
                      <MenuIcon />
                    </TouchableOpacity>
                  )}
                </>
              );
            },
            headerTitle: () => {
              return (
                <View>
                  {isTablet() ? (
                    ''
                  ) : (
                    <Text
                      text={formatDateHeader(new Date())}
                      style={DATE_TEXT}
                    />
                  )}
                </View>
              );
            },
            headerRight: () => {
              return (
                <View style={CONTAINER_VIEW}>
                  <TouchableOpacity
                    style={NOTI_VIEW}
                    onPress={() => navigation.navigate('notificationDrawer')}>
                    <NotificationIcon />
                  </TouchableOpacity>
                  <Menu>
                    <MenuTrigger
                      customStyles={{
                        TriggerTouchableComponent: TouchableOpacity,
                      }}>
                      <FastImage
                        source={
                          userInfo?.me?.avatar
                            ? {uri: userInfo?.me?.avatar}
                            : AVATAR_DEFAULT
                        }
                        style={[
                          AVATAR,
                          {
                            width: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? horizontalScale(16)
                                : horizontalScale(20)
                              : 40,
                            height: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? horizontalScale(16)
                                : horizontalScale(20)
                              : 40,
                          },
                        ]}
                      />
                      <View style={PLUSE_VIEW}>
                        <PulseAnimation />
                      </View>
                    </MenuTrigger>
                    <MenuOptions
                      optionsContainerStyle={{
                        marginRight: isTablet()
                          ? orientation === 'PORTRAIT'
                            ? horizontalScale(10)
                            : horizontalScale(-20)
                          : horizontalScale(40),
                        marginTop: verticalScale(40),
                        width: isTablet()
                          ? horizontalScale(100)
                          : horizontalScale(170),
                      }}>
                      <View style={[SEPARATE, {opacity: 0.05}]} />
                      <MenuOption onSelect={onShowCameraScreen}>
                        <View style={DIRECTION}>
                          <View style={CAMERA_VIEW}>
                            <ChangeCameraIcon
                              width={14}
                              height={15}
                              fill={color.purple}
                              props={undefined}
                            />
                          </View>
                          <Text
                            text={'Change my avatar'}
                            style={[
                              CAMERA_TEXT,
                              {
                                fontSize: isTablet()
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? moderateScale(8)
                                    : moderateScale(9)
                                  : moderateScale(12),
                              },
                            ]}
                          />
                        </View>
                      </MenuOption>
                      <View style={[SEPARATE, {opacity: 0.05}]} />
                      <MenuOption onSelect={onShowChangePassword}>
                        <View style={DIRECTION}>
                          <View style={CAMERA_VIEW}>
                            <ChangePasswordIcon
                              fill={color.purple}
                              props={undefined}
                              width={9}
                              height={12}
                            />
                          </View>
                          <Text
                            text={'Change password'}
                            style={[
                              CAMERA_TEXT,
                              {
                                fontSize: isTablet()
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? moderateScale(8)
                                    : moderateScale(9)
                                  : moderateScale(12),
                              },
                            ]}
                          />
                        </View>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              );
            },
            drawerIcon: ({focused}) => (
              <Dashboard
                fill={focused ? color.primary : color.gray3}
                props={undefined}
              />
            ),
            drawerActiveTintColor: color.primary,
            drawerInactiveTintColor: color.gray3,
            drawerLabelStyle: {
              fontSize: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(10)
                  : moderateScale(12)
                : 16,
              fontFamily: typography.promptRegular,
              fontWeight: '400',
            },
          })}
        />
        <Drawer.Screen
          name="levelCertificate"
          component={LevelCertificate}
          options={({navigation}) => ({
            title: 'Level Certifications',
            headerTitleAlign: 'center',
            drawerStyle: {
              backgroundColor: color.white,
              width: isTablet() ? horizontalScale(150) : horizontalScale(280),
            },
            headerStyle: {
              backgroundColor: color.white,
              height: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(80)
                  : verticalScale(60)
                : Platform.OS === 'ios'
                ? verticalScale(80)
                : verticalScale(105),
            },
            headerTitleStyle: {
              color: color.black1,
            },
            headerTintColor: color.purple,
            headerLeft: () => {
              return (
                <TouchableOpacity
                  style={{marginLeft: horizontalScale(10)}}
                  onPress={() => navigation.openDrawer()}>
                  <MenuIcon />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                <View style={CONTAINER_VIEW}>
                  <TouchableOpacity
                    style={NOTI_VIEW}
                    onPress={() => navigation.navigate('notificationDrawer')}>
                    <NotificationIcon />
                  </TouchableOpacity>
                  <Menu>
                    <MenuTrigger
                      customStyles={{
                        TriggerTouchableComponent: TouchableOpacity,
                      }}>
                      <FastImage
                        source={
                          userInfo?.me?.avatar
                            ? {uri: userInfo?.me?.avatar}
                            : AVATAR_DEFAULT
                        }
                        style={[
                          AVATAR,
                          {
                            width: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? horizontalScale(16)
                                : horizontalScale(20)
                              : 40,
                            height: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? horizontalScale(16)
                                : horizontalScale(20)
                              : 40,
                          },
                        ]}
                      />
                      <View style={PLUSE_VIEW}>
                        <PulseAnimation />
                      </View>
                    </MenuTrigger>
                    <MenuOptions
                      optionsContainerStyle={{
                        marginRight: isTablet()
                          ? orientation === 'PORTRAIT'
                            ? horizontalScale(10)
                            : horizontalScale(-20)
                          : horizontalScale(40),
                        marginTop: verticalScale(40),
                        width: isTablet()
                          ? horizontalScale(100)
                          : horizontalScale(170),
                      }}>
                      <View style={[SEPARATE, {opacity: 0.05}]} />
                      <MenuOption onSelect={onShowCameraScreen}>
                        <View style={DIRECTION}>
                          <View style={CAMERA_VIEW}>
                            <ChangeCameraIcon
                              width={14}
                              height={15}
                              fill={color.purple}
                              props={undefined}
                            />
                          </View>
                          <Text
                            text={'Change my avatar'}
                            style={[
                              CAMERA_TEXT,
                              {
                                fontSize: isTablet()
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? moderateScale(8)
                                    : moderateScale(9)
                                  : moderateScale(12),
                              },
                            ]}
                          />
                        </View>
                      </MenuOption>
                      <View style={[SEPARATE, {opacity: 0.05}]} />
                      <MenuOption onSelect={onShowChangePassword}>
                        <View style={DIRECTION}>
                          <View style={CAMERA_VIEW}>
                            <ChangePasswordIcon
                              fill={color.purple}
                              props={undefined}
                              width={9}
                              height={12}
                            />
                          </View>
                          <Text
                            text={'Change password'}
                            style={[
                              CAMERA_TEXT,
                              {
                                fontSize: isTablet()
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? moderateScale(8)
                                    : moderateScale(9)
                                  : moderateScale(12),
                              },
                            ]}
                          />
                        </View>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              );
            },
            drawerIcon: ({focused}) => (
              <LevelCertificateIcon
                fill={focused ? color.primary : color.gray3}
                props={undefined}
              />
            ),
            drawerActiveTintColor: color.primary,
            drawerInactiveTintColor: color.gray3,
            drawerLabelStyle: {
              fontSize: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(10)
                  : moderateScale(12)
                : 16,
              fontFamily: typography.promptRegular,
              fontWeight: '400',
              marginLeft: 6,
            },
          })}
        />
      </Drawer.Navigator>
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
    </>
  );
}

const CONTAINER_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 5,
};
const NOTI_VIEW: ViewStyle = {
  top: 2,
};
const AVATAR: any = {
  width: isTablet() ? horizontalScale(20) : 40,
  height: isTablet() ? horizontalScale(20) : 40,
  marginEnd: 20,
  borderRadius: 60,
  marginHorizontal: 20,
};
const PLUSE_VIEW: ViewStyle = {
  left: isTablet() ? horizontalScale(5) : horizontalScale(10),
  bottom: verticalScale(2),
};
const DIRECTION: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
};
const SEPARATE: ViewStyle = {
  height: 2,
  width: '100%',
  backgroundColor: color.black1,
  opacity: 0.2,
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
  fontWeight: '400',
  color: color.black1,
};
const DATE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(12),
  color: color.gray3,
};
const WELCOME_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(22),
  marginLeft: 15,
  fontWeight: '700',
  width: '100%',
};
