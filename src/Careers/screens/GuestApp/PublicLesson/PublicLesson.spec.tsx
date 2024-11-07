import { MockedProvider } from '@apollo/client/testing';
import { Redirect, Route, Switch } from 'react-router-dom';
import { screen } from '@testing-library/dom';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { PublicLesson } from '@dc/screens/GuestApp/PublicLesson/PublicLesson';
import { PUBLIC_COURSE_QUERY } from '@dc/graphql/public/queries/course';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const courseQuerySpy = jest.fn();

const mocks = [
  {
    request: {
      query: PUBLIC_COURSE_QUERY,
      variables: {
        code: undefined,
        shareId: undefined,
        track: true,
      },
    },
    result: () => {
      courseQuerySpy();

      return {
        data: {
          course: {
            id: '1',
            description: 'Course 1 description',
            name: 'Course 1',
            pathway: {
              name: 'Pathway 1',
            },
            lessons: [
              {
                archivedAt: null,
                assignments: [],
                attachments: [],
                careerReviewSurvey: null,
                checkInGroups: [
                  {
                    displayName: 'Lesson 1 Check-ins',
                    id: '1',
                    name: 'Career cluster',
                    questions: [
                      {
                        id: '1',
                        question:
                          'What do you like best about the careers and work done within this career cluster?',
                        step: 1,
                        __typename: 'CheckInQuestion',
                      },
                    ],
                    step: 1,
                    __typename: 'CheckInGroup',
                  },
                ],
                checkInQuestions: [],
                description: {
                  __typename: 'LessonDescription',
                  audience: '',
                  introduction: '',
                  situation: '',
                  goal: '',
                  role: '',
                },
                externalPresentations: [
                  {
                    displayName: 'Overview',
                    id: '14',
                    source: 'https://slides.definedlearning.com/p/c9',
                    step: 1,
                    __typename: 'ExternalPresentation',
                    isExpandable: false,
                  },
                ],
                hasPresentation: true,
                id: '2',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/dd057967-4ca9-4bc9-91b8-ea59a294838b/manufacturing.jpg?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20230524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230524T062019Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0dfbe59a58371d4234ef4ee019d6c451e5c0e9d99c9362a1fc88b89097d93257',
                name: 'Career Cluster: Manufacturing',
                researchLinks: [],
                step: 1,
                texts: [],
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/dd057967-4ca9-4bc9-91b8-ea59a294838b/manufacturing_thumbnail.png?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20230524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230524T062019Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=77978a4f95b41e80897566eaef12002c6ba671306bad02455b5803d27d9510a7',
                type: 'career_cluster',
                videos: [],
                vocabularies: [],
                __typename: 'Lesson',
              },
            ],
          },
        },
      };
    },
  },
];

const renderLesson = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <NavigationContextProvider>
        <Switch>
          <Route path='shared/student/courses/:courseId/lessons/:lessonId'>
            <PublicLesson />
          </Route>
          <Redirect from='*' to='/sign-in' />
        </Switch>
      </NavigationContextProvider>
    </MockedProvider>,
    { route: 'shared/student/courses/1/lessons/2' }
  );

describe('Lesson', () => {
  it('renders main lesson content', async () => {
    const { container } = renderLesson();
    const title = await screen.findByText('Career Cluster: Manufacturing');
    const checkInGroupTitle = await screen.findByText('Lesson 1 Check-ins');
    const checkInGroupQuestion = await screen.findByText(
      'What do you like best about the careers and work done within this career cluster?'
    );
    const buttons = await screen.findAllByRole('button', { name: 'Save' });
    const textArea = await screen.findAllByRole('textbox');

    expect(title).toBeInTheDocument();
    expect(checkInGroupTitle).toBeInTheDocument();
    expect(checkInGroupQuestion).toBeInTheDocument();
    expect(buttons.length).toBe(1);
    expect(textArea.length).toBe(1);
    expect(buttons[0]).toBeDisabled();
    expect(textArea[0]).toBeDisabled();
    expect(container).toMatchSnapshot();
  });
});
