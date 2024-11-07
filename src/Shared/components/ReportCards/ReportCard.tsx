import React, { FC, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/Card/Card';
import SharedImage from '@shared/components/Image/Image';
import { ReactComponent as ChevronRight } from '@shared/assets/icons/chevron_right.svg';
import ViewButton from '@shared/components/ViewButton/ViewButton';
import { cx } from '@shared/utils/cx';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { REPORT_PATHS } from '@shared/resources/constants';
import { ReportType } from '@shared/resources/enums';

type Props = {
  title: string;
  description: string;
  isBig?: boolean;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  image?: string;
  type: ReportType;
};

export const ReportCard = ({ title, description, image, isBig = false, Icon, type }: Props) => {
  const isDesktop = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const iconSize = isDesktop ? 'xl' : 'lg';

  const cardClassname = cx(
    'flex border border-neutral-200 !p-sm xxxl:!p-base group h-full transition-colors',
    'hover:bg-primary-200 hover:border hover:border-primary-500 focus:outline-1 focus:outline-primary-500 focus:outline-offset-1',
    {
      'gap-base xxxl:gap-md items-center': isBig,
      '!p-x flex-col': !isBig,
    }
  );

  const imageWrapperClassname = cx('rounded-sm overflow-hidden shrink-0 relative', {
    'h-[168px] w-[168px] xxxl:h-[270px] xxxl:w-[270px]': isBig,
    'mb-sm': !isBig,
  });

  const descriptionClassname = cx(
    'font-regular leading-lg tracking-[0.12px] text-neutral-700 text-xxs',
    {
      'xxxl:text-sm mb-sm xxxl:mb-base': isBig,
      'xxxl:text-xs mb-x xxxl:mb-sm': !isBig,
    }
  );

  return (
    <Link to={`/reports/${REPORT_PATHS[type]}`}>
      <Card className={cardClassname}>
        <div className={imageWrapperClassname}>
          {isBig ? (
            <>
              <SharedImage className='w-full h-full object-cover' src={image} title={title} />
              <div className='bg-gradient-neutral absolute inset-0 group-hover:opacity-0 transition-opacity' />
            </>
          ) : (
            <div className='bg-neutral-200 text-neutral-400 flex justify-center items-center p-sm xxxl:p-base group-hover:text-primary-500 group-hover:bg-white transition-colors'>
              {Icon && (
                <IconContainer
                  Icon={Icon}
                  data-testid='report-card-icon'
                  paddingSize='none'
                  size={iconSize}
                />
              )}
            </div>
          )}
        </div>
        <div className='flex flex-col grow'>
          <h6 className='mb-xs xxxl:mb-sm text-xs xxxl:text-base font-bold leading-base'>
            {title}
          </h6>
          <p className={descriptionClassname}>{description}</p>
          <ViewButton
            Icon={ChevronRight}
            className='text-xs font-medium xxxl:text-sm items-center mt-auto leading-sm'>
            {t('user.goals.seeMore')}
          </ViewButton>
        </div>
      </Card>
    </Link>
  );
};
