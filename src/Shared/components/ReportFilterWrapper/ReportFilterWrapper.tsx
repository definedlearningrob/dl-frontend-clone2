import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PlayIcon } from '@shared/svg/play.svg';
import SharedCard from '@shared/components/Card/Card';
import SharedImage from '@shared/components/Image/Image';
import Link from '@shared/components/Link';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { Tooltip } from '../Tooltip';

type Props = {
  children: ReactNode;
  onFilterApply: () => void;
  isSubmitEnabled: boolean;
  reportImageSrc: string;
  reportName: string;
  filterInstruction: string;
  redirectTo: string;
};

export const ReportFilterWrapper = ({
  children,
  onFilterApply,
  isSubmitEnabled,
  reportImageSrc,
  reportName,
  filterInstruction,
  redirectTo,
}: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  return (
    <SharedCard className='h-full'>
      <div className='flex gap-2lg h-full'>
        <div className='relative w-[320px] xxxl:w-[520px] self-stretch'>
          <SharedImage
            className='w-full h-full object-cover rounded-sm bg-gradient-neutral'
            src={reportImageSrc}
          />
          <div className='bg-gradient-neutral absolute inset-0 rounded-sm' />
        </div>
        <div className='flex flex-col flex-1'>
          <h2 className='text-base xxxl:text-2lg mb-xs xxxl:mb-sm'>{reportName}</h2>
          <p className='text-xs xxxl:text-sm mb-sm xxxl:mb-base'>{filterInstruction}</p>
          {children}
          <Tooltip
            className='block w-fit'
            disabled={isSubmitEnabled}
            message={t('reports.fillAllRequiredInputs')}>
            <Link
              Icon={PlayIcon}
              className='self-start'
              disabled={!isSubmitEnabled}
              size={isFullHD ? 'lg' : 'md'}
              to={redirectTo}
              variant='primary'
              onClick={onFilterApply}>
              {t('reports.generateReport')}
            </Link>
          </Tooltip>
        </div>
      </div>
    </SharedCard>
  );
};
