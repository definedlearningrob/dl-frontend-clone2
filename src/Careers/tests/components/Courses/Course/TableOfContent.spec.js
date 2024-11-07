import { screen, waitFor, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import COURSE_CONTENT from '@dc/graphql/student/queries/tableOfContents';
import TableOfContent from '@dc/components/Student/Lesson/TableOfContent/TableOfContent';
import { lessonsDataMock, progressDataMock } from '@dc/tests/mocks/studentMocks';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

const getCourseContentMock = (allCheckInsCompleted = false) => ({
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
                id: '1',
                name: 'Test vocabulary',
                type: 'Vocabulary',
                step: 1,
                completed: false,
                __typename: 'LessonItem',
              },
              {
                id: '2',
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
                completed: allCheckInsCompleted,
                __typename: 'LessonItem',
              },
            ],
            extensionFields: [],
            type: 'PATHWAY',
            surveyPerformed: false,
            __typename: 'CourseContent',
          },
          {
            id: '3',
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
                completed: false,
                __typename: 'LessonItem',
              },
            ],
            checkIns: [
              {
                id: '8',
                name: 'Checkin Question 1',
                type: 'CheckInQuestion',
                step: 1,
                completed: allCheckInsCompleted,
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
                completed: allCheckInsCompleted,
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
                id: '1',
                name: 'Test Assignment 2',
                type: 'Assignment',
                step: 8,
                completed: true,
                __typename: 'LessonItem',
              },
            ],
            checkIns: [
              {
                id: '2',
                name: 'Checkin Group 1',
                type: 'CheckInGroup',
                step: 1,
                completed: true,
                __typename: 'LessonItem',
              },
              {
                id: '3',
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
            id: '5',
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
            id: '6',
            name: 'cluster',
            items: [
              {
                id: '1',
                name: 'Assignmnent 1',
                type: 'Assignment',
                step: 1,
                completed: false,
                __typename: 'LessonItem',
              },
              {
                id: '2',
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
                completed: allCheckInsCompleted,
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
            id: '7',
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
});

const mocks = [getCourseContentMock()];

const renderTableOfContent = (isSurveyPerformed, customMocks) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={customMocks ?? mocks}>
      <TableOfContent lessons={lessonsDataMock(isSurveyPerformed)} progress={progressDataMock} />
    </MockedProvider>
  );

describe('TableOfContent', () => {
  it('displays correct number of lesson nav-items', async () => {
    const { getAllByTestId } = renderTableOfContent();

    await waitFor(() => {
      const lessonNavigationButtons = getAllByTestId(/lesson-step/i);

      expect(lessonNavigationButtons).toHaveLength(7);
    });
  });

  it('displays 1st link to intro section when lesson is project type', async () => {
    const { getAllByTestId } = renderTableOfContent();

    await waitFor(() => {
      const lessonProject = getAllByTestId(/lesson-step/)[2];
      const firstNavigationLink = within(lessonProject).getAllByTestId(/lesson-item-link/)[0];

      expect(firstNavigationLink).toHaveTextContent(/introduction/i);
    });
  });

  it('displays not trackable lesson item link with inactive checkbox icon', async () => {
    const { getAllByTestId } = renderTableOfContent();

    await waitFor(() => {
      const attachment = getAllByTestId(/lesson-item-link-attachment/)[0];
      const introduction = getAllByTestId(/lesson-item-link-intro/)[0];
      const reseachLink = getAllByTestId(/lesson-item-link-reseachLink/)[0];
      const text = getAllByTestId(/lesson-item-link-text/)[0];
      const video = getAllByTestId(/lesson-item-link-video/)[0];
      const vocabulary = getAllByTestId(/lesson-item-link-vocabulary/)[0];

      expect(attachment.firstChild).toHaveClass('-inactive');
      expect(introduction.firstChild).toHaveClass('-inactive');
      expect(reseachLink.firstChild).toHaveClass('-inactive');
      expect(text.firstChild).toHaveClass('-inactive');
      expect(video.firstChild).toHaveClass('-inactive');
      expect(vocabulary.firstChild).toHaveClass('-inactive');
    });
  });

  it('displays not completed trackable lesson items with empty checkbox icon', async () => {
    const { getAllByTestId } = renderTableOfContent();

    await waitFor(() => {
      const assignment = getAllByTestId(/lesson-item-link-assignment/)[0];
      const careerReviewSurvey = getAllByTestId(/lesson-item-link-careerReviewSurvey/)[0];
      const checkInQuestion = getAllByTestId(/lesson-item-link-checkInQuestion/)[0];

      expect(assignment.firstChild).not.toHaveClass('-inactive');
      expect(careerReviewSurvey.firstChild).not.toHaveClass('-inactive');
      expect(checkInQuestion.firstChild).not.toHaveClass('-inactive');
      expect(assignment.firstChild).toBeEmptyDOMElement();
      expect(careerReviewSurvey.firstChild).toBeEmptyDOMElement();
      expect(checkInQuestion.firstChild).toBeEmptyDOMElement();
    });
  });

  it('displays completed trackable lesson items with checked checkbox icon', async () => {
    const { getAllByTestId } = renderTableOfContent(true);

    await waitFor(() => {
      const completedLesson = getAllByTestId(/lesson-step/)[3];
      const assignment = within(completedLesson).getAllByTestId(/lesson-item-link-assignment/)[0];
      const careerReviewSurvey = getAllByTestId(/lesson-item-link-careerReviewSurvey/)[0];
      const checkInQuestion = within(completedLesson).getAllByTestId(
        /lesson-item-link-checkInQuestion/
      )[0];

      expect(assignment.firstChild).not.toHaveClass('-inactive');
      expect(careerReviewSurvey.firstChild).not.toHaveClass('-inactive');
      expect(checkInQuestion.firstChild).not.toHaveClass('-inactive');
      expect(assignment.firstChild).not.toBeEmptyDOMElement();
      expect(checkInQuestion.firstChild).not.toBeEmptyDOMElement();
    });
  });

  it('displays grouped lesson items as one navigation item (vocabulary, research links)', async () => {
    const { getAllByTestId } = renderTableOfContent();

    await waitFor(() => {
      const firstLesson = getAllByTestId(/lesson-step/)[2];
      const vocabularies = within(firstLesson).getAllByTestId(/lesson-item-link-vocabulary/);
      const reseachLinks = within(firstLesson).getAllByTestId(/lesson-item-link-reseachLink/);

      expect(vocabularies).toHaveLength(1);
      expect(reseachLinks).toHaveLength(1);
    });
  });

  it('displays inactive lesson when no trackable items are completed', async () => {
    const { getAllByTestId } = renderTableOfContent();

    await waitFor(() => {
      const notStartedLesson = getAllByTestId(/lesson-step/)[1];

      expect(notStartedLesson.firstChild.firstChild).toHaveClass('not-started');
    });
  });

  it('displays in-progress lesson when some trackable items are completed', async () => {
    const { getAllByTestId } = renderTableOfContent();

    await waitFor(() => {
      const inProgressLesson = getAllByTestId(/lesson-step/)[2];

      expect(inProgressLesson.firstChild.firstChild).toHaveClass('in-progress');
    });
  });

  it('displays lesson as finished when all trackable items are completed', async () => {
    const { getAllByTestId } = renderTableOfContent();

    await waitFor(() => {
      const completedLesson = getAllByTestId(/lesson-step/)[3];

      expect(completedLesson.firstChild.firstChild).toHaveClass('done');
    });
  });

  it('enables career review survey when no previous items are completed', async () => {
    const { history } = renderTableOfContent();
    history.push = jest.fn();

    const careerReviewSurveyButton = await screen.findByRole('button', {
      name: 'Career Review Survey',
    });
    userEvent.click(careerReviewSurveyButton);

    const careerReviewSurveyLink = screen.getByRole('link', { name: 'Career Review Survey' });
    expect(careerReviewSurveyLink).not.toHaveClass('-disabled');

    userEvent.click(careerReviewSurveyLink);
    expect(history.push).toHaveBeenCalledTimes(1);
  });
});
