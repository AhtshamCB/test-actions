import {useMutation} from '@apollo/client';
import {PUSH_FEEDBACK_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const usePushFeedback = (
  accessToken?: string,
  question1?: string,
  question2?: string,
  question3?: string,
) => {
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);
  const {i18n} = useTranslation();

  const [pushFeedback] = useMutation(PUSH_FEEDBACK_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
        lang: i18n.language,
      },
    },
    variables: {
      type: 'beta',
      value: {
        question1: question1,
        question2: question2,
        question3: question3,
      },
    },
    async onCompleted(data) {
      console.log('Data', data);
    },
    onError(err) {
      console.log('=>>>>> error push feedback', err);
    },
  });
  return {
    pushFeedback,
  };
};
