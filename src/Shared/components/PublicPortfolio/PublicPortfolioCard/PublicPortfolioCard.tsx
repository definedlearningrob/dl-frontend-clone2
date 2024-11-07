import { FC, PropsWithChildren, ReactNode, SVGProps } from 'react';
import { isEmpty } from 'lodash-es';

import Card from '@shared/components/Card/Card';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { PortfolioResumeEmptyCard } from '@shared/components/Portfolio/Resumes/PortfolioResumeEmptyCard';
import { ResumeItemAttributes } from '@shared/resources/types';
import { PortfolioResumeItem } from '@shared/components/Portfolio/Resumes/PortfolioResumeItem';

type Props = PropsWithChildren<{
  icon: FC<SVGProps<SVGSVGElement>>;
  title: ReactNode;
  showEmptyCard?: boolean;
  resumeItems?: ResumeItemAttributes[];
}>;

export const PublicPortfolioCard = ({
  icon,
  title,
  children,
  resumeItems,
  showEmptyCard,
}: Props) => {
  const visibleResumeItems = resumeItems?.filter((item) => !('visible' in item) || item.visible);

  if (showEmptyCard && isEmpty(visibleResumeItems)) {
    return (
      <PortfolioResumeEmptyCard Icon={icon} title={title}>
        {children}
      </PortfolioResumeEmptyCard>
    );
  }

  if (isEmpty(visibleResumeItems) && !children) {
    return null;
  }

  return (
    <Card className='flex flex-col gap-sm xxxl:gap-base'>
      <div className='flex gap-sm items-center'>
        <IconContainer
          Icon={icon}
          className='rounded-sm bg-neutral-200 text-neutral-700'
          paddingSize='xs'
          size='base'
        />
        <h5 className='mb-0 leading-base text-sm xxxl:text-base'>{title}</h5>
      </div>
      <div className='pl-lg'>
        {visibleResumeItems?.map((item, index) => (
          <PortfolioResumeItem key={index} portfolioDetail={item} />
        ))}
        {children}
      </div>
    </Card>
  );
};
