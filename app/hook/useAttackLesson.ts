import {useMutation} from '@apollo/client';
import {ATTACK_LESSON_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const useAttackLesson = (accessToken?: string, lessonId?: string) => {
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [attackLesson] = useMutation(ATTACK_LESSON_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
      },
    },
    variables: {
      lessonId: lessonId,
    },
    async onCompleted(data) {
      console.log('data', data);
    },
    onError(err) {
      console.log('=>>>> error attack lesson', err);
    },
  });
  return {
    attackLesson,
  };
};
