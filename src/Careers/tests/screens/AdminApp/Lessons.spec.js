import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import archiveLessonMutation from '@dc/graphql/user/mutations/archiveLesson';
import Lessons from '@dc/screens/AdminApp/Lessons/Lessons';
import lessonQuery from '@dc/graphql/user/queries/lesson';
import lessonsQuery from '@dc/graphql/user/queries/lessons';
import { lessonMock } from '@dc/tests/mocks/userMocks';
import { PAGING } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

const archiveLessonSpy = jest.fn();
const refetchLessonsSpy = jest.fn();

const mocks = [
  {
    request: {
      query: lessonQuery,
      variables: {
        id: 1,
        track: true,
      },
    },
    result: { data: { lesson: lessonMock } },
  },
  {
    request: {
      query: lessonsQuery,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: {
      data: {
        lessons: {
          pagesCount: 1,
          nodesCount: 3,
          nodes: [
            {
              __typename: 'Lesson',
              archivedAt: null,
              id: '1',
              imageUrl: 'first-image-url',
              name: 'First lesson',
              thumbnailUrl: 'first-thumbnail-url',
              type: 'pathway',
            },
            {
              __typename: 'Lesson',
              archivedAt: null,
              id: '2',
              imageUrl: 'second-image-url',
              name: 'Second lesson',
              thumbnailUrl: 'second-thumbnail-url',
              type: 'pathway',
            },
            {
              __typename: 'Lesson',
              archivedAt: null,
              id: '3',
              imageUrl: 'third-image-url',
              name: 'Third lesson',
              thumbnailUrl: 'third-thumbnail-url',
              type: 'pathway',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: lessonsQuery,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: () => {
      refetchLessonsSpy();

      return {
        data: {
          lessons: {
            pagesCount: 1,
            nodesCount: 3,
            nodes: [],
          },
        },
      };
    },
  },
  {
    request: {
      query: archiveLessonMutation,
      variables: {
        input: {
          id: '1',
        },
      },
    },
    result: () => {
      archiveLessonSpy();

      return {
        data: {
          archiveLesson: {
            lesson: {
              id: '1',
              archivedAt: null,
            },
          },
        },
      };
    },
  },
];

const renderAdminAppLessons = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <Lessons />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppLessons', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders spinner before response is resolved', async () => {
    renderAdminAppLessons();

    expect(screen.getByTestId(/loading-spinner/)).toBeInTheDocument();
  });

  it('renders lessons list correctly', async () => {
    renderAdminAppLessons();

    await waitFor(() => {
      expect(screen.getAllByTestId(/lessons-list-item$/i).length).toEqual(3);
      const lessonsNames = screen.getAllByTestId(/lessons-list-item-name/);
      expect(lessonsNames[0].textContent).toEqual('First lesson');
      expect(lessonsNames[1].textContent).toEqual('Second lesson');
      expect(lessonsNames[2].textContent).toEqual('Third lesson');
    });
  });

  it('closes archive modal on archive modal cancel click', async () => {
    renderAdminAppLessons();

    const [firstLessonArchiveButton] = await screen.findAllByRole('button', { name: 'Archive' });
    fireEvent.click(firstLessonArchiveButton);

    fireEvent.click(screen.getByTestId(/archive-modal-cancel/));

    expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
  });

  it('calls archive lesson on archive modal accept and refetches data for current scope', async () => {
    renderAdminAppLessons();

    const [firstLessonArchiveButton] = await screen.findAllByRole('button', { name: 'Archive' });
    fireEvent.click(firstLessonArchiveButton);

    expect(archiveLessonSpy).not.toHaveBeenCalled();
    expect(refetchLessonsSpy).not.toHaveBeenCalled();

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(screen.getByTestId(/modal-header/)).toHaveTextContent('Archiving lesson');

    fireEvent.click(screen.getByTestId(/archive-modal-accept/));

    await waitFor(() => {
      expect(archiveLessonSpy).toHaveBeenCalled();
    });

    expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
  });
});
