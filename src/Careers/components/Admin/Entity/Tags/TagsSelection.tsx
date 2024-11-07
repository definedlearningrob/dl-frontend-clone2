import { useField } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'lodash-es';

import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import { TTagsData } from '@dc/graphql/user/queries/tags';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { TTag } from '@dc/graphql/user/queries/tag';
import { TagTypes } from '@dc/resources/enums';

import { ReactComponent as TagsIcon } from '@shared/assets/icons/tag_icon.svg';
import SharedPaginatedLoader, {
  TPaginatedLoaderParams,
} from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import { BadgeType } from '@shared/components/Badge/Badge';

type SearchBarProps = { className?: string; field: string; placeholder: string };

type Props = {
  SearchBar: FC<SearchBarProps>;
  pagingProps: TPaginatedLoaderParams<TTagsData>;
};

export const TagsSelection = ({ pagingProps, SearchBar }: Props) => {
  const [tagsInput] = useField<TTag[]>('tags');
  const { t } = useTranslation();
  const getBadge = (tag: TTag) => {
    const isSystemTag = tag.type === TagTypes.SYSTEM;
    const badgeType = isSystemTag ? 'primary' : 'secondary';
    const tooltipTextTranslationKey = isSystemTag
      ? 'admin.performanceIndicators.systemTypeInfo'
      : 'admin.performanceIndicators.entityTypeInfo';

    return {
      type: badgeType as BadgeType,
      text: capitalize(tag.type),
      tooltip: t(tooltipTextTranslationKey),
    };
  };

  const handleEditClick = (tag: TTag) => {
    window.open(`/admin/performance-indicators/${tag.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <div className='flex gap-sm'>
      <ListWrapper
        actions={
          <SearchBar
            field='tags'
            placeholder={t('common.placeholders.searchBy', {
              field: t('common.fields.common.name').toLowerCase(),
            })}
          />
        }
        title={t('admin.performanceIndicators.allPerformanceIndicators')}>
        <SharedPaginatedLoader.Content
          SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
          {...pagingProps}>
          {({ tags }) => (
            <SortableAvailableList
              ListItemIcon={TagsIcon}
              field='tags'
              getBadge={getBadge}
              items={tags.nodes}
              onEditClick={handleEditClick}
            />
          )}
        </SharedPaginatedLoader.Content>
        <PaginationBar pagingProps={pagingProps} />
      </ListWrapper>
      <ListWrapper title={`${t('common.statuses.selected')} (${tagsInput.value.length})`}>
        <SortableSelectedList
          ListItemIcon={TagsIcon}
          field='tags'
          getBadge={getBadge}
          isDraggable={false}
          items={tagsInput.value}
          onEditClick={handleEditClick}
        />
      </ListWrapper>
    </div>
  );
};
