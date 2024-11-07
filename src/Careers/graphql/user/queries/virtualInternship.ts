import { gql, TypedDocumentNode } from '@apollo/client';

import { TVirtualInternship } from '@dc/components/Admin/VirtualInternships/types';

export const VIRTUAL_INTERNSHIP_QUERY: TypedDocumentNode<
  TVirtualInternshipData,
  TVirtualInternshipVariables
> = gql`
  query VirtualInternship($id: ID!, $track: Boolean) {
    virtualInternship(id: $id, track: $track) {
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
        salaryInformation
        tags
      }
      requiredExperiences
      status
      calendarLessons {
        id
        step
        name
        imageUrl
        thumbnailUrl
        type
      }
      experienceOpportunityLessons {
        id
        step
        name
        imageUrl
        thumbnailUrl
        type
      }
      postExperienceLessons {
        id
        step
        name
        imageUrl
        thumbnailUrl
        type
      }
      readinessSkillsLessons {
        id
        step
        name
        imageUrl
        thumbnailUrl
        type
      }
    }
  }
`;

export type TVirtualInternshipVariables = {
  id: string;
  track: boolean;
};

export type TVirtualInternshipData = {
  virtualInternship: TVirtualInternship;
};
