import {useMutation} from '@apollo/client';
import {SUBMIT_LESSON_QUERY} from '@app/apollo/query';
import {LessonActions, selector} from '@app/redux';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useSubmitGameLesson = (
  accessToken?: string,
  lessonId?: string,
  type?: string,
  score?: number,
) => {
  const dispatch = useDispatch();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [submitGameLesson] = useMutation(SUBMIT_LESSON_QUERY, {
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
      questionId: '',
      answerKey: '',
      score: score,
    },
    async onCompleted(data) {
      dispatch(LessonActions.setSubmitLesson(data?.submitLesson));
    },
    onError(err) {
      console.log('=>>>> error submit lesson', err);
    },
  });
  return {
    submitGameLesson,
  };
};
