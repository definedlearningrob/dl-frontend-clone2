import { MockedResponse } from '@apollo/client/testing';

import {
  ASSESSMENT_REPORT,
  TAssessmentReportData,
} from '@dc/graphql/user/queries/reportsAssessmentReport';
import {
  ASSESSMENT_REPORT_FILTERS,
  TAssessmentReportFiltersData,
} from '@dc/graphql/user/queries/assessmentReportFilters';

export const assessmentReportMock: MockedResponse<TAssessmentReportData> = {
  request: {
    query: ASSESSMENT_REPORT,
    variables: {
      filter: { schoolYear: 2023 },
    },
  },
  result: {
    data: {
      reports: {
        assessmentReport: {
          studentsCount: 300,
          summary: {
            assessmentCompleted: 100,
            assessmentTaken: 200,
          },
          highSchoolInterests: [
            { category: 'Artistic', score: 1 },
            { category: 'Conventional', score: 4 },
            { category: 'Enterprising', score: 4 },
            { category: 'Investigative', score: 6 },
            { category: 'Realistic', score: 6 },
            { category: 'Social', score: 9 },
          ],
          middleSchoolInterests: [
            { category: 'Creator', score: 2 },
            { category: 'Doer', score: 3 },
            { category: 'Helper', score: 4 },
            { category: 'Organizer', score: 4 },
            { category: 'Persuader', score: 6 },
            { category: 'Thinker', score: 8 },
          ],
          middleSchoolWorkValues: [
            { category: 'Achievement', averageTokens: 10 },
            { category: 'Independence', averageTokens: 14 },
            { category: 'Recognition', averageTokens: 4 },
            { category: 'Relationships', averageTokens: 6 },
            { category: 'Support', averageTokens: 28 },
            { category: 'Working Conditions', averageTokens: 15 },
          ],
          highSchoolWorkValues: [
            { category: 'Achievement', averageTokens: 20 },
            { category: 'Independence', averageTokens: 10 },
            { category: 'Recognition', averageTokens: 7 },
            { category: 'Relationships', averageTokens: 30 },
            { category: 'Support', averageTokens: 6 },
            { category: 'Working Conditions', averageTokens: 1 },
          ],
          highSchoolStudyPreferences: [
            {
              area: 'Math',
              results: {
                position1: 6,
                position2: 0,
                position3: 0,
                position4: 2,
                position5: 0,
                position6: 0,
                position7: 0,
              },
            },
            {
              area: 'Science',
              results: {
                position1: 0,
                position2: 0,
                position3: 0,
                position4: 0,
                position5: 0,
                position6: 0,
                position7: 8,
              },
            },
            {
              area: 'Social Studies',
              results: {
                position1: 2,
                position2: 5,
                position3: 0,
                position4: 1,
                position5: 0,
                position6: 0,
                position7: 0,
              },
            },
            {
              area: 'Language Arts',
              results: {
                position1: 0,
                position2: 0,
                position3: 2,
                position4: 0,
                position5: 0,
                position6: 6,
                position7: 0,
              },
            },
            {
              area: 'Computers',
              results: {
                position1: 0,
                position2: 1,
                position3: 5,
                position4: 0,
                position5: 1,
                position6: 1,
                position7: 0,
              },
            },
            {
              area: 'Creative Arts',
              results: {
                position1: 0,
                position2: 1,
                position3: 0,
                position4: 0,
                position5: 6,
                position6: 1,
                position7: 0,
              },
            },
            {
              area: 'Trades',
              results: {
                position1: 0,
                position2: 1,
                position3: 1,
                position4: 5,
                position5: 1,
                position6: 0,
                position7: 0,
              },
            },
          ],
          middleSchoolStudyPreferences: [
            {
              area: 'Language Arts',
              results: {
                position1: 0,
                position2: 1,
                position3: 0,
                position4: 1,
                position5: 0,
              },
            },
            {
              area: 'Math',
              results: {
                position1: 0,
                position2: 0,
                position3: 2,
                position4: 0,
                position5: 0,
              },
            },
            {
              area: 'Science',
              results: {
                position1: 0,
                position2: 0,
                position3: 0,
                position4: 0,
                position5: 2,
              },
            },
            {
              area: 'Social Studies',
              results: {
                position1: 2,
                position2: 0,
                position3: 0,
                position4: 0,
                position5: 0,
              },
            },
            {
              area: 'Creative Arts',
              results: {
                position1: 0,
                position2: 1,
                position3: 0,
                position4: 1,
                position5: 0,
              },
            },
          ],
          clusterRecommendationCounts: [
            {
              cluster: {
                name: 'Education & Training',
                id: '3',
                pathways: [
                  {
                    name: 'Administration and Administrative Support',
                    id: '14',
                  },
                  {
                    name: 'Professional Support Services',
                    id: '15',
                  },
                  {
                    name: 'Teaching/Training',
                    id: '16',
                  },
                ],
              },
              pathwayRecommendationCounts: [
                {
                  recommendationsCount: 2,
                  pathway: {
                    name: 'Teaching/Training',
                    id: '16',
                  },
                },
                {
                  recommendationsCount: 1,
                  pathway: {
                    name: 'Administration and Administrative Support',
                    id: '14',
                  },
                },
                {
                  recommendationsCount: 1,
                  pathway: {
                    name: 'Professional Support Services',
                    id: '15',
                  },
                },
              ],
              recommendationsCount: 4,
            },
            {
              cluster: {
                name: 'Business Management & Administration',
                id: '13',
                pathways: [
                  {
                    name: 'General Management',
                    id: '61',
                  },
                  {
                    name: 'Business Information Management',
                    id: '62',
                  },
                  {
                    name: 'Human Resources Management',
                    id: '63',
                  },
                  {
                    name: 'Operations Management',
                    id: '64',
                  },
                  {
                    name: 'Administrative Support',
                    id: '65',
                  },
                ],
              },
              pathwayRecommendationCounts: [
                {
                  recommendationsCount: 3,
                  pathway: {
                    name: 'Administrative Support',
                    id: '65',
                  },
                },
                {
                  recommendationsCount: 1,
                  pathway: {
                    name: 'Business Information Management',
                    id: '62',
                  },
                },
              ],
              recommendationsCount: 4,
            },
            {
              cluster: {
                name: 'Manufacturing',
                id: '9',
                pathways: [
                  {
                    name: 'Production',
                    id: '41',
                  },
                  {
                    name: 'Manufacturing Production Process Development',
                    id: '42',
                  },
                  {
                    name: 'Maintenance, Installation & Repair',
                    id: '43',
                  },
                  {
                    name: 'Quality Assurance',
                    id: '44',
                  },
                  {
                    name: 'Logistics & Inventory Control',
                    id: '45',
                  },
                  {
                    name: 'Health, Safety & Environmental Assurance',
                    id: '46',
                  },
                ],
              },
              pathwayRecommendationCounts: [
                {
                  recommendationsCount: 2,
                  pathway: {
                    name: 'Production',
                    id: '41',
                  },
                },
                {
                  recommendationsCount: 2,
                  pathway: {
                    name: 'Manufacturing Production Process Development',
                    id: '42',
                  },
                },
              ],
              recommendationsCount: 4,
            },
          ],
        },
      },
    },
  },
};

export const assessmentReportFiltersMock: MockedResponse<TAssessmentReportFiltersData> = {
  request: {
    query: ASSESSMENT_REPORT_FILTERS,
    variables: {
      filters: {},
      entityFilter: { nameCont: '' },
      schoolClassFilter: { nameCont: '' },
      userFilter: { fullNameCont: '' },
    },
  },
  result: {
    data: {
      assessmentReportFilters: {
        entities: {
          nodesCount: 1,
          pagesCount: 1,
          nodes: [{ uuid: '1234-5678', name: 'City High School' }],
        },
        gradeLevels: ['10', '11', '12', 'Postsecondary'],
        users: {
          nodesCount: 1,
          pagesCount: 1,
          nodes: [{ uuid: '9876-5432', fullName: 'Anna Cityteach' }],
        },
        schoolClasses: {
          nodesCount: 0,
          pagesCount: 0,
          nodes: [],
        },
      },
    },
  },
};
