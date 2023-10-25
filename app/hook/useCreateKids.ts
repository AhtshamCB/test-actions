import {useMutation} from '@apollo/client';
import {CREATE_CHILD_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {showToastMessage} from '@app/utils';
import {useState} from 'react';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const useCreateKids = (
  accessToken?: string,
  name?: string,
  username?: string,
  password?: string,
  birthday?: string,
  avatar?: string,
  onCompletedCreateChild?: () => void,
  onFailedCreateChild?: () => void,
) => {
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [dataCreateKids, setDataCreateKids] = useState<any>();
  const [createChild] = useMutation(CREATE_CHILD_QUERY, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
      },
    },
    variables: {
      name: name,
      username: username,
      password: password,
      birthday: birthday,
      avatar: avatar,
    },
    async onCompleted(data) {
      setDataCreateKids(data);
      onCompletedCreateChild && onCompletedCreateChild();
    },
    onError(err) {
      showToastMessage(err.message, 'error', {
        bottomOffset: 80,
      });
      // showToastMessage('Add Kid Failed', 'error', {
      //   bottomOffset: 80,
      // });
      console.log('=>>>>> error create kids', err);
      onFailedCreateChild && onFailedCreateChild();
    },
  });
  return {
    createChild,
    dataCreateKids,
  };
};
