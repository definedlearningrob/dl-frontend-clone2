import { screen } from '@testing-library/react';

import { DisconnectedUserProjectSearchResults } from '@pbl/components/User/ProjectSearch/Results/Results';
import { renderWithI18N } from '@pbl/utils/test';

const renderResults = (props = {}) =>
  renderWithI18N(
    <DisconnectedUserProjectSearchResults
      children={(<div data-testid='children' />) as any}
      allSearchResults={{} as any}
      error={{} as any}
      isSearchStalled={false}
      searchResults={{} as any}
      searchState={{} as any}
      searching={false}
      searchingForFacetValues={false}
      {...props}
    />
  );

describe('UserAppProjectResults', () => {
  it('displays results when there are hits', () => {
    const searchResults = {
      nbHits: 10,
    };

    renderResults({ searchResults });

    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('displays proper no results information', () => {
    const searchResults = {
      nbHits: 0,
    };

    renderResults({ searchResults, searchState: { query: 'wrong phrase' } });

    expect(screen.getByText('No matching projects found for')).toBeInTheDocument();
    expect(screen.getByText('wrong phrase')).toBeInTheDocument();
  });
});
