import { act } from 'react-dom/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { NewLesson } from '@dc/screens/AdminApp/Lesson/New';
import assignmentsQuery from '@dc/graphql/user/queries/assignments';
import assignmentLessonsQuery from '@dc/graphql/user/queries/assignmentLessons';
import attachmentQuery from '@dc/graphql/user/queries/attachment';
import attachmentLessonsQuery from '@dc/graphql/user/queries/attachmentLessons';
import attachmentsQuery from '@dc/graphql/user/queries/attachments';
import researchLinksQuery from '@dc/graphql/user/queries/researchLinks';
import researchLinkLessonsQuery from '@dc/graphql/user/queries/researchLinkLessons';
import textsQuery from '@dc/graphql/user/queries/texts';
import textLessonsQuery from '@dc/graphql/user/queries/textLessons';
import videosQuery from '@dc/graphql/user/queries/videos';
import videoLessonsQuery from '@dc/graphql/user/queries/videoLessons';
import vocabulariesQuery from '@dc/graphql/user/queries/vocabularies';
import vocabularyLessonsQuery from '@dc/graphql/user/queries/vocabularyLessons';
import { FormProvider } from '@dc/hooks/useForm';
import { PAGING } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { renderWithRouter } from '@dc/utils/test';
import cacheConfig from '@dc/graphql/cacheConfig';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const assignmentsQuerySpy = jest.fn();
const assignmentLessonsQuerySpy = jest.fn();
const researchLinksQuerySpy = jest.fn();
const researchLinkLessonsQuerySpy = jest.fn();
const attachmentQuerySpy = jest.fn();
const attachmentLessonsQuerySpy = jest.fn();
const attachmentsQuerySpy = jest.fn();
const textsQuerySpy = jest.fn();
const textLessonsQuerySpy = jest.fn();
const videosQuerySpy = jest.fn();
const videoLessonsQuerySpy = jest.fn();
const vocabulariesQuerySpy = jest.fn();
const vocabularyLessonsQuerySpy = jest.fn();

const vocabulariesQueryMock = {
  request: {
    query: vocabulariesQuery,
    variables: {
      scope: ARCHIVABLE_STATUSES.ACTIVE.value,
      page: PAGING.PAGE_DEFAULT,
      perPage: PAGING.PER_PAGE_DEFAULT.value,
      filter: {},
    },
  },
  result: () => {
    vocabulariesQuerySpy();

    return {
      data: {
        vocabularies: {
          nodesCount: 4,
          pagesCount: 1,
          nodes: [
            {
              id: '1',
              definition: 'first def',
              term: 'first term',
              name: 'first term',
              __typename: 'Vocabulary',
              archivedAt: '',
            },
            {
              id: '2',
              definition: 'second def',
              term: 'second term',
              name: 'second term',
              __typename: 'Vocabulary',
              archivedAt: '',
            },
            {
              id: '3',
              definition: 'third def',
              term: 'third term',
              name: 'third term',
              __typename: 'Vocabulary',
              archivedAt: '',
            },
            {
              id: '4',
              definition: 'fourth def',
              term: 'fourth term',
              name: 'fourth term',
              __typename: 'Vocabulary',
              archivedAt: '',
            },
          ],
        },
      },
    };
  },
};
const assignmentsQueryMock = {
  request: {
    query: assignmentsQuery,
    variables: {
      scope: ARCHIVABLE_STATUSES.ACTIVE.value,
      page: PAGING.PAGE_DEFAULT,
      perPage: PAGING.PER_PAGE_DEFAULT.value,
      filter: {},
    },
  },
  result: () => {
    assignmentsQuerySpy();

    return {
      data: {
        assignments: {
          nodesCount: 4,
          pagesCount: 1,
          nodes: [
            {
              archivedAt: '',
              id: '1',
              description: 'first desc',
              assetName: 'first assignment',
              name: 'first assignment',
              displayName: 'first assignment display name',
              rubrics: [
                {
                  id: '1',
                  name: 'first rub',
                  description: 'first rub desc',
                },
              ],
              __typename: 'Assignment',
            },
            {
              archivedAt: '',
              id: '2',
              description: 'second desc',
              assetName: 'second assignment',
              name: 'second assignment',
              displayName: 'second assignment display name',
              rubrics: [
                {
                  id: '1',
                  name: 'first rub',
                  description: 'first rub desc',
                },
              ],
              __typename: 'Assignment',
            },
            {
              archivedAt: '',
              id: '3',
              description: 'third desc',
              assetName: 'third assignment',
              name: 'third assignment',
              displayName: 'third assignment display name',
              rubrics: [
                {
                  id: '1',
                  name: 'first rub',
                  description: 'first rub desc',
                },
              ],
              __typename: 'Assignment',
            },
            {
              archivedAt: '',
              id: '4',
              description: 'fourth desc',
              assetName: 'fourth assignment',
              name: 'fourth assignment',
              displayName: 'fourth assignment display name',
              rubrics: [
                {
                  id: '1',
                  name: 'first rub',
                  description: 'first rub desc',
                },
              ],
              __typename: 'Assignment',
            },
          ],
        },
      },
    };
  },
};
const attachmentsQueryMock = {
  request: {
    query: attachmentsQuery,
    variables: {
      scope: ARCHIVABLE_STATUSES.ACTIVE.value,
      page: PAGING.PAGE_DEFAULT,
      perPage: PAGING.PER_PAGE_DEFAULT.value,
      filter: {},
    },
  },
  result: () => {
    attachmentsQuerySpy();

    return {
      data: {
        attachments: {
          nodesCount: 4,
          pagesCount: 1,
          nodes: [
            {
              archivedAt: '',
              id: '1',
              description: 'first desc',
              name: 'first attachment',
              displayName: 'first attachment display name',
              files: [
                { id: '1', filename: 'first file', url: 'someurl' },
                { id: '2', filename: 'second file', url: 'secondurl' },
              ],
              __typename: 'Attachment',
            },
            {
              archivedAt: '',
              id: '2',
              description: 'second desc',
              name: 'second attachment',
              displayName: 'second attachment display name',
              files: [],
              __typename: 'Attachment',
            },
            {
              archivedAt: '',
              id: '3',
              description: 'third desc',
              name: 'third attachment',
              displayName: 'third attachment display name',
              files: [],
              __typename: 'Attachment',
            },
            {
              archivedAt: '',
              id: '4',
              description: 'fourth desc',
              name: 'fourth attachment',
              displayName: 'fourth attachment display name',
              files: [],
              __typename: 'Attachment',
            },
          ],
        },
      },
    };
  },
};
const textsQueryMock = {
  request: {
    query: textsQuery,
    variables: {
      scope: ARCHIVABLE_STATUSES.ACTIVE.value,
      page: PAGING.PAGE_DEFAULT,
      perPage: PAGING.PER_PAGE_DEFAULT.value,
      filter: {},
    },
  },
  result: () => {
    textsQuerySpy();

    return {
      data: {
        texts: {
          nodesCount: 4,
          pagesCount: 1,
          nodes: [
            {
              archivedAt: '',
              id: '1',
              name: 'first text',
              displayName: 'first text display name',
              content: 'first text content',
              __typename: 'Text',
            },
            {
              archivedAt: '',
              id: '2',
              name: 'second text',
              displayName: 'second text display name',
              content: 'second text content',
              __typename: 'Text',
            },
            {
              archivedAt: '',
              id: '3',
              name: 'third text',
              displayName: 'third text display name',
              content: 'third text content',
              __typename: 'Text',
            },
            {
              archivedAt: '',
              id: '4',
              name: 'fourth text',
              displayName: 'fourth text display name',
              content: 'fourth text content',
              __typename: 'Text',
            },
          ],
        },
      },
    };
  },
};
const researchLinksQueryMock = {
  request: {
    query: researchLinksQuery,
    variables: {
      scope: ARCHIVABLE_STATUSES.ACTIVE.value,
      page: PAGING.PAGE_DEFAULT,
      perPage: PAGING.PER_PAGE_DEFAULT.value,
      filter: {},
    },
  },
  result: () => {
    researchLinksQuerySpy();

    return {
      data: {
        researchLinks: {
          nodesCount: 4,
          pagesCount: 1,
          nodes: [
            {
              archivedAt: '',
              id: '1',
              author: 'first author',
              name: 'first research link',
              displayName: 'first research link display name',
              resourceLink: 'first link',
              sourceName: 'first source name',
              __typename: 'researchLink',
            },
            {
              archivedAt: '',
              id: '2',
              author: 'second author',
              name: 'second research link',
              displayName: 'second research link display name',
              resourceLink: 'second link',
              sourceName: 'second source name',
              __typename: 'researchLink',
            },
            {
              archivedAt: '',
              id: '3',
              author: 'third author',
              name: 'third research link',
              displayName: 'third research link display name',
              resourceLink: 'third link',
              sourceName: 'third source name',
              __typename: 'researchLink',
            },
            {
              archivedAt: '',
              id: '4',
              author: 'fourth author',
              name: 'fourth research link',
              displayName: 'fourth research link display name',
              resourceLink: 'fourth link',
              sourceName: 'fourth source name',
              __typename: 'researchLink',
            },
          ],
        },
      },
    };
  },
};
const videosQueryMock = {
  request: {
    query: videosQuery,
    variables: {
      scope: ARCHIVABLE_STATUSES.ACTIVE.value,
      page: PAGING.PAGE_DEFAULT,
      perPage: PAGING.PER_PAGE_DEFAULT.value,
      filter: {},
    },
  },
  result: () => {
    videosQuerySpy();

    return {
      data: {
        videos: {
          nodesCount: 4,
          pagesCount: 1,
          nodes: [
            {
              archivedAt: '',
              id: '1',
              description: 'first video description',
              displayName: 'first video display name',
              name: 'First video',
              filename: 'first',
              url: 'first/url',
              __typename: 'Video',
            },
            {
              archivedAt: '',
              id: '2',
              description: 'second video description',
              displayName: 'second video display name',
              name: 'Second video',
              filename: 'second',
              url: 'second/url',
              __typename: 'Video',
            },
            {
              archivedAt: '',
              id: '3',
              description: 'third video description',
              displayName: 'third video display name',
              name: 'Third video',
              filename: 'third',
              url: 'third/url',
              __typename: 'Video',
            },
            {
              archivedAt: '',
              id: '4',
              description: 'fourth video description',
              displayName: 'fourth video display name',
              name: 'Fourth video',
              filename: 'fourth',
              url: 'fourth/url',
              __typename: 'Video',
            },
          ],
        },
      },
    };
  },
};

const assignmentLessonsQueryMock = {
  request: {
    query: assignmentLessonsQuery,
    variables: { id: '1' },
  },
  result: () => {
    assignmentLessonsQuerySpy();

    return { data: { assignment: { id: '1', lessons: [] } } };
  },
};
const attachmentLessonsQueryMock = {
  request: {
    query: attachmentLessonsQuery,
    variables: { id: '1' },
  },
  result: () => {
    attachmentLessonsQuerySpy();

    return { data: { attachment: { id: '1', lessons: [] } } };
  },
};
const researchLinkLessonsQueryMock = {
  request: {
    query: researchLinkLessonsQuery,
    variables: { id: '1' },
  },
  result: () => {
    researchLinkLessonsQuerySpy();

    return { data: { researchLink: { id: '1', lessons: [] } } };
  },
};
const textLessonsQueryMock = {
  request: {
    query: textLessonsQuery,
    variables: { id: '1' },
  },
  result: () => {
    textLessonsQuerySpy();

    return { data: { text: { id: '1', lessons: [] } } };
  },
};
const videoLessonsQueryMock = {
  request: {
    query: videoLessonsQuery,
    variables: { id: '1' },
  },
  result: () => {
    videoLessonsQuerySpy();

    return { data: { video: { id: '1', lessons: [] } } };
  },
};
const vocabularyLessonsQueryMock = {
  request: {
    query: vocabularyLessonsQuery,
    variables: { id: '1' },
  },
  result: () => {
    vocabularyLessonsQuerySpy();

    return { data: { vocabulary: { id: '1', lessons: [] } } };
  },
};

const mocks = [
  vocabulariesQueryMock,
  vocabulariesQueryMock,
  assignmentsQueryMock,
  assignmentsQueryMock,
  attachmentsQueryMock,
  attachmentsQueryMock,
  {
    request: {
      query: attachmentQuery,
      variables: {
        id: '1',
      },
    },
    result: () => {
      attachmentQuerySpy();

      return {
        data: {
          attachment: {
            archivedAt: '',
            id: '1',
            description: 'first desc',
            name: 'first attachment',
            displayName: 'first attachment display name',
            __typename: 'Attachment',
            files: [
              { id: '1', filename: 'first file', url: 'someurl' },
              { id: '2', filename: 'second file', url: 'secondurl' },
            ],
          },
        },
      };
    },
  },
  textsQueryMock,
  textsQueryMock,
  researchLinksQueryMock,
  researchLinksQueryMock,
  videosQueryMock,
  videosQueryMock,
  videosQueryMock,
  {
    request: {
      query: videosQuery,
      variables: {
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
      },
    },
    result: () => {
      videosQuerySpy();

      return {
        data: {
          videos: [
            {
              archivedAt: '',
              id: '1',
              description: 'first description',
              displayName: 'first dname',
              name: 'First name',
              filename: 'first',
              url: 'first/url',
              __typename: 'video',
            },
            {
              archivedAt: '',
              id: '2',
              description: 'second description',
              displayName: 'second dname',
              name: 'Second name',
              filename: 'second',
              url: 'second/url',
              __typename: 'video',
            },
            {
              archivedAt: '',
              id: '3',
              description: 'third description',
              displayName: 'third dname',
              name: 'Third name',
              filename: 'third',
              url: 'third/url',
              __typename: 'video',
            },
            {
              archivedAt: '',
              id: '4',
              description: 'fourth description',
              displayName: 'fourth dname',
              name: 'Fourth name',
              filename: 'fourth',
              url: 'fourth/url',
              __typename: 'video',
            },
          ],
        },
      };
    },
  },
  assignmentLessonsQueryMock,
  assignmentLessonsQueryMock,
  assignmentLessonsQueryMock,
  attachmentLessonsQueryMock,
  attachmentLessonsQueryMock,
  attachmentLessonsQueryMock,
  researchLinkLessonsQueryMock,
  researchLinkLessonsQueryMock,
  researchLinkLessonsQueryMock,
  textLessonsQueryMock,
  textLessonsQueryMock,
  textLessonsQueryMock,
  videoLessonsQueryMock,
  videoLessonsQueryMock,
  videoLessonsQueryMock,
  vocabularyLessonsQueryMock,
  vocabularyLessonsQueryMock,
  vocabularyLessonsQueryMock,
];

const renderLessonsNew = () => {
  const utils = renderWithRouter(
    <MockedProvider cache={cacheConfig} mocks={mocks}>
      <FormProvider>
        <NavigationContextProvider>
          <NewLesson />
        </NavigationContextProvider>
      </FormProvider>
    </MockedProvider>
  );

  return { ...utils };
};

const sectionOpener = (section) => async () => {
  fireEvent.mouseDown(screen.getByTestId(/dropdown-container/));

  const sectionButton = await screen.findByTestId(`${section}-option`);
  fireEvent.click(sectionButton);

  await screen.findByTestId(`${section}-section`);
};

describe('AdminLessonsNew', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('shows description section only on project type selected', async () => {
    renderLessonsNew();

    expect(screen.queryByTestId(/description-title/)).not.toBeInTheDocument();

    const container = screen.getByTestId(/lessons-type-input/i);
    //container children[0] ==> label
    //container.children[1] ==> select

    fireEvent.keyDown(container.children[1], { keyCode: 40 });
    fireEvent.click(document.querySelectorAll('.select__option')[2]);

    expect(await screen.findByTestId(/description-title/)).toBeInTheDocument();

    fireEvent.keyDown(container.children[1], { keyCode: 40 });
    fireEvent.click(document.querySelectorAll('.select__option')[1]);

    await waitFor(() => expect(screen.queryByTestId(/description-title/)).not.toBeInTheDocument());
  });

  describe('lesson items', () => {
    it('shows lesson items on the list correctly on add/remove lesson item', async () => {
      renderLessonsNew();

      await sectionOpener('vocabularies')();
      const firstVocabularyAdd = screen.getByRole('button', { name: 'Add first term' });
      fireEvent.click(firstVocabularyAdd);
      fireEvent.click(screen.getByTestId(/section-close/));

      const draggableItems = screen.getAllByTestId(/draggable-item/);
      expect(draggableItems.length).toBe(1);

      await sectionOpener('assignments')();

      const firstAssignmentAdd = screen.getByRole('button', {
        name: 'Add first assignment',
      });
      fireEvent.click(firstAssignmentAdd);
      fireEvent.click(screen.getByTestId(/section-close/));

      const draggableItems2 = screen.getAllByTestId(/draggable-item/);
      expect(draggableItems2.length).toBe(2);

      await sectionOpener('texts')();

      const firstTextAdd = screen.getByRole('button', { name: 'Add first text' });
      fireEvent.click(firstTextAdd);
      fireEvent.click(screen.getByTestId(/section-close/));

      expect(screen.queryAllByTestId(/draggable-item/).length).toBe(3);

      await sectionOpener('research-links')();
      const firstResearchLinkAdd = screen.getByRole('button', {
        name: 'Add first research link',
      });
      fireEvent.click(firstResearchLinkAdd);
      fireEvent.click(screen.getByTestId(/section-close/));

      expect(screen.queryAllByTestId(/draggable-item/).length).toBe(4);

      const firstVocabularyRemove = screen.getByRole('button', {
        name: 'Remove first term',
      });
      fireEvent.click(firstVocabularyRemove);

      expect(screen.queryAllByTestId(/draggable-item/).length).toBe(3);

      const firstAssignmentRemove = screen.getByRole('button', {
        name: 'Remove first assignment',
      });
      fireEvent.click(firstAssignmentRemove);

      expect(screen.queryAllByTestId(/draggable-item/).length).toBe(2);

      const firstTextRemove = screen.getByRole('button', { name: 'Remove first text' });
      fireEvent.click(firstTextRemove);

      expect(screen.queryAllByTestId(/draggable-item/).length).toBe(1);

      const firstResearchLinkRemove = screen.getByRole('button', {
        name: 'Remove first research link',
      });
      fireEvent.click(firstResearchLinkRemove);

      expect(screen.queryAllByTestId(/draggable-item/).length).toBe(0);
    });

    describe('vocabularies', () => {
      const openVocabularies = sectionOpener('vocabularies');

      it('allows opening and closing vocabularies section', async () => {
        renderLessonsNew();

        await act(() => openVocabularies());

        await waitFor(() => {
          expect(vocabulariesQuerySpy).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByTestId(/vocabularies-section/)).toBeInTheDocument();

        const vocabularies = screen.getAllByTestId(/available-item/);
        expect(vocabularies.length).toBe(4);

        expect(vocabularies[0]).toHaveTextContent('first term');
        expect(vocabularies[1]).toHaveTextContent('second term');
        expect(vocabularies[2]).toHaveTextContent('third term');
        expect(vocabularies[3]).toHaveTextContent('fourth term');

        fireEvent.click(screen.getByTestId(/section-close/));

        expect(screen.queryByTestId(/vocabularies-section/)).not.toBeInTheDocument();
      });

      it('allows adding and removing vocabularies from the list', async () => {
        renderLessonsNew();

        await act(() => openVocabularies());

        const firstVocabularyAdd = screen.getByRole('button', { name: 'Add first term' });
        fireEvent.click(firstVocabularyAdd);

        const vocabularies = screen.queryAllByTestId(/available-item/);

        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(1);
        expect(vocabularies.length).toBe(3);
        expect(vocabularies[0]).toHaveTextContent('second term');

        const firstVocabularyRemove = screen.getByRole('button', {
          name: 'Remove first term',
        });
        fireEvent.click(firstVocabularyRemove);

        const restoredVocabularies = screen.queryAllByTestId(/available-item/);
        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(0);
        expect(restoredVocabularies.length).toBe(4);
        expect(restoredVocabularies[0]).toHaveTextContent('first term');
      });

      it('allows opening and closing vocabularies form on new vocabulary click', async () => {
        renderLessonsNew();

        await act(() => openVocabularies());

        fireEvent.click(screen.getByTestId(/lesson-item-new/));
        expect(screen.getByTestId(/lesson-item-form$/i)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId(/lesson-item-form-cancel/));
        expect(screen.queryByTestId(/lesson-item-form/)).not.toBeInTheDocument();
      });

      it('opens vocabulary edit form on edit button click', async () => {
        const openWindowSpy = jest.spyOn(window, 'open');
        renderLessonsNew();

        await act(() => openVocabularies());

        const editVocabulary = screen.getByRole('button', {
          name: 'Edit first term',
        });
        fireEvent.click(editVocabulary);

        await waitFor(() => {
          expect(openWindowSpy).toHaveBeenCalledWith(
            '/admin/lesson-items/vocabularies/1/edit?standaloneEdit=true',
            '_blank',
            'noreferrer'
          );
        });
      });

      it('shows more info on vocabulary list click', async () => {
        renderLessonsNew();

        await act(() => openVocabularies());

        const firstVocabularyShow = screen.getByRole('button', { name: 'Show first term' });
        fireEvent.click(firstVocabularyShow);

        const vocabularyDetailModal = screen.getByRole('dialog', { name: 'Modal' });
        expect(vocabularyDetailModal).toBeInTheDocument();
        expect(vocabularyDetailModal).toHaveTextContent('first term');
        expect(vocabularyDetailModal).toHaveTextContent('first def');
      });

      it('shows more info on vocabulary lesson item list click', async () => {
        renderLessonsNew();

        await act(() => openVocabularies());

        const firstVocabularyAdd = screen.getByRole('button', { name: 'Add first term' });
        fireEvent.click(firstVocabularyAdd);
        const firstVocabularyShow = screen.getByRole('button', { name: 'Show first term' });
        fireEvent.click(firstVocabularyShow);

        const detailsModal = screen.getByRole('dialog', { name: 'Modal' });
        expect(detailsModal).toBeInTheDocument();
        expect(detailsModal).toHaveTextContent('first term');
        expect(detailsModal).toHaveTextContent('first def');
      });
    });

    describe('assignments', () => {
      const openAssignments = sectionOpener('assignments');

      it('opens assignments section on assignments dropdown option click', async () => {
        renderLessonsNew();

        await waitFor(() => {
          expect(assignmentsQuerySpy).not.toHaveBeenCalled();
        });

        await act(() => openAssignments());

        expect(screen.getByTestId(/assignments-section/)).toBeInTheDocument();

        await waitFor(() => {
          expect(assignmentsQuerySpy).toHaveBeenCalled();
        });

        const assignments = screen.queryAllByTestId(/available-item/);

        expect(assignments.length).toBe(4);

        expect(assignments[0]).toHaveTextContent('first assignment');
        expect(assignments[1]).toHaveTextContent('second assignment');
        expect(assignments[2]).toHaveTextContent('third assignment');
        expect(assignments[3]).toHaveTextContent('fourth assignment');

        userEvent.click(screen.getByTestId(/section-close/));

        expect(screen.queryByTestId(/assignments-section/)).not.toBeInTheDocument();
      });

      it('allows adding and removing assignment to lesson', async () => {
        renderLessonsNew();

        await act(() => openAssignments());

        const addAssignmentButton = screen.getByRole('button', {
          name: 'Add first assignment',
        });
        userEvent.click(addAssignmentButton);

        const assignments = screen.queryAllByTestId(/available-item/);

        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(1);
        expect(assignments.length).toBe(3);
        expect(assignments[0]).toHaveTextContent('second assignment');

        const removeAssignmentButton = screen.getByRole('button', {
          name: 'Remove first assignment',
        });
        userEvent.click(removeAssignmentButton);

        const assignmentsAfterChange = screen.queryAllByTestId(/available-item/);

        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(0);
        expect(assignmentsAfterChange.length).toBe(4);
        expect(assignmentsAfterChange[0]).toHaveTextContent('first assignment');
      });

      it('allows opening and closing new assignments form', async () => {
        renderLessonsNew();

        await act(() => openAssignments());

        fireEvent.click(screen.getByTestId(/lesson-item-new/));

        await waitFor(() => {
          expect(screen.getByTestId(/assignment-form$/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId(/assignment-form-cancel/));

        await waitFor(() => {
          expect(screen.queryByTestId(/assignment-form/)).not.toBeInTheDocument();
        });
      });

      it('opens assignments form on edit assignment click', async () => {
        const openWindowSpy = jest.spyOn(window, 'open');
        renderLessonsNew();

        await act(() => openAssignments());

        const editAssignment = screen.getByRole('button', {
          name: 'Edit first assignment',
        });
        fireEvent.click(editAssignment);

        await waitFor(() => {
          expect(openWindowSpy).toHaveBeenCalledWith(
            '/admin/lesson-items/assignment/1/edit?standaloneEdit=true',
            '_blank',
            'noreferrer'
          );
        });
      });

      it('shows more info on assignment list click', async () => {
        renderLessonsNew();

        await act(() => openAssignments());

        const showMoreInfoButton = screen.getByRole('button', {
          name: 'Show first assignment',
        });
        fireEvent.click(showMoreInfoButton);

        const assignmentDetailModal = screen.getByRole('dialog', { name: 'Modal' });
        expect(assignmentDetailModal).toBeInTheDocument();
        expect(assignmentDetailModal).toHaveTextContent('first assignment');
        expect(assignmentDetailModal).toHaveTextContent('first desc');
        expect(assignmentDetailModal).toHaveTextContent('first assignment display name');
      });

      it('shows more info on assignment lesson item list click', async () => {
        renderLessonsNew();

        await act(() => openAssignments());

        const addAssignmentButton = screen.getByRole('button', {
          name: 'Add first assignment',
        });
        fireEvent.click(addAssignmentButton);

        const showMoreInfoButton = screen.getByRole('button', {
          name: 'Show first assignment',
        });
        fireEvent.click(showMoreInfoButton);

        const assignmentDetailModal = screen.getByRole('dialog', { name: 'Modal' });
        expect(assignmentDetailModal).toBeInTheDocument();
        expect(assignmentDetailModal).toHaveTextContent('first assignment');
        expect(assignmentDetailModal).toHaveTextContent('first desc');
        expect(assignmentDetailModal).toHaveTextContent('first assignment display name');
      });
    });

    describe('texts', () => {
      const openTexts = sectionOpener('texts');

      it('allows to open and close texts section, renders available texts', async () => {
        renderLessonsNew();

        await act(() => openTexts());

        expect(screen.getByTestId(/texts-section/)).toBeInTheDocument();

        await waitFor(() => {
          expect(textsQuerySpy).toHaveBeenCalled();
        });

        const texts = screen.queryAllByTestId(/available-item/);

        expect(texts.length).toBe(4);

        expect(texts[0]).toHaveTextContent('first text');
        expect(texts[1]).toHaveTextContent('second text');
        expect(texts[2]).toHaveTextContent('third text');
        expect(texts[3]).toHaveTextContent('fourth text');

        fireEvent.click(screen.getByTestId(/section-close/));

        expect(screen.queryByTestId(/texts-section/)).not.toBeInTheDocument();
      });

      it('add text to lesson items and filter added from the texts list', async () => {
        renderLessonsNew();

        await act(() => openTexts());

        const addTextButton = screen.getByRole('button', { name: 'Add first text' });
        fireEvent.click(addTextButton);

        const texts = screen.queryAllByTestId(/available-item/);

        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(1);
        expect(texts.length).toBe(3);
        expect(texts[0]).toHaveTextContent('second text');
      });

      it('removes text from lesson list items and unfilter in texts list', async () => {
        renderLessonsNew();

        await act(() => openTexts());

        const addTextButton = screen.getByRole('button', { name: 'Add first text' });
        fireEvent.click(addTextButton);

        const removeTextButton = screen.getByRole('button', { name: 'Remove first text' });
        fireEvent.click(removeTextButton);

        const texts = screen.queryAllByTestId(/available-item/);

        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(0);
        expect(texts.length).toBe(4);
        expect(texts[0]).toHaveTextContent('first text');
      });

      it('allows opening and closing the texts form', async () => {
        renderLessonsNew();

        await act(() => openTexts());

        fireEvent.click(screen.getByTestId(/lesson-item-new/));

        expect(screen.getByTestId(/text-form$/i)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId(/text-form-cancel/));

        expect(screen.queryByTestId(/text-form/)).not.toBeInTheDocument();
      });

      it('should navigate to edit page on edit button click', async () => {
        const openWindowSpy = jest.spyOn(window, 'open');
        renderLessonsNew();

        await act(() => openTexts());

        const editText = screen.getByRole('button', {
          name: 'Edit first text',
        });
        fireEvent.click(editText);

        await waitFor(() => {
          expect(openWindowSpy).toHaveBeenCalledWith(
            '/admin/lesson-items/texts/1/edit?standaloneEdit=true',
            '_blank',
            'noreferrer'
          );
        });
      });

      it('shows more info on text list click', async () => {
        renderLessonsNew();

        await act(() => openTexts());

        const showMoreInfoButton = screen.getByRole('button', { name: 'Show first text' });
        fireEvent.click(showMoreInfoButton);

        const textModal = screen.getByRole('dialog', { name: 'Modal' });
        expect(textModal).toHaveTextContent('first text');
        expect(textModal).toHaveTextContent('first text content');
        expect(textModal).toHaveTextContent('first text display name');
      });

      it('shows more info on text lesson item list click', async () => {
        renderLessonsNew();

        await act(() => openTexts());

        const addTextButton = screen.getByRole('button', { name: 'Add first text' });
        fireEvent.click(addTextButton);

        const showMoreInfoButton = screen.getByRole('button', { name: 'Show first text' });
        fireEvent.click(showMoreInfoButton);

        const textModal = screen.getByRole('dialog', { name: 'Modal' });
        expect(textModal).toBeInTheDocument();
        expect(textModal).toHaveTextContent('first text');
        expect(textModal).toHaveTextContent('first text content');
        expect(textModal).toHaveTextContent('first text display name');
      });
    });

    describe('attachments', () => {
      const openAttachments = sectionOpener('attachments');
      it('opens attachments section on attachments dropdown option click', async () => {
        renderLessonsNew();

        await act(() => openAttachments());

        expect(screen.getByTestId(/attachments-section/)).toBeInTheDocument();

        await waitFor(() => {
          expect(attachmentsQuerySpy).toHaveBeenCalled();
        });

        const attachments = screen.queryAllByTestId(/available-item/);

        expect(attachments.length).toBe(4);
        expect(attachments[0]).toHaveTextContent('first attachment');
        expect(attachments[1]).toHaveTextContent('second attachment');
        expect(attachments[2]).toHaveTextContent('third attachment');
        expect(attachments[3]).toHaveTextContent('fourth attachment');

        fireEvent.click(screen.getByTestId(/section-close/));

        expect(screen.queryByTestId(/attachments-section/)).not.toBeInTheDocument();
      });

      it('add attachment to lesson items and filter added from the attachments list', async () => {
        renderLessonsNew();

        await act(() => openAttachments());

        const addAttachmentButton = screen.getByRole('button', {
          name: 'Add first attachment',
        });
        fireEvent.click(addAttachmentButton);

        const attachments = screen.queryAllByTestId(/available-item/);

        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(1);
        expect(attachments.length).toBe(3);
        expect(attachments[0]).toHaveTextContent('second attachment');
      });

      it('removes attachment from lesson list items and unfilter in attachments list', async () => {
        renderLessonsNew();

        await act(() => openAttachments());

        const addAttachmentButton = screen.getByRole('button', {
          name: 'Add first attachment',
        });
        fireEvent.click(addAttachmentButton);

        const removeAttachmentButton = screen.getByRole('button', {
          name: 'Remove first attachment',
        });
        fireEvent.click(removeAttachmentButton);

        const attachments = screen.queryAllByTestId(/available-item/);

        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(0);
        expect(attachments.length).toBe(4);
        expect(attachments[0]).toHaveTextContent('first attachment');
      });

      it('allow to open and close attachment form on button click', async () => {
        renderLessonsNew();

        await act(() => openAttachments());

        fireEvent.click(screen.getByTestId(/lesson-item-new/));

        expect(screen.getByTestId(/attachment-form$/i)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId(/attachment-form-cancel/));

        expect(screen.queryByTestId(/attachment-form/)).not.toBeInTheDocument();
      });

      it('opens attachments form on edit attachment click', async () => {
        const openWindowSpy = jest.spyOn(window, 'open');
        renderLessonsNew();

        await act(() => openAttachments());

        const editButton = screen.getByRole('button', {
          name: 'Edit first attachment',
        });
        fireEvent.click(editButton);

        await waitFor(() => {
          expect(openWindowSpy).toHaveBeenCalledWith(
            '/admin/lesson-items/attachments/1/edit?standaloneEdit=true',
            '_blank',
            'noreferrer'
          );
        });
      });

      it('shows more info on attachment list click', async () => {
        renderLessonsNew();

        await act(() => openAttachments());

        const showMoreInfoButton = screen.getByRole('button', {
          name: 'Show first attachment',
        });
        fireEvent.click(showMoreInfoButton);

        await waitFor(() => {
          expect(attachmentQuerySpy).toHaveBeenCalled();
        });

        const attachmentModal = screen.getByRole('dialog', { name: 'Modal' });

        expect(attachmentModal).toBeInTheDocument();
        expect(attachmentModal).toHaveTextContent('first attachment');
        expect(attachmentModal).toHaveTextContent('first desc');
        expect(attachmentModal).toHaveTextContent('first attachment display name');
        expect(screen.getAllByTestId(/attachment-file/)).toHaveLength(2);
      });

      it('shows more info on attachment lesson item list click', async () => {
        renderLessonsNew();

        await act(() => openAttachments());

        const addAttachmentButton = screen.getByRole('button', {
          name: 'Add first attachment',
        });
        fireEvent.click(addAttachmentButton);

        const showMoreInfoButton = screen.getByRole('button', {
          name: 'Show first attachment',
        });
        fireEvent.click(showMoreInfoButton);

        const attachmentModal = screen.getByRole('dialog', { name: 'Modal' });

        expect(attachmentModal).toBeInTheDocument();
        expect(attachmentModal).toHaveTextContent('first attachment');
        expect(attachmentModal).toHaveTextContent('first desc');
        expect(attachmentModal).toHaveTextContent('first attachment display name');
        expect(screen.getAllByTestId(/attachment-file/)).toHaveLength(2);
      });
    });

    describe('researchLinks', () => {
      const openResearchLinks = sectionOpener('research-links');

      it('opens research links section on research links dropdown option click', async () => {
        const { getByTestId } = renderLessonsNew();

        await act(() => openResearchLinks());

        expect(getByTestId(/research-links-section/)).toBeInTheDocument();

        await waitFor(() => {
          expect(researchLinksQuerySpy).toHaveBeenCalled();
        });

        const researchLinks = screen.queryAllByTestId(/available-item/);

        expect(researchLinks.length).toBe(4);

        expect(researchLinks[0]).toHaveTextContent('first research link');
        expect(researchLinks[1]).toHaveTextContent('second research link');
        expect(researchLinks[2]).toHaveTextContent('third research link');
        expect(researchLinks[3]).toHaveTextContent('fourth research link');

        fireEvent.click(getByTestId(/section-close/));

        expect(screen.queryByTestId(/research-links-section/)).not.toBeInTheDocument();
      });

      it('add research link to lesson items and filter added from the research links list', async () => {
        renderLessonsNew();

        await act(() => openResearchLinks());

        const addResearchLinkButtons = screen.getByRole('button', {
          name: 'Add first research link',
        });
        fireEvent.click(addResearchLinkButtons);

        const researchLinks = screen.queryAllByTestId(/available-item/);

        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(1);
        expect(researchLinks.length).toBe(3);
        expect(researchLinks[0]).toHaveTextContent('second research link');
      });

      it('removes research link from lesson list items and unfilter in research links list', async () => {
        renderLessonsNew();

        await act(() => openResearchLinks());

        expect(screen.getByText('Research Links')).toBeInTheDocument();

        const addResearchLinkButtons = screen.getByRole('button', {
          name: 'Add first research link',
        });
        fireEvent.click(addResearchLinkButtons);

        const removeResearchLinkButtons = screen.getByRole('button', {
          name: 'Remove first research link',
        });
        userEvent.click(removeResearchLinkButtons);

        const lessonItems = screen.queryAllByTestId(/draggable-item/);
        const researchLinks = screen.getAllByTestId(/available-item/);

        expect(lessonItems.length).toBe(0);
        expect(researchLinks.length).toBe(4);
        expect(researchLinks[0]).toHaveTextContent('first research link');
      });

      it('opens research links form on new research link click', async () => {
        const { getByTestId } = renderLessonsNew();

        await act(() => openResearchLinks());

        fireEvent.click(getByTestId(/lesson-item-new/));

        expect(getByTestId(/research-link-form$/i)).toBeInTheDocument();

        userEvent.click(screen.getByTestId(/research-link-form-cancel/));

        expect(screen.queryByTestId(/research-link-form/)).not.toBeInTheDocument();
      });

      it('opens research links form on edit research link click', async () => {
        const openWindowSpy = jest.spyOn(window, 'open');
        renderLessonsNew();

        await act(() => openResearchLinks());

        const editButton = screen.getByRole('button', {
          name: 'Edit first research link',
        });
        fireEvent.click(editButton);

        await waitFor(() => {
          expect(openWindowSpy).toHaveBeenCalledWith(
            '/admin/lesson-items/research-links/1/edit?standaloneEdit=true',
            '_blank',
            'noreferrer'
          );
        });
      });
    });

    describe('videos', () => {
      const openVideos = sectionOpener('videos');

      it('opens videos links section on videos dropdown option click', async () => {
        renderLessonsNew();

        await act(() => openVideos());

        expect(screen.getByTestId(/videos-section/)).toBeInTheDocument();

        await waitFor(() => {
          expect(videosQuerySpy).toHaveBeenCalled();
        });

        const videos = screen.queryAllByTestId(/available-item/);

        expect(videos.length).toBe(4);

        fireEvent.click(screen.getByTestId(/section-close/));

        expect(screen.queryByTestId(/videos-section/)).not.toBeInTheDocument();
      });

      it('add video to lesson items and filter added from the videos list', async () => {
        renderLessonsNew();

        await act(() => openVideos());
        expect(screen.getByText('Videos')).toBeInTheDocument();

        const addVideoButton = screen.getByRole('button', { name: 'Add First video' });
        userEvent.click(addVideoButton);

        const videos = screen.getAllByTestId(/available-item/);

        expect(screen.queryAllByTestId(/draggable-item/).length).toBe(1);
        expect(videos.length).toBe(3);

        const removeVideoButton = screen.getByRole('button', {
          name: 'Remove First video',
        });
        userEvent.click(removeVideoButton);

        const videosAfterChange = screen.getAllByTestId(/available-item/);
        const lessonItems = screen.queryAllByTestId(/draggable-item/);
        expect(lessonItems.length).toBe(0);
        expect(videosAfterChange.length).toBe(4);
      });

      it('opens videos form on new video click', async () => {
        renderLessonsNew();

        await act(() => openVideos());
        fireEvent.click(screen.getByTestId(/lesson-item-new/));

        expect(screen.getByTestId(/video-form$/i)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId(/video-form-cancel/));

        expect(screen.queryByTestId(/video-form/)).not.toBeInTheDocument();
      });

      it('opens videos form on edit video click', async () => {
        const openWindowSpy = jest.spyOn(window, 'open');
        renderLessonsNew();

        await act(() => openVideos());

        const editButton = screen.getByRole('button', {
          name: 'Edit First video',
        });
        fireEvent.click(editButton);

        await waitFor(() => {
          expect(openWindowSpy).toHaveBeenCalledWith(
            '/admin/lesson-items/videos/1/edit?standaloneEdit=true',
            '_blank',
            'noreferrer'
          );
        });
      });

      it('shows more info on video list click', async () => {
        renderLessonsNew();

        await act(() => openVideos());

        const showMoreInfoButton = screen.getByRole('button', { name: 'Show First video' });
        userEvent.click(showMoreInfoButton);

        const videoModal = screen.getByRole('dialog', { name: 'Modal' });
        expect(videoModal).toBeInTheDocument();
        expect(videoModal).toHaveTextContent('first video description');
        expect(videoModal).toHaveTextContent('First video');
        expect(videoModal).toHaveTextContent('first video display name');
        expect(screen.getByTestId(/lesson-item-video-preview/)).toHaveAttribute('src', 'first/url');
      });

      it('shows more info on video lesson item list click', async () => {
        renderLessonsNew();

        await act(() => openVideos());

        userEvent.click(screen.getByRole('button', { name: 'Add First video' }));
        userEvent.click(screen.getByRole('button', { name: 'Show First video' }));

        const videoModal = await screen.findByRole('dialog');
        expect(videoModal).toBeInTheDocument();
        expect(videoModal).toHaveTextContent('first video description');
        expect(videoModal).toHaveTextContent('First video');
        expect(videoModal).toHaveTextContent('first video display name');
        expect(screen.getByTestId(/lesson-item-video-preview/)).toHaveAttribute('src', 'first/url');
      });
    });
  });
});
