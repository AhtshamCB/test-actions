import {gql} from '@apollo/client';

export const GET_CHALLENGE_LESSONS_DETAIL_QUERY = gql`
  query lessonInfo($lessonId: String!) {
    kidLessonInfo(lessonId: $lessonId) {
      challenge {
        guide
        status
        src
        earned
        earning
      }
    }
  }
`;

export const GET_INTRODUCTION_LESSONS_DETAIL_QUERY = gql`
  query lessonInfo($lessonId: String!) {
    kidLessonInfo(lessonId: $lessonId) {
      introduction {
        guide
        status
        src {
          hashCode
          videoId
        }
        earned
        earning
      }
    }
  }
`;

export const GET_QUIZ_LESSONS_DETAIL_QUERY = gql`
  query lessonInfo($lessonId: String!) {
    kidLessonInfo(lessonId: $lessonId) {
      questions {
        rightAnswerKey
        _id
        background {
          mobile
        }
        status
        answerKey
        answers {
          _id
          key
          value
        }
        earned
        earning
        order
        question
      }
    }
  }
`;

export const GET_STORY_LESSONS_DETAIL_QUERY = gql`
  query lessonInfo($lessonId: String!) {
    kidLessonInfo(lessonId: $lessonId) {
      story {
        status
        src {
          hashCode
          videoId
        }
        earned
        earning
      }
    }
  }
`;

export const GET_GAME_LESSONS_DETAIL_QUERY = gql`
  query lessonInfo($lessonId: String!) {
    kidLessonInfo(lessonId: $lessonId) {
      game {
        guide
        status
        src
        earned
        earning
      }
    }
  }
`;
