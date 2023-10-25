import {useMutation} from '@apollo/client';
import {DELETE_MESSAGE_NOTIFICATION_QUERY} from '@app/apollo/query';
import {ConfigActions, selector} from '@app/redux';
import {useDispatch, useSelector} from 'react-redux';
import {showToastMessage} from '@app/utils';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';

export const useDeleteNotificationMessage = (
  accessToken?: string,
  notificationId?: string,
  onCompletedDelete?: () => void,
) => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const {androidDeviceId, iOSDeviceId} = useSelector(selector.user);

  const {notificationsList} = useSelector(selector.config);

  const [deleteNotificationMessage] = useMutation(
    DELETE_MESSAGE_NOTIFICATION_QUERY,
    {
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
        if (data?.removeNotification?.isSuccess) {
          const listNotificationsNew = notificationsList.filter(
            x => x._id !== notificationId,
          );
          dispatch(ConfigActions.setNotificationList(listNotificationsNew));
          onCompletedDelete && onCompletedDelete();
          showToastMessage('Delete Message Successfully', 'success', {
            bottomOffset: 80,
          });
        } else {
          showToastMessage('Delete Message Failed', 'error', {
            bottomOffset: 80,
          });
        }
      },
      onError(err) {
        console.log('=>>>> error delete notification message', err);
      },
    },
  );
  return {
    deleteNotificationMessage,
  };
};
