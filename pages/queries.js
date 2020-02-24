export const getUserId = `
    query GetUserId($email: String!){
      Users(where: {email: {_eq: $email}}) {
        Id
      }
    }
`
export const addUser = `
    mutation AddUser($email: String!) {
      insert_Users(objects: {email: $email}) {
        returning {
          Id
          email
        }
      }
    }
`
export const getUserSegments = `
    query getUserSegmentsQuery($email: String!) {
        Segment(where: {User: {email: {_eq: $email}}}) {
            name
            status
            id
            currentVersion
            history {
                content
                id
                version
                SegmentFeedbacks {
                    Id
                    sentenceFeedback
                    User {
                        email
                    }
                }
            }
        }
    }
  `

