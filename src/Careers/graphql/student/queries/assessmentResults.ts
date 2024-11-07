import { gql } from '@apollo/client';

import { type TCourseBaseInfo } from '@dc/graphql/fragments/courseBaseInfo';
import courseMetadataFragment, { type TCourseMetaData } from '@dc/graphql/fragments/courseMetadata';

export default gql`
  query AssessmentResults {
    assessmentProgress(scope: FINISHED) {
      result {
        id
        additionalPathways {
          id
          description
          name
          imageUrl
          cluster {
            name
          }
          courses {
            id
            description
            name
            status
            type
            ...CourseMetadata
          }
        }
        recommendedPathways {
          id
          description
          name
          imageUrl
          cluster {
            name
          }
          courses {
            id
            description
            name
            status
            type
            ...CourseMetadata
          }
        }
      }
    }
    currentCourses {
      id
      description
      name
    }
  }
  ${courseMetadataFragment}
`;

export type TCourse = TCourseBaseInfo & {
  metadata: TCourseMetaData;
  status: string;
  type: string;
  thumbnailUrl: string;
};

export type TCluster = {
  name: string;
};

export type TPathway = {
  id: string;
  description: string;
  name: string;
  imageUrl: string;
  cluster: TCluster;
  courses: TCourse[];
};

export type TAssessmentProgressResult = {
  id: string;
  additionalPathways: TPathway[];
  recommendedPathways: TPathway[];
  currentCourses: TCourseBaseInfo[];
};

export type TAssessmentProgress = {
  assessmentProgres: {
    result: TAssessmentProgressResult;
  };
};

export type TAssessmentResultsData = {
  assessmentProgres: TAssessmentProgress;
};
