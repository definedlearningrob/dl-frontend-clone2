import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';

import SharedButton from '@shared/components/Button/Button';
import '@dc/components/Admin/SchoolClasses/List/Item/Item.sass';

AdminSchoolClassesListItem.propTypes = {
  pagingProps: PropTypes.object,
  schoolClass: PropTypes.shape({
    entity: PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string,
    }),
    name: PropTypes.string,
    uuid: PropTypes.string,
  }),
};

function AdminSchoolClassesListItem({ schoolClass }) {
  const { t } = useTranslation();
  const history = useHistory();

  const onSettingsClick = () => {
    history.push(`/admin/school-classes/${schoolClass.uuid}`);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell data-testid='school-class-item-name'>
        <span>{schoolClass.name}</span>
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='school-class-item-entity-name'>
        <span>{schoolClass.entity.name}</span>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='school-class-list-item__actions'>
          <SharedButton
            className='school-class-list-item__button'
            data-testid='school-class-item-show-btn'
            variant='success'
            onClick={onSettingsClick}>
            {t('common.actions.show')}
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminSchoolClassesListItem;
