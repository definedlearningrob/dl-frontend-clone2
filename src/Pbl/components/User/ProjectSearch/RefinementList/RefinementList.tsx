import { connectRefinementList } from 'react-instantsearch-dom';
import {
  connectStateResults,
  Hit,
  RefinementListProvided,
  StateResultsProvided,
} from 'react-instantsearch-core';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { TAvailableFacetsResource } from '@pbl/graphql/user/queries/availableFacetsResources';

import { ReactComponent as Search } from '@shared/svg/search.svg';

import Accordion from './Accordion/Accordion';
import Item from './Item/Item';
import SkeletonItem from './SkeletonItem/SkeletonItem';

import './RefinementList.sass';

type Props = RefinementListProvided &
  StateResultsProvided & {
    active?: boolean;
    attribute: string;
    availableResources?: TAvailableFacetsResource[];
    availableResourcesLoading: boolean;
    facetOrdering?: boolean;
    searchable?: boolean;
    skipFiltering: boolean;
    title: string;
  };

function UserProjectSearchRefinementList({
  active,
  attribute,
  availableResources = [],
  availableResourcesLoading,
  createURL,
  currentRefinement,
  isFromSearch,
  items,
  refine,
  searchable,
  searchForItems,
  searching,
  skipFiltering,
  title,
}: Props) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const itemsRef = availableResourcesLoading ? null : ref;

  const scrollToRef = (ref: HTMLDivElement) =>
    window.scrollTo(0, Number((ref.className = 'refinement-list')));

  const sortFunction = (
    a: { label: string; count: number },
    b: { label: string; count: number }
  ) => {
    if (attribute === 'grades') {
      return parseInt(a.label) - parseInt(b.label);
    }

    if (a.count === b.count) {
      return a.label > b.label ? 1 : -1;
    }

    return b.count - a.count;
  };

  const sortNonNumericalGrades = (
    items: Hit<{ count: number; isRefined: boolean; label: string; value: string[] }>[]
  ) => {
    const newItems = [...items];

    const preKIndex = newItems.findIndex((item) => item.label === 'Pre-K');
    const preKObject = preKIndex !== -1 && newItems.splice(preKIndex, 1);

    const kIndex = newItems.findIndex((item) => item.label === 'K');
    const kObject = kIndex !== -1 && newItems.splice(kIndex, 1);

    const postSecondaryIndex = newItems.findIndex((item) => item.label === 'Postsecondary');
    const postSecondaryObject = postSecondaryIndex !== -1 && newItems.splice(postSecondaryIndex, 1);

    kObject && newItems.unshift(...kObject);
    preKObject && newItems.unshift(...preKObject);
    postSecondaryObject && newItems.push(...postSecondaryObject);

    return newItems;
  };

  useEffect(() => {
    if (ref.current) {
      scrollToRef(ref.current);
    }
  }, [ref.current?.offsetHeight]);

  const availableResourcesNames = availableResources.map(({ displayName }) => displayName.trim());
  const filteredItems = skipFiltering
    ? items
    : items.filter(({ label }) => availableResourcesNames.includes(label));

  const getSortedItems = () => {
    const baseSorted = filteredItems.sort(sortFunction);

    return attribute === 'grades' ? sortNonNumericalGrades(baseSorted) : baseSorted;
  };

  return (
    <ul className='refinement-list'>
      <Accordion active={active} refinementLength={currentRefinement.length} title={title}>
        {searchable && (
          <div className='filter__search'>
            <Search className='filter__search-icon' />
            <input
              className='filter__search-input'
              disabled={availableResourcesLoading}
              placeholder={t('common.placeholders.search')}
              type='search'
              onChange={(event) => searchForItems(event.currentTarget.value)}
            />
          </div>
        )}
        <div ref={itemsRef} className='refinement-list__items'>
          {availableResourcesLoading
            ? [1, 2, 3, 4].map((number) => <SkeletonItem key={number} />)
            : getSortedItems().map((item) => (
                <Item
                  key={item.label}
                  createUrl={createURL}
                  isFromSearch={isFromSearch}
                  item={item}
                  refine={refine}
                  searching={searching}
                />
              ))}
        </div>
      </Accordion>
    </ul>
  );
}

export const DisconnectedUserProjectSearchRefinementList = UserProjectSearchRefinementList;

export default connectRefinementList(connectStateResults(UserProjectSearchRefinementList));
