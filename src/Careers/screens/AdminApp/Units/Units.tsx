import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminUnitsList from '@dc/components/Admin/Units/List/List';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { UNITS } from '@dc/graphql/user/queries/units';
import { FormProvider } from '@dc/hooks/useForm';
import {
  ARCHIVABLE_STATUSES,
  PUBLISHING_STATUSES,
  UNIT_SERVICE_STATUSES,
} from '@dc/resources/constants';
import { ArchivableStatusTypes } from '@dc/resources/enums';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { Select } from '@shared/components/Select';

type Params = {
  scope?: ArchivableStatusTypes;
  [key: string]: string | undefined;
};

type ScopeOption = {
  value: ArchivableStatusTypes;
  label: string;
};

function AdminAppUnits() {
  const { params, updateQueryParams } = useQueryParams<Params>();
  const initialScope =
    params.scope && ARCHIVABLE_STATUSES.hasOwnProperty(params.scope)
      ? ARCHIVABLE_STATUSES[params.scope as ArchivableStatusTypes]
      : ARCHIVABLE_STATUSES.ACTIVE;

  const [scope, setScope] = useState<SingleValue<ScopeOption>>(initialScope);
  const { t } = useTranslation();
  const selectScope = (selectPage: (page: number) => void, scope: SingleValue<ScopeOption>) => {
    selectPage(1);
    setScope(scope);
    const scopeValue = scope ? scope.value : '';
    updateQueryParams({ scope: scopeValue });
  };

  const STATUS_DEFAULT_VALUE = {
    value: null,
    label: t('common.publishingStatuses.all'),
  };

  const unitStatusOptions = [
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    STATUS_DEFAULT_VALUE,
  ];

  const serviceStatusOptions = [
    { value: null, label: t('common.services.all') },
    {
      value: UNIT_SERVICE_STATUSES.LEARNING.value,
      label: t('common.services.learning'),
    },
    { value: UNIT_SERVICE_STATUSES.CAREERS.value, label: t('common.services.careers') },
  ];

  return (
    <SharedMainContent>
      <FormProvider>
        <SharedFilterProvider>
          {({ filter, ...filterProps }) => {
            const variables = useMemo(() => ({ filter, scope: scope?.value }), [filter, scope]);

            return (
              <SharedPaginatedLoader
                options={{
                  fetchPolicy: 'network-only',
                  variables,
                }}
                query={UNITS}>
                {({ refetchQuery, ...pagingProps }) => (
                  <>
                    <AdminFilters>
                      <SharedFilterProvider.Search
                        field='name'
                        placeholder={t('common.placeholders.searchBy', {
                          field: t('common.fields.common.name').toLowerCase(),
                        })}
                        {...filterProps}
                      />
                      <SharedFilterProvider.Select
                        field='status'
                        initialValue={STATUS_DEFAULT_VALUE}
                        options={unitStatusOptions}
                        {...filterProps}
                      />
                      <SharedFilterProvider.Select
                        field='service'
                        initialValue={{
                          value: null,
                          label: t('common.services.all'),
                        }}
                        options={serviceStatusOptions}
                        {...filterProps}
                      />
                      <Select
                        options={Object.values(ARCHIVABLE_STATUSES)}
                        value={scope}
                        onChange={(newValue) => selectScope(pagingProps.selectPage, newValue)}
                      />
                    </AdminFilters>
                    <AdminUnitsList
                      pagingProps={{ ...pagingProps, refetchQuery }}
                      refetchQuery={refetchQuery}
                    />
                  </>
                )}
              </SharedPaginatedLoader>
            );
          }}
        </SharedFilterProvider>
      </FormProvider>
    </SharedMainContent>
  );
}

export default AdminAppUnits;
