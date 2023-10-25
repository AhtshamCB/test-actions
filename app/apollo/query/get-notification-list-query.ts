import {gql} from '@apollo/client';

export const GET_NOTIFICATION_LIST_QUERY = gql`
  query notification($take: Int!, $lastNotificationTime: DateTime) {
    notifications(take: $take, lastNotificationTime: $lastNotificationTime) {
      unread
      notifications {
        _id
        body
        createdAt
        data
        imageUrl
        isRead
        title
      }
    }
  }
`;
