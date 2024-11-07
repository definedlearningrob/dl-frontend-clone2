import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import lessonsQuery from '@dc/graphql/user/queries/lessons';
import { PAGING } from '@dc/resources/constants';
import { renderWithRouter } from '@dc/utils/test';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { generatePaginationItems } from '@shared/utils/generatePaginationItems';

let withDefaultParamsCalled = false;
let secondPageQueryCalled = false;
let thirdPageQueryCalled = false;
let perPage20Called = false;

const result = {
  data: {
    lessons: {
      nodesCount: 3,
      pagesCount: 3,
      nodes: [
        {
          archivedAt: '',
          id: '1',
          imageUrl: 'url',
          name: 'First lesson',
          thumbnailUrl: 'http://someThumbnailUrl',
          type: 'pathway',
        },
        {
          archivedAt: '',
          id: '2',
          imageUrl: 'url',
          name: 'Second lesson',
          thumbnailUrl: 'http://someThumbnailUrl',
          type: 'pathway',
        },
        {
          archivedAt: '',
          id: '3',
          imageUrl: 'url',
          name: 'Third lesson',
          thumbnailUrl: 'http://someThumbnailUrl',
          type: 'pathway',
        },
      ],
    },
  },
};

const mocks = [
  {
    request: {
      query: lessonsQuery,
      variables: {
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: () => {
      withDefaultParamsCalled = true;

      return result;
    },
  },
  {
    request: {
      query: lessonsQuery,
      variables: {
        page: 2,
        perPage: 10,
      },
    },
    result: () => {
      secondPageQueryCalled = true;

      return result;
    },
  },
  {
    request: {
      query: lessonsQuery,
      variables: {
        page: 1,
        perPage: 20,
      },
    },
    result: () => {
      perPage20Called = true;

      return result;
    },
  },
  {
    request: {
      query: lessonsQuery,
      variables: {
        page: 2,
        perPage: 20,
      },
    },
    result,
  },
  {
    request: {
      query: lessonsQuery,
      variables: {
        page: 3,
        perPage: 10,
      },
    },
    result: () => {
      thirdPageQueryCalled = true;

      return result;
    },
  },
];

const renderPaginatedLoader = (children, props) => {
  const utils = renderWithRouter(
    <MockedProvider mocks={mocks}>
      <SharedPaginatedLoader omitUrl={true} query={lessonsQuery} {...props}>
        {children}
      </SharedPaginatedLoader>
    </MockedProvider>
  );

  return { ...utils };
};

describe('SharedPaginatedLoader', () => {
  beforeEach(() => {
    withDefaultParamsCalled = false;
    secondPageQueryCalled = false;
    perPage20Called = false;
    thirdPageQueryCalled = false;
  });

  it('generates pages for slider properly', () => {
    expect(generatePaginationItems(0, 1)).toEqual([]);
    expect(generatePaginationItems(30, 1)).toEqual([1, 2, 3, '...', 30]);
    expect(generatePaginationItems(30, 2)).toEqual([1, 2, 3, 4, '...', 30]);
    expect(generatePaginationItems(30, 3)).toEqual([1, 2, 3, 4, 5, '...', 30]);
    expect(generatePaginationItems(30, 4)).toEqual([1, '...', 3, 4, 5, 6, '...', 30]);
    expect(generatePaginationItems(30, 12)).toEqual([1, '...', 11, 12, 13, 14, '...', 30]);
    expect(generatePaginationItems(30, 20)).toEqual([1, '...', 19, 20, 21, 22, '...', 30]);
    expect(generatePaginationItems(30, 27)).toEqual([1, '...', 26, 27, 28, 29, 30]);
    expect(generatePaginationItems(30, 28)).toEqual([1, '...', 27, 28, 29, 30]);
    expect(generatePaginationItems(30, 29)).toEqual([1, '...', 28, 29, 30]);
    expect(generatePaginationItems(30, 30)).toEqual([1, '...', 29, 30]);
  });

  it('shows loading spinner for content before query is resolved', async () => {
    const { getByTestId, queryByTestId } = renderPaginatedLoader((props) => (
      <SharedPaginatedLoader.Content {...props}>
        {() => <div data-testid='testing-div' />}
      </SharedPaginatedLoader.Content>
    ));

    expect(getByTestId(/loading-spinner/)).toBeInTheDocument();
    expect(queryByTestId(/testing-div/)).not.toBeInTheDocument();

    await act(() => Promise.resolve({}));
  });

  it('calls query with default paging params', async () => {
    renderPaginatedLoader(() => <div />);

    await waitFor(() => {
      expect(withDefaultParamsCalled).toBe(true);
    });
  });

  it('shows content when data is loaded', async () => {
    const { getAllByTestId, queryByTestId } = renderPaginatedLoader((props) => (
      <SharedPaginatedLoader.Content {...props}>
        {({ lessons }) =>
          lessons.nodes.map((lesson) => (
            <span key={lesson.id} data-testid='returned-data'>
              {lesson.id} {lesson.name}
            </span>
          ))
        }
      </SharedPaginatedLoader.Content>
    ));

    await waitFor(() => {
      expect(queryByTestId(/loading-spinner/)).not.toBeInTheDocument();
      const lessons = getAllByTestId(/returned-data/);
      expect(lessons).toHaveLength(3);
      expect(lessons[0]).toHaveTextContent('1 First lesson');
      expect(lessons[1]).toHaveTextContent('2 Second lesson');
      expect(lessons[2]).toHaveTextContent('3 Third lesson');
    });
  });

  it('returns proper paging params', async () => {
    const { getByTestId } = renderPaginatedLoader((props) => (
      <SharedPaginatedLoader.Content {...props}>
        {() => (
          <div>
            <span data-testid='page-number'>{props.page}</span>
            <span data-testid='per-page'>{props.perPage.value}</span>
            <span data-testid='pages-count'>{props.pagesCount}</span>
            <span data-testid='total-records-count'>{props.nodesCount}</span>
          </div>
        )}
      </SharedPaginatedLoader.Content>
    ));

    await waitFor(() => {
      expect(getByTestId(/page-number/)).toHaveTextContent(1);
      expect(getByTestId(/per-page/)).toHaveTextContent(10);
      expect(getByTestId(/pages-count/)).toHaveTextContent(3);
      expect(getByTestId(/total-records-count/)).toHaveTextContent(3);
    });
  });

  describe('components', () => {
    describe('next page', () => {
      it('is disabled when on last page', async () => {
        renderPaginatedLoader((props) => <SharedPaginatedLoader.NextPage {...props} />, {
          page: 3,
        });

        expect(await screen.findByTestId(/pagination-next-page/)).toHaveAttribute('disabled');
      });

      it('is enabled when not on the last page', async () => {
        const { getByTestId } = renderPaginatedLoader((props) => (
          <SharedPaginatedLoader.NextPage {...props} />
        ));

        await waitFor(() => {
          expect(getByTestId(/pagination-next-page/)).not.toHaveAttribute('disabled');
        });
      });

      it('it calls 2 page from first page next click', async () => {
        const { getByTestId } = renderPaginatedLoader((props) => (
          <SharedPaginatedLoader.NextPage {...props} />
        ));

        await waitFor(() => {
          expect(withDefaultParamsCalled).toBe(true);
        });

        expect(secondPageQueryCalled).toBe(false);

        await waitFor(() => {
          fireEvent.click(getByTestId(/pagination-next-page/));
        });

        await waitFor(() => {
          expect(secondPageQueryCalled).toBe(true);
        });
      });
    });

    describe('previous page', () => {
      it('is disabled when on first page', async () => {
        renderPaginatedLoader((props) => <SharedPaginatedLoader.PreviousPage {...props} />);

        await waitFor(() => {
          expect(withDefaultParamsCalled).toBe(true);
        });

        expect(await screen.findByTestId(/pagination-prev-page/)).toHaveAttribute('disabled');
      });

      it('is enabled when not on the first page', async () => {
        const { getByTestId } = renderPaginatedLoader(
          (props) => <SharedPaginatedLoader.PreviousPage {...props} />,
          {
            page: 2,
          }
        );

        await waitFor(() => {
          expect(getByTestId(/pagination-prev-page/)).not.toHaveAttribute('disabled');
        });
      });

      it('it calls 2 page from third page previous click', async () => {
        const { getByTestId } = renderPaginatedLoader(
          (props) => <SharedPaginatedLoader.PreviousPage {...props} />,
          {
            page: 3,
          }
        );

        await waitFor(() => {
          expect(thirdPageQueryCalled).toBe(true);
        });

        expect(secondPageQueryCalled).toBe(false);

        fireEvent.click(getByTestId(/pagination-prev-page/));

        await waitFor(() => {
          expect(secondPageQueryCalled).toBe(true);
        });
      });
    });

    describe('per page selector', () => {
      it('calls query with selected per page param', async () => {
        renderPaginatedLoader((props) => <SharedPaginatedLoader.PerPageSelector {...props} />);

        expect(perPage20Called).toBe(false);

        await waitFor(() => {
          fireEvent.keyDown(document.querySelector('.pagination__per-page__control'), {
            keyCode: 40,
          });
        });

        await waitFor(() => {
          fireEvent.click(document.querySelectorAll('.pagination__per-page__option')[1]);
        });

        await waitFor(() => {
          expect(perPage20Called).toBe(true);
        });
      });
    });

    describe('records info', () => {
      it('display proper records info for first', async () => {
        const { getByTestId } = renderPaginatedLoader((props) => (
          <SharedPaginatedLoader.RecordsInfo {...props} />
        ));

        await waitFor(() => {
          expect(getByTestId(/pagination-records-info/)).toHaveTextContent('1 - 3 of 3');
        });
      });

      it('display proper records info for 20 per page', async () => {
        const { getByTestId } = renderPaginatedLoader(
          (props) => <SharedPaginatedLoader.RecordsInfo {...props} />,
          {
            options: { variables: { page: 1, perPage: 20 } },
          }
        );

        await waitFor(() => {
          expect(getByTestId(/pagination-records-info/)).toHaveTextContent('1 - 3 of 3');
        });
      });

      it('display proper records info for 20 per page and second page', async () => {
        const { getByTestId } = renderPaginatedLoader(
          (props) => <SharedPaginatedLoader.RecordsInfo {...props} />,
          {
            page: 2,
            perPage: 20,
          }
        );

        await waitFor(() => {
          expect(getByTestId(/pagination-records-info/)).toHaveTextContent('21 - 3 of 3');
        });
      });
    });

    describe('paging slider', () => {
      it('renders pages', async () => {
        const { getByTestId } = renderPaginatedLoader((props) => (
          <SharedPaginatedLoader.PagingSlider {...props} />
        ));

        await waitFor(() => {
          expect(getByTestId(/pagination-slider$/i)).toHaveTextContent('123');
        });
      });

      it('calls proper query on page click', async () => {
        const { getAllByTestId } = renderPaginatedLoader((props) => (
          <SharedPaginatedLoader.PagingSlider {...props} />
        ));

        expect(secondPageQueryCalled).toBe(false);

        await waitFor(() => expect(getAllByTestId(/pagination-slider-item/).length).toEqual(3));

        await waitFor(() => {
          fireEvent.click(getAllByTestId(/pagination-slider-item/)[1]);
        });

        await waitFor(() => {
          expect(secondPageQueryCalled).toBe(true);
        });

        expect(thirdPageQueryCalled).toBe(false);

        await waitFor(() => getAllByTestId(/pagination-slider-item/)[2]);

        await waitFor(() => {
          fireEvent.click(getAllByTestId(/pagination-slider-item/)[2]);
        });

        await waitFor(() => {
          expect(thirdPageQueryCalled).toBe(true);
        });
      });
    });
  });
});
