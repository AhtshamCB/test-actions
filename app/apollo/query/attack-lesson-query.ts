import {gql} from '@apollo/client';

export const ATTACK_LESSON_QUERY = gql`
  mutation attackLesson($lessonId: String!) {
    attackLesson(lessonId: $lessonId) {
      created
    }
  }
`;
