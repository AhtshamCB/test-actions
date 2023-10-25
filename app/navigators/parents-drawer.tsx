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
import {BottomTabbarParent} from './bottom-tab-parents';
import {CustomDrawerContent} from './components/custom-drawer-content';
//
import {useDispatch, useSelector} from 'react-redux';
import {selector, UserActions} from '@app/redux';
//
import {useKids, useMe, useOrientation, useUploadFile} from '@app/hook';
import {CameraScreen, Text, DropdownComponent} from '@app/components';
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
import {isTablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {PulseAnimation} from '@app/components/pulse-animation/pulse-animation';

const AVATAR_DEFAULT = require('./images/avatar-default.png');

export type DrawerNavigatorParamList = {
  parentTabBar: undefined;
  notification: any;
  levelCertificate: any | undefined;
  notificationDrawer: any;
};
const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();
export function ParentDrawer() {
  const dispatch = useDispatch();
  const orientation = useOrientation();
  const {t} = useTranslation();
  const {userInfo, accessToken, activeKidInfo} = useSelector(selector.user);
  const {orientationOpenApp} = useSelector(selector.config);

  const [childIds, setChildIds] = useState<any>();
  const [isShowCamera, setIsShowCamera] = useState<boolean>(false);
  const [isVisibleUpdatePassword, setIsVisibleUpdatePassword] =
    useState<boolean>(false);
  const [isGetUser, setIsGetUser] = useState<boolean>(false);

  const {uploadFile, fileData} = useUploadFile(accessToken);

  const {updateMeAvatar} = useUpdateMeAvatar(accessToken, fileData);

  const {changeWatchingKid} = useKids(accessToken, childIds);

  const {getMeInfo} = useMe(accessToken) || '';

  useEffect(() => {
    getMeInfo();
  }, [isGetUser]);

  const activeName = activeKidInfo?.childs?.find(
    item => item.name === activeKidInfo?.activeFor?.info?.name,
  );

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

  const resultKid = activeKidInfo?.childs?.map(item => {
    return {
      label: item?.name,
      value: item?._id,
    };
  });

  return (
    <>
      <Drawer.Navigator
        useLegacyImplementation={false}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="parentTabBar"
          component={BottomTabbarParent}
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
                        width: '100%',
                      }}>
                      <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <MenuIcon />
                      </TouchableOpacity>
                      <Text
                        text={`${t('welcome')} ${
                          userInfo?.me?.firstName || ''
                        }`}
                        style={[
                          WELCOME_TEXT,
                          {
                            fontSize:
                              orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(14)
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
                <>
                  {activeKidInfo?.childs?.length > 0 && !isTablet() && (
                    <DropdownComponent
                      data={resultKid}
                      style={DROP_DOWN_CONTAINER}
                      placeholderStyle={[
                        PLACE_HOLDER_TEXT,
                        {
                          fontFamily: typography.promptBold,
                          fontWeight: '700',
                          fontSize: moderateScale(16),
                          color: color.purple,
                        },
                      ]}
                      placeholder={activeKidInfo?.activeFor?.info?.name}
                      labelField="label"
                      valueField="value"
                      onChange={async item => {
                        await setChildIds(item?.value);
                        await changeWatchingKid();
                        dispatch(UserActions.setChildId(item?.value));
                      }}
                      numberOfLines={1}
                      renderItem={item => {
                        return (
                          <>
                            <View
                              style={[
                                DROP_DOWN_ITEM,
                                {
                                  backgroundColor:
                                    activeName?.name === item?.label
                                      ? color.purple
                                      : color.white,
                                },
                              ]}>
                              <Text
                                numberOfLines={1}
                                text={item.label}
                                style={[
                                  ITEM_LABEL_TEXT,
                                  {
                                    color:
                                      activeName?.name === item?.label
                                        ? color.white
                                        : color.purple,
                                    fontSize: moderateScale(12),
                                  },
                                ]}
                              />
                            </View>
                            <View
                              style={[
                                SEPARATE,
                                {
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                },
                              ]}
                            />
                          </>
                        );
                      }}
                    />
                  )}
                </>
              );
            },
            title: `${t('dashboard')}`,
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
                ? verticalScale(85)
                : verticalScale(105),
            },
            headerRight: () => {
              return (
                <View style={CONTAINER_VIEW}>
                  {isTablet() && (
                    <View>
                      {activeKidInfo?.childs?.length > 0 && (
                        <DropdownComponent
                          data={resultKid}
                          style={[
                            DROP_DOWN_CONTAINER,
                            {
                              borderWidth: 1,
                              borderRadius: 20,
                              borderColor: color.dark5,
                              height:
                                orientationOpenApp === 'LANDSCAPE'
                                  ? verticalScale(40)
                                  : verticalScale(30),
                            },
                          ]}
                          placeholderStyle={[
                            PLACE_HOLDER_TEXT,
                            {
                              textAlign: 'left',
                              marginHorizontal: horizontalScale(10),
                              fontSize:
                                orientationOpenApp === 'LANDSCAPE'
                                  ? moderateScale(8)
                                  : moderateScale(10),
                            },
                          ]}
                          numberOfLines={1}
                          placeholder={activeKidInfo?.activeFor?.info?.name}
                          labelField="label"
                          valueField="value"
                          onChange={async item => {
                            await setChildIds(item?.value);
                            await changeWatchingKid();
                            dispatch(UserActions.setChildId(item?.value));
                          }}
                          renderItem={item => {
                            return (
                              <>
                                <View
                                  style={[
                                    DROP_DOWN_ITEM,
                                    {
                                      backgroundColor:
                                        activeName?.name === item?.label
                                          ? color.purple
                                          : color.white,
                                      height: isTablet()
                                        ? orientationOpenApp === 'LANDSCAPE'
                                          ? verticalScale(40)
                                          : verticalScale(30)
                                        : verticalScale(40),
                                    },
                                  ]}>
                                  <Text
                                    text={item.label}
                                    style={[
                                      ITEM_LABEL_TEXT,
                                      {
                                        color:
                                          activeName?.name === item?.label
                                            ? color.white
                                            : color.gray8,
                                        fontSize:
                                          orientationOpenApp === 'LANDSCAPE'
                                            ? moderateScale(8)
                                            : moderateScale(10),
                                      },
                                    ]}
                                  />
                                </View>
                                <View
                                  style={[
                                    SEPARATE,
                                    {
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    },
                                  ]}
                                />
                              </>
                            );
                          }}
                        />
                      )}
                    </View>
                  )}
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
            title: `${t('level_certifications')}`,
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
                ? verticalScale(85)
                : verticalScale(105),
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
                        text={`${t('level_certifications')}`}
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
                <>
                  {activeKidInfo?.childs?.length > 0 && !isTablet() && (
                    <DropdownComponent
                      data={resultKid}
                      style={DROP_DOWN_CONTAINER}
                      placeholderStyle={[
                        PLACE_HOLDER_TEXT,
                        {
                          fontFamily: typography.promptBold,
                          fontWeight: '700',
                          fontSize: moderateScale(16),
                          color: color.purple,
                        },
                      ]}
                      placeholder={activeKidInfo?.activeFor?.info?.name}
                      labelField="label"
                      valueField="value"
                      onChange={async item => {
                        await setChildIds(item?.value);
                        await changeWatchingKid();
                        dispatch(UserActions.setChildId(item?.value));
                      }}
                      numberOfLines={1}
                      renderItem={item => {
                        return (
                          <>
                            <View
                              style={[
                                DROP_DOWN_ITEM,
                                {
                                  backgroundColor:
                                    activeName?.name === item?.label
                                      ? color.purple
                                      : color.white,
                                },
                              ]}>
                              <Text
                                numberOfLines={1}
                                text={item.label}
                                style={[
                                  ITEM_LABEL_TEXT,
                                  {
                                    color:
                                      activeName?.name === item?.label
                                        ? color.white
                                        : color.purple,
                                    fontSize: moderateScale(12),
                                  },
                                ]}
                              />
                            </View>
                            <View
                              style={[
                                SEPARATE,
                                {
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                },
                              ]}
                            />
                          </>
                        );
                      }}
                    />
                  )}
                </>
              );
            },
            headerRight: () => {
              return (
                <View style={CONTAINER_VIEW}>
                  {isTablet() && (
                    <View>
                      {activeKidInfo?.childs?.length > 0 && (
                        <DropdownComponent
                          data={resultKid}
                          style={[
                            DROP_DOWN_CONTAINER,
                            {
                              borderWidth: 1,
                              borderRadius: 20,
                              borderColor: color.dark5,
                              height:
                                orientationOpenApp === 'LANDSCAPE'
                                  ? verticalScale(40)
                                  : verticalScale(30),
                            },
                          ]}
                          placeholderStyle={[
                            PLACE_HOLDER_TEXT,
                            {
                              textAlign: 'left',
                              marginHorizontal: horizontalScale(10),
                              fontSize:
                                orientationOpenApp === 'LANDSCAPE'
                                  ? moderateScale(8)
                                  : moderateScale(10),
                            },
                          ]}
                          numberOfLines={1}
                          placeholder={activeKidInfo?.activeFor?.info?.name}
                          labelField="label"
                          valueField="value"
                          onChange={async item => {
                            await setChildIds(item?.value);
                            await changeWatchingKid();
                            dispatch(UserActions.setChildId(item?.value));
                          }}
                          renderItem={item => {
                            return (
                              <>
                                <View
                                  style={[
                                    DROP_DOWN_ITEM,
                                    {
                                      backgroundColor:
                                        activeName?.name === item?.label
                                          ? color.purple
                                          : color.white,
                                      height: isTablet()
                                        ? orientationOpenApp === 'LANDSCAPE'
                                          ? verticalScale(40)
                                          : verticalScale(30)
                                        : verticalScale(40),
                                    },
                                  ]}>
                                  <Text
                                    text={item.label}
                                    style={[
                                      ITEM_LABEL_TEXT,
                                      {
                                        color:
                                          activeName?.name === item?.label
                                            ? color.white
                                            : color.gray8,
                                        fontSize:
                                          orientationOpenApp === 'LANDSCAPE'
                                            ? moderateScale(8)
                                            : moderateScale(10),
                                      },
                                    ]}
                                  />
                                </View>
                                <View
                                  style={[
                                    SEPARATE,
                                    {
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    },
                                  ]}
                                />
                              </>
                            );
                          }}
                        />
                      )}
                    </View>
                  )}
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
  left: horizontalScale(5),
  marginHorizontal: horizontalScale(5),
};
const DIRECTION: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
};
const DROP_DOWN_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: isTablet() ? verticalScale(5) : 0,
};
const PLACE_HOLDER_TEXT: TextStyle = {
  textAlign: 'center',
  fontFamily: typography.promptRegular,
  fontWeight: '400',
};
const DROP_DOWN_ITEM: ViewStyle = {
  height: isTablet() ? verticalScale(30) : verticalScale(40),
  alignItems: 'center',
  justifyContent: 'center',
};
const ITEM_LABEL_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  fontSize: isTablet() ? moderateScale(10) : 16,
  textAlign: 'center',
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
const WELCOME_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: moderateScale(22),
  marginLeft: 15,
  fontWeight: '700',
  flex: 1,
};
