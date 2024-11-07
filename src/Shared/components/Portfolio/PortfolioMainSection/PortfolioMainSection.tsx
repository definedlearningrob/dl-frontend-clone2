import { useTranslation } from 'react-i18next';

import type { Badge, ResumeItemAttributes } from '@shared/resources/types';
import { ReactComponent as EducationIcon } from '@shared/svg/education_outlined.svg';
import { ReactComponent as StarsIcon } from '@shared/svg/stars.svg';
import { ReactComponent as BuildingIcon } from '@shared/svg/building.svg';
import { ReactComponent as BadgeIcon } from '@shared/svg/award.svg';
import { PublicPortfolioCard } from '@shared/components/PublicPortfolio/PublicPortfolioCard/PublicPortfolioCard';
import { groupBadgesById } from '@shared/components/EditPortfolio/helpers';
import { cx } from '@shared/utils/cx';

import { BadgeList } from './BadgeList';
import { BadgesHeader } from './BadgesHeader';

type Props = {
  portfolioData: {
    experiences: ResumeItemAttributes[];
    extraCurriculars: ResumeItemAttributes[];
    educations: ResumeItemAttributes[];
    highlightedBadges: Badge[];
  };
  showEmptyCards?: boolean;
};

export const PortfolioMainSection = ({ portfolioData, showEmptyCards = false }: Props) => {
  const { t } = useTranslation();

  const { experiences, extraCurriculars, educations, highlightedBadges } = portfolioData;

  const groupedBadges = groupBadgesById(highlightedBadges);
  const hasExperienceItems = experiences.some(
    (experience) => !('visible' in experience) || experience.visible
  );
  const hasExperienceSection = hasExperienceItems || showEmptyCards;

  const experiencesTitle = hasExperienceSection ? (
    t('portfolio.public.experience')
  ) : (
    <BadgesHeader badges={groupedBadges} />
  );

  return (
    <>
      <PublicPortfolioCard
        icon={hasExperienceSection ? EducationIcon : BadgeIcon}
        resumeItems={experiences}
        showEmptyCard={showEmptyCards}
        title={experiencesTitle}>
        <BadgeList
          badges={groupedBadges}
          className={cx({ '-ml-lg': hasExperienceItems })}
          hideHeader={!hasExperienceSection}
        />
      </PublicPortfolioCard>
      <PublicPortfolioCard
        icon={BuildingIcon}
        resumeItems={educations}
        showEmptyCard={showEmptyCards}
        title={t('portfolio.public.education')}
      />
      <PublicPortfolioCard
        icon={StarsIcon}
        resumeItems={extraCurriculars}
        showEmptyCard={showEmptyCards}
        title={t('portfolio.public.extraCurriculars')}
      />
    </>
  );
};
