import { ChangeEvent, useEffect, useMemo } from 'react';
import { MultiValue } from 'react-select';
import qs from 'qs';
import { useUpdateEffect } from 'react-use';
import { useHistory } from 'react-router-dom';
import { debounce, omit } from 'lodash-es';
import { PartnerIndexStatuses } from '@graphql/dc/users/types';

import { useFilters } from '@shared/components/FilterProvider/FilterProvider';
import useQueryParams from '@shared/hooks/useQueryParams';

type PartnerFilters = {
  nameCont: string;
  statusIn?: PartnerIndexStatuses[];
  entitiesUuidIn?: string[];
  entitiesNames?: string[];
  includeGlobal: boolean | never;
};

export const usePartnerFilters = () => {
  const history = useHistory();
  const partnerFilters = useFilters<PartnerFilters>();

  const { params } = useQueryParams<{ tabId?: string }>();

  const { handleFilterChange, filters } = partnerFilters;

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
      handleFilterChange(filterName as keyof PartnerFilters, value as string | string[] | boolean);
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
      history.replace({ search: `` });
    },
    []
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('nameCont', event.target.value);
  };

  const debouncedSearchChange = useMemo(() => debounce(handleSearchChange, 300), []);

  const handleStatusChange = (
    statuses: MultiValue<{ label: string; value: PartnerIndexStatuses }>
  ) => {
    handleFilterChange(
      'statusIn',
      statuses.map((status) => status.value)
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

  const filterVariables = useMemo(() => omit(filters, ['entitiesNames']), [filters]);

  return {
    ...partnerFilters,
    filterVariables,
    handleSearchChange: debouncedSearchChange,
    handleStatusChange,
    handleEntitiesChange,
    handleGlobalToggle,
  };
};
