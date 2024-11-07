import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AdminStudentsListItem from '@dc/components/Admin/Students/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';

AdminStudentsList.propTypes = {
  pagingProps: PropTypes.object,
  parentId: PropTypes.string,
};

function AdminStudentsList({ pagingProps }) {
  const { t } = useTranslation();

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.common.entity'), id: 'entity' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='students'
      pagingProps={pagingProps}
      skipManagement={true}>
      {(item) => <AdminStudentsListItem key={item.uuid} pagingProps={pagingProps} student={item} />}
    </AdminSharedList>
  );
}

export default AdminStudentsList;
