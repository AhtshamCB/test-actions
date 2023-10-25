import {gql} from '@apollo/client';

export const START_EXAM_QUERY = gql`
  mutation startExamMutation($levelId: String!) {
    startExam(levelId: $levelId) {
      _id
      kidId
      questions {
        _id
        answers {
          _id
          key
          value
        }
        background {
          mobile
          web
        }
        question
      }
    }
  }
`;

export const SUBMIT_EXAM_QUERY = gql`
  mutation submitExamMutation(
    $examId: String!
    $questionId: String!
    $answerKey: String!
  ) {
    submitExam(
      submitExamInput: {
        examId: $examId
        questionId: $questionId
        answerKey: $answerKey
      }
    ) {
      examStatus
      rightAnswerId
      rightAnswerKey
      success
      totalRightAnswer
    }
  }
`;
