import { useTranslation } from 'react-i18next';

import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import SharedIcon from '@shared/components/Icon/Icon';

import styles from './StandardSearchInfo.module.sass';

export const StandardSearchInfo = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <SharedIcon className={styles.icon} icon={<InfoIcon />} size='sm' />
      </div>
      <p className={styles.text}>{t('user.standardSearch.info')}</p>
    </div>
  );
};
