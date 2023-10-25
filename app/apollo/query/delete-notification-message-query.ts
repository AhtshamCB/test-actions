import {gql} from '@apollo/client';

export const DELETE_MESSAGE_NOTIFICATION_QUERY = gql`
  mutation removeNotification($notificationId: MongoId!) {
    removeNotification(notificationId: $notificationId) {
      isSuccess
    }
  }
`;
