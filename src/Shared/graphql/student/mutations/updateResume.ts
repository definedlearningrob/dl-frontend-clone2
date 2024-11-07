import { TypedDocumentNode, gql } from '@apollo/client';

import { ContactLink, ResumeItemAttributes, Resume } from '@shared/resources/types';
import { PartiallyOptional } from '@shared/utils/types';

export const UPDATE_RESUME: TypedDocumentNode<TUpdateResumeData, TUpdateResumeInput> = gql`
  mutation UpdateResume($input: UpdateResumeMutationInput!) {
    updateResume(input: $input) {
      resume {
        id
        name
        bio
        avatarUrl
        highlightedProjectsEnabled
        sharedUrlEnabled
        sharedUrl
        contactLinks {
          id
          value
          visible
          type
        }
        experiences {
          id
          name
          description
          startedAt
          endedAt
          visible
        }
        extraCurriculars {
          id
          name
          description
          startedAt
          endedAt
          visible
        }
        educations {
          id
          name
          description
          startedAt
          endedAt
          visible
        }
        highlightedProjects {
          description
          finishedAt
          id
          imageUrl
          isTeamSubmission
          name
          parentName
          resourceClass
          startedAt
          submission {
            files {
              createdAt
              filename
              googleWeblink
              id
              source
              url
            }
            status
          }
          thumbnailUrl
          type
        }
        badges {
          id
          imageUrl
          name
          isHighlighted
          resource {
            id
            name
          }
        }
        highlightedBadges {
          id
          description
          imageUrl
          name
          isHighlighted
          resource {
            id
            name
          }
        }
      }
    }
  }
`;

export type TUpdateResumeInput = {
  input: {
    name?: string;
    bio?: string | null;
    avatarFilename?: string | null;
    avatarUuid?: string | null;
    highlightedProjectsEnabled?: boolean;
    sharedUrlEnabled?: boolean;
    contactLinks?: PartiallyOptional<ContactLink, 'id'>[];
    experiences?: PartiallyOptional<ResumeItemAttributes, 'id'>[];
    educations?: PartiallyOptional<ResumeItemAttributes, 'id'>[];
    extraCurriculars?: PartiallyOptional<ResumeItemAttributes, 'id'>[];
    highlightedBadgeIds?: string[];
  };
};

export type TUpdateResumeData = {
  updateResume: {
    resume: Resume;
  };
};
