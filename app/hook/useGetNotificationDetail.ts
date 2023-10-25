import {useState} from 'react';
//
import {useLazyQuery} from '@apollo/client';
import {GET_NOTIFICATION_DETAIL_QUERY} from '@app/apollo/query';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {Platform} from 'react-native';

export const useGetNotificationDetail = (
  accessToken: string,
  notificationId: string,
) => {
  const {i18n} = useTranslation();
  const [notificationDetail, setNotificationDetail] = useState<any>();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const [getNotificationDetail, {loading: loadingNotificationDetail}] =
    useLazyQuery(GET_NOTIFICATION_DETAIL_QUERY, {
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
        notificationId: notificationId,
      },
      async onCompleted(data) {
        setNotificationDetail(data?.notification);
      },
      onError(err) {
        console.log('onerror get notification list', err);
      },
    });
  return {
    getNotificationDetail,
    loadingNotificationDetail,
    notificationDetail,
  };
};
