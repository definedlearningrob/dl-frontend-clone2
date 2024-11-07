import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminStandardSetsListItem from '@dc/components/Admin/StandardSets/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import DetailsModal from '@dc/components/Admin/StandardSets/List/DetailsModal/DetailsModal';
import syncStandardSetsMutation from '@dc/graphql/user/mutations/syncStandardSets';
import useForm from '@dc/hooks/useForm';

import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';

import '@dc/components/Admin/StandardSets/List/List.sass';

AdminStandardSetsList.propTypes = {
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
};

function AdminStandardSetsList({ pagingProps, refetchQuery }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { recordToShow, setRecordToShow } = useForm();
  const [mutateSyncStandardSets, { loading }] = useMutation(syncStandardSetsMutation);
  const { t } = useTranslation();

  const syncStandardSets = async () => {
    await mutateSyncStandardSets({
      variables: {
        input: {},
      },
      refetchQueries: [refetchQuery],
    });

    callToast('success', t('admin.standardSets.syncSuccess'));
  };

  const onCloseDetailsModal = () => {
    setRecordToShow(null);
    setDetailsModalOpen(false);
  };

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.common.displayName'), id: 'displayName' },
    { label: '', id: 'actionButtons' },
  ];

  return (
    <>
      <AdminSharedList
        headers={headers}
        itemsKey='standardSets'
        pagingProps={pagingProps}
        skipManagement={true}>
        {(item) => (
          <AdminStandardSetsListItem
            key={item.id}
            setDetailsModalOpen={setDetailsModalOpen}
            standardSet={item}
          />
        )}
      </AdminSharedList>
      <div className='admin-list__footer'>
        <SharedButton
          className='contracts__sync-button'
          isLoading={loading}
          variant='primary'
          onClick={syncStandardSets}>
          {t('admin.standardSets.sync')}
        </SharedButton>
      </div>
      {isDetailsModalOpen && (
        <DetailsModal
          isOpen={isDetailsModalOpen}
          standardSet={recordToShow}
          onClose={onCloseDetailsModal}
        />
      )}
    </>
  );
}

export default AdminStandardSetsList;
