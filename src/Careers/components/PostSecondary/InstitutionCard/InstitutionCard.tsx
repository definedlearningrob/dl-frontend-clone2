import React from 'react';
import cx from 'classnames';

import SharedCard from '@shared/components/Card/Card';

import styles from './InstitutionCard.module.sass';

type Props = {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  withSections?: boolean;
};

export const InstitutionCard = ({ title, description, withSections = true, children }: Props) => (
  <SharedCard className={cx({ [styles.cardSectionsWrapper]: withSections })}>
    <div>
      <h4 className={styles.title}>{title}</h4>
      {description && <p className={styles.description}>{description}</p>}
    </div>
    {children}
  </SharedCard>
);
