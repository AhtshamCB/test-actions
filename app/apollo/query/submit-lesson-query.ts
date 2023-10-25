import {gql} from '@apollo/client';

export const SUBMIT_LESSON_QUERY = gql`
  mutation submitLessons(
    $lessonId: String!
    $type: SubmitLessonEnum!
    $questionId: String
    $answerKey: String
    $score: Int
    $questionSessionId: String
  ) {
    submitLesson(
      lessonId: $lessonId
      type: $type
      questionId: $questionId
      questionSessionId: $questionSessionId
      answerKey: $answerKey
      score: $score
    ) {
      earned
      success
      rightAnswerKey
      rightAnswerId
      totalEarnedLevel
      totalEarnedQuiz
      questionSessionStatus
    }
  }
`;
