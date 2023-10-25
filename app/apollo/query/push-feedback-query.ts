import {gql} from '@apollo/client';

export const PUSH_FEEDBACK_QUERY = gql`
  mutation pushFeedbackMutation($type: String!, $value: Any!) {
    pushFeedback(feedback: {type: $type, value: $value}) {
      isAdded
    }
  }
`;
