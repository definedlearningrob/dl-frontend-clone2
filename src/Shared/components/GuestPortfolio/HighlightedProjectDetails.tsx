import { useEffect } from 'react';
import { useToggle } from 'react-use';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';

import { PortfolioProjectsCardImage } from '@shared/components/Portfolio/Projects/PortfolioProjectsCard/PortfolioProjectsCardImage';
import { TruncatedText } from '@shared/components/Portfolio/Projects/PortfolioProjectsCard/TruncatedText';
import { TPortfolioProject } from '@shared/components/Portfolio/types';
import ProjectSubmission from '@shared/components/Portfolio/Projects/PortfolioProjectsSubmission';
import { Badge, BadgeType } from '@shared/components/Badge/Badge';
import { Tooltip } from '@shared/components/Tooltip';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  project: TPortfolioProject;
};

export const HighlightedProjectDetails = ({ project }: Props) => {
  const {
    description,
    imageUrl,
    name,
    isTeamSubmission,
    parentName,
    thumbnailUrl,
    type,
    submission,
    resourceClass,
  } = project;

  const { t } = useTranslation();
  const [modalVisible, toggleModal] = useToggle(false);

  const noFiles = isEmpty(submission?.files);

  useEffect(() => {
    noFiles && modalVisible && toggleModal(!modalVisible);
  }, [submission?.files]);

  const { badgeType, badgeText } = match<String>(resourceClass)
    .returnType<{
      badgeType: BadgeType;
      badgeText: string | null;
    }>()
    .with('PRODUCT_SUBMISSION', () => ({
      badgeType: 'primary',
      badgeText: t('portfolio.public.badgeLearning'),
    }))
    .with('ASSIGNMENT_SUBMISSION', () => ({
      badgeType: 'secondary',
      badgeText: t('portfolio.public.badgeCareers'),
    }))
    .with('PORTFOLIO_PROJECT', () => ({
      badgeType: 'neutral',
      badgeText: t('portfolio.public.badgePersonal'),
    }))
    .otherwise(() => ({
      badgeType: 'neutral',
      badgeText: null,
    }));

  const isFullHD = useBreakpointUp({
    breakpoint: 'xxxl',
  });
  const badgeSize = isFullHD ? 'base' : 'small';

  return (
    <div
      className='flex gap-sm xxxl:gap-base bg-white rounded-sm text-font-primary p-sm group/portfolio-project-card hover:bg-neutral-200 cursor-pointer'
      data-testid='portfolio-project-card'
      onClick={toggleModal}>
      <div className='wrapper-header basis-[170px] shrink-0 relative h-full'>
        <div className='absolute bottom-xs left-xs z-lowest' data-testid='project-source-badge'>
          {badgeText && (
            <Tooltip className='truncate' delayDuration={500} message={badgeText}>
              <Badge
                className='!rounded-full !leading-base h-base truncate'
                size={badgeSize}
                type={badgeType}>
                {badgeText}
              </Badge>
            </Tooltip>
          )}
        </div>
        <PortfolioProjectsCardImage
          forceSmall={true}
          imageUrl={imageUrl}
          teamSubmission={isTeamSubmission}
          thumbnailUrl={thumbnailUrl}
          type={type}
        />
      </div>
      <div className='grow'>
        <div className='flex justify-between mb-xs'>
          <div className='w-full'>
            <div className='font-xs leading-lg text-xs mb-xxs text-neutral-700'>
              {parentName ? parentName : t('portfolio.public.personalProject')}
            </div>
            <h6 className='text-xs xxxl:text-sm mb-0' data-testid='portfolio-project-card-heading'>
              {name}
            </h6>
          </div>
        </div>
        <TruncatedText text={description} />
        <ProjectSubmission
          currentUserUuid={submission.files[0]?.submitter.uuid}
          modalVisible={modalVisible}
          submission={submission}
          teamSubmission={isTeamSubmission}
          toggleModal={toggleModal}
          type={type}
        />
      </div>
    </div>
  );
};
