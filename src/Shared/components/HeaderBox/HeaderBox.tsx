import React from 'react';

import { ReactComponent as ThumbnailPlaceholder } from '@dc/images/card-placeholder.svg';

import defaultThumbnail from '@shared/assets/images/default-thumbnail.svg';

import SharedCard from '../Card/Card';
import SharedImage from '../Image/Image';

import styles from './HeaderBox.module.sass';

type Props = {
  imageUrl?: string | null;
  fallbackSrc?: string;
  title: string;
  children: React.ReactNode;
  tag?: React.ReactNode;
  imageTag?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
};

export const HeaderBox = ({
  imageUrl,
  title,
  children,
  tag,
  imageTag,
  actions,
  className,
  fallbackSrc,
}: Props) => (
  <SharedCard className={className}>
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {imageTag && (
          <div className='absolute left-base top-base rounded-xs px-xs py-xxs bg-white'>
            {imageTag}
          </div>
        )}
        {imageUrl ? (
          <SharedImage
            alt={title}
            className={styles.image}
            fallbackSrc={fallbackSrc || defaultThumbnail}
            src={imageUrl}
          />
        ) : (
          <ThumbnailPlaceholder className={styles.defaultImage} />
        )}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <div>
            <div className={styles.tag}>{tag}</div>
            <SharedCard.Title className={styles.title} size='medium'>
              {title}
            </SharedCard.Title>
          </div>
          <div className={styles.actions}>{actions}</div>
        </div>
        <div className={styles.description}>{children}</div>
      </div>
    </div>
  </SharedCard>
);
