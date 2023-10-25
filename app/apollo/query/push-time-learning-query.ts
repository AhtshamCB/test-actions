import {gql} from '@apollo/client';

export const PUSH_TIME_LEARNING_QUERY = gql`
  mutation pushTimeLearnings(
    $end: DateTime!
    $start: DateTime!
    $lessonId: MongoId!
  ) {
    pushTimeLearning(
      pushLearningTimeInput: {end: $end, start: $start, lessonId: $lessonId}
    ) {
      isAdded
    }
  }
`;
