import { MockedProvider } from '@apollo/client/testing';
import { screen, within } from '@testing-library/react';
import { Route } from 'react-router-dom';

import Lesson from '@dc/screens/StudentApp/Lesson/Lesson';
import lessonInCourseQuery from '@dc/graphql/student/queries/lessonInCourse';
import { lessonMock, studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import COURSE_CONTENT from '@dc/graphql/student/queries/tableOfContents';

import { MessagingProvider } from '@shared/hooks/useMessaging';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const mockForLesson = {
  ...lessonMock,
  vocabularies: [
    { term: 'Term', name: 'Term', definition: 'def', id: '1', step: 6, __typename: 'Vocabulary' },
    { term: 'Term', name: 'Term', definition: 'def', id: '2', step: 9, __typename: 'Vocabulary' },
    { term: 'Term', name: 'Term', definition: 'def', id: '3', step: 10, __typename: 'Vocabulary' },
  ],
  researchLinks: [
    {
      author: 'author',
      description: 'desc',
      displayName: 'dname',
      id: '1',
      resourceLink: 'resource link',
      sourceName: 'source name',
      step: 3,
      __typename: 'ResearchLink',
    },
    {
      author: 'author',
      description: 'desc',
      displayName: 'dname',
      id: '2',
      resourceLink: 'resource link',
      sourceName: 'source name',
      step: 7,
      __typename: 'ResearchLink',
    },
    {
      author: 'author',
      description: 'desc',
      displayName: 'dname',
      id: '3',
      resourceLink: 'resource link',
      sourceName: 'source name',
      step: 8,
      __typename: 'ResearchLink',
    },
  ],
};

const defaultMock = {
  request: {
    query: lessonInCourseQuery,
    // This variables are taken from useParams
    variables: {
      courseId: '2',
      lessonId: '1',
      track: true,
    },
  },
  result: () => ({
    data: {
      course: {
        careerName: 'Some career name',
        reviewSurvey: null,
        hasInstitutionsInStudentState: false,
        id: '1',
        lesson: mockForLesson,
        lessons: [
          {
            __typename: 'Lesson',
            id: '1',
            step: 1,
            careerReviewSurvey: null,
            assignments: [],
            attachments: [],
            checkInQuestions: [],
            checkInGroups: [],
            hasPresentation: false,
            name: 'Lesson2',
            externalPresentations: [],
            researchLinks: [],
            vocabularies: [],
            texts: [],
            videos: [],
            type: 'TEXT',
          },
          {
            __typename: 'Lesson',
            id: '2',
            step: 2,
            careerReviewSurvey: null,
            assignments: [],
            attachments: [],
            checkInQuestions: [],
            checkInGroups: [],
            hasPresentation: false,
            name: 'Lesson2',
            externalPresentations: [],
            researchLinks: [],
            vocabularies: [],
            texts: [],
            videos: [],
            type: 'TEXT',
          },
        ],
        name: 'Some course name',
        progress: {
          submitted: 0,
          total: 12,
        },
        content: [
          {
            checkIns: [{ completed: true }],
            items: [{ type: 'Assignment', completed: true }],
          },
        ],
      },
    },
  }),
};

const courseContentMock = {
  request: {
    query: COURSE_CONTENT,
    variables: { id: '2' },
  },
  result: () => ({
    data: {
      course: {
        content: [
          {
            id: '1',
            name: 'Course name',
            items: [],
            checkIns: [],
            extensionFields: [],
            type: 'PATHWAY',
            surveyPerformed: true,
          },
        ],
      },
    },
  }),
};

const careerMockWithoutCareerName = {
  request: {
    query: lessonInCourseQuery,
    // This variables are taken from useParams
    variables: {
      courseId: '2',
      lessonId: '1',
      track: true,
    },
  },
  result: () => ({
    data: {
      course: {
        careerName: 'Some career name',
        reviewSurvey: null,
        hasInstitutionsInStudentState: false,
        id: '1',
        lesson: mockForLesson,
        lessons: [
          {
            __typename: 'Lesson',
            id: '1',
            step: 1,
            careerReviewSurvey: null,
            assignments: [],
            attachments: [],
            checkInQuestions: [],
            checkInGroups: [],
            hasPresentation: false,
            name: 'Lesson2',
            externalPresentations: [],
            researchLinks: [],
            vocabularies: [],
            texts: [],
            videos: [],
            type: 'TEXT',
          },
          {
            __typename: 'Lesson',
            id: '2',
            step: 2,
            careerReviewSurvey: null,
            assignments: [],
            attachments: [],
            checkInQuestions: [],
            checkInGroups: [],
            hasPresentation: false,
            name: 'Lesson2',
            externalPresentations: [],
            researchLinks: [],
            vocabularies: [],
            texts: [],
            videos: [],
            type: 'TEXT',
          },
        ],
        name: 'Some course name',
        progress: {
          submitted: 0,
          total: 12,
        },
        content: [
          {
            checkIns: [{ completed: true }],
            items: [{ type: 'Assignment', completed: true }],
          },
        ],
      },
    },
  }),
};

const renderLesson = (mockedResponse = []) =>
  renderWithRouterAndReduxProvider(
    <Route path='/lesson/:lessonId/:courseId'>
      <MockedProvider mocks={mockedResponse}>
        <UserInfoProvider value={{ userInfo: { state: 'ALABAMA', settings: {} } }}>
          <NavigationContextProvider>
            <MessagingProvider refreshUser={jest.fn()} userInfo={{}}>
              <Lesson />
            </MessagingProvider>
          </NavigationContextProvider>
        </UserInfoProvider>
      </MockedProvider>
    </Route>,
    { route: '/lesson/1/2', initialState: { session: { user: { type: 'student' } } } }
  );

describe('StudentAppLesson', () => {
  it('renders correctly with lesson items grouping', async () => {
    renderLesson([defaultMock, studentInfoMock, courseContentMock]);

    // Check if items from 2 separate queries appeared
    await screen.findAllByTestId('lesson-item-assignment');
    await screen.findAllByTestId('lesson-item-check-in-question');

    const items = screen.getAllByTestId(/lesson-item/);
    const presetntationItems = within(screen.getByTestId(/presentation-container/)).getAllByTestId(
      /lesson-item/
    );
    const otherItems = within(screen.getByTestId(/items-container/)).getAllByTestId(/lesson-item/);

    expect(items).toHaveLength(11);
    expect(presetntationItems).toHaveLength(1);
    expect(otherItems).toHaveLength(10);

    within(screen.getByTestId(/presentation-container/));
    expect(items[0]).toHaveAttribute('data-testid', 'lesson-item-presentation');
    expect(items[1]).toHaveAttribute('data-testid', 'lesson-item-assignment');
    expect(items[2]).toHaveAttribute('data-testid', 'lesson-item-attachment');
    expect(items[3]).toHaveAttribute('data-testid', 'lesson-item-research-link');
    expect(items[4]).toHaveAttribute('data-testid', 'lesson-item-text');
    expect(items[5]).toHaveAttribute('data-testid', 'lesson-item-video');
    expect(items[6]).toHaveAttribute('data-testid', 'lesson-item-vocabulary');
    expect(items[7]).toHaveAttribute('data-testid', 'lesson-item-research-link');
    expect(items[8]).toHaveAttribute('data-testid', 'lesson-item-vocabulary');
    expect(items[9]).toHaveAttribute('data-testid', 'lesson-item-check-in-question');

    expect(within(items[8]).getAllByTestId(/vocabulary-item/)).toHaveLength(2);
    expect(within(items[7]).getAllByTestId(/research-link-item/)).toHaveLength(2);
  });

  it('renders correctly with the presentation first and check in questions as last', async () => {
    renderLesson([defaultMock, courseContentMock]);

    // Check if items from 2 separate queries appeared
    await screen.findAllByTestId('lesson-item-assignment');
    await screen.findAllByTestId('lesson-item-check-in-question');

    const items = screen.getAllByTestId(/lesson-item/);

    const firstItem = 0;
    const lasItem = items.length - 1;

    expect(items[firstItem]).toHaveAttribute('data-testid', 'lesson-item-presentation');
    expect(items[lasItem]).toHaveAttribute('data-testid', 'lesson-item-check-in-question');
  });

  it('renders correctly with colleges & future box', async () => {
    const { container } = renderLesson([defaultMock, studentInfoMock]);

    const collegesAndFutureHeading = await screen.findByRole('heading', {
      name: 'Colleges & Future',
    });
    const collegesAndFutureText = await screen.findByText(
      'Find associated colleges, universities, trade programs, bootcamps and more with this course.'
    );
    const collegesAndFutureLink = await screen.findByRole('button', {
      name: 'See colleges & futures',
    });

    const collegesAndFutureImage = await screen.findByTestId('collages-and-future-image');

    expect(collegesAndFutureHeading).toBeInTheDocument();
    expect(collegesAndFutureText).toBeInTheDocument();
    expect(collegesAndFutureLink).toBeInTheDocument();
    expect(collegesAndFutureImage).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should not render box colleges & future ', async () => {
    renderLesson([careerMockWithoutCareerName]);

    const missingCollegesAndFutureHeading = await screen.findByRole('heading', {
      name: 'Colleges & Future',
    });
    const collegesAndFutureText = await screen.findByText(
      'Find associated colleges, universities, trade programs, bootcamps and more with this course.'
    );
    const collegesAndFutureLink = await screen.findByRole('button', {
      name: 'See colleges & futures',
    });

    expect(missingCollegesAndFutureHeading).toBeInTheDocument();
    expect(collegesAndFutureText).toBeInTheDocument();
    expect(collegesAndFutureLink).toBeInTheDocument();
  });
});
