import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { isEmpty } from 'lodash-es';

import { ReactComponent as EducationIcon } from '@shared/assets/icons/education_outlined.svg';
import { ReactComponent as StarsIcon } from '@shared/svg/stars.svg';
import { ReactComponent as BuildingIcon } from '@shared/assets/icons/building.svg';
import { useSharedResume } from '@shared/graphql/student/hooks/useSharedResume';
import { createPortfolioData } from '@shared/components/PublicPortfolio/publicPortfolioHelper';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { PortfolioResumesBio } from '@shared/components/Portfolio/Resumes/PortfolioResumesBio';
import { useRole } from '@shared/hooks/useRole';
import { StudentEmptyPortfolio } from '@shared/components/PublicPortfolio/StudentEmptyPortfolio';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { PortfolioMainSection } from '@shared/components/Portfolio/PortfolioMainSection/PortfolioMainSection';
import { HighlightedProjects } from '@shared/components/Portfolio/HighlightedProjects/HighlightedProjects';

type Props = {
  isPublic: boolean;
};

export const StudentPublicPortfolio = ({ isPublic }: Props) => {
  const { setBackNavButton } = useNavigation();
  const { isStudent } = useRole();
  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);
  const { t } = useTranslation();
  const { sharedUrl } = useParams<{ sharedUrl: string }>();
  const { data: studentSharedResume } = useSharedResume(sharedUrl, isPublic);
  if (!studentSharedResume) return null;

  const {
    avatarUrl,
    bio,
    name,
    contactLinks,
    experiences,
    educations,
    extraCurriculars,
    highlightedProjects,
    highlightedProjectsEnabled,
  } = studentSharedResume.sharedResume;

  const studentBio = { avatarUrl, bio, name, contactLinks };

  const studentPortfolioData = [
    createPortfolioData(EducationIcon, t('portfolio.public.experience'), experiences),
    createPortfolioData(BuildingIcon, t('portfolio.public.education'), educations),
    createPortfolioData(StarsIcon, t('portfolio.public.extraCurriculars'), extraCurriculars),
  ];
  const isEmptyPortfolio = studentPortfolioData.every((portfolio) =>
    isEmpty(portfolio.portfolioDetails)
  );

  return (
    <MainContent className='flex gap-base xxxl:gap-md justify-center relative'>
      <div className='w-[320px] xxxl:w-[380px]'>
        <PortfolioResumesBio isPublic={isPublic} isStudent={isStudent} studentBio={studentBio} />
      </div>
      <div className='w-[640px] xxxl:w-[760px] flex flex-col gap-base xxxl:gap-md'>
        {isEmptyPortfolio && <StudentEmptyPortfolio />}
        {!isEmptyPortfolio && (
          <PortfolioMainSection portfolioData={studentSharedResume.sharedResume} />
        )}
        {highlightedProjectsEnabled && (
          <HighlightedProjects highlightedProjects={highlightedProjects} />
        )}
      </div>
    </MainContent>
  );
};
