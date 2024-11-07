import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

import useProductSubmissionToGrade from '@pbl/graphql/user/hooks/useProductSubmissionToGrade';
import useStudent from '@pbl/graphql/user/hooks/useStudent';
import useUserInfo from '@pbl/hooks/useUserInfo';

import { RUBRIC_TYPE } from '@shared/components/Rubrics/utils/enums';
import { RubricProvider } from '@shared/components/Rubrics/RubricProvider/RubricProvider';
import SharedCard from '@shared/components/Card/Card';
import { CONVERSATION_CONTEXT_TYPES, SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';
import { ReactComponent as EmptyCheckInsIcon } from '@shared/svg/check_in.svg';
import { RubricsViewer } from '@shared/components/Rubrics/RubricsViewer';
import { cleanInjection } from '@shared/utils/cleanInjection';

import { useGradingContext } from '../GradingContext/GradingContext';
import GradingBodyMessaging from '../GradingBodyMessaging';
import GradingBodyHeader from '../GradingBodyHeader/GradingBodyHeader';
import GradingRubricActions from '../GradingRubricActions';
import GradingProductFiles from '../GradingProductFiles/GradingProductFiles';
import { createTeacherName } from '../helpers/createTeacherName';

import styles from './GradingProductBody.module.sass';

const GradingContentBody = () => {
  const {
    navigation: { pickedStudent, projectId, itemId, subjectId },
  } = useGradingContext();
  const {
    userInfo: { firstName, lastName },
  } = useUserInfo();

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useProductSubmissionToGrade(projectId, itemId, subjectId);
  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
  } = useStudent(subjectId!, Boolean(pickedStudent));

  const printRef = useRef<HTMLDivElement>(null);

  const onPrint = useReactToPrint({
    content: () => printRef.current,
  });

  const loading = productLoading || studentLoading;
  const error = productError || studentError;

  if (loading || error || !productData) return null;

  const {
    project: { product },
  } = productData;

  const rubric = product.rubrics[0];
  const status = product.submission?.grade && SUBMISSION_GRADE_STATUS.ACCEPTED;
  const submissionId = product.submission?.id;
  const pointsCollected = product.submission?.grade?.pointsScored || 0;
  const pointsAvailable = product.submission?.grade?.pointsAvailable || rubric.pointsAvailable;
  const initialGrades = product.submission?.grade?.results;

  const additionalPrintInfo = (
    <div className='hidden print:block'>
      <h5>{rubric.displayName}</h5>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={cleanInjection(rubric.description)} />
    </div>
  );

  return (
    <SharedCard className={styles.card} withoutPadding={true}>
      <SharedCard.Body className={styles.cardBody}>
        <GradingBodyHeader
          studentName={pickedStudent || studentData?.student.name}
          submittedOn={product.submission?.updatedAt}
        />
        {!submissionId && (
          <div className={styles.emptyContainer}>
            <EmptyCheckInsIcon />
          </div>
        )}
        <GradingProductFiles submission={product.submission} />

        <RubricProvider
          key={subjectId}
          grader={{ firstName, lastName }}
          initialResults={initialGrades}
          rubric={rubric}
          type={submissionId ? RUBRIC_TYPE.GRADER : RUBRIC_TYPE.VIEWER}>
          <div ref={printRef} className={styles.rubricWrapper}>
            {additionalPrintInfo}
            <RubricsViewer />
            <GradingRubricActions
              gradedBy={createTeacherName(product.submission?.grade?.lastGradedBy.name)}
              pointsAvailable={pointsAvailable}
              pointsCollected={pointsCollected}
              status={status}
              submissionId={submissionId}
              onPrint={onPrint}
            />
          </div>
        </RubricProvider>
      </SharedCard.Body>
      {product.submission && (
        <SharedCard.Footer className={styles.cardFooter}>
          <GradingBodyMessaging
            contextId={product.submission.id}
            type={CONVERSATION_CONTEXT_TYPES.PRODUCT_SUBMISSION}
          />
        </SharedCard.Footer>
      )}
    </SharedCard>
  );
};
export default GradingContentBody;
