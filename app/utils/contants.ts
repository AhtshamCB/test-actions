import {Platform} from 'react-native';

export const MEMBER_SHIP_STATUS = {
  SUBSCRIBED: 'subscribed',
  NOT_SUBSCRIBED: 'not_subscribed',
  STILL_ACTIVE: 'still_active',
};
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const TYPE = {
  PARENT: 'parent',
  KID: 'kid',
  SCHOOL: 'school',
  GRADE: 'grade',
  STUDENT: 'student',
};

export const STATUS = {
  UP_COMING: 'upComing',
  IN_PROGRESS: 'inProgress',
  COMPLETED: 'completed',
};

export const NOTIFY_NOT_SUBSCRIPTIONS =
  'Oops! Please ask your parents for subscription first! Amazing courses and games are waiting for you below the map! 😍';

export const NOTIFY_SUBSCRIPTIONS =
  "Wow! You're in! Your parents must have loved you so much 😍 Click the map to get started Level 1!";

export const BETA_DEADLINE = '30/06/2023';

export const DATE_TIME_FORMAT_E_D_M = 'EEEE, dd MMMM';

export const WEB = {
  WEB_DEV: 'https://dev.teefi.io',
  // WEB_DEV: 'http://172.16.5.241:3001/',
  WEB_PROD: 'https://www.teefi.io',
};

export const UPLOAD_FILE_URL = {
  DEV: 'https://dev-api.teefi.io/user/uploadFile/file',
  PROD: 'https://api.teefi.io/user/uploadFile/file',
};

export enum LEARNING_PLAN_TIME_CONSTANTS {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  QUARTERLY = 'quarterly',
  LIFETIME = 'lifetime',
}

export enum LESSON_STEP {
  CHALLENGE = 'challenge',
  INTRODUCTION = 'introduction',
  QUESTIONS = 'question',
  QUESTIONS_QUIZ = 'quizzes',
  STORY = 'story',
  GAME = 'game',
}

export enum QUESTION_STATUS {
  COMPLETED = 'completed',
  INPROGRESS = 'inProgress',
  UPCOMING = 'upComing',
}

export enum EXAM_STATUS {
  IN_PROCESS = 'Inprogress',
  FAILED = 'Failed',
  PASSED = 'Passed',
}
export type EXAM_STATUS_TYPE = (typeof EXAM_STATUS)[keyof typeof EXAM_STATUS];

export type LEARNING_PLAN_TIME_CONSTANTS_TYPE =
  (typeof LEARNING_PLAN_TIME_CONSTANTS)[keyof typeof LEARNING_PLAN_TIME_CONSTANTS];

export enum MEMBER_SHIP_TITLE_CONDITION {
  SUBSCRIBE_LEVEL = 'SUBSCRIBE_LEVEL',
  CANCEL_LEVEL = 'CANCEL_LEVEL',
  SWITCH_LEVEL = 'SWITCH_LEVEL',
  SWITCH_PLAN_MODAL_CONTENT = 'SWITCH_PLAN_MODAL_CONTENT',
  SHORT_NAME_LEVEL = 'SHORT_NAME_LEVEL',
}

export type MEMBER_SHIP_TITLE_CONDITION_TYPE =
  (typeof MEMBER_SHIP_TITLE_CONDITION)[keyof typeof MEMBER_SHIP_TITLE_CONDITION];

export interface EducatorRole {
  value: string;
  label: string;
}

export const EducatorRoleData: EducatorRole[] = [
  {value: 'teacher', label: 'Teacher'},
  {value: 'professor', label: 'Professor'},
  {value: 'principal', label: 'Principal'},
  {value: 'administrator', label: 'Administrator'},
  {value: 'counselor', label: 'Counselor'},
  {value: 'manager', label: 'Manager'},
];
export interface OptionType {
  value: string;
  label: string;
}

export const SchoolTitleOptionData: OptionType[] = [
  {value: 'mr', label: 'Mr'},
  {value: 'mrs', label: 'Mrs'},
  {value: 'miss', label: 'Miss'},
  {value: 'ms', label: 'Ms'},
  {value: 'dr', label: 'Dr'},
  {value: 'prof', label: 'Prof'},
];

export enum SCHOOL_ACCESS_STATUS {
  NOT_ACTIVATED = 'NotActivated',
  TRIAL = 'Trial',
  FULL_ACCESS = 'FullAccess',
  EXPIRED = 'Expired',
}

export type SCHOOL_ACCESS_STATUS_TYPE =
  (typeof SCHOOL_ACCESS_STATUS)[keyof typeof SCHOOL_ACCESS_STATUS];
