import { gql, TypedDocumentNode } from '@apollo/client';

import { TLesson as TBaseLesson } from '@dc/components/Student/Lesson/types';

export const VIRTUAL_INTERNSHIP_LESSON_QUERY: TypedDocumentNode<
  TLessonQueryData,
  TLessonQueryVariables
> = gql`
  query VirtualInternshipLesson($opportunityId: ID!, $lessonId: ID!, $track: Boolean) {
    opportunity(id: $opportunityId) {
      name
      virtualInternship {
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
              status
              grade {
                status
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
                grade {
                  lastGradedBy {
                    uuid
                    firstName
                    lastName
                  }
                  status
                }
              }
              id
              question
              step
            }
            step
          }
          checkInQuestions {
            answer {
              answer
              checkInQuestionId
              id
              studentId
              grade {
                lastGradedBy {
                  uuid
                  firstName
                  lastName
                }
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
            step
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
          progress {
            accepted
            submitted
            total
          }
        }
      }
    }
  }
`;

export type TLesson = Omit<TBaseLesson, 'step' | 'extensionFields' | 'thumbnailUrl'>;

export type TLessonQueryData = {
  opportunity: {
    name: string;
    virtualInternship: {
      id: string;
      lesson: TLesson;
    };
  };
};

type TLessonQueryVariables = {
  opportunityId: string;
  lessonId: string;
  track: boolean;
};
