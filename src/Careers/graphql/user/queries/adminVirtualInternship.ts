import { gql, TypedDocumentNode } from '@apollo/client';

import { TVirtualInternship } from '@dc/components/Admin/VirtualInternships/types';

export const ADMIN_VIRTUAL_INTERNSHIP_QUERY: TypedDocumentNode<
  TAdminVirtualInternshipData,
  TAdminVirtualInternshipVariables
> = gql`
  query AdminVirtualInternship($id: ID!) {
    virtualInternship(id: $id) {
      archivedAt
      id
      badges {
        id
        name
        imageUrl
      }
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

export type TAdminVirtualInternshipVariables = {
  id: string;
};

export type TAdminVirtualInternshipData = {
  virtualInternship: TVirtualInternship;
};
