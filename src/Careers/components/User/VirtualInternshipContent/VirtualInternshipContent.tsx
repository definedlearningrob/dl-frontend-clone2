import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import { useVirtualInternshipQuery } from '@dc/graphql/user/hooks/useVirtualInternshipQuery';

import SharedCard from '@shared/components/Card/Card';

import { VirtualInternshipLessonGroup } from './VirtualInternshipLessonGroup';
import { VirtualInternshipSummaryCard } from './VirtualInternshipSummaryCard';

export const VirtualInternshipContent = () => {
  const { t } = useTranslation();
  const { virtualInternshipId } = useParams<{ virtualInternshipId: string }>();
  const { data, loading } = useVirtualInternshipQuery({ id: virtualInternshipId, track: true });

  const virtualInternship = data?.virtualInternship;

  const hasReadinessSkillsLessons = !isEmpty(virtualInternship?.readinessSkillsLessons);

  return (
    <>
      <VirtualInternshipSummaryCard opportunity={virtualInternship?.opportunity} />
      <SharedCard className='flex flex-col gap-base xxxl:gap-md'>
        <VirtualInternshipLessonGroup
          description={t('virtualInternship.onboarding.description')}
          lessons={virtualInternship?.calendarLessons}
          loading={loading}
          title={t('virtualInternship.onboarding.heading')}
        />
        <SharedCard className='border border-neutral-300'>
          <VirtualInternshipLessonGroup
            centerItems={true}
            description={t('virtualInternship.experienceOpportunity.description', {
              lessonCount: virtualInternship?.requiredExperiences,
            })}
            lessons={virtualInternship?.experienceOpportunityLessons}
            loading={loading}
            title={t('virtualInternship.experienceOpportunity.heading')}
          />
        </SharedCard>
        <VirtualInternshipLessonGroup
          description={t('virtualInternship.postExperience.description')}
          lessons={virtualInternship?.postExperienceLessons}
          loading={loading}
          title={t('virtualInternship.postExperience.heading')}
        />
      </SharedCard>
      {hasReadinessSkillsLessons && (
        <SharedCard>
          <VirtualInternshipLessonGroup
            description={t('virtualInternship.careerReadinessSkill.description')}
            lessons={virtualInternship?.readinessSkillsLessons}
            loading={loading}
            title={t('virtualInternship.careerReadinessSkill.heading')}
          />
        </SharedCard>
      )}
    </>
  );
};
