import { FC, PropsWithChildren, ReactNode, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import Card from '@shared/components/Card/Card';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Link from '@shared/components/Link';
import { ReactComponent as arrowRight } from '@shared/assets/icons/chevron_right.svg';
import { useRole } from '@shared/hooks/useRole';

type Props = PropsWithChildren<{
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: ReactNode;
}>;

export const PortfolioResumeEmptyCard = ({ Icon, title, children }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { isStudent } = useRole();
  const { t } = useTranslation();

  const emptyCardText = isStudent
    ? t('portfolioResume.emptyCardStudent', { title })
    : t('portfolioResume.emptyCardTeacher', { title });

  return (
    <Card className='p-sm xxxl:p-base text-neutral-700 flex flex-col gap-base xxxl:gap-md'>
      <div className='flex gap-sm xxxl:gap-base'>
        <div className='flex gap-sm items-center'>
          <IconContainer
            Icon={Icon}
            className='rounded-sm bg-neutral-200 text-neutral-400'
            paddingSize={isFullHD ? 'md' : 'sm'}
            size={isFullHD ? 'xxl' : '2lg'}
          />
        </div>
        <div className='xxxl:pt-base'>
          <div className='flex flex-col gap-xs'>
            <h5 className='mb-0 text-neutral-800 leading-base text-sm xxxl:text-base font-bold'>
              {title}
            </h5>
            <p className='text-neutral-700 text-xs xxxl:text-sm leading-lg font-regular max-w-prose'>
              {emptyCardText}
            </p>
          </div>
          {isStudent && (
            <Link
              Icon={arrowRight}
              className='!no-underline'
              iconPlacement='end'
              size={isFullHD ? 'md' : 'sm'}
              to={`portfolio/edit/#${title}`}
              variant='link'>
              {t('common.actions.addNew')}
            </Link>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
};
