import {useMutation} from '@apollo/client';
import {PUSH_FCM_TOKEN_QUERY} from '@app/apollo/query';
import {PushFcmToken} from '@app/models';

export const usePushFcmToken = (
  accessToken?: string,
  fcmToken?: string,
  deviceId?: string,
  platform?: string,
) => {
  const [pushFcmToken] = useMutation<PushFcmToken>(PUSH_FCM_TOKEN_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
      },
    },
    variables: {
      fcmToken: fcmToken,
      deviceId: deviceId,
      platform: platform,
    },
    async onCompleted(data) {
      console.log('Data', data);
    },
    onError(err) {
      console.log('=>>>>> error push fcm token', err);
    },
  });
  return {
    pushFcmToken,
  };
};
