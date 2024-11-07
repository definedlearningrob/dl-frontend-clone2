import cx from 'classnames';

import SharedImage from '@shared/components/Image/Image';
import defaultThumbnail from '@shared/assets/images/default-thumbnail.svg';
import { EvidenceListItemImageIcon } from '@shared/components/PortfolioPlans/Evidence/EvidenceListItemImageIcon';
import { PortfolioProjectType } from '@shared/components/Portfolio/types';

type Props = {
  imageUrl: string | null;
  isTeamSubmission: boolean;
  thumbnailUrl: string | null;
  projectType: PortfolioProjectType;
};

const wrapperClassName = cx(
  'w-full shrink-0 relative rounded-xs overflow-hidden',
  'h-[76px] xxxl:h-[100px] w-full max-w-[148px] xxxl:max-w-[195px]'
);

export const EvidenceListItemImage = ({
  imageUrl,
  isTeamSubmission,
  projectType,
  thumbnailUrl,
}: Props) => {
  const isVirtualInternship = projectType === PortfolioProjectType.VIRTUAL_INTERNSHIP;
  const isOpportunity = projectType === PortfolioProjectType.OPPORTUNITY;

  const hasIcon = isTeamSubmission || isVirtualInternship || isOpportunity;

  return (
    <div className={wrapperClassName}>
      {hasIcon && (
        <div className='absolute left-sm top-sm'>
          <EvidenceListItemImageIcon
            isOpportunity={isOpportunity}
            isTeamSubmission={isTeamSubmission}
            isVirtualInternship={isVirtualInternship}
          />
        </div>
      )}
      <SharedImage
        alt='evidence-image'
        className='h-full w-full object-cover object-center'
        src={thumbnailUrl || imageUrl || defaultThumbnail}
      />
    </div>
  );
};
