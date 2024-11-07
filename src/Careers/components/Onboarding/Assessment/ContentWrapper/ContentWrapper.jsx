import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ProgressBar } from '@dc/components/Onboarding/Assessment/ContentWrapper/ProgressBar/ProgressBar';
import useAssessment from '@dc/hooks/useAssessment';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';

import SharedButton from '@shared/components/Button/Button';

export const ContentWrapper = ({ assessmentType, children, isSaving, nextDisabled, onNext }) => {
  const { t } = useTranslation();
  const { getWholeAssessmentQuestionNumber, tooltipVisible, tooltipMessage } = useAssessment();

  const totalQuestions =
    assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL ? 59 : 45;

  return (
    <>
      {children}
      <footer className='assessment__progress-footer'>
        <div className='assessment__progress-footer__content'>
          <ProgressBar
            className='assessment__progress-footer__progress-bar'
            progress={((getWholeAssessmentQuestionNumber() - 1) / totalQuestions) * 100}
            tooltipOptions={{ visible: tooltipVisible, message: tooltipMessage }}
          />
          <SharedButton
            className='whitespace-nowrap ml-xs'
            disabled={nextDisabled}
            id='next-question-button'
            isLoading={isSaving}
            variant='primary'
            onClick={onNext}>
            {t('student.onboarding.assessment.nextQuestion')}
          </SharedButton>
        </div>
      </footer>
    </>
  );
};

ContentWrapper.propTypes = {
  assessmentType: PropTypes.string,
  children: PropTypes.object,
  isSaving: PropTypes.bool,
  nextDisabled: PropTypes.bool,
  onNext: PropTypes.func,
  onSaveProgress: PropTypes.func,
};
