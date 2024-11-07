import { useTranslation } from 'react-i18next';

import CheckInsInfo from '@pbl/components/User/Project/CheckIns/CheckInsInfo/CheckInsInfo';
import useCustomizeCheckInQuestion from '@pbl/hooks/useCustomizeCheckInQuestion';

import SharedModal from '@shared/components/Modal/Modal';

type Props = {
  checkInQuestionIdToArchive: string;
  showModal: boolean;
  archiveCheckInQuestion: (checkInQuestionId: string) => void;
  closeModal: () => void;
};

const ArchiveCheckInQuestionModal = ({
  archiveCheckInQuestion,
  checkInQuestionIdToArchive,
  closeModal,
  showModal,
}: Props) => {
  const { t } = useTranslation();
  const { isCheckInQuestionOwner } = useCustomizeCheckInQuestion();

  const handleArchiveCheckInQuestion = () => {
    archiveCheckInQuestion(checkInQuestionIdToArchive);
    closeModal();
  };

  return (
    <SharedModal
      data-testid='user-archive-question-modal'
      isOpen={showModal}
      onDismiss={closeModal}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('project.checkIns.deleteCheckInQuestionHeading')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <section className='user-archive-question__section'>
          <div className='user-archive-question__section__top'>
            <p>
              {isCheckInQuestionOwner
                ? t('project.checkIns.deleteOwnedCheckInQuestionInfo')
                : t('project.checkIns.deleteNotOwnedCheckInQuestionInfo')}
            </p>
          </div>
          {!isCheckInQuestionOwner && (
            <div className='user-archive-question__section__bottom'>
              <CheckInsInfo infoText={t('project.checkIns.editNotOwnedCheckInQuestionInfo')} />
            </div>
          )}
        </section>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='cancel-archive-button'
          size='md'
          variant='primary-outlined'
          onClick={closeModal}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          data-testid='archive-button'
          size='md'
          variant='danger'
          onClick={handleArchiveCheckInQuestion}>
          {t('common.actions.delete')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default ArchiveCheckInQuestionModal;
