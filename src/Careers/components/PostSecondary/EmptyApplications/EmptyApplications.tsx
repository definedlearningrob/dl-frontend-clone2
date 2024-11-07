import { useTranslation } from 'react-i18next';

import { ReactComponent as EmptyList } from '@shared/svg/empty_list.svg';

import styles from './EmptyApplications.module.sass';

type Props = {
  title?: string;
  text?: string;
};

export const EmptyApplications = ({ title, text }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyFavourites}>
      <EmptyList className={styles.image} />
      <h5 className={styles.heading}>
        {title || t('student.postSecondary.applicationsSection.emptyInfo')}
      </h5>
      <span className={styles.info}>
        {text || t('student.postSecondary.applicationsSection.emptyInfoDetails')}
      </span>
    </div>
  );
};
