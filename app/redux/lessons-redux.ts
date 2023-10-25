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
export interface LessonAction extends AnyAction {}
export interface GetLessonAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_LESSON_DETAIL: 'setLessonDetail';
  GET_LESSON_DETAIL: 'getLessonDetail';
  SET_CHALLENGE_LESSON_DETAIL: 'setChallengeLessonDetail';
  GET_CHALLENGE_LESSON_DETAIL: 'getChallengeLessonDetail';
  SET_QUIZ_LESSON_DETAIL: 'setQuizLessonDetail';
  GET_QUIZ_LESSON_DETAIL: 'getQuizLessonDetail';
  SET_INTRODUCTION_LESSON_DETAIL: 'setIntroductionLessonDetail';
  GET_INTRODUCTION_LESSON_DETAIL: 'getIntroductionLessonDetail';
  SET_SUBMIT_LESSON: 'setSubmitLesson';
  GET_SUBMIT_LESSON: 'getSubmitLesson';
  SET_QUIZ_SUBMIT_LESSON: 'setQuizSubmitLesson';
  GET_QUIZ_SUBMIT_LESSON: 'getQuizSubmitLesson';
  SET_ARRAY_ANSWER_LESSON: 'setArrayAnswerLesson';
  GET_ARRAY_ANSWER_LESSON: 'getArrayAnswerLesson';
  SET_STORY_LESSON_DETAIL: 'setStoryLessonDetail';
  GET_STORY_LESSON_DETAIL: 'getStoryLessonDetail';
  SET_GAME_LESSON_DETAIL: 'setGameLessonDetail';
  GET_GAME_LESSON_DETAIL: 'getGameLessonDetail';
  RESET_ARRAY_ANSWER_LESSON: 'resetArrayAnswerLesson';
  SET_ARRAY_QUIZ_SUBMIT_LESSON: 'setArrayQuizSubmitLesson';
  GET_ARRAY_QUIZ_SUBMIT_LESSON: 'getArrayQuizSubmitLesson';
  RESET_ARRAY_QUIZ_SUBMIT_LESSON: 'resetArrayQuizSubmitLesson';
  SET_QUIZ_FINAL_TEST_EXAM: 'setQuizFinalTestExam';
  GET_QUIZ_FINAL_TEST_EXAM: 'getQuizFinalTestExam';
  SET_COUNT_NUMBER_OF_TIMES_QUESTION_ANSWERS: 'setCountNumberOfTimesQuestionAnswers';
  GET_COUNT_NUMBER_OF_TIMES_QUESTION_ANSWERS: 'getCountNumberOfTimesQuestionAnswers';
}

interface IActionCreators extends DefaultActionCreators {
  setLessonDetail: (data: any) => GetLessonAction;
  setChallengeLessonDetail: (data: any) => GetLessonAction;
  getChallengeLessonDetail: () => AnyAction;
  getLessonDetail: () => AnyAction;
  setQuizLessonDetail: (data: any) => GetLessonAction;
  getQuizLessonDetail: () => AnyAction;
  setIntroductionLessonDetail: (data: any) => GetLessonAction;
  getIntroductionLessonDetail: () => AnyAction;
  setSubmitLesson: (data: any) => GetLessonAction;
  getSubmitLesson: () => AnyAction;
  setQuizSubmitLesson: (data: any) => GetLessonAction;
  getQuizSubmitLesson: () => AnyAction;
  setArrayAnswerLesson: (data: any) => GetLessonAction;
  getArrayAnswerLesson: () => AnyAction;
  setStoryLessonDetail: (data: any) => GetLessonAction;
  getStoryLessonDetail: () => AnyAction;
  setGameLessonDetail: (data: any) => GetLessonAction;
  getGameLessonDetail: () => AnyAction;
  resetArrayAnswerLesson: () => AnyAction;
  setArrayQuizSubmitLesson: (data: any) => GetLessonAction;
  getArrayQuizSubmitLesson: () => AnyAction;
  resetArrayQuizSubmitLesson: () => AnyAction;
  setQuizFinalTestExam: (data: any) => GetLessonAction;
  getQuizFinalTestExam: () => AnyAction;
  setCountNumberOfTimesQuestionAnswers: (data: any) => GetLessonAction;
  getCountNumberOfTimesQuestionAnswers: () => AnyAction;
}

type IActions = GetLessonAction | AnyAction;

export interface LessonState {
  lessonDetail: any;
  challengeLessonDetail: any;
  quizLessonDetail: any;
  introductionLessonDetail: any;
  submitLessonDetail: any;
  quizSubmitLessonDetail: any;
  arrayAnswerLesson: any[];
  storyLessonDetail: any;
  gameLessonDetail: any;
  arrayQuizSubmitLesson: any[];
  quizFinalTestExam: any;
  countNumberOfTimesQuestionAnswers: number;
}
type ImmutableMyType = Immutable.ImmutableObject<LessonState>;
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions<IActionTypes, IActionCreators>({
  setLessonDetail: ['data'],
  getLessonDetail: null,
  setChallengeLessonDetail: ['data'],
  getChallengeLessonDetail: null,
  setQuizLessonDetail: ['data'],
  getQuizLessonDetail: null,
  setIntroductionLessonDetail: ['data'],
  getIntroductionLessonDetail: null,
  setSubmitLesson: ['data'],
  getSubmitLesson: null,
  setQuizSubmitLesson: ['data'],
  getQuizSubmitLesson: null,
  setArrayAnswerLesson: ['data'],
  getArrayAnswerLesson: null,
  setStoryLessonDetail: ['data'],
  getStoryLessonDetail: null,
  setGameLessonDetail: ['data'],
  getGameLessonDetail: null,
  resetArrayAnswerLesson: null,
  setArrayQuizSubmitLesson: ['data'],
  getArrayQuizSubmitLesson: null,
  resetArrayQuizSubmitLesson: null,
  setQuizFinalTestExam: ['data'],
  getQuizFinalTestExam: null,
  setCountNumberOfTimesQuestionAnswers: ['data'],
  getCountNumberOfTimesQuestionAnswers: null,
});

export const LessonTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableMyType = Immutable.from({
  lessonDetail: null,
  challengeLessonDetail: null,
  quizLessonDetail: null,
  introductionLessonDetail: null,
  submitLessonDetail: null,
  quizSubmitLessonDetail: null,
  arrayAnswerLesson: [],
  storyLessonDetail: null,
  gameLessonDetail: null,
  arrayQuizSubmitLesson: [],
  quizFinalTestExam: null,
  countNumberOfTimesQuestionAnswers: 0,
});

export const setLessonDetail = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({lessonDetail: data, fetching: false, error: ''});

export const getLessonDetail = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setQuizLessonDetail = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({quizLessonDetail: data, fetching: false, error: ''});

export const getQuizLessonDetail = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setIntroductionLessonDetail = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({introductionLessonDetail: data, fetching: false, error: ''});

export const getIntroductionLessonDetail = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setSubmitLesson = (state: ImmutableMyType, {data}: {data: any}) =>
  state.merge({submitLessonDetail: data, fetching: false, error: ''});

export const getSubmitLesson = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setQuizSubmitLesson = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({quizSubmitLessonDetail: data, fetching: false, error: ''});

export const getQuizSubmitLesson = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setArrayAnswerLesson = (
  state: ImmutableMyType,
  {data}: {data: any[]},
) => state.merge({arrayAnswerLesson: [...state.arrayAnswerLesson, data]});

export const getArrayAnswerLesson = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setStoryLessonDetail = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({storyLessonDetail: data, fetching: false, error: ''});

export const getStoryLessonDetail = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setGameLessonDetail = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({gameLessonDetail: data, fetching: false, error: ''});

export const getGameLessonDetail = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setChallengeLessonDetail = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({challengeLessonDetail: data, fetching: false, error: ''});

export const getChallengeLessonDetail = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const resetArrayAnswerLesson = (state: ImmutableMyType) =>
  state.merge({
    arrayAnswerLesson: [],
  });

export const setArrayQuizSubmitLesson = (
  state: ImmutableMyType,
  {data}: {data: any[]},
) =>
  state.merge({arrayQuizSubmitLesson: [...state.arrayQuizSubmitLesson, data]});

export const getArrayQuizSubmitLesson = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const resetArrayQuizSubmitLesson = (state: ImmutableMyType) =>
  state.merge({
    arrayQuizSubmitLesson: [],
  });

export const setQuizFinalTestExam = (
  state: ImmutableMyType,
  {data}: {data: any},
) => state.merge({quizFinalTestExam: data, fetching: false, error: ''});

export const getQuizFinalTestExam = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const setCountNumberOfTimesQuestionAnswers = (
  state: ImmutableMyType,
  {data}: {data: any},
) =>
  state.merge({
    countNumberOfTimesQuestionAnswers: data,
    fetching: false,
    error: '',
  });

export const getCountNumberOfTimesQuestionAnswers = (state: ImmutableMyType) =>
  state.merge({fetching: true, error: ''});

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.GET_LESSON_DETAIL]: getLessonDetail,
  [Types.SET_LESSON_DETAIL]: setLessonDetail,
  [Types.GET_CHALLENGE_LESSON_DETAIL]: getChallengeLessonDetail,
  [Types.SET_CHALLENGE_LESSON_DETAIL]: setChallengeLessonDetail,
  [Types.GET_QUIZ_LESSON_DETAIL]: getQuizLessonDetail,
  [Types.SET_QUIZ_LESSON_DETAIL]: setQuizLessonDetail,
  [Types.GET_INTRODUCTION_LESSON_DETAIL]: getIntroductionLessonDetail,
  [Types.SET_INTRODUCTION_LESSON_DETAIL]: setIntroductionLessonDetail,
  [Types.GET_SUBMIT_LESSON]: getSubmitLesson,
  [Types.SET_SUBMIT_LESSON]: setSubmitLesson,
  [Types.GET_QUIZ_SUBMIT_LESSON]: getQuizSubmitLesson,
  [Types.SET_QUIZ_SUBMIT_LESSON]: setQuizSubmitLesson,
  [Types.GET_ARRAY_ANSWER_LESSON]: getArrayAnswerLesson,
  [Types.SET_ARRAY_ANSWER_LESSON]: setArrayAnswerLesson,
  [Types.GET_STORY_LESSON_DETAIL]: getStoryLessonDetail,
  [Types.SET_STORY_LESSON_DETAIL]: setStoryLessonDetail,
  [Types.GET_GAME_LESSON_DETAIL]: getGameLessonDetail,
  [Types.SET_GAME_LESSON_DETAIL]: setGameLessonDetail,
  [Types.RESET_ARRAY_ANSWER_LESSON]: resetArrayAnswerLesson,
  [Types.GET_ARRAY_QUIZ_SUBMIT_LESSON]: getArrayQuizSubmitLesson,
  [Types.SET_ARRAY_QUIZ_SUBMIT_LESSON]: setArrayQuizSubmitLesson,
  [Types.RESET_ARRAY_QUIZ_SUBMIT_LESSON]: resetArrayQuizSubmitLesson,
  [Types.GET_QUIZ_FINAL_TEST_EXAM]: getQuizFinalTestExam,
  [Types.SET_QUIZ_FINAL_TEST_EXAM]: setQuizFinalTestExam,
  [Types.GET_COUNT_NUMBER_OF_TIMES_QUESTION_ANSWERS]:
    getCountNumberOfTimesQuestionAnswers,
  [Types.SET_COUNT_NUMBER_OF_TIMES_QUESTION_ANSWERS]:
    setCountNumberOfTimesQuestionAnswers,
});
