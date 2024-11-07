import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ApplicationList } from '@dc/components/User/Opportunities/ManageOpportunityApplications/ApplicationList/ApplicationList';
import {
  OPPORTUNITY_APPLICATIONS_QUERY,
  TOpportunityApplicationVariables,
  TOpportunityData,
} from '@dc/graphql/user/queries/opportunityApplications';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';

const application = {
  id: '1',
  appliedAt: '2023-05-01',
  updatedAt: '2023-05-02',
  status: OPPORTUNITY_APPLICATION_STATUS.PENDING,
  answers: [{ id: '1', opportunityQuestionId: '1', answer: 'To sleep better!', step: 1 }],
  lastChangedBy: {
    uuid: '123',
    name: 'Teacher Name',
  },
  student: {
    uuid: '123',
    fullName: 'Applicant Student 1',
    schoolClasses: [{ uuid: 'class-uuid', name: 'Class name' }],
  },
};

const opportunity = {
  hasPendingApplications: true,
  questions: [
    { id: '1', question: 'Why you want to test this?', answer: 'To sleep better!', step: 1 },
  ],
  opportunityType: OpportunityTypes.APPRENTICESHIP,
  automaticAcceptance: false,
  id: '1',
  uuid: '123',
  applications: { nodes: [application], pagesCount: 1, nodesCount: 1 },
  filteredApplications: {
    nodes: [
      application,
      {
        ...application,
        id: '2',
        status: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
        student: {
          uuid: '111',
          fullName: 'Applicant Student 2',
          schoolClasses: [{ uuid: 'class-uuid', name: 'Class name' }],
        },
      },
      {
        ...application,
        id: '3',
        status: OPPORTUNITY_APPLICATION_STATUS.REJECTED,
        student: {
          uuid: '222',
          fullName: 'Applicant Student 3',
          schoolClasses: [{ uuid: 'class-uuid', name: 'Class name' }],
        },
      },
      {
        ...application,
        id: '4',
        status: OPPORTUNITY_APPLICATION_STATUS.STARTED,
        student: {
          uuid: '333',
          fullName: 'Applicant Student 4',
          schoolClasses: [{ uuid: 'class-uuid', name: 'Class name' }],
        },
      },
    ],
    pagesCount: 1,
    nodesCount: 1,
  },
  name: 'Opportunity name',
};

const applicationsListSpy = jest.fn();

const opportunityApplicationsMock: MockedResponse<
  TOpportunityData,
  TOpportunityApplicationVariables
> = {
  request: {
    query: OPPORTUNITY_APPLICATIONS_QUERY,
    variables: {
      filter: { studentFullNameCont: '' },
      perPage: 1000,
      page: undefined,
      id: '1',
    },
  },
  result() {
    applicationsListSpy();

    return { data: { opportunity } };
  },
};
describe('ApplicationList', () => {
  it('should render correctly', async () => {
    const { container } = renderWithRouterAndReduxProvider(
      <Route path='/opportunities/:id/manage-applications'>
        <MockedProvider mocks={[opportunityApplicationsMock]}>
          <ApplicationList studentNameFilter='' />
        </MockedProvider>
      </Route>,
      { route: '/opportunities/1/manage-applications' }
    );

    await waitFor(() => {
      expect(applicationsListSpy).toHaveBeenCalledTimes(1);
    });

    expect(container).toMatchSnapshot();
  });

  it('should select application on row click', async () => {
    const { history } = renderWithRouterAndReduxProvider(
      <Route path='/opportunities/:id/manage-applications'>
        <MockedProvider mocks={[opportunityApplicationsMock]}>
          <ApplicationList studentNameFilter='' />
        </MockedProvider>
      </Route>,
      { route: '/opportunities/1/manage-applications' }
    );

    userEvent.click(await screen.findByText('Applicant Student 1'));
    expect(history.location.search).toContain('?applicationId=1');

    userEvent.click(await screen.findByText('Applicant Student 2'));
    expect(history.location.search).toContain('?applicationId=2');
  });
});
