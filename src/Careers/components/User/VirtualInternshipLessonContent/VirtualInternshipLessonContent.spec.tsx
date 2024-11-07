import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { screen, within } from '@testing-library/dom';

import {
  TVirtualInternshipLessonData,
  TVirtualInternshipLessonVariables,
  VIRTUAL_INTERNSHIP_LESSON,
} from '@dc/graphql/user/queries/virtualInternshipLesson';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { LESSON_TYPES } from '@dc/resources/constants';

import { VirtualInternshipLessonContent } from './VirtualInternshipLessonContent';

const virtualInternshipLessonMock: MockedResponse<
  TVirtualInternshipLessonData,
  TVirtualInternshipLessonVariables
> = {
  request: {
    query: VIRTUAL_INTERNSHIP_LESSON,
    variables: { lessonId: '123', virtualInternshipId: '2', track: true },
  },
  result: {
    data: {
      virtualInternship: {
        id: '2',
        opportunity: {
          id: '1',
          name: 'Test opportunity',
        },
        lesson: {
          assignments: [
            {
              description:
                '<p>We all know how important personal interaction and tight bonds are in our lives. Getting to know each other is important for children and teens so they can better play and problem solve together. &nbsp;Ice breakers can be an invaluable activity for any group to help build relationships.</p>\n<p><br />You are to create an ice breaker activity or game for the 10-15 year olds that would allow them to get to know each other. &nbsp;Be sure that it is interactive and allows each person to get to know many of the others.</p>',
              displayName: 'Ice Breaker Assignment',
              id: '1202',
              step: 1,
              rubrics: [],
              __typename: 'Assignment',
            },
          ],
          attachments: [],
          careerReviewSurvey: null,
          checkInGroups: [
            {
              displayName: 'GRAS Check-In Questions ',
              id: '4',
              questions: [
                {
                  id: '14',
                  question: 'What is the problem we are trying to solve?',
                  step: 1,
                  __typename: 'CheckInQuestion',
                },
                {
                  id: '15',
                  question: 'How might you solve the problem?',
                  step: 2,
                  __typename: 'CheckInQuestion',
                },
              ],
              step: 1,
              __typename: 'CheckInGroup',
            },
          ],
          checkInQuestions: [],
          description: {
            introduction: '',
            goal: '',
            role: '',
            audience: '',
            situation: '',
          },
          hasPresentation: true,
          id: '1338',
          imageUrl: 'https://picsum.photos/600/300',
          name: 'Virtual internship lesson',
          externalPresentations: [
            {
              displayName: 'Overview',
              id: '1146',
              source: 'http://definedlearning.com',
              step: 2,
              isExpandable: false,
              __typename: 'ExternalPresentation',
            },
          ],
          researchLinks: [],
          texts: [
            {
              content:
                '<div>Important knowledge needed to succeed in this career</div><ul><li><b>Computers and Electronics - </b>Knowledge of circuit boards, processors, chips, electronic equipment, and computer hardware and software, including applications and programming.</li><li><b>English Language - </b>Knowledge of the structure and content of the English language including the meaning and spelling of words, rules of composition, and grammar.</li><li><b>Mathematics - </b>Knowledge of arithmetic, algebra, geometry, calculus, statistics, and their applications.</li><li><b>Communications and Media - </b>Knowledge of media production, communication, and dissemination techniques and methods. This includes alternative ways to inform and entertain via written, oral, and visual media.</li><li><b>Customer and Personal Service - </b>Knowledge of principles and processes for providing customer and personal services. This includes customer needs assessment, meeting quality standards for services, and evaluation of customer satisfaction.</li></ul>',
              displayName: 'Knowledge',
              id: '2003',
              step: 3,
              __typename: 'Text',
            },
          ],
          type: LESSON_TYPES.VIRTUAL_INTERNSHIP,
          videos: [],
          vocabularies: [],
        },
      },
    },
  },
};

const renderComponent = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[userInfoMock, virtualInternshipLessonMock]}>
      <UserInfoProvider
        value={{
          userInfo: userInfoMock.result.data.userInfo,
        }}>
        <Route path='/opportunities/:opportunityId/virtual-internship/:virtualInternshipId/lessons/:lessonId'>
          <VirtualInternshipLessonContent />
        </Route>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/opportunities/1/virtual-internship/2/lessons/123' }
  );

describe('VirtualInternshipLessonContent', () => {
  it('renders correctly', async () => {
    const { container } = renderComponent();

    const lessonItems = await screen.findAllByTestId('lesson-element-card');
    expect(lessonItems).toHaveLength(4);

    expect(lessonItems[0]).toHaveTextContent('Overview');
    expect(lessonItems[1]).toHaveTextContent('Ice Breaker Assignment');
    expect(lessonItems[2]).toHaveTextContent('Knowledge');
    expect(lessonItems[3]).toHaveTextContent('GRAS Check-In Questions');

    expect(container).toMatchSnapshot();
  });

  it('displays assignments and check-ins in preview mode', async () => {
    renderComponent();

    const lessonItems = await screen.findAllByTestId('lesson-element-card');

    const submitAssignmentButton = within(lessonItems[1]).getByRole('button', { name: 'Submit' });
    expect(submitAssignmentButton).toBeDisabled();

    const checkInQuestionInputs = within(lessonItems[3]).getAllByRole('textbox');
    expect(checkInQuestionInputs[0]).toBeDisabled();
    expect(checkInQuestionInputs[1]).toBeDisabled();

    const checkInSaveButtons = within(lessonItems[3]).getAllByRole('button', { name: 'Save' });
    expect(checkInSaveButtons[0]).toBeDisabled();
    expect(checkInSaveButtons[1]).toBeDisabled();
  });
});
