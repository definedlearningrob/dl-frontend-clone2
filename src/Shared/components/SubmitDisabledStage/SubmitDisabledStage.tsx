import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';

import styles from './SubmitDisabledStage.module.sass';

type Props = {
  type: string;
  className?: string;
};

export const SubmitDisabledStage = ({ type, className }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={cx(className, styles.infoWrapper)}>
      <div className={styles.iconFrame}>
        <SharedIcon className={styles.icon} icon={<InfoIcon />} size='xs' />
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.info}>{t('components.checkIns.cantSubmitInfoTitle', { type })}</p>
        <p className={styles.info}>
          {t('components.checkIns.cantSubmitInfoDescription', { type })}
        </p>
      </div>
    </div>
  );
};
