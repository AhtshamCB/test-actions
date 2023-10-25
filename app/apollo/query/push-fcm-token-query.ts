import {gql} from '@apollo/client';

export const PUSH_FCM_TOKEN_QUERY = gql`
  mutation pushFcmToken(
    $fcmToken: String!
    $deviceId: String!
    $platform: String!
  ) {
    pushFcmToken(
      fcmToken: $fcmToken
      deviceId: $deviceId
      platform: $platform
    ) {
      added
    }
  }
`;
