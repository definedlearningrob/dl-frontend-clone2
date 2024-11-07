import { fireEvent, waitFor } from '@testing-library/react';

import FilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import { renderWithRouter } from '@dc/utils/test';

const renderFilterProvider = (children) => {
  const utils = renderWithRouter(<FilterProvider omitUrl={true}>{children}</FilterProvider>);

  return { ...utils };
};

describe('AdminSharedFilterProvider', () => {
  it('renders with proper initial filters', async () => {
    const { getByTestId } = renderFilterProvider(({ filter }) => (
      <span data-testid='filter-values'>{Object.values(filter).length}</span>
    ));

    expect(getByTestId(/filter-values/)).toHaveTextContent(0);
  });

  it('sets filter based on search string properly', async () => {
    const { getByTestId } = renderFilterProvider(({ filter, ...props }) => (
      <>
        <span data-testid='name-filter'>{filter.nameCont}</span>
        <FilterProvider.Search field='name' {...props} />
      </>
    ));

    await waitFor(() => {
      fireEvent.change(getByTestId(/filter-search-bar-name/), { target: { value: 'name filter' } });
    });

    await waitFor(() => {
      expect(getByTestId(/name-filter/)).toHaveTextContent('name filter');
    });
  });
});
