import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { TaskResourcesDocument } from '@graphql/shared/shared/hooks';

import DUPLICATE_PROJECT from '@pbl/graphql/user/mutations/duplicateProject';
import projectProducts from '@pbl/graphql/user/queries/projectProducts';
import projectStandards from '@pbl/graphql/user/queries/projectStandards';
import shareResourceMutation from '@pbl/graphql/user/mutations/shareResource';
import LESSON_WITH_PROJECT from '@pbl/graphql/user/queries/lessonWithProject';
import PROJECT from '@pbl/graphql/user/queries/project';
import PROJECT_COPIES from '@pbl/graphql/user/queries/projectCopies';
import ProjectScreen from '@pbl/screens/UserApp/Project/Project';
import UPDATE_PROJECT_STATUS from '@pbl/graphql/user/mutations/updateProjectStatus';
import { UserInfoProvider } from '@pbl/hooks/useUserInfo';
import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';
import TrackSlideVisit from '@pbl/graphql/shared/mutations/trackSlideVisit';
import StudentProjectScreen from '@pbl/screens/StudentApp/Project/Project';
import projectQuery from '@pbl/graphql/student/queries/project';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import { MessagingProvider } from '@shared/hooks/useMessaging';

Element.prototype.getBoundingClientRect = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

let lessonWithProjectSpy = jest.fn();
let soloProjectSpy = jest.fn();
let trackVisitedSpy = jest.fn();

const tracksSlideVisitMock = {
  clientMutationId: 1,
  status: 'ok',
};

const commonProjectMock = {
  description: 'A random description of Project 1',
  submissionsGradingNeededCount: 0,
  checkInsGradingNeededCount: 0,
  assignedStudentsCount: 0,
  checkInGroups: [],
  checkInQuestions: [],
  courses: [],
  displayName: 'Project 1',
  id: '1',
  introduction: 'Project 1 introduction',
  owner: {
    uuid: '1234-56789-1234-5678',
  },
  studentResources: 'Project 1 student resources',
  teachingResources: 'Project 1 teaching resources',
  __typename: 'Task',
  standard: 'Project 1 standard',
  files: [],
  units: [],
  copies: [],
  presentation: null,
  thumbnailUrl: 'url',
  status: 'PUBLISHED',
  sharedResource: null,
};

const presentationMock = {
  color: null,
  description: '\u003cp\u003eTest\u003c/p\u003e',
  displayName: 'Test',
  id: '11',
  name: 'Test',
  slides: [
    {
      backgroundColor: '#F0F2F7',
      backgroundImage:
        'https://s3.amazonaws.com/media-p.slid.es/uploads/1485050/images/8083804/blue-slide-background-wide.jpg',
      content: {
        id: '87',
        images: [],
        links: [],
        texts: [
          {
            contentId: '1',
            type: 'header',
            value: '\u003ch2 style="font-size: 48pt;"\u003eBasic Text template\u003c/h2\u003e',
            style: '',
            __typename: 'SlideTextItem',
          },
          {
            contentId: '2',
            type: 'text',
            value: 'Lorem Ipsum ',
            style: '',
            __typename: 'SlideTextItem',
          },
        ],
        videos: [],
        __typename: 'SlideContent',
      },
      description: null,
      id: '87',
      iframeUrl: null,
      name: 'fasdfds fsdfds afadf sdfsd sf sdfasdfdSlide namexd',
      notes: null,
      step: 1,
      template: 'basicText',
      subslides: [],
      products: [],
      checkInQuestions: [],
      checkInGroups: [],
      __typename: 'Slide',
    },
    {
      backgroundColor: '#ffffff',
      backgroundImage: null,
      content: {
        id: '88',
        images: [],
        links: [],
        texts: [
          {
            contentId: '1',
            type: 'header',
            value: '\u003ch3\u003eIframe block\u003c/h3\u003e',
            style: '',
            __typename: 'SlideTextItem',
          },
        ],
        videos: [],
        __typename: 'SlideContent',
      },
      description: 'Default slide desc',
      id: '88',
      iframeUrl: null,
      name: 'Slide name',
      notes: null,
      step: 2,
      template: 'iframe',
      subslides: [
        {
          backgroundColor: '#ffffff',
          backgroundImage: null,
          content: {
            id: '89',
            images: [],
            links: [
              {
                targetId: '',
                targetName: '',
                text: 'Go to choice',
                contentId: '1',
                __typename: 'SlideLink',
              },
              {
                targetId: '',
                targetName: '',
                text: 'Skip product',
                contentId: '2',
                __typename: 'SlideLink',
              },
            ],
            texts: [
              {
                contentId: '1',
                type: 'header',
                value: '\u003ch3\u003eImage text block\u003c/h3\u003e',
                style: '',
                __typename: 'SlideTextItem',
              },
              {
                contentId: '2',
                type: 'text',
                value: 'Lorem Ipsum',
                style: '',
                __typename: 'SlideTextItem',
              },
            ],
            videos: [],
            __typename: 'SlideContent',
          },
          description: 'Default slide desc',
          id: '89',
          iframeUrl: null,
          name: 'Slide name',
          notes: null,
          step: 3,
          template: 'imageText',
          __typename: 'Slide',
        },
      ],
      products: [],
      checkInQuestions: [],
      checkInGroups: [],
      __typename: 'Slide',
    },
  ],
  status: 'PUBLISHED',
  transition: null,
  typography: null,
  type: 'LEGACY',
  __typename: 'Presentation',
};

const copiesMock = [
  {
    id: '2',
  },
  {
    id: '3',
  },
];

const unitsMock = [
  {
    displayName: 'Lesson 1',
    id: '1',
    __typename: 'Unit',
  },
  {
    displayName: 'Lesson 2',
    id: '2',
    __typename: 'Unit',
  },
  {
    displayName: 'Lesson 3',
    id: '3',
    __typename: 'Unit',
  },
];

const filesMock = [
  {
    description: 'Project 1 files description',
    displayName: 'Project 1 Files List',
    filename: 'image1.jpg',
    id: '3',
    step: '0',
    url: 'http://localstack.lvh.me',
    __typename: 'TaskFile',
  },
  {
    description: 'Project 1 files description',
    displayName: 'Project 1 Files List',
    filename: 'image2.jpg',
    id: '2',
    step: '1',
    url: 'http://localstack.lvh.me',
    __typename: 'TaskFile',
  },
  {
    description: 'Project 1 files description',
    displayName: 'Project 1 Files List',
    filename: 'image3.jpg',
    id: '5',
    step: '2',
    url: 'http://localstack.lvh.me',
    __typename: 'TaskFile',
  },
  {
    description: 'Project 1 files description',
    displayName: 'Project 1 Files List',
    filename: 'image4.jpg',
    id: '1',
    step: '3',
    url: 'http://localstack.lvh.me',
    __typename: 'TaskFile',
  },
  {
    description: 'Project 1 files description',
    displayName: 'Project 1 Files List',
    filename: 'image5.jpg',
    id: '4',
    step: '4',
    url: 'http://localstack.lvh.me',
    __typename: 'TaskFile',
  },
];

const defaultMocks = [
  {
    request: {
      query: TrackSlideVisit,
      variables: {
        input: { slideId: '87', taskId: '1' },
      },
    },
    result: () => {
      trackVisitedSpy();

      return {
        data: {
          trackSlideVisit: tracksSlideVisitMock,
          status: 'ok',
          slideId: '87',
          taskId: '1',
        },
      };
    },
  },
  {
    request: {
      query: LESSON_WITH_PROJECT,
      variables: { lessonId: '1', projectId: '1', track: true, trackPresentation: true },
    },
    result: () => {
      lessonWithProjectSpy();

      return {
        data: {
          lesson: {
            displayName: 'Lesson 3',
            id: '3',
            project: {
              ...commonProjectMock,
              copies: copiesMock,
              files: filesMock,
              presentation: presentationMock,
              presentationUrl: 'https://slides.definedlearning.com/demo.html',
              units: unitsMock,
            },
            thumbnailUrl: 'some-lesson-thumbnail-url',
            __typename: 'Unit',
          },
        },
      };
    },
  },
];

const projectMock = [
  {
    request: {
      query: TrackSlideVisit,
      variables: {
        input: { slideId: '87', taskId: '1' },
      },
    },
    result: () => {
      trackVisitedSpy();

      return {
        data: {
          trackSlideVisit: tracksSlideVisitMock,
          status: 'ok',
          slideId: '87',
          taskId: '1',
        },
      };
    },
  },
  {
    request: {
      query: PROJECT,
      variables: { id: '1', track: true, trackPresentation: true },
    },
    result: () => {
      soloProjectSpy();

      return {
        data: {
          project: {
            ...commonProjectMock,
            copies: copiesMock,
            files: filesMock,
            presentation: presentationMock,
            presentationUrl: 'https://slides.definedlearning.com/demo.html',
            units: unitsMock,
          },
        },
      };
    },
  },
];

const projectMockWithoutPresentation = {
  request: {
    query: PROJECT,
    variables: { id: '1', track: true, trackPresentation: true },
  },
  result: () => ({
    data: {
      project: {
        ...commonProjectMock,
        copies: copiesMock,
        presentationUrl: null,
        units: unitsMock,
      },
    },
  }),
};

const projectMockAsOwner = [
  {
    request: {
      query: TrackSlideVisit,
      variables: {
        input: { slideId: '87' },
      },
    },
    result: () => {
      trackVisitedSpy();

      return {
        data: {
          trackSlideVisit: tracksSlideVisitMock,
          status: 'ok',
          slideId: '87',
        },
      };
    },
  },
  {
    request: {
      query: PROJECT,
      variables: { id: '1', track: true, trackPresentation: true },
    },
    result: () => ({
      data: {
        project: {
          ...commonProjectMock,
          copies: copiesMock,
          files: filesMock,
          owner: {
            uuid: 'secret-uuid',
          },
          presentationUrl: 'https://slides.definedlearning.com/demo.html',
          units: unitsMock,
        },
      },
    }),
  },
];

const projectMockAsOwnerAsDraft = {
  request: {
    query: PROJECT,
    variables: { id: '1', track: true, trackPresentation: true },
  },
  result: () => ({
    data: {
      project: {
        ...commonProjectMock,
        copies: copiesMock,
        files: filesMock,
        owner: {
          uuid: 'secret-uuid',
        },
        presentationUrl: 'https://slides.definedlearning.com/demo.html',
        status: 'DRAFT',
        units: unitsMock,
      },
    },
  }),
};

const projectMockWithoutCopies = [
  {
    request: {
      query: TrackSlideVisit,
      variables: {
        input: { slideId: '87' },
      },
    },
    result: () => {
      trackVisitedSpy();

      return {
        data: {
          trackSlideVisit: tracksSlideVisitMock,
          status: 'ok',
          slideId: '87',
        },
      };
    },
  },
  {
    request: {
      query: PROJECT,
      variables: { id: '1', track: true, trackPresentation: true },
    },
    result: () => ({
      data: {
        project: {
          ...commonProjectMock,
          files: filesMock,
          presentationUrl: 'https://slides.definedlearning.com/demo.html',
          units: unitsMock,
        },
      },
    }),
  },
];

const projectCopiesQuery = {
  request: {
    query: PROJECT_COPIES,
    variables: { id: '1' },
  },
  result: () => ({
    data: {
      project: {
        copies: [
          {
            id: '2',
            copies: [],
            displayName: 'Project 2',
          },
          {
            id: '3',
            copies: [
              {
                id: '5',
                copies: [],
                displayName: 'copy 5',
              },
              {
                id: '6',
                copies: [],
                displayName: 'copy 6',
              },
            ],
            displayName: 'Project 3',
          },
          {
            id: '4',
            copies: [
              {
                id: '7',
                copies: [
                  {
                    id: '8',
                    copies: [],
                    displayName: 'copy 8',
                  },
                ],
                displayName: 'copy 7',
              },
            ],
            displayName: 'Project 4',
          },
        ],
        id: '1',
      },
    },
  }),
};

const projectRoute = {
  url: '/projects/1',
  template: '/projects/:projectId',
};

const mockedStandardSets = [
  { id: '1', name: 'Set1', setId: 'S1' },
  { id: '2', name: 'Set2', setId: 'S2' },
  { id: '3', name: 'Set3', setId: 'S3' },
];

const classroomRenderSpy = jest.fn();

/* For some reason using jest fn is not working, jest fn is not called so below mock
  assures that loadscript callback will be called only on proper url passes
  this is workaround to test that loadScript was called with particular parameter
*/
jest.mock('load-script', () => (url, callback) => {
  // can't be imported from constants since it is out of scope of mock variable
  if (url === 'https://apis.google.com/js/platform.js') {
    callback();
  }
});

window.gapi = { sharetoclassroom: { render: classroomRenderSpy } };

const renderUserProject = (mocks = defaultMocks, route) => {
  const routeUrl = route ? route.url : '/lessons/1/projects/1';
  const routeTemplate = route ? route.template : '/lessons/:lessonId/projects/:projectId';

  const utils = renderWithRouterAndReduxProvider(
    <Route path={routeTemplate}>
      <MockedProvider mocks={mocks}>
        <MessagingProvider>
          <PresentationStateProvider>
            <NavigationContextProvider>
              <UserInfoProvider
                value={{
                  userInfo: {
                    uuid: 'secret-uuid',
                    standardSets: mockedStandardSets,
                    availableResources: {
                      tasks: [
                        {
                          id: '1',
                        },
                      ],
                    },
                  },
                }}>
                <ProjectScreen />
              </UserInfoProvider>
            </NavigationContextProvider>
          </PresentationStateProvider>
        </MessagingProvider>
      </MockedProvider>
    </Route>,
    {
      route: routeUrl,
      initialState: { session: { user: { type: 'user' } } },
    }
  );

  return { ...utils };
};

const renderStudentProject = (mocks = defaultMocks, route) => {
  const routeUrl = route ? route.url : '/student/projects/1';
  const routeTemplate = route ? route.template : '/student/projects/:projectId';

  const utils = renderWithRouterAndReduxProvider(
    <Route path={routeTemplate}>
      <MockedProvider mocks={mocks}>
        <MessagingProvider>
          <PresentationStateProvider>
            <NavigationContextProvider>
              <StudentProjectScreen />
            </NavigationContextProvider>
          </PresentationStateProvider>
        </MessagingProvider>
      </MockedProvider>
    </Route>,
    {
      route: routeUrl,
      initialState: { session: { user: { type: 'student' } } },
    }
  );

  return { ...utils };
};

describe('UserLessonProject', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('general', () => {
    it('renders spinner before response is resolved', async () => {
      const { getByTestId } = renderUserProject([...defaultMocks]);

      expect(getByTestId(/loading-spinner/)).toBeInTheDocument();
    });

    it('renders project header with lesson name and project name', async () => {
      const { getByTestId } = renderUserProject([...defaultMocks]);

      await waitFor(() => {
        const lessonName = getByTestId(/user-project-lesson-name/);
        const projectName = getByTestId(/user-project-name/);

        expect(lessonName).toHaveTextContent(/Lesson 3/i);
        expect(projectName).toHaveTextContent(/Project 1/i);
      });
    });

    it('calls proper query when not being part of the lesson', async () => {
      renderUserProject([...projectMock], projectRoute);

      await waitFor(() => expect(soloProjectSpy).toBeCalledTimes(1));
    });

    it('calls proper query when being part of the lesson', async () => {
      renderUserProject([...defaultMocks]);

      await waitFor(() => expect(lessonWithProjectSpy).toBeCalledTimes(1));
    });
  });

  describe('edit', () => {
    it('renders header options when having access', async () => {
      renderUserProject([...defaultMocks]);

      expect(await screen.findByRole('button', { name: 'Browse copies' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Customize Project' })).toBeInTheDocument();
    });

    it('disables the browse copies button when there are no copies', async () => {
      renderUserProject([...projectMockWithoutCopies], projectRoute);

      expect(await screen.findByRole('button', { name: 'Browse copies' })).toBeDisabled();
    });

    it('Lists all the copies after opening modal', async () => {
      renderUserProject([...projectMock, projectCopiesQuery], projectRoute);

      userEvent.click(await screen.findByRole('button', { name: 'Browse copies' }));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(await within(screen.getByRole('dialog')).findAllByRole('listitem')).toHaveLength(7);
    });

    it('Opens customize modal after click and fires proper query on submit', async () => {
      const duplicateMutationSpy = jest.fn();

      const duplicateProjectMock = {
        request: {
          query: DUPLICATE_PROJECT,
          variables: {
            input: {
              id: '1',
              name: `Test New Task`,
              displayName: `Test New Task`,
            },
          },
        },
        result: () => {
          duplicateMutationSpy();

          return {
            data: {
              duplicateTask: {
                project: {
                  id: '2',
                },
              },
            },
          };
        },
      };

      renderUserProject([...projectMock, duplicateProjectMock], projectRoute);

      userEvent.click(await screen.findByRole('button', { name: 'Customize Project' }));

      expect(await screen.findByRole('dialog')).toBeInTheDocument();

      userEvent.clear(await screen.findByPlaceholderText(/Copy/));
      userEvent.paste(await screen.findByPlaceholderText(/Copy/), 'Test New Task');

      userEvent.click(await screen.findByRole('button', { name: 'Begin customization' }));

      await waitFor(() => expect(duplicateMutationSpy).toBeCalledTimes(1));
    });

    it('render settings panel when owner and do not render header options', async () => {
      renderUserProject([...projectMockAsOwner, projectCopiesQuery], projectRoute);

      expect(await screen.findByText(/Settings/)).toBeInTheDocument();
      expect(screen.queryByTestId('header-settings')).not.toBeInTheDocument();
    });

    it('Sends proper mutation on duplicate from settings', async () => {
      const duplicateMutationSpy = jest.fn();

      const duplicateProjectMock = {
        request: {
          query: DUPLICATE_PROJECT,
          variables: {
            input: {
              id: '1',
              name: 'Test New Task',
              displayName: 'Test New Task',
            },
          },
        },
        result: () => {
          duplicateMutationSpy();

          return {
            data: {
              duplicateTask: {
                project: {
                  id: '2',
                },
              },
            },
          };
        },
      };

      renderUserProject([...projectMockAsOwner, duplicateProjectMock], projectRoute);

      userEvent.click(await screen.findByRole('button', { name: 'Create a new copy' }));
      userEvent.clear(await screen.findByPlaceholderText(/Project 1 Copy/));
      userEvent.paste(await screen.findByPlaceholderText(/Project 1 Copy/), 'Test New Task');

      userEvent.click(await screen.findByRole('button', { name: 'Begin customization' }));

      await waitFor(() => expect(duplicateMutationSpy).toBeCalledTimes(1));
    });

    it('change project status back and forth', async () => {
      const changeStatusToDraftSpy = jest.fn();
      const changeStatusToPublishedSpy = jest.fn();

      const changeProjectStatusToDraftMock = {
        request: {
          query: UPDATE_PROJECT_STATUS,
          variables: {
            input: {
              id: '1',
              status: 'DRAFT',
            },
          },
        },
        result: () => {
          changeStatusToDraftSpy();

          return {
            data: {
              updateTask: {
                project: {
                  id: '1',
                  status: 'DRAFT',
                  __typename: 'Task',
                },
              },
            },
          };
        },
      };

      const changeProjectStatusToPublishedMock = {
        request: {
          query: UPDATE_PROJECT_STATUS,
          variables: {
            input: {
              id: '1',
              status: 'PUBLISHED',
            },
          },
        },
        result: () => {
          changeStatusToPublishedSpy();

          return {
            data: {
              updateTask: {
                project: {
                  id: '1',
                  status: 'PUBLISHED',
                  __typename: 'Task',
                },
              },
            },
          };
        },
      };
      renderUserProject(
        [
          ...projectMockAsOwner,
          changeProjectStatusToDraftMock,
          changeProjectStatusToPublishedMock,
          projectMockAsOwnerAsDraft,
          ...projectMockAsOwner,
        ],
        projectRoute
      );

      expect(await screen.findByText('Published')).toBeInTheDocument();
      expect(screen.queryByText('Draft')).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'Convert to draft' }));
      await waitFor(() => expect(changeStatusToDraftSpy).toBeCalledTimes(1));

      expect(await screen.findByText('Draft')).toBeInTheDocument();
      expect(screen.queryByText('Published')).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'Publish' }));
      await waitFor(() => expect(changeStatusToPublishedSpy).toBeCalledTimes(1));

      expect(await screen.findByText('Published')).toBeInTheDocument();
      expect(screen.queryByText('Draft')).not.toBeInTheDocument();
    });

    it('changes edit mode to editing on switch click', async () => {
      renderUserProject([...projectMockAsOwner], projectRoute);

      //just to have the full body loaded
      expect(await screen.findByText(/Settings/)).toBeInTheDocument();
      expect(screen.queryAllByTestId('edit-button')).toHaveLength(0);

      const switches = await screen.findAllByRole('switch');

      userEvent.click(switches[0]);

      // introduction tab open and overview
      expect(screen.queryAllByTestId('edit-button')).toHaveLength(3);
      expect(
        within(screen.getByTestId('user-project-introduction')).getByTestId(/edit-button/)
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId('user-project-overview')).getByTestId(/edit-button/)
      ).toBeInTheDocument();

      userEvent.click(screen.getByRole('tab', { name: 'Resources' }));

      expect(
        within(screen.getByTestId('user-project-teaching-resources')).getByTestId(/edit-button/)
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId('user-project-student-resources')).getByTestId(/edit-button/)
      ).toBeInTheDocument();
    });

    it('changes edit mode to off on switch click', async () => {
      renderUserProject([...projectMockAsOwner], projectRoute);

      //just to have the full body loaded
      expect(await screen.findByText(/Settings/)).toBeInTheDocument();
      expect(screen.queryAllByTestId('edit-button')).toHaveLength(0);

      const switches = await screen.findAllByRole('switch');
      userEvent.click(switches[0]);
      userEvent.click(screen.getByRole('tab', { name: 'Resources' }));

      expect(screen.queryAllByTestId('edit-button')).toHaveLength(4);
      expect(
        within(screen.getByTestId('user-project-teaching-resources')).getByTestId(/edit-button/)
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId('user-project-student-resources')).getByTestId(/edit-button/)
      ).toBeInTheDocument();

      userEvent.click(switches[0]);

      expect(screen.queryAllByTestId('edit-button')).toHaveLength(0);
    });
  });

  it('renders project cards correctly with default (introduction) tab opened', async () => {
    const { findByTestId, getByTestId, getAllByTestId } = renderUserProject([...defaultMocks]);

    const presentationContainer = await findByTestId(/defined-custom-presentation/);
    const introduction = getByTestId(/user-project-introduction/);
    const introductionTab = getByTestId(/tab-introduction/);
    const overview = getByTestId(/user-project-overview/);
    const description = within(overview).getByTestId(/user-project-description/);
    const overviewUnits = within(overview).getAllByTestId(/overview-unit-item/);
    const share = getByTestId(/user-project-share/);
    const shareButtons = within(share).getAllByTestId(/button/);
    const standardsTab = getByTestId(/tab-standards/);
    const resourcesTab = getByTestId(/tab-resources/);
    const files = getByTestId(/user-project-files$/);
    const filesDescription = getByTestId(/user-project-files-description/);
    const fileItems = getAllByTestId(/user-project-file-item/);

    expect(presentationContainer).toBeInTheDocument();

    expect(introductionTab).toBeInTheDocument();
    expect(resourcesTab).toBeInTheDocument();
    expect(standardsTab).toBeInTheDocument();

    expect(within(introduction).getByTestId(/card-title/)).toHaveTextContent(/introduction/i);
    expect(introduction).toHaveTextContent(/Project 1 introduction/i);

    expect(within(overview).getByTestId(/card-title/)).toHaveTextContent(/overview/i);
    expect(description).toHaveTextContent(/A random description of Project 1/i);
    expect(overviewUnits).toHaveLength(3);
    expect(overviewUnits[0]).toHaveTextContent(/lesson 1/i);
    expect(overviewUnits[1]).toHaveTextContent(/lesson 2/i);
    expect(overviewUnits[2]).toHaveTextContent(/lesson 3/i);

    expect(within(share).getByTestId(/card-title/)).toHaveTextContent(/share/i);
    expect(shareButtons).toHaveLength(1);
    expect(shareButtons[0]).toHaveTextContent(/Create share link/);
    expect(within(files).getByTestId(/card-title/)).toHaveTextContent(/Worksheets/i);
    expect(filesDescription).toHaveTextContent('Files associated with this task');
    expect(fileItems).toHaveLength(5);
    expect(fileItems[0]).toHaveTextContent(/image1.jpg/i);
    expect(fileItems[1]).toHaveTextContent(/image2.jpg/i);
    expect(fileItems[2]).toHaveTextContent(/image3.jpg/i);
    expect(fileItems[3]).toHaveTextContent(/image4.jpg/i);
    expect(fileItems[4]).toHaveTextContent(/image5.jpg/i);
  });

  it('fallbacks to external presentation when internal presentation is missing', async () => {
    renderUserProject([...projectMockAsOwner], projectRoute);

    expect(await screen.findByTestId('user-project-presentation')).toBeInTheDocument();
  });

  it('shows no presentation card when its missing', async () => {
    renderUserProject([projectMockWithoutPresentation], projectRoute);

    expect(await screen.findByTestId('empty-placeholder-presentation')).toBeInTheDocument();
    expect(screen.queryByTestId('user-project-presentation')).not.toBeInTheDocument();
    expect(screen.queryByTestId('defined-custom-presentation')).not.toBeInTheDocument();
  });

  it('renders correct values for products tab', async () => {
    const lessonProductsSpy = jest.fn();
    const lessonProductsMock = [
      {
        request: {
          query: projectProducts,
          variables: {
            projectId: '1',
          },
        },
        result() {
          lessonProductsSpy();

          return {
            data: {
              project: {
                id: '1',
                assignedStudentsCount: 0,
                products: [
                  {
                    submissionsGradingNeededCount: 0,
                    description: '<p>test</p>',
                    displayName: 'test',
                    id: '1',
                    name: 'test',
                    rubrics: [],
                    hidden: false,
                    quickTask: null,
                  },
                ],
              },
            },
          };
        },
      },
    ];
    renderUserProject([...defaultMocks, ...lessonProductsMock]);

    const productsTab = await screen.findByTestId(/tab-products/);

    expect(productsTab).toBeInTheDocument();

    fireEvent.click(productsTab);

    await waitFor(() => {
      expect(lessonProductsSpy).toHaveBeenCalledTimes(1);
    });

    const product = screen.getAllByTestId(/user-project-product/i)[0];

    expect(product).toBeInTheDocument();
    expect(within(product).getByTestId(/card-title/i)).toHaveTextContent('test');
    expect(within(product).getByTestId(/user-project-description/i)).toHaveTextContent('test');
  });

  it('shows rubrics button when product has rubrics', async () => {
    const lessonProductsSpy = jest.fn();
    const lessonProductsMock = [
      {
        request: {
          query: projectProducts,
          variables: {
            projectId: '1',
          },
        },
        result() {
          lessonProductsSpy();

          return {
            data: {
              project: {
                id: '1',
                assignedStudentsCount: 0,
                products: [
                  {
                    submissionsGradingNeededCount: 0,
                    description: '<p>test</p>',
                    displayName: 'test',
                    id: '1',
                    name: 'test',
                    rubrics: [],
                    hidden: false,
                    quickTask: null,
                  },
                  {
                    submissionsGradingNeededCount: 0,
                    description: '<p>test</p>',
                    displayName: 'test',
                    id: '2',
                    name: 'test',
                    rubrics: [
                      {
                        hasAlignedStatements: false,
                        criteriaLabels: [
                          {
                            displayName: null,
                            id: '1',
                            score: 1,
                          },
                          {
                            displayName: null,
                            id: '2',
                            score: 2,
                          },
                        ],
                        criterias: [],
                        description: '<p>New rubric</p>',
                        headings: [
                          {
                            id: '1',
                            multiplier: 1,
                            name: 'Click to add heading',
                          },
                          {
                            id: '2',
                            multiplier: 2,
                            name: 'Click to add heading',
                          },
                        ],
                        id: '1',
                        name: 'New rubric',
                        displayName: 'Rubric displayName',
                      },
                    ],
                    hidden: false,
                    quickTask: null,
                  },
                ],
              },
            },
          };
        },
      },
    ];
    renderUserProject([...defaultMocks, ...lessonProductsMock]);

    const productsTab = await screen.findByTestId(/tab-products/);

    expect(productsTab).toBeInTheDocument();

    fireEvent.click(productsTab);

    const products = await screen.findAllByTestId(/user-project-product/i);
    const productWithoutRubrics = products[0];
    const productWithRubrics = products[1];

    expect(productWithoutRubrics).toBeInTheDocument();
    expect(productWithRubrics).toBeInTheDocument();
    expect(
      within(productWithoutRubrics).queryByRole('button', { name: 'Rubrics' })
    ).not.toBeInTheDocument();
    expect(within(productWithRubrics).getByRole('button', { name: 'Rubrics' })).toBeInTheDocument();
  });

  it('shows rubric modal when clicked on rubrics button', async () => {
    const lessonProductsSpy = jest.fn();
    const lessonProductsMock = [
      {
        request: {
          query: projectProducts,
          variables: {
            projectId: '1',
          },
        },
        result() {
          lessonProductsSpy();

          return {
            data: {
              project: {
                id: '1',
                assignedStudentsCount: 0,
                products: [
                  {
                    submissionsGradingNeededCount: 0,
                    description: '<p>test</p>',
                    displayName: 'test',
                    id: '1',
                    name: 'test',
                    quickTask: null,
                    rubrics: [
                      {
                        hasAlignedStatements: false,
                        criteriaLabels: [
                          {
                            displayName: null,
                            id: '1',
                            score: 1,
                          },
                          {
                            displayName: null,
                            id: '2',
                            score: 2,
                          },
                        ],
                        criterias: [],
                        description: '<p>New rubric</p>',
                        headings: [
                          {
                            id: '1',
                            multiplier: 1,
                            name: 'Click to add heading',
                          },
                          {
                            id: '2',
                            multiplier: 2,
                            name: 'Click to add heading',
                          },
                        ],
                        id: '1',
                        name: 'New rubric',
                        displayName: 'Rubric displayName',
                      },
                    ],
                    hidden: false,
                  },
                ],
              },
            },
          };
        },
      },
    ];
    renderUserProject([...defaultMocks, ...lessonProductsMock]);

    const productsTab = await screen.findByTestId(/tab-products/);

    expect(productsTab).toBeInTheDocument();

    fireEvent.click(productsTab);

    const rubricsButton = await screen.findByRole('button', { name: 'Rubrics' });

    fireEvent.click(rubricsButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows product name when there is no displayName', async () => {
    const lessonProductsSpy = jest.fn();
    const lessonProductsMock = [
      {
        request: {
          query: projectProducts,
          variables: {
            projectId: '1',
          },
        },
        result() {
          lessonProductsSpy();

          return {
            data: {
              project: {
                id: '1',
                assignedStudentsCount: 0,
                products: [
                  {
                    description: '<p>testDesc</p>',
                    submissionsGradingNeededCount: 0,
                    displayName: 'test2',
                    id: '1',
                    name: 'test',
                    rubrics: [],
                    hidden: false,
                    quickTask: null,
                  },
                  {
                    description: '<p>testDesc2</p>',
                    submissionsGradingNeededCount: 0,
                    displayName: '',
                    id: '2',
                    name: 'test3',
                    rubrics: [],
                    hidden: false,
                    quickTask: null,
                  },
                ],
              },
            },
          };
        },
      },
    ];
    renderUserProject([...defaultMocks, ...lessonProductsMock]);

    const productsTab = await screen.findByTestId(/tab-products/);

    expect(productsTab).toBeInTheDocument();

    fireEvent.click(productsTab);

    const productsCards = await screen.findAllByTestId(/user-project-product/i);

    expect(productsCards[0]).toHaveTextContent('test2');
    expect(productsCards[1]).toHaveTextContent('test3');
  });

  it('does not display hidden products', async () => {
    const productsMock = [
      {
        request: {
          query: projectProducts,
          variables: {
            projectId: '1',
          },
        },
        result: {
          data: {
            project: {
              id: '1',
              assignedStudentsCount: 0,
              products: [
                {
                  description: '<p>testDesc</p>',
                  submissionsGradingNeededCount: 0,
                  displayName: 'test - display name',
                  id: '1',
                  name: 'test',
                  rubrics: [],
                  hidden: true,
                  quickTask: null,
                },
                {
                  description: '<p>testDesc2</p>',
                  submissionsGradingNeededCount: 0,
                  displayName: '',
                  id: '2',
                  name: 'test2',
                  rubrics: [],
                  hidden: false,
                  quickTask: null,
                },
              ],
            },
          },
        },
      },
    ];
    renderUserProject([...defaultMocks, ...productsMock]);

    const productsTab = await screen.findByTestId(/tab-products/);
    userEvent.click(productsTab);

    const productCards = await screen.findAllByTestId(/user-project-product/i);

    expect(productCards).toHaveLength(1);
    expect(productCards[0]).toHaveTextContent('test2');
  });

  it('shows teacher and student resources on resources tab', async () => {
    renderUserProject([...defaultMocks]);

    const resourcesTab = await screen.findByTestId(/tab-resources/);

    expect(resourcesTab).toBeInTheDocument();

    fireEvent.click(resourcesTab);

    const teachingResources = await screen.findByTestId(/user-project-teaching-resources/i);
    const studentResources = screen.getByTestId(/user-project-student-resources/i);

    expect(studentResources).toBeInTheDocument();
    expect(within(studentResources).getByTestId(/card-title/i)).toHaveTextContent(
      'Student Resources'
    );
    expect(studentResources).toHaveTextContent(/Project 1 student resources/i);

    expect(teachingResources).toBeInTheDocument();
    expect(within(teachingResources).getByTestId(/card-title/i)).toHaveTextContent(
      'Teaching Resources'
    );
    expect(teachingResources).toHaveTextContent(/Project 1 teaching resources/i);
  });

  it('shows standards sets on standards tab and fetch first standard set', async () => {
    const lessonStandardsSpy = jest.fn();

    const lessonStandardsMock = [
      {
        request: {
          query: projectStandards,
          variables: {
            projectId: '1',
            setId: mockedStandardSets[0].setId,
          },
        },
        result() {
          lessonStandardsSpy();

          return {
            data: {
              project: {
                id: '1',
                standards: [
                  {
                    grade: '6',
                    standardNumber: '6-3.8.',
                    standardText: 'Test',
                    subject: 'Science',
                  },
                  {
                    grade: '6',
                    standardNumber: '6-3.9.',
                    standardText: 'Test2',
                    subject: 'Science',
                  },
                  {
                    grade: '7',
                    standardNumber: '2-3.8',
                    standardText: 'Test3',
                    subject: 'Science',
                  },
                ],
              },
            },
          };
        },
      },
    ];
    renderUserProject([...defaultMocks, ...lessonStandardsMock]);

    const standardsTab = await screen.findByTestId(/tab-standards/);

    expect(standardsTab).toBeInTheDocument();

    fireEvent.click(standardsTab);

    const standardSetButtons = await screen.findAllByTestId(/user-project-standard-set/i);

    expect(standardSetButtons).toHaveLength(3);

    await waitFor(() => {
      expect(lessonStandardsSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('shows standards grouped by subject and grade', async () => {
    const lessonStandardsSpy = jest.fn();

    const lessonStandardsMock = [
      {
        request: {
          query: projectStandards,
          variables: {
            projectId: '1',
            setId: mockedStandardSets[0].setId,
          },
        },
        result() {
          lessonStandardsSpy();

          return {
            data: {
              project: {
                id: '1',
                standards: [
                  {
                    grade: '6',
                    standardNumber: '6-3.8.',
                    standardText: 'Test',
                    subject: 'Science',
                  },
                  {
                    grade: '6',
                    standardNumber: '6-3.9.',
                    standardText: 'Test2',
                    subject: 'Science',
                  },
                  {
                    grade: '7',
                    standardNumber: '2-3.8',
                    standardText: 'Test3',
                    subject: 'Science',
                  },
                ],
              },
            },
          };
        },
      },
    ];
    renderUserProject([...defaultMocks, ...lessonStandardsMock]);

    const standardsTab = await screen.findByTestId(/tab-standards/);

    expect(standardsTab).toBeInTheDocument();

    fireEvent.click(standardsTab);

    const standardGroups = await screen.findAllByTestId(/user-project-standard-group$/i);

    expect(standardGroups).toHaveLength(2);

    standardGroups.forEach((standardGroup, index) => {
      const groupItems = within(standardGroup).getAllByTestId(/user-project-standard-item/i);

      if (index === 0) {
        expect(standardGroup).toHaveTextContent(/6-3.8./i);
        expect(standardGroup).toHaveTextContent(/6-3.9./i);
        expect(standardGroup).not.toHaveTextContent(/2-3.8./i);
        expect(groupItems).toHaveLength(2);
      } else {
        expect(standardGroup).not.toHaveTextContent(/6-3.8./i);
        expect(standardGroup).not.toHaveTextContent(/6-3.9./i);
        expect(standardGroup).toHaveTextContent(/2-3.8./i);
        expect(groupItems).toHaveLength(1);
      }
    });
  });

  it('generates task share resource link on "Share Student Link" button click', async () => {
    const generateShareLinkSpy = jest.fn();
    const mockClipboard = {
      writeText: jest.fn(),
    };
    // eslint-disable-next-line no-undef
    global.navigator.clipboard = mockClipboard;

    const shareMocks = [
      {
        request: {
          query: shareResourceMutation,
          variables: {
            input: {
              resourceId: '1',
              resourceType: 'TASK',
              allowLogin: false,
            },
          },
        },
        result() {
          generateShareLinkSpy();

          return {
            data: {
              shareResource: {
                sharedResource: {
                  code: 'ABCDEF',
                  allowLogin: false,
                },
              },
            },
          };
        },
      },
      {
        request: {
          query: LESSON_WITH_PROJECT,
          variables: {
            lessonId: '1',
            projectId: '1',
          },
        },
        result: {
          data: {
            lesson: {
              displayName: 'Lesson 3',
              id: '3',
              project: {
                ...commonProjectMock,
                owner: {
                  uuid: '123',
                },
                presentationUrl: 'https://slides.definedlearning.com/demo.html',
              },
              thumbnailUrl: 'some-lesson-thumbnail-url',
            },
          },
        },
      },
    ];

    const { getByTestId } = renderUserProject([...defaultMocks, ...shareMocks]);

    await waitFor(() => {
      const shareButton = within(getByTestId(/user-project-share/)).getAllByTestId(/button/)[0];

      fireEvent.click(shareButton);
    });
    await waitFor(() => expect(generateShareLinkSpy).toHaveBeenCalledTimes(1));
  });

  /* This test assures that loadScript was called with proper param cause
    for container to show, callback from loadScript needs to be called
  */
  it('shows classroom container when shared resource exists', async () => {
    const mocks = [
      {
        request: {
          query: LESSON_WITH_PROJECT,
          variables: { lessonId: '1', projectId: '1', track: true, trackPresentation: true },
        },
        result: {
          data: {
            lesson: {
              displayName: 'Lesson 3',
              id: '3',
              project: {
                ...commonProjectMock,
                presentationUrl: 'https://slides.definedlearning.com/demo.html',
                sharedResource: {
                  code: 'somecodehere',
                  allowLogin: false,
                },
              },
              thumbnailUrl: 'some-lesson-thumbnail-url',
              __typename: 'Unit',
            },
          },
        },
      },
    ];
    const { getByTestId } = renderUserProject(mocks);

    await waitFor(() => {
      expect(getByTestId('share-container')).toBeInTheDocument();
    });
  });

  it('does not show classroom container when shared resource not exists', async () => {
    const { queryByTestId } = renderUserProject();

    await waitFor(() => {
      expect(queryByTestId('share-container')).not.toBeInTheDocument();
    });
  });

  it('calls google api render method with proper params when sharedResource exists', async () => {
    const mocks = [
      {
        request: {
          query: LESSON_WITH_PROJECT,
          variables: { lessonId: '1', projectId: '1', track: true, trackPresentation: true },
        },
        result: {
          data: {
            lesson: {
              displayName: 'Lesson 3',
              id: '3',
              project: {
                ...commonProjectMock,
                presentationUrl: 'https://slides.definedlearning.com/demo.html',
                sharedResource: {
                  code: 'somecodehere',
                  allowLogin: false,
                },
              },
              thumbnailUrl: 'some-lesson-thumbnail-url',
              __typename: 'Unit',
            },
          },
        },
      },
    ];
    renderUserProject(mocks);

    await waitFor(() => {
      expect(classroomRenderSpy).toHaveBeenCalledTimes(1);
      expect(classroomRenderSpy).toHaveBeenCalledWith('widget-div', {
        size: 24,
        // eslint-disable-next-line no-undef
        url: `${process.env.VITE_PBL_FRONTEND_HOST}/shared?code=somecodehere`,
      });
    });
  });
});

describe('Presentation with bottom panel and resources modal', () => {
  const presentationWithFullScreen = {
    ...presentationMock,
    type: 'FULL_SCREEN',
  };

  const taskResourcesMock = {
    request: {
      query: TaskResourcesDocument,
      variables: { id: '1' },
    },
    result: () => ({
      data: {
        task: {
          id: '1',
          name: 'Project 1',
          displayName: 'Project 1',
          studentResources: 'Student resources content',
          teachingResources: 'Teaching resources content',
          files: filesMock,
          standard: 'Project 1 standard',
          __typename: 'Task',
        },
      },
    }),
  };

  const mocksWithFullScreenPresentation = [
    {
      request: {
        query: PROJECT,
        variables: { id: '1', track: true, trackPresentation: true },
      },
      result: () => ({
        data: {
          project: {
            ...commonProjectMock,
            copies: copiesMock,
            files: filesMock,
            presentation: presentationWithFullScreen,
            presentationUrl: 'https://slides.definedlearning.com/demo.html',
            units: unitsMock,
            studentResources: 'Student resources content',
            teachingResources: 'Teaching resources content',
          },
        },
      }),
    },
  ];

  it('shows bottom panel with resources button when presentation is full screen', async () => {
    renderUserProject([...mocksWithFullScreenPresentation], projectRoute);

    const presentation = await screen.findByTestId('defined-custom-presentation');
    expect(presentation).toBeInTheDocument();

    const resourcesButton = screen.getByRole('button', { name: /resources/i });
    expect(resourcesButton).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('opens resources modal with correct tabs when resources button is clicked', async () => {
    renderUserProject([...mocksWithFullScreenPresentation, taskResourcesMock], projectRoute);

    const resourcesButton = await screen.findByRole('button', {
      name: /^resources$/i,
    });
    userEvent.click(resourcesButton);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();

    const modalTitle = within(modal).getByRole('heading', {
      level: 4,
      name: /^resources$/i,
    });
    expect(modalTitle).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveTextContent(/student resources/i);
    expect(tabs[1]).toHaveTextContent(/teaching resources/i);
    expect(tabs[2]).toHaveTextContent(/worksheets/i);

    expect(screen.getByText('Student resources content')).toBeInTheDocument();
  });

  it('switches between student and teaching resources tabs', async () => {
    renderUserProject([...mocksWithFullScreenPresentation, taskResourcesMock], projectRoute);

    const resourcesButton = await screen.findByRole('button', { name: /resources/i });
    userEvent.click(resourcesButton);

    expect(await screen.findByText('Student resources content')).toBeInTheDocument();

    const teachingTab = screen.getByRole('tab', { name: /teaching resources/i });
    userEvent.click(teachingTab);

    expect(await screen.findByText('Teaching resources content')).toBeInTheDocument();
  });

  it('closes resources modal when clicking close button', async () => {
    renderUserProject([...mocksWithFullScreenPresentation, taskResourcesMock], projectRoute);

    const resourcesButton = await screen.findByRole('button', { name: /resources/i });
    userEvent.click(resourcesButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByTestId('modal-close-button');
    userEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('StudentProject Presentation with resources', () => {
  const presentationWithFullScreen = {
    ...presentationMock,
    type: 'FULL_SCREEN',
  };

  const studentTaskResourcesMock = {
    request: {
      query: TaskResourcesDocument,
      variables: { id: '1' },
    },
    result: () => ({
      data: {
        task: {
          id: '1',
          name: 'Project 1',
          displayName: 'Project 1',
          studentResources: 'Student resources content',
          teachingResources: 'Teaching resources content',
          files: filesMock,
          standard: 'Project 1 standard',
          __typename: 'Task',
        },
      },
    }),
  };

  const trackSlideVisitMock = {
    request: {
      query: TrackSlideVisit,
      variables: {
        input: { slideId: '87', taskId: '1' },
      },
    },
    result: () => {
      trackVisitedSpy();

      return {
        data: {
          trackSlideVisit: tracksSlideVisitMock,
          status: 'ok',
          slideId: '87',
          taskId: '1',
        },
      };
    },
  };

  const studentProjectMock = [
    trackSlideVisitMock,
    {
      request: {
        query: projectQuery,
        variables: { id: '1', track: true, trackPresentation: true },
      },
      result: () => ({
        data: {
          project: {
            ...commonProjectMock,
            assignedAt: '2024-01-01T00:00:00Z',
            copies: copiesMock,
            files: filesMock,
            presentation: presentationWithFullScreen,
            presentationUrl: 'https://slides.definedlearning.com/demo.html',
            units: unitsMock,
            studentResources: 'Student resources content',
            teachingResources: 'Teaching resources content',
            __typename: 'Task',
          },
        },
      }),
    },
  ];

  it('shows bottom panel with resources button when presentation is full screen', async () => {
    renderStudentProject([...studentProjectMock], {
      url: '/student/projects/1',
      template: '/student/projects/:projectId',
    });

    await waitFor(() => {
      expect(screen.queryByTestId(/loading-spinner/)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('defined-custom-presentation')).toBeInTheDocument();
    });

    const resourcesButton = screen.getByRole('button', { name: /^resources$/i });
    expect(resourcesButton).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('opens resources modal with student-specific tabs', async () => {
    renderStudentProject([...studentProjectMock, studentTaskResourcesMock], {
      url: '/student/projects/1',
      template: '/student/projects/:projectId',
    });

    await waitFor(() => {
      expect(screen.queryByTestId(/loading-spinner/)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('defined-custom-presentation')).toBeInTheDocument();
    });

    const resourcesButton = await screen.findByRole('button', {
      name: /^resources$/i,
    });
    userEvent.click(resourcesButton);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();

    const modalTitle = within(modal).getByRole('heading', {
      level: 4,
      name: /^resources$/i,
    });
    expect(modalTitle).toBeInTheDocument();

    const tabs = within(modal).getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveTextContent(/student resources/i);
    expect(tabs[1]).toHaveTextContent(/worksheets/i);

    expect(screen.queryByRole('tab', { name: /teaching resources/i })).not.toBeInTheDocument();

    expect(within(modal).getByText('Student resources content')).toBeInTheDocument();
  });

  it('closes student resources modal when clicking close button', async () => {
    renderStudentProject([...studentProjectMock, studentTaskResourcesMock], {
      url: '/student/projects/1',
      template: '/student/projects/:projectId',
    });

    const resourcesButton = await screen.findByRole('button', { name: /^resources$/i });
    userEvent.click(resourcesButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByTestId('modal-close-button');
    userEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
