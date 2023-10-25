/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Platform, useColorScheme, View, ViewStyle} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast, {SuccessToast, ErrorToast} from 'react-native-toast-message';

import RNBootSplash from 'react-native-bootsplash';
import {navigate, navigationRef} from './navigation-utilities';
//
import {
  OnBoarding1,
  OnBoarding2,
  OnBoarding3,
  OnBoarding4,
  Login,
  CreateAccount,
  EmailVerification,
  CreateName,
  Test,
  ResetPasswordWithEmail,
  ResetWithNewPassword,
  Payment,
  TeacherUsername,
  ListKidsOfTeacher,
  SubscriptionPlan,
  AccountSettings,
  Invoices,
  NotificationDrawer,
  ManageKids,
  AddKids,
  AddCard,
  PDFScreen,
  LevelLessonsDetail,
  LessonDetail,
  NotificationMessageDetail,
  Instruction,
  TermsAndPrivacy,
  //EDUCATORS
  LoginEducator,
  SignUpSuccess,
  Classes,
  Students,
  SignUpSchool,
  SetPasswordRegionSchool,
  RegisterSchoolInfo,
  ManageClasses,
  ManageStudents,
  AccountSchoolSettings,
  StudentsDetail,
  ViewStudentDashboard,
  FinalTestLesson,
  GameDetails,
} from '../screens';
import {ApolloProvider, useLazyQuery} from '@apollo/client';
import client from '@app/apollo/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {ConfigActions, RootState, selector, UserActions} from '@app/redux';
import messaging from '@react-native-firebase/messaging';
import {UserState} from '@app/redux/user-redux';
import {ParentDrawer} from './parents-drawer';
import {KidDrawer} from './kid-drawer';
import {SchoolDrawer} from './school-drawer';
import {MeInfo} from '@app/models';
import {ME_QUERY} from '@app/apollo/query';
import {DisconnectLabel} from '@app/components';
import notifee, {EventType} from '@notifee/react-native';
import DeviceInfo, {isTablet} from 'react-native-device-info';
import {useLogout, useOrientation} from '@app/hook';
import {useGetSystemSettings} from '@app/hook';
import {TYPE} from '@app/utils/contants';
import {MenuProvider} from 'react-native-popup-menu';
import {useTranslation} from 'react-i18next';

export type NavigatorParamList = {
  //
  home: any;
  kidHome: any;
  schoolHome: any;
  parentDrawer: undefined;
  kidDrawer: undefined;
  schoolDrawer: undefined;
  details: any;
  login: undefined;
  onboarding: undefined;
  onboarding1: undefined;
  onboarding2: undefined;
  onboarding3: undefined;
  onboarding4: undefined;
  createAccount: undefined;
  emailVerification: {
    data?: any;
    isResetPasswordScreen?: boolean;
    isSchoolRegisterScreen?: boolean;
    isFromSchool?: boolean;
  };
  createName: {dataSignUp?: any; otp?: string};
  test: {fileUrl?: any};
  resetPasswordWithEmail: {isFromSchool?: boolean};
  resetWithNewPassword: {data: any; code?: string; isFromSchool?: boolean};
  payment: {data: any; accessToken: any};
  teacherUsername: undefined;
  listKidsOfTeacher: undefined;
  landingPage: undefined;
  common: any;
  parents: any;
  subscriptionPlan: {isFromTabbar?: boolean; isFromSchool?: boolean};
  plans: any;
  leaderboard: any;
  buildMyWorld: any;
  levelCertificate: {isFromTabbar?: boolean | undefined};
  accountSettings: any;
  levelLessonsDetail: {
    level: string;
    studentId: string;
    isFromTeacherScreen?: boolean;
  };
  invoices: undefined;
  notificationDrawer: {isFromTabbar?: boolean};
  manageKids: {isFromTabbar?: boolean; isFromSignup?: boolean};
  settings: any;
  buildFinancialFreedom: any;
  addKids: undefined;
  addCard: undefined;
  pdfScreen: {fileUrl?: any};
  lessonDetail: {level: any; lessonId: any};
  myMoney: undefined;
  notificationMessageDetail: {data?: any; notificationId?: any};
  instruction: undefined;
  termsAndPrivacy: undefined;
  signUpSuccess: undefined;
  //EDUCATOR
  loginEducator: undefined;
  registerYourSchool: undefined;
  signUpEducator: undefined;
  classes: undefined;
  students: undefined;
  signUpSchool: undefined;
  setPasswordRegionSchool: {dataPassword?: any; dataPrev?: any};
  registerSchoolInfo: {
    dataEmailAndCode?: any;
    dataPassword?: any;
    country?: string;
  };
  manageClasses: {isFromTabbar?: boolean};
  manageStudents: {gradeIdDetail?: string; isFromTabbar?: boolean};
  leaderboardSchool: undefined;
  schoolSettings: any;
  accountSchoolSettings: any;
  studentsDetail: {gradeIdDetail?: string; gradeName?: string};
  viewStudentDashboard: undefined;
  finalTestLesson: {levelId: string};
  gameDetails: {sourceGame: string};
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const [isLogin, setIsLogin] = useState<any>();
  const [token, setToken] = useState<any>();
  const [isFinishOnboarding, setIsFinishOnboarding] = useState<any>();
  const [appReady, setAppReady] = useState(false);
  const {isLoggedIn, userInfo} = useSelector<RootState>(
    state => state.user,
  ) as UserState;
  const {orientation, orientationGame} = useSelector(selector.config);

  const orientationOpenAppFirst = useOrientation();
  const {getSystemSettings} = useGetSystemSettings();

  useEffect(() => {
    (async () => {
      // ask for notification permission
      await notifee.requestPermission();
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const request = async () => {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
    const tokenFCM = await messaging().getToken();
    dispatch(UserActions.setPushToken(tokenFCM));
  };

  useEffect(() => {
    (async () => {
      await request();
      await getSystemSettings();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const isLogged = await AsyncStorage.getItem('isLogin');
        const tokenUser = await AsyncStorage.getItem('userToken');
        const isFinishedOnBoarding = await AsyncStorage.getItem(
          'isFinishOnboarding',
        );
        setIsFinishOnboarding(isFinishedOnBoarding);
        setIsLogin(isLogged);
        setToken(tokenUser);
        if (!isLogged) {
          return;
        }
      } catch (e) {
        console.log('e', e);
      } finally {
        setAppReady(true);
        dispatch(UserActions.setAndroidDeviceId(DeviceInfo.getDeviceId()));
        DeviceInfo.syncUniqueId().then(iOSId => {
          dispatch(UserActions.setIosDeviceId(iOSId));
        });
        dispatch(UserActions.setIsLoggedIn(isLogin));
      }
    })();
  }, []);

  useEffect(() => {
    if (token) {
      getMe();
    }
  }, [token]);

  const {logout} = useLogout(token);

  const [getMe] = useLazyQuery<MeInfo>(ME_QUERY, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: token,
        lang: i18n.language,
      },
    },
    async onCompleted(data) {
      dispatch(UserActions.setToken(token, ''));
      dispatch(UserActions.setUserInfo(data));
    },
    async onError(err) {
      if (err) {
        await logout();
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (Platform.OS === 'android') {
          await AsyncStorage.clear();
          await AsyncStorage.setItem(
            'isFinishOnboarding',
            JSON.stringify(true),
          );
        } else {
          await AsyncStorage.multiRemove(asyncStorageKeys);
          await AsyncStorage.setItem(
            'isFinishOnboarding',
            JSON.stringify(true),
          );
        }
        dispatch(UserActions.signOut());
        if (userInfo?.me?.role === 'parent' || userInfo?.me?.role === 'kid') {
          navigation.replace('login');
        } else {
          navigation.replace('loginEducator');
        }
      }
    },
  });

  /** Handle Firebase Remote Message */
  useEffect(() => {
    // messaging().onNotificationOpenedApp((remoteMessage) => {})

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        const {data, notification} = remoteMessage || {};
        _handlePressNotification({data, ...notification});
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      _onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  /** Handle press notifcation when App in Forceground */
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      const {notification} = detail;
      switch (type) {
        case EventType.PRESS:
          _handlePressNotification(notification);
          break;
      }
    });
  }, []);

  async function _onDisplayNotification(remoteMessage) {
    const {data, notification} = remoteMessage || {};
    let channelName = 'defaultChannel';
    const channelNew = await notifee.createChannel({
      id: channelName,
      name: 'channelIdNew Channel',
    });
    await notifee.displayNotification({
      title: notification?.title,
      body: notification?.body,
      data,
      android: {
        channelId: channelNew,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const _handlePressNotification = async remoteMessage => {
    if (!remoteMessage) {
      return;
    }
    const {data} = remoteMessage || {};
    console.log('data', data);
    const {notiType, _id} = data || {};
    console.log('notiType', notiType);
    if (data) {
      if (_id) {
        if (notiType === 'standard') {
          navigate('notificationMessageDetail', {notificationId: _id});
        }
      }
    }
  };

  useEffect(() => {
    if (appReady) {
      setTimeout(() => {
        RNBootSplash.hide();
      }, 500);
      if (orientationOpenAppFirst === 'LANDSCAPE') {
        dispatch(ConfigActions.setOrientationOpenApp('LANDSCAPE'));
      }
      dispatch(UserActions.setIsLoggedIn(isLogin));
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'android' ? 'fade' : 'default',
        fullScreenGestureEnabled: true,
      }}
      // initialRouteName={isLoggedIn ? ('parentDrawer') : 'onboarding1'}
    >
      {isLoggedIn ? (
        <Stack.Group>
          {(() => {
            switch (userInfo?.me?.role) {
              case TYPE.PARENT:
                return (
                  <Stack.Screen
                    name="parentDrawer"
                    component={ParentDrawer}
                    options={{
                      orientation: isTablet() ? 'default' : 'portrait',
                    }}
                  />
                );
              case TYPE.SCHOOL:
                return (
                  <Stack.Screen
                    name="schoolDrawer"
                    component={SchoolDrawer}
                    options={{
                      orientation: isTablet() ? 'default' : 'portrait',
                    }}
                  />
                );
              case TYPE.GRADE:
                return (
                  <Stack.Screen
                    name="schoolDrawer"
                    component={SchoolDrawer}
                    options={{
                      orientation: isTablet() ? 'default' : 'portrait',
                    }}
                  />
                );
              default:
                return (
                  <Stack.Screen
                    name="kidDrawer"
                    component={KidDrawer}
                    options={{orientation: isTablet() ? 'default' : 'portrait'}}
                  />
                );
            }
          })()}

          <Stack.Screen
            name="payment"
            component={Payment}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="addCard"
            component={AddCard}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="levelLessonsDetail"
            component={LevelLessonsDetail}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="accountSettings"
            component={AccountSettings}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="subscriptionPlan"
            component={SubscriptionPlan}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="invoices"
            component={Invoices}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="notificationDrawer"
            component={NotificationDrawer}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="manageKids"
            component={ManageKids}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="addKids"
            component={AddKids}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen name="test" component={Test} />
          <Stack.Screen
            name="pdfScreen"
            component={PDFScreen}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="lessonDetail"
            component={LessonDetail}
            options={{orientation: isTablet() ? orientationGame : orientation}}
          />
          <Stack.Screen
            name="notificationMessageDetail"
            component={NotificationMessageDetail}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="instruction"
            component={Instruction}
            options={{orientation: 'all'}}
          />
          <Stack.Screen
            name="termsAndPrivacy"
            component={TermsAndPrivacy}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="classes"
            component={Classes}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="students"
            component={Students}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="manageClasses"
            component={ManageClasses}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="manageStudents"
            component={ManageStudents}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="studentsDetail"
            component={StudentsDetail}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="accountSchoolSettings"
            component={AccountSchoolSettings}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="viewStudentDashboard"
            component={ViewStudentDashboard}
            options={{orientation: isTablet() ? 'default' : 'portrait'}}
          />
          <Stack.Screen
            name="finalTestLesson"
            component={FinalTestLesson}
            options={{orientation: isTablet() ? 'default' : orientation}}
          />
          <Stack.Screen
            name="gameDetails"
            component={GameDetails}
            options={{orientation: isTablet() ? orientationGame : orientation}}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          {isFinishOnboarding ? (
            <Stack.Group>
              <Stack.Screen
                name="onboarding4"
                component={OnBoarding4}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="login"
                component={Login}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="createAccount"
                component={CreateAccount}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="emailVerification"
                component={EmailVerification}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="createName"
                component={CreateName}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen name="test" component={Test} />
              <Stack.Screen
                name="resetPasswordWithEmail"
                component={ResetPasswordWithEmail}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="resetWithNewPassword"
                component={ResetWithNewPassword}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="signUpSuccess"
                component={SignUpSuccess}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="payment"
                component={Payment}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="teacherUsername"
                component={TeacherUsername}
                options={{orientation: 'portrait'}}
              />
              <Stack.Screen
                name="listKidsOfTeacher"
                component={ListKidsOfTeacher}
                options={{orientation: 'portrait'}}
              />
              <Stack.Screen
                name="addKids"
                component={AddKids}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="loginEducator"
                component={LoginEducator}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="signUpSchool"
                component={SignUpSchool}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="setPasswordRegionSchool"
                component={SetPasswordRegionSchool}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="registerSchoolInfo"
                component={RegisterSchoolInfo}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="termsAndPrivacy"
                component={TermsAndPrivacy}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="onboarding1"
                component={OnBoarding1}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="onboarding2"
                component={OnBoarding2}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="onboarding3"
                component={OnBoarding3}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="onboarding4"
                component={OnBoarding4}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="login"
                component={Login}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="createAccount"
                component={CreateAccount}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="emailVerification"
                component={EmailVerification}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="createName"
                component={CreateName}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />

              <Stack.Screen name="test" component={Test} />
              <Stack.Screen
                name="resetPasswordWithEmail"
                component={ResetPasswordWithEmail}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="resetWithNewPassword"
                component={ResetWithNewPassword}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="signUpSuccess"
                component={SignUpSuccess}
                options={{orientation: 'portrait'}}
              />
              <Stack.Screen
                name="payment"
                component={Payment}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="teacherUsername"
                component={TeacherUsername}
                options={{orientation: 'portrait'}}
              />
              <Stack.Screen
                name="listKidsOfTeacher"
                component={ListKidsOfTeacher}
                options={{orientation: 'portrait'}}
              />
              <Stack.Screen
                name="addKids"
                component={AddKids}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="loginEducator"
                component={LoginEducator}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="signUpSchool"
                component={SignUpSchool}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="setPasswordRegionSchool"
                component={SetPasswordRegionSchool}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="registerSchoolInfo"
                component={RegisterSchoolInfo}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
              <Stack.Screen
                name="termsAndPrivacy"
                component={TermsAndPrivacy}
                options={{orientation: isTablet() ? 'default' : 'portrait'}}
              />
            </Stack.Group>
          )}
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const routeNameRef = React.useRef();
  const colorScheme = useColorScheme();
  // useEffect(() => {
  //   await AsyncStorage.removeItem('@MyApp_key')
  // })
  return (
    <ApolloProvider client={client}>
      <View style={CONTAINER}>
        <NavigationContainer
          ref={navigationRef}
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          {...props}
          onReady={() => {
            routeNameRef.current = navigationRef.getCurrentRoute()?.name;
          }}
          onStateChange={() => {
            const currentRouteName = navigationRef.getCurrentRoute()?.name;
            routeNameRef.current = currentRouteName;
          }}>
          <MenuProvider>
            <AppStack />
          </MenuProvider>
        </NavigationContainer>
        <Toast config={toastConfig} />
        <DisconnectLabel />
      </View>
    </ApolloProvider>
  );
};

const toastConfig = {
  error: props => <ErrorToast {...props} text1NumberOfLines={10} />,
  success: props => <SuccessToast {...props} text1NumberOfLines={10} />,
};

AppNavigator.displayName = 'AppNavigator';

const CONTAINER: ViewStyle = {
  flex: 1,
};

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['authen'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
