import { useIntersection, useToggle } from 'react-use';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty, isNull } from 'lodash-es';
import { useOpportunityTagsQuery } from '@graphql/dc/shared/hooks';

import { ClustersSelect } from '@dc/shared/ClustersSelect/ClustersSelect';
import { OPPORTUNITY_TYPE } from '@dc/resources/enums';
import { PartnerSelect } from '@dc/components/PartnerSelect/PartnerSelect';
import { EntitiesSelect } from '@dc/components/EntitiesSelect/EntittiesSelect';

import { cx } from '@shared/utils/cx';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { Select } from '@shared/components/Select';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as ClearIcon } from '@shared/svg/clear.svg';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { useRole } from '@shared/hooks/useRole';

import { QuickFilterTags } from '../QuickFilterTags';

import { QuickFilters } from './QuickFilters/QuickFilters';
import { GlobalSwitch } from './GlobalSwitch/GlobalSwitch';
import { useOpportunityFilters } from './useOpportunityFilters';

type Props = {
  className?: string;
  includeGlobalFilter?: boolean;
  includeEntitiesFilter?: boolean;
  includePartnerFilter?: boolean;
};

export const OpportunityFilters = ({
  className,
  includeGlobalFilter = false,
  includeEntitiesFilter = false,
  includePartnerFilter = true,
}: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const intersectionRef = useRef(null);
  const [quickFiltersExpanded, toggleQuickFilters] = useToggle(false);

  const { isUser } = useRole();

  const {
    handleSearchChange,
    handlePathwaysChange,
    handleTagsChange,
    handleTypeChange,
    handlePartnersChange,
    handleEntitiesChange,
    handleGlobalToggle,
    resetFilters,
    filters,
  } = useOpportunityFilters();

  const { data: quickFilterTagsData } = useOpportunityTagsQuery();

  const intersection = useIntersection(intersectionRef, {
    threshold: 1,
    // rootMargin shrinks the top edge of the container by 49px
    // this means that filters will intersect the viewport when they come into contact with app header
    rootMargin: '-49px 0px 0px 0px',
  });

  const isSticky =
    intersection && intersection.intersectionRect.top === intersection.rootBounds?.top;

  const filtersWrapperClasses = cx(
    className,
    'top-[theme(variables.headerHeight)] transition-all duration-200 ease-in',
    'flex flex-col bg-white sticky z-lower',
    { '!bg-neutral-200 pt-0': isSticky }
  );
  const filterClasses = 'grow shrink basis-[140px] xxxl:basis-[220px]';
  const showQuickFilterTags = !isSticky && quickFiltersExpanded;
  const opportunityTags = quickFilterTagsData?.opportunityTags || [];

  const TYPE_OPTIONS = Object.values(OPPORTUNITY_TYPE).map((type) => ({
    label: t(`opportunities.types.${type}`),
    value: type,
  }));

  const showClearAllFilterValuesAction =
    !isEmpty(inputRef?.current?.value) ||
    Object.values(filters).some((filterValue) => !isEmpty(filterValue)) ||
    (isUser && !filters.includeGlobal);

  const clearAllFilters = () => {
    resetFilters();

    if (!isNull(inputRef)) {
      inputRef.current!.value = '';
    }
  };

  const filterSize = isFullHD ? 'md' : 'sm';

  const partnersValue =
    filters.partnersIdIn?.map((partnerId, index) => ({
      label: filters.partnerNames![index],
      value: partnerId,
    })) ?? [];

  const pathwaysValue =
    filters.pathwaysIdIn?.map((pathwayId, index) => ({
      label: filters.pathwayNames![index],
      value: pathwayId,
      children: [],
    })) ?? [];

  const entitiesValue =
    filters.entitiesUuidIn?.map((entityUuid, index) => ({
      label: filters.entitiesNames![index],
      value: entityUuid,
      children: [],
    })) ?? [];

  return (
    <div ref={intersectionRef} className={filtersWrapperClasses}>
      <div
        className={cx('flex items-end gap-sm xxxl:gap-base', {
          'mb-sm': isSticky,
        })}>
        <div className='flex items-end gap-xs xxxl:gap-sm grow'>
          <div className='relative grow shrink basis-[220px] xxxl:basis-[380px]'>
            <TextInput
              Icon={SearchIcon}
              defaultValue={filters.nameCont}
              forwardRef={inputRef}
              label={t('opportunities.search')}
              placeholder={t('opportunities.searchOpportunity')}
              size={filterSize}
              onChange={handleSearchChange}
            />
          </div>
          <div className={filterClasses}>
            <Select
              isMulti={true}
              label={t('opportunities.type')}
              name='opportunityType'
              options={TYPE_OPTIONS}
              placeholder={t('common.actions.showAll')}
              size={filterSize}
              value={TYPE_OPTIONS.filter(({ value }) => filters.typeIn?.includes(value))}
              onChange={handleTypeChange}
            />
          </div>
          {includePartnerFilter && (
            <div className={filterClasses}>
              <PartnerSelect
                isMulti={true}
                placeholder={t('common.actions.showAll')}
                value={partnersValue}
                onChange={handlePartnersChange}
              />
            </div>
          )}
          <div className={filterClasses}>
            <ClustersSelect
              size={filterSize}
              value={pathwaysValue}
              onChange={handlePathwaysChange}
            />
          </div>
          {includeEntitiesFilter && (
            <div className={filterClasses}>
              <EntitiesSelect value={entitiesValue} onChange={handleEntitiesChange} />
            </div>
          )}
          {includeGlobalFilter && (
            <GlobalSwitch value={filters.includeGlobal} onChange={handleGlobalToggle} />
          )}
        </div>
        <div className='flex items-end gap-xs xxxl:gap-sm'>
          <QuickFilters
            isExpanded={quickFiltersExpanded}
            selectedTags={filters.tagsContain}
            showDropdown={isSticky}
            tags={opportunityTags}
            toggleIsExpanded={toggleQuickFilters}
            onTagsUpdate={handleTagsChange}
          />
          <div className={cx({ invisible: !showClearAllFilterValuesAction })}>
            <Tooltip message={t('common.actions.clearAll')}>
              <IconButton
                Icon={ClearIcon}
                aria-label={t('common.actions.clearAll')}
                size={isFullHD ? 'lg' : 'md'}
                variant='primary-outlined'
                onClick={clearAllFilters}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {showQuickFilterTags && (
        <QuickFilterTags opportunityTags={opportunityTags} onClick={handleTagsChange} />
      )}
    </div>
  );
};
