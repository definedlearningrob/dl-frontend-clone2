import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';

import SharedButton from '@shared/components/Button/Button';
import '@dc/components/Admin/Students/List/Item/Item.sass';

AdminStudentsListItem.propTypes = {
  pagingProps: PropTypes.object,
  student: PropTypes.shape({
    entity: PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string,
    }),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    uuid: PropTypes.string,
  }),
};

function AdminStudentsListItem({ student }) {
  const { t } = useTranslation();
  const history = useHistory();

  const onSettingsClick = () => {
    history.push(`/admin/students/${student.uuid}/settings`);
  };

  const onShowClick = () => {
    history.push(`/admin/students/${student.uuid}`);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell data-testid='student-item-name'>
        <span>
          {student.firstName} {student.lastName}
        </span>
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='student-item-entity-name'>
        <span>{student.entity.name}</span>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='admin-list-item__actions'>
          <SharedButton
            className='student-list-item__button'
            data-testid='student-item-show-btn'
            variant='success'
            onClick={onShowClick}>
            {t('common.actions.show')}
          </SharedButton>
          <SharedButton
            className='student-list-item__button'
            data-testid='student-item-show-btn'
            variant='primary'
            onClick={onSettingsClick}>
            {t('admin.student.settings.label')}
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminStudentsListItem;
