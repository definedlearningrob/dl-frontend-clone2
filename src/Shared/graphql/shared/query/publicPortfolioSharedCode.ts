import { gql, TypedDocumentNode } from '@apollo/client';

import { TPortfolioProject } from '@shared/components/Portfolio/types';
import {
  Badge,
  ContactLink,
  ResumeItemAttributes,
  TExternalResumes,
} from '@shared/resources/types';

export const PUBLIC_SHARED_RESUME: TypedDocumentNode<
  TSharedResumeData,
  TSharedResumeVariables
> = gql`
  query SharedResume($shareCode: String!) {
    sharedResume(shareCode: $shareCode) {
      avatarUrl
      bio
      contactLinks {
        id
        type
        value
      }
      educations {
        description
        endedAt
        id
        name
        startedAt
        type
      }
      experiences {
        description
        endedAt
        id
        name
        startedAt
        type
      }
      extraCurriculars {
        description
        endedAt
        id
        name
        startedAt
        type
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
            isOwner
            createdAt
            filename
            googleWeblink
            id
            source
            submitter {
              firstName
              fullName
              lastName
            }
            url
          }
          status
        }
        thumbnailUrl
        type
      }
      highlightedBadges {
        id
        description
        imageUrl
        name
        resource {
          id
          name
        }
      }
      highlightedProjectsEnabled
      name
    }
  }
`;

export type TSharedResume = {
  avatarUrl: string;
  bio: string;
  contactLinks: ContactLink[];
  educations: ResumeItemAttributes[];
  experiences: ResumeItemAttributes[];
  extraCurriculars: ResumeItemAttributes[];
  externalResumes: TExternalResumes[];
  highlightedProjects: TPortfolioProject[];
  highlightedBadges: Badge[];
  highlightedProjectsEnabled: boolean;
  name: string;
  uuid: string;
};

export type TSharedResumeData = {
  sharedResume: TSharedResume;
};

export type TSharedResumeVariables = {
  shareCode: string;
};
