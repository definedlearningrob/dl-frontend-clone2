import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { Portfolio } from '@dc/screens/StudentApp/Portfolio/Portfolio';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

import PORTFOLIO_RESUMES from '@shared/graphql/student/query/portfolioResumes';
import PORTFOLIO_PROJECTS from '@shared/graphql/student/query/portfolioProjects';
import { TCurrentUserInfo } from '@shared/components/Portfolio/types';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import PortfolioProvider from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

const requestSpy = jest.fn();

const emptyResumeResponse = {
  data: {
    portfolio: {
      sharedResume: {
        externalResumes: [],
        avatarUrl: null,
        bio: null,
        badges: [],
        highlightedBadges: [],
        contactLinks: [],
        dcProjects: { nodes: [] },
        dlProjects: { nodes: [] },
        educations: [],
        experiences: [],
        extraCurriculars: [],
        highlightedProjects: [],
        highlightedProjectsEnabled: true,
        id: '1',
        name: 'Amanda Jewess',
        personalProjects: { nodes: [] },
        sharedUrl: 'testUrl',
        sharedUrlEnabled: true,
      },
      studentId: '123',
    },
  },
};

const emptyProjectsResponse = {
  data: {
    portfolio: {
      projects: {
        edges: [],
      },
      studentId: '123',
    },
  },
};
const projectsResponse = {
  data: {
    portfolio: {
      projects: {
        totalCount: 1,
        edges: [
          {
            cursor: 'Mg',
            node: {
              description: 'Create an electronic scouting report',
              id: '30',
              isHighlighted: false,
              name: 'Scouting Report',
              imageUrl: 'http://www.img.com',
              parentName: 'Statisticians',
              isTeamSubmission: false,
              resourceClass: 'ASSIGNMENT_SUBMISSION',
              submission: {
                files: [
                  {
                    id: '29',
                    isOwner: true,
                    filename: 'EmptyDOC copy 2.pdf',
                    googleWeblink: null,
                    source: 'LOCAL',
                    url: 'http://localstack:1',
                    createdAt: '2024-01-19T07:38:53Z',
                    submitter: {
                      fullName: 'Amanda Jewess',
                      firstName: 'Amanda',
                      lastName: 'Jewess',
                      uuid: '123',
                    },
                  },
                ],
                status: 'SUBMITTED',
              },
              finishedAt: '2024-01-19',
              type: 'COURSE',
              thumbnailUrl: 'http://localstack:1',
            },
          },
        ],
        pageInfo: {
          endCursor: 'Mg',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: 'Mg',
        },
      },
      studentId: '123',
    },
  },
};

const portfolioEmptyProjectMock = (type: { type: PORTFOLIO_PROJECT_TYPES }) => ({
  request: {
    query: PORTFOLIO_PROJECTS,
    variables: { first: 10, type: type },
  },
  result: () => {
    requestSpy();

    return emptyProjectsResponse;
  },
});
const portfolioProjectMock = {
  request: {
    query: PORTFOLIO_PROJECTS,
    variables: { first: 10, type: PORTFOLIO_PROJECT_TYPES.CAREERS },
  },
  result: () => {
    requestSpy();

    return projectsResponse;
  },
};

const portfolioEmptyMock = {
  request: {
    query: PORTFOLIO_RESUMES,
    variables: {},
  },
  result: emptyResumeResponse,
};

const portfolioResumesMock = {
  request: {
    query: PORTFOLIO_RESUMES,
    variables: {},
  },
  result: {
    data: {
      portfolio: {
        sharedResume: {
          externalResumes: [],
          avatarUrl: 'student.png',
          bio: 'some Bio info DC Lorem',
          badges: [],
          highlightedBadges: [],
          contactLinks: [
            {
              id: '1',
              type: 'EMAIL',
              value: 'amanda@dc.com',
              visible: true,
            },
            {
              id: '2',
              type: 'PHONE',
              value: '414-313-7621',
              visible: true,
            },
            {
              id: '5',
              type: 'CUSTOM',
              value: '',
              visible: true,
            },
            {
              id: '6',
              type: 'CUSTOM',
              value: '',
              visible: true,
            },
          ],
          dcProjects: {
            nodes: {
              description: 'Create an electronic scouting report',
              id: '30',
              isHighlighted: false,
              name: 'Scouting Report',
              imageUrl: 'http://www.img.com',
              parentName: 'Statisticians',
              isTeamSubmission: false,
              resourceClass: 'ASSIGNMENT_SUBMISSION',
              submission: {
                files: [
                  {
                    id: '29',
                    filename: 'EmptyDOC copy 2.pdf',
                    isOwner: true,
                    googleWeblink: null,
                    source: 'LOCAL',
                    url: 'http://localstack:1',
                    createdAt: '2024-01-19T07:38:53Z',
                    submitter: {
                      fullName: 'Amanda Jewess',
                      firstName: 'Amanda',
                      lastName: 'Jewess',
                      uuid: '123',
                    },
                  },
                ],
                status: 'SUBMITTED',
              },
              finishedAt: '2024-01-19',
              type: 'COURSE',
              thumbnailUrl: 'http://localstack:1',
            },
          },
          dlProjects: {
            nodes: [],
          },
          personalProjects: {
            nodes: [],
          },
          educations: [
            {
              description: 'some Education',
              endedAt: '2024-04-01',
              id: '14',
              name: 'Education 1',
              startedAt: '2024-01-01',
              type: 'EDUCATION',
              visible: true,
            },
          ],
          experiences: [
            {
              description: 'some experience 1',
              endedAt: '2024-04-01',
              id: '13',
              name: 'title',
              startedAt: '2024-01-01',
              type: 'EXPERIENCE',
              visible: true,
            },
          ],
          extraCurriculars: [
            {
              description: 'some Extra curriculars 1',
              endedAt: '2024-07-01',
              id: '15',
              name: 'Extra curriculars 1',
              startedAt: '2024-01-01',
              type: 'EXTRA_CURRICULAR',
              visible: true,
            },
          ],
          highlightedProjects: [
            {
              description: '<p>Taxi drivers</p>',
              finishedAt: '2023-12-12',
              id: '20',
              imageUrl: 'someimage.png',
              isHighlighted: true,
              isTeamSubmission: false,
              name: 'Taxi Driver Schedule',
              parentName: 'Taxi Drivers',
              resourceClass: 'ASSIGNMENT_SUBMISSION',
              startedAt: null,
              submission: {
                files: [
                  {
                    id: '29',
                    filename: 'EmptyDOC copy 2.pdf',
                    isOwner: true,
                    googleWeblink: null,
                    source: 'LOCAL',
                    url: 'http://localstack:1',
                    createdAt: '2024-01-19T07:38:53Z',
                    submitter: {
                      fullName: 'Amanda Jewess',
                      firstName: 'Amanda',
                      lastName: 'Jewess',
                      uuid: '123',
                    },
                  },
                ],
                status: 'SUBMITTED',
              },
              submittedAt: '2023-12-12T12:03:04Z',
              thumbnailUrl: 'someimage.png',
              type: 'COURSE',
            },
          ],
          highlightedProjectsEnabled: true,
          id: '1',
          name: 'Amanda Jewess',
          shareCode: 'testUrl',
          sharedUrl: 'testUrl',
          sharedUrlEnabled: true,
        },
        studentId: '123',
      },
    },
  },
};

const studentInfo = {
  uuid: '123',
  lastName: 'Jewess',
  firstName: 'Amanda',
  email: '',
  username: 'amanda.jewess',
};

const studentMocks = [studentInfoMock];

const renderComponent = (mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...studentMocks, ...mocks]}>
      <NavigationContextProvider>
        <PortfolioProvider
          studentInfo={studentInfo}
          userInfo={userInfoMock.result.data.userInfo as unknown as TCurrentUserInfo}>
          <Route path='/portfolio/'>
            <Portfolio />
          </Route>
        </PortfolioProvider>
      </NavigationContextProvider>
    </MockedProvider>,
    {
      route: '/portfolio',
      initialState: { session: { loginError: {}, user: { type: 'student' } } },
    }
  );

describe('Portfolio', () => {
  it('should render empty state correctly', async () => {
    const { container } = renderComponent([portfolioEmptyMock]);
    expect(await screen.findByText('You haven’t added your Experience yet.')).toBeVisible();
    expect(screen.getByText('You haven’t added your Education yet.')).toBeVisible();
    expect(screen.getByText('You haven’t added your Extra-Curriculars yet.')).toBeVisible();
    expect(screen.getByText('Fill portfolio')).toBeVisible();

    expect(container).toMatchSnapshot();
  });

  it('should display empty careers projects', async () => {
    const dcMock = portfolioEmptyProjectMock({
      type: PORTFOLIO_PROJECT_TYPES.CAREERS,
    });
    const { container } = renderComponent([portfolioEmptyMock, dcMock]);
    const button = await screen.findByText('Defined Careers');
    userEvent.click(button);

    const emptyTitle = await screen.findByText('Defined Careers assignments are empty.');
    expect(emptyTitle).toBeInTheDocument();

    const emptyDescription = screen.getByText(
      "You don't have any projects currently. Submit a product to update your portfolio."
    );
    expect(emptyDescription).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should display empty Defined Learning projects', async () => {
    const pblMock = portfolioEmptyProjectMock({
      type: PORTFOLIO_PROJECT_TYPES.PBL,
    });
    const { container } = renderComponent([portfolioEmptyMock, pblMock]);
    const button = await screen.findByText('Defined Learning');
    userEvent.click(button);

    const emptyTitle = await screen.findByText('Defined Learning projects are empty.');
    expect(emptyTitle).toBeInTheDocument();

    const emptyDescription = screen.getByText(
      "You don't have any projects currently. Submit a product to update your portfolio."
    );
    expect(emptyDescription).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should display empty personal projects', async () => {
    const personalMock = portfolioEmptyProjectMock({
      type: PORTFOLIO_PROJECT_TYPES.PERSONAL,
    });
    const { container } = renderComponent([portfolioEmptyMock, personalMock]);
    const button = await screen.findByText('Personal');
    userEvent.click(button);

    const emptyTitle = await screen.findByText('Personal projects are empty.');
    expect(emptyTitle).toBeInTheDocument();

    const emptyDescription = screen.getByText(
      "You don't have any projects currently. Submit a product to update your portfolio."
    );

    expect(emptyDescription).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should display student resume', async () => {
    const { container } = renderComponent([portfolioResumesMock]);

    expect(await screen.findByText('Amanda Jewess')).toBeVisible();
    expect(screen.getByText('some Bio info DC Lorem')).toBeVisible();

    expect(screen.getByRole('link', { name: '414-313-7621' })).toHaveAttribute(
      'href',
      'tel:414-313-7621'
    );
    expect(screen.getByRole('link', { name: 'amanda@dc.com' })).toHaveAttribute(
      'href',
      'mailto:amanda@dc.com'
    );

    expect(screen.getByText('some experience 1')).toBeVisible();
    expect(screen.getByText('some Education')).toBeVisible();
    expect(screen.getByText('some Extra curriculars 1')).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('should display careers projects', async () => {
    const { container } = renderComponent([portfolioResumesMock, portfolioProjectMock]);

    const button = await screen.findByText('Defined Careers');
    userEvent.click(button);

    const title = await screen.findByText('Scouting Report');
    const description = screen.getByText('Create an electronic scouting report');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
