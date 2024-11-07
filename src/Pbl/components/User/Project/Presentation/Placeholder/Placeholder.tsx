import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

import PresentationBuilderModal from '@dc/components/Admin/Tasks/PresentationBuilderModal/PresentationBuilderModal';

import useCustomizeProject from '@pbl/hooks/useCustomizeProject';

import SharedCard from '@shared/components/Card/Card';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';

import styles from './Placeholder.module.sass';

type Props = {
  hasDraftStatePresentation: boolean;
};

const UserProjectPresentationPlaceholder = ({ hasDraftStatePresentation }: Props) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isModalOpen, setModalOpen] = useState(false);
  const { isOwner } = useCustomizeProject();
  const history = useHistory();
  const { t } = useTranslation();

  const toggleModal = () => setModalOpen(!isModalOpen);

  const headerText = hasDraftStatePresentation
    ? t('user.project.customize.presentation.draftState')
    : t('project.missingPresentation');
  const descText = hasDraftStatePresentation
    ? t('user.project.customize.presentation.editableDescription')
    : t('user.project.customize.presentation.missingPresentationText');
  const actionText = hasDraftStatePresentation
    ? t('user.project.customize.presentation.editableTitle')
    : t('user.project.customize.presentation.createPresentation');

  const properAction = () => {
    if (hasDraftStatePresentation) {
      history.push(`/projects/${projectId}/presentation-builder`);
    } else {
      toggleModal();
    }
  };

  const renderPresentationCTA = () => (
    <>
      <p style={{ textAlign: 'center' }}>{descText}</p>
      <footer className={styles.footer}>
        <SharedButton className={styles.footerButton} variant='primary' onClick={properAction}>
          {actionText}
        </SharedButton>
      </footer>
    </>
  );

  return (
    <>
      <SharedCard className={styles.wrapper} dataTestId='empty-placeholder-presentation'>
        <SharedCard.Body className={styles.body}>
          <h3 className={styles.header}>
            <SharedIcon className={styles.infoIcon} icon={<InfoIcon />} size='md' />
            <span className={styles.title}>{headerText}</span>
          </h3>
          {isOwner && renderPresentationCTA()}
        </SharedCard.Body>
      </SharedCard>
      {isModalOpen && (
        <PresentationBuilderModal closeModal={toggleModal} isOnPBL={true} taskId={projectId} />
      )}
    </>
  );
};

export default UserProjectPresentationPlaceholder;
