import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { shapeStandardSet } from '@dc/resources/typeDefs';

import SharedButton from '@shared/components/Button/Button';

AdminStandardSetsListItem.propTypes = {
  setDetailsModalOpen: PropTypes.func,
  standardSet: shapeStandardSet,
};

function AdminStandardSetsListItem({ setDetailsModalOpen, standardSet }) {
  const { setRecordToShow } = useForm();
  const history = useHistory();
  const { t } = useTranslation();

  const onEditClick = () => {
    history.push(`/admin/standard-sets/${standardSet.id}/edit`);
  };

  const onShowClick = () => {
    setRecordToShow(standardSet);
    setDetailsModalOpen(true);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell data-testid='standard-sets-item-name'>
        {standardSet.name}
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='standard-sets-item-displayname'>
        {standardSet.displayName}
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='admin-list-item__actions'>
          <SharedButton
            data-testid='standard-sets-item-show'
            variant='success'
            onClick={onShowClick}>
            {t('common.actions.show')}
          </SharedButton>
          <SharedButton
            data-testid='standard-sets-item-edit'
            variant='primary'
            onClick={onEditClick}>
            {t('common.actions.edit')}
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminStandardSetsListItem;
