import cx from 'classnames';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UPDATE_EXTENSION_STATUS, {
  type TUpdateExtensionData,
  type TUpdateExtensionVariables,
} from '@dc/graphql/user/mutations/updateExtensionFieldStatus';
import { type TExtensionField } from '@dc/graphql/user/queries/extensionField';

import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';

import ExtensionsModal from '../Modal/Modal';
import ExtensionFieldArchiveModal from '../ArchiveModal/ArchiveModal';

import styles from './Settings.module.sass';
type TSource = {
  id: string;
  name: string;
};

type Props = {
  extension: TExtensionField;
};

type TStatus = 'DRAFT' | 'PUBLISHED';

const ExtensionsSettings = ({ extension }: Props) => {
  const [updateExtensionStatus, { loading }] = useMutation<
    TUpdateExtensionData,
    TUpdateExtensionVariables
  >(UPDATE_EXTENSION_STATUS);
  const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const isArchived = !!extension.archivedAt;

  const getAllSources = (clusters: TSource[], courses: TSource[], pathways: TSource[]) => {
    const sources = [
      ...clusters.map((cluster) => ({ ...cluster, type: 'cluster' as const })),
      ...courses.map((course) => ({ ...course, type: 'course' as const })),
      ...pathways.map((pathway) => ({ ...pathway, type: 'pathway' as const })),
    ];

    return sources.length ? sources : null;
  };

  const sources = getAllSources(extension.clusters, extension.courses, extension.pathways);

  const hasDetails = extension.publishedFrom && sources;

  const statusStyles = cx(
    styles.status,
    extension.status === 'DRAFT' ? styles.draft : styles.published,
    extension.archivedAt && styles.archivedStatus
  );

  const statusText = extension.archivedAt
    ? t('user.dashboard.extensionFields.statusArchived')
    : extension.status;

  const statusButtonStyles = cx(
    styles.button,
    extension.status === 'DRAFT' ? styles.draftButton : styles.publishedButton
  );
  const statusButtonText =
    extension.status === 'DRAFT'
      ? t('user.dashboard.extensionFields.settings.publish')
      : t('user.dashboard.extensionFields.settings.unpublish');

  const parseDate = (date: string) => dayjs(date).format('MM.DD.YYYY');

  const toggleArchiveModal = () => setArchiveModalOpen(!isArchiveModalOpen);

  const toggleSettingsModal = () => setModalOpen((open) => !open);

  const handleProjectStatusChange = () => {
    const newStatus: TStatus = extension.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT';

    updateExtensionStatus({
      variables: {
        input: {
          id,
          status: newStatus,
        },
      },
    });
  };

  const handleProjectEditNavigation = () => {
    history.push(`/extensions/${id}/edit`);
  };

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{t('user.dashboard.extensionFields.settings.title')}</h2>
        <div className={styles.headerRight}>
          <div className={styles.statusText}>
            {t('user.dashboard.extensionFields.settings.statusLabel')}
          </div>
          <div className={statusStyles}>{statusText}</div>
        </div>
      </header>

      {!hasDetails && (
        <p className={styles.placeholderText}>
          {t('user.dashboard.extensionFields.settings.noDataPlaceholder')}
        </p>
      )}

      {sources && (
        <>
          <h3 className={styles.lowerHeading}>{t('user.dashboard.extensionFields.publishedIn')}</h3>
          <p>
            {sources?.map((source) => (
              <SharedButton
                key={`${source.id}+${source.name}`}
                className={styles.link}
                variant='link'>
                {source.name}
              </SharedButton>
            ))}
          </p>
        </>
      )}

      {extension.publishedFrom && (
        <>
          <h3 className={styles.lowerHeading}>
            {t('user.dashboard.extensionFields.settings.date')}
          </h3>
          <div className={styles.calendarRow}>
            <SharedIcon icon={<CalendarIcon />} size='sm' />
            <span className={styles.dates}>
              {parseDate(extension.publishedFrom)} -{' '}
              {extension.publishedTo
                ? parseDate(extension.publishedTo)
                : t('user.dashboard.extensionFields.settings.dateNotSet')}
            </span>
          </div>
        </>
      )}

      <footer className={styles.footer}>
        {hasDetails && !extension.archivedAt && (
          <SharedButton
            className={statusButtonStyles}
            isLoading={loading}
            variant='primary'
            onClick={handleProjectStatusChange}>
            {statusButtonText}
          </SharedButton>
        )}
        {!extension.archivedAt && (
          <SharedButton
            className={styles.button}
            variant='primary'
            onClick={handleProjectEditNavigation}>
            {hasDetails
              ? t('user.dashboard.extensionFields.settings.publication')
              : t('user.dashboard.extensionFields.settings.publishExtension')}
          </SharedButton>
        )}
        {extension.archivedAt && (
          <SharedButton
            className={cx(styles.unarchive, styles.button)}
            variant='danger'
            onClick={() => toggleArchiveModal()}>
            {t('common.actions.unarchive')}
          </SharedButton>
        )}
        <div className={styles.editRow}>
          <SharedButton
            className={styles.button}
            variant='primary-outlined'
            onClick={toggleSettingsModal}>
            {t('user.dashboard.extensionFields.settings.editExtension')}
          </SharedButton>
          {!extension.archivedAt && (
            <DeprecatedIconButton
              className={styles.archiveButton}
              icon={<DeleteIcon />}
              size='sm'
              square={true}
              onClick={() => toggleArchiveModal()}
            />
          )}
        </div>
      </footer>
      <ExtensionsModal extension={extension} isOpen={isModalOpen} onDismiss={toggleSettingsModal} />
      <ExtensionFieldArchiveModal
        id={extension.id}
        isArchived={isArchived}
        isOpen={isArchiveModalOpen}
        name={extension.name}
        redirectToList={!isArchived}
        onDismiss={toggleArchiveModal}
      />
    </div>
  );
};

export default ExtensionsSettings;
