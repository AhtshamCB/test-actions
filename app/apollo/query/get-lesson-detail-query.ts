import {gql} from '@apollo/client';

export const GET_LIST_LESSONS_DETAIL_QUERY = gql`
  query lessonInfo($lessonId: String!) {
    kidLessonInfo(lessonId: $lessonId) {
      _id
      curriculumLevelId
      status
      name
      order
      value
      currentPart
      questionStatus
    }
  }
`;
