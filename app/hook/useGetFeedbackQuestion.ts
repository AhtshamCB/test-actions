import {useLazyQuery} from '@apollo/client';
import {GET_FEEDBACL_QUESTIONS_QUERY} from '@app/apollo/query';
import {FeedbackData} from '@app/models';
import {selector} from '@app/redux';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
//

export const useGetFeedbackQuestions = (accessToken: string) => {
  const {i18n} = useTranslation();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [feedbackQuestions, setFeedbackQuestions] = useState<any>();

  const [getFeedbackQuestions, {loading: loadingGetFeedbackQuestions}] =
    useLazyQuery<FeedbackData>(GET_FEEDBACL_QUESTIONS_QUERY, {
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
      context: {
        headers: {
          authorization: accessToken,
          deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
          lang: i18n.language,
        },
      },
      variables: {
        type: 'beta',
      },
      async onCompleted(data) {
        console.log('data', data);
        setFeedbackQuestions(data);
      },
      onError(err) {
        console.log('=>>> error get feedback question', err);
      },
    });
  return {
    getFeedbackQuestions,
    loadingGetFeedbackQuestions,
    feedbackQuestions,
  };
};
