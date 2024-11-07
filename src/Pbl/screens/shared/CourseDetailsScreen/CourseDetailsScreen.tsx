import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CourseDetails from '@pbl/components/CourseDetails';
import { useCourseDetailsQuery } from '@pbl/graphql/shared/hooks/useCourseDetailsQuery';
import { usePublicCourseQuery } from '@pbl/graphql/public/hooks/usePublicCourseQuery';

import { MainContent } from '@shared/components/MainContent/MainContent';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import Link from '@shared/components/Link';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

type Props = {
  isPublic?: boolean;
};

const CourseDetailsScreen = ({ isPublic }: Props) => {
  const { t } = useTranslation();
  const { state } = useLocation<{ projectPathname?: string }>();
  const { projectId, courseId } = useParams<{ projectId: string; courseId: string }>();
  const {
    params: { code },
  } = useQueryParams<{ code?: string }>();
  const { setBackNavButton } = useNavigation();
  const { data, loading, error } = useCourseDetailsQuery({ projectId, courseId, skip: isPublic });
  const {
    data: publicData,
    loading: publicLoading,
    error: publicError,
  } = usePublicCourseQuery({
    shareId: projectId,
    courseId,
    code: code!,
    skip: !isPublic,
  });

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  if (loading || publicLoading) {
    return (
      <MainContent>
        <SharedLoadingSpinner size='small' />
      </MainContent>
    );
  }

  const courseData = data || publicData;

  if (error || publicError || !courseData) {
    return (
      <MainContent>
        <EmptyState className='p-md' heading={t('courseDetails.notFound')}>
          <Link to={state?.projectPathname ?? '/'} variant='primary'>
            {t('common.actions.back')}
          </Link>
        </EmptyState>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <CourseDetails course={courseData!.project.course} isPublic={isPublic} />
    </MainContent>
  );
};

export default CourseDetailsScreen;
