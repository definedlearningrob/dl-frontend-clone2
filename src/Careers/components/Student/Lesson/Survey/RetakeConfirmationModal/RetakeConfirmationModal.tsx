import { useTranslation } from 'react-i18next';

import { useCreateCareerReviewSurveyAttempt } from '@dc/graphql/student/hooks/useCreateCareerReviewSurveyAttempt';
import { CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES } from '@dc/resources/enums';

import SharedModal, { ModalWithIcon } from '@shared/components/Modal/Modal';
import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';

type Props = {
  contextId: string;
  contextType: CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES;
  isOpen: boolean;
  onDismiss: () => void;
};

export const RetakeConfirmationModal = ({ isOpen, onDismiss, contextId, contextType }: Props) => {
  const { t } = useTranslation();

  const [retakeSurvey, { loading }] = useCreateCareerReviewSurveyAttempt();

  const handleRetake = async () => {
    await retakeSurvey({
      contextId,
      contextType,
    });

    onDismiss();
  };

  return (
    <ModalWithIcon Icon={InfoIcon} isOpen={isOpen} onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading type='h4'>
          {t('careerReviewSurvey.retakeConfirmationTitle')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='leading-lg'>
        <div className='text-neutral-700'>
          {t('careerReviewSurvey.retakeConfirmationDescription')}
        </div>
        <span className='font-medium'>{t('careerReviewSurvey.retakeConfirmationWarning')}</span>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          disabled={loading}
          iconPlacement='end'
          isLoading={loading}
          variant='primary'
          onClick={handleRetake}>
          {t('careerReviewSurvey.retake')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </ModalWithIcon>
  );
};
