import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminContractsList from '@dc/components/Admin/Contracts/List/List';
import contractsQuery, {
  type TContractVariables,
  type TContractData,
} from '@dc/graphql/user/queries/contracts';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormProvider } from '@dc/hooks/useForm';
import { PRODUCTS } from '@dc/resources/constants';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

function Contracts() {
  const { t } = useTranslation();

  const PRODUCT_DEFAULT_VALUE = {
    value: null,
    label: t('common.products.all'),
  };
  const contractProductOptions = [
    { value: PRODUCTS.CAREERS, label: t('common.products.careers') },
    { value: PRODUCTS.PBL, label: t('common.products.pbl') },
    PRODUCT_DEFAULT_VALUE,
  ];

  return (
    <SharedMainContent>
      <div className='courses'>
        <FormProvider>
          <SharedFilterProvider>
            {({ filter, ...filterProps }) => (
              <SharedPaginatedLoader<TContractData, TContractVariables>
                options={{ fetchPolicy: 'network-only', variables: { filter } }}
                query={contractsQuery}>
                {({ ...pagingProps }) => (
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
                        field='serviceName'
                        initialValue={PRODUCT_DEFAULT_VALUE}
                        options={contractProductOptions}
                        {...filterProps}
                      />
                    </AdminFilters>
                    <AdminContractsList pagingProps={pagingProps} />
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

export default Contracts;
