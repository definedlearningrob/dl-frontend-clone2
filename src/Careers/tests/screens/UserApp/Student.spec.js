import { InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';

import { TEACHER_DASHBOARD } from '@dc/graphql/user/queries/teacherDashboardClassesStats';
import gradeSubmission from '@dc/graphql/user/mutations/gradeSubmission';
import schoolClassWithStudentsQuery from '@dc/graphql/user/queries/schoolClassWithStudents';
import { STUDENT_COURSE_ACTIVITY } from '@dc/graphql/user/queries/studentCourseActivity';
import UserStudent from '@dc/screens/UserApp/Student/Student';
import {
  CAREER_COURSE_SETTINGS_TYPES,
  GRADE_STATUSES,
  SUBMISSION_TYPES,
} from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import {
  activtiyQueryMock,
  differentGradesActivityMock,
  previewQueryMock,
  studentAssessmentSettingsMocks,
} from '@dc/tests/screens/UserApp/mocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

// For key field configuration other than id

const getCache = () =>
  new InMemoryCache({
    typePolicies: {
      Student: {
        keyFields: ['uuid'],
      },
    },
  });

const defaultMocks = [previewQueryMock, activtiyQueryMock, studentInfoMock];

const renderUserStudent = (mocks) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={getCache()} mocks={mocks || defaultMocks}>
      <Route path='users/:id'>
        <UserInfoProvider
          value={{
            userInfo: {
              settings: { onboardingEnabled: { value: true }, assessmentEnabled: { value: true } },
            },
          }}>
          <NavigationContextProvider>
            <UserStudent />
          </NavigationContextProvider>
        </UserInfoProvider>
      </Route>
    </MockedProvider>,
    { route: 'users/1', initialState: { session: { user: { type: 'student' } } } }
  );

describe('UserAppStudent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("display no assessment badge when student haven't submitted assessment yet", async () => {
    renderUserStudent(studentAssessmentSettingsMocks([studentInfoMock, previewQueryMock]));

    expect(await screen.findByTestId(/student-no-assesment/)).toBeInTheDocument();
  });

  describe("student's enrolled courses", () => {
    it('displays current returned courses on the list', async () => {
      const { getAllByTestId } = renderUserStudent([studentInfoMock, previewQueryMock]);

      await waitFor(() => {
        expect(getAllByTestId(/current-courses-item/)).toHaveLength(2);
        expect(getAllByTestId(/current-courses-item/)[0]).toHaveTextContent('Criminals Fighting');
        expect(getAllByTestId(/current-courses-item/)[1]).toHaveTextContent(
          'Fast clothes changing'
        );
      });
    });

    it('displays middle school designator on middle school course card', async () => {
      renderUserStudent([studentInfoMock, previewQueryMock]);

      const [firstCourse, secondCourse] = await screen.findAllByTestId(/current-courses-item/);

      const firstSchoolClassItemStageIcon = within(firstCourse).getAllByTestId('icon')[0];

      userEvent.hover(firstSchoolClassItemStageIcon);

      const firstSchoolClassItemStageTooltip = await screen.findByRole('tooltip', { hidden: true });

      expect(firstSchoolClassItemStageTooltip).toHaveTextContent('High School course');

      userEvent.unhover(firstSchoolClassItemStageIcon);

      const secondSchoolClassItemStageIcon = within(secondCourse).getAllByTestId('icon')[0];

      userEvent.hover(secondSchoolClassItemStageIcon);

      const secondSchoolClassItemStageTooltip = await screen.findByRole('tooltip', {
        hidden: true,
      });

      expect(secondSchoolClassItemStageTooltip).toHaveTextContent('Middle School course');

      userEvent.unhover(secondSchoolClassItemStageIcon);
    });
  });

  describe('student info', () => {
    it('displays student info', async () => {
      const { getByTestId } = renderUserStudent([studentInfoMock, previewQueryMock]);

      await waitFor(() => {
        expect(getByTestId(/student-name/)).toHaveTextContent('Bruce Wayne');
        expect(getByTestId(/student-class/)).toHaveTextContent('1A');
      });
    });

    it("displays middle school label when students' assessment type is set to middle school", async () => {
      renderUserStudent();

      const studentInfoCard = await screen.findByTestId(/student-info-card/);
      const firstSchoolClassItemStageIcon = within(studentInfoCard).getAllByTestId('icon')[0];
      userEvent.hover(firstSchoolClassItemStageIcon);
      const firstSchoolClassItemStageTooltip = await screen.findByRole('tooltip', { hidden: true });
      expect(firstSchoolClassItemStageTooltip).toHaveTextContent('Middle School student');
      userEvent.unhover(firstSchoolClassItemStageIcon);
    });

    it("displays High School label when studen's assessment type is set to High School", async () => {
      renderUserStudent(
        studentAssessmentSettingsMocks(CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL, true, [])
      );
      const studentInfoCard = await screen.findByTestId(/student-info-card/);
      const firstSchoolClassItemStageIcon = within(studentInfoCard).getAllByTestId('icon')[0];
      userEvent.hover(firstSchoolClassItemStageIcon);
      const firstSchoolClassItemStageTooltip = await screen.findByRole('tooltip', { hidden: true });
      expect(firstSchoolClassItemStageTooltip).toHaveTextContent('High School student');
      userEvent.unhover(firstSchoolClassItemStageIcon);
    });
  });

  it('displays all of the courses at activity section', async () => {
    const { getAllByTestId } = renderUserStudent();

    await waitFor(() => {
      expect(getAllByTestId(/activity-course-item/)).toHaveLength(2);

      expect(getAllByTestId(/activity-course-item/)[0]).toHaveTextContent('Criminals Fighting');
      expect(getAllByTestId(/activity-course-item/)[1]).toHaveTextContent('Fast clothes changing');
    });
  });

  it('extends first courses activity and displays returned data', async () => {
    const { getAllByTestId } = renderUserStudent();

    await waitFor(() => {
      expect(getAllByTestId(/activity-lesson-item/)).toHaveLength(1);
      expect(getAllByTestId(/activity-lesson-item/)[0]).toHaveTextContent('first lesson: Check In');
    });
  });

  it('extends course activity on course click and calls query for it', async () => {
    const spy = jest.fn();
    const activtiyQueryMock = {
      request: {
        query: STUDENT_COURSE_ACTIVITY,
        // This variables are taken from useParams
        variables: { uuid: '1', courseId: '2' },
      },
      result: () => {
        spy();

        return {
          data: {
            student: {
              uuid: '1',
              course: {
                id: '2',
                lessons: [
                  {
                    id: '2',
                    step: 2,
                    name: 'second lesson',
                    assignments: [],
                    checkInQuestions: [
                      {
                        answer: null,
                        question: 'some question',
                        __typename: 'checkInQuestion',
                      },
                    ],
                    checkInGroups: [],
                  },
                ],
              },
              __typename: 'Student',
            },
          },
        };
      },
    };

    const mocks = [...defaultMocks, activtiyQueryMock];

    const { getAllByTestId } = renderUserStudent(mocks);

    await waitFor(() => {
      fireEvent.click(getAllByTestId(/toggle-course/)[1]);
    });

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(getAllByTestId(/activity-lesson-item/)).toHaveLength(2);
      expect(getAllByTestId(/activity-lesson-item/)[0]).toHaveTextContent('first lesson: Check In');
      expect(getAllByTestId(/activity-lesson-item/)[1]).toHaveTextContent(
        'second lesson: Check In'
      );
    });
  });

  it('hide activity items after on opened click', async () => {
    const { getAllByTestId, queryAllByTestId } = renderUserStudent();

    await waitFor(() => {
      fireEvent.click(getAllByTestId(/toggle-course/)[0]);
    });

    await waitFor(() => {
      expect(queryAllByTestId(/activity-lesson-item/)).toHaveLength(0);
    });
  });

  it('displays activities sorted by lessons step and then by item step', async () => {
    const activityMock = {
      request: {
        query: STUDENT_COURSE_ACTIVITY,
        // This variables are taken from useParams
        variables: { uuid: '1', courseId: '1' },
      },
      result: () => ({
        data: {
          student: {
            uuid: '1',
            course: {
              id: '1',
              lessons: [
                {
                  id: '1',
                  step: 1,
                  name: 'first lesson',
                  assignments: [
                    {
                      id: '1',
                      step: 1,
                      description: 'fd',
                      name: 'first assignment',
                      displayName: 'first assignment',
                      submission: null,
                      __typename: 'assignment',
                    },
                    {
                      id: '2',
                      step: 2,
                      description: 'fd',
                      name: 'second assignment',
                      displayName: 'second assignment',
                      submission: null,
                      __typename: 'assignment',
                    },
                  ],
                  checkInQuestions: [
                    {
                      answer: null,
                      question: 'some question',
                      __typename: 'checkInQuestion',
                    },
                    {
                      answer: null,
                      question: 'some question',
                      __typename: 'checkInQuestion',
                    },
                  ],
                  checkInGroups: [],
                },
                {
                  id: '2',
                  step: 2,
                  name: 'second lesson',
                  assignments: [
                    {
                      id: '3',
                      step: 1,
                      description: 'fd',
                      name: 'third assignment',
                      displayName: 'third assignment',
                      submission: null,
                      __typename: 'assignment',
                    },
                    {
                      id: '4',
                      step: 2,
                      description: 'fd',
                      name: 'fourth assignment',
                      displayName: 'fourth assignment',
                      submission: null,
                      __typename: 'assignment',
                    },
                  ],
                  checkInQuestions: [
                    {
                      answer: null,
                      question: 'some question',
                      __typename: 'checkInQuestion',
                    },
                    {
                      answer: null,
                      question: 'some question',
                      __typename: 'checkInQuestion',
                    },
                  ],
                  checkInGroups: [],
                },
              ],
            },
            __typename: 'Student',
          },
        },
      }),
    };

    const mocks = [previewQueryMock, activityMock];

    const { getAllByTestId } = renderUserStudent(mocks);

    await waitFor(() => {
      const items = getAllByTestId(/activity-lesson-item/);
      expect(items).toHaveLength(8);

      expect(items[0]).toHaveTextContent('first lesson: first assignment');
      expect(items[1]).toHaveTextContent('first lesson: second assignment');
      expect(items[2]).toHaveTextContent('first lesson: Check In');
      expect(items[3]).toHaveTextContent('first lesson: Check In');
      expect(items[4]).toHaveTextContent('second lesson: third assignment');
      expect(items[5]).toHaveTextContent('second lesson: fourth assignment');
      expect(items[6]).toHaveTextContent('second lesson: Check In');
      expect(items[7]).toHaveTextContent('second lesson: Check In');
    });
  });

  describe('grading', () => {
    it('opens grading modal at dropdown review click', async () => {
      renderUserStudent([studentInfoMock, previewQueryMock, differentGradesActivityMock]);

      await waitFor(() => {
        expect(screen.getAllByTestId(/activity-lesson-item/)).toHaveLength(14);
      });

      // open first reviewable item
      const reviewButtons = await screen.findAllByRole('button', { name: 'Review' });

      userEvent.click(reviewButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
      });
    });

    it('closes grading modal at close modal click', async () => {
      renderUserStudent([
        studentInfoMock,
        userInfoMock,
        previewQueryMock,
        differentGradesActivityMock,
      ]);

      expect(await screen.findAllByTestId(/activity-lesson-item/)).toHaveLength(14);

      // open first reviewable item
      const reviewButtons = await screen.findAllByRole('button', { name: 'Review' });

      userEvent.click(reviewButtons[0]);

      userEvent.click(await screen.getByTestId(/modal-close-button/));

      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });

    it('render proper body for unsubmitted assignment', async () => {
      renderUserStudent([
        studentInfoMock,
        userInfoMock,
        previewQueryMock,
        differentGradesActivityMock,
      ]);

      const firstLessonFirstAssignment = await screen.findByLabelText(
        'first lesson: first assignment'
      );

      const firstLessonFirstAssignmentDropdownTrigger = within(
        firstLessonFirstAssignment
      ).getByRole('button', { name: 'Open context menu' });

      //workaround to open dropdown, userEvent.click does not work
      await userEvent.type(firstLessonFirstAssignmentDropdownTrigger, '{enter}');

      const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

      userEvent.click(reviewButton);

      expect(await screen.findByText('first assignment')).toBeInTheDocument();

      expect(screen.getByText('Student has not submitted any files yet.')).toBeInTheDocument();
    });

    it('render proper body for unsubmitted check in', async () => {
      renderUserStudent([
        studentInfoMock,
        userInfoMock,
        previewQueryMock,
        differentGradesActivityMock,
      ]);

      const firstLessonFirstCheckins = await screen.findAllByLabelText('first lesson: Check In');

      const firstLessonFirstCheckinReviewButton = within(firstLessonFirstCheckins[0]).getByRole(
        'button',
        'Review'
      );

      userEvent.click(firstLessonFirstCheckinReviewButton);

      await waitFor(() => {
        expect(screen.getByTestId(/check-in-title/)).toHaveTextContent('some question');
        expect(screen.getByTestId(/unsubmitted-input/)).toBeInTheDocument();
      });
    });

    it('render proper body for submitted assignment', async () => {
      renderUserStudent([
        studentInfoMock,
        userInfoMock,
        previewQueryMock,
        differentGradesActivityMock,
      ]);

      const firstLessonFirstAssignment = await screen.findByLabelText(
        'second lesson: third assignment'
      );

      const firstLessonFirstAssignmentDropdownTrigger = within(
        firstLessonFirstAssignment
      ).getByRole('button', { name: 'Open context menu' });

      //workaround to open dropdown, userEvent.click does not work
      await userEvent.type(firstLessonFirstAssignmentDropdownTrigger, '{enter}');

      const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

      userEvent.click(reviewButton);

      expect(screen.getByText('third assignment')).toBeInTheDocument();

      userEvent.click(screen.getByText('Files'));

      const files = screen.getAllByTestId(/submission-file-item/);

      expect(files).toHaveLength(2);
      expect(files[0]).toHaveTextContent('first - file');
      expect(files[1]).toHaveTextContent('second - file');
    });

    it('render proper body for submitted check in', async () => {
      renderUserStudent([studentInfoMock, previewQueryMock, differentGradesActivityMock]);

      const secondLessonUpdatedCheckin = await screen.findByLabelText(
        'second lesson: accepted but updated'
      );

      const secondLessonUpdatedCheckinDropdownTrigger = within(
        secondLessonUpdatedCheckin
      ).getByRole('button', { name: 'Open context menu' });

      userEvent.type(secondLessonUpdatedCheckinDropdownTrigger, '{enter}');

      const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

      userEvent.click(reviewButton);

      expect(screen.getByTestId(/check-in-title/)).toHaveTextContent('some question');

      expect(screen.getByTestId(/check-in-answer/)).toHaveTextContent(
        'This is my accepted but updated answer'
      );
    });

    it('renders proper state when item is answered but not graded yet', async () => {
      renderUserStudent([studentInfoMock, previewQueryMock, differentGradesActivityMock]);

      const firstLessonFirstCheckin = await screen.findByLabelText('first lesson: first checkin');

      const firstLessonFirstCheckinDropdownTrigger = within(firstLessonFirstCheckin).getByRole(
        'button',
        { name: 'Open context menu' }
      );

      userEvent.type(firstLessonFirstCheckinDropdownTrigger, '{enter}');

      const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

      userEvent.click(reviewButton);

      expect(screen.getByTestId(/check-in-answer/)).toHaveTextContent(
        'This is my first time answer'
      );

      const gradingStatus = screen.getByTestId(/grading-status/);

      expect(gradingStatus).toHaveTextContent('Needs Review');
    });

    it('renders proper state when item is answered and accepted', async () => {
      const { getByTestId } = renderUserStudent([
        studentInfoMock,
        previewQueryMock,
        differentGradesActivityMock,
      ]);

      const secondLessonAcceptedCheckin = await screen.findByLabelText(
        'second lesson: accepted answer'
      );

      const secondLessonAcceptedCheckinDropdownTrigger = within(
        secondLessonAcceptedCheckin
      ).getByRole('button', { name: 'Open context menu' });

      userEvent.type(secondLessonAcceptedCheckinDropdownTrigger, '{enter}');

      const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

      userEvent.click(reviewButton);

      await waitFor(() => {
        expect(getByTestId(/check-in-answer/)).toHaveTextContent('This is my accepted answer');

        const gradingStatus = screen.getByTestId(/grading-status/);

        expect(gradingStatus).toHaveTextContent(/Accepted/);
        expect(gradingStatus).toHaveTextContent(/by Peter Parker/);
      });
    });

    it('renders proper state when item is answered and rejected', async () => {
      renderUserStudent([
        studentInfoMock,
        userInfoMock,
        previewQueryMock,
        differentGradesActivityMock,
      ]);

      const secondLessonThirdAssignment = await screen.findByLabelText(
        'second lesson: third assignment'
      );

      const secondLessonThirdAssignmentDropdownTrigger = within(
        secondLessonThirdAssignment
      ).getByRole('button', { name: 'Open context menu' });

      userEvent.type(secondLessonThirdAssignmentDropdownTrigger, '{enter}');

      const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

      userEvent.click(reviewButton);

      await waitFor(() => {
        expect(screen.getByText('third assignment')).toBeInTheDocument();
      });

      const gradingStatus = screen.getByTestId(/grading-status/);

      expect(gradingStatus).toHaveTextContent(/Not Accepted/);
      expect(gradingStatus).toHaveTextContent(/by Peter Parker/);
    });
  });

  it('renders proper state when item is accepted but updated', async () => {
    renderUserStudent([
      studentInfoMock,
      previewQueryMock,
      differentGradesActivityMock,
      differentGradesActivityMock,
      {
        request: {
          query: gradeSubmission,
          variables: {
            input: {
              lessonId: '2',
              submissionId: '2',
              submissionType: SUBMISSION_TYPES.CHECK_IN,
              status: GRADE_STATUSES.ACCEPTED,
            },
          },
        },
        result: () => ({
          data: {
            gradeSubmission: {
              submissionGrade: { id: '2', status: GRADE_STATUSES.ACCEPTED },
            },
          },
        }),
      },
    ]);

    const secondLessonUpdatedCheckin = await screen.findByLabelText(
      'second lesson: accepted but updated'
    );

    const secondLessonUpdatedCheckinDropdownTrigger = within(secondLessonUpdatedCheckin).getByRole(
      'button',
      { name: 'Open context menu' }
    );

    userEvent.type(secondLessonUpdatedCheckinDropdownTrigger, '{enter}');

    const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

    userEvent.click(reviewButton);

    expect(await screen.findByTestId(/check-in-answer/)).toHaveTextContent(
      'This is my accepted but updated answer'
    );

    const gradingStatus = await screen.findByTestId(/grading-status/);

    expect(gradingStatus).toHaveTextContent('Updated');

    userEvent.click(await screen.findByRole('button', { name: 'Accept' }));
  });

  it('renders proper state when item is rejected but updated', async () => {
    renderUserStudent([
      studentInfoMock,
      previewQueryMock,
      differentGradesActivityMock,
      differentGradesActivityMock,
      {
        request: {
          query: gradeSubmission,
          variables: {
            input: {
              lessonId: '2',
              submissionId: '3',
              submissionType: SUBMISSION_TYPES.CHECK_IN,
              status: GRADE_STATUSES.NOT_ACCEPTED,
            },
          },
        },
        result: () => ({
          data: {
            gradeSubmission: {
              submissionGrade: { id: '3', status: GRADE_STATUSES.NOT_ACCEPTED },
            },
          },
        }),
      },
    ]);

    const secondLessonRejected = await screen.findByLabelText(
      'second lesson: rejected but updated'
    );

    const secondLessonRejectedDropdownTrigger = within(secondLessonRejected).getByRole('button', {
      name: 'Open context menu',
    });

    userEvent.type(secondLessonRejectedDropdownTrigger, '{enter}');

    const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

    userEvent.click(reviewButton);

    expect(await screen.findByTestId(/check-in-answer/)).toHaveTextContent(
      'This is my rejected but updated answer'
    );

    const gradingStatus = await screen.findByTestId(/grading-status/);

    expect(gradingStatus).toHaveTextContent('Updated');

    userEvent.click(await screen.findByRole('button', { name: 'Reject' }));
  });

  it('calls proper query on accept for assignment and refetch: activity for current course, dashboard classes stats, schoolClass with students', async () => {
    const mutationSpy = jest.fn();
    const refetchSpy = jest.fn();

    const refetchMocks = [
      {
        request: {
          query: TEACHER_DASHBOARD,
        },
        result: () => {
          refetchSpy();

          return {
            data: {
              teacherDashboard: {
                schoolClasses: [
                  {
                    enrolledCoursesCount: 1,
                    entityName: '',
                    finishedAssessmentsCount: 4,
                    finishedCoursesCount: 4,
                    gradingNeeded: true,
                    isDemo: false,
                    schoolClassName: '',
                    schoolClassUuid: '',
                    settings: {
                      assessmentType: '',
                    },
                    studentsCount: 1,
                  },
                ],
                userId: '1',
              },
            },
          };
        },
      },
      {
        request: {
          query: schoolClassWithStudentsQuery,
          variables: { page: 1, perPage: 35, uuid: '1', studentUuid: '1' },
        },
        result: () => {
          refetchSpy();

          return {
            data: {
              schoolClass: {
                name: '',
                uuid: '',
                students: {
                  nodes: [
                    {
                      archivedAt: '',
                      assessmentCompleted: false,
                      coursesCompleted: false,
                      coursesEnrolled: '',
                      firstName: '',
                      gradingNeeded: true,
                      lastName: '',
                      settings: {
                        assessmentType: {
                          value: '',
                        },
                      },
                      uuid: '',
                    },
                  ],
                  pagesCount: 1,
                },
              },
            },
          };
        },
      },
    ];

    const mocks = [
      studentInfoMock,
      previewQueryMock,
      differentGradesActivityMock,
      differentGradesActivityMock,
      differentGradesActivityMock,
      differentGradesActivityMock,
      differentGradesActivityMock,
      {
        request: {
          query: gradeSubmission,
          // This variables are taken from useParams
          variables: {
            input: {
              lessonId: '2',
              submissionId: '1',
              submissionType: SUBMISSION_TYPES.ASSIGNMENT,
              status: GRADE_STATUSES.ACCEPTED,
            },
          },
        },
        result: () => {
          mutationSpy();

          return {
            data: {
              gradeSubmission: { submissionGrade: { id: '1', status: GRADE_STATUSES.ACCEPTED } },
            },
          };
        },
      },
      ...refetchMocks,
    ];

    renderUserStudent(mocks);

    const secondLessonThirdAssignment = await screen.findByLabelText(
      'second lesson: third assignment'
    );

    const secondLessonThirdAssignmentDropdownTrigger = within(
      secondLessonThirdAssignment
    ).getByRole('button', { name: 'Open context menu' });

    userEvent.type(secondLessonThirdAssignmentDropdownTrigger, '{enter}');

    const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

    userEvent.click(reviewButton);

    userEvent.click(await screen.findByRole('button', { name: 'Accept' }));

    await waitFor(() => {
      expect(mutationSpy).toHaveBeenCalledTimes(1);
      expect(refetchSpy).toHaveBeenCalledTimes(1);
    });
  });

  // eslint-disable-next-line max-len
  it('calls proper query on reject for assignment and refetch: activity for current course, dashboard classes stats, schoolClass with students', async () => {
    const mutationSpy = jest.fn();
    const refetchSpy = jest.fn();

    const refetchMocks = [
      {
        request: {
          query: TEACHER_DASHBOARD,
        },
        result: () => {
          refetchSpy();

          return {
            data: {
              teacherDashboard: {
                schoolClasses: [
                  {
                    enrolledCoursesCount: 1,
                    entityName: '',
                    finishedAssessmentsCount: 4,
                    finishedCoursesCount: 4,
                    gradingNeeded: true,
                    isDemo: false,
                    schoolClassName: '',
                    schoolClassUuid: '',
                    settings: {
                      assessmentType: '',
                    },
                    studentsCount: 1,
                  },
                ],
                userId: '1',
              },
            },
          };
        },
      },
      {
        request: {
          query: schoolClassWithStudentsQuery,
          variables: { page: 1, perPage: 35, uuid: '1' },
        },
        result: () => {
          refetchSpy();

          return {
            data: {
              schoolClass: {
                name: '',
                uuid: '',
                students: {
                  nodes: [
                    {
                      archivedAt: '',
                      assessmentCompleted: false,
                      coursesCompleted: false,
                      coursesEnrolled: '',
                      firstName: '',
                      gradingNeeded: true,
                      lastName: '',
                      settings: {
                        assessmentType: {
                          value: '',
                        },
                      },
                      uuid: '',
                    },
                  ],
                  pagesCount: 1,
                },
              },
            },
          };
        },
      },
    ];

    const mocks = [
      studentInfoMock,
      previewQueryMock,
      differentGradesActivityMock,
      differentGradesActivityMock,
      {
        request: {
          query: gradeSubmission,
          // This variables are taken from useParams
          variables: {
            input: {
              lessonId: '2',
              submissionId: '1',
              submissionType: SUBMISSION_TYPES.ASSIGNMENT,
              status: GRADE_STATUSES.NOT_ACCEPTED,
            },
          },
        },
        result: () => {
          mutationSpy();

          return {
            data: {
              gradeSubmission: {
                submissionGrade: { id: '1', status: GRADE_STATUSES.NOT_ACCEPTED },
              },
            },
          };
        },
      },
      ...refetchMocks,
    ];

    renderUserStudent(mocks);

    const secondLessonThirdAssignment = await screen.findByLabelText(
      'second lesson: third assignment'
    );

    const secondLessonThirdAssignmentDropdownTrigger = within(
      secondLessonThirdAssignment
    ).getByRole('button', { name: 'Open context menu' });

    userEvent.type(secondLessonThirdAssignmentDropdownTrigger, '{enter}');

    const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

    userEvent.click(reviewButton);

    userEvent.click(await screen.findByRole('button', { name: 'Reject' }));

    await waitFor(() => {
      expect(mutationSpy).toHaveBeenCalledTimes(1);
      expect(refetchSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('calls proper query on accept for check in and refetch: activity for current course, dashboard classes stats', async () => {
    const mutationSpy = jest.fn();
    const refetchSpy = jest.fn();

    const refetchMocks = [
      {
        request: {
          query: TEACHER_DASHBOARD,
        },
        result: () => {
          refetchSpy();

          return {
            data: {
              teacherDashboard: {
                schoolClasses: [
                  {
                    enrolledCoursesCount: 1,
                    entityName: '',
                    finishedAssessmentsCount: 4,
                    finishedCoursesCount: 4,
                    gradingNeeded: true,
                    isDemo: false,
                    schoolClassName: '',
                    schoolClassUuid: '',
                    settings: {
                      assessmentType: '',
                    },
                    studentsCount: 1,
                  },
                ],
                userId: '1',
              },
            },
          };
        },
      },
    ];

    const mocks = [
      studentInfoMock,
      previewQueryMock,
      differentGradesActivityMock,
      differentGradesActivityMock,
      {
        request: {
          query: gradeSubmission,
          // This variables are taken from useParams
          variables: {
            input: {
              lessonId: '1',
              submissionId: '1',
              submissionType: SUBMISSION_TYPES.CHECK_IN,
              status: GRADE_STATUSES.ACCEPTED,
            },
          },
        },
        result: () => {
          mutationSpy();

          return {
            data: {
              gradeSubmission: { submissionGrade: { id: '1', status: GRADE_STATUSES.ACCEPTED } },
            },
          };
        },
      },
      ...refetchMocks,
    ];

    renderUserStudent(mocks);

    const firstLessonFirstCheckin = await screen.findByLabelText('first lesson: first checkin');

    const firstLessonFirstCheckinDropdownTrigger = within(firstLessonFirstCheckin).getByRole(
      'button',
      { name: 'Open context menu' }
    );

    userEvent.type(firstLessonFirstCheckinDropdownTrigger, '{enter}');

    const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

    userEvent.click(reviewButton);

    userEvent.click(await screen.findByRole('button', { name: 'Accept' }));

    await waitFor(() => {
      expect(mutationSpy).toHaveBeenCalledTimes(1);
      expect(refetchSpy).toHaveBeenCalledTimes(1);
    });
  });

  // eslint-disable-next-line max-len
  it('calls proper query on reject for check in and refetch: activity for current course, dashboard classes stats', async () => {
    const mutationSpy = jest.fn();
    const refetchSpy = jest.fn();

    const refetchMocks = [
      {
        request: {
          query: TEACHER_DASHBOARD,
        },
        result: () => {
          refetchSpy();

          return {
            data: {
              teacherDashboard: {
                schoolClasses: [
                  {
                    enrolledCoursesCount: 1,
                    entityName: '',
                    finishedAssessmentsCount: 4,
                    finishedCoursesCount: 4,
                    gradingNeeded: true,
                    isDemo: false,
                    schoolClassName: '',
                    schoolClassUuid: '',
                    settings: {
                      assessmentType: '',
                    },
                    studentsCount: 1,
                  },
                ],
                userId: '1',
              },
            },
          };
        },
      },
    ];

    const mocks = [
      studentInfoMock,
      previewQueryMock,
      differentGradesActivityMock,
      differentGradesActivityMock,
      {
        request: {
          query: gradeSubmission,
          variables: {
            input: {
              lessonId: '1',
              submissionId: '1',
              submissionType: SUBMISSION_TYPES.CHECK_IN,
              status: GRADE_STATUSES.NOT_ACCEPTED,
            },
          },
        },
        result: () => {
          mutationSpy();

          return {
            data: {
              gradeSubmission: {
                submissionGrade: { id: '1', status: GRADE_STATUSES.NOT_ACCEPTED },
              },
            },
          };
        },
      },
      ...refetchMocks,
    ];

    renderUserStudent(mocks);

    const firstLessonFirstCheckin = await screen.findByLabelText('first lesson: first checkin');

    const firstLessonFirstCheckinDropdownTrigger = within(firstLessonFirstCheckin).getByRole(
      'button',
      { name: 'Open context menu' }
    );

    userEvent.type(firstLessonFirstCheckinDropdownTrigger, '{enter}');

    const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

    userEvent.click(reviewButton);

    userEvent.click(await screen.findByRole('button', { name: 'Reject' }));

    await waitFor(() => {
      expect(mutationSpy).toHaveBeenCalledTimes(1);
      expect(refetchSpy).toHaveBeenCalledTimes(1);
    });
  });
});
