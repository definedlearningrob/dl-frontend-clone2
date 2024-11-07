import { useMutation } from '@apollo/client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useToggle } from 'react-use';
import { capitalize } from 'lodash-es';

import { TASK_STATUS } from '@pbl/resources/enums';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import UPDATE_PROJECT_STATUS, {
  type TUpdateProjectStatusData,
  type TUpdateProjectStatusVariables,
} from '@pbl/graphql/user/mutations/updateProjectStatus';

import { ReactComponent as FileIcon } from '@shared/svg/file.svg';
import { ReactComponent as PublishedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import Card from '@shared/components/Card/Card';
import SharedSwitch from '@shared/components/Switch/Switch';
import SharedButton from '@shared/components/Button/Button';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { useLti } from '@shared/components/LtiProvider/LtiProvider';
import { Badge } from '@shared/components/Badge/Badge';

import UserProjectCustomizeModal from '../Customize/Modal/Modal';
import UserProjectCopiesModal from '../Copies/CopiesModal';
import ItemsToGrade from '../ItemsToGrade';

import styles from './Settings.module.sass';

type Props = {
  checkinsToGrade: number;
  displayName: string;
  hasCopies: boolean;
  status: TASK_STATUS;
  submissionsToGrade: number;
};

const UserProjectSettings = ({
  checkinsToGrade,
  displayName,
  hasCopies,
  status,
  submissionsToGrade,
}: Props) => {
  const [updateProjectMutation, { loading }] = useMutation<
    TUpdateProjectStatusData,
    TUpdateProjectStatusVariables
  >(UPDATE_PROJECT_STATUS);

  const { t } = useTranslation();
  const { projectId, productId } = useParams<{ projectId: string; productId?: string }>();
  const { isLti } = useLti();
  const { toggleEditMode, editMode } = useCustomizeProject();

  const [isCustomizeModalOpen, toggleCustomizeModal] = useToggle(false);
  const [isCopiesModalOpen, toggleCopiesModal] = useToggle(false);

  const hideSettings = !(isLti && productId !== undefined);
  const isPublished = status === TASK_STATUS.PUBLISHED;

  const customizeModal = useMemo(
    () => (
      <UserProjectCustomizeModal
        displayName={displayName}
        isOpen={isCustomizeModalOpen}
        onDismiss={() => toggleCustomizeModal(false)}
      />
    ),
    [isCustomizeModalOpen, displayName]
  );

  const copiesModal = useMemo(
    () => (
      <UserProjectCopiesModal
        displayName={displayName}
        isOpen={isCopiesModalOpen}
        onDismiss={() => toggleCopiesModal(false)}
      />
    ),
    [isCopiesModalOpen, displayName]
  );

  const publishButtonText = isPublished
    ? t('user.project.settings.convert')
    : t('user.project.settings.publish');

  const handlePublishChange = async () => {
    const desiredStatus = isPublished ? TASK_STATUS.DRAFT : TASK_STATUS.PUBLISHED;

    await updateProjectMutation({
      variables: {
        input: {
          id: projectId,
          status: desiredStatus,
        },
      },
    });
  };

  return (
    <>
      <Card withoutPadding={true}>
        {hideSettings ? (
          <>
            <Card.Header withPadding={true}>
              <Card.Title size='medium'>{t('user.project.settings.label')}</Card.Title>
              <div className='flex items-end'>
                <Badge
                  Icon={isPublished ? PublishedIcon : FileIcon}
                  type={isPublished ? 'primary' : 'secondary'}>
                  {capitalize(status)}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body withPadding={true}>
              <div className='flex gap-sm flex-wrap'>
                <SharedButton
                  className='flex-1 whitespace-nowrap'
                  variant='primary-outlined'
                  onClick={toggleCustomizeModal}>
                  {t('user.project.settings.newCopy')}
                </SharedButton>
                <SharedButton
                  className='flex-1'
                  isLoading={loading}
                  variant='primary'
                  onClick={handlePublishChange}>
                  {publishButtonText}
                </SharedButton>
              </div>
              <div className={styles.editingRow}>
                <div>
                  <span>{t('user.project.settings.enable')}</span>
                  <SharedSwitch
                    className={styles.switch}
                    value={editMode}
                    onChange={toggleEditMode}
                  />
                </div>
                <DeprecatedTooltip
                  disabled={hasCopies}
                  message={t('user.project.customize.missingCopies')}
                  variant='dark'>
                  <SharedButton
                    className={styles.copiesButton}
                    disabled={!hasCopies}
                    variant='link'
                    onClick={toggleCopiesModal}>
                    {t('user.project.browse')}
                  </SharedButton>
                </DeprecatedTooltip>
              </div>
            </Card.Body>
            <Card.Footer className={styles.grading}>
              <ItemsToGrade
                checkinsGradingCount={checkinsToGrade}
                submissionsGradingCount={submissionsToGrade}
              />
            </Card.Footer>
          </>
        ) : (
          <>
            <Card.Header withPadding={true}>
              <Card.Title size='medium'>{t('user.project.settings.label')}</Card.Title>
            </Card.Header>
            <Card.Body withPadding={true}>
              <ItemsToGrade
                checkinsGradingCount={checkinsToGrade}
                submissionsGradingCount={submissionsToGrade}
              />
            </Card.Body>
          </>
        )}
      </Card>
      {customizeModal}
      {copiesModal}
    </>
  );
};

export default UserProjectSettings;
