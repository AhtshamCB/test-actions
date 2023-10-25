import {gql} from '@apollo/client';

export const LIST_LESSON_QUERY = gql`
  query lessons($level: String!, $studentId: String) {
    listLessons(level: $level, studentId: $studentId) {
      data {
        _id
        name
        status
        order
      }
      isPassedExam
    }
  }
`;
