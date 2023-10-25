import {gql} from '@apollo/client';

export const SCHOOL_DASHBOARD_QUERY = gql`
  query {
    schoolDashboard {
      totalCompletedLesson
      totalDayInTraining
      totalStudentJoined
      totalClass
      currentLevel
    }
  }
`;

export const SCHOOL_LEADERBOARD_QUERY = gql`
  query {
    schoolLeaderBoard {
      avatar
      balance
      name
      studentId
    }
  }
`;

export const ONLINE_STUDENTS_QUERY = gql`
  query {
    onlineStudents {
      _id
      avatar
      name
    }
  }
`;

export const UPDATE_SCHOOL_DASHBOARD_QUERY = gql`
  mutation updateSchoolMutation(
    $firstName: String
    $lastName: String
    $educatorRole: String
    $schoolName: String
    $address: String
    $country: String
  ) {
    updateSchool(
      updateSchoolInput: {
        firstName: $firstName
        lastName: $lastName
        educatorRole: $educatorRole
        schoolName: $schoolName
        address: $address
        country: $country
      }
    ) {
      _id
      address
      avatar
      country
      educatorRole
      email
      firstName
      lastName
      schoolName
      title
    }
  }
`;

export const STUDENT_PERFORMANCE_QUERY = gql`
  query {
    schoolDashboard {
      studentPerformance {
        dateName
        timeName
        shortDay
        value
      }
    }
  }
`;

export const LEARNING_HOURS_QUERY = gql`
  query {
    schoolDashboard {
      learningHours {
        learningTimeStr
        learningTime
        name
      }
    }
  }
`;
