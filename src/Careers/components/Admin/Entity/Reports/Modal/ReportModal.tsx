import { Trans, useTranslation } from 'react-i18next';
import { useState } from 'react';

import { useToggleEntityReport } from '@dc/graphql/user/hooks/useToggleEntityReport';
import { TEntity } from '@dc/graphql/user/queries/entity';
import { GoalToModify } from '@dc/components/Admin/Entity/Reports/Reports';

import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';
import SharedModal from '@shared/components/Modal/Modal';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  entity: TEntity;
  onClose: () => void;
  goalToModify: GoalToModify;
};

export const ReportModal = ({ entity, onClose, goalToModify }: Props) => {
  const { t } = useTranslation();

  const [applyToHierarchy, setApplyToHierarchy] = useState(false);
  const { toggleEntityReport, loading } = useToggleEntityReport();
  const toggleApplyToHierarchy = () => setApplyToHierarchy(!applyToHierarchy);

  const saveGoals = async () => {
    const isEnabled = !entity.reportTypes.includes(goalToModify.reportType);

    await toggleEntityReport({
      entityUuid: entity.uuid,
      reportType: goalToModify.reportType,
      applyToHierarchy,
      value: isEnabled,
    });
    onClose();
  };

  return (
    <SharedModal data-testid='settings-modal' isOpen={true} onDismiss={onClose}>
      <div className='flex gap-sm'>
        <div className='pl-base pt-base pr-0'>
          <IconContainer Icon={InfoIcon} className='bg-info-100 text-info-500 rounded-full' />
        </div>
        <div className='w-full'>
          <SharedModal.Header className='pl-0 text-neutral-800'>
            <SharedModal.Heading className='!text-base leading-base'>
              {t('admin.entities.goals.modalHeader')}
            </SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body className='pl-0'>
            <p className='text-sm leading-lg font-regular tracking-normal'>
              <Trans
                i18nKey='admin.entities.goals.modifyInfo'
                values={{ goal: goalToModify.name, entityName: entity.name }}>
                <strong className='font-medium' />
                <strong className='font-medium' />
              </Trans>
            </p>
            <div className='flex flex-grow'>
              <SharedCheckbox
                checked={applyToHierarchy}
                data-testid='hierarchy-checkbox'
                label={t('admin.entities.goals.applyForChildren')}
                labelClassName='!text-primary-500 text-xs leading-lg font-regular tracking-normal'
                onChange={toggleApplyToHierarchy}
              />
            </div>
          </SharedModal.Body>
          <SharedModal.Footer>
            <SharedModal.Button
              data-testid='save-settings-button'
              isLoading={loading}
              variant='primary'
              onClick={saveGoals}>
              {t('common.actions.save')}
            </SharedModal.Button>
          </SharedModal.Footer>
        </div>
      </div>
    </SharedModal>
  );
};
