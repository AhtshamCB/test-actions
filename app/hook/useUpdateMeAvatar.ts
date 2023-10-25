import {useMutation} from '@apollo/client';
import {UPDATE_AVATAR_ME_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {showToastMessage} from '@app/utils';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const useUpdateMeAvatar = (accessToken: string, avatar?: string) => {
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [updateMeAvatar] = useMutation(UPDATE_AVATAR_ME_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
      },
    },
    variables: {
      avatar: avatar,
    },
    async onCompleted() {
      showToastMessage('Change Avatar Successfully', 'success', {
        bottomOffset: 80,
      });
    },
    onError(err) {
      console.log('=>>> error update me avatar', err);
      showToastMessage('Change Avatar Failed', 'error', {
        bottomOffset: 80,
      });
    },
  });
  return {
    updateMeAvatar,
  };
};
