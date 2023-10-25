import {gql} from '@apollo/client';

export const MY_DASHBOARD_QUERY = gql`
  query {
    learningDashboard(lang: "vi") {
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
          gameBalance
        }
        spending {
          rate
          balance
          gameBalance
        }
        sharing {
          rate
          balance
          gameBalance
        }
      }
      weeklyActivities {
        dateName
        shortDay
        timeName
        value
      }
    }
  }
`;
