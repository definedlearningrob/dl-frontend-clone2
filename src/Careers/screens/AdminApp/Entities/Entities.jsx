import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AdminEntitiesList from '@dc/components/Admin/Entities/List/List';
import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import entitiesQuery from '@dc/graphql/user/queries/entities';
import entityWithChildren from '@dc/graphql/user/queries/entityWithChildren';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormProvider } from '@dc/hooks/useForm';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppEntities() {
  const { t } = useTranslation();
  const {
    params: { parentId },
  } = useQueryParams();
  const { setBackNavButton } = useNavigation();
  const [remounting, setRemounting] = useState();
  const properQuery = useMemo(() => (parentId ? entityWithChildren : entitiesQuery), [parentId]);

  useEffect(() => {
    /*
      This is a way to remount filter that it can take values from query params,
      it needs to be wrapped in timeout since it must be after route transition
    */
    setBackNavButton(!!parentId, null, '', () => {
      setTimeout(() => {
        setRemounting(true);
        setRemounting(false);
      }, 50);
    });

    return () => {
      setBackNavButton(false);
    };
  }, [parentId]);

  return (
    <div className='entities'>
      <FormProvider>
        {remounting ? (
          <div />
        ) : (
          <SharedFilterProvider>
            {({ filter, ...filterProps }) => {
              const variables = useMemo(() => ({ filter, uuid: parentId }), [filter, parentId]);

              return (
                <SharedMainContent>
                  <SharedPaginatedLoader
                    getKey={parentId && 'entity.children'}
                    options={{ variables }}
                    query={properQuery}>
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
                        </AdminFilters>
                        <AdminEntitiesList
                          clearFilter={filterProps.clearFilter}
                          pagingProps={pagingProps}
                          parentId={parentId}
                        />
                      </>
                    )}
                  </SharedPaginatedLoader>
                </SharedMainContent>
              );
            }}
          </SharedFilterProvider>
        )}
      </FormProvider>
    </div>
  );
}

export default AdminAppEntities;
