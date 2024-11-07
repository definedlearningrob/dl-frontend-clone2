import { useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { AssignmentGrading } from '@dc/components/User/Student/GradingModal/AssignmentGrading/AssignmentGrading';
import { BottomNavigation } from '@dc/components/User/Student/GradingModal/BottomNavigation/BottomNavigation';
import CheckInBody from '@dc/components/User/Student/GradingModal/CheckInBody/CheckInBody';
import { GradingFooter } from '@dc/components/User/Student/GradingModal/Footer/Footer';
import gradeSubmissionMutation from '@dc/graphql/user/mutations/gradeSubmission';
import { GradingModalHeader } from '@dc/components/User/Student/GradingModal/GradingModalHeader/GradingModalHeader';
import { TEACHER_DASHBOARD } from '@dc/graphql/user/queries/teacherDashboardClassesStats';
import useCourseActivity from '@dc/hooks/useCourseActivity';
import { GRADE_STATUSES, SUBMISSION_TYPES } from '@dc/resources/constants';
import useUserInfo from '@dc/hooks/useUserInfo';
import { GRADE_ASSIGNMENT_SUBMISSION } from '@dc/graphql/user/mutations/gradeAssignmentSubmission';

import { defaultRubricData } from '@shared/components/Rubrics/utils/defaultRubricData';
import { RubricProvider } from '@shared/components/Rubrics/RubricProvider';
import SharedModal from '@shared/components/Modal/Modal';
import { RUBRIC_TYPE } from '@shared/components/Rubrics/utils/enums';
import { callToast } from '@shared/components/Toaster/Toaster';

function UserStudentGradingModal() {
  const {
    refetchGrading,
    setItemToGradeByIndex,
    itemToGrade,
    triggerRefetchQueries,
    setIsSimplifiedGradingEnabled,
    isSimplifiedGradingEnabled,
  } = useCourseActivity({ withQuery: true });

  const { t } = useTranslation();
  const [gradeStudentInput, { loading }] = useMutation(gradeSubmissionMutation);
  const type = useMemo(() => itemToGrade?.__typename?.toLowerCase(), [itemToGrade]);
  const input = itemToGrade?.submission || itemToGrade?.answer;
  const [isLoading, setIsLoading] = useState(false);
  const [gradeWithRubric] = useMutation(GRADE_ASSIGNMENT_SUBMISSION);
  const {
    userInfo: { firstName, lastName },
  } = useUserInfo();

  const [productRubric] = itemToGrade?.rubrics || [];

  const hasRubrics = !isEmpty(itemToGrade.rubrics);

  const refetchQueries = [{ query: TEACHER_DASHBOARD }];

  const closeModal = () => {
    setItemToGradeByIndex(null);
    triggerRefetchQueries();
  };

  const gradeInput = async (status) => {
    try {
      setIsLoading(true);

      await gradeStudentInput({
        variables: {
          input: {
            lessonId: itemToGrade?.lesson?.id,
            submissionId: input?.id,
            submissionType: {
              assignment: SUBMISSION_TYPES.ASSIGNMENT,
              checkinquestion: SUBMISSION_TYPES.CHECK_IN,
            }[type],
            status,
          },
        },
        awaitRefetchQueries: true,
        refetchQueries,
      });

      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error', error);
      setIsLoading(false);
    }
  };

  const handleGrade = async (type, results) => {
    setIsLoading(true);
    try {
      if (results) {
        await gradeWithRubric({
          variables: {
            input: {
              lessonId: itemToGrade?.lesson?.id,
              rubricId: productRubric.id,
              submissionId: itemToGrade?.submission.id,
              results,
            },
          },
          awaitRefetchQueries: true,
          refetchQueries,
        });
      } else {
        const gradeStatus =
          type === 'accept' ? GRADE_STATUSES.ACCEPTED : GRADE_STATUSES.NOT_ACCEPTED;

        await gradeInput(gradeStatus);
      }
    } catch (error) {
      callToast('error', t('common.error', { error }));
    }

    await refetchGrading();
    setIsLoading(false);
  };

  const modalBody = useMemo(
    () =>
      type === 'assignment' ? (
        <AssignmentGrading assignment={itemToGrade} />
      ) : (
        <CheckInBody checkIn={itemToGrade} />
      ),
    [itemToGrade, type]
  );

  if (!itemToGrade) return null;

  const typeName = {
    assignment: t('user.student.coursesActivity.assignment'),
    checkinquestion: t('user.student.coursesActivity.checkIn'),
  }[type];

  const itemName = `${itemToGrade?.lesson?.name}: ${typeName}`;

  const rubric = useMemo(() => {
    if (isEmpty(itemToGrade.rubrics)) {
      return {
        name: itemToGrade.displayName,
        id: itemToGrade.id,
        criteriaLabels: defaultRubricData.criteriaLabels,
        criterias: defaultRubricData.criterias.map((criterion) => ({
          ...criterion,
          text: t(criterion.text),
        })),
        headings: defaultRubricData.headings.map((heading) => ({
          ...heading,
          name: t(heading.name),
        })),
      };
    }

    return productRubric;
  }, [itemToGrade]);

  return (
    <SharedModal
      className='h-[80vh]'
      disableAnimation={true}
      isOpen={true}
      variant='ultra-wide'
      onDismiss={closeModal}>
      <GradingModalHeader
        answer={itemToGrade.answer}
        hasRubrics={hasRubrics}
        isSimplifiedGradingEnabled={isSimplifiedGradingEnabled}
        itemName={itemName}
        setIsSimplifiedGradingEnabled={setIsSimplifiedGradingEnabled}
        status={itemToGrade.status}
        submission={itemToGrade.submission}
        type={type}
        updatedAt={itemToGrade.submission?.updatedAt || itemToGrade.answer?.updatedAt}
        onClose={closeModal}
      />
      <RubricProvider
        grader={{ firstName, lastName }}
        initialResults={itemToGrade?.submission?.rubricGrade?.results}
        rubric={rubric}
        type={hasRubrics && !isSimplifiedGradingEnabled ? RUBRIC_TYPE.GRADER : RUBRIC_TYPE.PREVIEW}>
        <SharedModal.Body className='flex flex-col gap-sm'>
          <div className='pt-base grow'>{modalBody}</div>
        </SharedModal.Body>
        <SharedModal.Footer className='flex flex-col gap-sm mt-auto'>
          <footer className='w-full flex flex-col gap-sm'>
            <GradingFooter
              hasRubrics={hasRubrics}
              input={input}
              loading={isLoading || loading}
              status={itemToGrade?.status}
              onGrade={handleGrade}
            />
            <BottomNavigation />
          </footer>
        </SharedModal.Footer>
      </RubricProvider>
    </SharedModal>
  );
}

export default UserStudentGradingModal;
