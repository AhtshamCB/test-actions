import {gql} from '@apollo/client';

export const LIST_GAME_QUERY = gql`
  query {
    listGame {
      isEnabled
      src
      thumbnail
    }
  }
`;
