import { useTranslation } from 'react-i18next';

import { LessonList, SectionHeading } from '@dc/components/Student/VirtualInternship';
import { useVirtualInternshipLessons } from '@dc/hooks/useVirtualInternshipLessons';

import styles from './ReadinessSkillsSection.module.sass';

export const ReadinessSkillsSection = () => {
  const { t } = useTranslation();
  const { readinessSkills } = useVirtualInternshipLessons();

  if (!readinessSkills) {
    return null;
  }

  return (
    <section aria-label={t('virtualInternship.careerReadinessSkill.heading')}>
      <SectionHeading
        className={styles.heading}
        count={readinessSkills.lessons.length}
        description={t('virtualInternship.careerReadinessSkill.description')}
        heading={t('virtualInternship.careerReadinessSkill.heading')}
      />
      <LessonList indexOffset={readinessSkills.indexOffset} lessons={readinessSkills.lessons} />
    </section>
  );
};
