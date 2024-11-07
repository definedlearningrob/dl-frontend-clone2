import { useTranslation } from 'react-i18next';
import { times } from 'lodash-es';

import { MainContent } from '@shared/components/MainContent/MainContent';
import SharedCard from '@shared/components/Card/Card';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { Kicker } from '@shared/components/Kicker';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as ArrowDownIcon } from '@shared/svg/arrow_downward.svg';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';

export const TrackSkeleton = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  return (
    <MainContent className='flex gap-base xxxl:gap-md pt-xs xxxl:pt-sm'>
      <div className='flex-1 flex flex-col gap-base xxxl:gap-md' data-testid='track-skeleton'>
        <SharedCard className='flex gap-base xxxl:gap-md'>
          <SkeletonRectangle
            className='!h-[120px] xxxl:!h-[180px] !w-[213px] xxxl:!w-[320px]'
            radius='sm'
          />
          <div className='flex-1 flex flex-col gap-sm'>
            <div className='flex flex-col gap-xs'>
              <div className='flex gap-xs xxxl:gap-sm'>
                <SkeletonRectangle className='!h-[26px] !w-[120px]' />
                <SkeletonRectangle className='!h-[26px] !w-[120px]' />
              </div>
              <SkeletonRectangle height='tiny' size='md' />
            </div>
            <div className='flex flex-col gap-xxs'>
              <SkeletonRectangle className='!h-x !p-0' size='full-width' />
              <SkeletonRectangle className='!h-x !p-0' size='full-width' />
              <SkeletonRectangle className='!h-x !p-0' size='sm' />
            </div>
          </div>
        </SharedCard>

        <SharedCard>
          <div className='flex gap-base mb-base'>
            <SkeletonRectangle
              className='!h-[80px] xxxl:!h-[124px] !w-[142px] xxxl:!w-[220px]'
              radius='sm'
            />
            <div className='flex-1'>
              <Kicker size={isFullHD ? 'md' : 'sm'}>
                {t('catalogs.track.unitWithNumber', { number: 1 })}
              </Kicker>
              <SkeletonRectangle className='mb-xs xxxl:mb-sm' height='tiny' size='md' />
              <div className='flex flex-col gap-xxs'>
                <SkeletonRectangle className='!h-x xxxl:!h-[14px] !p-0' size='full-width' />
                <SkeletonRectangle className='!h-x xxxl:!h-[14px] !p-0' size='full-width' />
                <SkeletonRectangle className='!h-x xxxl:!h-[14px] !p-0' size='sm' />
              </div>
            </div>
          </div>
          <div>
            <div className='flex gap-sm items-center after:block after:w-full after:h-[1px] after:bg-neutral-300'>
              <SkeletonRectangle className='!h-[14px] !p-0 !w-[150px]' />
            </div>
            <div className='grid grid-cols-2 xxxl:grid-cols-3 gap-sm pt-sm'>
              {times(6, (index) => (
                <SkeletonRectangle
                  key={index}
                  className='!h-[300px] xxxl:!h-[410px]'
                  radius='sm'
                  size='full-width'
                />
              ))}
            </div>
          </div>
        </SharedCard>
      </div>

      <SharedCard
        className='basis-[318px] xxxl:basis-[512px] grow-0 shrink-0 h-fit'
        withoutPadding={true}>
        <div className='p-base pb-sm xxxl:p-md'>
          <h5 className='text-sm xxxl:text-base mb-0'>{t('catalogs.track.unitOutlineContent')}</h5>
        </div>
        <div className='flex flex-col gap-md xxxl:gap-lg p-base xxxl:p-md !pt-0'>
          <div className='flex flex-col gap-xs xxxl:gap-sm'>
            <div className='flex gap-xs'>
              <IconContainer
                Icon={ArrowDownIcon}
                className='bg-neutral-200 rounded-sm text-primary-500'
                size={isFullHD ? 'base' : 'sm'}
              />
              <div className='flex-1'>
                <Kicker
                  className='!mb-xxs xxxl:!mb-xs'
                  size={isFullHD ? 'md' : 'sm'}
                  variant='dark'>
                  {t('catalogs.track.unitWithNumber', { number: 1 })}
                </Kicker>
                <SkeletonRectangle className='!h-[14px] xxxl:!h-sm !p-0' size='lg' />
              </div>
            </div>
            <div className='pt-xs px-base xxxl:px-md flex flex-col gap-xs xxxl:gap-x'>
              {times(6, (index) => (
                <div key={index} className='flex items-center gap-xs'>
                  <IconContainer
                    Icon={ChevronRightIcon}
                    className='rounded-xs bg-primary-200 text-primary-500'
                    paddingSize='xxs'
                    size='sm'
                  />
                  <SkeletonRectangle className='!h-[12px] xxxl:!h-[14px] !p-0' size='full-width' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SharedCard>
    </MainContent>
  );
};
