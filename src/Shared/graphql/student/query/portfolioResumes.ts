import { gql } from '@apollo/client';

import { Resume } from '@shared/resources/types';

export default gql`
  query PortfolioResumes {
    portfolio {
      sharedResume {
        avatarUrl
        bio
        contactLinks {
          id
          type
          value
          visible
        }
        experiences {
          description
          endedAt
          id
          name
          startedAt
          visible
        }
        educations {
          description
          endedAt
          id
          name
          startedAt
          visible
        }
        extraCurriculars {
          description
          endedAt
          id
          name
          startedAt
          visible
        }
        externalResumes {
          filename
          id
          url(options: { responseContentDisposition: "attachment" })
        }
        dcProjects: projects(type: CAREERS) {
          nodes {
            description
            id
            imageUrl
            name
            isTeamSubmission
            parentName
            submission {
              status
              files {
                isOwner
                id
                filename
                submitter {
                  firstName
                  fullName
                  lastName
                  uuid
                }
              }
            }
            finishedAt
            thumbnailUrl
            type
            isHighlighted
            resourceClass
          }
        }
        dlProjects: projects(type: PBL) {
          nodes {
            description
            id
            imageUrl
            name
            isTeamSubmission
            parentName
            submission {
              status
              files {
                id
                isOwner
                filename
                submitter {
                  firstName
                  fullName
                  lastName
                  uuid
                }
              }
            }
            finishedAt
            thumbnailUrl
            type
            isHighlighted
            resourceClass
          }
        }
        personalProjects: projects(type: PERSONAL) {
          nodes {
            description
            id
            imageUrl
            name
            isTeamSubmission
            parentName
            submission {
              status
              files {
                isOwner
                id
                filename
                submitter {
                  firstName
                  fullName
                  lastName
                  uuid
                }
              }
            }
            finishedAt
            thumbnailUrl
            type
            isHighlighted
            resourceClass
          }
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
                uuid
              }
              url
            }
            status
          }
          thumbnailUrl
          type
        }
        badges {
          id
          description
          imageUrl
          isHighlighted
          name
          resource {
            id
            name
          }
        }
        highlightedBadges {
          id
          description
          imageUrl
          isHighlighted
          name
          resource {
            id
            name
          }
        }
        highlightedProjectsEnabled
        id
        name
        sharedUrl
        sharedUrlEnabled
      }
      studentId
    }
  }
`;

export type TPortfolio = {
  resumes: TPortfolioResume[];
  sharedResume?: Resume;
  studentId: string;
};

export type TPortfolioResumesData = {
  portfolio: TPortfolio;
};

export type TPortfolioResume = {
  filename: string;
  id: string;
  url: string;
};
