import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { BADGES } from '@dc/graphql/user/queries/badges';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import { TBadge } from '@dc/graphql/user/mutations/createBadge';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export const BadgesSelector = () => {
  const [badgesInput] = useField('badges');
  const { t } = useTranslation();

  const handleEditClick = (badge: TBadge) => {
    window.open(`/admin/badges/${badge.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <div>
      <h4>{t('admin.badges.title')}</h4>
      <div className='flex gap-base'>
        <FilterProvider omitUrl={true}>
          {({ SearchBar, filter }) => {
            const variables = useMemo(() => ({ filter }), [filter]);

            return (
              <SharedPaginatedLoader options={{ variables }} query={BADGES}>
                {(pagingProps) => (
                  <>
                    <ListWrapper
                      actions={
                        <SearchBar
                          field='name'
                          placeholder={t('admin.badges.badgeNamePlaceholder')}
                        />
                      }
                      title={t('admin.badges.allBadges')}>
                      <SharedPaginatedLoader.Content
                        SpinnerComponent={
                          <SharedLoadingSpinner className='sortable-list-spinner' />
                        }
                        {...pagingProps}>
                        {({ badges }) => (
                          <SortableAvailableList
                            field='badges'
                            items={badges.nodes}
                            preserveImageAspectRatio={true}
                            onEditClick={handleEditClick}
                          />
                        )}
                      </SharedPaginatedLoader.Content>
                      <PaginationBar pagingProps={pagingProps} />
                    </ListWrapper>
                  </>
                )}
              </SharedPaginatedLoader>
            );
          }}
        </FilterProvider>
        <ListWrapper title={t('admin.badges.selectedBadges')}>
          <SortableSelectedList
            field='badges'
            isDraggable={false}
            items={badgesInput.value}
            preserveImageAspectRatio={true}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>
    </div>
  );
};
