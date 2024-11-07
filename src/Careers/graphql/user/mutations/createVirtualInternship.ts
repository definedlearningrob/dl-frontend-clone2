import { TypedDocumentNode, gql } from '@apollo/client';

import {
  TVirtualInternship,
  VirtualInternshipLessonAttributes,
  VirtualInternshipStatuses,
} from '@dc/components/Admin/VirtualInternships/types';

export const CREATE_VIRTUAL_INTERNSHIP: TypedDocumentNode<
  TCreateVirtualInternshipData,
  TCreateVirtualInternshipMutationInput
> = gql`
  mutation CreateVirtualInternship($input: CreateVirtualInternshipMutationInput!) {
    createVirtualInternship(input: $input) {
      virtualInternship {
        archivedAt
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

export type TCreateVirtualInternshipMutationInput = {
  input: {
    description: string;
    name: string;
    pathwayIds: string[];
    availableSpots: number;
    creditsOutcomes: string;
    tags: string[];
    status: VirtualInternshipStatuses;
    requiredExperiences: number;
    calendarLessonsIds: VirtualInternshipLessonAttributes[];
    experienceOpportunityLessonsIds: VirtualInternshipLessonAttributes[];
    postExperienceLessonsIds: VirtualInternshipLessonAttributes[];
    readinessSkillsLessonsIds: VirtualInternshipLessonAttributes[];
  };
};

export type TCreateVirtualInternshipData = {
  createVirtualInternship: {
    virtualInternship: TVirtualInternship;
  };
};
