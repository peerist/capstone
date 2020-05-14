import gql from 'graphql-tag'
//
// Getting userID or  searching by email, and creating a user
export const getUserId = gql`
    query GetUserId($email: String!){
      Users(where: {email: {_eq: $email}}) {
        Id
      }
    }
`
export const searchUserByEmail = gql`
query SearchUserByEmail($email: String!) {
  Users(where: {email: {_ilike: $email}}, limit: 5) {
    Id
    email
  }
}
`
export const addUser = gql`
    mutation AddUser($email: String!) {
      insert_Users(objects: {email: $email}) {
        returning {
          Id
          email
        }
      }
    }
`

//
// Papers
//
export const getSegmentsForPapersByUserId = gql`
query getSegmentsForPapersByUserId($userId: Int!) {
  Segment(where: {userId: {_eq: $userId}}) {
    currentVersion
    name
    id
    status
    history(order_by: {version: asc}) {
      content
      segmentId
      id
      version
    }
  }
}
`
export const addPaper = gql`
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
export const addSegmentToPaper = gql`
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
export const getUserPapers = gql`
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

export const sharePaper = gql`
mutation sharePaperWithCircle($circleId:Int,$paperId:Int) {
  insert_SharePaper(objects: {circleId: $circleId, paperId: $paperId}) {
    returning {
      circleId
      paperId
    }
  }
}
`
export const getPapersSharedWithCircle = gql`
query getPapersSharedWithCircle($circleId: Int) {
  __typename
  Paper(where: {SharePapers: {circleId: {_eq: $circleId}}}) {
    name
    currentVersion
    Id
    User {
      email
    }
  }
}
`
//
// Circles
//
export const createCircle = gql`
mutation createCircle($userId: Int!, $private: Boolean!, $subject: String!, $name: String!) {
  insert_Circles(objects: {AdminUserId: $userId, Private: $private, Subject: $subject, Name: $name}) {
    returning {
      Id
    }
  }
}
`

export const createCircleMembers = gql`
mutation createCircleMembers($objects: [CircleMembers_insert_input!]!) {
  insert_CircleMembers(objects: $objects) {
    affected_rows
  }
}
`
export const getCircleMembersById = gql`
query getCircleMembersById($Id: Int!) {
  CircleMembers(where: {CircleId: {_eq: $Id}}) {
    MemberUser {
      email
      Id
    }
  }
  Circles(where: {Id: {_eq: $Id}}) {
    Name
  }
}

`
export const getCircleMembershipForUserByEmail = gql`
query getCircleMembershipForUserByEmail($email: String!) {
  CircleMembers(where: {_or: [{MemberUser: {email: {_eq: $email}}}, {Circle: {Admin: {email: {_eq: $email}}}}]}, distinct_on: CircleId) {
    Circle {
      Id
      Admin {
        email
      }
      Name
      Subject
      CircleMembers {
        MemberUserId
      }
    }
  }
}
`

export const getPublicCircles = gql`
query getPublicCircles {
  Circles(where: {Private: {_eq: false}}) {
    Subject
    Name
    Id
    Admin {
      email
    }
    CircleMembers {
      MemberUserId
    }
  }
}
`
export const updateCircleNameSubjectPrivacyById = gql`
mutation updateCircleNameSubjectPrivacyById($Id: Int!, $Name: String!, $Subject: String!, $Privacy: Boolean!) {
  update_Circles(where: {Id: {_eq: $Id}}, _set: {Name: $Name, Subject: $Subject, Private: $Privacy}) {
    affected_rows
  }
}
`
//
// Segment Feedback
//
export const addFeedbackToSegmentBySegmentIdAndVersionAndUserId = gql`
mutation addFeedbackToSegmentBySegmentIdAndVersionAndUserId($segmentId: Int!, $content: String!, $versionId: Int!, $userId: Int!) {
  affectedSegmentFeedback: insert_SegmentFeedback(objects: {segmentVersionID: $versionId, sentenceFeedback: $content, userId: $userId}) {
    affected_rows
  }
  affectedSegment: update_Segment(where: {id: {_eq: $segmentId}}, _set: {status: 2}) {
    affected_rows
  }
}
`

//
// Segments
//
export const addSegment = gql`
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
export const getUserSegments = gql`
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
export const setSegmentStatus = gql`
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
export const getCurrentVersionBySegmentId = gql`
query getCurrentVersionBySegmentId($segmentId: Int!) {
  Segment(where: {id: {_eq: $segmentId}}) {
    currentVersion,
      name
  }
}
`
export const getSegmentVersionsAndFeedbackByIdAndVersion = gql`
query getSegmentVersionsAndFeedbackByIdAndVersion($segmentId: Int!, $version: Int!) {
  versions:SegmentVersion(where: {segmentId: {_eq: $segmentId}}, order_by: {version: asc}) {
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

export const setSegmentVersionById = gql`
mutation setSegmentVersionById($segmentId: Int!, $newVersionValue: Int!) {
  update_Segment(where: {id: {_eq: $segmentId}}, _set: {currentVersion: $newVersionValue}) {
    affected_rows
  }
}
`

export const setSegmentTitleById = gql`
mutation setSegmentTitleById($segmentId: Int!, $title: String!) {
  update_Segment(where: {id: {_eq: $segmentId}}, _set: {name: $title}) {
    returning {
      name
    }
  }
}
`

export const setSegmentVersionContentBySegmentIdAndVersion = gql`
mutation setSegmentVersionContentBySegmentIdAndVersion($segmentId: Int!, $version: Int!, $content: String!) {
  update_SegmentVersion(where: {segmentId: {_eq: $segmentId}, version: {_eq: $version}}, _set: {content: $content}) {
    returning {
      content
    }
  }
}
`

export const createNewVersionWithSegmentIdAndVersion = gql`
mutation createNewVersionWithSegmentIdAndVersion($segmentId: Int!, $version: Int!) {
  insert_SegmentVersion(objects: {segmentId: $segmentId, version: $version, content: "Please select this version to modify the content"}) {
    returning {
      id
    }
  }
}
`

export const getActiveSegmentsForReview = gql`
query getActiveSegmentsForReview($subjectCode:Int!) {
  Segment(where: {status: {_eq: 1}, Subject: {_eq: $subjectCode}}) {
    id
    name
    userId
    currentVersion
    Subject
    history(order_by: {version: asc}) {
      version
      id
      content
    }
  }
}
`

export const getSegmentVersionByVersionAndSegmentId = gql`
query getSegmentVersionByVersionAndSegmentId($version: Int!, $segmentId: Int!) {
  SegmentVersion(where: {segmentId: {_eq: $segmentId}, version: {_eq: $version}}) {
    content
    version
    id
  }
}
`
