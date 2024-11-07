import { Trans, useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import SharedButton from '@shared/components/Button/Button';
import { TStudentPortfolioResume } from '@shared/graphql/user/query/studentPortfolioResumes';

import styles from './DeleteModal.module.sass';
type Props = {
  onDelete: () => void;
  closeModal?: () => void;
  isOpen?: boolean;
  resumeToDelete: TStudentPortfolioResume;
};

export const DeleteModal = ({ isOpen, resumeToDelete, closeModal, onDelete }: Props) => {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={closeModal}>
      <SharedModal.Header>
        <SharedModal.Heading className={styles.title}>
          {t('portfolioDropzone.deleteFiles.heading')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className={styles.text}>
        <Trans
          i18nKey='portfolioDropzone.deleteFiles.deletedText'
          values={{ fileNameToDelete: resumeToDelete.filename }}>
          <span className={styles.boldedText} />
        </Trans>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedButton size='md' variant='primary-outlined' onClick={closeModal}>
          {t('portfolioDropzone.deleteFiles.cancel')}
        </SharedButton>
        <SharedButton size='md' variant='danger' onClick={onDelete}>
          {t('portfolioDropzone.deleteFiles.delete')}
        </SharedButton>
      </SharedModal.Footer>
    </SharedModal>
  );
};
