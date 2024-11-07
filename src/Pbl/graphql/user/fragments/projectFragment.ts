import { gql } from '@apollo/client';

export default gql`
  fragment ProjectData on Task {
    assignedStudentsCount
    copies {
      id
    }
    checkInGroups {
      displayName
      id
      name
      questions {
        id
        gradingNeededCount
        question
        step
        isHidden
        owner {
          uuid
        }
      }
      step
    }
    checkInQuestions {
      id
      gradingNeededCount
      question
      step
      owner {
        uuid
      }
    }
    checkInsGradingNeededCount
    courses {
      id
      name
      thumbnailUrl
      pathwayName
      type
    }
    description
    displayName
    files {
      description
      displayName
      filename
      id
      step
      url
    }
    id
    introduction
    owner {
      uuid
    }
    presentation(track: $trackPresentation) {
      color
      description
      displayName
      id
      name
      slides {
        products {
          id
          name
          displayName
          description
          submissionsGradingNeededCount
          gradingNeededCount
          rubrics {
            canEdit
            description
            displayName
            hasAlignedStatements
            id
            name
            pointsAvailable
            uuid
            criterias {
              id
              rubricCriteriaLabelId
              rubricHeadingId
              text
              uuid
            }
            criteriaLabels {
              displayName
              id
              score
              uuid
            }
            headings {
              id
              multiplier
              name
              uuid
            }
          }
          rubricsUrl
          step
        }
        checkInQuestions {
          gradingNeededCount
          id
          isArchived
          question
          step
          owner {
            email
            firstName
            lastName
            username
            uuid
          }
        }
        checkInGroups {
          displayName
          id
          name
          questions {
            id
            question
            step
          }
        }
        backgroundColor
        backgroundImage
        content {
          id
          images {
            contentId
            id
            url
            style
            thumbnailUrl
            position
          }
          links {
            targetId
            targetName
            text
            contentId
          }
          texts {
            contentId
            type
            value
            style
          }
          videos {
            id
            contentId
            url
            filename
            videoUrl
          }
        }
        description
        id
        iframeUrl
        name
        notes
        step
        template
        subslides {
          backgroundColor
          backgroundImage
          content {
            id
            images {
              contentId
              id
              url
              style
              position
            }
            links {
              targetId
              targetName
              text
              contentId
            }
            texts {
              contentId
              type
              value
              style
            }
            videos {
              id
              contentId
              url
              filename
              videoUrl
            }
          }
          description
          id
          iframeUrl
          name
          notes
          step
          template
        }
      }
      type
      status
      transition
      typography
    }
    presentationUrl
    sharedResource {
      allowLogin
      code
    }
    standard
    status
    studentResources
    submissionsGradingNeededCount
    teachingResources
    units {
      displayName
      id
    }
    thumbnailUrl
  }
`;
