import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as EmptyPersonalProjectCardIcon } from '@shared/svg/empty_personal_project_card.svg';
import { ReactComponent as EmptyCareersProjectCardIcon } from '@shared/svg/empty_careers_project_card.svg';
import { ReactComponent as EmptyLearningProjectCardIcon } from '@shared/svg/empty_learning_project_card.svg';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

export const PortfolioProjectsEmptyCard = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const {
    createPortfolioProject: { setShowCreatePersonalProjectModal },
    tabs: { projectType },
    isUser,
  } = usePortfolioContext();
  const isPortfolioPersonalProject = projectType === PORTFOLIO_PROJECT_TYPES.PERSONAL && !isUser;

  const openCreatePersonalProjectModal = () => {
    isPortfolioPersonalProject && setShowCreatePersonalProjectModal(true);
  };

  const imageClassName = 'mb-sm w-full';

  const emptyProjectsContent = {
    [PORTFOLIO_PROJECT_TYPES.PERSONAL]: {
      image: <EmptyPersonalProjectCardIcon className={imageClassName} />,
      title: t('portfolioProjects.noPersonalProjects'),
    },
    [PORTFOLIO_PROJECT_TYPES.CAREERS]: {
      image: <EmptyCareersProjectCardIcon className={imageClassName} />,
      title: t('portfolioProjects.noCareersProjects'),
    },
    [PORTFOLIO_PROJECT_TYPES.PBL]: {
      image: <EmptyLearningProjectCardIcon className={imageClassName} />,
      title: t('portfolioProjects.noLearningProjects'),
    },
    [PORTFOLIO_PROJECT_TYPES.RESUME]: {
      image: '',
      title: '',
    },
  }[projectType || PORTFOLIO_PROJECT_TYPES.PERSONAL];

  return (
    <div className='mx-auto text-xs text-center w-[320px] xxxl:w-[360px]'>
      {emptyProjectsContent.image}
      <div className='mx-auto'>
        <h6>{emptyProjectsContent.title}</h6>
        <p className='text-xs'>{t('portfolioProjects.noProjectDescription')}</p>
      </div>
      {isPortfolioPersonalProject && (
        <SharedButton
          className='mx-auto'
          data-testid='create-new-project'
          size={isFullHD ? 'md' : 'sm'}
          type='submit'
          value='createPersonalProject'
          variant='primary'
          onClick={openCreatePersonalProjectModal}>
          {t('portfolioProjects.createNewPersonalProject')}
        </SharedButton>
      )}
    </div>
  );
};
