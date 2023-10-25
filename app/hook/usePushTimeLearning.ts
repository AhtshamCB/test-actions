import client from '@app/apollo';
import {PUSH_TIME_LEARNING_QUERY} from '@app/apollo/query';
import {PushLearningTime} from '@app/models';
import {selector} from '@app/redux';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const usePushTimeLearning = (lessonId: string) => {
  const {i18n} = useTranslation();
  const [timeLearning, setTimeLearning] = useState(new Date());
  const {accessToken, androidDeviceId, iOSDeviceId} = useSelector(
    selector.user,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setTimeLearning(new Date());
    }, 1000);
  }, []);
  const pushLearningTime = async (timeStampLearning: Date) => {
    try {
      setIsLoading(true);
      const timestampStart = timeStampLearning.getTime();
      const date = new Date();
      const timestampEnd = date.getTime();

      const dataPost = {
        lessonId,
        start: timestampStart,
        end: timestampEnd,
      };
      await client.mutate<PushLearningTime>({
        mutation: PUSH_TIME_LEARNING_QUERY,
        fetchPolicy: 'no-cache',
        variables: dataPost,
        context: {
          headers: {
            authorization: accessToken,
            deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
            lang: i18n.language,
          },
        },
      });
      setIsLoading(false);
      setTimeout(() => {
        setTimeLearning(new Date());
      }, 1000);
    } catch (error) {
      console.log('onerror push learning time', error);
    }
  };
  const triggerSetTimeLearning = (value: Date) => {
    setTimeLearning(value);
  };
  return {
    pushLearningTime,
    isLoading,
    timeLearning,
    triggerSetTimeLearning,
  };
};
