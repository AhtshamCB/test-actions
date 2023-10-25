import {useMutation} from '@apollo/client';
import {DELETE_ACCOUNT_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const useDeleteAccount = (
  accessToken?: string,
  reason?: string,
  adviseUs?: string,
  onCompletedDeleteUser?: () => void,
) => {
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [deleteUser] = useMutation(DELETE_ACCOUNT_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
      },
    },
    variables: {
      reason: reason,
      adviseUs: adviseUs,
    },
    async onCompleted() {
      onCompletedDeleteUser && onCompletedDeleteUser();
    },
    onError(err) {
      console.log('=>>>> error delete account', err);
    },
  });
  return {
    deleteUser,
  };
};
