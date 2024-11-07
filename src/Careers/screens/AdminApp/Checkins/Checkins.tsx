import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminCheckinQuestionsList from '@dc/components/Admin/CheckinQuestions/List/List';
import checkinQuestionsQuery, {
  type TCheckInQuestionsData,
  type TCheckInQuestionsVariables,
} from '@dc/graphql/user/queries/checkinQuestions';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import SharedSelect from '@dc/shared/Select/Select';
import useHardcodedOptions from '@dc/hooks/useHardcodedOptions';
import { ArchivableStatusTypes } from '@dc/resources/enums';
import { FormProvider } from '@dc/hooks/useForm';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

type TScopeType = {
  label: string;
  value: ArchivableStatusTypes;
};

function AdminAppCheckins() {
  const { setBackNavButton } = useNavigation();
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

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <div className='lessons'>
      <FormProvider>
        <SharedFilterProvider>
          {({ filter, ...filterProps }) => (
            <SharedMainContent>
              <SharedPaginatedLoader<TCheckInQuestionsData, TCheckInQuestionsVariables>
                options={{ fetchPolicy: 'network-only', variables: { filter, scope: scope.value } }}
                query={checkinQuestionsQuery}>
                {({ refetchQuery, ...pagingProps }) => (
                  <>
                    <AdminFilters>
                      <SharedFilterProvider.Search
                        field='question'
                        placeholder={t('common.placeholders.searchBy', {
                          field: t('common.fields.checkins.question').toLowerCase(),
                        })}
                        {...filterProps}
                      />
                      <SharedSelect
                        options={options}
                        showError={false}
                        value={scope}
                        onChange={selectScope(pagingProps.selectPage)}
                      />
                    </AdminFilters>
                    <AdminCheckinQuestionsList
                      pagingProps={pagingProps}
                      refetchQuery={refetchQuery}
                    />
                  </>
                )}
              </SharedPaginatedLoader>
            </SharedMainContent>
          )}
        </SharedFilterProvider>
      </FormProvider>
    </div>
  );
}

export default AdminAppCheckins;
