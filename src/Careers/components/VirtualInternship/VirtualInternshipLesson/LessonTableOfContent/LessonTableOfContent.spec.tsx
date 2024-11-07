import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { screen, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { OpportunityTypes } from '@graphql/dc/shared/types';
import { ApplicationStatus, VirtualInternshipStatuses } from '@graphql/dc/students/types';

import {
  TVirtualInternshipContentData,
  VIRTUAL_INTERNSHIP_CONTENT_QUERY,
} from '@dc/graphql/student/queries/virtualInternshipContent';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { OPPORTUNITY_QUERY, TOpportunityData } from '@dc/graphql/student/queries/opportunity';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

import { LessonTableOfContent } from './LessonTableOfContent';

const getVirtualInternshipContentResponse = (requiredExperiencesCount: number) => ({
  data: {
    opportunity: {
      id: '1',
      virtualInternship: {
        roadmapItemsCount: 6,
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
        requiredExperiences: requiredExperiencesCount,
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
            id: '7',
            name: 'Post secondary lesson',
            items: [
              {
                id: '111',
                name: 'First assignment',
                type: 'Assignment',
                completed: false,
              },
              {
                id: '112',
                name: 'Second assignment',
                type: 'Assignment',
                completed: false,
              },
            ],
            checkIns: [],
            type: 'PROJECT',
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
});

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
        roadmapItemsCount: 6,
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
            type: 'project',
            id: '10',
            name: 'Post secondary lesson',
            thumbnailUrl: 'https://picsum.photos/600/300',
            progress: {
              submitted: 0,
              total: 2,
            },
            careerReviewSurvey: {
              performed: false,
              version: 1,
            },
          },
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

const getVirtualInternshipContentQueryMock = (
  requiredExperiencesCount = 1
): MockedResponse<TVirtualInternshipContentData> => ({
  request: {
    query: VIRTUAL_INTERNSHIP_CONTENT_QUERY,
    variables: { opportunityId: '1' },
  },
  result: getVirtualInternshipContentResponse(requiredExperiencesCount),
});

const opportunityQueryMock: MockedResponse<TOpportunityData> = {
  request: {
    query: OPPORTUNITY_QUERY,
    variables: { id: '1', track: false, trackVI: false },
  },
  result: opportunityResponse,
};

const renderComponent = (lessonId = '6', requiredExperiencesCount?: number) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider
      mocks={[
        getVirtualInternshipContentQueryMock(requiredExperiencesCount),
        opportunityQueryMock,
      ]}>
      <UserInfoProvider
        value={{
          userInfo: studentInfoMock.result.data.userInfo,
        }}>
        <NavigationContextProvider>
          <Route path='/opportunities/:opportunityId/virtual-internship/lesson/:lessonId'>
            <LessonTableOfContent />
          </Route>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    {
      route: `/opportunities/1/virtual-internship/lesson/${lessonId}`,
      initialState: { session: { loginError: {}, user: { type: 'student' } } },
    }
  );

describe('LessonTableOfContent', () => {
  it('displays table of content with current lesson expanded', async () => {
    const { container } = renderComponent();

    const lessons = await screen.findAllByTestId('lesson-progress-item');
    expect(lessons).toHaveLength(7);

    const currentLesson = lessons[1];
    const currentLessonItems = within(currentLesson).getAllByRole('link');
    expect(currentLessonItems).toHaveLength(2);
    expect(currentLessonItems[0]).toHaveTextContent('Lesson 2 Check-ins');
    expect(currentLessonItems[1]).toHaveTextContent('Lesson 2 Check-ins 2');

    expect(container).toMatchSnapshot();
  });

  it('prevents student from navigating to locked lesson', async () => {
    const { history } = renderComponent();
    history.push = jest.fn();

    const lessons = await screen.findAllByTestId('lesson-progress-item');
    const lockedLesson = lessons[6];

    userEvent.click(lockedLesson);

    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it('displays correct tooltips for locked lessons', async () => {
    renderComponent();

    const emptyExperienceLesson = await screen.findByText('Experience Opportunity');
    userEvent.hover(emptyExperienceLesson);
    expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'To access this lesson, choose Experience Opportunity'
    );
    userEvent.unhover(emptyExperienceLesson);

    const lockedSurvey = screen.getByText('Career Review Survey');
    userEvent.hover(lockedSurvey);
    expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'This lesson will be unlocked after completing all previous lessons'
    );
    userEvent.unhover(lockedSurvey);
  });

  it('navigates to the next lesson after clicking next button', async () => {
    const { history } = renderComponent('5');
    history.push = jest.fn();

    const nextButton = await screen.findByRole('button', { name: 'Next' });
    userEvent.click(nextButton);

    expect(history.push).toBeCalledWith('/opportunities/1/virtual-internship/lesson/6');
  });

  it('navigates to the previous lesson after clicking previous button', async () => {
    const { history } = renderComponent('6');
    history.push = jest.fn();

    const previousButton = await screen.findByRole('button', { name: 'Previous' });
    userEvent.click(previousButton);

    expect(history.push).toBeCalledWith('/opportunities/1/virtual-internship/lesson/5');
  });

  it('displays experience opportunities modal after clicking next button', async () => {
    renderComponent('8');

    const nextButton = await screen.findByRole('button', { name: 'Next' });
    userEvent.click(nextButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('locks next button when next lesson is not available', async () => {
    renderComponent('8', 0);

    const nextButton = await screen.findByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  it('locks previous button when current lesson is the first lesson', async () => {
    renderComponent('5');

    const previousButton = await screen.findByRole('button', { name: 'Previous' });
    expect(previousButton).toBeDisabled();
  });
});
