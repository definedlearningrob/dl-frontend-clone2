import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AdminEntitiesListItem from '@dc/components/Admin/Entities/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';

AdminEntitiesList.propTypes = {
  clearFilter: PropTypes.func,
  pagingProps: PropTypes.object,
  parentId: PropTypes.string,
};

function AdminEntitiesList({ clearFilter, pagingProps, parentId }) {
  const { t } = useTranslation();

  const headers = [{ label: t('common.fields.common.name'), id: 'name' }];

  const itemsKey = useMemo(() => (parentId ? 'entity.children' : 'entities'), [parentId]);

  return (
    <AdminSharedList
      headers={headers}
      itemsKey={itemsKey}
      pagingProps={pagingProps}
      skipManagement={true}>
      {(item) => (
        <AdminEntitiesListItem
          key={item.uuid}
          clearFilter={clearFilter}
          entity={item}
          pagingProps={pagingProps}
        />
      )}
    </AdminSharedList>
  );
}

export default AdminEntitiesList;
