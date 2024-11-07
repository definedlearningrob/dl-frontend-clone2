import { screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route, Switch } from 'react-router-dom';
import { GraphQLError } from 'graphql';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PUBLIC_SHARED_RESUME } from '@shared/graphql/shared/query/publicPortfolioSharedCode';

import { GuestPortfolio } from './GuestPortfolio';

export const guestEmptySharedResumeMock = {
  request: {
    query: PUBLIC_SHARED_RESUME,
    variables: {
      shareCode: 'sharedPortfolio',
    },
  },
  result: {
    errors: [new GraphQLError('Portfolio not found')],
  },
};

export const guestSharedResumePortfolioEmptyMock = {
  request: {
    query: PUBLIC_SHARED_RESUME,
    variables: {
      shareCode: 'sharedPortfolio',
    },
  },
  result: {
    data: {
      sharedResume: {
        bio: 'some Bio',
        avatarUrl: 'some url',
        name: 'Allison Adams',
        contactLinks: [
          {
            id: '6',
            type: 'CUSTOM',
            value: '',
          },
          {
            id: '1',
            type: 'EMAIL',
            value: '',
          },
          {
            id: '2',
            type: 'PHONE',
            value: '',
          },
        ],
        educations: [],
        experiences: [],
        extraCurriculars: [],
        highlightedProjects: [],
        highlightedBadges: [],
        highlightedProjectsEnabled: false,
      },
    },
  },
};

export const guestSharedResumePortfolioMock = {
  request: {
    query: PUBLIC_SHARED_RESUME,
    variables: {
      shareCode: 'sharedPortfolio',
    },
  },
  result: {
    data: {
      sharedResume: {
        bio: 'some Bio',
        avatarUrl: 'some url',
        name: 'Allison Adams',
        contactLinks: [
          {
            id: '6',
            type: 'CUSTOM',
            value: '',
          },
          {
            id: '16',
            type: 'CUSTOM',
            value: 'google.com',
          },
          {
            id: '1',
            type: 'EMAIL',
            value: 'AllisonAddams@dc.com',
          },
          {
            id: '2',
            type: 'PHONE',
            value: '414-313-7621',
          },
        ],

        educations: [
          {
            id: '14',
            name: 'Education 1',
            description: 'some Education',
            startedAt: '2024-01-01',
            endedAt: '2024-04-01',
            type: 'EDUCATION',
            visible: true,
          },
        ],
        experiences: [
          {
            id: '13',
            name: 'Experience 1',
            description: 'some experience 1',
            startedAt: '2024-01-01',
            endedAt: '2024-04-01',
            type: 'EXPERIENCE',
            visible: true,
          },
        ],
        extraCurriculars: [
          {
            description: 'test',
            endedAt: '2024-04-01',
            id: '19',
            name: 'Extra Curricular 1',
            startedAt: '2024-01-01',
            type: 'Extra Curricular 1',
          },
        ],
        highlightedProjects: [
          {
            description: '<p>Taxi </p>',
            finishedAt: '2023-12-12',
            id: '20',
            imageUrl: 'some.img',
            isTeamSubmission: false,
            name: 'High lighted project 1',
            parentName: 'High Light',
            resourceClass: 'PRODUCT_SUBMISSION',
            startedAt: null,
            submission: {
              files: [
                {
                  isOwner: true,
                  createdAt: '2023-12-12T12:03:02Z',
                  filename: 'EmptyDOC copy.pdf',
                  submitter: {
                    fullName: 'Allison Adams',
                    firstName: 'Allison',
                    lastName: 'Adams',
                    uuid: '215b4d05-97d4-4867-8f70-xxxxxxxxx',
                    __typename: 'Student',
                  },
                  googleWeblink: null,
                  id: '20',
                  source: 'LOCAL',
                  url: 'some.url',
                },
              ],
              status: 'SUBMITTED',
            },
            thumbnailUrl: 'some.img',
            type: 'COURSE',
          },
          {
            description: '<p>Taxi </p>',
            finishedAt: '2023-12-12',
            id: '21',
            imageUrl: 'some.img',
            isTeamSubmission: false,
            name: 'High lighted project 2',
            parentName: 'High Light',
            resourceClass: 'ASSIGNMENT_SUBMISSION',
            startedAt: null,
            submission: {
              files: [
                {
                  isOwner: true,
                  createdAt: '2023-12-12T12:03:02Z',
                  filename: 'EmptyDOC copy.pdf',
                  submitter: {
                    fullName: 'Allison Adams',
                    firstName: 'Allison',
                    lastName: 'Adams',
                    uuid: '215b4d05-97d4-4867-8f70-xxxxxxxxx',
                    __typename: 'Student',
                  },
                  googleWeblink: null,
                  id: '21',
                  source: 'LOCAL',
                  url: 'some.url',
                },
              ],
              status: 'SUBMITTED',
            },
            thumbnailUrl: 'some.img',
            type: 'COURSE',
          },
        ],
        highlightedBadges: [
          {
            id: '1',
            description: 'badge description',
            name: 'Collaboration',
            imageUrl: 'some.img',
            resource: {
              id: '123',
              name: 'Architecture Virtual Internship',
            },
          },
          {
            id: '2',
            description: 'badge description',
            name: 'Professionalism',
            imageUrl: 'some.img',
            resource: {
              id: '321',
              name: 'Resume Preparation',
            },
          },
        ],
        highlightedProjectsEnabled: true,
      },
    },
  },
};

const guestMocks = [guestEmptySharedResumeMock];

const renderPublicResume = (mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <NavigationContextProvider>
        <Switch>
          <Route path='/resume/:fullName/:sharedUrl'>
            <GuestPortfolio isPublic={true} />
          </Route>
        </Switch>
      </NavigationContextProvider>
    </MockedProvider>,
    { route: '/resume/allison_adams/sharedPortfolio' }
  );

describe('GuestPortfolio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when data is being fetched', () => {
    const { container } = renderPublicResume(guestMocks);

    const skeletons = container.getElementsByClassName('skeleton-rectangle');
    expect(skeletons.length).toBe(5);
  });

  it('renders error state when portfolio is not shared', async () => {
    const { container } = renderPublicResume([guestEmptySharedResumeMock]);

    expect(await screen.findByText('Private Portfolio')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders empty state when all sections are empty', async () => {
    const { container } = renderPublicResume([guestSharedResumePortfolioEmptyMock]);

    expect(await screen.findByText('Portfolio is empty')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders portfolio data when data is returned', async () => {
    const { container } = renderPublicResume([guestSharedResumePortfolioMock]);

    const education = await screen.findByText('Education 1');
    const experience = screen.getByText('Experience 1');
    const extraCurricular = screen.getByText('Extra Curricular 1');
    const highlightedProject = screen.getByText('High lighted project 1');

    expect(education).toBeInTheDocument();
    expect(experience).toBeInTheDocument();
    expect(extraCurricular).toBeInTheDocument();
    expect(highlightedProject).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders source badge when highlighted project is returned', async () => {
    const { container } = renderPublicResume([guestSharedResumePortfolioMock]);

    const badge = await screen.findAllByTestId('project-source-badge');
    expect(badge).toHaveLength(2);
    expect(badge[0]).toHaveTextContent('Learning');
    expect(badge[1]).toHaveTextContent('Careers');

    expect(container).toMatchSnapshot();
  });
});
