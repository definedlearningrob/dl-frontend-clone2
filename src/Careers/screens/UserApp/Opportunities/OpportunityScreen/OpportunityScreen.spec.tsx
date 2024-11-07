import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import cacheConfig from '@dc/graphql/cacheConfig';
import { OPPORTUNITY_QUERY, TOpportunityData } from '@dc/graphql/user/queries/opportunities';
import { OPPORTUNITY_APPLICATION_STATUS, Roles, VISIBILITY_SCOPE } from '@dc/resources/enums';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

import { OpportunityScreen } from './OpportunityScreen';

const opportunityMock: MockedResponse<TOpportunityData> = {
  request: {
    query: OPPORTUNITY_QUERY,
    variables: { id: '1', track: true, filter: undefined },
  },
  result: {
    data: {
      opportunity: {
        applications: {
          pagesCount: 1,
          nodesCount: 3,
          nodes: [
            {
              id: '1',
              status: OPPORTUNITY_APPLICATION_STATUS.PENDING,
              student: {
                uuid: '1234-1234-1234-1234',
                fullName: 'Jon James',
                schoolClasses: [
                  { uuid: '4321-4321-4321-4322', name: 'Science - Grade 7' },
                  { uuid: '4321-4321-4321-4321', name: 'Calculus' },
                ],
              },
              appliedAt: '2021-04-20',
              answers: [],
              updatedAt: '2021-12-01',
            },
            {
              id: '2',
              status: OPPORTUNITY_APPLICATION_STATUS.REJECTED,
              student: {
                uuid: '1234-1234-1234-1235',
                fullName: 'Lebron James',
                schoolClasses: [{ uuid: '4321-4321-4321-4321', name: 'Calculus' }],
              },
              appliedAt: '2021-04-21',
              answers: [],
              updatedAt: '2021-12-01',
            },
            {
              id: '3',
              status: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
              student: {
                uuid: '1234-1234-1234-1236',
                fullName: 'Betty Cooper',
                schoolClasses: [{ uuid: '4321-4321-4321-4321', name: 'Calculus' }],
              },
              appliedAt: '2021-04-31',
              answers: [],
              updatedAt: '2021-12-01',
            },
          ],
        },
        entities: [
          {
            uuid: '1234-1234-1234-1234',
            name: 'Process Engineering Intern at Hargrove Engineers & Constructors',
          },
        ],
        automaticAcceptance: false,
        availableSpots: 10,
        creditsOutcomes: 'Opportunity credits and outcomes',
        deadline: '2023-04-30',
        description: 'Opportunity description',
        id: '1',
        imageUrl: 'https://picsum.photos/400/300',
        location: 'New York',
        name: 'Avent Health Nursing Program - Intership',
        opportunityType: OpportunityTypes.INTERNSHIP,
        pathways: [{ id: '12', name: 'Healthcare' }],
        createdAt: '2023-05-10',
        periodStart: '2023-05-30',
        periodEnd: '2024-05-30',
        salaryInformation: '$100,000 annual',
        tags: [],
        visibilityScope: VISIBILITY_SCOPE.ALL,
        thumbnailUrl: '',
        hasPendingApplications: true,
        virtualInternship: null,
        imageFitToContainer: false,
        partner: {
          id: '1',
          name: 'Dunder Mifflin Paper Company, Inc.',
        },
      },
    },
  },
};

const renderComponent = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={cacheConfig} mocks={[opportunityMock]}>
      <UserInfoProvider
        value={{
          userInfo: {
            ...userInfoMock.result.data.userInfo,
            permissions: {
              wblAdmin: true,
              counselor: false,
              canImpersonate: false,
              canBrowseReports: false,
            },
            role: Roles.TEACHER,
          },
        }}>
        <NavigationContextProvider>
          <Route path='/opportunities/:id'>
            <OpportunityScreen />
          </Route>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/opportunities/1' }
  );

describe('OpportunityScreen', () => {
  it('renders summary card with correct data', async () => {
    const { container } = renderComponent();

    expect(
      await screen.findByRole('heading', { name: 'Avent Health Nursing Program - Intership' })
    ).toBeInTheDocument();

    const opportunitySummaryCard = await screen.findByTestId('opportunity-summary-card');
    expect(opportunitySummaryCard).toHaveTextContent('Internship');
    expect(opportunitySummaryCard).toHaveTextContent('Dunder Mifflin Paper Company, Inc.');
    expect(opportunitySummaryCard).toHaveTextContent('May 30, 2023 - May 30, 2024');
    expect(opportunitySummaryCard).toHaveTextContent('Deadline:Apr 30, 2023');

    expect(container).toMatchSnapshot();
  });

  it('displays correct data depending on selected tab', async () => {
    renderComponent();

    const tabContent = await screen.findByTestId('opportunity-tab-content');

    expect(tabContent).toHaveTextContent('Opportunity Details');
    expect(tabContent).toHaveTextContent('Opportunity description');

    userEvent.click(screen.getByRole('tab', { name: 'Location & Dates' }));

    expect(tabContent).toHaveTextContent('Location & Dates');
    expect(tabContent).toHaveTextContent('New York');

    userEvent.click(screen.getByRole('tab', { name: 'Salary Information' }));

    expect(tabContent).toHaveTextContent('Salary Information');
    expect(tabContent).toHaveTextContent('$100,000 annual');

    userEvent.click(screen.getByRole('tab', { name: 'Credits & Outcomes' }));

    expect(tabContent).toHaveTextContent('Credits & Outcomes');
    expect(tabContent).toHaveTextContent('Opportunity credits and outcomes');
  });

  it('displays participants grouped by class in correct order', async () => {
    renderComponent();

    const participantListCard = await screen.findByLabelText('Participant List');
    const participantSchoolClasses =
      within(participantListCard).getAllByTestId('school-class-section');

    expect(participantSchoolClasses).toHaveLength(2);

    expect(participantSchoolClasses[0]).toHaveTextContent('Calculus');

    const calculusParticipants = within(participantSchoolClasses[0]).getAllByRole('listitem');
    expect(calculusParticipants).toHaveLength(3);
    expect(calculusParticipants[0]).toHaveTextContent('Betty Cooper');
    expect(calculusParticipants[1]).toHaveTextContent('Jon James');
    expect(calculusParticipants[2]).toHaveTextContent('Lebron James');

    expect(participantSchoolClasses[1]).toHaveTextContent('Science - Grade 7');

    const scienceParticipants = within(participantSchoolClasses[1]).getAllByRole('listitem');
    expect(scienceParticipants).toHaveLength(1);
    expect(scienceParticipants[0]).toHaveTextContent('Jon James');
  });

  it('display correctly mapped statuses', async () => {
    renderComponent();

    const participantListCard = await screen.findByLabelText('Participant List');
    const participantSchoolClasses =
      within(participantListCard).getAllByTestId('school-class-section');
    const calculusParticipants = within(participantSchoolClasses[0]).getAllByRole('listitem');

    expect(calculusParticipants[0]).toHaveTextContent('Betty Cooper');
    expect(calculusParticipants[0]).toHaveTextContent('Accepted');

    expect(calculusParticipants[1]).toHaveTextContent('Jon James');
    expect(calculusParticipants[1]).toHaveTextContent('Pending');

    expect(calculusParticipants[2]).toHaveTextContent('Lebron James');
    expect(calculusParticipants[2]).toHaveTextContent('Not Accepted');
  });
});
