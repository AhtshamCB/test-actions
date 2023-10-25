import {gql} from '@apollo/client';

export const ME_QUERY = gql`
  query {
    me(lang: "vi") {
      _id
      address
      avatar
      birthday
      email
      firstName
      gender
      lastName
      name
      subscriptionStatus
      paymentCard {
        paymentMethodId
      }
      role
      status
      id
      username
      isSubscribed
      country
      school {
        address
        schoolName
        title
        educatorRole
        studentLimit
        accessStatus
        subscriptionPlan
        interval
        expireTime
      }
      grade {
        gradeName
        gradeId
        accessStatus
        schoolName
      }
      student {
        name
        kidId
        schoolName
      }
      kid {
        kidId
        name
      }
      parent {
        parentId
      }
    }
  }
`;
