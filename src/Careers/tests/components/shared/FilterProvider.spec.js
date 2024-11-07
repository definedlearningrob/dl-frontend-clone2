import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';

import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import { renderWithRouter } from '@dc/utils/test';

const renderFilterProvider = (children) => {
  const utils = renderWithRouter(
    <SharedFilterProvider omitUrl={true}>{children}</SharedFilterProvider>
  );

  return { ...utils };
};

describe('SharedFilterProvider', () => {
  it('renders with proper initial filters', async () => {
    const { getByTestId } = renderFilterProvider(({ filter }) => (
      <span data-testid='filter-values'>{Object.values(filter).length}</span>
    ));

    expect(getByTestId(/filter-values/)).toHaveTextContent(0);
  });

  it('sets filters based on search string properly', async () => {
    jest.useFakeTimers();
    const { getByTestId } = renderFilterProvider(({ filter, ...props }) => (
      <>
        <span data-testid='name-filter'>{filter.nameCont}</span>
        <span data-testid='display-filter'>{filter.displayNameCont}</span>
        <span data-testid='description-filter'>{filter.descriptionCont}</span>
        <SharedFilterProvider.Search field='name' {...props} />
        <SharedFilterProvider.Search field='displayName' {...props} />
        <SharedFilterProvider.Search field='description' {...props} />
      </>
    ));

    fireEvent.change(getByTestId(/filter-search-bar-name/), { target: { value: 'name filter' } });
    act(() => jest.advanceTimersByTime(700));

    fireEvent.change(getByTestId(/filter-search-bar-displayName/), {
      target: { value: 'display name filter' },
    });
    act(() => jest.advanceTimersByTime(700));

    fireEvent.change(getByTestId(/filter-search-bar-description/), {
      target: { value: 'description filter' },
    });
    act(() => jest.advanceTimersByTime(700));

    expect(getByTestId(/name-filter/)).toHaveTextContent('name filter');
    expect(getByTestId(/display-filter/)).toHaveTextContent('display name filter');
    expect(getByTestId(/description-filter/)).toHaveTextContent('description filter');
  });
});
