import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import useGradeProductMutation from '@pbl/graphql/user/hooks/useGradeProductMutation';
import updateLtiResourceGrade from '@pbl/graphql/user/mutations/updateLtiResourceGrade';

import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as PrintIcon } from '@shared/svg/print.svg';
import { useRubric } from '@shared/components/Rubrics/RubricProvider/RubricProvider';
import { Kicker } from '@shared/components/Kicker';
import { useLti } from '@shared/components/LtiProvider/LtiProvider';
import { SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';
import { callToast } from '@shared/components/Toaster/Toaster';
import SharedIcon from '@shared/components/Icon/Icon';

import GradingStatus from '../GradingStatus/GradingStatus';
import { useGradingContext } from '../GradingContext/GradingContext';

import styles from './GradingRubricActions.module.sass';

type Props = {
  pointsCollected: number;
  pointsAvailable: number;
  gradedBy: string;
  status?: SUBMISSION_GRADE_STATUS;
  submissionId?: string;
  onPrint?: () => void;
};

const GradingRubricActions = ({
  pointsAvailable,
  pointsCollected,
  gradedBy,
  onPrint,
  status,
  submissionId,
}: Props) => {
  const {
    navigation: { projectId },
    gradeItem,
  } = useGradingContext();
  const {
    grading: { isFullyGraded, results },
    rubric,
  } = useRubric();
  const { t } = useTranslation();
  const { isLti } = useLti();

  const [recordGrade] = useMutation(updateLtiResourceGrade);

  const [mutate, { loading }] = useGradeProductMutation(projectId, rubric.id);
  const isGradingDisabled = !isFullyGraded || !submissionId;

  const gradeSubmission = async () => {
    if (isGradingDisabled) return;

    try {
      const gradeResults = await mutate(submissionId, results);
      const scoredPoints = gradeResults.data?.gradeProductSubmission?.grade?.pointsScored || 0;
      const totalPoints = gradeResults.data?.gradeProductSubmission?.grade?.pointsAvailable || 0;

      callToast('success', t('user.grading.success'));
      gradeItem();

      if (isLti && submissionId !== undefined) {
        recordGrade({
          variables: {
            input: {
              grade: totalPoints === 0 ? 0 : Math.round((scoredPoints / totalPoints) * 100),
              submissionId: submissionId,
            },
          },
        });
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('user.grading.error'));
      }
    }
  };

  return (
    <>
      <div className='mb-md'>
        <div className='flex justify-between w-full'>
          {onPrint && (
            <SharedButton
              className='print:!hidden'
              size='sm'
              variant='primary-outlined'
              onClick={onPrint}>
              <SharedIcon icon={<PrintIcon />} size='xs' />
              {t('sharedCommon.print')}
            </SharedButton>
          )}
          <div>
            <Kicker>{t('user.grading.score')}</Kicker>
            <span className={cx(styles.score, 'print:!text-left')}>
              {pointsCollected} / {pointsAvailable}
            </span>
          </div>
        </div>
      </div>
      <div className='print:!hidden flex justify-between items-end'>
        <GradingStatus gradedBy={gradedBy} status={status} />
        <SharedButton
          className={styles.saveButton}
          disabled={isGradingDisabled}
          isLoading={loading}
          size='sm'
          variant='success'
          onClick={gradeSubmission}>
          {t('common.actions.save')}
        </SharedButton>
      </div>
    </>
  );
};

export default GradingRubricActions;
