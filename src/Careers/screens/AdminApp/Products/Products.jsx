import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminProductsList from '@dc/components/Admin/Products/List/List';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import SharedSelect from '@dc/shared/Select/Select';
import productsQuery from '@dc/graphql/user/queries/products';
import { FormProvider } from '@dc/hooks/useForm';
import { ARCHIVABLE_STATUSES, PUBLISHING_STATUSES } from '@dc/resources/constants';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import Switch from '@shared/components/Switch/Switch';

function AdminAppProducts() {
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
  const productStatusOptions = [
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    STATUS_DEFAULT_VALUE,
  ];

  const showCopies = params.showCopies === 'true';

  const toggleShowCopies = () => {
    updateQueryParams({ showCopies: !showCopies }, { withPush: false });
  };

  return (
    <SharedMainContent>
      <div className='products'>
        <FormProvider>
          <SharedFilterProvider>
            {({ filter, ...filterProps }) => (
              <SharedPaginatedLoader
                options={{
                  fetchPolicy: 'network-only',
                  variables: { filter, scope: scope.value, withCopies: showCopies },
                }}
                query={productsQuery}>
                {({ refetchQuery, ...pagingProps }) => (
                  <>
                    <AdminFilters>
                      <Switch
                        label={t('common.withCopies')}
                        labelFirst={true}
                        value={showCopies}
                        onChange={toggleShowCopies}
                      />
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
                        options={productStatusOptions}
                        {...filterProps}
                      />
                      <SharedSelect
                        options={Object.values(ARCHIVABLE_STATUSES)}
                        showError={false}
                        value={scope}
                        onChange={selectScope(pagingProps.selectPage)}
                      />
                    </AdminFilters>
                    <AdminProductsList
                      pagingProps={pagingProps}
                      refetchQuery={refetchQuery}
                      showCopies={showCopies}
                    />
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

export default AdminAppProducts;
