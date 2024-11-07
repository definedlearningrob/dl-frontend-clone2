import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useVirtualInternshipLesson } from '@dc/graphql/student/hooks/useVirtualInternshipLesson';
import { Lesson } from '@dc/components/VirtualInternship/VirtualInternshipLesson';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import styles from './VirtualInternshipLesson.module.sass';

export const VirtualInternshipLesson = () => {
  const { t } = useTranslation();
  const { lessonId, opportunityId } = useParams<{ lessonId: string; opportunityId: string }>();
  const { data, loading, error } = useVirtualInternshipLesson({
    lessonId,
    opportunityId,
  });

  if (loading) {
    return <SharedLoadingSpinner />;
  }

  if (!data || error) {
    return <div className={styles.errorMessage}>{t('shared.dataLoader.error')}</div>;
  }

  const {
    name,
    virtualInternship: { lesson, id },
  } = data.opportunity;

  return <Lesson lesson={lesson} resourceId={id} resourceName={name} />;
};
