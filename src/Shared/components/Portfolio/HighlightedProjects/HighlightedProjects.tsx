import { useTranslation } from 'react-i18next';

import Card from '@shared/components/Card/Card';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { HighlightedProjectDetails } from '@shared/components/GuestPortfolio/HighlightedProjectDetails';
import { ReactComponent as DuplicateIcon } from '@shared/assets/icons/duplicate.svg';
import { TPortfolioProject } from '@shared/components/Portfolio/types';

type Props = {
  highlightedProjects: TPortfolioProject[];
};

export const HighlightedProjects = ({ highlightedProjects }: Props) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Card.Header>
        <div className='flex items-center gap-sm'>
          <IconContainer
            Icon={DuplicateIcon}
            className='rounded-sm bg-neutral-200 text-neutral-700'
            paddingSize='xs'
            size='base'
          />
          <h5 className='mb-0 leading-base text-sm xxxl:text-base'>
            {t('portfolio.public.highlightedProjects')}
          </h5>
        </div>
      </Card.Header>
      {highlightedProjects.map((projectDetail, index) => (
        <HighlightedProjectDetails key={index + projectDetail.name} project={projectDetail} />
      ))}
    </Card>
  );
};
