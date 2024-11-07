import { TypedDocumentNode, gql } from '@apollo/client';

export const ASSESSMENT_REPORT: TypedDocumentNode<
  TAssessmentReportData,
  TAssessmentReportVariables
> = gql`
  query ReportsAssessmentReport($filter: AssessmentReportFilter) {
    reports {
      assessmentReport(filter: $filter) {
        studentsCount
        summary {
          assessmentCompleted
          assessmentTaken
        }
        highSchoolInterests: interestsCategoryAverageCheckedScores(type: HIGH_SCHOOL) {
          category
          score
        }
        middleSchoolInterests: interestsCategoryAverageCheckedScores(type: MIDDLE_SCHOOL) {
          category
          score
        }
        highSchoolWorkValues: workValuesCategoryAverageTokens(type: HIGH_SCHOOL) {
          category
          averageTokens
        }
        middleSchoolWorkValues: workValuesCategoryAverageTokens(type: MIDDLE_SCHOOL) {
          category
          averageTokens
        }
        highSchoolStudyPreferences: studyPreferencesPositionsDistributions(type: HIGH_SCHOOL) {
          area
          results {
            position1
            position2
            position3
            position4
            position5
            position6
            position7
          }
        }
        middleSchoolStudyPreferences: studyPreferencesPositionsDistributions(type: MIDDLE_SCHOOL) {
          area
          results {
            position1
            position2
            position3
            position4
            position5
          }
        }
        clusterRecommendationCounts {
          cluster {
            name
            id
            pathways {
              name
              id
            }
          }
          pathwayRecommendationCounts {
            recommendationsCount
            pathway {
              name
              id
            }
          }
          recommendationsCount
        }
      }
    }
  }
`;

export type HighSchoolStudyPreferences = {
  area: string;
  results: {
    position1: number;
    position2: number;
    position3: number;
    position4: number;
    position5: number;
    position6: number;
    position7: number;
  };
}[];

export type MiddleSchoolStudyPreferences = {
  area: string;
  results: {
    position1: number;
    position2: number;
    position3: number;
    position4: number;
    position5: number;
  };
}[];

export type InterestsItem = {
  category: string;
  score: number;
};

export type WorkValuesItem = {
  category: string;
  averageTokens: number;
};

export type ClusterRecommendationItem = {
  cluster: {
    name: string;
    id: string;
    pathways: {
      name: string;
      id: string;
    }[];
  };
  pathwayRecommendationCounts: {
    recommendationsCount: number;
    pathway: {
      name: string;
      id: string;
    };
  }[];
  recommendationsCount: number;
};

export type TAssessmentReportData = {
  reports: {
    assessmentReport: {
      studentsCount: number;
      summary: {
        assessmentCompleted: number;
        assessmentTaken: number;
      };
      highSchoolInterests: InterestsItem[];
      middleSchoolInterests: InterestsItem[];
      highSchoolWorkValues: WorkValuesItem[];
      middleSchoolWorkValues: WorkValuesItem[];
      highSchoolStudyPreferences: HighSchoolStudyPreferences;
      middleSchoolStudyPreferences: MiddleSchoolStudyPreferences;
      clusterRecommendationCounts: ClusterRecommendationItem[];
    };
  };
};

type TAssessmentReportVariables = {
  filter: {
    entityUuids?: string[];
    gradeLevels?: string[];
    schoolClassUuids?: string[];
    schoolYear?: number;
    userUuids?: string[];
  };
};
