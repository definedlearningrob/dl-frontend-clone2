import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';

import SharedButton from '@shared/components/Button/Button';
import useQueryParams from '@shared/hooks/useQueryParams';

AdminEntitiesListItem.propTypes = {
  clearFilter: PropTypes.func,
  entity: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
  }),
  pagingProps: PropTypes.object,
};

function AdminEntitiesListItem({ clearFilter, entity, pagingProps }) {
  const { t } = useTranslation();
  const { updateQueryParams } = useQueryParams();
  const history = useHistory();

  const onSettingsClick = () => {
    history.push(`/admin/entities/${entity.uuid}`);
  };

  const onShowClick = () => {
    updateQueryParams({ parentId: entity.uuid }, { withPush: true });
    pagingProps.selectPage(1);
    clearFilter();
  };

  return (
    <SharedTableList.Row data-testid='lessons-list-item'>
      <SharedTableList.Cell data-testid='lessons-list-item-name'>
        {entity.name}
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='admin-list-item__actions'>
          <SharedButton variant='success' onClick={onShowClick}>
            {t('common.actions.show')}
          </SharedButton>
          <SharedButton variant='primary' onClick={onSettingsClick}>
            {t('admin.entities.settings.label')}
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminEntitiesListItem;
