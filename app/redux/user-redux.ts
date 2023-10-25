import {MeInfo} from '@app/models';
import {AnyAction} from 'redux';
import {
  createReducer,
  createActions,
  // ActionTypes,
  DefaultActionTypes,
  DefaultActionCreators,
} from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

/* ------------- Model interface Create Action ------------- */
export interface GetUserAction extends AnyAction {}
export interface SetTokenAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_USER_INFO: 'setUserInfo';
  GET_USER_INFO: 'getUserInfo';
  GET_USER_INFO_LOGIN: 'getUserInfoLogin';
  UPDATE_USER_PROFILE: 'updateUserProfile';
  SET_TOKEN: 'setToken';
  SET_ERROR_USER: 'setErrorUser';
  SIGN_IN: 'signIn';
  SET_BALANCE_DATA: 'setBalanceData';
  SIGN_OUT: 'signOut';
  SET_FETCHING: 'setFetching';
  REQUEST_PUSH_PERMISSION: 'requestPushPermission';
  SET_PUSH_TOKEN: 'setPushToken';
  POST_NOTIFICATION_TOKEN: 'postNotificationToken';
  ADD_USER_WALLET_BALANCE: 'addUserWalletBalance';
  GET_BALANCE_WALLET: 'getBalanceWallet';
  DELETE_ACCOUNT: 'deleteAccount';
  SET_SHOWED_GIFT_IMAGE: 'setShowedGiftImage';
  SET_IS_LOGGED_IN: 'setIsLoggedIn';
  SET_USER_PIN: 'setUserPin';
  GET_USER_PIN: 'getUserPin';
  SET_USER_VERIFY_PIN: 'setUserVerifyPin';
  GET_USER_VERIFY_PIN: 'getUserVerifyPin';
  SET_STATUS_VERIFY_PIN: 'setStatusVerifyPin';
  GET_STATUS_VERIFY_PIN: 'getStatusVerifyPin';
  SET_CHILD_ID: 'setChildId';
  GET_CHILD_ID: 'getChildId';
  SET_ACTIVE_KIDS: 'setActiveKids';
  GET_ACTIVE_KIDS: 'getActiveKids';
  SET_INFO_DASHBOARD_STUDENT: 'setInfoDashboardStudent';
  GET_INFO_DASHBOARD_STUDENT: 'getInfoDashboardStudent';
  SET_DEVICE_ID: 'setDeviceId';
  GET_DEVICE_ID: 'getDeviceId';
  SET_ANDROID_DEVICE_ID: 'setAndroidDeviceId';
  GET_ANDROID_DEVICE_ID: 'getAndroidDeviceId';
  SET_IOS_DEVICE_ID: 'setIosDeviceId';
  GET_IOS_DEVICE_ID: 'getIosDeviceId';
}

interface IActionCreators extends DefaultActionCreators {
  setUserInfo: (data: any) => GetUserAction;
  getUserInfo: () => AnyAction;
  getUserInfoLogin: () => AnyAction;
  updateUserProfile: (body: any, callback?: any) => AnyAction;
  setErrorUser: (error: string) => AnyAction;
  setToken: (
    accessToken: string | null,
    refreshToken: string | null,
  ) => SetTokenAction;
  signIn: (phone: string, otpNumber: string) => AnyAction;
  signOut: () => AnyAction;
  setFetching: (fetching: boolean) => AnyAction;
  requestPushPermission: () => AnyAction;
  setPushToken: (token: string) => AnyAction;
  postNotificationToken: (token: string) => AnyAction;
  addUserWalletBalance: (balance: string) => AnyAction;
  getBalanceWallet: () => AnyAction;
  deleteAccount: () => AnyAction;
  setShowedGiftImage: () => AnyAction;
  setIsLoggedIn: (loggedIn: boolean) => AnyAction;
  setUserPin: (data: any) => GetUserAction;
  getUserPin: () => AnyAction;
  setUserVerifyPin: (data: any) => GetUserAction;
  getUserVerifyPin: () => AnyAction;
  setStatusVerifyPin: (data: any) => GetUserAction;
  getStatusVerifyPin: () => AnyAction;
  setChildId: (data: any) => GetUserAction;
  getChildId: () => AnyAction;
  setActiveKids: (data: any) => GetUserAction;
  getActiveKids: () => AnyAction;
  setInfoDashboardStudent: (data: any) => GetUserAction;
  getInfoDashboardStudent: () => AnyAction;
  setDeviceId: (data: any) => GetUserAction;
  getDeviceId: () => AnyAction;
  setAndroidDeviceId: (data: any) => GetUserAction;
  getAndroidDeviceId: () => AnyAction;
  setIosDeviceId: (data: any) => GetUserAction;
  getIosDeviceId: () => AnyAction;
}

type IActions = GetUserAction | AnyAction;

export interface UserState {
  userInfo: MeInfo;
  accessToken: string;
  refreshToken: string | null;
  pushToken: string;
  error: string;
  fetching: boolean;
  balance: string | null;
  showedGiftImage: boolean;
  isLoggedIn: boolean;
  userPin: any;
  userVerifyPin: string;
  statusVerifyPin: any;
  childId: any;
  activeKidInfo: any;
  infoDashboardStudent: any;
  deviceId: string;
  androidDeviceId: string;
  iOSDeviceId: string;
}
type ImmutableMyType = Immutable.ImmutableObject<UserState>;
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions<IActionTypes, IActionCreators>({
  setUserInfo: ['data'],
  getUserInfo: null,
  getUserInfoLogin: null,
  updateUserProfile: ['body', 'callback'],
  setErrorUser: ['error'],
  setToken: ['accessToken', 'refreshToken'],
  signIn: ['phone', 'otpNumber'],
  signOut: null,
  setFetching: ['fetching'],
  setPushToken: ['token'],
  requestPushPermission: [],
  postNotificationToken: ['token'],
  addUserWalletBalance: ['balance'],
  getBalanceWallet: [],
  deleteAccount: null,
  setShowedGiftImage: null,
  setIsLoggedIn: ['loggedIn'],
  setUserPin: ['data'],
  getUserPin: null,
  setUserVerifyPin: ['data'],
  getUserVerifyPin: null,
  setStatusVerifyPin: ['data'],
  getStatusVerifyPin: null,
  setChildId: ['data'],
  getChildId: null,
  setActiveKids: ['data'],
  getActiveKids: null,
  setInfoDashboardStudent: ['data'],
  getInfoDashboardStudent: null,
  setDeviceId: ['data'],
  getDeviceId: null,
  setAndroidDeviceId: ['data'],
  getAndroidDeviceId: null,
  setIosDeviceId: ['data'],
  getIosDeviceId: null,
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableMyType = Immutable.from({
  userInfo: null,
  accessToken: null,
  refreshToken: null,
  balanceData: null,
  pushToken: null,
  error: '',
  fetching: false,
  balance: null,
  showedGiftImage: false,
  isLoggedIn: false,
  userPin: null,
  userVerifyPin: null,
  statusVerifyPin: null,
  childId: null,
  activeKidInfo: null,
  infoDashboardStudent: null,
  deviceId: '',
  androidDeviceId: '',
  iOSDeviceId: '',
});

export const setShowedGiftImage = (state: ImmutableMyType) =>
  state.merge({showedGiftImage: true});
export const getUserInfo = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setIsLoggedIn = (
  state: ImmutableMyType,
  {loggedIn}: {loggedIn: boolean},
) => {
  return state.merge({isLoggedIn: loggedIn});
};

export const setUserInfo = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({userInfo: data, fetching: false, error: ''});

export const updateUserProfile = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setToken = (
  state: ImmutableMyType,
  {accessToken, refreshToken}: {accessToken: string; refreshToken: string},
) => state.merge({accessToken, refreshToken});

export const setErrorUser = (
  state: ImmutableMyType,
  {error}: {error: string},
) => state.merge({error, fetching: false});

export const signOut = (state: ImmutableMyType) =>
  state.merge({
    userInfo: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    userPin: null,
    childId: null,
  });

export const setFetching = (
  state: ImmutableMyType,
  {fetching}: {fetching: boolean},
) => state.merge({fetching});

export const setPushToken = (
  state: ImmutableMyType,
  {token}: {token: string},
) => state.merge({pushToken: token});

export const addUserWalletBalance = (
  state: ImmutableMyType,
  {balance}: {balance: string},
) => state.merge({balance: balance});

export const setUserPin = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({userPin: data, fetching: false, error: ''});

export const getUserPin = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setUserVerifyPin = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({userVerifyPin: data, fetching: false, error: ''});

export const getUserVerifyPin = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setStatusVerifyPin = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({statusVerifyPin: data, fetching: false, error: ''});

export const getStatusVerifyPin = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setChildId = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({childId: data, fetching: false, error: ''});

export const getChildId = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setActiveKids = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({activeKidInfo: data, fetching: false, error: ''});

export const getActiveKids = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setInfoDashboardStudent = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({infoDashboardStudent: data, fetching: false, error: ''});

export const getInfoDashboardStudent = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setDeviceId = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({deviceId: data, fetching: false, error: ''});

export const getDeviceId = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setAndroidDeviceId = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({androidDeviceId: data, fetching: false, error: ''});

export const getAndroidDeviceId = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setIosDeviceId = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({iOSDeviceId: data, fetching: false, error: ''});

export const getIosDeviceId = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.GET_USER_INFO]: getUserInfo,
  [Types.SET_USER_INFO]: setUserInfo,
  [Types.UPDATE_USER_PROFILE]: updateUserProfile,
  [Types.SET_ERROR_USER]: setErrorUser,
  [Types.SET_TOKEN]: setToken,
  [Types.SIGN_OUT]: signOut,
  [Types.SET_FETCHING]: setFetching,
  [Types.SET_PUSH_TOKEN]: setPushToken,
  [Types.SET_IS_LOGGED_IN]: setIsLoggedIn,
  [Types.ADD_USER_WALLET_BALANCE]: addUserWalletBalance,
  [Types.GET_USER_PIN]: getUserPin,
  [Types.SET_USER_PIN]: setUserPin,
  [Types.GET_USER_VERIFY_PIN]: getUserVerifyPin,
  [Types.SET_USER_VERIFY_PIN]: setUserVerifyPin,
  [Types.GET_STATUS_VERIFY_PIN]: getStatusVerifyPin,
  [Types.SET_STATUS_VERIFY_PIN]: setStatusVerifyPin,
  [Types.GET_CHILD_ID]: getChildId,
  [Types.SET_CHILD_ID]: setChildId,
  [Types.GET_ACTIVE_KIDS]: getActiveKids,
  [Types.SET_ACTIVE_KIDS]: setActiveKids,
  [Types.GET_INFO_DASHBOARD_STUDENT]: getInfoDashboardStudent,
  [Types.SET_INFO_DASHBOARD_STUDENT]: setInfoDashboardStudent,
  [Types.GET_DEVICE_ID]: getDeviceId,
  [Types.SET_DEVICE_ID]: setDeviceId,
  [Types.GET_ANDROID_DEVICE_ID]: getAndroidDeviceId,
  [Types.SET_ANDROID_DEVICE_ID]: setAndroidDeviceId,
  [Types.GET_IOS_DEVICE_ID]: getIosDeviceId,
  [Types.SET_IOS_DEVICE_ID]: setIosDeviceId,
});
