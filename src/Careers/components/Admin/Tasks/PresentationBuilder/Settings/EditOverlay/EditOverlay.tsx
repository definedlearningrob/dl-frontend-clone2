import { useTranslation } from 'react-i18next';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';
import { ReactComponent as ShareIcon } from '@shared/assets/icons/shared_slide.svg';

import styles from './EditOverlay.module.sass';

function AdminTasksPresentationBuilderSettingsEditOverlay() {
  const { t } = useTranslation();

  return (
    <div className={styles.overlay}>
      <div className={styles.infoContainer}>
        <div className={styles.combinedIcon}>
          <SharedIcon className={styles.sharedIcon} icon={<ShareIcon />} size='lg' />
          <SharedIcon className={styles.infoIcon} icon={<InfoIcon />} size='sm' />
        </div>
        <span className={styles.header}>{t('admin.tasks.presentation.editDisabledHeader')}</span>
        <span className={styles.info}>{t('admin.tasks.presentation.editDisabledInfo')}</span>
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderSettingsEditOverlay;
