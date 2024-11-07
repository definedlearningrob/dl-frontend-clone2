import cx from 'classnames';
import { Trans, useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useState } from 'react';

import { LessonList, SectionHeading } from '@dc/components/Student/VirtualInternship';
import { useVirtualInternshipLessons } from '@dc/hooks/useVirtualInternshipLessons';
import { OpportunityExperiencesModal } from '@dc/components/Student/VirtualInternship/OpportunityExperiencesModal/OpportunityExperiencesModal';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ProgressBarWithSteps } from '@shared/components/ProgressBarWithSteps/ProgressBarWithSteps';
import { ReactComponent as SettingsIcon } from '@shared/svg/settings_outlined.svg';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './CalendarSection.module.sass';

type Props = {
  completedLessonsCount: number;
};

export const CalendarSection = ({ completedLessonsCount }: Props) => {
  const { t } = useTranslation();
  const { calendar, postExperience, studentExperienceOpportunity } = useVirtualInternshipLessons();

  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);

  if (!calendar || !postExperience || !studentExperienceOpportunity) {
    return null;
  }

  const internshipCalendarSteps =
    studentExperienceOpportunity.requiredExperiences +
    calendar.lessons.length +
    postExperience.lessons.length;
  const completedCalendarSteps = Math.min(completedLessonsCount, internshipCalendarSteps);

  const isAnyExperienceOpportunitySelected = studentExperienceOpportunity.lessons.some(
    (lesson) => !isEmpty(lesson)
  );

  const experienceOpportunityClassName = cx(styles.experienceOpportunity, {
    [styles.isAnyLessonSelected]: isAnyExperienceOpportunitySelected,
  });

  return (
    <section aria-label={t('virtualInternship.calendar.heading')}>
      <SectionHeading
        className={styles.heading}
        count={internshipCalendarSteps}
        description={t('virtualInternship.calendar.description')}
        heading={t('virtualInternship.calendar.heading')}
      />
      <ProgressBarWithSteps
        className={styles.progressBar}
        currentStep={completedCalendarSteps}
        totalSteps={internshipCalendarSteps}
      />
      <div className={styles.completedLabel}>
        <Trans
          i18nKey='virtualInternship.calendar.completed'
          values={{
            currentStep: completedCalendarSteps,
            totalSteps: internshipCalendarSteps,
          }}>
          <span className={styles.counter} />
        </Trans>
      </div>
      <SectionHeading
        className={styles.postExperienceHeading}
        count={calendar.lessons.length}
        description={t('virtualInternship.onboarding.description')}
        heading={t('virtualInternship.onboarding.heading')}
      />
      <LessonList className={styles.topLessonList} lessons={calendar.lessons} />
      <div className={experienceOpportunityClassName}>
        <div className={styles.experienceOpportunityHeaderWrapper}>
          <SectionHeading
            className={styles.experiencesHeadingWrapper}
            count={studentExperienceOpportunity.lessons.length}
            description={t('virtualInternship.experienceOpportunity.description', {
              lessonCount: studentExperienceOpportunity.requiredExperiences,
            })}
            heading={t('virtualInternship.experienceOpportunity.heading')}
            variant='sm'
          />
          {isAnyExperienceOpportunitySelected && (
            <Tooltip
              delayDuration={500}
              message={t('virtualInternship.experienceOpportunity.manageExperiences')}>
              <DeprecatedIconButton
                className={styles.settingsButton}
                icon={<SettingsIcon />}
                size='sm'
                onClick={() => setIsOpportunityModalOpen(true)}
              />
            </Tooltip>
          )}
        </div>
        <LessonList
          centerItems={true}
          emptyLessonAction={() => setIsOpportunityModalOpen(true)}
          indexOffset={studentExperienceOpportunity.indexOffset}
          lessons={studentExperienceOpportunity.lessons}
        />
      </div>
      <SectionHeading
        className={styles.postExperienceHeading}
        count={postExperience.lessons.length}
        description={t('virtualInternship.postExperience.description')}
        heading={t('virtualInternship.postExperience.heading')}
      />
      <LessonList indexOffset={postExperience.indexOffset} lessons={postExperience.lessons} />
      <OpportunityExperiencesModal
        isOpen={isOpportunityModalOpen}
        onClose={() => setIsOpportunityModalOpen(false)}
      />
    </section>
  );
};
