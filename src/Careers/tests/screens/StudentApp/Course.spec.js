import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, within, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route } from 'react-router-dom';

import Course from '@dc/screens/StudentApp/Course/Course';
import courseQuery from '@dc/graphql/student/queries/course';
import currentCoursesQuery from '@dc/graphql/student/queries/currentCourses';
import disenrollFromCourseMutation from '@dc/graphql/student/mutations/disenrollFromCourse';
import { COURSE_TYPES, PUBLISHING_STATUSES } from '@dc/resources/constants';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

import { MessagingProvider } from '@shared/hooks/useMessaging';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const defaultMocks = [
  {
    request: {
      query: currentCoursesQuery,
      variables: {},
    },
    result: {
      data: {
        currentCourses: [
          {
            id: '1',
            imageUrl: 'http://localstack.lvh.me',
            thumbnailUrl: 'someUrl',
            name: 'Course 1',
            progress: {
              submitted: 4,
              total: 10,
            },
            status: PUBLISHING_STATUSES.PUBLISHED,
            type: COURSE_TYPES.HIGH_SCHOOL,
            pathway: {
              name: 'Accounting',
            },
          },
        ],
      },
    },
  },
  {
    request: {
      query: courseQuery,
      variables: {
        id: '1',
        track: true,
      },
    },
    result: () => ({
      data: {
        course: {
          description: 'Course 1 description',
          id: '1',
          imageUrl: 'http://localstack.lvh.me',
          thumbnailUrl: 'someUrl',
          lessons: [
            {
              careerReviewSurvey: null,
              id: '3',
              imageUrl: 'http://localstack.lvh.me',
              name: 'Lesson 2',
              progress: {
                submitted: 1,
                total: 3,
              },
              step: 1,
              type: 'career_cluster',
            },
            {
              careerReviewSurvey: null,
              id: '2',
              imageUrl: 'http://localstack.lvh.me',
              name: 'Lesson 1',
              progress: {
                submitted: 0,
                total: 3,
              },
              step: 2,
              type: 'pathway',
            },
            {
              careerReviewSurvey: null,
              id: '4',
              imageUrl: 'http://localstack.lvh.me',
              name: 'Lesson 3',
              progress: {
                submitted: 3,
                total: 3,
              },
              step: 3,
              type: 'career_cluster',
            },
            {
              careerReviewSurvey: {
                performed: false,
                version: 1,
              },
              id: '1',
              imageUrl: 'http://localstack.lvh.me',
              name: 'Career Review Survey',
              progress: {
                submitted: 0,
                total: 0,
              },
              step: 4,
              type: 'career_review_survey',
            },
          ],
          name: 'Course 1',
          pathway: {
            name: 'Accounting',
          },
          progress: {
            submitted: 4,
            total: 10,
          },
        },
      },
    }),
  },
  studentInfoMock,
];

const unenrollMutationMock = {
  request: {
    query: disenrollFromCourseMutation,
    variables: { input: { courseId: '1' } },
  },
  result: () => ({
    data: {
      disenrollFromCourse: {
        courseId: '1',
      },
    },
  }),
};

const route = '/courses/1';
const history = createMemoryHistory({ initialEntries: [route] });

const renderCourse = (mocks = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider addTypename={false} mocks={[...defaultMocks, ...mocks, studentInfoMock]}>
      <UserInfoProvider
        value={{ userInfo: { firstName: 'Test', lastName: 'Man', type: 'student' } }}>
        <ExpandSidebarProvider>
          <NavigationContextProvider>
            <MessagingProvider refreshUser={jest.fn()} userInfo={{}}>
              <Route component={Course} path='/courses/:id' />
            </MessagingProvider>
          </NavigationContextProvider>
        </ExpandSidebarProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route, history, initialState: { session: { user: { type: 'student' } } } }
  );

describe('StudentAppCourse', () => {
  describe('header', () => {
    it('renders course pathway bagde', async () => {
      const { getByTestId } = renderCourse();

      await waitFor(() => {
        expect(getByTestId(/course-pathway-badges/)).toHaveTextContent(/accounting/i);
      });
    });

    it('renders course name as heading', async () => {
      const { getByTestId } = renderCourse();

      await waitFor(() => {
        expect(getByTestId(/course-heading/)).toHaveTextContent(/course 1/i);
      });
    });

    it('renders course description', async () => {
      const { getByTestId } = renderCourse();

      await waitFor(() => {
        expect(getByTestId(/course-description/)).toHaveTextContent(/course 1 description/i);
      });
    });

    it('renders course action buttons', async () => {
      const { getAllByTestId } = renderCourse();

      await waitFor(() => {
        const [progressButton, unenrollButton] = getAllByTestId(/button/);

        expect(progressButton).toHaveTextContent(/continue/i);
        expect(unenrollButton).toHaveTextContent(/unenroll/i);
      });
    });

    it('displays unenroll modal window message and buttons correctly ', async () => {
      const { getByTestId, getAllByTestId } = renderCourse();

      await waitFor(() => {
        const unenrollButton = getAllByTestId(/button/)[1];

        fireEvent.click(unenrollButton);
      });

      await waitFor(() => {
        const unenrollModalBody = getByTestId(/modal-body/);
        const [cancelButton, unenrollModalButton] = within(
          getByTestId(/modal-footer/)
        ).getAllByTestId(/button/);

        expect(unenrollModalBody).toHaveTextContent(
          /Are you sure you want to unenroll from the Course 1 course?/i
        );
        expect(cancelButton).toHaveTextContent(/cancel/i);
        expect(unenrollModalButton).toHaveTextContent(/unenroll/i);
      });
    });

    it('closes unenroll modal additionally on "cancel" button click', async () => {
      const { getByTestId, getAllByTestId } = renderCourse([unenrollMutationMock]);

      await waitFor(() => {
        const unenrollButton = getAllByTestId(/button/)[1];

        fireEvent.click(unenrollButton);
      });

      await waitFor(() => {
        expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
      });

      await waitFor(() => {
        const cancelButton = within(getByTestId(/modal-footer/)).getAllByTestId(/button/)[0];

        fireEvent.click(cancelButton);
      });

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Modal ' })).not.toBeInTheDocument();
      });
    });

    it('unenrolls student from a course correctly', async () => {
      const unenrollMutationSpy = jest.spyOn(unenrollMutationMock, 'result');
      const { getByTestId, getAllByTestId } = renderCourse([unenrollMutationMock]);

      await waitFor(() => {
        const unenrollButton = getAllByTestId(/button/)[1];

        fireEvent.click(unenrollButton);
      });

      await waitFor(() => {
        const unenrollModalButton = within(getByTestId(/modal-footer/)).getAllByTestId(/button/)[1];

        fireEvent.click(unenrollModalButton);
      });

      await waitFor(() => {
        expect(unenrollMutationSpy).toBeCalled();
      });
    });
  });

  describe('lessons list', () => {
    beforeEach(() => history.replace('/courses/1'));

    it('renders lesson cards sorted by step with titles and action buttons correctly', async () => {
      renderCourse();

      const lessonCardsTitles = await screen.findAllByRole('heading', { level: 5 });
      const lessonCardsButtons = within(
        screen.getByRole('heading', { name: 'Lessons' }).parentNode
      ).getAllByRole('link');

      expect(lessonCardsTitles).toHaveLength(4);
      expect(lessonCardsTitles[0]).toHaveTextContent('Lesson 2');
      expect(lessonCardsTitles[1]).toHaveTextContent('Lesson 1');
      expect(lessonCardsTitles[2]).toHaveTextContent('Lesson 3');
      expect(lessonCardsTitles[3]).toHaveTextContent('Career Review Survey');

      expect(lessonCardsButtons).toHaveLength(4);
      expect(lessonCardsButtons[0]).toHaveTextContent(/continue/i);
      expect(lessonCardsButtons[1]).toHaveTextContent(/start/i);
      expect(lessonCardsButtons[2]).toHaveTextContent(/done/i);
      expect(lessonCardsButtons[3]).toHaveTextContent(/start/i);
    });

    it('renders survey lesson card with active button when previous lessons are not completed', async () => {
      renderCourse();
      const surveyLessonCardButton = await screen.findByLabelText('Career Review Survey');

      expect(surveyLessonCardButton).not.toBeDisabled();
    });
  });
});
