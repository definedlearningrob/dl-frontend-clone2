import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRestoreTrackMutation } from '@graphql/dc/users/hooks.ts';
import { useArchiveTrackMutation } from '@graphql/dc/users/hooks.ts';

import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import AdminTracksListItem from '@dc/components/Admin/Tracks/List/Item/Item';
import DetailsModal from '@dc/components/Admin/Tracks/List/Item/DetailsModal/DetailsModal';
import useForm from '@dc/hooks/useForm';

import useQueryParams from '@shared/hooks/useQueryParams';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminTracksList.propTypes = {
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
};

function AdminTracksList({ pagingProps, refetchQuery }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { recordToArchive, recordToShow, setRecordToShow, recordToRestore } = useForm();
  const [restoreTrackMutation] = useRestoreTrackMutation();
  const [archiveTrackMutation] = useArchiveTrackMutation();
  const {
    removeQueryParams,
    params: { showId },
  } = useQueryParams();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    showId && setDetailsModalOpen(true);
  }, [showId]);

  const archiveTrack = async () => {
    await archiveTrackMutation({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.tracks.typeName') })
    );
  };

  const restoreTrack = async () => {
    await restoreTrackMutation({
      variables: {
        input: {
          id: recordToRestore.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.unarchived', { name: t('admin.tracks.typeName') })
    );
  };

  const redirectFromAffectedResource = () => showId && history.goBack();

  const onCloseDetailsModal = () => {
    redirectFromAffectedResource();
    removeQueryParams(['showId']);
    setRecordToShow(null);
    setDetailsModalOpen(false);
  };

  const headers = [
    { label: '', id: 'image', classNames: '!w-[100px]' },
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.common.status'), id: 'status' },
    { label: t('common.fields.common.service'), id: 'service' },
    { label: '', id: 'actionButtons' },
  ];

  return (
    <>
      <AdminSharedList
        headers={headers}
        itemsKey='tracks'
        pagingProps={pagingProps}
        onArchive={archiveTrack}
        onRestore={restoreTrack}>
        {(item) => (
          <AdminTracksListItem
            key={item.id}
            setDetailsModalOpen={setDetailsModalOpen}
            track={item}
          />
        )}
      </AdminSharedList>
      <DetailsModal
        isOpen={isDetailsModalOpen}
        trackId={showId || recordToShow?.id}
        onClose={onCloseDetailsModal}
      />
    </>
  );
}

export default AdminTracksList;
