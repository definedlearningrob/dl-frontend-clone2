import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { screen, waitFor, within } from '@testing-library/dom';

import ARCHIVE_SLIDE from '@dc/graphql/user/mutations/archiveSlide';
import CREATE_SLIDE from '@dc/graphql/user/mutations/createSlide';
import SLIDES from '@dc/graphql/user/queries/slides';
import TASK_PRESENTATION from '@dc/graphql/user/queries/taskPresentation';
import UPDATE_PRESENTATION from '@dc/graphql/user/mutations/updatePresentation';
import UPDATE_SLIDE from '@dc/graphql/user/mutations/updateSlide';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { Roles } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';

import AdminAppPresentationBuilder from './PresentationsBuilder';

const defaultSlideData = {
  backgroundColor: '#ffffff',
  backgroundImage: '',
  name: 'Slide name',
  description: 'Default slide desc',
  id: null,
  iframeUrl: '',
  notes: '',
  step: null,
  isShared: false,
  subslides: [],
  slideBackgroundImages: [],
  content: {
    id: null,
    images: [],
    links: [],
    texts: [],
    videos: [],
  },
};

const titleSlide = {
  ...defaultSlideData,
  id: '1',
  step: 1,
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h1>Title page</h1>',
        type: 'header',
        style: '',
      },
    ],
  },
  checkInGroups: [],
  checkInQuestions: [],
  products: [],
  template: 'title',
};

const basicTextSlide = {
  ...defaultSlideData,
  template: 'basicText',
  id: '2',
  step: 2,
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h2>Basic text template</h2>',
        type: 'header',
        style: '',
      },
      {
        contentId: '2',
        value:
          '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Ac amet arcu eleifend aliquam massa a quis interdum urna. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie.</p>',
        type: 'text',
        style: '',
      },
    ],
  },
  checkInGroups: [],
  checkInQuestions: [],
  products: [],
};

const imageTextSlide = {
  ...defaultSlideData,
  id: '3',
  template: 'imageText',
  step: 3,
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>Image text block</h3>',
        type: 'header',
        style: '',
      },
      {
        contentId: '2',
        value:
          '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Ac amet arcu eleifend aliquam massa a quis interdum urna. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        type: 'text',
        style: '',
      },
    ],
  },
  checkInGroups: [],
  checkInQuestions: [],
  products: [],
};

const videoSlide = {
  ...defaultSlideData,
  id: '4',
  step: 4,
  template: 'video',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>Video block</h3>',
        type: 'header',
        style: '',
      },
    ],
  },
  checkInGroups: [],
  checkInQuestions: [],
  products: [],
};

const iframeSlide = {
  ...defaultSlideData,
  id: '5',
  template: 'iframe',
  step: 5,
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>Iframe block</h3>',
        type: 'header',
        style: '',
      },
    ],
  },
  checkInGroups: [],
  checkInQuestions: [],
  products: [],
};

const twoProductChoiceSlide = {
  ...defaultSlideData,
  id: '6',
  template: 'twoProductChoice',
  step: 6,
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>2 Product choice template</h3>',
        type: 'header',
        style: '',
      },
      {
        contentId: '2',
        value: '<h4>First Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '3',
        value: '<h4>Second Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '4',
        value:
          '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '5',
        value:
          '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        type: 'text',
        style: '',
      },
    ],
    links: [
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '1',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '2',
      },
    ],
  },
  checkInGroups: [],
  checkInQuestions: [],
  products: [],
};

const threeProductChoiceSlideData = {
  ...defaultSlideData,
  id: '7',
  template: 'threeProductChoice',
  step: 7,
  isShared: true,
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>3 Product choice template</h3>',
        type: 'header',
        style: '',
      },
      {
        contentId: '2',
        value: '<h4>First Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '3',
        value: '<h4>Second Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '4',
        value: '<h4>Third Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '5',
        value: '<p style="font-size: 21pt">Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '6',
        value: '<p style="font-size: 21pt">Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '7',
        value: '<p style="font-size: 21pt">Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
    ],
    links: [
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '1',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '2',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '3',
      },
    ],
  },
  checkInGroups: [],
  checkInQuestions: [],
  products: [],
};

const simplePresentation = {
  id: '1',
  color: '#FFFFFF',
  backgroundImage: null,
  description: 'Description',
  displayName: 'Display Name',
  name: 'name',
  slides: [],
  status: PUBLISHING_STATUSES.PUBLISHED,
  slideBackgroundImages: [],
  transition: 'fade',
  typography: 'default',
  type: 'LEGACY',
};

const presentationWithBasicSlides = {
  id: '1',
  color: '#FFFFFF',
  backgroundImage: null,
  description: 'Description',
  displayName: 'Display Name',
  name: 'name',
  slideBackgroundImages: [],
  slides: [
    titleSlide,
    basicTextSlide,
    imageTextSlide,
    videoSlide,
    iframeSlide,
    twoProductChoiceSlide,
    threeProductChoiceSlideData,
  ],
  status: PUBLISHING_STATUSES.PUBLISHED,
  transition: 'fade',
  typography: 'default',
  type: 'LEGACY',
};

const simplePresentationMock = {
  request: {
    query: TASK_PRESENTATION,
    variables: { id: '1' },
  },
  result: {
    data: {
      task: {
        id: '1',
        presentation: simplePresentation,
      },
    },
  },
};

const presentationWithBasicSlidesMock = {
  request: {
    query: TASK_PRESENTATION,
    variables: { id: '1' },
  },
  result: {
    data: {
      task: {
        id: '1',
        presentation: presentationWithBasicSlides,
      },
    },
  },
};

const slidesMock = {
  request: {
    query: SLIDES,
    variables: {},
  },
  result: {
    data: {
      slides: {
        nodes: [{ ...titleSlide, id: '100' }, basicTextSlide, imageTextSlide],
      },
    },
  },
};

const defaultMocks = [simplePresentationMock];

const renderBuilder = (mocks?: MockedResponse[]) =>
  renderWithRouterAndReduxProvider(
    <main app-type='careers' className='app'>
      <MockedProvider mocks={mocks ? mocks : defaultMocks}>
        <PresentationStateProvider>
          <UserInfoProvider
            value={{
              userInfo: {
                ...userInfoMock.result.data.userInfo,
                role: Roles.SYSTEM_ADMIN,
              },
            }}>
            <ExpandSidebarProvider>
              <NavigationContextProvider>
                <Route path='/admin/tasks/:taskId/presentation-builder'>
                  <>
                    <div id='portal' />
                    <AdminAppPresentationBuilder />,
                  </>
                </Route>
              </NavigationContextProvider>
            </ExpandSidebarProvider>
          </UserInfoProvider>
        </PresentationStateProvider>
      </MockedProvider>
    </main>,
    {
      route: '/admin/tasks/1/presentation-builder',
    }
  );

const inSlidesList = () => within(screen.getByTestId(/^slides-list$/i));
const inSlidesContent = () => within(screen.getByTestId(/slides-content/));
const inSlidesPanel = () => within(screen.getByTestId(/slides-panel/));

const changeTab = (tab: string) => {
  const tabElement = inSlidesPanel().getByText(tab);

  userEvent.click(tabElement);
};

const waitForContent = async () => {
  expect(await screen.findByTestId(/slides-panel/)).toBeInTheDocument();
  expect(await screen.findByTestId(/slides-content/)).toBeInTheDocument();
  expect(await screen.findByTestId(/^slides-list$/i)).toBeInTheDocument();
};

describe('AdminPresentationBuilder', () => {
  it('renders properly when no slides exists', async () => {
    renderBuilder();

    await waitForContent();

    const addSlideButton = inSlidesList().getByRole('button', { name: 'Add slide' });
    const slidesListItems = within(inSlidesList().getByRole('list')).queryAllByRole('listitem');
    const noContentInfo = inSlidesContent().getAllByText(/No slides in current presentation/);
    const emptySettingsInfo = inSlidesPanel().getByText(/No slides in current presentation/);

    expect(addSlideButton).toBeInTheDocument();
    expect(slidesListItems.length).toBe(0);
    // This is because reveal adds under the hood this slide as preview
    expect(noContentInfo[0]).toBeInTheDocument();
    expect(emptySettingsInfo).toBeInTheDocument();

    await changeTab('Slide Settings');

    const emptySlideSettingsInfo = inSlidesPanel().getByText(/No slides in current presentation/);

    expect(emptySlideSettingsInfo).toBeInTheDocument();

    await changeTab('Presentation Settings');

    const nameInput = inSlidesPanel().getByLabelText(/Presentation Name/);
    const descriptionInput = inSlidesPanel().getByLabelText(/Presentation Description/);

    expect(nameInput).toHaveValue('name');
    // Tiny mce iframe is not rendered here
    expect(descriptionInput).toBeInTheDocument();
  });

  it('open/close slides modal on add slide click and close click', async () => {
    renderBuilder();

    await waitForContent();

    const addSlideButton = inSlidesList().getByRole('button', { name: 'Add slide' });

    userEvent.click(addSlideButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/modal-close-button/));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it.only('displays new slide modal properly', async () => {
    renderBuilder();

    await waitForContent();

    const addSlideButton = inSlidesList().getByRole('button', { name: 'Add slide' });

    userEvent.click(addSlideButton);

    const inModal = within(screen.getByRole('dialog'));
    // First list is the navigation list
    const templatesList = await inModal.findByRole('list');

    const templates = within(templatesList).getAllByRole('listitem');

    await expect(templates).toHaveLength(10);
  });

  it('renders properly slides on slide list with selected first slide', async () => {
    renderBuilder([presentationWithBasicSlidesMock]);

    await waitForContent();

    const addSlideButton = inSlidesList().getByRole('button', { name: 'Add slide' });
    const slidesListItems = inSlidesList().getAllByTestId(/^slides-list-item$/i);
    expect(addSlideButton).toBeInTheDocument();
    expect(slidesListItems.length).toBe(7);
    expect(inSlidesContent().getAllByText('Title page').length).toBeGreaterThan(0);
  });

  it('navigates through slides properly', async () => {
    renderBuilder([presentationWithBasicSlidesMock]);

    await waitForContent();

    const slidesListItems = inSlidesList().getAllByTestId(/slides-list-item-interactive/);

    userEvent.click(slidesListItems[1]);

    await waitFor(() =>
      expect(inSlidesContent().getAllByText('Basic text template').length).toBeGreaterThan(0)
    );

    userEvent.click(slidesListItems[2]);

    await waitFor(() =>
      expect(inSlidesContent().getAllByText('Image text block').length).toBeGreaterThan(0)
    );

    userEvent.click(slidesListItems[3]);

    await waitFor(() =>
      expect(inSlidesContent().getAllByText('Video block').length).toBeGreaterThan(0)
    );

    userEvent.click(slidesListItems[4]);

    await waitFor(() =>
      expect(inSlidesContent().getAllByText('Iframe block').length).toBeGreaterThan(0)
    );

    userEvent.click(slidesListItems[5]);

    await waitFor(() =>
      expect(inSlidesContent().getAllByText('2 Product choice template').length).toBeGreaterThan(0)
    );

    userEvent.click(slidesListItems[6]);

    await waitFor(() =>
      expect(inSlidesContent().getAllByText('3 Product choice template').length).toBeGreaterThan(0)
    );
  });

  it('calls proper mutation on remove slide click', async () => {
    const removeSlideId = '3';

    const archiveSlideSpy = jest.fn();
    const updatePresentationSpy = jest.fn();

    const archiveSlideMock = {
      request: {
        query: ARCHIVE_SLIDE,
        variables: { input: { id: removeSlideId } },
      },
      result() {
        archiveSlideSpy();

        return {
          data: {
            archiveSlide: {
              id: removeSlideId,
              slide: {
                id: removeSlideId,
                presentation: {},
              },
            },
          },
        };
      },
    };

    const updatePresentationMock = {
      request: {
        query: UPDATE_PRESENTATION,
        variables: {
          input: {
            id: '1',
            name: 'name',
            description: 'Description',
            presentationSlides: [
              { slideId: '1', step: 1, subslides: [] },
              { slideId: '2', step: 2, subslides: [] },
              { slideId: '4', step: 4, subslides: [] },
              { slideId: '5', step: 5, subslides: [] },
              { slideId: '6', step: 6, subslides: [] },
              { slideId: '7', step: 7, subslides: [] },
            ],
          },
        },
      },
      result() {
        updatePresentationSpy();

        return {
          data: {
            updatePresentation: {
              id: removeSlideId,
              presentation: {
                color: '',
                description: '',
                displayName: '',
                id: removeSlideId,
                name: '',
                slides: [],
                status: PUBLISHING_STATUSES.PUBLISHED,
                transition: '',
                typography: '',
              },
            },
          },
        };
      },
    };

    renderBuilder([presentationWithBasicSlidesMock, archiveSlideMock, updatePresentationMock]);

    await waitForContent();

    const removeOption = within(screen.getAllByTestId('dropdown-options-container')[2]).getByText(
      /Remove/
    );

    userEvent.click(removeOption);

    await waitFor(() => expect(archiveSlideSpy).toHaveBeenCalledTimes(1));

    await waitFor(() => expect(updatePresentationSpy).toHaveBeenCalledTimes(1));
  });

  it('only updates presentation when removing shared slide', async () => {
    const removeSlideId = '7';

    const archiveSlideSpy = jest.fn();
    const updatePresentationSpy = jest.fn();

    const archiveSlideMock = {
      request: {
        query: ARCHIVE_SLIDE,
        variables: { input: { id: removeSlideId } },
      },
      result() {
        archiveSlideSpy();

        return {
          data: {
            archiveSlide: {
              id: removeSlideId,
            },
          },
        };
      },
    };

    const updatePresentationMock = {
      request: {
        query: UPDATE_PRESENTATION,
        variables: {
          input: {
            id: '1',
            name: 'name',
            description: 'Description',
            presentationSlides: [
              { slideId: '1', step: 1, subslides: [] },
              { slideId: '2', step: 2, subslides: [] },
              { slideId: '3', step: 3, subslides: [] },
              { slideId: '4', step: 4, subslides: [] },
              { slideId: '5', step: 5, subslides: [] },
              { slideId: '6', step: 6, subslides: [] },
            ],
          },
        },
      },
      result() {
        updatePresentationSpy();

        return {
          data: {
            updatePresentation: {
              presentation: null,
            },
          },
        };
      },
    };

    renderBuilder([presentationWithBasicSlidesMock, archiveSlideMock, updatePresentationMock]);

    await waitForContent();

    const removeOption = within(screen.getAllByTestId('dropdown-options-container')[6]).getByText(
      /Remove/
    );

    userEvent.click(removeOption);

    await waitFor(() => expect(updatePresentationSpy).toHaveBeenCalledTimes(1));

    await waitFor(() => expect(archiveSlideSpy).toHaveBeenCalledTimes(0));
  });

  it('adds slide from template properly', async () => {
    const createSlideSpy = jest.fn();

    const createSlideMock = {
      request: {
        query: CREATE_SLIDE,
        variables: {
          input: {
            backgroundColor: '#ffffff',
            backgroundImage: null,
            description: 'Default slide desc',
            name: 'Slide name',
            isShared: false,
            presentation: { id: '1', step: 8 },
            template: 'basicText',
            textItems: [
              {
                contentId: '1',
                value: '<h2>Basic text template</h2>',
                type: 'header',
                style: '',
              },
              {
                contentId: '2',
                value:
                  '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Ac amet arcu eleifend aliquam massa a quis interdum urna. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie.</p>',
                type: 'text',
                style: '',
              },
            ],
            links: [],
          },
        },
      },
      result() {
        createSlideSpy();

        return {
          data: { createSlide: { slide: null } },
        };
      },
    };
    renderBuilder([presentationWithBasicSlidesMock, createSlideMock]);

    await waitForContent();

    const addSlideButton = inSlidesList().getByRole('button', { name: 'Add slide' });

    userEvent.click(addSlideButton);

    const modal = screen.getByRole('dialog');

    const templates = within(modal).getAllByRole('listitem');

    expect(templates).toHaveLength(9);

    expect(templates[0]).toHaveTextContent('Title page');
    expect(templates[1]).toHaveTextContent('Basic text template');
    expect(templates[2]).toHaveTextContent('Image text block');
    expect(templates[3]).toHaveTextContent('Video block');
    expect(templates[4]).toHaveTextContent('Iframe block');
    expect(templates[5]).toHaveTextContent('2 Product choice template');
    expect(templates[6]).toHaveTextContent('3 Product choice template');

    userEvent.click(templates[1]);

    await waitFor(() => expect(createSlideSpy).toHaveBeenCalledTimes(1));
  });

  it('adds slide from shared library properly', async () => {
    const updatePresentationSpy = jest.fn();

    const updatePresentationMock = {
      request: {
        query: UPDATE_PRESENTATION,
        variables: {
          input: {
            id: '1',
            presentationSlides: [
              { slideId: '1', step: 1, subslides: [] },
              { slideId: '2', step: 2, subslides: [] },
              { slideId: '3', step: 3, subslides: [] },
              { slideId: '4', step: 4, subslides: [] },
              { slideId: '5', step: 5, subslides: [] },
              { slideId: '6', step: 6, subslides: [] },
              { slideId: '7', step: 7, subslides: [] },
              { slideId: '100', step: 8, subslides: [] },
            ],
          },
        },
      },
      result() {
        updatePresentationSpy();

        return {
          data: {
            updatePresentation: {
              presentation: null,
            },
          },
        };
      },
    };
    renderBuilder([
      presentationWithBasicSlidesMock,
      slidesMock,
      updatePresentationMock,
      userInfoMock,
    ]);

    await waitForContent();

    const addSlideButton = inSlidesList().getByRole('button', { name: 'Add slide' });

    userEvent.click(addSlideButton);

    const modalScoped = within(screen.getByRole('dialog'));

    userEvent.click(modalScoped.getByText('Slides library'));

    await modalScoped.findByText('Title page');

    const templates = modalScoped.getAllByRole('listitem');

    expect(templates).toHaveLength(3);

    userEvent.click(templates[0]);

    await waitFor(() => expect(updatePresentationSpy).toHaveBeenCalledTimes(1));
  });

  it('used slides are disabled', async () => {
    renderBuilder([presentationWithBasicSlidesMock, slidesMock]);

    await waitForContent();

    const addSlideButton = inSlidesList().getByRole('button', { name: 'Add slide' });

    userEvent.click(addSlideButton);

    const modalScoped = within(screen.getByRole('dialog'));

    userEvent.click(modalScoped.getByText('Slides library'));

    await modalScoped.findByText('Title page');

    const templates = modalScoped.getAllByRole('listitem');

    expect(templates[0].classList.contains('-disabled')).toBe(false);
    expect(templates[1].classList.contains('-disabled')).toBe(true);
    expect(templates[2].classList.contains('-disabled')).toBe(true);
  });

  it('updates presentation status properly', async () => {
    const updatePresentationSpy = jest.fn();

    const updatePresentationMock = {
      request: {
        query: UPDATE_PRESENTATION,
        variables: {
          input: {
            id: '1',
            status: PUBLISHING_STATUSES.DRAFT,
          },
        },
      },
      result() {
        updatePresentationSpy();

        return {
          data: {
            updatePresentation: {
              presentation: null,
            },
          },
        };
      },
    };
    renderBuilder([presentationWithBasicSlidesMock, updatePresentationMock, userInfoMock]);
    await waitForContent();
    userEvent.click(inSlidesPanel().getByText(/Presentation Settings/));

    userEvent.click(inSlidesPanel().getByRole('button', { name: 'Draft' }));

    await waitFor(() => expect(updatePresentationSpy).toHaveBeenCalledTimes(1));
  });

  it('updates presentation name properly', async () => {
    const updatePresentationSpy = jest.fn();

    const updatePresentationMock = {
      request: {
        query: UPDATE_PRESENTATION,
        variables: {
          input: {
            id: '1',
            name: 'name updated',
          },
        },
      },
      result() {
        updatePresentationSpy();

        return {
          data: {
            updatePresentation: {
              presentation: null,
            },
          },
        };
      },
    };
    renderBuilder([presentationWithBasicSlidesMock, updatePresentationMock]);

    await waitForContent();

    userEvent.click(inSlidesPanel().getByText(/Presentation Settings/));

    userEvent.paste(
      inSlidesPanel().getByRole('textbox', { name: 'Presentation Name' }),
      ' updated'
    );

    // Blurring input
    userEvent.click(inSlidesPanel().getByText(/Slide Settings/));

    await waitFor(() => expect(updatePresentationSpy).toHaveBeenCalledTimes(1));
  });

  it('updates presentation typography properly', async () => {
    const updatePresentationSpy = jest.fn();

    const updatePresentationMock = {
      request: {
        query: UPDATE_PRESENTATION,
        variables: {
          input: {
            id: '1',
            typography: 'montserrat',
          },
        },
      },
      result() {
        updatePresentationSpy();

        return {
          data: {
            updatePresentation: {
              presentation: null,
            },
          },
        };
      },
    };
    renderBuilder([presentationWithBasicSlidesMock, updatePresentationMock]);

    await waitForContent();

    userEvent.click(inSlidesPanel().getByText(/Presentation Settings/));

    userEvent.click(inSlidesPanel().getAllByTestId(/font-option/)[1]);

    await waitFor(() => expect(updatePresentationSpy).toHaveBeenCalledTimes(1));
  });

  it('updates slide name properly', async () => {
    const updateSlideSpy = jest.fn();

    const updateSlideMock = {
      request: {
        query: UPDATE_SLIDE,
        variables: {
          input: {
            id: '1',
            name: 'Slide name updated',
          },
        },
      },
      result() {
        updateSlideSpy();

        return {
          data: {
            updateSlide: {
              slide: null,
            },
          },
        };
      },
    };
    renderBuilder([presentationWithBasicSlidesMock, updateSlideMock]);

    await waitForContent();

    userEvent.click(inSlidesPanel().getByText(/Slide Settings/));

    userEvent.paste(inSlidesPanel().getByRole('textbox', { name: 'Slide Name' }), ' updated');

    // Blurring input
    userEvent.click(inSlidesPanel().getByText(/Slide Settings/));

    await waitFor(() => expect(updateSlideSpy).toHaveBeenCalledTimes(1));
  });

  it('pick one of default bg images properly', async () => {
    const updateSlideSpy = jest.fn();

    const updateSlideMock = {
      request: {
        query: UPDATE_SLIDE,
        variables: {
          input: {
            id: '1',
            backgroundColor: '#F0F2F7',
            backgroundImage:
              'https://app.definedcareers.com/static/media/assessment_step_1_bg.0a8b08bf.svg',
          },
        },
      },
      result() {
        updateSlideSpy();

        return {
          data: {
            updateSlide: {
              slide: null,
            },
          },
        };
      },
    };
    renderBuilder([presentationWithBasicSlidesMock, updateSlideMock]);

    await waitForContent();

    userEvent.click(inSlidesPanel().getByText(/Slide Settings/));

    userEvent.click(inSlidesPanel().getByTestId(/image-picker-trigger/));

    expect(inSlidesPanel().getByTestId(/^image-picker$/i)).toBeInTheDocument();

    const pickerItems = inSlidesPanel().getAllByTestId(/image-picker-item/i);

    expect(pickerItems).toHaveLength(2);

    userEvent.click(pickerItems[0]);

    await waitFor(() => expect(updateSlideSpy).toHaveBeenCalledTimes(1));
  });
});
