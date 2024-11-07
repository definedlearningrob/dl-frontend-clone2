import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import {
  AssessmentReportFiltersInputs,
  FINAL_STEP,
} from '@dc/components/AssessmentReport/AssessmentReportFiltersInputs';

import SharedModal from '@shared/components/Modal/Modal';

import { useAssessmentReportFilters } from './useAssessmentReportFilters';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AssessmentFiltersModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  const { resetFilters, submitFilters } = useAssessmentReportFilters();
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
        <AssessmentReportFiltersInputs onStepChange={handleStepChange} />
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
