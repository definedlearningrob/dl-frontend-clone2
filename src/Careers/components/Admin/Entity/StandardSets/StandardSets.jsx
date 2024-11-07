import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import AssignStandardSetModal from '@dc/components/Admin/Entity/StandardSets/AssignModal/AssignModal';
import PreviewStandardSetModal from '@dc/components/Admin/Entity/StandardSets/Modal/Modal';
import standardSetQuery from '@dc/graphql/user/queries/standardSet';
import UnassignStandardSetModal from '@dc/components/Admin/Entity/StandardSets/UnassignModal/UnassignModal';
import { ReactComponent as ClearIcon } from '@dc/svg/clear.svg';
import { TabCard } from '@dc/components/Admin/Entity/TabCard';

import { ReactComponent as TaskListIcon } from '@shared/assets/icons/list-task-graduate-hat.svg';
import SharedButton from '@shared/components/Button/Button';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

AdminEntityStandardSets.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string,
    standardSets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    uuid: PropTypes.string,
  }),
};

function AdminEntityStandardSets({ entity }) {
  const { t } = useTranslation();
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [unassignModalVisible, setUnassignModalVisible] = useState(false);
  const [standardSetForPreview, setStandardSetForPreview] = useState(false);
  const [standardSetToUnassign, setStandardSetToUnassign] = useState();

  const toggleAssignModal = () => setAssignModalVisible(!assignModalVisible);

  const standardSetClickHandler = (standardSet) => () => setStandardSetForPreview(standardSet);

  const closePreviewModal = () => setStandardSetForPreview(null);

  const toggleUnassignModal = (standardSet) => {
    const standardSetToSet = standardSetToUnassign ? null : standardSet;

    setStandardSetToUnassign(standardSetToSet);
    setUnassignModalVisible(!unassignModalVisible);
  };

  const toggleUnassignHandler = (standardSet) => (event) => {
    event.stopPropagation();
    toggleUnassignModal(standardSet);
  };

  const sortedStandardSets = useMemo(
    () => [...entity.standardSets].sort((a, b) => a.name.localeCompare(b.name)),
    [entity.standardSets]
  );

  const emptyStandardSetsList = (
    <li className='flex justify-between items-center'>
      <span className='text-neutral-700'>{t('common.messages.noStandardsSets')}</span>
    </li>
  );

  const renderStandardSets = sortedStandardSets.map((standardSet) => (
    <li
      key={standardSet.id}
      className='flex justify-between items-center p-xs hover:bg-neutral-200 hover:cursor-pointer hover:rounded-xs'
      data-testid='standard-set-list-item'
      onClick={standardSetClickHandler(standardSet)}>
      {standardSet.name}
      <DeprecatedIconButton
        data-testid='standard-set-unassign-button'
        icon={<ClearIcon />}
        size='xs'
        square={true}
        onClick={toggleUnassignHandler(standardSet)}
      />
    </li>
  ));

  return (
    <TabCard
      description={t('admin.entities.tabs.standardSetsDescription')}
      icon={TaskListIcon}
      title={t('admin.entities.tabs.standardSets')}>
      <>
        <ul className='text-primary-500 pb-base' data-testid='standard-set-list'>
          {isEmpty(entity.standardSets) ? emptyStandardSetsList : renderStandardSets}
        </ul>
        <SharedButton
          className='ml-auto basis-1/3'
          data-testid='assign-standard-set-button'
          variant='primary'
          onClick={toggleAssignModal}>
          {t('common.actions.assign')}
        </SharedButton>
        {assignModalVisible && (
          <AssignStandardSetModal entity={entity} toggleModal={toggleAssignModal} />
        )}
        {unassignModalVisible && (
          <UnassignStandardSetModal
            entity={entity}
            standardSet={standardSetToUnassign}
            toggleModal={toggleUnassignModal}
          />
        )}
        {standardSetForPreview && (
          <SharedDataLoader
            options={{ variables: { id: standardSetForPreview.id } }}
            query={standardSetQuery}>
            {({ standardSet }) => (
              <PreviewStandardSetModal standardSet={standardSet} onClose={closePreviewModal} />
            )}
          </SharedDataLoader>
        )}
      </>
    </TabCard>
  );
}

export default AdminEntityStandardSets;
