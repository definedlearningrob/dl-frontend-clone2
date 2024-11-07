import { TypedDocumentNode, gql } from '@apollo/client';

import {
  TVirtualInternship,
  VirtualInternshipLessonAttributes,
  VirtualInternshipStatuses,
} from '@dc/components/Admin/VirtualInternships/types';

export const UPDATE_VIRTUAL_INTERNSHIP: TypedDocumentNode<
  TUpdateVirtualInternshipData,
  TUpdateVirtualInternshipMutationInput
> = gql`
  mutation UpdateVirtualInternship($input: UpdateVirtualInternshipMutationInput!) {
    updateVirtualInternship(input: $input) {
      virtualInternship {
        archivedAt
        status
        id
        opportunity {
          id
          name
          availableSpots
          creditsOutcomes
          description
          imageUrl
          opportunityType
          pathways {
            id
            name
          }
          tags
        }
        requiredExperiences
      }
    }
  }
`;

export type TUpdateVirtualInternshipMutationInput = {
  input: {
    description: string;
    name: string;
    pathwayIds: string[];
    availableSpots: number;
    creditsOutcomes: string;
    tags: string[];
    status: VirtualInternshipStatuses;
    requiredExperiences: number;
    calendarLessons: VirtualInternshipLessonAttributes[];
    experienceOpportunityLessons: VirtualInternshipLessonAttributes[];
    postExperienceLessons: VirtualInternshipLessonAttributes[];
    readinessSkillsLessons: VirtualInternshipLessonAttributes[];
  };
};

export type TUpdateVirtualInternshipData = {
  updateVirtualInternship: {
    virtualInternship: TVirtualInternship;
  };
};
