import { useTranslation } from 'react-i18next';

import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';

import styles from './GradingHeader.module.sass';

type GradingContentHeaderProps = {
  itemName: string;
  projectName: string;
  type: GRADING_ITEM_TYPES;
};

const GradingContentHeader = ({ itemName, projectName, type }: GradingContentHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header>
      <h2 className={styles.subHeading}>{projectName}</h2>
      <h1 className={styles.heading}>{t(`user.grading.${type}_HEADER`, { name: itemName })}</h1>
    </header>
  );
};

export default GradingContentHeader;
