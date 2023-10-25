import {gql} from '@apollo/client';

export const READ_NOTIFICATION_QUERY = gql`
  mutation readNotification($notificationId: MongoId!) {
    readNotification(notificationId: $notificationId) {
      _id
      body
      createdAt
      imageUrl
      isRead
      title
      data
    }
  }
`;
