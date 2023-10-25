import {gql} from '@apollo/client';

export const GET_NOTIFICATION_DETAIL_QUERY = gql`
  query notificationDetail($notificationId: MongoId!) {
    notification(notificationId: $notificationId) {
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
