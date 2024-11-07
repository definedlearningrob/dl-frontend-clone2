import CoursesNew from '@dc/components/Admin/Courses/New/New';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { useCareerReviewSurveyLessonQuery } from '@dc/graphql/user/hooks/useCareerReviewSurveyLessonQuery';

function NewCourse() {
  const { data } = useCareerReviewSurveyLessonQuery();

  if (!data) return null;

  return (
    <SharedMainContent>
      <CoursesNew surveyLesson={data.careerReviewSurveyLesson} />
    </SharedMainContent>
  );
}

export default NewCourse;
