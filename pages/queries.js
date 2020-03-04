export const getUserId = `
    query GetUserId($email: String!){
      Users(where: {email: {_eq: $email}}) {
        Id
      }
    }
`

export const searchUserByEmail = `
query SearchUserByEmail($email: String!) {
  Users(where: {email: {_ilike: $email}}, limit: 5) {
    Id
    email
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
    mutation AddSegment($segmentName: String!, $id: Int!, $content: String!) {
        insert_Segment(objects: {name: $segmentName, history: {data: {content: $content}}, userId: $id}) {
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

export const addPaper = `
mutation AddPaper($email: String!, $name: String!) {
    insert_Paper(objects: {User: {data: {email: $email}}, name: $name}) {
        returning {
            name
            Id
            currentVersion
        }
    }
}
`

export const createCircleAdmin = `
mutation CreateCircleAdmin($email: String!) {
  insert_Circles(objects: {Admin: {data: {email: $email}}}) {
    returning {
      Id
    }
  }
}
`

export const addSegmentToPaper = `
mutation AddSegmentToPaper($paperId: Int!, $order: Int!, $segmentId: Int!) {
    insert_PaperSegment(objects: {paperId: $paperId, order: $order, atVersion: 1, segmentId: $segmentId}) {
        returning {
            Id
            atVersion
            order
        }
    }
}
`

export const getUserSegments = `
query getUserSegmentsQuery($id: Int!) {
    active:Segment(where: {userId: {_eq: $id}, status: {_eq: 1}}) {
        status
        name
        id
        currentVersion
      }
      inactive:Segment(where: {userId: {_eq: $id}, status: {_eq: 0}}) {
        status
        name
        id
        currentVersion
      }
    }
  `

export const getUserPapers = `
    query getUserPapersQuery($email: String!) {
        Paper(where: {User: {email: {_eq: $email}}}) {
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

export const setSegmentStatus = `
mutation setSegmentStatus($segmentId: Int!, $newStatus: Int) {
  update_Segment(where: {id: {_eq: $segmentId}}, _set: {status: $newStatus}) {
    returning {
      id
      name
      status
      currentVersion
    }
  }
}
`

export const getCurrentVersionBySegmentId = `
query getCurrentVersionBySegmentId($segmentId: Int!) {
  Segment(where: {id: {_eq: $segmentId}}) {
    currentVersion
  }
}
`

export const getSegmentVersionsAndFeedbackByIdAndVersion = `
query getSegmentVersionsAndFeedbackByIdAndVersion($segmentId: Int!, $version: Int!) {
  versions:SegmentVersion(where: {segmentId: {_eq: $segmentId}}) {
    text:content
    id
    version
  }
  feedback:SegmentFeedback(where: {SegmentVersion: {segmentId: {_eq: $segmentId}, version: {_eq: $version}}}) {
    Id
    text:sentenceFeedback
    User {
      email
    }
  }
}
`

export const setSegmentVersionById = `
mutation setSegmentVersionById($segmentId: Int!, $newVersionValue: Int!) {
  update_Segment(where: {id: {_eq: $segmentId}}, _set: {currentVersion: $newVersionValue}) {
    affected_rows
  }
}
`
