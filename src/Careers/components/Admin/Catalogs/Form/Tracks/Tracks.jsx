import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import TrackDetailsModal from '@dc/components/Admin/Catalogs/Form/Tracks/Modal/Modal';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import Card from '@shared/components/Card/Card';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import { SERVICE_NAME } from '@shared/resources/enums';

AdminCatalogsFormTracks.propTypes = {
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
};

function AdminCatalogsFormTracks({ pagingProps, SearchBar }) {
  const [activeTrack, setActiveTrack] = useState(null);
  const { t } = useTranslation();
  const [tracksInput, , trackHelper] = useField('tracks');
  const [serviceInput] = useField('service');
  const isDetailsModalOpen = activeTrack !== null;

  useUpdateEffect(() => {
    trackHelper.setValue([]);
  }, [serviceInput.value.value]);

  const getBadge = (item) => {
    const isCareer = item.service === SERVICE_NAME.CAREERS;

    return {
      text: t(`admin.tracks.label.${isCareer ? 'careers' : 'learning'}`),
      type: isCareer ? 'danger' : 'primary',
    };
  };

  const closeDetailsModal = () => setActiveTrack(null);
  const openItemDetails = (track) => setActiveTrack(track);
  const sortedByStep = tracksInput.value.slice().sort((a, b) => a.step - b.step);

  const handleEditClick = (track) => {
    window.open(`/admin/tracks/${track.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <Card data-testid='tracks-section'>
      <h4>{t('admin.catalogs.tracks.label')}</h4>
      <div className='flex gap-sm'>
        <ListWrapper
          actions={
            <SearchBar
              field='name'
              placeholder={t('common.placeholders.searchBy', {
                field: t('common.fields.common.name').toLowerCase(),
              })}
            />
          }
          title={t('admin.catalogs.tracks.allTracks')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content
              SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
              {...pagingProps}>
              {({ tracks }) => (
                <SortableAvailableList
                  field='tracks'
                  getBadge={getBadge}
                  items={tracks.nodes}
                  onDetailsOpen={openItemDetails}
                  onEditClick={handleEditClick}
                />
              )}
            </SharedPaginatedLoader.Content>
          </div>
          <PaginationBar pagingProps={pagingProps} />
        </ListWrapper>
        <ListWrapper title={`${t('common.statuses.selected')} (${sortedByStep.length})`}>
          <SortableSelectedList
            field='tracks'
            getBadge={getBadge}
            items={sortedByStep}
            onDetailsOpen={openItemDetails}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>
      {isDetailsModalOpen && (
        <TrackDetailsModal
          isOpen={isDetailsModalOpen}
          trackId={activeTrack?.id}
          onClose={closeDetailsModal}
        />
      )}
    </Card>
  );
}

export default AdminCatalogsFormTracks;
