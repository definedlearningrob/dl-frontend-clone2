import { gql, TypedDocumentNode } from '@apollo/client';

import { CONTACT_LINK_TYPES } from '@shared/resources/enums';
import { TPortfolioProject } from '@shared/components/Portfolio/types';
import { Badge, ResumeItemAttributes, TExternalResumes } from '@shared/resources/types';

export const SHARED_RESUME: TypedDocumentNode<TSharedResumeData, TSharedResumeVariables> = gql`
  query SharedResume($shareCode: String!) {
    sharedResume(shareCode: $shareCode) {
      avatarUrl
      bio
      contactLinks {
        id
        type
        value
        visible
      }
      educations {
        description
        endedAt
        id
        name
        startedAt
        type
        visible
      }
      experiences {
        description
        endedAt
        id
        name
        startedAt
        type
        visible
      }
      extraCurriculars {
        description
        endedAt
        id
        name
        startedAt
        type
        visible
      }
      externalResumes {
        id
        url(options: { responseContentDisposition: "attachment" })
        filename
      }
      highlightedProjects {
        description
        finishedAt
        id
        imageUrl
        isHighlighted
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
              uuid
            }
            url
          }
          status
        }
        submittedAt
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
      id
      name
      shareCode
      sharedUrl
      sharedUrlEnabled
    }
  }
`;

export type ContactLink = {
  id: string;
  type: CONTACT_LINK_TYPES;
  value: string;
  visible: boolean;
};

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
  highlightedProjectsEnabled?: boolean;
  id: string;
  name: string;
  shareCode: string;
  sharedUrl: string;
  sharedUrlEnabled: boolean;
};

export type TSharedResumeData = {
  sharedResume: TSharedResume;
};

export type TSharedResumeVariables = {
  shareCode: string;
};
