import { MockedResponse } from '@apollo/client/testing';
import {
  OpportunityReportApplicationCountDocument,
  OpportunityReportFiltersDocument,
  OpportunityReportSummaryDocument,
  OpportunityReportTypesChartDocument,
} from '@graphql/dc/users/hooks';
import {
  OpportunityReportApplicationCountQuery,
  OpportunityReportApplicationCountQueryVariables,
  OpportunityReportSummaryQuery,
  OpportunityReportTypesChartQueryVariables,
} from '@graphql/dc/users/operations';

import { TOpportunityReportFiltersData } from '@dc/graphql/user/queries/opportunityReportFilters';

export const summarySpy = jest.fn();

export const opportunityReportSummaryMock: MockedResponse<
  OpportunityReportSummaryQuery,
  OpportunityReportTypesChartQueryVariables
> = {
  request: {
    query: OpportunityReportSummaryDocument,
    variables: {
      filter: { schoolYear: 2023, schoolClassUuids: undefined },
    },
  },
  result() {
    summarySpy();

    return {
      data: {
        reports: {
          opportunityReport: {
            studentsCount: 324,
            summary: {
              opportunitiesCount: 444,
              virtualInternshipsCount: 26,
            },
          },
        },
      },
    };
  },
};

export const opportunityApplicationsSpy = jest.fn();

export const opportunityApplicationsMock = {
  request: {
    query: OpportunityReportTypesChartDocument,
    variables: {
      filter: { schoolYear: 2023, schoolClassUuids: undefined },
    },
  },
  result() {
    opportunityApplicationsSpy();

    return {
      data: {
        reports: {
          opportunityReport: {
            typeCounts: [
              {
                applicationsCount: 31,
                opportunityType: 'WORKPLACE_TOUR',
              },
              {
                applicationsCount: 28,
                opportunityType: 'INTERNSHIP',
              },
              {
                applicationsCount: 38,
                opportunityType: 'PRE_APPRENTICESHIP',
              },
            ],
          },
        },
      },
    };
  },
};

export const opportunityApplicationsByClustersMock: MockedResponse<
  OpportunityReportApplicationCountQuery,
  OpportunityReportApplicationCountQueryVariables
> = {
  request: {
    query: OpportunityReportApplicationCountDocument,
    variables: {
      filter: { schoolYear: 2023, schoolClassUuids: undefined },
    },
  },
  result() {
    return {
      data: {
        reports: {
          opportunityReport: {
            clusterCounts: [
              {
                applicationsCount: 111,
                cluster: {
                  id: '15',
                  name: 'Hospitality & Tourism',
                },
                pathwayApplicationCounts: [
                  {
                    pathway: {
                      id: '74',
                      name: 'Recreation, Amusements & Attractions',
                      cluster: {
                        id: '15',
                        name: 'Hospitality & Tourism',
                      },
                    },
                    applicationsCount: 29,
                  },
                  {
                    pathway: {
                      id: '71',
                      name: 'Restaurants and Food/Beverage Services',
                      cluster: {
                        id: '15',
                        name: 'Hospitality & Tourism',
                      },
                    },
                    applicationsCount: 30,
                  },
                ],
              },
            ],
          },
        },
      },
    };
  },
};

export const careerExplorationReportFiltersMock: MockedResponse<TOpportunityReportFiltersData> = {
  request: {
    query: OpportunityReportFiltersDocument,
    variables: {
      filters: {},
      entityFilter: { nameCont: '' },
      schoolClassFilter: { nameCont: '' },
      userFilter: { fullNameCont: '' },
    },
  },
  result: {
    data: {
      opportunityReportFilters: {
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
