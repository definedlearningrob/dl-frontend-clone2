import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { ReactComponent as MatchIcon } from '@dc/svg/match.svg';

import defaultThumbnail from '@shared/assets/images/default-thumbnail.svg';
import SharedImage from '@shared/components/Image/Image';
import { ReactComponent as TeamIcon } from '@shared/svg/projectTeam.svg';
import { ReactComponent as LaptopIcon } from '@shared/svg/laptop.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import { PortfolioProjectType } from '../../types';

type Props = {
  imageUrl: string | null;
  forceSmall?: boolean;
  teamSubmission: boolean;
  thumbnailUrl: string | null;
  type: PortfolioProjectType;
};

const TOOLTIP_DELAY_DURATION = 300;

export const PortfolioProjectsCardImage = ({
  imageUrl,
  forceSmall,
  teamSubmission,
  type,
}: Props) => {
  const { t } = useTranslation();
  const showVirtualInternshipIcon = [
    PortfolioProjectType.VIRTUAL_INTERNSHIP,
    PortfolioProjectType.OPPORTUNITY,
  ].includes(type);
  const isVirtualInternship = type === PortfolioProjectType.VIRTUAL_INTERNSHIP;
  const OpportunityTypeIcon = isVirtualInternship ? LaptopIcon : MatchIcon;
  const tooltipMessage = isVirtualInternship
    ? t('portfolio.viAssignment')
    : t('portfolio.opportunityAssignment');

  const iconClasses = 'bg-white rounded-sm p-xs text-primary-500 group-hover:bg-primary-200';

  const wrapperClassName = cx(
    'wrapper-image group',
    'w-full flex-grow',
    'h-[100px] max-h-full max-w-[178px]',
    'relative rounded-sm overflow-hidden',
    { 'xxxl:h-[136px] xxxl:max-w-[240px]': !forceSmall }
  );

  return (
    <div className={wrapperClassName}>
      <div className='flex gap-xs absolute left-sm top-sm'>
        {teamSubmission && (
          <Tooltip delayDuration={TOOLTIP_DELAY_DURATION} message={t('portfolio.teamAssignment')}>
            <IconContainer
              Icon={TeamIcon}
              className={iconClasses}
              data-testid='team-icon'
              size='sm'
            />
          </Tooltip>
        )}
        {showVirtualInternshipIcon && (
          <Tooltip delayDuration={TOOLTIP_DELAY_DURATION} message={tooltipMessage}>
            <IconContainer
              Icon={OpportunityTypeIcon}
              className={iconClasses}
              data-testid='virtual-internship-icon'
              size='sm'
            />
          </Tooltip>
        )}
      </div>
      <SharedImage
        alt='project-image'
        className='h-full w-full object-cover object-center'
        src={imageUrl || defaultThumbnail}
      />
    </div>
  );
};
