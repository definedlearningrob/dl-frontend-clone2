import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AdminCatalogsList from '@dc/components/Admin/Catalogs/List/List';
import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import catalogsQuery, {
  TCatalogsData,
  TCatalogsVariables,
} from '@dc/graphql/user/queries/catalogs';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import SharedSelect from '@dc/shared/Select/Select';
import { FormProvider } from '@dc/hooks/useForm';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { ArchivableStatusTypes, ServiceTypes } from '@dc/resources/enums';
import useHardcodedOptions from '@dc/hooks/useHardcodedOptions';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';

type TScopeType = {
  label: string;
  value: ArchivableStatusTypes;
};

function AdminAppCatalogs() {
  const { t } = useTranslation();
  const { params, updateQueryParams } = useQueryParams<{ scope: ArchivableStatusTypes }>();
  const { options, defaultOption } = useHardcodedOptions<ArchivableStatusTypes>({
    options: ArchivableStatusTypes,
    defaultOption: params.scope
      ? ArchivableStatusTypes[params.scope]
      : ArchivableStatusTypes.ACTIVE,
    baseKey: 'common.archivableStatuses',
  });
  const [scope, setScope] = useState<TScopeType>(defaultOption);

  const selectScope = (selectPage: (number: number) => void) => (scope: TScopeType) => {
    selectPage(1);
    setScope(scope);
    updateQueryParams({ scope: scope.value });
  };

  const STATUS_DEFAULT_VALUE = {
    value: null,
    label: t('common.publishingStatuses.all'),
  };
  const courseStatusOptions = [
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
      <div className='courses'>
        <FormProvider>
          <SharedFilterProvider>
            {({ filter, ...filterProps }) => (
              <SharedPaginatedLoader<TCatalogsData, TCatalogsVariables>
                options={{
                  fetchPolicy: 'network-only',
                  variables: { filter, scope: scope.value },
                }}
                query={catalogsQuery}>
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
                        options={courseStatusOptions}
                        {...filterProps}
                      />
                      <SharedFilterProvider.Select
                        field='service'
                        initialValue={unitStatusLabels[0]}
                        options={unitStatusLabels}
                        {...filterProps}
                      />
                      <SharedSelect
                        options={options}
                        showError={false}
                        value={scope}
                        onChange={selectScope(pagingProps.selectPage)}
                      />
                    </AdminFilters>
                    <AdminCatalogsList pagingProps={pagingProps} refetchQuery={refetchQuery} />
                  </>
                )}
              </SharedPaginatedLoader>
            )}
          </SharedFilterProvider>
        </FormProvider>
      </div>
    </SharedMainContent>
  );
}

export default AdminAppCatalogs;
