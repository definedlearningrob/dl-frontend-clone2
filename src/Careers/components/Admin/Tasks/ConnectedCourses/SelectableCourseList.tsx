import { useTranslation } from 'react-i18next';
import { FC, useState } from 'react';

import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { TPaginatedLoaderParams } from '@dc/shared/PaginatedLoader/PaginatedLoader';
import { TCourseOption, TCourseOptionsData } from '@dc/graphql/user/queries/courseOptions';
import { CourseDetailsModal } from '@dc/components/Admin/Tasks/ConnectedCourses/CourseDetailsModal/CourseDetailsModal';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';

type SearchBarProps = { className?: string; field: string; placeholder: string };

type Props = {
  SearchBar: FC<SearchBarProps>;
  pagingProps: TPaginatedLoaderParams<TCourseOptionsData>;
  onEditClick: (course: TCourseOption) => void;
};

const SelectableCourseList = (props: Props) => {
  const { SearchBar, pagingProps, onEditClick } = props;
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleDetailsOpen = (course: TCourseOption) => {
    setSelectedCourseId(course.id);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsClose = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <>
      <ListWrapper
        actions={
          <SearchBar
            field='name'
            placeholder={t('common.placeholders.searchBy', {
              field: t('common.fields.course.courses').toLowerCase(),
            })}
          />
        }
        title={t('admin.courses.allCourses')}>
        <div className='min-h-0 flex-1'>
          <SharedPaginatedLoader.Content
            SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
            {...pagingProps}>
            {({ courses }) => (
              <SortableAvailableList
                field='courses'
                items={courses.nodes}
                onDetailsOpen={handleDetailsOpen}
                onEditClick={onEditClick}
              />
            )}
          </SharedPaginatedLoader.Content>
        </div>
        <PaginationBar pagingProps={pagingProps} />
      </ListWrapper>

      {isDetailsModalOpen && selectedCourseId && (
        <CourseDetailsModal
          courseId={selectedCourseId}
          isOpen={isDetailsModalOpen}
          onClose={handleDetailsClose}
        />
      )}
    </>
  );
};

export default SelectableCourseList;
