import { gql, TypedDocumentNode } from '@apollo/client';

import { TLesson as TBaseLesson } from '@dc/components/User/Lesson/types';

export const VIRTUAL_INTERNSHIP_LESSON: TypedDocumentNode<
  TVirtualInternshipLessonData,
  TVirtualInternshipLessonVariables
> = gql`
  query UserVirtualInternshipLesson($virtualInternshipId: ID!, $lessonId: ID!, $track: Boolean) {
    virtualInternship(id: $virtualInternshipId) {
      id
      opportunity {
        id
        name
      }
      lesson(id: $lessonId, track: $track) {
        assignments {
          description
          displayName
          id
          step
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
            id
            question
            step
          }
          step
        }
        checkInQuestions {
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
      }
    }
  }
`;

export type CheckInQuestion = Omit<TBaseLesson['checkInQuestions'][number], 'answer'>;
export type CheckInGroup = Omit<TBaseLesson['checkInGroups'][number], 'questions'> & {
  questions: CheckInQuestion[];
};
type Assignment = Omit<
  TBaseLesson['assignments'][number],
  'submission' | 'archivedAt' | 'createdAt' | 'assetName' | 'badges' | 'name' | 'lessons'
>;
type Attachment = Omit<TBaseLesson['attachments'][number], 'archivedAt' | 'createdAt'>;
type ExternalPresentation = Omit<TBaseLesson['externalPresentations'][number], 'archivedAt'>;
type ResearchLink = Omit<TBaseLesson['researchLinks'][number], 'archivedAt' | 'createdAt'>;
type Text = Omit<TBaseLesson['texts'][number], 'archivedAt' | 'createdAt'>;
type Video = Omit<TBaseLesson['videos'][number], 'archivedAt' | 'createdAt'>;
type Vocabulary = Omit<TBaseLesson['vocabularies'][number], 'archivedAt' | 'createdAt'>;

export type TLesson = Pick<
  TBaseLesson,
  'careerReviewSurvey' | 'description' | 'hasPresentation' | 'id' | 'imageUrl' | 'name' | 'type'
> & {
  assignments: Assignment[];
  attachments: Attachment[];
  checkInGroups: CheckInGroup[];
  checkInQuestions: CheckInQuestion[];
  externalPresentations: ExternalPresentation[];
  researchLinks: ResearchLink[];
  texts: Text[];
  videos: Video[];
  vocabularies: Vocabulary[];
};

export type TVirtualInternshipLessonData = {
  virtualInternship: {
    id: string;
    lesson: TLesson;
    opportunity: {
      id: string;
      name: string;
    };
  };
};

export type TVirtualInternshipLessonVariables = {
  virtualInternshipId: string;
  lessonId: string;
  track: boolean;
};
