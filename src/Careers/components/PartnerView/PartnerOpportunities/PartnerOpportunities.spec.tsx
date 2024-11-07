import { PartnerOverviewQuery as UserPartnerOverViewQuery } from '@graphql/dc/users/operations';
import { PartnerOverviewQuery as StudentPartnerOverViewQuery } from '@graphql/dc/students/operations';
import { ApplicationStatus, OpportunityTypes } from '@graphql/dc/shared/types';
import { VirtualInternshipStatuses } from '@graphql/dc/students/types';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { PartnerOpportunities } from './PartnerOpportunities';

const userOpportunities: UserPartnerOverViewQuery['partner']['opportunities'] = [
  {
    id: '1',
    name: 'Google Web Developer Internship',
    opportunityType: OpportunityTypes.INTERNSHIP,
    pathways: [{ id: '36', name: 'Web and Digital Communications' }],
    imageUrl: null,
    deadline: '2023-02-16',
    periodStart: '2023-02-18',
    periodEnd: '2023-02-24',
    virtualInternship: null,
    hasPendingApplications: false,
  },
  {
    id: '4',
    name: 'Paid Internship in Finance Team',
    opportunityType: OpportunityTypes.JOB_SHADOW,
    pathways: [
      { id: '67', name: 'Business Finance' },
      { id: '68', name: 'Accounting' },
    ],
    imageUrl: 'https://picsum.photos/600/300',
    deadline: '2024-01-29',
    periodStart: '2024-02-01',
    periodEnd: '2024-02-28',
    virtualInternship: null,
    hasPendingApplications: true,
  },
  {
    id: '5',
    name: 'Process Engineering Intern at Hargrove Engineers & Constructors',
    opportunityType: OpportunityTypes.APPRENTICESHIP,
    pathways: [
      { id: '60', name: 'Biotechnology Research and Development' },
      { id: '47', name: 'Engineering and Technology' },
    ],
    imageUrl: 'https://picsum.photos/600/300',
    deadline: '2024-03-31',
    periodStart: '2024-04-01',
    periodEnd: '2024-06-30',
    virtualInternship: null,
    hasPendingApplications: false,
  },
  {
    id: '8',
    name: 'Virtual internship',
    opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP,
    pathways: [
      { id: '2', name: 'Animal Systems' },
      { id: '8', name: 'A/V Technology & Film' },
      { id: '68', name: 'Accounting' },
      { id: '14', name: 'Administration and Administrative Support' },
      { id: '65', name: 'Administrative Support' },
      { id: '1', name: 'Agribusiness Systems' },
      { id: '70', name: 'Banking Services' },
    ],
    imageUrl: 'https://picsum.photos/600/300',
    deadline: null,
    periodStart: null,
    periodEnd: null,
    virtualInternship: {
      roadmapItemsCount: 5,
      readinessSkillsLessons: [],
    },
    hasPendingApplications: false,
  },
];

const studentOpportunities: StudentPartnerOverViewQuery['partner']['opportunities'] = [
  {
    id: '5',
    name: 'Process Engineering Intern at Hargrove Engineers & Constructors',
    opportunityType: OpportunityTypes.APPRENTICESHIP,
    pathways: [
      { id: '60', name: 'Biotechnology Research and Development' },
      { id: '47', name: 'Engineering and Technology' },
    ],
    imageUrl: 'https://picsum.photos/600/300',
    deadline: '2024-03-31',
    periodStart: '2024-04-01',
    periodEnd: '2024-06-30',
    virtualInternship: null,
    applicationStatus: ApplicationStatus.ACCEPTED,
    isFavorite: false,
    isRecommended: true,
  },
  {
    id: '1',
    name: 'Google Web Developer Internship',
    opportunityType: OpportunityTypes.INTERNSHIP,
    pathways: [{ id: '36', name: 'Web and Digital Communications' }],
    imageUrl: null,
    deadline: '2023-02-16',
    periodStart: '2023-02-18',
    periodEnd: '2023-02-24',
    virtualInternship: null,
    applicationStatus: null,
    isFavorite: false,
    isRecommended: false,
  },
  {
    id: '4',
    name: 'Paid Internship in Finance Team',
    opportunityType: OpportunityTypes.JOB_SHADOW,
    pathways: [
      { id: '67', name: 'Business Finance' },
      { id: '68', name: 'Accounting' },
    ],
    imageUrl: 'https://picsum.photos/600/300',
    deadline: '2024-01-29',
    periodStart: '2024-02-01',
    periodEnd: '2024-02-28',
    virtualInternship: null,
    applicationStatus: ApplicationStatus.PENDING,
    isFavorite: false,
    isRecommended: false,
  },
  {
    id: '3',
    name: 'Internship - HR, Workday System Support',
    opportunityType: OpportunityTypes.INTERNSHIP,
    pathways: [{ id: '63', name: 'Human Resources Management' }],
    imageUrl: 'https://picsum.photos/600/300',
    deadline: '2024-04-16',
    periodStart: '2024-05-05',
    periodEnd: '2024-06-16',
    virtualInternship: null,
    applicationStatus: null,
    isFavorite: false,
    isRecommended: false,
  },
  {
    id: '8',
    name: 'Virtual internship',
    opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP,
    pathways: [
      { id: '2', name: 'Animal Systems' },
      { id: '8', name: 'A/V Technology & Film' },
      { id: '68', name: 'Accounting' },
      { id: '14', name: 'Administration and Administrative Support' },
      { id: '65', name: 'Administrative Support' },
      { id: '1', name: 'Agribusiness Systems' },
      { id: '70', name: 'Banking Services' },
    ],
    imageUrl: 'https://picsum.photos/600/300',
    deadline: null,
    periodStart: null,
    periodEnd: null,
    virtualInternship: {
      status: VirtualInternshipStatuses.IN_PROGRESS,
      roadmapItemsCount: 5,
      readinessSkillsLessons: [],
    },
    applicationStatus: ApplicationStatus.ACCEPTED,
    isFavorite: true,
    isRecommended: false,
  },
];

type Opportunities =
  | StudentPartnerOverViewQuery['partner']['opportunities']
  | UserPartnerOverViewQuery['partner']['opportunities'];

type Params = {
  opportunities?: Opportunities;
  isLoading?: boolean;
  userType?: 'student' | 'user';
};

const renderComponent = ({ opportunities, isLoading = false, userType = 'student' }: Params) => {
  const userInfo = userType === 'student' ? studentInfoMock : userInfoMock;

  return renderWithRouterAndReduxProvider(
    <MockedProvider>
      <UserInfoProvider value={{ userInfo: userInfo.result.data.userInfo }}>
        <PartnerOpportunities isLoading={isLoading} opportunities={opportunities} />
      </UserInfoProvider>
    </MockedProvider>,
    { initialState: { session: { loginError: {}, user: { type: userType } } } }
  );
};

describe('PartnerOpportunities', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-06-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('displays skeleton when loading', () => {
    const { container } = renderComponent({ isLoading: true });

    expect(screen.getByTestId('partner-opportunities-skeleton')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('displays empty state for student when there are no opportunities', async () => {
    const { container } = renderComponent({ opportunities: [] });

    expect(
      await screen.findByRole('heading', { name: "We couldn't find any opportunities" })
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('displays empty state for user when there are no opportunities', async () => {
    const { container } = renderComponent({ opportunities: [], userType: 'user' });

    expect(
      await screen.findByRole('heading', { name: 'Opportunities list is empty' })
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('displays opportunities for student', async () => {
    const { container } = renderComponent({ opportunities: studentOpportunities });

    const opportunityCards = await screen.findAllByRole('listitem');
    expect(opportunityCards).toHaveLength(5);
    expect(opportunityCards[0]).toHaveTextContent(
      'Process Engineering Intern at Hargrove Engineers & Constructors'
    );
    expect(opportunityCards[1]).toHaveTextContent('Google Web Developer Internship');
    expect(opportunityCards[2]).toHaveTextContent('Paid Internship in Finance Team');
    expect(opportunityCards[3]).toHaveTextContent('Internship - HR, Workday System Support');
    expect(opportunityCards[4]).toHaveTextContent('Virtual internship');

    expect(container).toMatchSnapshot();
  });

  it('displays opportunities for user', async () => {
    const { container } = renderComponent({ opportunities: userOpportunities, userType: 'user' });

    const opportunityCards = await screen.findAllByRole('listitem');
    expect(opportunityCards).toHaveLength(4);
    expect(opportunityCards[0]).toHaveTextContent('Google Web Developer Internship');
    expect(opportunityCards[1]).toHaveTextContent('Paid Internship in Finance Team');
    expect(opportunityCards[2]).toHaveTextContent(
      'Process Engineering Intern at Hargrove Engineers & Constructors'
    );
    expect(opportunityCards[3]).toHaveTextContent('Virtual internship');

    expect(container).toMatchSnapshot();
  });

  it('navigates to opportunity details when clicking on an opportunity card', async () => {
    const { history } = renderComponent({ opportunities: studentOpportunities });
    history.push = jest.fn();

    const opportunityCard = await screen.findByRole('listitem', {
      name: 'Paid Internship in Finance Team',
    });
    userEvent.click(within(opportunityCard).getByRole('link'));

    expect(history.push).toHaveBeenCalledWith({
      pathname: '/opportunities/4',
      state: { from: '/' },
    });
  });
});
