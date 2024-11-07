import { Route } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { ApplicationStatus, VirtualInternshipStatuses } from '@graphql/dc/students/types';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { OPPORTUNITY_QUERY } from '@dc/graphql/student/queries/opportunity';
import { TOpportunityData } from '@dc/graphql/student/queries/opportunity';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';
import {
  TVirtualInternshipContentData,
  VIRTUAL_INTERNSHIP_CONTENT_QUERY,
} from '@dc/graphql/student/queries/virtualInternshipContent';
import cacheConfig from '@dc/graphql/cacheConfig';
import { MANAGE_OPPORTUNITY_EXPERIENCE_LESSONS } from '@dc/graphql/student/mutations/manageOpportunityExperienceLessons';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

import { CalendarSection } from './CalendarSection';

const opportunityResponse = {
  data: {
    opportunity: {
      id: '1',
      name: 'Virtual internship',
      applicationStatus: ApplicationStatus.ACCEPTED,
      automaticAcceptance: true,
      availableSpots: 100,
      creditsOutcomes: '',
      isFavorite: false,
      isRecommended: false,
      description: '',
      imageUrl: 'https://picsum.photos/600/300',
      location: null,
      deadline: null,
      periodStart: null,
      periodEnd: null,
      questions: [],
      virtualInternship: {
        id: '2',
        roadmapItemsCount: 4,
        status: VirtualInternshipStatuses.IN_PROGRESS,
        requiredExperiences: 1,
        readinessSkillsLessons: [],
        experienceOpportunityLessons: [
          {
            type: 'experience_opportunity',
            id: '3',
            name: 'Experience lesson',
            thumbnailUrl: 'https://picsum.photos/600/300',
            description: {
              audience: '<p>audience</p>',
              goal: '<p>goal</p>',
              introduction: '<p>introduction</p>',
              role: '<p>role</p>',
              situation: '<p>situation</p>',
            },
            progress: {
              submitted: 0,
              total: 6,
            },
          },
        ],
        postExperienceLessons: [
          {
            type: 'career_review_survey',
            id: '4',
            name: 'Career Review Survey',
            thumbnailUrl: 'https://picsum.photos/600/300',
            progress: {
              submitted: 0,
              total: 0,
            },
            careerReviewSurvey: {
              performed: false,
              version: 1,
            },
          },
        ],
        calendarLessons: [
          {
            type: 'career_cluster',
            id: '5',
            name: 'Career Cluster: Business Management & Administration',
            thumbnailUrl: 'https://picsum.photos/600/300',
            progress: {
              submitted: 2,
              total: 2,
            },
          },
          {
            type: 'pathway',
            id: '6',
            name: 'Career Pathway: Marketing Research',
            thumbnailUrl: 'https://picsum.photos/600/300',
            progress: {
              submitted: 1,
              total: 2,
            },
          },
          {
            type: 'project',
            id: '7',
            name: 'Supply Clerk',
            thumbnailUrl: 'https://picsum.photos/600/300',
            progress: {
              submitted: 0,
              total: 2,
            },
          },
          {
            type: 'dig_deeper_into_career',
            id: '8',
            name: 'Career Roadmap - Overview, Education, and Personal Budgeting: Supply Clerks',
            thumbnailUrl: 'https://picsum.photos/600/300',
            progress: {
              submitted: 1,
              total: 1,
            },
          },
        ],
        studentExperienceOpportunityLessons: [],
      },
      opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP,
      opportunityApplication: {
        id: '9',
        answers: [],
      },
      pathways: [
        {
          id: '10',
          name: 'Animal Systems',
        },
      ],
      salaryInformation: null,
      tags: ['animals'],
      visibilityScope: VISIBILITY_SCOPE.ALL,
      partner: null,
      imageFitToContainer: false,
    },
  },
};

const virtualInternshipContentResponse: { data: TVirtualInternshipContentData } = {
  data: {
    opportunity: {
      id: '1',
      virtualInternship: {
        roadmapItemsCount: 4,
        postExperienceLessons: [
          {
            id: '4',
            careerReviewSurvey: {
              performed: false,
              version: 1,
            },
          },
        ],
        studentExperienceOpportunityLessons: [],
        requiredExperiences: 1,
        content: [
          {
            id: '5',
            name: 'Career Cluster: Business Management & Administration',
            items: [
              {
                id: '6',
                name: 'Overview',
                type: 'ExternalPresentation',
                completed: false,
              },
            ],
            checkIns: [
              {
                id: '1',
                name: 'Lesson 1 Check-ins',
                type: 'CheckInGroup',
                completed: true,
              },
            ],
            type: 'CAREER_CLUSTER',
          },
          {
            id: '6',
            name: 'Career Pathway: Marketing Research',
            items: [],
            checkIns: [
              {
                id: '2',
                name: 'Lesson 2 Check-ins',
                type: 'CheckInGroup',
                completed: true,
              },
              {
                id: '3',
                name: 'Lesson 2 Check-ins 2',
                type: 'CheckInGroup',
                completed: false,
              },
            ],
            type: 'PATHWAY',
          },
          {
            id: '7',
            name: 'Supply Clerk',
            items: [
              {
                id: '1231',
                name: 'Walker Supply Chain Infographic Assignment',
                type: 'Assignment',
                completed: false,
              },
              {
                id: '1232',
                name: 'Medical Supply Checklist Assignment',
                type: 'Assignment',
                completed: false,
              },
            ],
            checkIns: [],
            type: 'PROJECT',
          },
          {
            id: '8',
            name: 'Career Roadmap - Overview, Education, and Personal Budgeting: Supply Clerks',
            items: [
              {
                id: '629',
                name: 'Personal Budget',
                type: 'Assignment',
                completed: true,
              },
            ],
            checkIns: [],
            type: 'DIG_DEEPER_INTO_CAREER',
          },
          {
            id: '100',
            name: 'Career Review Survey',
            items: [],
            checkIns: [],
            type: 'CAREER_REVIEW_SURVEY',
          },
        ],
      },
    },
  },
};

const opportunityQueryMock: MockedResponse<TOpportunityData> = {
  request: {
    query: OPPORTUNITY_QUERY,
    variables: { id: '1', track: false, trackVI: false },
  },
  result: opportunityResponse,
};

const virtualInternshipContentQueryMock: MockedResponse<TVirtualInternshipContentData> = {
  request: {
    query: VIRTUAL_INTERNSHIP_CONTENT_QUERY,
    variables: { opportunityId: '1' },
  },
  result: virtualInternshipContentResponse,
};

const renderComponent = (mocks: MockedResponse[]) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={cacheConfig} mocks={mocks}>
      <UserInfoProvider
        value={{
          userInfo: studentInfoMock.result.data.userInfo,
        }}>
        <NavigationContextProvider>
          <Route path='/opportunities/:opportunityId/virtual-internship'>
            <CalendarSection completedLessonsCount={3} />
          </Route>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/opportunities/1/virtual-internship' }
  );

describe('CalendarSection', () => {
  it('displays lesson cards with correct progress', async () => {
    const { container } = renderComponent([
      virtualInternshipContentQueryMock,
      opportunityQueryMock,
    ]);

    const completedLessonCard = await screen.findByRole('link', {
      name: 'Career Cluster: Business Management & Administration',
    });
    expect(completedLessonCard).toHaveTextContent('100%');

    const inProgressLessonCard = screen.getByRole('link', {
      name: 'Career Pathway: Marketing Research',
    });
    expect(inProgressLessonCard).toHaveTextContent('50%');

    const notStartedLessonCard = screen.getByRole('link', { name: 'Supply Clerk' });
    expect(notStartedLessonCard).toHaveTextContent('0%');
    expect(notStartedLessonCard).toHaveClass('disabled');

    expect(container).toMatchSnapshot();
  });

  it('navigates to enabled lesson when clicked', async () => {
    const { history } = renderComponent([virtualInternshipContentQueryMock, opportunityQueryMock]);
    history.push = jest.fn();

    const lessonCard = await screen.findByRole('link', {
      name: 'Career Pathway: Marketing Research',
    });
    userEvent.click(lessonCard);

    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('allows to select experience opportunity', async () => {
    const manageOpportunityExperiencesSpy = jest.fn();

    renderComponent([
      virtualInternshipContentQueryMock,
      opportunityQueryMock,
      opportunityQueryMock,
      {
        request: {
          query: MANAGE_OPPORTUNITY_EXPERIENCE_LESSONS,
          variables: { input: { virtualInternshipId: '2', lessonIds: ['3'] } },
        },
        result() {
          manageOpportunityExperiencesSpy();

          return {
            data: {
              manageOpportunityExperienceLessons: {
                virtualInternship: {
                  id: '2',
                  studentExperienceOpportunityLessons: [
                    {
                      type: 'experience_opportunity',
                      id: '3',
                      name: 'Experience lesson',
                      thumbnailUrl: 'https://picsum.photos/600/300',
                      description: {
                        audience: '<p>audience</p>',
                        goal: '<p>goal</p>',
                        introduction: '<p>introduction</p>',
                        role: '<p>role</p>',
                        situation: '<p>situation</p>',
                      },
                      progress: {
                        submitted: 0,
                        total: 6,
                      },
                    },
                  ],
                  content: [],
                },
              },
            },
          };
        },
      },
    ]);

    const addOpportunityButton = await screen.findByRole('button', { name: 'Add opportunity' });
    userEvent.click(addOpportunityButton);

    const modal = await screen.findByRole('dialog');
    expect(modal).toMatchSnapshot();

    const experienceOpportunities = within(modal).getAllByRole('row');

    expect(experienceOpportunities).toHaveLength(2);
    userEvent.click(experienceOpportunities[1]);

    const saveButton = within(modal).getByRole('button', { name: 'Save' });
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(manageOpportunityExperiencesSpy).toHaveBeenCalledTimes(1);
    });
  });
});
