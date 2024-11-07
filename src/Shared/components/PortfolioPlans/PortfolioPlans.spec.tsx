import { Route } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

import PORTFOLIO_PLANS_QUERY, {
  TPortfolioPlansData,
} from '@shared/graphql/student/query/portfolioPlans';
import PLAN_WITH_EVALUATION_QUERY from '@shared/graphql/student/query/planWithEvaluation';
import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import STUDENT_PORTFOLIO_PLANS from '@shared/graphql/user/query/studentPortfolioPlans';
import STUDENT_PORTFOLIO_PLAN_WITH_EVALUATION from '@shared/graphql/user/query/studentPortfolioPlanWithEvaluation';

import { StudentInfo, UserInfo } from './types';
import { PortfolioPlans } from './PortfolioPlans';

const studentPortfolioPlansWithEvaluationMock: MockedResponse = {
  request: {
    query: STUDENT_PORTFOLIO_PLAN_WITH_EVALUATION,
    variables: { uuid: '123', id: '48' },
  },
  result: {
    data: {
      student: {
        portfolio: {
          plan: {
            description:
              '<h5>Kentucky Grade 9 Individual Learning Plan</h5>\n<p>Congratulations! You are entering your first year of high school. This year should be an exciting time for you. Use this year to explore your likes and your dislikes and find a career that may be compatible with your interests and your strengths. Develop relationships with fellow classmates, teachers, school counselors and administrators.</p>\n<p>&nbsp;</p>\n<p>Try many clubs and organizations such as the speech club, soccer, a career and technical student organization related to your career pathway or any other extracurricular activity that matches your interests and strengths. Use this year as your launch pad to a successful high school career. Remember to have fun.</p>',
            evaluation: {
              id: '2570',
              __typename: 'Evaluation',
            },
            groups: [
              {
                description: '<p>KY ILP Grade 9 Indicators for Career Goals</p>',
                displayName: 'Career Goals',
                id: '119',
                name: 'Career Goals - KY Grade 9 ILP',
                statements: [
                  {
                    id: '387',
                    isLocked: false,
                    isRequired: false,
                    name: 'Take an interest survey or career assessment and record results in your Individual Learning Plan.',
                    step: 1,
                    evidences: [],
                    question: null,
                    results: [],
                    comments: [],
                    __typename: 'PlanGroupStatement',
                  },
                ],
                step: 2,
                __typename: 'PlanGroup',
              },
            ],
            id: '48',
            name: 'KY Grade 9 ILP',
            __typename: 'Plan',
            progress: {
              completed: 0,
              total: 1,
              __typename: 'PlanProgress',
            },
          },
          studentId: '10458930',
          __typename: 'Portfolio',
        },
        uuid: '123',
        __typename: 'Student',
      },
    },
  },
};

const plansMock: MockedResponse<TPortfolioPlansData> = {
  request: {
    query: PORTFOLIO_PLANS_QUERY,
  },
  result: {
    data: {
      portfolio: {
        plans: [
          {
            id: '48',
            name: 'Defined Portrait of a Graduate',
            evaluation: {
              id: '3',
            },
          },
          {
            id: '2',
            name: 'KY Grade 9 ILP',
            evaluation: {
              id: '1',
            },
          },
        ],
        studentId: '123',
      },
    },
  },
};

const studentPlansMock: MockedResponse = {
  request: {
    query: STUDENT_PORTFOLIO_PLANS,
    variables: { uuid: '123' },
  },
  result: {
    data: {
      student: {
        portfolio: {
          plans: [
            {
              id: '48',
              name: 'KY Grade 9 ILP',
              evaluation: {
                id: '2570',
                __typename: 'Evaluation',
              },
              __typename: 'Plan',
            },
          ],
          studentId: '10458930',
          __typename: 'Portfolio',
        },
        uuid: 'ffb8ccb6-ff90-48ce-8603-bec636ee5aa5',
        firstName: 'cleverteacher1',
        lastName: 'Demo',
        email: null,
        username: 'cleverteacher1_demo',
        __typename: 'Student',
      },
    },
  },
};

const planWithEvaluationResultMock = {
  data: {
    plan: {
      description:
        '<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://picsum.photos/600/300" width="795" height="57" /></p>\n<p>Defined has collaboratively constructed our Portrait of a Graduate which identifies competencies that can be practiced and supported through the utilization of Defined Learning and Defined Careers. This profile serves as our vision for teaching and learning and reinforces our beliefs through the performance tasks created and instructional processes supported.</p>',
      evaluation: {
        id: '3',
      },
      groups: [
        {
          description: '<p>Students are aware of and prepared for career opportunities.</p>',
          displayName: 'Career Readiness',
          id: '98',
          name: 'Defined - Career Readiness',
          statements: [
            {
              id: '267',
              name: 'Connects academic knowledge and skills to careers',
              step: 1,
              isLocked: false,
              comments: [],
              results: [],
              evidences: [],
              isRequired: false,
              question: null,
            },
            {
              id: '268',
              name: 'Shows awareness of opportunities and needs',
              step: 2,
              isLocked: false,
              comments: [],
              evidences: [],
              isRequired: false,
              results: [
                {
                  createdAt: '2023-09-09T07:28:43Z',
                  evaluator: {
                    firstName: 'Bruce',
                    lastName: 'Wayne',
                    uuid: 'someuuid',
                  },
                  result: EVALUATION_RESULTS_VALUES.IN_PROGRESS,
                },
              ],
              question: null,
            },
          ],
          step: 1,
        },
        {
          description: '<p>Students have met content standards for key subject areas.&nbsp;</p>',
          displayName: 'Academic Knowledge & Skills',
          id: '99',
          name: 'Defined - Academic Knowledge & Skills',
          evidences: [],
          isRequired: false,
          statements: [
            {
              id: '271',
              name: 'Demonstrates disciplinary understanding and use of competencies, practices, and processes',
              step: 1,
              isLocked: false,
              comments: [
                {
                  author: {
                    firstName: 'Bruce',
                    lastName: 'Wayne',
                    uuid: 'someuuid',
                  },
                  body: 'Could we add a status to my plan statement? It would help me track my progress more effectively. Thank you!',
                  createdAt: '2023-10-16T08:43:55Z',
                },
              ],
              results: [],
              evidences: [],
              isRequired: false,
              question: null,
            },
          ],
          step: 2,
        },
        {
          description:
            '<p>Students understand themselves, make good choices, and maintain relationships with others. &nbsp;</p>',
          displayName: 'Social & Emotional Learning',
          id: '100',
          name: 'Defined - Social & Emotional Learning',
          statements: [
            {
              id: '275',
              name: 'Accurately recognizes their own emotions, thoughts, and values',
              step: 1,
              isLocked: false,
              comments: [],
              results: [],
              evidences: [],
              isRequired: false,
              question: null,
            },
            {
              id: '276',
              name: 'Regulates emotions, thoughts, and behaviors',
              step: 2,
              isLocked: false,
              comments: [],
              results: [],
              evidences: [],
              isRequired: false,
              question: null,
            },
          ],
          step: 3,
        },
        {
          description:
            '<p>Students generate ideas, try new approaches, and are willing to take risks. &nbsp;</p>',
          displayName: 'Innovation & Creativity',
          id: '101',
          name: 'Defined - Innovation & Creativity',
          statements: [],
          step: 4,
        },
      ],
      id: '1',
      name: 'Defined Portrait of a Graduate',
      progress: {
        completed: 0,
        total: 5,
      },
    },
  },
};

const planWithEvaluationMock: MockedResponse = {
  request: {
    query: PLAN_WITH_EVALUATION_QUERY,
    variables: { id: '48' },
  },
  result: planWithEvaluationResultMock,
};
const renderComponent = (
  userInfo: UserInfo | StudentInfo = studentInfoMock.result.data.userInfo,
  type = 'student',
  mocks = [plansMock, planWithEvaluationMock]
) => {
  const isStudent = type === 'student';
  const routePath = isStudent ? '/plans' : '/students/:id/plans';
  const route = isStudent ? '/plans' : '/students/123/plans';

  return renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <NavigationContextProvider>
        <Route path={routePath}>
          <PortfolioPlans userInfo={userInfo} />
        </Route>
      </NavigationContextProvider>
    </MockedProvider>,
    { route: route, initialState: { session: { user: { type }, loginError: {} } } }
  );
};

describe('PortfolioPlans', () => {
  it('renders correctly', async () => {
    const { container } = renderComponent();

    const plansHeader = await screen.findByTestId('plans-header');
    expect(plansHeader).toHaveTextContent('Bruce Wayne');
    expect(plansHeader).toHaveTextContent('2 student plans');

    const planGroups = await screen.findAllByRole('listitem');
    expect(planGroups).toHaveLength(3);
    expect(planGroups[0]).toHaveTextContent('Career Readiness');
    expect(planGroups[1]).toHaveTextContent('Academic Knowledge & Skills');
    expect(planGroups[2]).toHaveTextContent('Social & Emotional Learning');

    expect(await screen.queryByText('Innovation & Creativity')).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('displays plan statements after expanding plan group', async () => {
    renderComponent();

    const planGroupButton = await screen.findByRole('button', { name: /Career Readiness/ });
    userEvent.click(planGroupButton);

    const planGroup = screen.getByRole('listitem', { name: /Career Readiness/ });
    const planStatements = within(planGroup).getAllByRole('listitem');
    expect(planStatements).toHaveLength(2);

    expect(planStatements[0]).toHaveTextContent(
      'Connects academic knowledge and skills to careers'
    );
    expect(planStatements[0]).toHaveTextContent('Not started');
    expect(planStatements[1]).toHaveTextContent('Shows awareness of opportunities and needs');
    expect(planStatements[1]).toHaveTextContent('In progress');
  });

  it('displays plan statement with plan id and student id in url', async () => {
    renderComponent();

    const reportLink = await screen.findByRole('link', { name: 'Goals: Progress report' });

    expect(reportLink).toHaveAttribute('href', '/reports/student-progress/48');
  });
});

describe('PortfolioPlans as teacher', () => {
  it('renders correctly', async () => {
    const { container } = renderComponent(userInfoMock.result.data.userInfo, 'teacher', [
      studentPlansMock,
      studentPortfolioPlansWithEvaluationMock,
    ]);
    expect(container).toMatchSnapshot();
  });

  it('has student report link', async () => {
    renderComponent(userInfoMock.result.data.userInfo, 'teacher', [
      studentPlansMock,
      studentPortfolioPlansWithEvaluationMock,
    ]);

    const reportLink = await screen.findByRole('link', { name: 'Goals: Progress report' });

    expect(reportLink).toHaveAttribute('href', '/reports/student-progress/48/123');
  });
});
