import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { connectStateResults, StateResultsProvided } from 'react-instantsearch-core';

import Skeleton from './Skeleton/Skeleton';

import './Results.sass';

type Props = StateResultsProvided & { children: ReactElement };

function UserProjectSearchResults({ searchState, searchResults, children }: Props) {
  const { t } = useTranslation();

  if (!searchResults) return <Skeleton />;

  return searchResults && searchResults.nbHits !== 0 ? (
    children
  ) : (
    <div className='search-results-wrapper'>
      {t('user.projectSearch.emptyList')}{' '}
      <span className='search-results-wrapper__query'>{searchState.query}</span>
    </div>
  );
}

export const DisconnectedUserProjectSearchResults = UserProjectSearchResults;

export default connectStateResults(UserProjectSearchResults);
