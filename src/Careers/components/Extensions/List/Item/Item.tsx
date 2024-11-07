import cx from 'classnames';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type TExtensionField } from '@dc/graphql/user/queries/extensionFields';

import SharedIcon from '@shared/components/Icon/Icon';
import SharedButton from '@shared/components/Button/Button';
import SharedAvatar from '@shared/components/Avatar/Avatar';
import SharedDropdown from '@shared/components/Dropdown/Dropdown';
import { ReactComponent as ArrowForward } from '@shared/svg/arrow_forward.svg';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';

import ExtensionFieldArchiveModal from '../../ArchiveModal/ArchiveModal';

import styles from './Item.module.sass';

type Props = {
  extension: TExtensionField;
  onShowMore: (extension: TExtensionField) => void;
};

const ExtensionsListItem = ({ extension, onShowMore }: Props) => {
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();

  const isArchived = !!extension.archivedAt;

  const parseDate = (date: string) => dayjs(date).format('MM.DD.YYYY');

  const parsedUser = {
    firstName: extension.author.firstName,
    lastName: extension.author.lastName,
  };

  const sources = [...extension.clusters, ...extension.pathways, ...extension.courses];

  const hasDetails = extension.publishedFrom && sources.length > 0;

  const parsedSources = sources.length > 5 ? sources.slice(0, 5) : sources;
  const shouldShowMore = sources.length > 5;

  const toggleModalVisibility = () => setArchiveModalOpen(!isArchiveModalOpen);

  const onArchive = () => {
    if (isArchived) {
      history.push(`/extensions/${extension.id}`);
    } else {
      toggleModalVisibility();
    }
  };

  const renderPublishedIn = () =>
    sources.length > 0 ? (
      <p>
        <span>{t('user.dashboard.extensionFields.publishedIn')}: </span>
        {parsedSources.map((source, index) => (
          <span key={`${source.id}_${source.name}`}>
            <a key={`${source.name}_${source.id}`} className={styles.publishedInItem}>
              {source.name}
            </a>
            {index < parsedSources.length - 1 && <span>, </span>}
          </span>
        ))}
        {shouldShowMore && (
          <SharedButton
            className={styles.showMore}
            variant='link'
            onClick={() => onShowMore(extension)}>
            {t('user.dashboard.extensionFields.showMore')}
          </SharedButton>
        )}
      </p>
    ) : (
      <p>{t('user.dashboard.extensionFields.notPublished')}</p>
    );

  const renderDates = () =>
    extension.publishedFrom ? (
      <span className={styles.dates}>
        {parseDate(extension.publishedFrom)} -{' '}
        {extension.publishedTo
          ? parseDate(extension.publishedTo)
          : t('user.dashboard.extensionFields.settings.dateNotSet')}
      </span>
    ) : (
      <span className={styles.dates}>{t('user.dashboard.extensionFields.noDate')}</span>
    );

  const openConfirmationModal = () => toggleModalVisibility();

  const archiveText = isArchived ? t('common.actions.unarchive') : t('common.actions.archive');

  const archiveClasses = cx(extension.archivedAt ? styles.unarchiveAction : styles.archiveAction);

  const statusClasses = cx(
    styles.status,
    extension.status === 'DRAFT' ? styles.statusDraft : styles.statusPublished,
    extension.archivedAt && styles.statusArchived
  );

  const statusText = extension.archivedAt
    ? t('user.dashboard.extensionFields.statusArchived')
    : extension.status;

  const redirectToExtension = () => {
    history.push(`/extensions/${extension.id}`);
  };

  const redirectToExtensionPublication = () => {
    history.push(`/extensions/${extension.id}/edit`);
  };

  return (
    <li aria-labelledby='test' className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerDetails}>
          <SharedAvatar className={styles.avatar} size='20' user={parsedUser} />
          <h3 className={styles.username}>{extension.author.username}</h3>
        </div>
        <div className={styles.headerRight}>
          <span className={statusClasses}>{statusText}</span>
          <SharedDropdown>
            <SharedDropdown.Dropdown>
              <SharedDropdown.Trigger className={styles.trigger} />
              <SharedDropdown.Options>
                {!isArchived && (
                  <SharedDropdown.Option onClick={redirectToExtensionPublication}>
                    {hasDetails
                      ? t('user.dashboard.extensionFields.settings.publication')
                      : t('user.dashboard.extensionFields.settings.publishExtension')}
                  </SharedDropdown.Option>
                )}
                <SharedDropdown.Option className={archiveClasses} onClick={openConfirmationModal}>
                  {archiveText}
                </SharedDropdown.Option>
              </SharedDropdown.Options>
            </SharedDropdown.Dropdown>
          </SharedDropdown>
        </div>
      </header>
      <h2 className={styles.title} id='test'>
        {extension.name}
      </h2>
      <section>
        {renderPublishedIn()}
        <div className={styles.calendarRow}>
          <SharedIcon icon={<CalendarIcon />} size='sm' />
          {renderDates()}
        </div>
      </section>
      <footer className={styles.footer}>
        <SharedButton className={styles.detailsButton} variant='link' onClick={redirectToExtension}>
          <span>{t('user.dashboard.extensionFields.viewDetails')}</span>
          <SharedIcon className={styles.arrowButton} icon={<ArrowForward />} size='xs' />
        </SharedButton>
      </footer>
      <ExtensionFieldArchiveModal
        id={extension.id}
        isArchived={isArchived}
        isOpen={isArchiveModalOpen}
        name={extension.name}
        onDismiss={onArchive}
      />
    </li>
  );
};

export default ExtensionsListItem;
