import { fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import StandardSets from '@dc/screens/AdminApp/StandardSets/StandardSets';
import standardSetsQuery from '@dc/graphql/user/queries/standardSets';
import { PAGING } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

const mocks = [
  {
    request: {
      query: standardSetsQuery,
      variables: {
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
        filter: {},
      },
    },
    result: {
      data: {
        standardSets: {
          nodesCount: 3,
          pagesCount: 1,
          nodes: [
            {
              archivedAt: null,
              displayName: 'Random name',
              id: '1',
              name: 'Alberta Standards',
              setId: 'AB',
              __typename: 'StandardSet',
            },
            {
              archivedAt: null,
              displayName: 'Best Standard',
              id: '8',
              name: 'ACT QualityCore Course Objectives',
              setId: 'ACTQC',
              __typename: 'StandardSet',
            },
            {
              archivedAt: null,
              displayName: null,
              id: '12',
              name: 'Alaska',
              setId: 'AK',
              __typename: 'StandardSet',
            },
          ],
          __typename: 'StandardSetPage',
        },
      },
    },
  },
];

const renderStandardSets = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <StandardSets />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppStandardSets', () => {
  it('renders spinner before response is resolved', async () => {
    const { getByTestId } = renderStandardSets();

    expect(getByTestId(/loading-spinner/)).toBeInTheDocument();

    await waitFor(() => Promise.resolve());
  });

  it('renders standard sets list correctly', async () => {
    const { getAllByTestId } = renderStandardSets();

    await waitFor(() => {
      const standardSetsNames = getAllByTestId(/standard-sets-item-name/);
      const standardSetsDisplayNames = getAllByTestId(/standard-sets-item-displayname/);
      const standardSetsShowButtons = getAllByTestId(/standard-sets-item-show/);
      const standardSetsShowEditButtons = getAllByTestId(/standard-sets-item-edit/);

      expect(standardSetsNames).toHaveLength(3);
      expect(standardSetsDisplayNames).toHaveLength(3);
      expect(standardSetsShowButtons).toHaveLength(3);
      expect(standardSetsShowEditButtons).toHaveLength(3);

      expect(standardSetsNames[0]).toHaveTextContent('Alberta Standards');
      expect(standardSetsNames[1]).toHaveTextContent('ACT QualityCore Course Objectives');
      expect(standardSetsNames[2]).toHaveTextContent('Alaska');

      expect(standardSetsDisplayNames[0]).toHaveTextContent('Random name');
      expect(standardSetsDisplayNames[1]).toHaveTextContent('Best Standard');
      expect(standardSetsDisplayNames[2]).toBeEmptyDOMElement();
    });
  });

  it('opens standard set details modal on "show" button click', async () => {
    const { getByTestId, getAllByTestId } = renderStandardSets();

    await waitFor(() => {
      const firstStandardSetsShowButton = getAllByTestId(/standard-sets-item-show/)[0];
      fireEvent.click(firstStandardSetsShowButton);
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
      expect(getByTestId(/modal-header/)).toHaveTextContent('Standard Set Details');
      expect(getByTestId(/standard-set-details-name/)).toHaveTextContent('Alberta Standards');
      expect(getByTestId(/standard-set-details-displayname/)).toHaveTextContent('Random name');
      expect(getByTestId(/standard-set-details-setid/)).toHaveTextContent('AB');
    });
  });
});
