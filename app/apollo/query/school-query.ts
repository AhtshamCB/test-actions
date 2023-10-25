import {gql} from '@apollo/client';

export const ADD_STUDENTS_QUERY = gql`
  mutation addStudentMutation(
    $avatar: String
    $birthday: String
    $name: String!
    $password: String!
    $username: String!
  ) {
    addStudent(
      addStudentInput: {
        avatar: $avatar
        birthday: $birthday
        name: $name
        password: $password
        username: $username
      }
    ) {
      _id
      birthday
      avatar
      name
      username
    }
  }
`;

export const DELETE_STUDENT_QUERY = gql`
  mutation deleteStudentMutation($studentId: String!, $password: String!) {
    deleteStudent(
      deleteStudentInput: {studentId: $studentId, password: $password}
    ) {
      isSuccess
    }
  }
`;

export const GET_LIST_STUDENTS_QUERY = gql`
  query listStudentMutation(
    $gradeId: String
    $order: String
    $page: Int
    $pageSize: Int
    $sort: String
    $studentName: String
  ) {
    listStudent(
      listStudentInput: {
        gradeId: $gradeId
        order: $order
        page: $page
        pageSize: $pageSize
        sort: $sort
        studentName: $studentName
      }
    ) {
      totalCount
      totalPage
      page
      totalLearningTime
      data {
        _id
        avatar
        birthday
        name
        username
        createdAt
        gradeName
        learningTime
        rank
      }
    }
  }
`;

export const CREATE_CLASS_QUERY = gql`
  mutation createGradeMutation(
    $username: String!
    $avatar: String
    $password: String!
    $gradeName: String!
  ) {
    createGrade(
      createGradeInput: {
        username: $username
        avatar: $avatar
        password: $password
        gradeName: $gradeName
      }
    ) {
      _id
      gradeName
      avatar
      createdAt
    }
  }
`;

export const DELETE_CLASS_QUERY = gql`
  mutation deleteGradeMutation($gradeId: String!, $password: String!) {
    deleteGrade(deleteGradeInput: {gradeId: $gradeId, password: $password}) {
      isSuccess
    }
  }
`;

export const GET_GRADES_CLASS_QUERY = gql`
  query gradesMutation(
    $order: String
    $page: Int
    $pageSize: Int
    $sort: String
    $gradeName: String
    $all: Boolean
  ) {
    grades(
      gradesInput: {
        order: $order
        page: $page
        pageSize: $pageSize
        sort: $sort
        all: $all
        gradeName: $gradeName
      }
    ) {
      page
      totalPage
      totalCount
      totalLearningTime
      data {
        _id
        avatar
        createdAt
        gradeName
        username
        learningTime
        rank
      }
    }
  }
`;

export const GET_GRADES_FILTER_QUERY = gql`
  query gradesMutation($sort: String, $all: Boolean) {
    grades(gradesInput: {sort: $sort, all: $all}) {
      data {
        _id
        avatar
        createdAt
        gradeName
        username
      }
    }
  }
`;

export const UPDATE_CLASS_QUERY = gql`
  mutation updateGradeMutation(
    $gradeId: String!
    $gradeName: String
    $password: String
    $avatar: String
  ) {
    updateGrade(
      updateGradeInput: {
        gradeId: $gradeId
        gradeName: $gradeName
        password: $password
        avatar: $avatar
      }
    ) {
      _id
      avatar
      createdAt
      gradeName
      username
    }
  }
`;

export const SEND_NOTIFICATIONS_QUERY = gql`
  mutation sendNotifications($message: String!, $to: [String!]!) {
    sendNotifications(sendNotificationInput: {message: $message, to: $to}) {
      isSuccess
    }
  }
`;

export const LEARNING_DASHBOARD_QUERY = gql`
  query dashboardQueryData($lang: String!, $studentId: String) {
    learningDashboard(lang: $lang, studentId: $studentId) {
      currentLevel
      availableLevels
      levels {
        key
        name
      }
      leaderBoard {
        childId
        name
        avatar
        balance
      }
      summary {
        earning
        dayInTraining
        completedLessons
      }
      earningDetails {
        balance
        investments {
          rate
          balance
        }
        spending {
          rate
          balance
        }
        sharing {
          rate
          balance
        }
      }
      weeklyActivities {
        value
        timeName
        dateName
        shortDay
      }
    }
  }
`;
