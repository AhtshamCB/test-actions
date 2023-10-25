import {gql} from '@apollo/client';

export const GET_FEEDBACL_QUESTIONS_QUERY = gql`
  query feedback($type: String!) {
    feedbackQuestions(type: $type) {
      answers
      label
      answerType
      question
      min
      max
    }
  }
`;
