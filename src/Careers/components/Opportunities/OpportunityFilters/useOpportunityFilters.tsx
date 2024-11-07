import { ChangeEvent, useEffect, useMemo } from 'react';
import { MultiValue } from 'react-select';
import qs from 'qs';
import { useUpdateEffect } from 'react-use';
import { useHistory } from 'react-router-dom';
import { debounce, omit } from 'lodash-es';

import { OPPORTUNITY_TYPE } from '@dc/resources/enums';

import { useFilters } from '@shared/components/FilterProvider/FilterProvider';
import useQueryParams from '@shared/hooks/useQueryParams';

type OpportunityFilters = {
  nameCont: string;
  pathwaysIdIn?: string[];
  pathwayNames?: string[];
  typeIn?: string[];
  tagsContain?: string[];
  partnersIdIn?: string[];
  partnerNames?: string[];
  entitiesUuidIn?: string[];
  entitiesNames?: string[];
  includeGlobal: boolean | never;
};

export const useOpportunityFilters = () => {
  const history = useHistory();
  const opportunityFilters = useFilters<OpportunityFilters>();
  const { params } = useQueryParams<{ tabId?: string }>();

  const { handleFilterChange, filters } = opportunityFilters;

  useEffect(() => {
    const initialFilters = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
      decoder(value, defaultDecoder) {
        if (value === 'true') return true;
        if (value === 'false') return false;

        return defaultDecoder(value);
      },
    });

    const filtersToSet = omit(initialFilters, ['tabId']);

    Object.entries(filtersToSet).forEach(([filterName, value]) => {
      handleFilterChange(
        filterName as keyof OpportunityFilters,
        value as string | string[] | boolean
      );
    });
  }, []);

  useUpdateEffect(() => {
    const filtersQueryString = qs.stringify(filters, {
      addQueryPrefix: true,
      arrayFormat: 'brackets',
    });

    const search = params.tabId
      ? `${filtersQueryString}&tabId=${params.tabId}`
      : filtersQueryString;

    history.replace({ search });
  }, [filters]);

  useEffect(
    () => () => {
      history.replace({ search: '' });
    },
    []
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('nameCont', event.target.value);
  };

  const debouncedSearchChange = useMemo(() => debounce(handleSearchChange, 300), []);

  const handleTypeChange = (types: MultiValue<{ label: string; value: OPPORTUNITY_TYPE }>) => {
    handleFilterChange(
      'typeIn',
      types.map((type) => type.value)
    );
  };

  const handlePathwaysChange = (
    pathways: MultiValue<{ label: string; value: string | number }>
  ) => {
    handleFilterChange(
      'pathwaysIdIn',
      pathways.map((pathway) => pathway.value.toString())
    );
    handleFilterChange(
      'pathwayNames',
      pathways.map((pathway) => pathway.label)
    );
  };

  const handleTagsChange = (tags: string[]) => {
    handleFilterChange('tagsContain', tags);
  };

  const handlePartnersChange = (partners: MultiValue<{ label: string; value: string }>) => {
    handleFilterChange(
      'partnersIdIn',
      partners.map((partner) => partner.value)
    );
    handleFilterChange(
      'partnerNames',
      partners.map((partner) => partner.label)
    );
  };

  const handleEntitiesChange = (
    entities: MultiValue<{ label: string; value: string | number }>
  ) => {
    handleFilterChange(
      'entitiesUuidIn',
      entities.map((entity) => entity.value.toString())
    );
    handleFilterChange(
      'entitiesNames',
      entities.map((entity) => entity.label)
    );
  };

  const handleGlobalToggle = () => {
    handleFilterChange('includeGlobal', !filters.includeGlobal);
  };

  const filterVariables = useMemo(
    () => omit(filters, ['partnerNames', 'pathwayNames', 'entitiesNames']),
    [filters]
  );

  return {
    ...opportunityFilters,
    filterVariables,
    handleSearchChange: debouncedSearchChange,
    handleTypeChange,
    handlePathwaysChange,
    handleEntitiesChange,
    handleTagsChange,
    handlePartnersChange,
    handleGlobalToggle,
  };
};
