import {useMutation} from '@apollo/client';
import {LOGOUT_QUERY} from '@app/apollo/query';
import {PushFcmToken} from '@app/models';
import {selector} from '@app/redux';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const useLogout = (accessToken?: string) => {
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [logout] = useMutation<PushFcmToken>(LOGOUT_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
      },
    },
    async onCompleted(data) {
      console.log('Data logout', data);
    },
    onError(err) {
      console.log('=>>>>> error logout', err);
    },
  });
  return {
    logout,
  };
};
