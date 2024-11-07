import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AdminSchoolClassesListItem from '@dc/components/Admin/SchoolClasses/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';

AdminSchoolClassesList.propTypes = {
  pagingProps: PropTypes.object,
  parentId: PropTypes.string,
};

function AdminSchoolClassesList({ pagingProps }) {
  const { t } = useTranslation();

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.common.entity'), id: 'entity' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='schoolClasses'
      pagingProps={pagingProps}
      skipManagement={true}>
      {(item) => (
        <AdminSchoolClassesListItem key={item.uuid} pagingProps={pagingProps} schoolClass={item} />
      )}
    </AdminSharedList>
  );
}

export default AdminSchoolClassesList;
