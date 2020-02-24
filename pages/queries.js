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
export const addSegment = `
    mutation AddSegment($segmentName: String!, $email: String!, $content: String!) {
        insert_Segment(objects: {name: $segmentName, User: {data: {email: $email}}, history: {data: {content: $content}}}) {
            returning {
                name
                status
                currentVersion
                id
                history {
                    content
                    version
                }
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

export const getUserPapers = `
    query getUserPapersQuery($email: String!) {
        Paper(where: {User: {email: {_eq: "manzoj@oregonstate.edu"}}}) {
            name
            Id
            segments {
                order
                Segment {
                    id
                    name
                    history {
                        content
                        SegmentFeedbacks {
                            User {
                                email
                            }
                            Id
                            sentenceFeedback
                        }
                    }
                }
            }
        }
    }
`

export const getCircleMembershipForUser = `
query getCircleMembershipForUserQuery($email: String!) {
  CircleMembers(where: {MemberUser: {email: {_eq: $email}}}) {
    Circle {
      Id
      Admin {
        email
      }
      CircleMembers {
        MemberUser {
          email
        }
      }
    }
  }
}
`
