import React from 'react';
import cx from 'classnames';
import { ApplicationStatus } from '@graphql/dc/shared/types';
import { VirtualInternshipStatuses } from '@graphql/dc/students/types';

import { getOpportunityBadgeType } from '@dc/components/Opportunities/helpers';

import imagePlaceholder from '@shared/assets/images/default-thumbnail.svg';
import Image from '@shared/components/Image/Image';
import Card from '@shared/components/Card/Card';
import { Badge } from '@shared/components/Badge/Badge';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import styles from './VirtualInternshipHeader.module.sass';

type Props = {
  status?: VirtualInternshipStatuses;
  imageUrl?: string | null;
  title: string;
  children: React.ReactNode;
  tag?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  imageWrapperClassName?: string;
  actions?: React.ReactNode;
};

export const VirtualInternshipHeader = ({
  imageUrl,
  title,
  children,
  status,
  tag,
  actions,
  className,
  titleClassName,
}: Props) => {
  const titleClass = cx('mb-xs text-sm xxxl:text-lg', titleClassName);
  const badgeType = getOpportunityBadgeType(ApplicationStatus.ACCEPTED, status);
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  return (
    <Card className={className}>
      <div className='flex flex-wrap gap-base xl:flex-nowrap'>
        <div className={styles.imageWrapper}>
          <Image
            alt={title}
            className='w-full h-full object-cover'
            fallbackSrc={imagePlaceholder}
            src={imageUrl || ''}
          />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <div className='flex flex-col gap-sm items-start'>
              {status && (
                <Badge size={isFullHD ? 'base' : 'small'} type={badgeType}>
                  {tag}
                </Badge>
              )}
              <Card.Title className={titleClass} size='medium'>
                {title}
              </Card.Title>
            </div>
            <div className={styles.actions}>{actions}</div>
          </div>
          <div className={styles.description}>{children}</div>
        </div>
      </div>
    </Card>
  );
};
