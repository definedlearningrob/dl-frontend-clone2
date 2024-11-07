import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Lesson } from '@dc/components/VirtualInternship/VirtualInternshipLesson';
import { useVirtualInternshipLesson } from '@dc/graphql/user/hooks/useVirtualInternshipLesson';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export const VirtualInternshipLessonContent = () => {
  const { t } = useTranslation();
  const { lessonId, virtualInternshipId } =
    useParams<{ lessonId: string; virtualInternshipId: string }>();
  const { data, loading, error } = useVirtualInternshipLesson({
    lessonId,
    virtualInternshipId,
  });

  if (loading) {
    return <SharedLoadingSpinner />;
  }

  if (!data || error) {
    return <div className='text-center'>{t('shared.dataLoader.error')}</div>;
  }

  const { lesson, opportunity, id } = data.virtualInternship;

  return (
    <Lesson isPreviewOnly={true} lesson={lesson} resourceId={id} resourceName={opportunity.name} />
  );
};
