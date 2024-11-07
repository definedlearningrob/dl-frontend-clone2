import React from 'react';
import { useTranslation } from 'react-i18next';

import SharedImage from '@shared/components/Image/Image';
import { cleanInjection } from '@shared/utils/cleanInjection';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ArrowRight } from '@shared/svg/arrow_forward.svg';
import SharedCard from '@shared/components/Card/Card';

import styles from './StandardSearchResult.module.sass';

type Props = {
  course: {
    id: string;
    displayName: string;
    imageUrl: string;
    thumbnailUrl?: string;
    description: string;
  };
  onClick: (id: string) => void;
};

const StandardSearchResult = ({ course, onClick }: Props) => {
  const { id, displayName, imageUrl, thumbnailUrl, description } = course;
  const { t } = useTranslation();

  return (
    <SharedCard className={styles.courseCard}>
      <SharedCard.Header className={styles.imageWrapper}>
        <SharedImage
          alt={displayName}
          className={styles.imageBox}
          fallbackSrc={imageUrl}
          src={thumbnailUrl}
        />
      </SharedCard.Header>
      <SharedCard.Body className={styles.cardContent}>
        <h6 className={styles.title}>{displayName}</h6>
        {/* eslint-disable-next-line react/no-danger */}
        <div className={styles.description} dangerouslySetInnerHTML={cleanInjection(description)} />
        <SharedButton className={styles.descriptionLink} variant='link' onClick={() => onClick(id)}>
          {t('user.dashboard.viewProject')}
          <SharedIcon className={styles.descriptionLinkIcon} icon={<ArrowRight />} size='xs' />
        </SharedButton>
      </SharedCard.Body>
    </SharedCard>
  );
};

export default StandardSearchResult;
