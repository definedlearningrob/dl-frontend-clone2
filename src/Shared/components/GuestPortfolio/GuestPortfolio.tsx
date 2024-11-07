import { isEmpty } from 'lodash-es';
import { useParams } from 'react-router-dom';

import { useSharedResume } from '@shared/graphql/student/hooks/useSharedResume';
import { GuestPortfolioError } from '@shared/components/GuestPortfolio/GuestPortfolioError';
import { GuestEmptyPortfolio } from '@shared/components/GuestPortfolio/GuestEmptyPortfolio';
import { GuestPortfolioLoader } from '@shared/components/GuestPortfolio/GuestPortfolioLoader';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { PortfolioResumesBio } from '@shared/components/Portfolio/Resumes/PortfolioResumesBio';
import { useRole } from '@shared/hooks/useRole';
import { PortfolioMainSection } from '@shared/components/Portfolio/PortfolioMainSection/PortfolioMainSection';
import { HighlightedProjects } from '@shared/components/Portfolio/HighlightedProjects/HighlightedProjects';

type Props = {
  isPublic: boolean;
};

export const GuestPortfolio = ({ isPublic }: Props) => {
  const { sharedUrl } = useParams<{ sharedUrl: string }>();
  const { data: studentSharedResume, loading } = useSharedResume(sharedUrl, true);
  const { isStudent } = useRole();
  if (loading) {
    return <GuestPortfolioLoader />;
  }

  if (!studentSharedResume) {
    return <GuestPortfolioError />;
  }

  const isSharedResumeEmpty = [
    studentSharedResume.sharedResume.educations,
    studentSharedResume.sharedResume.experiences,
    studentSharedResume.sharedResume.extraCurriculars,
  ].every(isEmpty);

  const { avatarUrl, bio, name, contactLinks, highlightedProjects, highlightedProjectsEnabled } =
    studentSharedResume.sharedResume;

  const studentBio = { avatarUrl, bio, name, contactLinks };

  return (
    <MainContent className='flex gap-base xxxl:gap-md justify-center relative bg-neutral-200 min-h-screen'>
      <div className='w-[320px] xxxl:w-[380px]'>
        <PortfolioResumesBio isPublic={isPublic} isStudent={isStudent} studentBio={studentBio} />
      </div>
      <div className='w-[640px] xxxl:w-[760px] flex flex-col gap-base xxxl:gap-md'>
        {isSharedResumeEmpty && <GuestEmptyPortfolio />}
        {!isSharedResumeEmpty && (
          <PortfolioMainSection portfolioData={studentSharedResume.sharedResume} />
        )}
        {highlightedProjectsEnabled && (
          <HighlightedProjects highlightedProjects={highlightedProjects} />
        )}
      </div>
    </MainContent>
  );
};
