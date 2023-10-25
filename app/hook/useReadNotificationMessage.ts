import {useMutation} from '@apollo/client';
import {READ_NOTIFICATION_QUERY} from '@app/apollo/query';
import {ConfigActions, selector} from '@app/redux';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';

export const useReadNotificationMessage = (
  accessToken?: string,
  notificationId?: string,
) => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);
  const {notificationsList} = useSelector(selector.config);

  const [readNotificationMessage] = useMutation(READ_NOTIFICATION_QUERY, {
    fetchPolicy: 'no-cache',
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
      const res = notificationsList?.map(item => {
        if (item?._id === data?.readNotification?._id) {
          return {...item, isRead: true};
        }
        return item;
      });
      dispatch(ConfigActions.setNotificationList(res));
    },
    onError(err) {
      console.log('=>>>> error read notification message', err);
    },
  });
  return {
    readNotificationMessage,
  };
};
