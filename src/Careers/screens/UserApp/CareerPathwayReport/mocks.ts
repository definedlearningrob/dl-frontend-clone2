import { MockedResponse } from '@apollo/client/testing';
import { CareerExplorationReportFullDataDocument } from '@graphql/dc/users/hooks';
import { CareerExplorationReportFullDataQuery } from '@graphql/dc/users/operations';

export const careerExplorationReportMock: MockedResponse<CareerExplorationReportFullDataQuery> = {
  request: {
    query: CareerExplorationReportFullDataDocument,
    variables: {
      filter: { schoolYear: 2023 },
    },
  },
  result: {
    data: {
      reports: {
        pathwayReport: {
          visitResults: {
            nodesCount: 1,
            pagesCount: 1,
            nodes: [
              {
                clusterNames: ['Education & Training'],
                isEnrolled: true,
                pathwayNames: ['Teaching/Training'],
                resourceId: '16',
                resourceName: 'Teaching/Training',
                resourceType: 'Pathway',
                visitorId: '1234',
                visitorName: 'Jeremiah Bell',
                visitorEmail: 'jeremiah.bell@example.com',
                visitorSisId: null,
                visitorType: 'Student',
                visitsCount: 5,
              },
            ],
          },
        },
      },
    },
  },
};
