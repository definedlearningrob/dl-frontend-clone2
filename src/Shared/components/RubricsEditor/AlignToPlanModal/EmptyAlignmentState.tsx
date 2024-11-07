import { useTranslation } from 'react-i18next';

import { ReactComponent as EmptyAlignmentsIcon } from '@dc/assets/icons/empty_alignment_section.svg';

import EmptyState from '@shared/components/EmptyState/EmptyState';
import SharedButton from '@shared/components/Button/Button';
import SharedModal from '@shared/components/Modal/Modal';

type Props = {
  onCreateNewPlan: () => void;
};

export const EmptyAlignmentState = ({ onCreateNewPlan }: Props) => {
  const { t } = useTranslation();

  return (
    <SharedModal.Body>
      <div className='flex flex-col scrollbar gap-base'>
        <EmptyState
          className='text-neutral-700'
          icon={
            <>
              <EmptyAlignmentsIcon />
              <EmptyAlignmentsIcon />
            </>
          }>
          <h6>{t('components.rubric.alignPlans.emptyPlansTitle')}</h6>
          <p>{t('components.rubric.alignPlans.emptyPlansText')}</p>
          <SharedButton size='md' variant='primary-outlined' onClick={onCreateNewPlan}>
            {t('common.actions.createNew')}
          </SharedButton>
        </EmptyState>
      </div>
    </SharedModal.Body>
  );
};
