import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { ReactComponent as ArrowBackward } from '@shared/svg/arrow_backward.svg';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';

import styles from './Header.module.sass';

const ExtensionEditHeader = () => {
  const { t } = useTranslation();
  const { goBack } = useHistory();

  return (
    <div className={styles.header}>
      <SharedButton variant='link' onClick={goBack}>
        <SharedIcon icon={<ArrowBackward />} size='sm' />{' '}
        <span className={styles.backText}>{t('common.actions.back')}</span>
      </SharedButton>
      <h1 className={styles.title}>{t('user.dashboard.extensionFields.settings.publication')}</h1>
      <div aria-hidden={true} className={styles.spacer}>
        Spacer
      </div>
    </div>
  );
};

export default ExtensionEditHeader;
