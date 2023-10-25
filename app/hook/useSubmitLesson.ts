import {useMutation} from '@apollo/client';
import {SUBMIT_LESSON_QUERY} from '@app/apollo/query';
import {LessonActions, selector} from '@app/redux';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useSubmitLesson = (
  accessToken?: string,
  lessonId?: string,
  type?: string,
  questionId?: string,
  answerKey?: string,
  answerId?: string,
  questionSessionId?: string,
) => {
  const dispatch = useDispatch();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [submitLesson] = useMutation(SUBMIT_LESSON_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
      },
    },
    variables: {
      lessonId: lessonId,
      type: type,
      questionId: questionId,
      answerKey: answerKey,
      questionSessionId: questionSessionId,
    },
    async onCompleted(data) {
      if (type === 'question') {
        dispatch(
          LessonActions.setArrayAnswerLesson({
            questionId: questionId,
            answerKey: answerKey,
            answerId: answerId,
            success: data?.submitLesson?.success,
            status: 'completed',
          }),
        );
        dispatch(
          LessonActions.setArrayQuizSubmitLesson({
            ...data?.submitLesson,
            status: 'completed',
          }),
        );
        console.log('data?.submitLesson', data?.submitLesson);
        dispatch(LessonActions.setQuizSubmitLesson(data?.submitLesson));
      } else {
        dispatch(LessonActions.setSubmitLesson(data?.submitLesson));
      }
    },
    onError(err) {
      console.log('=>>>> error submit lesson', err);
    },
  });
  return {
    submitLesson,
  };
};
