import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import ListItem from '@dc/components/Admin/Contracts/List/Item/Item';
import performContractsSyncMutation from '@dc/graphql/user/mutations/performContractsSync';

import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminContractsList.propTypes = {
  pagingProps: PropTypes.object,
};

function AdminContractsList({ pagingProps }) {
  const { t } = useTranslation();
  const [mutateContractsSync] = useMutation(performContractsSyncMutation, {
    variables: { input: {} },
  });
  const syncAllContracts = async () => {
    await mutateContractsSync();
    callToast('success', t('admin.contracts.contractsSyncSuccess'));
  };

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('admin.contracts.startDate'), id: 'startDate' },
    { label: t('admin.contracts.endDate'), id: 'endDate' },
    { label: t('admin.contracts.entities'), id: 'entities' },
    { label: t('admin.contracts.syncable'), id: 'syncable' },
    { label: '', id: 'actionButtons' },
  ];

  return (
    <>
      <AdminSharedList
        headers={headers}
        itemsKey='contracts'
        pagingProps={pagingProps}
        skipManagement={true}>
        {(item) => <ListItem key={item.id} contract={item} />}
      </AdminSharedList>
      <div className='admin-list__footer'>
        <SharedButton
          className='contracts__sync-button'
          data-testid='contracts-sync-all-button'
          variant='primary'
          onClick={syncAllContracts}>
          {t('admin.contracts.syncAll')}
        </SharedButton>
      </div>
    </>
  );
}

export default AdminContractsList;
