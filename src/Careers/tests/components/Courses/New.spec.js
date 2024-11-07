import { fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import AdminCoursesNew from '@dc/components/Admin/Courses/New/New';
import lessonsQuery from '@dc/graphql/user/queries/lessons';
import lessonQuery from '@dc/graphql/user/queries/lesson';
import pathwaysQuery from '@dc/graphql/user/queries/pathways';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { FormProvider } from '@dc/hooks/useForm';
import { lessonMock } from '@dc/tests/mocks/userMocks';
import { PAGING } from '@dc/resources/constants';
import { renderWithRouter } from '@dc/utils/test';

let lessonsQueryCalled = false;
let pathwaysQueryCalled = false;
let lessonQueryCalled = false;

const mocks = [
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
      lessonsQueryCalled = true;

      return {
        data: {
          lessons: {
            pagesCount: 1,
            nodesCount: 3,
            nodes: [
              {
                archivedAt: '',
                id: '1',
                imageUrl: 'http://someurl',
                name: 'First lesson',
                thumbnailUrl: 'http://someThumbnailUrl',
                type: 'pathway',
              },
              {
                archivedAt: '',
                id: '2',
                imageUrl: 'http://someurl',
                name: 'Second lesson',
                thumbnailUrl: 'http://someThumbnailUrl',
                type: 'pathway',
              },
              {
                archivedAt: '',
                id: '3',
                imageUrl: 'http://someurl',
                name: 'Third lesson',
                thumbnailUrl: 'http://someThumbnailUrl',
                type: 'pathway',
              },
            ],
          },
        },
      };
    },
  },
  {
    request: {
      query: lessonQuery,
      variables: {
        id: '2',
        track: false,
      },
    },
    result: () => {
      lessonQueryCalled = true;

      return {
        data: { lesson: lessonMock },
      };
    },
  },
  {
    request: {
      query: pathwaysQuery,
    },
    result: () => {
      pathwaysQueryCalled = true;

      return {
        data: { pathways: [] },
      };
    },
  },
];

const surveyLesson = {
  id: '50',
  name: 'Lesson survey',
  type: 'career_review_survey',
};

const renderCoursesNew = () => {
  const utils = renderWithRouter(
    <MockedProvider mocks={mocks}>
      <FormProvider>
        <AdminCoursesNew surveyLesson={surveyLesson} />
      </FormProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminCoursesNew', () => {
  beforeEach(() => {
    lessonsQueryCalled = false;
    lessonQueryCalled = false;
    pathwaysQueryCalled = false;
  });

  const scrollToSpy = jest.fn();
  global.scrollTo = scrollToSpy;

  describe('lessons', () => {
    it('calls lessons query on render ', async () => {
      renderCoursesNew();

      await waitFor(() => {
        expect(lessonsQueryCalled).toBe(true);
      });
    });

    it('calls pathways query on render ', async () => {
      renderCoursesNew();

      await waitFor(() => {
        expect(pathwaysQueryCalled).toBe(true);
      });
    });

    it('renders lessons on available lessons list', async () => {
      const { getAllByTestId } = renderCoursesNew();

      await waitFor(() => {
        const lessons = getAllByTestId('available-item');
        expect(lessons).toHaveLength(3);
        expect(lessons[0]).toHaveTextContent('First lesson');
        expect(lessons[0]).toHaveTextContent('Pathway');
        expect(lessons[1]).toHaveTextContent('Second lesson');
        expect(lessons[1]).toHaveTextContent('Pathway');
        expect(lessons[2]).toHaveTextContent('Third lesson');
        expect(lessons[2]).toHaveTextContent('Pathway');
      });
    });

    it('calls lesson query on lesson more info', async () => {
      renderCoursesNew();

      expect(await screen.findByText('First lesson')).toBeInTheDocument();

      const infoButtons = await screen.findAllByTestId('item-more-info');
      userEvent.click(infoButtons[1]);

      await waitFor(() => {
        expect(lessonQueryCalled).toBe(true);
      });
    });

    it('opens more info modal on lessons more info click', async () => {
      renderCoursesNew();

      expect(await screen.findByText('First lesson')).toBeInTheDocument();
      const infoButtons = await screen.findAllByTestId('item-more-info');
      fireEvent.click(infoButtons[1]);

      expect(await screen.findByTestId('lesson-modal')).toBeInTheDocument();
    });

    it('add by default lesson survey', async () => {
      renderCoursesNew();

      await waitFor(() => {
        expect(screen.getAllByTestId('selected-item')).toHaveLength(1);
        expect(screen.getAllByTestId('selected-item')[0]).toHaveTextContent('Lesson survey');
      });
    });

    it('add lesson to selected lessons list with keeping survey as last', async () => {
      renderCoursesNew();

      expect(await screen.findByText('First lesson')).toBeInTheDocument();

      const addButtons = await screen.findAllByTestId('add-item');
      userEvent.click(addButtons[0]);

      expect(await screen.findAllByTestId('selected-item')).toHaveLength(2);
      expect(await screen.findAllByTestId('available-item')).toHaveLength(2);

      userEvent.click(screen.getAllByTestId('add-item')[0]);

      const selectedItems = await screen.findAllByTestId('selected-item');
      expect(selectedItems).toHaveLength(3);
      expect(await screen.findAllByTestId('available-item')).toHaveLength(1);

      expect(selectedItems[0]).toHaveTextContent('First lesson');
      expect(selectedItems[0]).toHaveTextContent('Pathway');
      expect(selectedItems[1]).toHaveTextContent('Second lesson');
      expect(selectedItems[1]).toHaveTextContent('Pathway');
      expect(selectedItems[2]).toHaveTextContent('Lesson survey');
      expect(selectedItems[2]).toHaveTextContent('Career review survey');
    });

    it('removes lesson from selected lessons list', async () => {
      renderCoursesNew();
      const addButtons = await screen.findAllByTestId('add-item');
      const removeButtons = await screen.findAllByTestId('remove-item');

      userEvent.click(addButtons[0]);
      expect(await screen.findAllByTestId('selected-item')).toHaveLength(2);

      userEvent.click(removeButtons[0]);
      expect(await screen.findAllByTestId('selected-item')).toHaveLength(1);
    });
  });
});
