import cx from 'classnames';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Formik } from 'formik';
import { useMutation, ApolloError } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';
import { CREATE_CHECKIN_QUESTION_ANSWER } from '@dc/graphql/student/mutations/createCheckInQuestionAnswer';
import currentCoursesQuery from '@dc/graphql/student/queries/currentCourses';
import GradeStatus from '@dc/components/Student/Lesson/GradeStatus/GradeStatus';
import lessonInCourseQuery from '@dc/graphql/student/queries/lessonInCourse';
import { UPDATE_CHECKIN_QUESTION_ANSWER } from '@dc/graphql/student/mutations/updateCheckInQuestionAnswer';
import { getFormErrors } from '@dc/utils/graphql';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';
import { handleError } from '@shared/utils/handleError';

StudentLessonCheckInQuestion.propTypes = {
  checkInQuestion: PropTypes.shape({
    __typename: PropTypes.string,
    answer: PropTypes.shape({
      answer: PropTypes.string,
      checkInQuestionId: PropTypes.string,
      grade: PropTypes.shape({
        lastGradedBy: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
        }),
        status: PropTypes.string,
      }),
      id: PropTypes.string,
      lessonId: PropTypes.string,
      studentId: PropTypes.string,
    }),
    id: PropTypes.string,
    question: PropTypes.string,
  }),
  previewOnly: PropTypes.bool,
};

function StudentLessonCheckInQuestion({
  checkInQuestion: { __typename, answer, id: checkInQuestionId, question },
  previewOnly,
}) {
  const [isEditing, setEditing] = useState(!answer?.answer);
  const { lessonId, courseId } = useParams();
  const { t } = useTranslation();
  const [createCheckInAnswer] = useMutation(CREATE_CHECKIN_QUESTION_ANSWER);
  const [updateCheckInAnswer] = useMutation(UPDATE_CHECKIN_QUESTION_ANSWER);

  const validationSchema = Yup.object().shape({
    answer: Yup.string().required(t('validation.messages.required')),
  });

  const enableEditing = () => setEditing(true);

  const handleSubmit = async ({ answer: passedAnswer }, { setFieldError } = {}) => {
    try {
      setEditing(false);
      if (answer) {
        await updateCheckInAnswer({
          variables: { input: { id: answer.id, answer: passedAnswer, courseId } },
          refetchQueries: [
            {
              query: lessonInCourseQuery,
              variables: {
                courseId,
                lessonId,
                track: false,
              },
            },
          ],
        });

        setEditing(false);
      } else {
        await createCheckInAnswer({
          variables: {
            input: {
              checkInQuestionId,
              lessonId,
              courseId,
              answer: passedAnswer,
            },
          },
          refetchQueries: [
            {
              query: lessonInCourseQuery,
              variables: {
                courseId,
                lessonId,
                track: false,
              },
            },
            { query: currentCoursesQuery },
            'CourseTableOfContent',
          ],
        });
      }
    } catch (error) {
      setEditing(true);
      if (error instanceof ApolloError) {
        const errors = getFormErrors(error);
        setFieldError('answer', errors.answer || error.message);
      } else {
        handleError(error);
      }
    }
  };

  return (
    <Card
      className='student-check-in-question'
      data-testid='lesson-item-check-in-question'
      id={__typename + checkInQuestionId}
      title={question}>
      <Formik
        initialValues={{ answer: answer?.answer || '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ handleSubmit, isSubmitting, dirty, values, initialValues }) => (
          <>
            <SharedFormTextarea
              className='student-check-in-question__textarea mb-sm'
              disabled={previewOnly || !isEditing}
              name='answer'
              placeholder={t('student.lesson.items.CheckInQuestion.placeholder')}
            />
            <div className='flex flex-row content-center justify-center'>
              <GradeStatus
                grade={answer?.grade}
                gradeStatus={answer?.grade?.status}
                showTextStatus={true}
                statusClassName='student-check-in-question__status__info'
              />
              <SharedButton
                className={cx('ml-auto', {
                  'student-check-in-question__save-button': isEditing,
                  'student-check-in-question__edit-button self-end': !isEditing,
                })}
                disabled={
                  previewOnly ||
                  (isEditing &&
                    ((!dirty && initialValues.answer?.length === 0) || values.answer?.length === 0))
                }
                isLoading={isSubmitting}
                size='md'
                type='submit'
                variant={isEditing ? 'primary' : 'primary-outlined'}
                onClick={isEditing ? handleSubmit : enableEditing}>
                {isEditing ? t('common.actions.save') : t('common.actions.edit')}
              </SharedButton>
            </div>
          </>
        )}
      </Formik>
    </Card>
  );
}

export default StudentLessonCheckInQuestion;
