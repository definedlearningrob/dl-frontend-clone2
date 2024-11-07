import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { TOpportunity } from '@dc/resources/types';

import imagePlaceholder from '@shared/assets/images/default-thumbnail.svg';
import Image from '@shared/components/Image/Image';
import { ReactComponent as EducatorIcon } from '@shared/svg/educator.svg';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { ReactComponent as GraduateIcon } from '@shared/svg/book-graduate-hat.svg';
import { ReactComponent as DeadlineIcon } from '@shared/svg/deadline.svg';
import { ReactComponent as PartnerIcon } from '@shared/svg/flag_outlined.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { formatDateTime, getPeriod } from '@shared/utils/date';
import SharedCard from '@shared/components/Card/Card';
import { Tooltip } from '@shared/components/Tooltip';
import { Kicker } from '@shared/components/Kicker';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import Link from '@shared/components/Link';
import { cx } from '@shared/utils/cx';

type Opportunity = Pick<
  TOpportunity,
  | 'imageUrl'
  | 'name'
  | 'opportunityType'
  | 'periodStart'
  | 'periodEnd'
  | 'deadline'
  | 'partner'
  | 'imageFitToContainer'
> & {
  pathways: Pick<TOpportunity['pathways'][number], 'name'>[];
  isRecommended?: boolean;
};

type Props = {
  opportunity: Opportunity;
  header?: ReactNode;
  actions: ReactNode;
};

const metadataClasses =
  'flex items-center gap-xxs xxxl:gap-xs text-font-secondary leading-lg whitespace-pre-wrap text-xxs xxxl:text-sm';

export const OpportunitySummaryCard = ({ opportunity, header, actions }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const iconSize = isFullHD ? 'base' : 'sm';

  const pathways = useMemo(
    () => opportunity.pathways.map((pathway) => pathway.name).join(', '),
    [opportunity]
  );

  if (!opportunity) {
    return null;
  }

  const isVirtualInternship = opportunity.opportunityType === OpportunityTypes.VIRTUAL_INTERNSHIP;

  const imageUrl = opportunity.imageUrl || '';
  const periodValue =
    opportunity.periodStart && opportunity.periodEnd
      ? getPeriod(opportunity.periodStart, opportunity.periodEnd)
      : 'N/A';

  const deadlineValue = opportunity.deadline ? formatDateTime(opportunity.deadline) : 'N/A';

  const imageFitToContainer = opportunity.imageFitToContainer;

  const imageWrapperClassName = cx(
    'shrink-0 grow-0 basis-[min-content] min-w-[180px] xxxl:min-w-[240px] max-h-[180px] xxxl:max-h-[240px]',
    {
      'flex justify-center': !imageFitToContainer,
      'flex items-center': imageFitToContainer,
    }
  );

  const imageClassName = cx('object-cover rounded-sm', {
    'max-w-full max-h-full m-auto': !imageFitToContainer,
    'w-full max-h-full mx-auto object-cover': imageFitToContainer,
  });

  return (
    <SharedCard className='flex gap-base p-base xxxl:p-md' dataTestId='opportunity-summary-card'>
      <div className={imageWrapperClassName}>
        <Image className={imageClassName} fallbackSrc={imagePlaceholder} src={imageUrl} />
      </div>
      <div className='flex flex-col grow gap-sm'>
        {header && <div className='flex gap-xs justify-end items-end'>{header}</div>}
        <div>
          {opportunity.isRecommended && (
            <Kicker className='!mb-xxs' size={isFullHD ? 'md' : 'sm'} variant='secondary'>
              {t('opportunities.recommended')}
            </Kicker>
          )}
          <h3 className='text-sm mb-xs xxxl:text-lg xxxl:mb-sm'>{opportunity.name}</h3>
          <div className='flex flex-col gap-xxs'>
            <div className={metadataClasses}>
              <IconContainer Icon={EducatorIcon} paddingSize='none' size={iconSize} />
              <span className='font-medium'>{t('opportunityDetails.type')}</span>
              {t(`opportunities.types.${opportunity.opportunityType}`)}
            </div>
            {!isVirtualInternship && (
              <>
                {opportunity.partner && (
                  <div className={cx(metadataClasses, 'font-medium')}>
                    <IconContainer Icon={PartnerIcon} paddingSize='none' size={iconSize} />
                    {t('opportunityDetails.partner')}
                    <Link
                      className='text-xxs xxxl:text-sm leading-lg'
                      to={`/partner/${opportunity.partner.id}`}
                      variant='link'>
                      {opportunity.partner.name}
                    </Link>
                  </div>
                )}
                <div className={metadataClasses}>
                  <IconContainer Icon={CalendarIcon} paddingSize='none' size={iconSize} />
                  <span className='font-medium'>{t('opportunityDetails.period')}</span>
                  {periodValue}
                </div>
                <div className={metadataClasses}>
                  <IconContainer Icon={DeadlineIcon} paddingSize='none' size={iconSize} />
                  <span className='font-medium'>{t('opportunityDetails.deadline')}</span>
                  {deadlineValue}
                </div>
              </>
            )}
            {isVirtualInternship && (
              <div className={metadataClasses}>
                <IconContainer Icon={GraduateIcon} paddingSize='none' size={iconSize} />
                <span className='font-medium'>{t('opportunityDetails.pathway')}</span>
                <Tooltip disabled={pathways.length === 1} message={pathways}>
                  <span className='line-clamp-1 cursor-pointer'>{pathways}</span>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
        <div>{actions}</div>
      </div>
    </SharedCard>
  );
};
