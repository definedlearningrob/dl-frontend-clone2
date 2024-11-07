import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminTracksList from '@dc/components/Admin/Tracks/List/List';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import tracksQuery from '@dc/graphql/user/queries/tracks';
import { FormProvider } from '@dc/hooks/useForm';
import { ARCHIVABLE_STATUSES, PUBLISHING_STATUSES } from '@dc/resources/constants';
import { ServiceTypes } from '@dc/resources/enums';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { Select } from '@shared/components/Select';

function AdminAppTracks() {
  const { params, updateQueryParams } = useQueryParams();
  const initialScope = params.scope
    ? ARCHIVABLE_STATUSES[params.scope]
    : ARCHIVABLE_STATUSES.ACTIVE;
  const [scope, setScope] = useState(initialScope);
  const { t } = useTranslation();

  const selectScope = (selectPage) => (scope) => {
    selectPage(1);
    setScope(scope);
    updateQueryParams({ scope: scope.value });
  };

  const STATUS_DEFAULT_VALUE = {
    value: null,
    label: t('common.publishingStatuses.all'),
  };
  const trackStatusOptions = [
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    STATUS_DEFAULT_VALUE,
  ];
  const unitStatusLabels = [
    { value: null, label: t('common.services.all') },
    { value: ServiceTypes.LEARNING, label: t('common.services.learning') },
    { value: ServiceTypes.CAREERS, label: t('common.services.careers') },
  ];

  return (
    <SharedMainContent>
      <div className='lessons'>
        <FormProvider>
          <SharedFilterProvider>
            {({ filter, ...filterProps }) => {
              const variables = useMemo(() => ({ filter, scope: scope.value }), [filter, scope]);

              return (
                <SharedPaginatedLoader
                  options={{
                    fetchPolicy: 'network-only',
                    variables,
                  }}
                  query={tracksQuery}>
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
                          options={trackStatusOptions}
                          {...filterProps}
                        />
                        <SharedFilterProvider.Select
                          field='service'
                          initialValue={unitStatusLabels[0]}
                          options={unitStatusLabels}
                          {...filterProps}
                        />
                        <Select
                          options={Object.values(ARCHIVABLE_STATUSES)}
                          value={scope}
                          onChange={selectScope(pagingProps.selectPage)}
                        />
                      </AdminFilters>
                      <AdminTracksList pagingProps={pagingProps} refetchQuery={refetchQuery} />
                    </>
                  )}
                </SharedPaginatedLoader>
              );
            }}
          </SharedFilterProvider>
        </FormProvider>
      </div>
    </SharedMainContent>
  );
}

export default AdminAppTracks;
