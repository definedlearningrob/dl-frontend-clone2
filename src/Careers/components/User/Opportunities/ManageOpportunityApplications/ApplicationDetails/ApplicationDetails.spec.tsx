import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ApplicationDetails } from '@dc/components/User/Opportunities/ManageOpportunityApplications/ApplicationDetails/ApplicationDetails';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';
import {
  TOpportunityApplicationData,
  TOpportunityApplicationVariables,
  UPDATE_OPPORTUNITY_APPLICATION,
} from '@dc/graphql/user/mutations/updateOpportunityApplication';
import cacheConfig from '@dc/graphql/cacheConfig';

const application = {
  id: '1',
  appliedAt: '2023-05-01',
  updatedAt: '2023-05-02',
  status: OPPORTUNITY_APPLICATION_STATUS.PENDING,
  answers: [{ id: '1', opportunityQuestionId: '1', answer: 'To sleep better!' }],
  student: {
    uuid: '123',
    fullName: 'Applicant Student',
    schoolClasses: [{ uuid: 'class-uuid', name: 'Class name' }],
  },
};

const opportunity = {
  hasPendingApplications: true,
  questions: [{ id: '1', question: 'Why you want to test this?', answer: 'To sleep better!' }],
  opportunityType: OpportunityTypes.APPRENTICESHIP,
  automaticAcceptance: false,
  id: '1',
  applications: { nodes: [application], pagesCount: 1, nodesCount: 1 },
  filteredApplications: { nodes: [], pagesCount: 1, nodesCount: 0 },
  name: 'Opportunity name',
};

const acceptSpy = jest.fn();
const rejectSpy = jest.fn();

const acceptApplicationStatusMock: MockedResponse<
  TOpportunityApplicationData,
  TOpportunityApplicationVariables
> = {
  request: {
    query: UPDATE_OPPORTUNITY_APPLICATION,
    variables: { input: { id: '1', status: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED } },
  },
  result() {
    acceptSpy();

    return {
      data: {
        updateOpportunityApplication: {
          application: {
            status: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
            lastChangedBy: { name: 'Cindy Amino' },
          },
        },
      },
    };
  },
};

const rejectApplicationStatusMock: MockedResponse<
  TOpportunityApplicationData,
  TOpportunityApplicationVariables
> = {
  request: {
    query: UPDATE_OPPORTUNITY_APPLICATION,
    variables: { input: { id: '1', status: OPPORTUNITY_APPLICATION_STATUS.REJECTED } },
  },
  result() {
    rejectSpy();

    return {
      data: {
        updateOpportunityApplication: {
          application: {
            status: OPPORTUNITY_APPLICATION_STATUS.REJECTED,
            lastChangedBy: { name: 'Cindy Amino' },
          },
        },
      },
    };
  },
};

describe('ApplicationDetails', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider>
        <ApplicationDetails application={application} opportunity={opportunity} />
      </MockedProvider>
    );

    expect(screen.getByText('Why you want to test this?')).toBeInTheDocument();
    expect(screen.getByText('To sleep better!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should allow accepting an application', async () => {
    renderWithRouterAndReduxProvider(
      <Route path='/manage-opportunities'>
        <MockedProvider cache={cacheConfig} mocks={[acceptApplicationStatusMock]}>
          <ApplicationDetails application={application} opportunity={opportunity} />
        </MockedProvider>
      </Route>,
      { route: '/manage-opportunities?applicationId=1' }
    );

    userEvent.click(screen.getByRole('button', { name: 'Accept' }));
    await waitFor(() => {
      expect(acceptSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should allow rejecting an application', async () => {
    renderWithRouterAndReduxProvider(
      <Route path='/manage-opportunities'>
        <MockedProvider cache={cacheConfig} mocks={[rejectApplicationStatusMock]}>
          <ApplicationDetails application={application} opportunity={opportunity} />
        </MockedProvider>
      </Route>,
      { route: '/manage-opportunities?applicationId=1' }
    );

    userEvent.click(screen.getByRole('button', { name: 'Reject' }));

    await waitFor(() => {
      expect(rejectSpy).toHaveBeenCalledTimes(1);
    });
  });
});
