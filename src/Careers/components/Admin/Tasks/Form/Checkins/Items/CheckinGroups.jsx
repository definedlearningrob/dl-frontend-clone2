import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import { ReactComponent as CheckinIcon } from '@shared/svg/question.svg';

import CheckinGroupDetailsModal from '../DetailsModal/DetailsModal';

export const CheckinGroups = ({ pagingProps, SearchBar, onEditClick }) => {
  const [activeProduct, setActiveProduct] = useState(null);
  const { t } = useTranslation();
  const isDetailsModalOpen = activeProduct !== null;

  const closeDetailsModal = () => setActiveProduct(null);
  const openItemDetails = (checkin) => setActiveProduct(checkin);

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
        <SharedPaginatedLoader.Content
          SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
          {...pagingProps}>
          {({ checkInGroups }) => (
            <SortableAvailableList
              ListItemIcon={CheckinIcon}
              field='checkins'
              items={checkInGroups.nodes}
              narrowedTypename='CheckInGroup'
              onDetailsOpen={openItemDetails}
              onEditClick={onEditClick}
            />
          )}
        </SharedPaginatedLoader.Content>
        <PaginationBar pagingProps={pagingProps} />
      </ListWrapper>

      {isDetailsModalOpen && (
        <CheckinGroupDetailsModal
          groupId={activeProduct?.id}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      )}
    </div>
  );
};

CheckinGroups.propTypes = {
  onEditClick: PropTypes.func,
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
};
