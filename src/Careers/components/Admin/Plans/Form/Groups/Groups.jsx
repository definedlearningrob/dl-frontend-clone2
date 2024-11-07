import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import GroupDetailsModal from '@dc/components/Admin/Plans/Form/Groups/Modal/Modal';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import Card from '@shared/components/Card/Card';
import { ReactComponent as StatementIcon } from '@shared/svg/certificate.svg';

AdminPlansFormGroups.propTypes = {
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
};

function AdminPlansFormGroups({ pagingProps, SearchBar }) {
  const [activeGroup, setActiveGroup] = useState(null);
  const { t } = useTranslation();
  const [groupsInput] = useField('planGroups');
  const isDetailsModalOpen = activeGroup !== null;

  const closeDetailsModal = () => setActiveGroup(null);
  const openItemDetails = (group) => setActiveGroup(group);
  const sortedByStep = groupsInput.value.slice().sort((a, b) => a.step - b.step);

  const handleEditClick = (group) => {
    window.open(`/admin/plan-groups/${group.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <Card>
      <h4>{t('admin.plans.groups.label')}</h4>
      <div className='flex gap-sm'>
        <ListWrapper
          actions={
            <SearchBar
              field='name'
              placeholder={t('common.placeholders.searchBy', {
                field: t('common.fields.common.name').toLowerCase(),
              })}
            />
          }
          title={t('admin.plans.groups.allPlanGroups')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content {...pagingProps}>
              {({ planGroups }) => (
                <SortableAvailableList
                  ListItemIcon={StatementIcon}
                  field='planGroups'
                  items={planGroups.nodes}
                  onDetailsOpen={openItemDetails}
                  onEditClick={handleEditClick}
                />
              )}
            </SharedPaginatedLoader.Content>
          </div>
          <PaginationBar pagingProps={pagingProps} />
        </ListWrapper>
        <ListWrapper title={`${t('common.statuses.selected')} (${sortedByStep.length})`}>
          <SortableSelectedList
            ListItemIcon={StatementIcon}
            field='planGroups'
            items={sortedByStep}
            onDetailsOpen={openItemDetails}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>

      {isDetailsModalOpen && (
        <GroupDetailsModal
          group={activeGroup}
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
        />
      )}
    </Card>
  );
}

export default AdminPlansFormGroups;
