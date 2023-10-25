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
// export interface GetConfigAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SHOW_GLOBAL_LOADING: 'showGlobalLoading';
  HIDE_GLOBAL_LOADING: 'hideGlobalLoading';
  SET_IS_NETWORK_CONNECTED: 'setIsNetworkConnected';
  SET_ORIENTATION: 'setOrientation';
  GET_ORIENTATION: 'getOrientation';
  SET_IS_BETA_VERSION: 'setIsBetaVersion';
  SET_NOTIFICATION_LIST: 'setNotificationList';
  GET_NOTIFICATION_LIST: 'getNotificationList';
  SET_END_BETA_DATE: 'setEndBetaDate';
  GET_END_BETA_DATE: 'getEndBetaDate';
  SET_IS_FULL_SCREEN: 'setIsFullScreen';
  SET_ORIENTATION_OPEN_APP: 'setOrientationOpenApp';
  GET_ORIENTATION_OPEN_APP: 'getOrientationOpenApp';
  SET_ORIENTATION_GAME: 'setOrientationGame';
  GET_ORIENTATION_GAME: 'getOrientationGame';
}

interface IActionCreators extends DefaultActionCreators {
  showGlobalLoading: () => AnyAction;
  hideGlobalLoading: () => AnyAction;
  setOrientation: (data: any) => AnyAction;
  getOrientation: () => AnyAction;
  setIsBetaVersion: (data: any) => AnyAction;
  setNotificationList: (data: any) => AnyAction;
  getNotificationList: () => AnyAction;
  setEndBetaDate: (data: any) => AnyAction;
  getEndBetaDate: () => AnyAction;
  setIsFullScreen: (data: any) => AnyAction;
  setOrientationOpenApp: (data: any) => AnyAction;
  getOrientationOpenApp: () => AnyAction;
  setOrientationGame: (data: any) => AnyAction;
  getOrientationGame: () => AnyAction;
}

type IActions = AnyAction;

export interface ConfigState {
  loading: boolean;
  isNetworkConnected: boolean;
  orientation: any;
  isBetaVersion: boolean;
  notificationsList: any;
  isDeleteMessageNotification: boolean;
  endBetaDate: any;
  isFullScreen: boolean;
  orientationOpenApp: string;
  orientationGame: string;
}
type ImmutableMyType = Immutable.ImmutableObject<ConfigState>;
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions<IActionTypes, IActionCreators>({
  showGlobalLoading: null,
  hideGlobalLoading: null,
  setIsNetworkConnected: ['isConnected'],
  setOrientation: ['data'],
  getOrientation: null,
  setIsBetaVersion: ['isBeta'],
  setNotificationList: ['data'],
  getNotificationList: null,
  setEndBetaDate: ['data'],
  getEndBetaDate: null,
  setIsFullScreen: ['isFull'],
  setOrientationOpenApp: ['data'],
  getOrientationOpenApp: null,
  setOrientationGame: ['data'],
  getOrientationGame: null,
});

export const ConfigTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableMyType = Immutable.from({
  loading: false,
  isNetworkConnected: true,
  orientation: 'portrait',
  isBetaVersion: true,
  notificationsList: [],
  endBetaDate: '',
  isFullScreen: false,
  orientationOpenApp: '',
  orientationGame: 'default',
});

export const showGlobalLoading = (state: ImmutableMyType) =>
  state.merge({loading: true});

export const hideGlobalLoading = (state: ImmutableMyType) =>
  state.merge({loading: false});

export const setIsNetworkConnected = (
  state: ImmutableMyType,
  {isConnected}: {isConnected: boolean},
) => state.merge({isNetworkConnected: isConnected});
export const setOrientation = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({orientation: data, fetching: false, error: ''});
export const getOrientation = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setIsBetaVersion = (
  state: ImmutableMyType,
  {isBeta}: {isBeta: boolean},
) => state.merge({isBetaVersion: isBeta});
export const setNotificationList = (
  state: ImmutableMyType,
  {data}: {data: any[]},
) => state.merge({notificationsList: data});

export const getNotificationList = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setEndBetaDate = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({endBetaDate: data, fetching: false, error: ''});
export const getEndBetaDate = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setIsFullScreen = (
  state: ImmutableMyType,
  {isFull}: {isFull: boolean},
) => state.merge({isFullScreen: isFull});

export const setOrientationOpenApp = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({orientationOpenApp: data, fetching: false, error: ''});
export const getOrientationOpenApp = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setOrientationGame = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({orientationGame: data, fetching: false, error: ''});
export const getOrientationGame = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SHOW_GLOBAL_LOADING]: showGlobalLoading,
  [Types.HIDE_GLOBAL_LOADING]: hideGlobalLoading,
  [Types.SET_IS_NETWORK_CONNECTED]: setIsNetworkConnected,
  [Types.SET_ORIENTATION]: setOrientation,
  [Types.GET_ORIENTATION]: getOrientation,
  [Types.SET_IS_BETA_VERSION]: setIsBetaVersion,
  [Types.SET_NOTIFICATION_LIST]: setNotificationList,
  [Types.GET_NOTIFICATION_LIST]: getNotificationList,
  [Types.SET_END_BETA_DATE]: setEndBetaDate,
  [Types.GET_END_BETA_DATE]: getEndBetaDate,
  [Types.SET_IS_FULL_SCREEN]: setIsFullScreen,
  [Types.SET_ORIENTATION_OPEN_APP]: setOrientationOpenApp,
  [Types.GET_ORIENTATION_OPEN_APP]: getOrientationOpenApp,
  [Types.SET_ORIENTATION_GAME]: setOrientationGame,
  [Types.GET_ORIENTATION_GAME]: getOrientationGame,
});
