import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import Details from '@dc/components/Admin/Lessons/Form/Details/Details';
import lessonCoursesQuery from '@dc/graphql/user/queries/lessonCourses';
import { LessonItems } from '@dc/components/Admin/Lessons/Form/Items/Items';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { AFFECTED_RESOURCES_FILED, LESSON_TYPES } from '@dc/resources/constants';
import { shapeLessonForm } from '@dc/resources/typeDefs';
import { BadgesSelector } from '@dc/components/Admin/BadgeManagement/BadgesSelector/BadgesSelector';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import Card from '@shared/components/Card/Card';

import Checkins from './Checkins/Checkins';

AdminLessonsForm.propTypes = {
  ...shapeLessonForm,
  title: PropTypes.string,
};

function AdminLessonsForm({ errors, touched, title }) {
  const { isSubmitting, initialValues } = useFormikContext();
  const history = useHistory();
  const { id } = useParams();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  const isSurveyLesson = initialValues.type?.value === LESSON_TYPES.CAREER_REVIEW_SURVEY;

  useScrollToInvalidFormElement();

  return (
    <AdminFormWrapper data-testid='lessons-form' title={title}>
      <Details errors={errors} isSurvey={isSurveyLesson} touched={touched} />
      <Checkins />
      {!isSurveyLesson && (
        <Card>
          <LessonItems />
        </Card>
      )}
      <Card>
        <BadgesSelector />
      </Card>
      {id && (
        <AffectedResources
          id={id}
          query={lessonCoursesQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.COURSES}
        />
      )}
      <FormActions isLoading={isSubmitting} onCancel={history.goBack} />
    </AdminFormWrapper>
  );
}

export default AdminLessonsForm;
