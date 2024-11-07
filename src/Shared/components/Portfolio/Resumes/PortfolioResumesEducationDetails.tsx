import { isEmpty } from 'lodash-es';

import { TPortfolioProject } from '@shared/components/Portfolio/types';
import type { Badge, ResumeItemAttributes } from '@shared/resources/types';
import { PortfolioMainSection } from '@shared/components/Portfolio/PortfolioMainSection/PortfolioMainSection';
import { HighlightedProjects } from '@shared/components/Portfolio/HighlightedProjects/HighlightedProjects';

type Props = {
  studentEducationDetails: {
    experiences: ResumeItemAttributes[];
    extraCurriculars: ResumeItemAttributes[];
    educations: ResumeItemAttributes[];
    highlightedProjectsEnabled: boolean;
    highlightedProjects: TPortfolioProject[];
    highlightedBadges: Badge[];
  };
};

export const PortfolioResumesEducationDetails = ({ studentEducationDetails }: Props) => {
  const { highlightedProjectsEnabled, highlightedProjects } = studentEducationDetails;

  const isHighlightedProjectsVisible = !isEmpty(highlightedProjects) && highlightedProjectsEnabled;

  return (
    <div className='w-full flex flex-col gap-base xxxl:gap-md'>
      <PortfolioMainSection portfolioData={studentEducationDetails} showEmptyCards={true} />
      {isHighlightedProjectsVisible && (
        <HighlightedProjects highlightedProjects={highlightedProjects} />
      )}
    </div>
  );
};
