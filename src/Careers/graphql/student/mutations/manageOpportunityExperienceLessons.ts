import { gql, TypedDocumentNode } from '@apollo/client';

import { TVirtualInternshipLesson } from '@dc/resources/types';

import { TVirtualInternshipContent } from '../queries/virtualInternshipContent';

export const MANAGE_OPPORTUNITY_EXPERIENCE_LESSONS: TypedDocumentNode<
  TManageOpportunityExperienceLessonsData,
  TManageOpportunityExperienceLessonsVariables
> = gql`
  mutation ManageOpportunityExperienceLessons(
    $input: ManageOpportunityExperienceLessonsMutationInput!
  ) {
    manageOpportunityExperienceLessons(input: $input) {
      virtualInternship {
        id
        studentExperienceOpportunityLessons {
          type
          id
          name
          thumbnailUrl
          progress {
            submitted
            total
          }
        }
        content {
          id
          name
          items {
            id
            name
            type
            completed
          }
          checkIns {
            id
            name
            type
            completed
          }
          type
        }
      }
    }
  }
`;

export type TManageOpportunityExperienceLessonsData = {
  manageOpportunityExperienceLessons: {
    virtualInternship: {
      id: string;
      studentExperienceOpportunityLessons: TVirtualInternshipLesson[];
      content: TVirtualInternshipContent[];
    };
  };
};
export type TManageOpportunityExperienceLessonsInput = {
  lessonIds: string[];
  virtualInternshipId: string;
};

export type TManageOpportunityExperienceLessonsVariables = {
  input: TManageOpportunityExperienceLessonsInput;
};
