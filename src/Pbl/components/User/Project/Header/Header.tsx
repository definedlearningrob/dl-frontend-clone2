import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import UserProjectCopiesModal from '@pbl/components/User/Project/Copies/CopiesModal';
import UserProjectCustomizeModal from '@pbl/components/User/Project/Customize/Modal/Modal';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { EditableHeading } from '@pbl/components/User/Project/EditableHeading';

import SharedButton from '@shared/components/Button/Button';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './Header.module.sass';

type Props = {
  displayName: string;
  canBeCopied: boolean;
  hasCopies: boolean;
  lessonTitle?: string;
};

const ProjectHeader = ({ displayName, canBeCopied, hasCopies, lessonTitle }: Props) => {
  const [isCustomizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [isCopiesModalOpen, setCopiesModalOpen] = useState(false);
  const { isOwner } = useCustomizeProject();
  const { t } = useTranslation();

  const handleCustomizeModalDismiss = () => setCustomizeModalOpen(false);
  const handleCustomizeModalOpen = () => setCustomizeModalOpen(true);

  const customizeModal = useMemo(
    () => (
      <UserProjectCustomizeModal
        displayName={displayName}
        isOpen={isCustomizeModalOpen}
        onDismiss={handleCustomizeModalDismiss}
      />
    ),
    [isCustomizeModalOpen, displayName]
  );

  const handleCopiesModalDismiss = () => setCopiesModalOpen(false);
  const handleCopiesModalOpen = () => setCopiesModalOpen(true);

  const copiesModal = useMemo(
    () => (
      <UserProjectCopiesModal
        displayName={displayName}
        isOpen={isCopiesModalOpen}
        onDismiss={handleCopiesModalDismiss}
      />
    ),
    [isCopiesModalOpen, displayName]
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>
          {lessonTitle && (
            <h2 className={styles.subHeading} data-testid='user-project-lesson-name'>
              {lessonTitle}
            </h2>
          )}
          <EditableHeading displayName={displayName} />
        </div>
        {!isOwner && (
          <div className={styles.buttonsRow} data-testid='header-settings'>
            <Tooltip disabled={hasCopies} message={t('user.project.customize.missingCopies')}>
              <SharedButton
                className={styles.button}
                disabled={!hasCopies}
                variant='primary-outlined'
                onClick={handleCopiesModalOpen}>
                {t('user.project.browse')}
              </SharedButton>
            </Tooltip>
            <Tooltip disabled={canBeCopied} message={t('user.project.customize.cannotBeCopied')}>
              <SharedButton
                className={styles.button}
                disabled={!canBeCopied}
                variant='primary'
                onClick={handleCustomizeModalOpen}>
                {t('user.project.customize.button')}
              </SharedButton>
            </Tooltip>
          </div>
        )}
      </div>
      {customizeModal}
      {copiesModal}
    </>
  );
};

export default ProjectHeader;
