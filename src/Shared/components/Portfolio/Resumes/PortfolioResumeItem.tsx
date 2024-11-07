import { useTranslation } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { formatDateTime } from '@shared/utils/date';
import { ReactComponent as CalendarIcon } from '@shared/assets/icons/calendar.svg';
import { ResumeItemAttributes } from '@shared/resources/types';
import { TPortfolioProject } from '@shared/components/Portfolio/types';
type Props = {
  portfolioDetail: ResumeItemAttributes | TPortfolioProject;
};

export const PortfolioResumeItem = ({ portfolioDetail }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='text-xs xxxl:text-sm text-neutral-700 pl-xs pb-sm xxxl:pb-base last:pb-0'>
      <div className='flex gap-xs items-center pb-xs'>
        <p className='mb-0 text-neutral-800 font-medium'>{portfolioDetail.name}</p>
        <div className='h-xxs w-xxs bg-neutral-300 rounded-lg' />
        <div className='flex items-center gap-xxs whitespace-nowrap'>
          <IconContainer
            Icon={CalendarIcon}
            className='text-neutral-700'
            paddingSize='none'
            size='sm'
          />
          <p className='mb-0'>
            {'startedAt' in portfolioDetail &&
              formatDateTime(portfolioDetail?.startedAt, { dateFormat: 'MMM YYYY' })}
          </p>
          {'endedAt' in portfolioDetail && (
            <p className='mb-0'>
              {`- ${
                (portfolioDetail?.endedAt &&
                  formatDateTime(portfolioDetail.endedAt, { dateFormat: 'MMM YYYY' })) ||
                t('portfolio.present')
              }`}
            </p>
          )}
        </div>
      </div>
      <p className='mb-0 ml-sm text-xxs xxxl:text-xs'>{portfolioDetail.description}</p>
    </div>
  );
};
