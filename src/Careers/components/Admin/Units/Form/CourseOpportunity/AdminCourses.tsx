import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { UnitQuery } from '@graphql/dc/users/operations';
import { Get } from 'type-fest';
import { UnitResourceTypes } from '@graphql/dc/users/types';

import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { TCoursesData } from '@dc/graphql/user/queries/courses';

import { ReactComponent as BookIcon } from '@shared/svg/book_opened.svg';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import SharedPaginatedLoader, {
  TPaginatedLoaderParams,
} from '@shared/components/PaginatedLoader/PaginatedLoader';
import Switch from '@shared/components/Switch/Switch';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

type SearchBarProps = { className?: string; field: string; placeholder: string };
type UnitResource = Get<UnitQuery, 'unit.resources.0'>;
type UnitResourceWithId = UnitResource & { id: string };

type Props = {
  withCopies: boolean;
  pagingProps: TPaginatedLoaderParams<TCoursesData>;
  SearchBar: FC<SearchBarProps>;
  toggleIsWithCopies: () => void;
};

export const AdminCourses = ({ SearchBar, pagingProps, toggleIsWithCopies, withCopies }: Props) => {
  const { t } = useTranslation();

  const handleEditClick = (resource: UnitResourceWithId) => {
    window.open(`/admin/courses/${resource.resourceId}/edit`, '_blank', 'noreferrer');
  };

  return (
    <ListWrapper
      actions={
        <div className='flex gap-xs'>
          <Switch
            label={t('common.withCopies')}
            labelFirst={true}
            value={withCopies}
            onChange={toggleIsWithCopies}
          />
          <SearchBar
            field='name'
            placeholder={t('common.placeholders.searchBy', {
              field: t('common.fields.common.course').toLowerCase(),
            })}
          />
        </div>
      }
      title={t('admin.units.label.allCourses')}>
      <div className='min-h-0 flex-1'>
        <SharedPaginatedLoader.Content
          SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
          {...pagingProps}>
          {({ courses }) => {
            const normalizedCourses = courses.nodes.map((course, index) => ({
              resourceId: course.id,
              id: course.id,
              resourceType: UnitResourceTypes.COURSE,
              name: course.name,
              thumbnailUrl: course.thumbnailUrl,
              isVirtualInternship: false,
              __typename: 'UnitResource',
              step: index + 1,
            }));

            return (
              <SortableAvailableList
                ListItemIcon={BookIcon}
                field='unitResources'
                items={normalizedCourses}
                narrowedTypename='UnitResource'
                onEditClick={handleEditClick}
              />
            );
          }}
        </SharedPaginatedLoader.Content>
      </div>
      <PaginationBar pagingProps={pagingProps} />
    </ListWrapper>
  );
};
