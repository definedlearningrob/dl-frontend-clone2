import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { castArray, isEmpty } from 'lodash-es';

import { ReactComponent as EmptyArea } from '@pbl/images/empty_folder.svg';

import SharedCard from '@shared/components/Card/Card';
import SharedIcon from '@shared/components/Icon/Icon';

import CourseDetailsCardContent, { Props as ContentProps } from '../CourseDetailsCardContent';

import styles from './CourseDetailsCard.module.sass';

type NullableKeys<T extends { data: unknown }, Keys extends keyof T> = {
  [K in keyof T]: K extends Keys ? T[K] | null : T[K];
};

type Props = {
  title: string;
  icon: React.ReactNode;
  contentProps: NullableKeys<ContentProps, 'data'>;
};

const CourseDetailsCard = ({ icon: Icon, title, contentProps }: Props) => {
  const { t } = useTranslation();

  const isDataEmpty = useMemo(() => {
    if (isEmpty(contentProps.data)) {
      return true;
    }

    return (
      contentProps.variant === 'listWithTitle' &&
      castArray(contentProps.data!).every(({ elements }) => isEmpty(elements))
    );
  }, [contentProps]);

  if (isDataEmpty) {
    return (
      <SharedCard className={styles.emptyCard}>
        <EmptyArea className={styles.emptyCardImage} />
        <h6 className={styles.cardTitle}>{t('courseDetails.emptyArea', { area: title })}</h6>
        <p className={styles.cardContent}>{t('courseDetails.noDataInSection')}</p>
      </SharedCard>
    );
  }

  return (
    <SharedCard className={styles.card}>
      <SharedCard.Header className={styles.cardHeader}>
        <div className={styles.cardIconWrapper}>
          <SharedIcon className={styles.cardIcon} icon={Icon} size='sm' />
        </div>
        <SharedCard.Title className={styles.cardTitle} size='small'>
          {title}
        </SharedCard.Title>
      </SharedCard.Header>
      <SharedCard.Body className={styles.cardContent}>
        <CourseDetailsCardContent {...(contentProps as ContentProps)} />
      </SharedCard.Body>
    </SharedCard>
  );
};

export default CourseDetailsCard;
