import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { screen, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import {
  TVirtualInternshipData,
  TVirtualInternshipVariables,
  VIRTUAL_INTERNSHIP_QUERY,
} from '@dc/graphql/user/queries/virtualInternship';
import { VirtualInternshipStatuses } from '@dc/components/Admin/VirtualInternships/types';

import { VirtualInternshipContent } from './VirtualInternshipContent';

const virtualInternshipMock: MockedResponse<TVirtualInternshipData, TVirtualInternshipVariables> = {
  request: {
    query: VIRTUAL_INTERNSHIP_QUERY,
    variables: { id: '2', track: true },
  },
  result: {
    data: {
      virtualInternship: {
        archivedAt: null,
        badges: [],
        id: '2',
        opportunity: {
          id: '1',
          name: 'Test Virtual Internship',
          availableSpots: 1000000000,
          creditsOutcomes: '',
          description: 'Virtual internship description',
          imageUrl: 'https://picsum.photos/600/300',
          opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP,
          pathways: [
            {
              id: '44',
              name: 'Test pathway',
            },
          ],
          salaryInformation: null,
          tags: ['Software', 'Test'],
        },
        requiredExperiences: 2,
        status: VirtualInternshipStatuses.PUBLISHED,
        calendarLessons: [
          {
            id: '74',
            step: 3,
            name: 'Career Pathway: Maintenance/Operations',
            imageUrl: 'https://picsum.photos/600/300',
            thumbnailUrl: 'https://picsum.photos/600/300',
            type: 'pathway',
          },
          {
            id: '77',
            step: 2,
            name: 'Cluster Lesson',
            imageUrl: 'https://picsum.photos/600/300',
            thumbnailUrl: 'https://picsum.photos/600/300',
            type: 'career_cluster',
          },
          {
            id: '78',
            step: 1,
            name: 'Project Lesson',
            imageUrl: 'https://picsum.photos/600/300',
            thumbnailUrl: 'https://picsum.photos/600/300',
            type: 'project',
          },
          {
            id: '69',
            step: 4,
            name: 'Pathway Lesson',
            imageUrl: 'https://picsum.photos/600/300',
            thumbnailUrl: 'https://picsum.photos/600/300',
            type: 'pathway',
          },
        ],
        experienceOpportunityLessons: [
          {
            id: '67',
            step: 2,
            name: 'First experience opportunity',
            imageUrl: 'https://picsum.photos/600/300',
            thumbnailUrl: 'https://picsum.photos/600/300',
            type: 'experience_opportunity',
          },
          {
            id: '68',
            step: 1,
            name: 'Second experience opportunity',
            imageUrl: 'https://picsum.photos/600/300',
            thumbnailUrl: 'https://picsum.photos/600/300',
            type: 'experience_opportunity',
          },
        ],
        postExperienceLessons: [
          {
            id: '33',
            step: 3,
            name: 'Career Review Survey',
            imageUrl: 'https://picsum.photos/600/300',
            thumbnailUrl: 'https://picsum.photos/600/300',
            type: 'career_review_survey',
          },
        ],
        readinessSkillsLessons: [
          {
            id: '58',
            step: 1,
            name: 'Readiness skills section',
            imageUrl: 'https://picsum.photos/600/300',
            thumbnailUrl: 'https://picsum.photos/600/300',
            type: 'career_readiness',
          },
        ],
      },
    },
  },
};

const renderComponent = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[userInfoMock, virtualInternshipMock]}>
      <UserInfoProvider
        value={{
          userInfo: userInfoMock.result.data.userInfo,
        }}>
        <Route path='/opportunities/:opportunityId/virtual-internship/:virtualInternshipId'>
          <VirtualInternshipContent />
        </Route>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/opportunities/1/virtual-internship/2' }
  );

describe('VirtualInternshipContent', () => {
  it('renders correctly', async () => {
    const { container } = renderComponent();

    const virtualInternshipHeading = await screen.findByRole('heading', {
      name: 'Test Virtual Internship',
    });
    expect(virtualInternshipHeading).toBeInTheDocument();

    const lessonGroups = screen.getAllByTestId('lesson-group');
    expect(lessonGroups).toHaveLength(4);

    expect(within(lessonGroups[0]).getAllByRole('link')).toHaveLength(4);
    expect(within(lessonGroups[1]).getAllByRole('link')).toHaveLength(2);
    expect(within(lessonGroups[2]).getAllByRole('link')).toHaveLength(1);
    expect(within(lessonGroups[3]).getAllByRole('link')).toHaveLength(1);

    expect(container).toMatchSnapshot();
  });

  it('navigates to the lesson when clicking on lesson card', async () => {
    const { history } = renderComponent();
    history.push = jest.fn();

    const lessonCard = await screen.findByRole('link', {
      name: 'Career Pathway: Maintenance/Operations',
    });
    userEvent.click(lessonCard);

    expect(history.push).toBeCalledWith('/opportunities/1/virtual-internship/2/lessons/74');
  });
});
