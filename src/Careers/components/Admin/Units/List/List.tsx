import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { OperationVariables, QueryOptions } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useRestoreUnitMutation } from '@graphql/dc/users/hooks';
import { useArchiveUnitMutation } from '@graphql/dc/users/hooks';

import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import { AdminUnitsListItem } from '@dc/components/Admin/Units/List/Item/Item';
import DetailsModal from '@dc/components/Admin/Units/List/Item/DetailsModal/DetailsModal';
import useForm from '@dc/hooks/useForm';
import { TUnitsData } from '@dc/graphql/user/queries/units';

import useQueryParams from '@shared/hooks/useQueryParams';
import { callToast } from '@shared/components/Toaster/Toaster';
import { TPaginatedLoaderParams } from '@shared/components/PaginatedLoader/PaginatedLoader';

type Props = {
  refetchQuery: QueryOptions<OperationVariables, TUnitsData>;
  pagingProps: TPaginatedLoaderParams<TUnitsData>;
};

function AdminUnitsList({ pagingProps, refetchQuery }: Props) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { recordToArchive, recordToRestore, recordToShow, setRecordToShow } = useForm();
  const [restoreUnitMutation] = useRestoreUnitMutation();
  const [archiveUnitMutation] = useArchiveUnitMutation();
  const { params, removeQueryParams } = useQueryParams<{ showId?: string }>();
  const history = useHistory();
  const { showId } = params;
  const { t } = useTranslation();

  useEffect(() => {
    showId && setDetailsModalOpen(true);
  }, [showId]);

  const archiveUnit = async () => {
    await archiveUnitMutation({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.units.typeName') })
    );
  };

  const restoreUnit = async () => {
    await restoreUnitMutation({
      variables: {
        input: {
          id: recordToRestore.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.unarchived', { name: t('admin.units.typeName') })
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
    { label: t('common.fields.common.actions'), id: 'actionButtons', classNames: 'text-right' },
  ];

  return (
    <>
      <AdminSharedList
        headers={headers}
        itemsKey='units'
        pagingProps={pagingProps}
        onArchive={archiveUnit}
        onRestore={restoreUnit}>
        {(item) => (
          <AdminUnitsListItem key={item.id} setDetailsModalOpen={setDetailsModalOpen} unit={item} />
        )}
      </AdminSharedList>
      {isDetailsModalOpen && (
        <DetailsModal
          isOpen={isDetailsModalOpen}
          unitId={showId || recordToShow?.id}
          onClose={onCloseDetailsModal}
        />
      )}
    </>
  );
}

export default AdminUnitsList;
