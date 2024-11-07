import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

import PresentationBuilderModal from '@dc/components/Admin/Tasks/PresentationBuilderModal/PresentationBuilderModal';

import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';

import styles from './EditInfo.module.sass';

type Props = {
  editable: boolean;
};

const UserProjectPresentationEditInfo = ({ editable }: Props) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isModalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const toggleModal = () => setModalOpen(!isModalOpen);

  const headerText = editable
    ? t('user.project.customize.presentation.editableTitle')
    : t('user.project.customize.presentation.uneditableTitle');

  const descriptionText = editable
    ? t('user.project.customize.presentation.editableDescription')
    : t('user.project.customize.presentation.uneditableDescription');

  const buttonText = editable
    ? t('common.actions.edit')
    : t('user.project.customize.presentation.uneditableButtonText');

  const handlePresentationEdit = () => {
    if (editable) {
      history.push(`/projects/${projectId}/presentation-builder`);
    } else {
      toggleModal();
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.header}>
            <SharedIcon className={styles.infoIcon} icon={<InfoIcon />} size='md' />
            <span className={styles.headerText}>{headerText}</span>
          </div>
          <p className={styles.paragraph}>{descriptionText}</p>
        </div>
        <div className={styles.right}>
          <SharedButton variant='primary-outlined' onClick={handlePresentationEdit}>
            {buttonText}
          </SharedButton>
        </div>
      </div>
      {!editable && isModalOpen && (
        <PresentationBuilderModal closeModal={toggleModal} isOnPBL={true} taskId={projectId} />
      )}
    </>
  );
};

export default UserProjectPresentationEditInfo;
