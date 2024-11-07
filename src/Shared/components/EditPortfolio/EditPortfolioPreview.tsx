import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash-es';
import { useEffect } from 'react';

import { ReactComponent as EducationIcon } from '@shared/assets/icons/education_outlined.svg';
import { ReactComponent as StarsIcon } from '@shared/svg/stars.svg';
import { ReactComponent as BuildingIcon } from '@shared/assets/icons/building.svg';
import { ReactComponent as DuplicateIcon } from '@shared/assets/icons/duplicate.svg';
import { PublicPortfolioCard } from '@shared/components/PublicPortfolio/PublicPortfolioCard/PublicPortfolioCard';
import { createPortfolioData } from '@shared/components/PublicPortfolio/publicPortfolioHelper';
import { HighlightedProjectDetails } from '@shared/components/GuestPortfolio/HighlightedProjectDetails';
import { PortfolioResumesBio } from '@shared/components/Portfolio/Resumes/PortfolioResumesBio';
import { useRole } from '@shared/hooks/useRole';
import { PortfolioFormValues } from '@shared/components/EditPortfolio/EditPortfolio';
import { TPortfolioProject } from '@shared/components/Portfolio/types';
import { StudentEmptyPortfolio } from '@shared/components/PublicPortfolio/StudentEmptyPortfolio';
import { MainContent } from '@shared/components/MainContent/MainContent';
import usePortfolioResumesQuery from '@shared/graphql/student/hooks/usePortfolioResumesQuery';
import { PortfolioMainSection } from '@shared/components/Portfolio/PortfolioMainSection/PortfolioMainSection';

type ProjectDetail = {
  projectId: string;
  projectType: string;
};

export const EditPortfolioPreview = () => {
  const { isStudent } = useRole();
  const { data } = usePortfolioResumesQuery();
  const { t } = useTranslation();
  const { values } = useFormikContext<PortfolioFormValues>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!values) return null;

  const badges = data?.portfolio.sharedResume?.badges ?? [];
  const highlightedBadges = badges.filter((badge) => values.highlightedBadgeIds.includes(badge.id));

  const {
    avatar: { url: avatarUrl },
    bio,
    name,
    contactLinks,
    experiences,
    educations,
    extraCurriculars,
    highlightedProjects,
    highlightedProjectsEnabled,
  } = values;

  const studentBio = { avatarUrl, bio, name, contactLinks };
  const portfolioMainData = { experiences, educations, extraCurriculars, highlightedBadges };
  const studentHighlightedProjects = highlightedProjects;

  const studentPortfolioData = [
    createPortfolioData(EducationIcon, t('portfolio.public.experience'), experiences),
    createPortfolioData(BuildingIcon, t('portfolio.public.education'), educations),
    createPortfolioData(StarsIcon, t('portfolio.public.extraCurriculars'), extraCurriculars),
  ];
  const isEmptyPortfolio = studentPortfolioData.every((portfolio) =>
    isEmpty(portfolio.portfolioDetails)
  );

  return (
    <MainContent className='flex gap-base xxxl:gap-md justify-center relative pt-md'>
      <div className='w-[320px] xxxl:w-[380px]'>
        <PortfolioResumesBio isPublic={false} isStudent={isStudent} studentBio={studentBio} />
      </div>
      <div className='w-[640px] xxxl:w-[760px] flex flex-col gap-base xxxl:gap-md'>
        {isEmptyPortfolio && <StudentEmptyPortfolio />}
        {!isEmptyPortfolio && <PortfolioMainSection portfolioData={portfolioMainData} />}
        {highlightedProjectsEnabled && (
          <PublicPortfolioCard
            icon={DuplicateIcon}
            title={t('portfolio.public.highlightedProjects')}>
            {studentHighlightedProjects.map((projectDetail, index) => (
              <HighlightedProjectDetails
                key={index + projectDetail.projectId}
                project={projectDetail as ProjectDetail & TPortfolioProject}
              />
            ))}
          </PublicPortfolioCard>
        )}
      </div>
    </MainContent>
  );
};
