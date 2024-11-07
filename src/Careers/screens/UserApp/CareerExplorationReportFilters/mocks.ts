import { MockedResponse } from '@apollo/client/testing';
import {
  CareerExplorationReportFiltersDocument,
  CareerExplorationReportSummaryDocument,
  CareerExplorationReportVisitCountsDocument,
} from '@graphql/dc/users/hooks';

import { TCareerExplorationReportFiltersData } from '@dc/graphql/user/queries/careerExplorationReportFilters';

export const careerExplorationReportSummaryMock = {
  request: {
    query: CareerExplorationReportSummaryDocument,
    variables: {
      filter: { schoolYear: 2023, schoolClassUuids: undefined },
    },
  },
  result: {
    data: {
      reports: {
        pathwayReport: {
          summary: {
            engagementsCount: 10,
            clusterSCount: 2,
            pathwaysCount: 5,
            studentCount: 12,
            usersCount: 3,
          },
        },
      },
    },
  },
};

export const visitCountsSpy = jest.fn();

export const careerExplorationReportVisitCountsMock = {
  request: {
    query: CareerExplorationReportVisitCountsDocument,
    variables: {
      filter: { schoolYear: 2023, schoolClassUuids: undefined },
    },
  },
  result() {
    visitCountsSpy();

    return {
      data: {
        reports: {
          pathwayReport: [
            {
              visitsCount: 396,
              cluster: {
                name: 'Agriculture, Food & Natural Resources',
                id: '1',
                __typename: 'Cluster',
              },
              pathwayVisitCounts: [
                {
                  visitsCount: 54,
                  pathway: {
                    cluster: {
                      name: 'Agriculture, Food & Natural Resources',
                      id: '1',
                    },
                    id: '5',
                    name: 'Natural Resources Systems',
                  },
                },
                {
                  visitsCount: 55,
                  pathway: {
                    cluster: {
                      name: 'Agriculture, Food & Natural Resources',
                      id: '1',
                    },
                    id: '2',
                    name: 'Animal Systems',
                  },
                },
                {
                  visitsCount: 54,
                  pathway: {
                    cluster: {
                      name: 'Agriculture, Food & Natural Resources',
                      id: '1',
                    },
                    id: '6',
                    name: 'Plant Systems',
                  },
                },
              ],
            },
            {
              visitsCount: 10,
              cluster: {
                name: 'Transportation, Distribution & Logistics',
                id: '11',
              },
              pathwayVisitCounts: [
                {
                  visitsCount: 2,
                  pathway: {
                    cluster: {
                      name: 'Transportation, Distribution & Logistics',
                      id: '11',
                    },
                    id: '52',
                    name: 'Facility and Mobile Equipment Maintenance',
                  },
                },
                {
                  visitsCount: 3,
                  pathway: {
                    cluster: {
                      name: 'Transportation, Distribution & Logistics',
                      id: '11',
                    },
                    id: '49',
                    name: 'Transportation Operations',
                  },
                },
                {
                  visitsCount: 5,
                  pathway: {
                    cluster: {
                      name: 'Transportation, Distribution & Logistics',
                      id: '11',
                    },
                    id: '51',
                    name: 'Warehousing & Distribution Center Operations',
                  },
                },
              ],
            },
          ],
        },
      },
    };
  },
};

export const careerExplorationReportFiltersMock: MockedResponse<TCareerExplorationReportFiltersData> =
  {
    request: {
      query: CareerExplorationReportFiltersDocument,
      variables: {
        filters: {},
        entityFilter: { nameCont: '' },
        schoolClassFilter: { nameCont: '' },
        userFilter: { fullNameCont: '' },
      },
    },
    result: {
      data: {
        pathwayReportFilters: {
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
