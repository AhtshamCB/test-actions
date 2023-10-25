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
import {useMe, useOrientation, useUploadFile} from '@app/hook';
import {CameraScreen, PulseAnimation, Text} from '@app/components';
import {
  ChangeCameraIcon,
  ChangePasswordIcon,
  ClassesIcon,
  Dashboard,
  MenuIcon,
  NotificationIcon,
  StudentsIcon,
} from '@app/svg';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';
import {ManageStudents, ManageClasses} from '@app/screens';
//
import {ChangePasswordPopup} from '@app/components';
import {useUpdateMeAvatar} from '@app/hook/useUpdateMeAvatar';
//
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import {isTablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {BottomTabbarSchool} from './bottom-tab-school';
import {formatDateHeader} from '@app/utils';
import {BottomTabbarClass} from './bottom-tabbar-class';
import {TYPE} from '@app/utils/contants';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const AVATAR_DEFAULT = require('./images/avatar-default.png');

export type DrawerNavigatorParamList = {
  schoolTabBar: undefined;
  notification: any;
  manageStudents: undefined;
  notificationDrawer: any;
  manageClasses: any;
};
const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();
export function SchoolDrawer() {
  const {t} = useTranslation();
  const orientation = useOrientation();
  const {userInfo, accessToken} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);
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

  const schoolName = userInfo?.me?.school?.schoolName || '';
  const gradeName = userInfo?.me?.grade?.gradeName || '';

  const renderName = role => {
    switch (role) {
      case 'school': {
        return schoolName;
      }
      case 'grade': {
        return gradeName;
      }
    }
  };

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
          name="schoolTabBar"
          component={
            userInfo?.me?.role === 'school'
              ? BottomTabbarSchool
              : BottomTabbarClass
          }
          options={({navigation}) => ({
            headerTintColor: color.purple,
            headerLeft: () => {
              return (
                <>
                  {isTablet() ? (
                    <View
                      style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: horizontalScale(300),
                      }}>
                      <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <MenuIcon />
                      </TouchableOpacity>
                      <Text
                        text={`${t('welcome')} ${renderName(
                          userInfo?.me?.role,
                        )}!`}
                        style={[
                          WELCOME_TEXT,
                          {
                            fontSize:
                              orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(12)
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
            title: 'Dashboard',
            headerTitleAlign: 'center',
            drawerStyle: {
              backgroundColor: color.white,
              width: isTablet() ? horizontalScale(150) : horizontalScale(280),
            },
            headerStyle: {
              height: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(90)
                  : verticalScale(60)
                : Platform.OS === 'ios'
                ? userInfo?.me?.role === TYPE.SCHOOL
                  ? verticalScale(85)
                  : verticalScale(80)
                : verticalScale(115),
              backgroundColor: color.white,
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
                      {userInfo?.me?.role === TYPE.SCHOOL && (
                        <>
                          <MenuOption>
                            <View style={BUTTON_COMMON}>
                              <Text
                                text={`${userInfo?.me?.firstName.toUpperCase()} ${userInfo?.me?.lastName.toUpperCase()}`}
                                numberOfLines={1}
                                style={{
                                  fontFamily: typography.promptBold,
                                  fontWeight: '700',
                                  color: color.purple,
                                  fontSize:
                                    orientationOpenApp === 'LANDSCAPE'
                                      ? moderateScale(10)
                                      : moderateScale(12),
                                }}
                              />
                            </View>
                          </MenuOption>
                          <View style={[SEPARATE, {opacity: 0.05}]} />
                        </>
                      )}
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
        {userInfo?.me?.role === 'school' && (
          <Drawer.Screen
            name="manageClasses"
            component={ManageClasses}
            options={({navigation}) => ({
              title: `${t('classes')}`,
              headerTitleAlign: 'center',
              drawerStyle: {
                backgroundColor: color.white,
                width: isTablet() ? horizontalScale(150) : horizontalScale(280),
              },
              headerStyle: {
                height: isTablet()
                  ? orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(90)
                    : verticalScale(60)
                  : Platform.OS === 'ios'
                  ? userInfo?.me?.role === TYPE.SCHOOL
                    ? verticalScale(85)
                    : verticalScale(80)
                  : verticalScale(115),
                backgroundColor: color.white,
              },
              headerTitleStyle: {
                color: color.black1,
              },
              headerTintColor: color.purple,
              headerLeft: () => {
                return (
                  <>
                    <View
                      style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <MenuIcon />
                      </TouchableOpacity>
                      {isTablet() && (
                        <Text
                          text={`${t('classes')}`}
                          style={[
                            WELCOME_TEXT,
                            {
                              fontSize:
                                orientationOpenApp === 'LANDSCAPE'
                                  ? moderateScale(12)
                                  : moderateScale(14),
                            },
                          ]}
                        />
                      )}
                    </View>
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
                        {userInfo?.me?.role === TYPE.SCHOOL && (
                          <>
                            <MenuOption>
                              <View style={BUTTON_COMMON}>
                                <Text
                                  text={`${userInfo?.me?.firstName.toUpperCase()} ${userInfo?.me?.lastName.toUpperCase()}`}
                                  numberOfLines={1}
                                  style={{
                                    fontFamily: typography.promptBold,
                                    fontWeight: '700',
                                    color: color.purple,
                                    fontSize:
                                      orientationOpenApp === 'LANDSCAPE'
                                        ? moderateScale(10)
                                        : moderateScale(12),
                                  }}
                                />
                              </View>
                            </MenuOption>
                            <View style={[SEPARATE, {opacity: 0.05}]} />
                          </>
                        )}
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
                <StudentsIcon
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
        )}
        <Drawer.Screen
          name="manageStudents"
          component={ManageStudents}
          options={({navigation}) => ({
            title: `${t('students')}`,
            headerTitleAlign: 'center',
            drawerStyle: {
              backgroundColor: color.white,
              width: isTablet() ? horizontalScale(150) : horizontalScale(280),
            },
            headerStyle: {
              height: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? verticalScale(90)
                  : verticalScale(60)
                : Platform.OS === 'ios'
                ? userInfo?.me?.role === TYPE.SCHOOL
                  ? verticalScale(85)
                  : verticalScale(80)
                : verticalScale(115),
              backgroundColor: color.white,
            },
            headerTitleStyle: {
              color: color.black1,
            },
            headerTintColor: color.purple,
            headerLeft: () => {
              return (
                <>
                  <View
                    style={{
                      marginLeft: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                      <MenuIcon />
                    </TouchableOpacity>
                    {isTablet() && (
                      <Text
                        text={`${t('students')}`}
                        style={[
                          WELCOME_TEXT,
                          {
                            fontSize:
                              orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(12)
                                : moderateScale(14),
                          },
                        ]}
                      />
                    )}
                  </View>
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
                      {userInfo?.me?.role === TYPE.SCHOOL && (
                        <>
                          <MenuOption>
                            <View style={BUTTON_COMMON}>
                              <Text
                                text={`${userInfo?.me?.firstName.toUpperCase()} ${userInfo?.me?.lastName.toUpperCase()}`}
                                numberOfLines={1}
                                style={{
                                  fontFamily: typography.promptBold,
                                  fontWeight: '700',
                                  color: color.purple,
                                  fontSize:
                                    orientationOpenApp === 'LANDSCAPE'
                                      ? moderateScale(10)
                                      : moderateScale(12),
                                }}
                              />
                            </View>
                          </MenuOption>
                          <View style={[SEPARATE, {opacity: 0.05}]} />
                        </>
                      )}
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
              <ClassesIcon fill={focused ? color.primary : color.gray3} />
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
const WELCOME_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  marginLeft: 15,
  fontWeight: '700',
  flex: 1,
};
const DATE_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: moderateScale(12),
  color: color.gray3,
};
