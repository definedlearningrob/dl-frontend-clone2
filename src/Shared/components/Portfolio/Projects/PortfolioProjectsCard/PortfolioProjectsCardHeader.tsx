import { useTranslation } from 'react-i18next';
import { MouseEventHandler } from 'react';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { PortfolioProjectsCardDate } from '@shared/components/Portfolio/Projects/PortfolioProjectsCard/PortfolioProjectsCardDate';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { Tooltip } from '@shared/components/Tooltip';

import { PortfolioProjectType } from '../../types';

type Props = {
  name: string;
  parentName: string;
  personalProjectId: string;
  projectId: string;
  submittedAt: string;
  type: PortfolioProjectType;
};

export const PortfolioProjectsCardHeader = ({
  name,
  parentName,
  personalProjectId,
  projectId,
  submittedAt,
  type,
}: Props) => {
  const { t } = useTranslation();
  const {
    modifyPersonalProject: { setModifyPersonalProjectData },
    tabs: { projectType },
    isUser,
  } = usePortfolioContext();
  const showPersonalProjectActions = !isUser && projectType === PORTFOLIO_PROJECT_TYPES.PERSONAL;

  const handleEditProject: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setModifyPersonalProjectData({
      isDeleteProjectModalOpen: false,
      isUpdateProjectModalOpen: true,
      projectId: personalProjectId,
    });
  };

  const handleDeleteProject: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setModifyPersonalProjectData({
      isDeleteProjectModalOpen: true,
      isUpdateProjectModalOpen: false,
      projectId: personalProjectId,
    });
  };

  const parent =
    type !== PortfolioProjectType.VIRTUAL_INTERNSHIP
      ? parentName
      : t('portfolio.viHeader', { name: parentName });

  return (
    <header className='flex justify-between mb-xs'>
      <div className='w-full'>
        <div className='flex justify-between'>
          {parentName && (
            <div className='font-xs leading-lg text-xs mb-xxs text-neutral-700'>{parent}</div>
          )}
          <div className='ms-auto flex gap-xs items-center'>
            {showPersonalProjectActions && (
              <>
                <Tooltip message={t('portfolioProjects.editProjectModalHeading')}>
                  <DeprecatedIconButton.Edit
                    aria-label={t('common.actions.edit')}
                    className='!p-xxs !h-base !w-base'
                    data-testid='portfolio-personal-project-card-edit-button'
                    size='xs'
                    onClick={handleEditProject}
                  />
                </Tooltip>
                <Tooltip message={t('portfolioProjects.deleteProjectModalHeading')}>
                  <DeprecatedIconButton.Delete
                    aria-label={t('common.actions.delete')}
                    className='!p-xxs !h-base !w-base'
                    data-testid='portfolio-personal-project-card-delete-button'
                    onClick={handleDeleteProject}
                  />
                </Tooltip>
              </>
            )}
            <PortfolioProjectsCardDate
              projectId={projectId}
              submittedAt={submittedAt}
              type={type}
            />
          </div>
        </div>
        <h6 className='text-xs xxxl:text-sm mb-0' data-testid='portfolio-project-card-heading'>
          {name}
        </h6>
      </div>
    </header>
  );
};
