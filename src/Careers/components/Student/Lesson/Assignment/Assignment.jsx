import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import currentCoursesQuery from '@dc/graphql/student/queries/currentCourses';
import lessonInCourseQuery from '@dc/graphql/student/queries/lessonInCourse';
import { ASSESSMENT_SUBMISSION_STATUS } from '@dc/resources/constants';
import { UPDATE_ASSIGNMENT_SUBMISSION_MUTATION } from '@dc/graphql/student/mutations/updateAssignmentSubmission';

import { AssignmentCard } from './AssignmentCard/AssignmentCard';

StudentLessonAssignment.propTypes = {
  assignment: PropTypes.shape({
    __typename: PropTypes.string,
    description: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    submission: PropTypes.shape({
      files: PropTypes.array,
      grade: PropTypes.shape({
        lastGradedBy: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
        }),
        status: PropTypes.string,
      }),
      id: PropTypes.string,
      status: PropTypes.string,
    }),
  }),
  previewOnly: PropTypes.bool,
};

function StudentLessonAssignment({ assignment, previewOnly }) {
  const { __typename, id, submission } = assignment;
  const generatedUUID = __typename + id;
  const { lessonId, courseId } = useParams();
  const [updateAssignmentSubmission, { loading }] = useMutation(
    UPDATE_ASSIGNMENT_SUBMISSION_MUTATION
  );

  const IS_SUBMITTED = submission?.status === ASSESSMENT_SUBMISSION_STATUS.SUBMITTED;

  const handleSubmission = async () => {
    try {
      const status = IS_SUBMITTED
        ? ASSESSMENT_SUBMISSION_STATUS.DRAFT
        : ASSESSMENT_SUBMISSION_STATUS.SUBMITTED;

      await updateAssignmentSubmission({
        variables: {
          input: {
            courseId,
            id: submission.id,
            status,
          },
        },
        awaitRefetchQueries: true,
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  };

  return (
    <div className='mb-md' data-testid='lesson-item-assignment'>
      <AssignmentCard
        assignment={assignment}
        cardId={generatedUUID}
        contextId={courseId}
        isPreviewOnly={previewOnly}
        isSubmitting={loading}
        onSubmit={handleSubmission}
      />
    </div>
  );
}

export default StudentLessonAssignment;
