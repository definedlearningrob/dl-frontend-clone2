import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { isEmpty } from 'lodash-es';

import { GradingStatus } from '@dc/components/User/Student/GradingModal/Footer/GradingStatus';
import { TRubricResult, TSubmission } from '@dc/graphql/user/queries/studentCourseActivity';
import useCourseActivity from '@dc/hooks/useCourseActivity';

import SharedButton from '@shared/components/Button/Button';
import { useRubric } from '@shared/components/Rubrics/RubricProvider';

type Props = {
  input: TSubmission | null;
  loading: boolean;
  onGrade: (status: 'accept' | 'reject', gradingResults?: TRubricResult[]) => void;
  status: 'not-answered' | 'not-graded' | 'updated' | 'accepted' | 'not-accepted' | 'graded';
  hasRubrics: boolean;
};

export function GradingFooter({ input, loading, onGrade, status, hasRubrics }: Props) {
  const { t } = useTranslation();
  const { grading } = useRubric();

  const { isSimplifiedGradingEnabled } = useCourseActivity();

  const isGradedByRubrics = !isEmpty(input?.rubricGrade);
  const grade = isGradedByRubrics ? input?.rubricGrade : input?.grade;

  const hasSubmission = !!input;

  const variables = {
    isSimplifiedGradingEnabled,
    hasSubmission,
    hasRubrics,
  };

  const { isRubricGradingEnabled } = match(variables)
    .with({ isSimplifiedGradingEnabled: true, hasRubrics: true, hasSubmission: true }, () => ({
      isRubricGradingEnabled: false,
    }))
    .with({ isSimplifiedGradingEnabled: false, hasRubrics: true, hasSubmission: true }, () => ({
      isRubricGradingEnabled: true,
    }))
    .with({ hasRubrics: false, hasSubmission: true }, () => ({
      isRubricGradingEnabled: false,
    }))
    .otherwise(() => ({ isRubricGradingEnabled: false }));

  return (
    <div className='flex items-center justify-between'>
      {input && <GradingStatus gradedBy={grade?.lastGradedBy} input={input} status={status} />}
      <div className='flex items-center gap-xs'>
        {!isRubricGradingEnabled && input && (
          <>
            <SharedButton
              data-testid='grade-button-reject'
              isLoading={loading}
              variant='danger'
              onClick={() => onGrade('reject')}>
              {t('user.student.coursesActivity.reject')}
            </SharedButton>
            <SharedButton
              data-testid='grade-button-accept'
              isLoading={loading}
              variant='success'
              onClick={() => onGrade('accept')}>
              {t('user.student.coursesActivity.accept')}
            </SharedButton>
          </>
        )}
        {isRubricGradingEnabled && (
          <div className='flex gap-sm items-center'>
            <SharedButton
              data-testid='grade-button-accept'
              disabled={!grading.isFullyGraded}
              isLoading={loading}
              variant='primary'
              onClick={() => onGrade('accept', grading.results)}>
              {t('user.student.coursesActivity.grade')}
            </SharedButton>
          </div>
        )}
      </div>
    </div>
  );
}
