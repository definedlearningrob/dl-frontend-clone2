import { MockedProvider } from '@apollo/client/testing';
import { waitFor, screen } from '@testing-library/react';

import lessonQuery from '@dc/graphql/user/queries/lesson';
import { lessonMock } from '@dc/tests/mocks/userMocks';
import { renderWithI18N } from '@dc/utils/test';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

const mocks = [
  {
    request: {
      query: lessonQuery,
      variables: {
        id: '1',
        track: true,
      },
    },
    result: {
      data: {
        lesson: lessonMock,
      },
    },
  },
  {
    request: {
      query: lessonQuery,
      options: {
        variables: {},
      },
    },
    error: new Error('Error during fetch'),
  },
];

const renderDataLoader = (children, props) => {
  const utils = renderWithI18N(
    <MockedProvider mocks={mocks}>
      <SharedDataLoader {...props}>{children}</SharedDataLoader>
    </MockedProvider>
  );

  return { ...utils };
};

describe('SharedDataLoader', () => {
  it('shows loading spinner before query is resolved', async () => {
    const props = {
      query: lessonQuery,
      options: {
        variables: {
          id: '1',
          track: true,
        },
      },
    };

    renderDataLoader(() => <div data-testid='testing-div' />, props);
    expect(screen.queryByTestId(/testing-div/)).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId(/loading-spinner/)).not.toBeInTheDocument();
    });
    expect(screen.getByTestId(/testing-div/)).toBeInTheDocument();
  });

  it('shows content when data is loaded', async () => {
    const props = {
      query: lessonQuery,
      options: {
        variables: {
          id: '1',
          track: true,
        },
      },
    };

    renderDataLoader(
      ({ lesson }) => (
        <span data-testid='returned-data'>
          {lesson.id} {lesson.name}
        </span>
      ),
      props
    );

    await waitFor(() => {
      expect(screen.queryByTestId(/loading-spinner/)).not.toBeInTheDocument();
    });
    expect(screen.getByTestId(/returned-data/)).toBeInTheDocument();
    expect(screen.getByTestId(/returned-data/)).toHaveTextContent('1 First lesson');
  });

  it('shows error when error occured', async () => {
    const props = {
      query: lessonQuery,
      options: {
        variables: {},
      },
    };

    renderDataLoader(
      ({ lesson }) => (
        <span data-testid='returned-data'>
          {lesson.id} {lesson.name}
        </span>
      ),
      props
    );

    await waitFor(() => {
      expect(screen.getByTestId(/loader-error/)).toBeInTheDocument();
    });
  });
});
