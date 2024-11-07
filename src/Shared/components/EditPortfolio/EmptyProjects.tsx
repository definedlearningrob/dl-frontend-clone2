import { Trans, useTranslation } from 'react-i18next';

import { ReactComponent as EmptyPersonalProjectCardIcon } from '@shared/svg/empty_personal_project_card.svg';
import { ReactComponent as EmptyCareersProjectCardIcon } from '@shared/svg/empty_careers_project_card.svg';
import { ReactComponent as EmptyLearningProjectCardIcon } from '@shared/svg/empty_learning_project_card.svg';
import { tabType } from '@shared/components/EditPortfolio/HighlightedProjectsList';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

type Props = {
  tab: tabType;
};

export const EmptyProjects = ({ tab }: Props) => {
  const { t } = useTranslation();

  const imageClassName = 'mb-sm w-full';

  const emptyProjectsContent = {
    [PORTFOLIO_PROJECT_TYPES.PERSONAL]: {
      image: <EmptyPersonalProjectCardIcon className={imageClassName} />,
      title: t('portfolio.creator.noPersonalProjects'),
    },
    [PORTFOLIO_PROJECT_TYPES.CAREERS]: {
      image: <EmptyCareersProjectCardIcon className={imageClassName} />,
      title: t('portfolio.creator.noCareersProjects'),
    },
    [PORTFOLIO_PROJECT_TYPES.PBL]: {
      image: <EmptyLearningProjectCardIcon className={imageClassName} />,
      title: t('portfolio.creator.noLearningProjects'),
    },
    [PORTFOLIO_PROJECT_TYPES.RESUME]: {
      image: '',
      title: '',
    },
  }[tab];

  return (
    <div className='mx-auto text-xs text-center w-[320px] xxxl:w-[360px]'>
      {emptyProjectsContent.image}
      <div className='mx-auto'>
        <h6>{emptyProjectsContent.title}</h6>
        <p className='text-xs leading-lg'>
          <Trans i18nKey='portfolio.creator.noProjectsDescription'>
            <br />
          </Trans>
        </p>
      </div>
    </div>
  );
};
