import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import attachmentLessonsQuery from '@dc/graphql/user/queries/attachmentLessons';
import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';
import { renderWithRouter } from '@dc/utils/test';

let queryCalled = false;

const mocks = [
  {
    request: {
      query: attachmentLessonsQuery,
      variables: {
        id: '1',
      },
    },
    result: () => {
      queryCalled = true;

      return {
        data: {
          attachment: {
            id: '1',
            lessons: [
              { id: '1', name: 'first lesson' },
              { id: '2', name: 'second lesson' },
            ],
          },
        },
      };
    },
  },
  {
    request: {
      query: attachmentLessonsQuery,
      variables: {
        id: '2',
      },
    },
    result: () => ({
      data: {
        attachment: {
          id: '2',
          lessons: [],
        },
      },
    }),
  },
];

const renderAffectedResources = (props) => {
  const utils = renderWithRouter(
    <MockedProvider mocks={mocks}>
      <AffectedResources
        id='1'
        query={attachmentLessonsQuery}
        resourcesField={AFFECTED_RESOURCES_FILED.LESSONS}
        {...props}
      />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminSharedAffectedResources', () => {
  beforeEach(() => {
    queryCalled = false;
  });

  it('calls passed query with proper variables', async () => {
    expect(queryCalled).toBe(false);

    renderAffectedResources();

    await waitFor(() => {
      expect(queryCalled).toBe(true);
    });
  });

  it('renders returned affected resources', async () => {
    const { getByTestId } = renderAffectedResources();

    await waitFor(() => {
      expect(getByTestId(/affected-resources/)).toHaveTextContent('first lesson, second lesson');
    });
  });

  it('renders nothing when no affected resources', async () => {
    const { queryByTestId } = renderAffectedResources({ id: '2' });

    await waitFor(() => {
      expect(queryByTestId(/affected-resources/)).not.toBeInTheDocument();
    });
  });
});
