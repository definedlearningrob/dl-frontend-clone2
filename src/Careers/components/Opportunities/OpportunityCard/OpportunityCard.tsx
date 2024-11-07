import cx from 'classnames';
import isEmpty from 'lodash-es/isEmpty';
import { Link, useLocation } from 'react-router-dom';
import { MouseEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationStatus, OpportunityTypes, Partner } from '@graphql/dc/shared/types';

import { useAddOpportunityToFavorites } from '@dc/graphql/student/hooks/useAddOpportunityToFavorites';
import { useRemoveOpportunityFromFavorites } from '@dc/graphql/student/hooks/useRemoveOpportunitiesFromFavorites';
import { TPathway, TVirtualInternship } from '@dc/resources/types';
import { VirtualInternshipCardContent } from '@dc/components/Opportunities/OpportunityCard/VirtualInternshipCardContent';
import { RegularCardContent } from '@dc/components/Opportunities/OpportunityCard/RegularCardContent';
import { getOpportunityBadgeType } from '@dc/components/Opportunities/helpers';

import { InterestedButton } from '@shared/components/InterestedButton/InterestedButton';
import { ReactComponent as ChevronIcon } from '@shared/assets/icons/chevron_right.svg';
import { ReactComponent as EducatorIcon } from '@shared/assets/icons/educator.svg';
import { ReactComponent as PartnerIcon } from '@shared/svg/flag_outlined.svg';
import { getIsExpired } from '@shared/utils/date';
import { Kicker } from '@shared/components/Kicker';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Badge } from '@shared/components/Badge/Badge';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Image from '@shared/components/Image/Image';
import { useIsTruncated } from '@shared/hooks/useIsTruncated';
import { Tooltip } from '@shared/components/Tooltip';

import { applicationStatusesKeyMap, applicationViewStatusesKeyMap } from './helpers';
import styles from './OpportunityCard.module.sass';

type VirtualInternship = Pick<TVirtualInternship, 'roadmapItemsCount'> & {
  readinessSkillsLessons: Pick<TVirtualInternship['readinessSkillsLessons'][number], 'id'>[];
  status?: TVirtualInternship['status'];
};

type Props = {
  applicationStatus?: ApplicationStatus | null;
  className?: string;
  deadline: string | null;
  id: string;
  imageUrl?: string | null;
  isFavorite?: boolean;
  isRecommended?: boolean;
  name: string;
  opportunityType: OpportunityTypes | undefined;
  orientation?: 'vertical' | 'horizontal';
  periodEnd: string | null;
  periodStart: string | null;
  virtualInternship?: VirtualInternship | null;
  isReadOnly?: boolean;
  pathways: Pick<TPathway, 'name' | 'id'>[];
  hasPendingApplications?: boolean;
  viewMode?: 'student' | 'user';
  partner?: Pick<Partner, 'id' | 'name'> | null;
  imageFitToContainer?: boolean;
};

export const OpportunityCard = ({
  applicationStatus,
  className,
  deadline,
  id,
  imageUrl,
  isFavorite,
  isRecommended,
  name,
  opportunityType,
  orientation = 'vertical',
  partner,
  periodEnd,
  periodStart,
  virtualInternship,
  isReadOnly,
  pathways,
  hasPendingApplications,
  viewMode = 'student',
  imageFitToContainer = true,
}: Props) => {
  const location = useLocation();
  const [addOpportunityToFavorites] = useAddOpportunityToFavorites();
  const [removeOpportunityFromFavorites] = useRemoveOpportunityFromFavorites();
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const nameRef = useRef<HTMLHeadingElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null);

  const isNameTruncated = useIsTruncated({ ref: nameRef });
  const isPartnerTruncated = useIsTruncated({
    ref: partnerRef,
    mode: 'single-line',
  });

  const isVirtualInternship =
    opportunityType === OpportunityTypes.VIRTUAL_INTERNSHIP && !isEmpty(virtualInternship);
  const isUserViewMode = viewMode === 'user';

  const applicationStatusKey = applicationStatus && applicationStatusesKeyMap[applicationStatus];
  const virtualInternshipStatusKey =
    virtualInternship?.status && applicationViewStatusesKeyMap[virtualInternship?.status];
  const handleToggleOpportunityAsFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isReadOnly) {
      isFavorite ? removeOpportunityFromFavorites({ id }) : addOpportunityToFavorites({ id });
    }
  };

  const isExpired =
    getIsExpired(periodEnd) && (applicationStatus === ApplicationStatus.PENDING || isUserViewMode);

  const hasBadge = applicationStatusKey || isExpired;
  const statusKey = isExpired ? 'expired' : applicationStatusKey;

  const statusBadgeText = isVirtualInternship
    ? t(`opportunities.virtualInternshipStatus.${virtualInternshipStatusKey}`)
    : statusKey && t(`opportunities.status.${statusKey}`);

  const badgeSize = isFullHD ? 'base' : 'small';
  const statusToPass = isVirtualInternship ? ApplicationStatus.ACCEPTED : applicationStatus;
  const badgeType = getOpportunityBadgeType(
    isExpired ? 'EXPIRED' : statusToPass,
    virtualInternship?.status
  );

  const hasFavoriteButton = !isUserViewMode && isFavorite !== undefined;
  const hasKicker = isRecommended || hasPendingApplications;
  const studentFooterText =
    applicationStatus === ApplicationStatus.STARTED
      ? t('opportunities.continue')
      : t('opportunities.learnMore');

  const isHorizontalCard = orientation === 'horizontal';

  const footerClassName = cx(styles.footer, {
    '!bg-white !border-none ': isHorizontalCard,
    'px-sm py-x': !isHorizontalCard,
  });

  const imageWrapperWrapperClassName = cx('relative', {
    'w-[120px] xxxl:w-[180px]': isHorizontalCard,
  });

  const imageWrapperClassName = cx(
    'rounded-t-sm overflow-hidden shrink-0 grow-0',
    'before:absolute before:bg-neutral-800/[32%] before:inset-0',
    'before:group-focus-visible/card:!bg-neutral-800/[16%]',
    'before:group-hover/card:!bg-neutral-800/[16%]',
    'aspect-[2.45/1] xxxl:aspect-[2.54/1]',
    {
      'rounded-sm absolute inset-0': isHorizontalCard,
      relative: !isHorizontalCard,
      'w-full h-full': !imageFitToContainer && isHorizontalCard,
      'flex items-center w-full h-full': imageFitToContainer && isHorizontalCard,
    }
  );

  const imageClassName = cx({
    'h-full mx-auto object-cover': !imageFitToContainer,
    'object-cover w-full h-full': imageFitToContainer && !isHorizontalCard,
    'w-full': imageFitToContainer && isHorizontalCard,
  });

  const cardBodyClassName = cx(styles.body, {
    'p-x xxxl:p-sm': !isHorizontalCard,
    'mb-xxs xxxl:mb-xs': isHorizontalCard,
  });

  const cardClassName = cx(
    'bg-white rounded-sm border border-neutral-300 text-font-primary transition-[box-shadow]',
    'hover:shadow-300 hover:text-font-primary group/card',
    'focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-500',
    styles.card,
    applicationStatusKey && !isVirtualInternship && styles[applicationStatusKey],
    virtualInternshipStatusKey && styles[virtualInternshipStatusKey],
    className,
    {
      'flex p-xs xxxl:p-x gap-x xxxl:gap-sm shrink-0 min-h-[104px] xxxl:min-h-[136px]':
        isHorizontalCard,
      [styles.verticalCard]: orientation === 'vertical',
      [styles.expired]: isExpired,
    }
  );

  const headerClassName = cx('flex justify-between gap-xxs', {
    'mb-x xxxl:mb-sm': !isHorizontalCard,
    'mb-xxs xxxl:mb-xs': isHorizontalCard,
  });

  const hasPartner = !!partner?.name;

  return (
    <Link
      aria-label={name}
      className={cardClassName}
      to={{
        pathname: isReadOnly ? location.pathname : `/opportunities/${id}`,
        state: { from: location.pathname },
      }}>
      <div className={imageWrapperWrapperClassName}>
        <div className={imageWrapperClassName}>
          {hasFavoriteButton && (
            <InterestedButton
              className={styles.favoriteButton}
              isSelected={isFavorite}
              onClick={handleToggleOpportunityAsFavorite}
            />
          )}
          <Image alt={name} className={imageClassName} src={imageUrl} />
        </div>
      </div>
      <div className={styles.cardContent}>
        <section className={cardBodyClassName}>
          <div className={headerClassName}>
            <div>
              {hasKicker && (
                <Kicker className='!mb-xxs' size='sm' variant='secondary'>
                  {t(
                    isRecommended
                      ? 'opportunities.recommended'
                      : 'opportunities.pendingApplications'
                  )}
                </Kicker>
              )}
              <Tooltip disabled={!isNameTruncated} message={name}>
                <h6 ref={nameRef} className='line-clamp-2 text-xs mb-0 whitespace-break-spaces'>
                  {name}
                </h6>
              </Tooltip>
            </div>
            {hasBadge && (
              <Badge className='whitespace-nowrap self-start' size={badgeSize} type={badgeType}>
                {statusBadgeText}
              </Badge>
            )}
          </div>
          <span className={styles.metadata}>
            <IconContainer
              Icon={EducatorIcon}
              className='text-font-secondary mr-xxs xxxl:mr-xs'
              paddingSize='none'
              size='sm'
            />
            <span className={styles.metadataLabel}>{t('opportunities.type')}</span>
            {opportunityType
              ? t(`opportunities.types.${opportunityType}`)
              : t('opportunities.notSelected')}
          </span>
          {hasPartner && (
            <div className={styles.metadata}>
              <Tooltip
                className='min-w-0 flex'
                disabled={!isPartnerTruncated}
                message={partner?.name}>
                <IconContainer
                  Icon={PartnerIcon}
                  className='text-font-secondary mr-xxs xxxl:mr-xs'
                  paddingSize='none'
                  size='sm'
                />
                <div className={styles.metadataLabel}>{t('opportunities.partner')}</div>
                <div ref={partnerRef} className='truncate'>
                  {partner?.name}
                </div>
              </Tooltip>
            </div>
          )}
          {isVirtualInternship ? (
            <VirtualInternshipCardContent
              readinessSkillsLessons={virtualInternship.readinessSkillsLessons}
              roadmapItemsCount={virtualInternship.roadmapItemsCount}
            />
          ) : (
            <RegularCardContent
              deadline={deadline}
              pathways={pathways}
              periodEnd={periodEnd}
              periodStart={periodStart}
            />
          )}
        </section>
        <div className={footerClassName}>
          {isUserViewMode ? t('opportunities.viewMore') : studentFooterText}
          <IconContainer Icon={ChevronIcon} paddingSize='none' size='sm' />
        </div>
      </div>
    </Link>
  );
};
