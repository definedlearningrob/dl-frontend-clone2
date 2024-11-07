import { gql } from '@apollo/client';

import { TPortfolio } from '@shared/graphql/student/query/portfolioResumes';
export default gql`
  query StudentPortfolioResume($uuid: ID!) {
    student(uuid: $uuid) {
      portfolio {
        sharedResume {
          shareCode
          avatarUrl
          sharedUrlEnabled
          bio
          contactLinks {
            id
            type
            value
          }
          experiences {
            description
            endedAt
            id
            name
            startedAt
          }
          educations {
            description
            endedAt
            id
            name
            startedAt
          }
          extraCurriculars {
            description
            endedAt
            id
            name
            startedAt
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
                url
                submitter {
                  firstName
                  fullName
                  lastName
                  uuid
                }
              }
              status
            }
            thumbnailUrl
            type
          }
          highlightedBadges {
            id
            imageUrl
            name
            description
            resource {
              id
              name
            }
          }
          highlightedProjectsEnabled
          name
        }
        resumes {
          filename
          id
          url(options: { responseContentDisposition: "attachment" })
        }
        studentId
      }
      uuid
      email
      firstName
      lastName
      username
    }
  }
`;

export type TStudentPortfolioResumesData = {
  student: {
    portfolio: TPortfolio;
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
  };
};

export type TStudentPortfolioResume = {
  filename: string;
  id: string;
  url: string;
};

export type TStudentPortfolioResumesVariables = {
  uuid: string;
};
