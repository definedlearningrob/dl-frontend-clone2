import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRestoreCatalogMutation } from '@graphql/dc/users/hooks.ts';
import { useArchiveCatalogMutation } from '@graphql/dc/users/hooks.ts';

import AdminCatalogsListItem from '@dc/components/Admin/Catalogs/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import DetailsModal from '@dc/components/Admin/Catalogs/List/Item/DetailsModal/DetailsModal';
import useForm from '@dc/hooks/useForm';

import useQueryParams from '@shared/hooks/useQueryParams';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminCatalogsList.propTypes = {
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
};

function AdminCatalogsList({ pagingProps, refetchQuery }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { recordToArchive, recordToRestore, recordToShow, setRecordToShow } = useForm();
  const [restoreCatalogMutation] = useRestoreCatalogMutation();
  const [archiveCatalogMutation] = useArchiveCatalogMutation();
  const {
    removeQueryParams,
    params: { showId },
  } = useQueryParams();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    showId && setDetailsModalOpen(true);
  }, [showId]);

  const archiveCatalog = async () => {
    await archiveCatalogMutation({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.catalogs.typeName') })
    );
  };

  const restoreCatalog = async () => {
    await restoreCatalogMutation({
      variables: {
        input: {
          id: recordToRestore.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.unarchived', { name: t('admin.catalogs.typeName') })
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
    { label: t('admin.catalogs.tracks.label'), id: 'tracks' },
    { label: t('common.fields.common.service'), id: 'service' },
    { label: '', id: 'actionButtons' },
  ];

  return (
    <>
      <AdminSharedList
        headers={headers}
        itemsKey='catalogs'
        pagingProps={pagingProps}
        onArchive={archiveCatalog}
        onRestore={restoreCatalog}>
        {(item) => (
          <AdminCatalogsListItem
            key={item.id}
            catalog={item}
            setDetailsModalOpen={setDetailsModalOpen}
          />
        )}
      </AdminSharedList>
      {isDetailsModalOpen && (
        <DetailsModal
          catalogId={showId || recordToShow?.id}
          isOpen={isDetailsModalOpen}
          onClose={onCloseDetailsModal}
        />
      )}
    </>
  );
}

export default AdminCatalogsList;
