import { fireEvent, screen, within } from '@testing-library/react';

import { DisconnectedUserProjectSearchRefinementList } from '@pbl/components/User/ProjectSearch/RefinementList/RefinementList';
import { renderWithI18N } from '@pbl/utils/test';

const renderRefinementList = (props = {}) =>
  renderWithI18N(
    <DisconnectedUserProjectSearchRefinementList
      active={true}
      allSearchResults={{} as any}
      attribute='subject'
      availableResources={[]}
      availableResourcesLoading={false}
      canRefine={true}
      createURL={() => {}}
      currentRefinement={[]}
      error={{} as any}
      isFromSearch={false}
      isSearchStalled={false}
      items={[]}
      refine={() => {}}
      searchForItems={() => {}}
      searchResults={{} as any}
      searchState={{} as any}
      searchable={true}
      searching={false}
      searchingForFacetValues={false}
      skipFiltering={true}
      title='Some title'
      {...props}
    />
  );

describe('UserAppProjectRefinementList', () => {
  it('displays active refinements properly', () => {
    renderRefinementList();

    expect(screen.getByTestId('content-wrapper').classList.contains('-active')).toBe(true);
  });

  it('displays unactive refinements properly', () => {
    renderRefinementList({ active: false });

    expect(screen.getByTestId('content-wrapper').classList.contains('-active')).toBe(false);
  });

  it('shows input on searchable', () => {
    renderRefinementList();

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('hides input when no searchable', () => {
    renderRefinementList({ searchable: false });

    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });

  it('displays list properly (sort by count and alphabetically when same count)', () => {
    const items = [
      {
        label: 'first label',
        value: 'first value',
        count: 7,
        isRefined: false,
      },
      {
        label: 'zsecond label',
        value: 'second value',
        count: 5,
        isRefined: false,
      },
      {
        label: 'second label',
        value: 'second value',
        count: 5,
        isRefined: false,
      },
      {
        label: 'zthird label',
        value: 'third value',
        count: 19,
        isRefined: true,
      },
      {
        label: 'third label',
        value: 'third value',
        count: 19,
        isRefined: true,
      },
    ];

    renderRefinementList({ items });

    const list = screen.getByRole('list');
    const renderedItems = within(list).getAllByRole('listitem');

    expect(renderedItems).toHaveLength(5);
    expect(renderedItems[0]).toHaveTextContent('third label 19');
    expect(renderedItems[1]).toHaveTextContent('zthird label 19');
    expect(renderedItems[2]).toHaveTextContent('first label 7');
    expect(renderedItems[3]).toHaveTextContent('second label 5');
    expect(renderedItems[4]).toHaveTextContent('zsecond label 5');
  });

  it('filters list properly by available resources', () => {
    const items = [
      {
        label: 'first label',
        value: 'first value',
        count: 7,
        isRefined: false,
      },
      {
        label: 'zsecond label',
        value: 'second value',
        count: 5,
        isRefined: false,
      },
      {
        label: 'second label',
        value: 'second value',
        count: 5,
        isRefined: false,
      },
      {
        label: 'zthird label',
        value: 'third value',
        count: 19,
        isRefined: true,
      },
      {
        label: 'third label',
        value: 'third value',
        count: 19,
        isRefined: true,
      },
    ];

    renderRefinementList({
      items,
      availableResources: [{ displayName: 'first label' }, { displayName: 'zthird label' }],
      skipFiltering: false,
      availableResourcesLoading: false,
    });

    const list = screen.getByRole('list');
    const renderedItems = within(list).getAllByRole('listitem');

    expect(renderedItems).toHaveLength(2);
    expect(renderedItems[0]).toHaveTextContent('zthird label 19');
    expect(renderedItems[1]).toHaveTextContent('first label 7');
  });

  it('skips filtering of available resources properly', () => {
    const items = [
      {
        label: 'first label',
        value: 'first value',
        count: 7,
        isRefined: false,
      },
      {
        label: 'zsecond label',
        value: 'second value',
        count: 5,
        isRefined: false,
      },
      {
        label: 'second label',
        value: 'second value',
        count: 5,
        isRefined: false,
      },
      {
        label: 'zthird label',
        value: 'third value',
        count: 19,
        isRefined: true,
      },
      {
        label: 'third label',
        value: 'third value',
        count: 19,
        isRefined: true,
      },
    ];

    renderRefinementList({
      items,
      availableResources: [{ displayName: 'first label' }, { displayName: 'zthird label' }],
      skipFiltering: true,
      availableResourcesLoading: false,
    });

    const list = screen.getByRole('list');
    const renderedItems = within(list).getAllByRole('listitem');

    expect(renderedItems).toHaveLength(5);
    expect(renderedItems[0]).toHaveTextContent('third label 19');
    expect(renderedItems[1]).toHaveTextContent('zthird label 19');
    expect(renderedItems[2]).toHaveTextContent('first label 7');
    expect(renderedItems[3]).toHaveTextContent('second label 5');
    expect(renderedItems[4]).toHaveTextContent('zsecond label 5');
  });

  it('renders skeleton when resources are loading', () => {
    const items = [
      {
        label: 'first label',
        value: 'first value',
        count: 7,
        isRefined: false,
      },
      {
        label: 'zsecond label',
        value: 'second value',
        count: 5,
        isRefined: false,
      },
      {
        label: 'second label',
        value: 'second value',
        count: 5,
        isRefined: false,
      },
      {
        label: 'zthird label',
        value: 'third value',
        count: 19,
        isRefined: true,
      },
      {
        label: 'third label',
        value: 'third value',
        count: 19,
        isRefined: true,
      },
    ];

    renderRefinementList({
      items,
      skipFiltering: true,
      availableResourcesLoading: true,
    });

    const list = screen.getByRole('list');
    const renderedItems = within(list).getAllByRole('listitem');

    expect(renderedItems).toHaveLength(4);
    expect(renderedItems[0]).toBeEmptyDOMElement();
    expect(renderedItems[1]).toBeEmptyDOMElement();
    expect(renderedItems[2]).toBeEmptyDOMElement();
    expect(renderedItems[3]).toBeEmptyDOMElement();
  });

  it('sort grades properly', () => {
    const items = [
      { label: '1', value: '1', count: 7, isRefined: false },
      { label: '2', value: '2', count: 7, isRefined: false },
      { label: '4', value: '4', count: 7, isRefined: false },
      { label: '7', value: '7', count: 7, isRefined: false },
      { label: '3', value: '3', count: 7, isRefined: false },
      { label: '6', value: '6', count: 7, isRefined: false },
      { label: '5', value: '5', count: 7, isRefined: false },
      { label: '9', value: '9', count: 7, isRefined: false },
      { label: '8', value: '8', count: 7, isRefined: false },
      { label: '11', value: '11', count: 7, isRefined: false },
      { label: '12', value: '12', count: 7, isRefined: false },
      { label: '10', value: '10', count: 7, isRefined: false },
      { label: 'K', value: 'K', count: 7, isRefined: false },
      { label: 'Pre-K', value: 'Pre-K', count: 7, isRefined: false },
      { label: 'Postsecondary', value: 'Postsecondary', count: 7, isRefined: false },
    ];

    renderRefinementList({ items, attribute: 'grades' });

    const list = screen.getByRole('list');
    const renderedItems = within(list).getAllByRole('listitem');

    expect(renderedItems).toHaveLength(15);
    expect(renderedItems[0]).toHaveTextContent('Pre-K');
    expect(renderedItems[1]).toHaveTextContent('K');
    expect(renderedItems[2]).toHaveTextContent('1');
    expect(renderedItems[3]).toHaveTextContent('2');
    expect(renderedItems[4]).toHaveTextContent('3');
    expect(renderedItems[5]).toHaveTextContent('4');
    expect(renderedItems[6]).toHaveTextContent('5');
    expect(renderedItems[7]).toHaveTextContent('6');
    expect(renderedItems[8]).toHaveTextContent('7');
    expect(renderedItems[9]).toHaveTextContent('8');
    expect(renderedItems[10]).toHaveTextContent('9');
    expect(renderedItems[11]).toHaveTextContent('10');
    expect(renderedItems[12]).toHaveTextContent('11');
    expect(renderedItems[13]).toHaveTextContent('12');
    expect(renderedItems[14]).toHaveTextContent('Postsecondary');
  });

  it('assigns refined class properly', () => {
    const items = [
      {
        label: 'first label',
        value: 'first value',
        count: 7,
        isRefined: false,
      },
      {
        label: 'second label',
        value: 'second value',
        count: 5,
        isRefined: true,
      },
    ];

    renderRefinementList({ items });

    const list = screen.getByRole('list');
    const renderedItems = within(list).getAllByRole('link');

    expect(renderedItems[0].classList.contains('-refined')).toBeFalsy();
    expect(renderedItems[1].classList.contains('-refined')).toBeTruthy();
  });

  it.skip('disables checkbox and list element when searching', () => {
    const items = [
      {
        label: 'first label',
        value: 'first value',
        count: 7,
        isRefined: false,
      },
    ];

    renderRefinementList({ items, searching: true });

    const disabledElement = screen.getByRole('link');

    expect(disabledElement.classList.contains('-disabled')).toBeTruthy();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('calls refine with proper value on list item click', () => {
    const refineSpy = jest.fn();

    const items = [
      {
        label: 'first label',
        value: 'first value',
        count: 7,
        isRefined: false,
      },
    ];

    renderRefinementList({ items, refine: refineSpy });

    const element = screen.getByRole('link');

    fireEvent.click(element);

    expect(refineSpy).toHaveBeenCalledTimes(1);
    expect(refineSpy).toHaveBeenCalledWith('first value');
  });

  it('does not call refine when disabled', () => {
    const refineSpy = jest.fn();

    const items = [
      {
        label: 'first label',
        value: 'first value',
        count: 7,
        isRefined: false,
      },
    ];

    renderRefinementList({ items, refine: refineSpy, searching: true });

    const element = screen.getByRole('link');

    fireEvent.click(element);

    expect(refineSpy).toHaveBeenCalledTimes(0);
  });
});
