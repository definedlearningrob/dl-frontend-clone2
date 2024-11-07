import { gql } from '@apollo/client';

export default gql`
  query LessonInCourse($courseId: ID!, $lessonId: ID!, $track: Boolean) {
    course(id: $courseId) {
      careerName
      hasInstitutionsInStudentState
      id
      lesson(id: $lessonId, track: $track) {
        assignments {
          description
          displayName
          id
          step
          submission {
            id
            files {
              filename
              googleWeblink
              id
              source
              url(options: { responseContentDisposition: "attachment" })
            }
            updatedAt
            status
            rubricGrade {
              pointsScored
              pointsAvailable
              results {
                criteriaId
                trait
              }
              lastGradedBy {
                firstName
                lastName
                fullName
                uuid
              }
            }
            grade {
              status
              updatedAt
              lastGradedBy {
                firstName
                lastName
                fullName
                uuid
              }
            }
          }
          rubrics {
            criteriaLabels {
              displayName
              id
              score
            }
            criterias {
              id
              rubricCriteriaLabelId
              rubricHeadingId
              text
            }
            description
            headings {
              id
              multiplier
              name
            }
            id
            name
            description
          }
        }
        attachments {
          description
          displayName
          files {
            filename
            id
            url(options: { responseContentDisposition: "attachment" })
          }
          id
          step
        }
        careerReviewSurvey {
          version
          performed
          questions {
            answer
            id
            options {
              option
              step
            }
            question
            type
          }
        }
        checkInGroups {
          displayName
          id
          questions {
            answer {
              answer
              checkInQuestionId
              id
              studentId
              updatedAt
              grade {
                lastGradedBy {
                  uuid
                  firstName
                  lastName
                }
                updatedAt
                status
              }
            }
            id
            question
          }
          step
        }
        checkInQuestions {
          answer {
            answer
            checkInQuestionId
            id
            studentId
            updatedAt
            grade {
              lastGradedBy {
                uuid
                firstName
                lastName
              }
              updatedAt
              status
            }
          }
          id
          question
          step
        }
        description {
          introduction
          goal
          role
          audience
          situation
        }
        hasPresentation
        id
        imageUrl
        name
        externalPresentations {
          displayName
          id
          source
          isExpandable
        }
        researchLinks {
          author
          displayName
          id
          resourceLink
          sourceName
          step
        }
        texts {
          content
          displayName
          id
          step
        }
        type
        videos {
          description
          displayName
          filename
          id
          url
          step
        }
        vocabularies {
          definition
          id
          step
          term
        }
      }
      lessons {
        id
        step
        careerReviewSurvey {
          performed
        }
      }
      name
      progress {
        submitted
        total
      }
      reviewSurvey {
        questions {
          id
        }
      }
      content {
        checkIns {
          completed
        }
        items {
          type
          completed
        }
      }
    }
  }
`;
