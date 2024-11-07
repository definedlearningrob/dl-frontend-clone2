import { screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router-dom';

import { DLStudentInfoMock } from '@pbl/tests/mocks/studentInfoMock';
import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';
import cacheConfig from '@pbl/graphql/cacheConfig';
import userInfo from '@pbl/graphql/student/queries/userInfo';

import { SHARED_RESUME } from '@shared/graphql/student/query/portfolioShareResume';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import PortfolioProvider from '@shared/components/Portfolio/helpers/usePortfolioContext';
import {
  portfolioCareersProjectsMock,
  portfolioCareersResumesMock,
} from '@shared/components/EditPortfolio/mocks';
import { TCurrentUserInfo } from '@shared/components/Portfolio/types';
import { StudentPublicPortfolio } from '@shared/components/PublicPortfolio/StudentPublicPortfolio';

const publicPortfolioSharedResumeMock = {
  request: {
    query: SHARED_RESUME,
    variables: { shareCode: 'testUrl' },
  },
  result: {
    data: {
      sharedResume: {
        avatarUrl: 'student.png',
        highlightedBadges: [],
        bio: 'some Bio info DL Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        externalResumes: [],
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
                  isOwner: true,
                  createdAt: '2023-12-12T12:03:02Z',
                  filename: 'EmptyDOC copy.pdf',
                  submitter: {
                    fullName: 'Amanda Jewess',
                    firstName: 'Amanda',
                    lastName: 'Jewess',
                    uuid: '215b4d05-97d4-4867-8f70-xxxxxxx',
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

const studentMocks = [
  DLStudentInfoMock,
  portfolioCareersProjectsMock,
  portfolioCareersResumesMock,
  publicPortfolioSharedResumeMock,
];

const renderComponent = (mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={cacheConfig} mocks={[...studentMocks, ...mocks]}>
      <NavigationContextProvider>
        <PortfolioProvider
          studentInfo={studentInfo}
          userInfo={userInfo as unknown as TCurrentUserInfo}>
          <Route path='/portfolio/resume/:fullName/:sharedUrl'>
            <StudentPublicPortfolio isPublic={false} />
          </Route>
        </PortfolioProvider>
      </NavigationContextProvider>
    </MockedProvider>,
    { route: '/portfolio/resume/amanda_jewess/testUrl' }
  );

describe('StudentPublicPortfolio', () => {
  it('should render correctly', async () => {
    const { container } = renderComponent();

    expect(await screen.findByText('Amanda Jewess')).toBeVisible();
    expect(screen.getByText('some experience 1')).toBeVisible();
    expect(screen.getByText('some Education')).toBeVisible();
    expect(screen.getByText('some Extra curriculars 1')).toBeVisible();
    expect(screen.getByText('Taxi Driver Schedule')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
