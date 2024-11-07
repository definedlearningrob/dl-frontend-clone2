import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationStatus, VirtualInternshipStatuses } from '@graphql/dc/students/types';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { VirtualInternshipContent } from '@dc/components/Student/VirtualInternship/VirtualInternshipContent/VirtualInternshipContent';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { OPPORTUNITY_QUERY, TOpportunityData } from '@dc/graphql/student/queries/opportunity';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';
import {
  DELETE_OPPORTUNITY_APPLICATION,
  TDeleteOpportunityApplicationData,
} from '@dc/graphql/student/mutations/deleteOpportunityApplication';
import {
  TVirtualInternshipContentData,
  VIRTUAL_INTERNSHIP_CONTENT_QUERY,
} from '@dc/graphql/student/queries/virtualInternshipContent';
import cacheConfig from '@dc/graphql/cacheConfig';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import MY_OPPORTUNITIES from '@dc/graphql/student/queries/myOpportunities';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const unenrollSpy = jest.fn();
const opportunityFetchSpy = jest.fn();
const contentFetchSpy = jest.fn();

const myOpportunitiesMock = {
  request: {
    query: MY_OPPORTUNITIES,
    variables: { page: 1, perPage: 100 },
  },
  result: {
    data: {
      myOpportunities: [],
    },
  },
};
const deleteOpportunityApplication: MockedResponse<TDeleteOpportunityApplicationData> = {
  request: {
    query: DELETE_OPPORTUNITY_APPLICATION,
    variables: { input: { opportunityApplicationId: '123' } },
  },
  result() {
    unenrollSpy();

    return {
      data: {
        deleteOpportunityApplication: {
          status: '',
        },
      },
    };
  },
};

const virtualInternship: MockedResponse<TOpportunityData> = {
  request: {
    query: OPPORTUNITY_QUERY,
    variables: { id: '1', track: false, trackVI: false },
  },
  result() {
    opportunityFetchSpy();

    return {
      data: {
        opportunity: {
          applicationStatus: ApplicationStatus.PENDING,
          opportunityApplication: { id: '123', answers: [] },
          automaticAcceptance: true,
          availableSpots: 3,
          creditsOutcomes: 'Credits',
          deadline: '',
          periodStart: '',
          periodEnd: '',
          tags: [],
          description: 'Description',
          id: '1',
          imageUrl: 'url-to-image',
          isFavorite: true,
          isRecommended: false,
          opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP,
          pathways: [{ id: '1', name: 'Pathway name' }],
          salaryInformation: 'Salary information',
          location: 'location',
          name: 'Test Virtual Internship',
          questions: [{ id: '1', question: 'Question?', answer: '' }],
          visibilityScope: VISIBILITY_SCOPE.ENTITY,
          virtualInternship: {
            id: '1000',
            status: VirtualInternshipStatuses.IN_PROGRESS,
            roadmapItemsCount: 1,
            requiredExperiences: 2,
            readinessSkillsLessons: [
              {
                id: '22',
                name: 'First readiness skills lessons name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: {
                  performed: false,
                  version: 1,
                },
              },
              {
                id: '33',
                name: 'Second readiness skills lessons name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: {
                  performed: false,
                  version: 1,
                },
              },
            ],
            experienceOpportunityLessons: [
              {
                id: '123',
                name: 'Preselected experience opportunity lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                description: {
                  introduction: 'Experience opportunity description - id: 123',
                  audience: '',
                  goal: '',
                  role: '',
                  situation: '',
                },
                progress: { submitted: 0, total: 0 },
              },
              {
                id: '124',
                name: 'Experience opportunity lesson to select',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                description: {
                  introduction: 'Experience opportunity description - id: 124',
                  audience: '',
                  goal: '',
                  role: '',
                  situation: '',
                },
                progress: { submitted: 0, total: 0 },
              },
            ],
            studentExperienceOpportunityLessons: [
              {
                id: '123',
                name: 'Preselected experience opportunity lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: {
                  performed: false,
                  version: 1,
                },
              },
            ],
            postExperienceLessons: [
              {
                id: '11',
                name: 'First post experience lessons name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: { performed: false, version: 1 },
              },
              {
                id: '12',
                name: 'Second post experience lessons name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: { performed: false, version: 1 },
              },
            ],
            calendarLessons: [
              {
                id: '1',
                name: 'First lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 2, total: 2 },
              },
              {
                id: '2',
                name: 'Second lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 2, total: 2 },
              },
              {
                id: '3',
                name: 'Third lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 2 },
              },
              {
                id: '4',
                name: 'Fourth lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
              },
            ],
          },
          partner: null,
          imageFitToContainer: false,
        },
      },
    };
  },
};

const virtualInternshipWithTrack: MockedResponse<TOpportunityData> = {
  request: {
    query: OPPORTUNITY_QUERY,
    variables: { id: '1', track: false, trackVI: true },
  },
  result() {
    opportunityFetchSpy();

    return {
      data: {
        opportunity: {
          applicationStatus: ApplicationStatus.PENDING,
          opportunityApplication: { id: '123', answers: [] },
          automaticAcceptance: true,
          availableSpots: 3,
          creditsOutcomes: 'Credits',
          deadline: '',
          periodStart: '',
          periodEnd: '',
          tags: [],
          description: 'Description',
          id: '1',
          imageUrl: 'url-to-image',
          isFavorite: true,
          isRecommended: false,
          opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP,
          pathways: [{ id: '1', name: 'Pathway name' }],
          salaryInformation: 'Salary information',
          location: 'location',
          name: 'Test Virtual Internship',
          questions: [{ id: '1', question: 'Question?', answer: '' }],
          visibilityScope: VISIBILITY_SCOPE.ENTITY,
          virtualInternship: {
            id: '1000',
            status: VirtualInternshipStatuses.IN_PROGRESS,
            roadmapItemsCount: 1,
            requiredExperiences: 2,
            readinessSkillsLessons: [
              {
                id: '22',
                name: 'First readiness skills lessons name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: {
                  performed: false,
                  version: 1,
                },
              },
              {
                id: '33',
                name: 'Second readiness skills lessons name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: {
                  performed: false,
                  version: 1,
                },
              },
            ],
            experienceOpportunityLessons: [
              {
                id: '123',
                name: 'Preselected experience opportunity lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                description: {
                  introduction: 'Experience opportunity description - id: 123',
                  audience: '',
                  goal: '',
                  role: '',
                  situation: '',
                },
                progress: { submitted: 0, total: 0 },
              },
              {
                id: '124',
                name: 'Experience opportunity lesson to select',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                description: {
                  introduction: 'Experience opportunity description - id: 124',
                  audience: '',
                  goal: '',
                  role: '',
                  situation: '',
                },
                progress: { submitted: 0, total: 0 },
              },
            ],
            studentExperienceOpportunityLessons: [
              {
                id: '123',
                name: 'Preselected experience opportunity lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: {
                  performed: false,
                  version: 1,
                },
              },
            ],
            postExperienceLessons: [
              {
                id: '11',
                name: 'First post experience lessons name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: { performed: false, version: 1 },
              },
              {
                id: '12',
                name: 'Second post experience lessons name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
                careerReviewSurvey: { performed: false, version: 1 },
              },
            ],
            calendarLessons: [
              {
                id: '1',
                name: 'First lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 2, total: 2 },
              },
              {
                id: '2',
                name: 'Second lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 2, total: 2 },
              },
              {
                id: '3',
                name: 'Third lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 2 },
              },
              {
                id: '4',
                name: 'Fourth lesson name',
                type: 'project',
                thumbnailUrl: 'thumbnail-url',
                progress: { submitted: 0, total: 0 },
              },
            ],
          },
          partner: null,
          imageFitToContainer: false,
        },
      },
    };
  },
};

const virtualInternshipRefetchMock = {
  ...virtualInternship,
  request: {
    ...virtualInternship.request,
    variables: { id: '1', track: false },
  },
};

const virtualInternshipContent: MockedResponse<TVirtualInternshipContentData> = {
  request: {
    query: VIRTUAL_INTERNSHIP_CONTENT_QUERY,
    variables: { opportunityId: '1' },
  },
  result() {
    contentFetchSpy();

    return {
      data: {
        opportunity: {
          id: '1',
          virtualInternship: {
            postExperienceLessons: [],
            roadmapItemsCount: 1,
            requiredExperiences: 2,
            studentExperienceOpportunityLessons: [
              {
                id: '123',
                name: 'Preselected experience opportunity lesson name',
                thumbnailUrl: 'thumbnail-url',
                description: {
                  introduction: 'Experience opportunity description - id: 123',
                  audience: '',
                  goal: '',
                  role: '',
                  situation: '',
                },
                progress: { accepted: 0, submitted: 0, total: 0 },
              },
            ],
            content: [
              {
                id: '1',
                name: 'First lesson name',
                items: [],
                checkIns: [
                  {
                    id: '11',
                    name: 'Lesson 1 Check-ins',
                    type: 'CheckInGroup',
                    completed: true,
                  },
                  {
                    id: '12',
                    name: 'Lesson 1 Check-ins 2',
                    type: 'CheckInGroup',
                    completed: true,
                  },
                ],
                type: 'GENERIC',
              },
              {
                id: '2',
                name: 'Second lesson name',
                items: [],
                checkIns: [
                  {
                    id: '21',
                    name: 'Lesson 2 Check-ins',
                    type: 'CheckInGroup',
                    completed: true,
                  },
                  {
                    id: '22',
                    name: 'Lesson 2 Check-ins 2',
                    type: 'CheckInGroup',
                    completed: true,
                  },
                ],
                type: 'GENERIC',
              },
              {
                id: '3',
                name: 'Third lesson name',
                items: [],
                checkIns: [
                  {
                    id: '31',
                    name: 'Lesson 3 Check-ins',
                    type: 'CheckInGroup',
                    completed: false,
                  },
                  {
                    id: '32',
                    name: 'Lesson 3 Check-ins 2',
                    type: 'CheckInGroup',
                    completed: false,
                  },
                ],
                type: 'GENERIC',
              },
              {
                id: '4',
                name: 'Fourth lesson name',
                items: [],
                checkIns: [],
                type: 'GENERIC',
              },
              {
                id: '123',
                name: 'Preselected experience opportunity lesson name',
                items: [],
                checkIns: [],
                type: 'DIG_DEEPER_INTO_CAREER',
              },
              {
                id: '124',
                name: 'Experience opportunity lesson to select',
                items: [],
                checkIns: [],
                type: 'DIG_DEEPER_INTO_CAREER',
              },
              {
                id: '11',
                name: 'First post experience lessons name',
                items: [],
                checkIns: [
                  {
                    id: '1',
                    name: 'What do you like best about the careers and work done within this career cluster?',
                    type: 'CheckInQuestion',
                    completed: false,
                  },
                ],
                type: 'GENERIC',
              },
              {
                id: '12',
                name: 'Second post experience lessons name',
                items: [],
                checkIns: [],
                type: 'GENERIC',
              },
              {
                id: '22',
                name: 'First readiness skills lessons name',
                items: [],
                checkIns: [],
                type: 'PROJECT',
              },
              {
                id: '33',
                name: 'Second readiness skills lessons name',
                items: [],
                checkIns: [],
                type: 'PROJECT',
              },
            ],
          },
        },
      },
    };
  },
};

const opportunityMocks = [
  userInfoMock,
  virtualInternship,
  virtualInternship,
  virtualInternshipWithTrack,
  virtualInternshipContent,
  deleteOpportunityApplication,
  virtualInternshipRefetchMock,
  virtualInternshipContent,
  myOpportunitiesMock,
];

const renderVirtualInternshipContent = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={cacheConfig} mocks={opportunityMocks}>
      <NavigationContextProvider>
        <Route path='/opportunities/:opportunityId/virtual-internship'>
          <VirtualInternshipContent />
        </Route>
      </NavigationContextProvider>
    </MockedProvider>,
    { route: '/opportunities/1/virtual-internship' }
  );

describe('VirtualInternshipContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the view correctly', async () => {
    const { container } = renderVirtualInternshipContent();
    await waitFor(() => {
      expect(contentFetchSpy).toHaveBeenCalledTimes(1);
    });
    expect(await screen.findByText('Test Virtual Internship')).toBeInTheDocument();
    expect(await screen.findByTestId('lesson-progress-list')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should allow to unenroll from the virtual internship', async () => {
    renderVirtualInternshipContent();

    userEvent.click(await screen.findByRole('button', { name: 'Unenroll' }));
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    userEvent.click(within(dialog).getByRole('button', { name: 'Unenroll' }));

    await waitFor(() => {
      expect(unenrollSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should display list of lesson after starting internship', async () => {
    renderVirtualInternshipContent();

    const roadmapSection = await screen.findByLabelText('Virtual Internship Roadmap');
    const readinessSkillsSection = screen.getByLabelText('Related Skills');

    expect(roadmapSection).toHaveTextContent('First lesson name');
    expect(roadmapSection).toHaveTextContent('Second lesson name');
    expect(roadmapSection).toHaveTextContent('Third lesson name');

    expect(roadmapSection).toHaveTextContent('Preselected experience opportunity lesson name');
    expect(roadmapSection).toHaveTextContent('Experiences');

    expect(roadmapSection).toHaveTextContent('First post experience lessons name');
    expect(roadmapSection).toHaveTextContent('First post experience lessons name');

    expect(readinessSkillsSection).toHaveTextContent('First readiness skills lessons name');
    expect(readinessSkillsSection).toHaveTextContent('Second readiness skills lessons name');
  });

  it('should open first uncompleted lesson after clicking Continue button', async () => {
    const { history } = renderVirtualInternshipContent();
    history.push = jest.fn();

    const continueButton = await screen.findByRole('button', { name: 'Continue' });
    expect(continueButton).not.toBeDisabled();
    userEvent.click(continueButton);

    expect(history.push).toHaveBeenCalledWith('/opportunities/1/virtual-internship/lesson/3');
  });
});
