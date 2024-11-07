import { MockedProvider } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import COURSE_CONTENT from '@dc/graphql/student/queries/tableOfContents';
import COURSE_COMPLETE from '@dc/graphql/student/queries/completedCourse';
import { renderWithRouter } from '@dc/utils/test';

import { CourseComplete } from './CourseComplete';

const mocks = [
  {
    request: {
      query: COURSE_COMPLETE,
    },
    result: () => ({
      data: {
        course: {
          id: '1',
          lessons: [
            { id: '3', step: 1, careerReviewSurvey: null, __typename: 'Lesson' },
            { id: '2', step: 2, careerReviewSurvey: null, __typename: 'Lesson' },
            { id: '5', step: 3, careerReviewSurvey: null, __typename: 'Lesson' },
            { id: '4', step: 4, careerReviewSurvey: null, __typename: 'Lesson' },
            { id: '6', step: 5, careerReviewSurvey: null, __typename: 'Lesson' },
            { id: '7', step: 6, careerReviewSurvey: null, __typename: 'Lesson' },
            {
              id: '1',
              step: 7,
              careerReviewSurvey: { performed: true, __typename: 'CareerReviewSurvey' },
              __typename: 'Lesson',
            },
          ],
          progress: { submitted: 15, total: 15, __typename: 'CourseProgress' },
          __typename: 'Course',
        },
      },
    }),
  },
  {
    request: {
      query: COURSE_CONTENT,
      // This variables are taken from useParams
      variables: {
        id: undefined,
      },
    },
    result: () => ({
      data: {
        course: {
          content: [
            {
              id: '1',
              name: 'Test Name',
              items: [
                {
                  id: '2',
                  name: 'Test vocabulary',
                  type: 'Vocabulary',
                  step: 1,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '1',
                  name: 'Test Video',
                  type: 'Video',
                  step: 1,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '3',
                  name: 'Test Text',
                  type: 'Text',
                  step: 2,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '4',
                  name: 'Test ResearchLink',
                  type: 'ResearchLink',
                  step: 3,
                  completed: false,
                  __typename: 'LessonItem',
                },
              ],
              checkIns: [],
              extensionFields: [
                { name: 'Test ExtensionField', id: '54', __typename: 'ExtensionField' },
              ],
              type: 'DIG_DEEPER_INTO_CAREER',
              surveyPerformed: false,
              __typename: 'CourseContent',
            },
            {
              id: '2',
              name: 'Test Lesson 2',
              items: [],
              checkIns: [
                {
                  id: '1',
                  name: 'Test CheckinGroup',
                  type: 'CheckInGroup',
                  step: 1,
                  completed: false,
                  __typename: 'LessonItem',
                },
              ],
              extensionFields: [],
              type: 'PATHWAY',
              surveyPerformed: false,
              __typename: 'CourseContent',
            },
            {
              id: '5',
              name: 'Test Lesson 3',
              items: [
                {
                  id: '1',
                  name: 'Test Text 1',
                  type: 'Text',
                  step: 1,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '2',
                  name: 'Test Vocabulary 1',
                  type: 'Vocabulary',
                  step: 2,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '3',
                  name: 'Test Vocabulary 2',
                  type: 'Vocabulary',
                  step: 3,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '4',
                  name: 'Test ResearchLink',
                  type: 'ResearchLink',
                  step: 5,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '5',
                  name: 'Test ResearchLink 2',
                  type: 'ResearchLink',
                  step: 6,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '6',
                  name: 'Test Assignment',
                  type: 'Assignment',
                  step: 7,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '7',
                  name: 'Test Assignment 2',
                  type: 'Assignment',
                  step: 8,
                  completed: true,
                  __typename: 'LessonItem',
                },
              ],
              checkIns: [
                {
                  id: '8',
                  name: 'Checkin Question 1',
                  type: 'CheckInQuestion',
                  step: 1,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '9',
                  name: 'Checkin Question 2',
                  type: 'CheckInQuestion',
                  step: 2,
                  completed: true,
                  __typename: 'LessonItem',
                },
                {
                  id: '10',
                  name: 'Checkin Question 3',
                  type: 'CheckInQuestion',
                  step: 4,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '11',
                  name: 'Checkin Group 1',
                  type: 'CheckInGroup',
                  step: 5,
                  completed: true,
                  __typename: 'LessonItem',
                },
              ],
              extensionFields: [],
              type: 'PROJECT',
              surveyPerformed: false,
              __typename: 'CourseContent',
            },
            {
              id: '4',
              name: 'Lesson 4',
              items: [
                {
                  id: '2',
                  name: 'Test Assignment 2',
                  type: 'Assignment',
                  step: 8,
                  completed: true,
                  __typename: 'LessonItem',
                },
              ],
              checkIns: [
                {
                  id: '1',
                  name: 'Checkin Group 1',
                  type: 'CheckInGroup',
                  step: 1,
                  completed: true,
                  __typename: 'LessonItem',
                },
                {
                  id: '2',
                  name: 'Checkin Group 1',
                  type: 'CheckInQuestion',
                  step: 2,
                  completed: true,
                  __typename: 'LessonItem',
                },
              ],
              extensionFields: [],
              type: 'PATHWAY',
              surveyPerformed: false,
              __typename: 'CourseContent',
            },
            {
              id: '6',
              name: 'Dig Deeper',
              items: [],
              checkIns: [],
              extensionFields: [
                { name: 'Extension 1', id: '34', __typename: 'ExtensionField' },
                { name: 'Extension 2', id: '54', __typename: 'ExtensionField' },
              ],
              type: 'DIG_DEEPER_INTO_CAREER',
              surveyPerformed: false,
              __typename: 'CourseContent',
            },
            {
              id: '7',
              name: 'cluster',
              items: [
                {
                  id: 'q',
                  name: 'Assignmnent 1',
                  type: 'Assignment',
                  step: 1,
                  completed: true,
                  __typename: 'LessonItem',
                },
                {
                  id: 'w',
                  name: 'Attachment 1',
                  type: 'Attachment',
                  step: 2,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '3',
                  name: 'ExtenalPresentation',
                  type: 'ExternalPresentation',
                  step: 3,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '4',
                  name: 'Research Link',
                  type: 'ResearchLink',
                  step: 4,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '5',
                  name: 'Text',
                  type: 'Text',
                  step: 5,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '6',
                  name: 'Vocabulary',
                  type: 'Vocabulary',
                  step: 6,
                  completed: false,
                  __typename: 'LessonItem',
                },
                {
                  id: '7',
                  name: 'Vocabulary',
                  type: 'Vocabulary',
                  step: 7,
                  completed: false,
                  __typename: 'LessonItem',
                },
              ],
              checkIns: [
                {
                  id: '4',
                  name: 'question 1',
                  type: 'CheckInQuestion',
                  step: 1,
                  completed: true,
                  __typename: 'LessonItem',
                },
                {
                  id: '1',
                  name: 'group 1',
                  type: 'CheckInGroup',
                  step: 2,
                  completed: true,
                  __typename: 'LessonItem',
                },
              ],
              extensionFields: [],
              type: 'CAREER_CLUSTER',
              surveyPerformed: false,
              __typename: 'CourseContent',
            },
            {
              id: '3',
              name: 'Career Review Survey',
              items: [],
              checkIns: [],
              extensionFields: [],
              type: 'CAREER_REVIEW_SURVEY',
              surveyPerformed: false,
              __typename: 'CourseContent',
            },
          ],
          __typename: 'Course',
        },
      },
    }),
  },
];

const courseName = 'Amazing course';

const renderCourseComplete = () =>
  renderWithRouter(
    <MockedProvider mocks={mocks}>
      <CourseComplete />
    </MockedProvider>,
    // @ts-ignore
    { route: { pathway: '/courses/7', state: { courseName } } }
  );

describe('CourseComplete', () => {
  it('renders with proper course name', async () => {
    const { container } = renderCourseComplete();

    await waitFor(() => {
      expect(container).toHaveTextContent(courseName);
    });
  });

  it('renders with "View Final Report" and "Explore More Courses" buttons', async () => {
    const { container } = renderCourseComplete();

    await waitFor(() => {
      expect(container).toHaveTextContent(/View Final Report/i);
      expect(container).toHaveTextContent(/Explore More Courses/i);
    });
  });

  it('navigates to the final report page after clicking on the button', async () => {
    const { history } = renderCourseComplete();
    history.push = jest.fn();

    const viewFinalReportButton = screen.getByRole('link', { name: 'View Final Report' });
    userEvent.click(viewFinalReportButton);

    await waitFor(() => {
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith('/final-report');
    });
  });

  it('navigates to the courses page after clicking on the button', async () => {
    const { history } = renderCourseComplete();
    history.push = jest.fn();

    const exploreMoreCoursesButton = screen.getByRole('link', { name: 'Explore More Courses' });
    userEvent.click(exploreMoreCoursesButton);

    await waitFor(() => {
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith('/courses');
    });
  });
});
