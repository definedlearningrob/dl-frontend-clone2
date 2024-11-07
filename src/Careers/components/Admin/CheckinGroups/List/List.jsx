import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archiveCheckinGroupMutation from '@dc/graphql/user/mutations/archiveCheckInGroup';
import useForm from '@dc/hooks/useForm';

import { callToast } from '@shared/components/Toaster/Toaster';

import AdminCheckinGroupsItem from './Item/Item';
import DetailsModal from './DetailsModal/DetailsModal';

AdminCheckinGroupsList.propTypes = {
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
};

function AdminCheckinGroupsList({ pagingProps, refetchQuery }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { recordToArchive, recordToShow, setRecordToShow } = useForm();
  const { t } = useTranslation();
  const [mutateArchiveGroup] = useMutation(archiveCheckinGroupMutation);

  const archiveGroup = async () => {
    await mutateArchiveGroup({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.planGroups.label') })
    );
  };

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.common.displayName'), id: 'displayName' },
    { label: '', id: 'actionButtons' },
  ];

  const onCloseDetailsModal = () => {
    setRecordToShow(null);
    setDetailsModalOpen(false);
  };

  return (
    <>
      <AdminSharedList
        headers={headers}
        itemsKey='checkInGroups'
        pagingProps={pagingProps}
        onArchive={archiveGroup}>
        {(item) => (
          <AdminCheckinGroupsItem
            key={item.id}
            group={item}
            setDetailsModalOpen={setDetailsModalOpen}
          />
        )}
      </AdminSharedList>
      {isDetailsModalOpen && (
        <DetailsModal
          groupId={recordToShow.id}
          isOpen={isDetailsModalOpen}
          onClose={onCloseDetailsModal}
        />
      )}
    </>
  );
}

export default AdminCheckinGroupsList;
