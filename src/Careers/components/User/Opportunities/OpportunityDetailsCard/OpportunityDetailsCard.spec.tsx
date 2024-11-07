import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { OPPORTUNITY_QUERY } from '@dc/graphql/user/queries/opportunities';
import { OPPORTUNITY_APPLICATION_STATUS, Roles } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { OpportunityDetailsCard } from './OpportunityDetailsCard';

const myOpportunityDetails = {
  request: {
    query: OPPORTUNITY_QUERY,
    variables: { id: '6', track: true },
  },
  result: {
    data: {
      opportunity: {
        id: 6,
        entities: [],
        hasPendingApplications: false,
        visibilityScope: 'GLOBAL',
        name: 'Virtula Intern Ship ',
        automaticAcceptance: true,
        salaryInformation: '1000',
        availableSpots: 1,
        creditsOutcomes: '\u003cp\u003esome text\u0026nbsp;\u003c/p\u003e',
        description: '\u003cp\u003esome text\u0026nbsp;\u003c/p\u003e',
        imageUrl: 'http://localstack.lvh.me:4566/dev-bucket/images/opportunities/tree=1',
        thumbnailUrl: 'http://localstack.lvh.me:4566/dev-bucket/images/opportunities/tree=1',
        location: null,
        opportunityType: 'VIRTUAL_INTERNSHIP',
        pathways: [{ id: '8', name: 'A/V Technology \u0026 Film', __typename: 'Pathway' }],
        tags: [],
        deadline: null,
        periodEnd: null,
        periodStart: null,
        virtualInternship: {
          id: '123',
        },
        applications: {
          nodes: [
            {
              id: '1',
              appliedAt: '',
              updatedAt: '',
              status: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
              student: {
                uuid: '1',
                fullName: 'Allison Adams',
                schoolClasses: [
                  {
                    uuid: '2',
                    name: 'Physical Education, Group 9A - 101 - P. McCartney',
                  },
                  {
                    uuid: '3',
                    name: 'Drama 9 - 100 - M. Paucek (Section 1)',
                  },
                  {
                    uuid: '4',
                    name: 'Living Environment - 101 - S. Ogden (Section 1)',
                  },
                  {
                    uuid: '5',
                    name: 'Spanish I - 101 - L. Jacobs (Section 2)',
                  },
                  {
                    uuid: '6',
                    name: 'Class 903, Homeroom - 903 - J. Mertz (Section 3)',
                  },
                  {
                    uuid: '7',
                    name: 'Period 3',
                  },
                  {
                    uuid: '8',
                    name: 'U.S. History, Honors - 102 - J. Doyle (Section 4)',
                  },
                  {
                    uuid: '9',
                    name: 'Group Guidance - 905 - J. Cummings (Section 5)',
                  },
                  {
                    uuid: '10',
                    name: 'Statistics',
                  },
                  {
                    uuid: '11',
                    name: 'Ninth Grade English - 101 - B. Glover (Section 1)',
                  },
                  {
                    uuid: '12',
                    name: 'Sculpture - 004 - J. Page (Section 4)',
                  },
                ],
              },
            },
          ],
        },
        partner: null,
        imageFitToContainer: false,
      },
    },
  },
};

const renderComponentCardWithProvider = (mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider
        value={{ userInfo: { ...userInfoMock.result.data.userInfo, role: Roles.SYSTEM_ADMIN } }}>
        <Route path='/opportunities/:id'>
          <OpportunityDetailsCard />
        </Route>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/opportunities/6' }
  );

describe('OpportunityDetailsCard', () => {
  it('should render correctly', async () => {
    const { container } = renderComponentCardWithProvider([myOpportunityDetails]);

    expect(await screen.findByRole('heading', { name: 'Virtula Intern Ship' })).toBeInTheDocument();
    expect(await screen.findByText('Virtual Internship')).toBeInTheDocument();
    expect(await screen.findByText('A/V Technology & Film')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('navigates to virtual internship after clicking a button', async () => {
    const { history } = renderComponentCardWithProvider([myOpportunityDetails]);
    history.push = jest.fn();

    const showInternshipButton = await screen.findByRole('button', { name: 'Show internship' });
    userEvent.click(showInternshipButton);

    expect(history.push).toHaveBeenCalledWith('/opportunities/6/virtual-internship/123');
  });

  it('opens recommend opportunity modal after clicking a button', async () => {
    renderComponentCardWithProvider([myOpportunityDetails]);

    const recommendOpportunityButton = await screen.findByRole('button', { name: 'Recommend' });
    userEvent.click(recommendOpportunityButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveTextContent('Recommend an Opportunity');
  });
});
