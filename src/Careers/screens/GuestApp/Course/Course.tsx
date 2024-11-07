import { useParams } from 'react-router-dom';

import MainContent from '@dc/shared/MainContent/MainContent';
import { usePublicCourseQuery } from '@dc/graphql/public/hooks/usePublicCourseQuery';
import { CourseSkeleton } from '@dc/screens/GuestApp/Course/CourseSkeleton';
import { CourseBasicInfo } from '@dc/components/Student/Course/CourseBasicInfo';
import { StudentCourseLessons } from '@dc/components/Student/Course/Lessons/Lessons';

import useQueryParams from '@shared/hooks/useQueryParams';
import { ReadSpeaker } from '@shared/components/ReadSpeaker/ReadSpeaker';

export const Course = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const {
    params: { code },
  } = useQueryParams<{ code: string }>();
  const { data, loading } = usePublicCourseQuery({
    code,
    shareId,
  });

  if (loading) {
    return <CourseSkeleton />;
  }

  if (!data) {
    return null;
  }
  const { name, description, pathway, lessons } = data.course;

  return (
    <MainContent className='!mt-xxxs'>
      <CourseBasicInfo description={description} name={name} pathway={pathway} />
      <StudentCourseLessons lessons={lessons} />
      <div className='w-[168px] flex flex-col h-screen pt-base'>
        <ReadSpeaker />
      </div>
    </MainContent>
  );
};
