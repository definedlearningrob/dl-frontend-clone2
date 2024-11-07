import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import SharedModal from '@shared/components/Modal/Modal';
import {
  FINAL_STEP,
  PlanReportFilters,
} from '@shared/components/PlanReport/PlanReportFilters/PlanReportFilters';
import { usePlanReportFilters } from '@shared/components/PlanReport/usePlanReportFilters';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  schoolYearStartDate: { day: number; month: number };
};

export const PlanReportFiltersModal = ({ isOpen, onClose, schoolYearStartDate }: Props) => {
  const { t } = useTranslation();
  const { resetFilters, submitFilters } = usePlanReportFilters();
  const [isSubmitEnabled, setSubmitEnabled] = useState(false);

  const handleCancel = () => {
    resetFilters();
    onClose();
  };

  const handleSubmit = () => {
    submitFilters();
    onClose();
  };

  const handleStepChange = (activeStep: number) => {
    setSubmitEnabled(activeStep === FINAL_STEP);
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={handleCancel}>
      <SharedModal.Header>
        <SharedModal.Heading className='!text-base'>
          {t('reports.changeFilters')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p className='text-xs mb-sm'>{t('reports.filterInstructions')}</p>
        <PlanReportFilters
          schoolYearStartDate={schoolYearStartDate}
          onStepChange={handleStepChange}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={handleCancel}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button disabled={!isSubmitEnabled} variant='primary' onClick={handleSubmit}>
          {t('reports.generateReport')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
