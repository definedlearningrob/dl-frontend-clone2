import { isEmpty, isNil } from 'lodash-es';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';

import { CalendarSection } from '@dc/components/Student/VirtualInternship/CalendarSection/CalendarSection';
import { InternshipProgress } from '@dc/components/Student/VirtualInternship';
import { ReadinessSkillsSection } from '@dc/components/Student/VirtualInternship/ReadinessSkillsSection/ReadinessSkillsSection';
import { VirtualInternshipUnenrollModal } from '@dc/components/Student/VirtualInternship/VirtualInternshipContent/VirtualInternshipUnenrollModal';
import { useDeleteOpportunityApplication } from '@dc/graphql/student/hooks/useDeleteOpportunityApplication';
import { useOpportunityQuery } from '@dc/graphql/student/hooks/useOpportunityQuery';
import { useVirtualInternshipLessons } from '@dc/hooks/useVirtualInternshipLessons';
import { applicationViewStatusesKeyMap } from '@dc/components/Opportunities/OpportunityCard/helpers';
import { VirtualInternshipHeader } from '@dc/components/VirtualInternship/VirtualInternshipHeader';

import Card from '@shared/components/Card/Card';
import SharedButton from '@shared/components/Button/Button';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { cleanInjection } from '@shared/utils/cleanInjection';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './VirtualInternshipContent.module.sass';
import { groupLessonsByCompletion } from './helpers';

export const VirtualInternshipContent = () => {
  const { setBackNavButton } = useNavigation();
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const [deleteOpportunityApplication] = useDeleteOpportunityApplication();
  const [isUnenrollModalOpen, toggleUnenrollModal] = useToggle(false);
  const history = useHistory();

  useEffect(() => {
    setBackNavButton(true, `/opportunities/${opportunityId}`);

    return () => setBackNavButton(false);
  }, []);

  const { calendar, studentExperienceOpportunity, postExperience, readinessSkills } =
    useVirtualInternshipLessons();
  const { data, loading } = useOpportunityQuery({ id: opportunityId, track: false, trackVI: true });
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const buttonSize = isFullHD ? 'md' : 'sm';

  if (loading) {
    return <SharedLoadingSpinner size='medium' />;
  }

  if (!data) {
    return <div className='text-center'>{t('shared.dataLoader.error')}</div>;
  }

  if (!calendar) {
    return null;
  }

  const {
    opportunity: { description, imageUrl, name, opportunityApplication, virtualInternship },
  } = data;

  const mandatoryLessons = [
    ...calendar!.lessons,
    ...studentExperienceOpportunity!.lessons,
    ...postExperience!.lessons,
  ];
  const relatedSkillsLessons = readinessSkills!.lessons;
  const allLessons = [...mandatoryLessons, ...relatedSkillsLessons];

  const hasRelatedSkillsLessons = !isEmpty(relatedSkillsLessons);

  const { completedLessons, unfinishedLessons } = groupLessonsByCompletion(allLessons);
  const { completedLessons: completedMandatoryLessons } =
    groupLessonsByCompletion(mandatoryLessons);

  const firstUnfinishedLesson = unfinishedLessons ? unfinishedLessons[0] : null;

  const handleUnenroll = async () => {
    await deleteOpportunityApplication({
      opportunityApplicationId: opportunityApplication.id,
      opportunityId,
    });

    history.push(`/opportunities/${opportunityId}`);
  };

  const handleContinueClick = () => {
    if (firstUnfinishedLesson) {
      const firstUnfinishedLessonPath = `/opportunities/${opportunityId}/virtual-internship/lesson/${firstUnfinishedLesson.id}`;
      history.push(firstUnfinishedLessonPath);
    }
  };
  const virtualInternshipStatusKey = applicationViewStatusesKeyMap[virtualInternship!.status];

  return (
    <>
      <div className={styles.content}>
        <div className='flex flex-col flex-wrap gap-sm xxxl:gap-md'>
          <VirtualInternshipHeader
            imageUrl={imageUrl}
            status={virtualInternship!.status}
            tag={t(`opportunities.virtualInternshipStatus.${virtualInternshipStatusKey}`)}
            title={name}
            titleClassName={styles.titleClassname}>
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={cleanInjection(description)} />
            <div className='flex gap-x'>
              <SharedButton
                disabled={isNil(firstUnfinishedLesson)}
                size={buttonSize}
                variant='primary'
                onClick={handleContinueClick}>
                {t('virtualInternship.actions.continue')}
              </SharedButton>
              <SharedButton
                size={buttonSize}
                variant='primary-outlined'
                onClick={toggleUnenrollModal}>
                {t('virtualInternship.actions.unenroll')}
              </SharedButton>
            </div>
          </VirtualInternshipHeader>
          <Card className={styles.card}>
            <CalendarSection completedLessonsCount={completedMandatoryLessons?.length || 0} />
          </Card>
          {hasRelatedSkillsLessons && (
            <Card className={styles.card}>
              <ReadinessSkillsSection />
            </Card>
          )}
        </div>
        <Card className='text-xxs xxxl:text-base'>
          <InternshipProgress
            completedLessonsCount={completedLessons?.length || 0}
            totalLessonsCount={allLessons.length}
          />
        </Card>
      </div>
      <VirtualInternshipUnenrollModal
        internshipName={name}
        isOpen={isUnenrollModalOpen}
        onAction={handleUnenroll}
        onClose={toggleUnenrollModal}
      />
    </>
  );
};
