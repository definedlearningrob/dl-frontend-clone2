import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';
import { Portfolio } from '@pbl/screens/StudentApp/Portfolio/Portfolio';
import { DLStudentInfoMock } from '@pbl/tests/mocks/studentInfoMock';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import PortfolioProvider from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { TCurrentUserInfo } from '@shared/components/Portfolio/types';
import {
  portfolioCareersEmptyProjectsMock,
  portfolioCareersProjectsMock,
  portfolioCareersResumesMock,
  portfolioLearningEmptyProjectsMock,
  portfolioLearningProjectsMock,
  portfolioPersonalEmptyProjectsMock,
  portfolioPersonalProjectsMock,
} from '@shared/components/EditPortfolio/mocks';
import { TPortfolioProjectConnectionData } from '@shared/graphql/student/query/portfolioProjects';

const studentInfo = {
  uuid: '123',
  lastName: 'Jewess',
  firstName: 'Amanda',
  email: '',
  username: 'amanda.jewess',
};
const defaultRoute = '/';

type MockedResponseProps = {
  data: TPortfolioProjectConnectionData;
};

const renderComponent = (mocks: MockedResponse[] = [], route = defaultRoute) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[DLStudentInfoMock, ...mocks]}>
      <NavigationContextProvider>
        <div app-type='learning' className='app'>
          <PortfolioProvider
            studentInfo={studentInfo}
            userInfo={userInfoMock.result.data.userInfo as unknown as TCurrentUserInfo}>
            <Portfolio />
          </PortfolioProvider>
        </div>
      </NavigationContextProvider>
    </MockedProvider>,
    {
      route,
      initialState: { session: { loginError: {}, user: { type: 'student' } } },
    }
  );

describe('Portfolio', () => {
  const scrollToSpy = jest.fn();
  global.scrollTo = scrollToSpy;

  it('renders correctly', async () => {
    const { container } = renderComponent([
      portfolioCareersResumesMock,
      portfolioCareersProjectsMock,
    ]);

    expect(await screen.findByText('Portfolio')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render list of DC projects if Defined Careers tab is active', async () => {
    renderComponent([portfolioCareersResumesMock, portfolioCareersProjectsMock]);
    const definedCareers = await screen.findByRole('tab', {
      name: 'Defined Careers',
    });
    userEvent.click(definedCareers);

    const projects = await screen.findAllByTestId('portfolio-project-card');
    const { data } = portfolioCareersProjectsMock.result as MockedResponseProps;

    const expectedProjects = data.portfolio.projects.edges.map(({ node: project }) => project.name);

    expectedProjects.forEach((projectName: string) => {
      expect(screen.getByRole('heading', { name: projectName }));
    });

    expect(projects).toHaveLength(13);
  });

  it('should render list of DL projects if Defined Learning tab is active', async () => {
    const route = '?tabId=PBL';
    renderComponent([portfolioLearningProjectsMock, portfolioCareersResumesMock], route);

    const definedLearning = await screen.findByRole('tab', {
      name: 'Defined Learning',
    });
    userEvent.click(definedLearning);

    const projects = await screen.findByText('Projects');
    expect(projects).toBeVisible();

    const projectsCards = await screen.findAllByTestId('portfolio-project-card');

    const { data } = portfolioLearningProjectsMock.result;

    const expectedProjects = data.portfolio.projects.edges.map(({ node: project }) => project.name);

    expectedProjects.forEach((projectName: string) => {
      expect(screen.getByRole('heading', { name: projectName }));
    });

    expect(projectsCards).toHaveLength(2);
  });

  it('should render list of personal projects if Personal tab is active', async () => {
    const route = '?tabId=PERSONAL';
    renderComponent(
      [
        portfolioPersonalProjectsMock,
        portfolioCareersResumesMock,
        portfolioCareersProjectsMock,
        portfolioCareersResumesMock,
      ],
      route
    );

    const personal = await screen.findByRole('tab', {
      name: 'Personal',
    });

    userEvent.click(personal);

    const projects = await screen.findAllByTestId('portfolio-project-card');

    const { data } = portfolioPersonalProjectsMock.result as MockedResponseProps;

    const expectedProjects = data.portfolio.projects.edges.map(({ node: project }) => project.name);

    expectedProjects.forEach((projectName: string) => {
      expect(screen.getByRole('heading', { name: projectName }));
    });

    expect(projects).toHaveLength(1);
  });

  it('should render "create new project when personal projects are empty', async () => {
    const route = '?tabId=PERSONAL';
    renderComponent(
      [
        portfolioPersonalEmptyProjectsMock,
        portfolioCareersResumesMock,
        portfolioCareersProjectsMock,
        portfolioCareersResumesMock,
      ],
      route
    );

    const personal = await screen.findByRole('tab', {
      name: 'Personal',
    });
    userEvent.click(personal);

    const createProject = await screen.findByRole('button', { name: 'Create Project' });

    expect(createProject).toBeInTheDocument();
  });

  it('should render empty tab when there are no projects', async () => {
    renderComponent([portfolioCareersResumesMock]);

    const emptyPlaceholder = await screen.findByText('You haven’t added your Experience yet.');
    expect(emptyPlaceholder).toBeInTheDocument();
  });

  it('should render empty state when tab is change and there are no projects', async () => {
    const route = '?tabId=PERSONAL';
    renderComponent(
      [
        portfolioCareersResumesMock,
        portfolioCareersEmptyProjectsMock,
        portfolioLearningEmptyProjectsMock,
        portfolioPersonalEmptyProjectsMock,
        portfolioCareersResumesMock,
      ],
      route
    );

    const careersTab = await screen.findByRole('tab', {
      name: 'Defined Careers',
    });
    userEvent.click(careersTab);

    const emptyPlaceholder = await screen.findByText('Defined Careers assignments are empty.');
    expect(emptyPlaceholder).toBeInTheDocument();

    const LearningTab = await screen.findByRole('tab', { name: 'Defined Learning' });
    userEvent.click(LearningTab);

    const emptyPlaceholder2 = await screen.findByText('Defined Learning projects are empty.');
    expect(emptyPlaceholder2).toBeInTheDocument();

    const personalTab = await screen.findByRole('tab', { name: 'Personal' });
    userEvent.click(personalTab);

    const emptyPlaceholder3 = await screen.findByText('Personal projects are empty.');
    expect(emptyPlaceholder3).toBeInTheDocument();
  });
});
