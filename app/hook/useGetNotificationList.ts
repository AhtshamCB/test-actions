import {useState} from 'react';
//
import {useLazyQuery} from '@apollo/client';
import {GET_NOTIFICATION_LIST_QUERY} from '@app/apollo/query';
import {useTranslation} from 'react-i18next';
import uniqBy from 'lodash/uniqBy';
import {useDispatch, useSelector} from 'react-redux';
import {ConfigActions, selector} from '@app/redux';
import {Platform} from 'react-native';

export const useGetNotificationList = (
  accessToken: string,
  lastNotificationTime?: string | null,
) => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const {notificationsList} = useSelector(selector.config);

  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);
  const [dataNotiLength, setDataNotiLength] = useState<any>();
  const [getNotificationList, {loading: loadingNotificationList}] =
    useLazyQuery(GET_NOTIFICATION_LIST_QUERY, {
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
        take: 10,
        lastNotificationTime: lastNotificationTime,
      },
      async onCompleted(data) {
        const res = (notificationsList || []).concat(
          data?.notifications?.notifications,
        );
        setDataNotiLength(data?.notifications?.notifications);
        dispatch(ConfigActions.setNotificationList(uniqBy(res, x => x._id)));
      },
      onError(err) {
        console.log('onerror get notification list', err);
      },
    });
  return {
    getNotificationList,
    loadingNotificationList,
    dataNotiLength,
  };
};
