import {useLazyQuery} from '@apollo/client';
import {REASON_DELETE_USER_QUERY} from '@app/apollo/query';
import {selector} from '@app/redux';
import {useState} from 'react';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

export const useReasonDeleteUser = accessToken => {
  const [reason, setReason] = useState();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);
  const {i18n} = useTranslation();

  const [getReasonDeleteUser] = useLazyQuery(REASON_DELETE_USER_QUERY, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: accessToken,
        deviceId: Platform.OS === 'android' ? androidDeviceId : iOSDeviceId,
        lang: i18n.language,
      },
    },
    async onCompleted(data) {
      const itemReasonToShow = data?.initDeleteUser?.reasons?.map(
        (item, index) => {
          return {
            id: index,
            reason: item,
            selected: false,
          };
        },
      );
      setReason(itemReasonToShow);
    },
    onError(err) {
      console.log('=>>> error get reason delete user', err);
    },
  });
  return {
    getReasonDeleteUser,
    reason,
    setReason,
  };
};
