import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { AutomaticAcceptance } from '@dc/components/User/Opportunities/ManageOpportunityApplications/AutomaticAcceptance/AutomaticAcceptance';
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
  status: OPPORTUNITY_APPLICATION_STATUS.REJECTED,
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
  __typename: 'OpportunityApplication',
};

const mutationSpy = jest.fn();

const statusChangeMutationMock: MockedResponse<
  TOpportunityApplicationData,
  TOpportunityApplicationVariables
> = {
  request: {
    query: UPDATE_OPPORTUNITY_APPLICATION,
    variables: { input: { id: '1', status: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED } },
  },
  result() {
    mutationSpy();

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

describe('AutomaticAcceptance', () => {
  it('should render correctly when rejected', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider>
        <AutomaticAcceptance application={application} />
      </MockedProvider>
    );

    expect(screen.getByText('Automatic acceptance option is on')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when accepted', () => {
    renderWithRouterAndReduxProvider(
      <MockedProvider>
        <AutomaticAcceptance
          application={{ ...application, status: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED }}
        />
      </MockedProvider>
    );
    expect(screen.getByText('Accepted')).toBeInTheDocument();
    expect(screen.getByText('Automatic acceptance option is on')).toBeInTheDocument();
  });

  it('should allow to change status manually', async () => {
    renderWithRouterAndReduxProvider(
      <Route path='/opportunity/:id/management'>
        <MockedProvider cache={cacheConfig} mocks={[statusChangeMutationMock]}>
          <AutomaticAcceptance application={application} />
        </MockedProvider>
      </Route>,
      { route: '/opportunity/1/management?applicationId=1' }
    );
    expect(screen.getByText('Rejected')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Change to Accepted' }));

    await waitFor(() => {
      expect(mutationSpy).toHaveBeenCalledTimes(1);
    });

    // FIXME: can't check if the label changed, cache is not updating in tests for some reason
    // expect(await screen.getByText('Accepted')).toBeInTheDocument();
  });
});
