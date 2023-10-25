import {gql} from '@apollo/client';

export const CREATE_QUESTION_SESSION_QUERY = gql`
  mutation createQuestionSessionMutation($lessonId: MongoId!) {
    createQuestionSession(lessonId: $lessonId) {
      _id
    }
  }
`;
