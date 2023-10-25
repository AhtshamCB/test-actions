import {Earning, Level, Summary, WeeklyActivities} from '@app/models';
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
export interface GetDashboardAction extends AnyAction {}
export interface SetTokenAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_LEADERBOARD_INFO: 'setLeaderboardInfo';
  GET_LEADERBOARD_INFO: 'getLeaderboardInfo';
  SET_CURRENT_LEVEL: 'setCurrentLevel';
  GET_CURRENT_LEVEL: 'setCurrentLevel';
  SET_SUMMARY: 'setSummary';
  GET_SUMMARY: 'getSummary';
  SET_EARNING: 'setEarning';
  GET_EARNING: 'getEarning';
  SET_VALUE_CHART: 'setValueChart';
  GET_VALUE_CHART: 'getValueChart';
  SET_SCHOOL_VALUE_CHART: 'setSchoolValueChart';
  GET_SCHOOL_VALUE_CHART: 'getSchoolValueChart';
  //STUDENT
  SET_DASHBOARD_STUDENT_CURRENT_LEVEL: 'setDashboardStudentCurrentLevel';
  GET_DASHBOARD_STUDENT_CURRENT_LEVEL: 'getDashboardStudentCurrentLevel';
  SET_DASHBOARD_STUDENT_SUMMARY: 'setDashboardStudentSummary';
  GET_DASHBOARD_STUDENT_SUMMARY: 'getDashboardStudentSummary';
  SET_DASHBOARD_STUDENT_EARNING: 'setDashboardStudentEarning';
  GET_DASHBOARD_STUDENT_EARNING: 'getDashboardStudentEarning';
  SET_DASHBOARD_STUDENT_VALUE_CHART: 'setDashboardStudentValueChart';
  GET_DASHBOARD_STUDENT_VALUE_CHART: 'getDashboardStudentValueChart';
}

interface IActionCreators extends DefaultActionCreators {
  setLeaderboardInfo: (data: any) => GetDashboardAction;
  getLeaderboardInfo: () => AnyAction;
  setCurrentLevel: (data: any) => GetDashboardAction;
  getCurrentLevel: () => AnyAction;
  setSummary: (data: any) => GetDashboardAction;
  getSummary: () => AnyAction;
  setEarning: (data: any) => GetDashboardAction;
  getEarning: () => AnyAction;
  setValueChart: (data: any) => GetDashboardAction;
  getValueChart: () => AnyAction;
  setSchoolValueChart: (data: any) => GetDashboardAction;
  getSchoolValueChart: () => AnyAction;
  //Student
  setDashboardStudentCurrentLevel: (data: any) => GetDashboardAction;
  getDashboardStudentCurrentLevel: () => AnyAction;
  setDashboardStudentSummary: (data: any) => GetDashboardAction;
  getDashboardStudentSummary: () => AnyAction;
  setDashboardStudentEarning: (data: any) => GetDashboardAction;
  getDashboardStudentEarning: () => AnyAction;
  setDashboardStudentValueChart: (data: any) => GetDashboardAction;
  getDashboardStudentValueChart: () => AnyAction;
}

type IActions = GetDashboardAction | AnyAction;

export interface DashboardState {
  leaderboardInfo: any | '';
  currentLevel: string;
  summary: Summary;
  earning: Earning;
  valueChart: WeeklyActivities[];
  schoolValueChart: WeeklyActivities[];
  //Student
  dashboardStudentCurrentLevel: string;
  dashboardStudentSummary: Summary;
  dashboardStudentEarning: Earning;
  dashboardStudentValueChart: WeeklyActivities[];
}
type ImmutableMyType = Immutable.ImmutableObject<DashboardState>;
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions<IActionTypes, IActionCreators>({
  setLeaderboardInfo: ['data'],
  getLeaderboardInfo: null,
  setCurrentLevel: ['data'],
  getCurrentLevel: null,
  setSummary: ['data'],
  getSummary: null,
  setEarning: ['data'],
  getEarning: null,
  setValueChart: ['data'],
  getValueChart: null,
  setSchoolValueChart: ['data'],
  getSchoolValueChart: null,
  //Student
  setDashboardStudentCurrentLevel: ['data'],
  getDashboardStudentCurrentLevel: null,
  setDashboardStudentSummary: ['data'],
  getDashboardStudentSummary: null,
  setDashboardStudentEarning: ['data'],
  getDashboardStudentEarning: null,
  setDashboardStudentValueChart: ['data'],
  getDashboardStudentValueChart: null,
});

export const DashboardTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableMyType = Immutable.from({
  leaderboardInfo: null,
  currentLevel: null,
  summary: null,
  earning: null,
  valueChart: null,
  schoolValueChart: null,
  //Student
  dashboardStudentCurrentLevel: null,
  dashboardStudentSummary: null,
  dashboardStudentEarning: null,
  dashboardStudentValueChart: null,
});
export const setLeaderboardInfo = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({leaderboardInfo: data, fetching: false, error: ''});
export const getLeaderboardInfo = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setCurrentLevel = (
  state: ImmutableMyType,
  {data}: {data: Level},
) => state.merge({currentLevel: data, fetching: false, error: ''});
export const getCurrentLevel = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setSummary = (state: ImmutableMyType, {data}: {data: Summary}) =>
  state.merge({summary: data, fetching: false, error: ''});
export const getSummary = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setEarning = (state: ImmutableMyType, {data}: {data: Earning}) =>
  state.merge({earning: data, fetching: false, error: ''});
export const getEarning = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setValueChart = (
  state: ImmutableMyType,
  {data}: {data: WeeklyActivities[]},
) => state.merge({valueChart: data, fetching: false, error: ''});
export const getValueChart = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setSchoolValueChart = (
  state: ImmutableMyType,
  {data}: {data: WeeklyActivities[]},
) => state.merge({schoolValueChart: data, fetching: false, error: ''});
export const getSchoolValueChart = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
//Student
export const setDashboardStudentCurrentLevel = (
  state: ImmutableMyType,
  {data}: {data: Level},
) =>
  state.merge({dashboardStudentCurrentLevel: data, fetching: false, error: ''});
export const getDashboardStudentCurrentLevel = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setDashboardStudentSummary = (
  state: ImmutableMyType,
  {data}: {data: Summary},
) => state.merge({dashboardStudentSummary: data, fetching: false, error: ''});
export const getDashboardStudentSummary = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setDashboardStudentEarning = (
  state: ImmutableMyType,
  {data}: {data: Earning},
) => state.merge({dashboardStudentEarning: data, fetching: false, error: ''});
export const getDashboardStudentEarning = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});
export const setDashboardStudentValueChart = (
  state: ImmutableMyType,
  {data}: {data: WeeklyActivities[]},
) =>
  state.merge({dashboardStudentValueChart: data, fetching: false, error: ''});
export const getDashboardStudentValueChart = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.GET_LEADERBOARD_INFO]: getLeaderboardInfo,
  [Types.SET_LEADERBOARD_INFO]: setLeaderboardInfo,
  [Types.GET_CURRENT_LEVEL]: getCurrentLevel,
  [Types.SET_CURRENT_LEVEL]: setCurrentLevel,
  [Types.SET_SUMMARY]: setSummary,
  [Types.GET_SUMMARY]: getSummary,
  [Types.SET_EARNING]: setEarning,
  [Types.GET_EARNING]: getEarning,
  [Types.SET_VALUE_CHART]: setValueChart,
  [Types.GET_VALUE_CHART]: getValueChart,
  [Types.SET_SCHOOL_VALUE_CHART]: setSchoolValueChart,
  [Types.GET_SCHOOL_VALUE_CHART]: getSchoolValueChart,
  [Types.GET_DASHBOARD_STUDENT_CURRENT_LEVEL]: getDashboardStudentCurrentLevel,
  [Types.SET_DASHBOARD_STUDENT_CURRENT_LEVEL]: setDashboardStudentCurrentLevel,
  [Types.SET_DASHBOARD_STUDENT_SUMMARY]: setDashboardStudentSummary,
  [Types.GET_DASHBOARD_STUDENT_SUMMARY]: getDashboardStudentSummary,
  [Types.SET_DASHBOARD_STUDENT_EARNING]: setDashboardStudentEarning,
  [Types.GET_DASHBOARD_STUDENT_EARNING]: getDashboardStudentEarning,
  [Types.SET_DASHBOARD_STUDENT_VALUE_CHART]: setDashboardStudentValueChart,
  [Types.GET_DASHBOARD_STUDENT_VALUE_CHART]: getDashboardStudentValueChart,
});
