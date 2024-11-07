import { gql, TypedDocumentNode } from '@apollo/client';

import { LESSON_TYPES } from '@dc/resources/constants';

import { ToStringLiteral } from '@shared/utils/types';

export const VIRTUAL_INTERNSHIP_CONTENT_QUERY: TypedDocumentNode<
  TVirtualInternshipContentData,
  TVirtualInternshipContentVariables
> = gql`
  query VirtualInternshipContent($opportunityId: ID!) {
    opportunity(id: $opportunityId) {
      id
      virtualInternship {
        postExperienceLessons {
          id
          careerReviewSurvey {
            performed
            version
          }
        }
        studentExperienceOpportunityLessons {
          id
        }
        requiredExperiences
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

type TVirtualInternshipContentVariables = {
  opportunityId: string;
};

export type TVirtualInternshipContentData = {
  opportunity: {
    id: string;
    virtualInternship: {
      roadmapItemsCount: number;
      content: TVirtualInternshipContent[];
      postExperienceLessons: {
        id: string;
        careerReviewSurvey: {
          performed: boolean;
          version: number;
        };
      }[];
      studentExperienceOpportunityLessons: {
        id: string;
      }[];
      requiredExperiences: number;
    };
  };
};

export type TVirtualInternshipContent = {
  id: string;
  name: string;
  type: ToStringLiteral<typeof LESSON_TYPES>;
  items: TLessonItem[];
  checkIns: TLessonItem[];
};

export type TLessonItem = {
  id: string;
  name: string;
  type: string;
  completed: boolean;
};
