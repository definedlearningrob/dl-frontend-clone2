import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';

import { ReactComponent as QuestionIcon } from '@shared/svg/question.svg';
import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';

import CheckinGroupDetailsModal from '../DetailsModal/DetailsModal';

AdminLessonFormCheckinGroups.propTypes = {
  onEditClick: PropTypes.func,
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
};

function AdminLessonFormCheckinGroups({ pagingProps, SearchBar, onEditClick }) {
  const [activeGroup, setActiveGroup] = useState(null);
  const { t } = useTranslation();
  const isDetailsModalOpen = activeGroup !== null;

  const closeDetailsModal = () => setActiveGroup(null);
  const openItemDetails = (checkin) => setActiveGroup(checkin);

  return (
    <div>
      <ListWrapper
        actions={
          <SearchBar
            field='name'
            placeholder={t('common.placeholders.searchBy', {
              field: t('common.fields.common.name').toLowerCase(),
            })}
          />
        }
        title={t('admin.lessons.checkins.checkInGroups')}>
        <div className='min-h-0 flex-1'>
          <SharedPaginatedLoader.Content
            SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
            {...pagingProps}>
            {({ checkInGroups }) => (
              <SortableAvailableList
                ListItemIcon={QuestionIcon}
                field='checkins'
                items={checkInGroups.nodes}
                narrowedTypename='CheckInGroup'
                onDetailsOpen={openItemDetails}
                onEditClick={onEditClick}
              />
            )}
          </SharedPaginatedLoader.Content>
        </div>
        <PaginationBar pagingProps={pagingProps} />
      </ListWrapper>

      {isDetailsModalOpen && (
        <CheckinGroupDetailsModal
          groupId={activeGroup?.id}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      )}
    </div>
  );
}

export default AdminLessonFormCheckinGroups;
