import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import performFullContractSyncMutation from '@dc/graphql/user/mutations/performFullContractSync';
import SharedTableList from '@dc/shared/TableList/TableList';
import updateContractMutation from '@dc/graphql/user/mutations/updateContract';

import SharedSwitch from '@shared/components/Switch/Switch';
import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';
import { formatDateTime } from '@shared/utils/date';
import { Tooltip } from '@shared/components/Tooltip';

AdminContractsListItem.propTypes = {
  contract: PropTypes.shape({
    definedLearningUuid: PropTypes.string,
    endDate: PropTypes.string,
    entities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    id: PropTypes.string,
    name: PropTypes.string,
    startDate: PropTypes.string,
    syncable: PropTypes.bool,
    uuid: PropTypes.string,
  }),
};

function AdminContractsListItem({
  contract: { definedLearningUuid, endDate, entities, id, name, startDate, syncable },
}) {
  const { t } = useTranslation();
  const [mutateSyncContract, { loading }] = useMutation(performFullContractSyncMutation, {
    variables: {
      input: {
        definedLearningContractUuid: definedLearningUuid,
      },
    },
  });
  const [toggleSyncable] = useMutation(updateContractMutation, {
    variables: {
      input: {
        id,
        syncable: !syncable,
      },
    },
  });
  const syncContract = async () => {
    await mutateSyncContract();
    callToast('success', t('admin.contracts.contractSyncSuccess', { name: name }));
  };

  return (
    <SharedTableList.Row data-testid='contracts-list-item'>
      <SharedTableList.Cell data-testid='contract-name'>{name}</SharedTableList.Cell>
      <SharedTableList.Cell data-testid='contract-startDate'>
        <Tooltip message={formatDateTime(startDate, { withTime: true })}>
          {formatDateTime(startDate)}
        </Tooltip>
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='contract-endDate'>
        <Tooltip message={formatDateTime(endDate, { withTime: true })}>
          {formatDateTime(endDate)}
        </Tooltip>
      </SharedTableList.Cell>
      <SharedTableList.Cell
        className='admin-list-item__expandable-list-container'
        data-testid='contract-entities'>
        <ul className='admin-list-item__expandable-list'>
          {entities.map((entity) => (
            <li
              key={entity.uuid}
              className='admin-list-item__expandable-list-item'
              data-testid='contract-entity-item'>
              {entity.name}
            </li>
          ))}
        </ul>
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='contract-syncable'>
        <SharedSwitch value={syncable} onChange={toggleSyncable} />
      </SharedTableList.Cell>
      <SharedTableList.Cell className='contracts__sync-button-cell'>
        <SharedButton
          data-testid='contract-sync-button'
          disabled={!syncable}
          isLoading={loading}
          variant='primary'
          onClick={syncContract}>
          {t('admin.contracts.sync')}
        </SharedButton>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminContractsListItem;
