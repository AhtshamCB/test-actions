import {useState} from 'react';
//
import {
  CREATE_QUESTION_SESSION_QUERY,
  GET_CHALLENGE_LESSONS_DETAIL_QUERY,
  GET_GAME_LESSONS_DETAIL_QUERY,
  GET_INTRODUCTION_LESSONS_DETAIL_QUERY,
  GET_LIST_LESSONS_DETAIL_QUERY,
  GET_QUIZ_LESSONS_DETAIL_QUERY,
  GET_STORY_LESSONS_DETAIL_QUERY,
  LIST_GAME_QUERY,
  LIST_LESSON_QUERY,
  START_EXAM_QUERY,
  SUBMIT_EXAM_QUERY,
} from '@app/apollo/query';
import {useDispatch, useSelector} from 'react-redux';
import {LessonActions, selector} from '@app/redux';
import {
  Challenge,
  CreateQuestionSession,
  DataListLessons,
  DataSubmitExam,
  Game,
  Introduction,
  KidLessonInfo,
  LessonId,
  LevelId,
  ListGame,
  ListLessons,
  Questions,
  StartExam,
  Story,
  SubmitExam,
} from '@app/models';
import client from '@app/apollo';
import {useTranslation} from 'react-i18next';
import {shuffleAnswersByOrder} from '@app/screens/level/hook/shuffle-answer-by-order';
import {Platform} from 'react-native';

export const useLessons = () => {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const [listLessons, setListLessons] = useState<any>();
  const {accessToken, androidDeviceId, iOSDeviceId} = useSelector(
    selector.user,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataNew, setDataNew] = useState<any>();
  const [dataTestLesson, setDataTestLesson] = useState<any>();
  const [examId, setExamId] = useState<any>();
  const [questionSessionId, setQuestionSessionId] = useState<string>();
  const [listGame, setListGame] = useState<any>();

  const getListLessons = async ({payload}: {payload: ListLessons}) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<DataListLessons>({
        query: LIST_LESSON_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setListLessons(data?.listLessons);
      setIsLoading(false);
      return data?.listLessons;
    } catch (error) {
      console.log('onerror get list lessons', error);
    }
  };

  const getLessonDetail = async ({payload}: {payload: LessonId}) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<KidLessonInfo>({
        query: GET_LIST_LESSONS_DETAIL_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      dispatch(LessonActions.setLessonDetail(data?.kidLessonInfo));
      setIsLoading(false);
      return data?.kidLessonInfo;
    } catch (error) {
      console.log('onerror get lesson list detail', error);
    }
  };

  const getChallengeLessonDetail = async ({payload}: {payload: LessonId}) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<Challenge>({
        query: GET_CHALLENGE_LESSONS_DETAIL_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      dispatch(LessonActions.setChallengeLessonDetail(data?.kidLessonInfo));
      setIsLoading(false);
      return data?.kidLessonInfo;
    } catch (error) {
      console.log('onerror get challenge lesson detail', error);
    }
  };

  const getIntroductionLessonDetail = async ({
    payload,
  }: {
    payload: LessonId;
  }) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<Introduction>({
        query: GET_INTRODUCTION_LESSONS_DETAIL_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      dispatch(LessonActions.setIntroductionLessonDetail(data?.kidLessonInfo));
      setIsLoading(false);
      return data?.kidLessonInfo;
    } catch (error) {
      console.log('onerror get introduction lesson detail', error);
    }
  };

  const getQuizLessonDetail = async ({payload}: {payload: LessonId}) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<Questions>({
        query: GET_QUIZ_LESSONS_DETAIL_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setDataNew(data?.kidLessonInfo?.questions);
      const listQuizNew =
        (await data?.kidLessonInfo?.questions?.map(quiz => {
          const answersRandom = shuffleAnswersByOrder(quiz?.answers || []);
          return {
            ...quiz,
            answers: answersRandom,
          };
        })) || [];
      dispatch(LessonActions.setQuizLessonDetail(listQuizNew));
      setIsLoading(false);
      return data?.kidLessonInfo;
    } catch (error) {
      console.log('onerror get quiz lesson detail', error);
    }
  };

  const getStoryLessonDetail = async ({payload}: {payload: LessonId}) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<Story>({
        query: GET_STORY_LESSONS_DETAIL_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      dispatch(LessonActions.setStoryLessonDetail(data?.kidLessonInfo));
      setIsLoading(false);
      return data?.kidLessonInfo;
    } catch (error) {
      console.log('onerror get story lesson detail', error);
    }
  };

  const getGameLessonDetail = async ({payload}: {payload: LessonId}) => {
    try {
      setIsLoading(true);
      const {data} = await client.query<Game>({
        query: GET_GAME_LESSONS_DETAIL_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      dispatch(LessonActions.setGameLessonDetail(data?.kidLessonInfo));
      setIsLoading(false);
      return data?.kidLessonInfo;
    } catch (error) {
      console.log('onerror get game lesson detail', error);
    }
  };

  const startExam = async ({payload}: {payload: LevelId}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<StartExam>({
        mutation: START_EXAM_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setExamId(data?.startExam?._id);
      setDataTestLesson(data?.startExam?.questions);
      const listQuizNew =
        (await data?.startExam?.questions?.map(quiz => {
          const answersRandom = shuffleAnswersByOrder(quiz?.answers || []);
          return {
            ...quiz,
            answers: answersRandom,
          };
        })) || [];
      dispatch(LessonActions.setQuizFinalTestExam(listQuizNew));
      setIsLoading(false);
      return data?.startExam;
    } catch (error) {
      console.log('onerror get quiz final exam', error);
    }
  };

  const submitExam = async ({
    payload,
    questionId,
    answerKey,
    answerId,
  }: {
    payload: SubmitExam;
    questionId;
    answerKey;
    answerId;
  }) => {
    try {
      const {data} = await client.mutate<DataSubmitExam>({
        mutation: SUBMIT_EXAM_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      dispatch(
        LessonActions.setArrayAnswerLesson({
          questionId: questionId,
          answerKey: answerKey,
          answerId: answerId,
          status: 'completed',
          success: data?.submitExam?.success,
        }),
      );
      dispatch(
        LessonActions.setArrayQuizSubmitLesson({
          ...data?.submitExam,
        }),
      );
      dispatch(LessonActions.setQuizSubmitLesson(data?.submitExam));
      return data?.submitExam;
    } catch (error) {
      console.log('onerror get quiz final exam', error);
    }
  };

  const createQuestionSession = async ({payload}: {payload: LessonId}) => {
    try {
      setIsLoading(true);
      const {data} = await client.mutate<CreateQuestionSession>({
        mutation: CREATE_QUESTION_SESSION_QUERY,
        fetchPolicy: 'no-cache',
        variables: payload,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setQuestionSessionId(data?.createQuestionSession?._id);
      setIsLoading(false);
      return data?.createQuestionSession?._id;
    } catch (error) {
      console.log('onerror create question session', error);
    }
  };

  const getListGame = async () => {
    try {
      setIsLoading(true);
      const {data} = await client.query<ListGame>({
        query: LIST_GAME_QUERY,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setListGame(data?.listGame);
      setIsLoading(false);
      return data?.listGame;
    } catch (error) {
      console.log('onerror get list game', error);
    }
  };

  return {
    getListLessons,
    listLessons,
    getLessonDetail,
    getChallengeLessonDetail,
    getIntroductionLessonDetail,
    getQuizLessonDetail,
    dataNew,
    getStoryLessonDetail,
    getGameLessonDetail,
    isLoading,
    startExam,
    dataTestLesson,
    submitExam,
    examId,
    createQuestionSession,
    questionSessionId,
    getListGame,
    listGame,
  };
};
