import { useTranslation } from 'react-i18next';

import CheckInsInfo from '@pbl/components/User/Project/CheckIns/CheckInsInfo/CheckInsInfo';
import useCustomizeCheckInQuestion from '@pbl/hooks/useCustomizeCheckInQuestion';

import SharedModal from '@shared/components/Modal/Modal';

type Props = {
  checkInGroupId: string | null;
  checkInQuestionId: string | null;
  isLoading: boolean;
  showModal: boolean;
  archiveCheckInGroup: (checkInGroupId: string) => void;
  archiveCheckInQuestion: (checkInQuestionId: string) => void;
  closeModal: () => void;
};

const ArchiveCheckInItemModal = ({
  archiveCheckInGroup,
  archiveCheckInQuestion,
  closeModal,
  isLoading,
  checkInGroupId,
  checkInQuestionId,
  showModal,
}: Props) => {
  const { t } = useTranslation();
  const { isCheckInQuestionOwner } = useCustomizeCheckInQuestion();
  const checkInItemInfo = isCheckInQuestionOwner
    ? t('project.checkIns.deleteOwnedCheckInQuestionInfo')
    : t('project.checkIns.deleteNotOwnedCheckInItemInfo', {
        checkInItem: checkInGroupId ? 'group' : 'question',
      });
  const editCheckInItemInfo = checkInGroupId
    ? t('project.checkIns.editNotOwnedCheckInGroupInfo')
    : t('project.checkIns.editNotOwnedCheckInQuestionInfo');

  const handleArchiveCheckInItem = () => {
    if (checkInQuestionId) {
      archiveCheckInQuestion(checkInQuestionId);
    } else if (checkInGroupId) {
      archiveCheckInGroup(checkInGroupId);
    }

    closeModal();
  };

  return (
    <SharedModal
      data-testid='user-archive-question-modal'
      isOpen={showModal}
      onDismiss={closeModal}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('project.checkIns.deleteCheckInItemHeading', {
            checkInItem: checkInGroupId ? 'group' : 'question',
          })}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <section className='user-archive-question__section'>
          <div className='user-archive-question__section__top'>
            <p>{checkInItemInfo}</p>
          </div>
          {!isCheckInQuestionOwner && (
            <div className='user-archive-question__section__bottom'>
              <CheckInsInfo infoText={editCheckInItemInfo} />
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
          disabled={isLoading}
          size='md'
          variant='danger'
          onClick={handleArchiveCheckInItem}>
          {t('common.actions.delete')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default ArchiveCheckInItemModal;
