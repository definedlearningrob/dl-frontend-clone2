import { MockedResponse } from '@apollo/client/testing';
import { OpportunityReportFullDataDocument } from '@graphql/dc/users/hooks';
import { OpportunityReportFullDataQuery } from '@graphql/dc/users/operations';
import { ApplicationStatus, OpportunityTypes } from '@graphql/dc/shared/types';
import { ClustersQuery, ClustersQueryVariables } from '@graphql/dc/shared/operations';
import { ClustersDocument } from '@graphql/dc/shared/hooks';

export const clustersMock: MockedResponse<ClustersQuery, ClustersQueryVariables> = {
  request: {
    query: ClustersDocument,
    variables: {},
  },
  result: {
    data: {
      clusters: [
        {
          id: '1',
          name: 'Agriculture, Food & Natural Resources',
          pathways: [
            {
              id: '1',
              name: 'Agribusiness Systems',
            },
            {
              id: '2',
              name: 'Animal Systems',
            },
          ],
        },
      ],
    },
  },
};

export const opportunityResultsMock: MockedResponse<OpportunityReportFullDataQuery> = {
  request: {
    query: OpportunityReportFullDataDocument,
    variables: {
      filter: { schoolYear: 2023, schoolClassUuids: undefined },
      resultsFilter: {},
      page: 1,
      perPage: 25,
    },
  },
  result: {
    data: {
      reports: {
        opportunityReport: {
          results: {
            nodesCount: 3,
            pagesCount: 1,
            nodes: [
              {
                applicationDeadline: null,
                applicationStatus: ApplicationStatus.ACCEPTED,
                assignmentsSubmitted: 3,
                assignmentsToSubmit: 6,
                checkInsSubmitted: 0,
                checkInsToSubmit: 0,
                clusterNames: ['Marketing', 'Transportation, Distribution & Logistics'],
                isFavorite: false,
                opportunityName: 'Test',
                opportunityPartnerNames: [],
                opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP,
                pathwayNames: ['Travel & Tourism', 'Warehousing & Distribution Center Operations'],
                studentGradeLevel: '3',
                studentId: '10458251',
                studentName: 'Amanda Brown',
                studentSisId: '242424',
              },
              {
                applicationDeadline: null,
                applicationStatus: ApplicationStatus.ACCEPTED,
                assignmentsSubmitted: 0,
                assignmentsToSubmit: 0,
                checkInsSubmitted: 0,
                checkInsToSubmit: 0,
                clusterNames: [
                  'Agriculture, Food & Natural Resources',
                  'Architecture & Construction',
                ],
                isFavorite: false,
                opportunityName: 'Test 2',
                opportunityPartnerNames: [],
                opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP,
                pathwayNames: [
                  'A/V Technology & Film',
                  'Administration and Administrative Support',
                ],
                studentGradeLevel: '7',
                studentId: '10458576',
                studentName: 'Jon James',
                studentSisId: null,
              },
              {
                applicationDeadline: '2055-01-01',
                applicationStatus: ApplicationStatus.ACCEPTED,
                assignmentsSubmitted: null,
                assignmentsToSubmit: null,
                checkInsSubmitted: null,
                checkInsToSubmit: null,
                clusterNames: [
                  'Agriculture, Food & Natural Resources',
                  'Business Management & Administration',
                ],
                isFavorite: true,
                opportunityName: 'molestias',
                opportunityPartnerNames: [],
                opportunityType: OpportunityTypes.PRACTICUM,
                pathwayNames: ['Business Information Management', 'Diagnostic Services'],
                studentGradeLevel: '7',
                studentId: '10458576',
                studentName: 'Jon James',
                studentSisId: null,
              },
            ],
          },
        },
      },
    },
  },
};
