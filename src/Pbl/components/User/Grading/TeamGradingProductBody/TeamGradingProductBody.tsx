import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

import { useSchoolClassTeam } from '@pbl/graphql/user/hooks/useSchoolClassTeam';
import useProductSubmissionToGrade from '@pbl/graphql/user/hooks/useProductSubmissionToGrade';
import useUserInfo from '@pbl/hooks/useUserInfo';

import Card from '@shared/components/Card/Card';
import { TeamHeader } from '@shared/components/TeamHeader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { TeamMemberList } from '@shared/components/TeamMemberList';
import { CONVERSATION_CONTEXT_TYPES, SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';
import { ReactComponent as EmptyProductIcon } from '@shared/svg/check_in.svg';
import { RubricProvider } from '@shared/components/Rubrics/RubricProvider';
import { RubricsViewer } from '@shared/components/Rubrics/RubricsViewer';
import { RUBRIC_TYPE } from '@shared/components/Rubrics/utils/enums';
import { cleanInjection } from '@shared/utils/cleanInjection';

import GradingProductFiles from '../GradingProductFiles/GradingProductFiles';
import { useGradingContext } from '../GradingContext';
import GradingBodyMessaging from '../GradingBodyMessaging';
import { parseCreatedDate } from '../helpers/parseCreatedOnDate';
import GradingRubricActions from '../GradingRubricActions';
import { createTeacherName } from '../helpers/createTeacherName';

import styles from './TeamGradingProductBody.module.sass';

export const TeamGradingProductBody = () => {
  const { t } = useTranslation();
  const { teamId, classId } = useParams<{ teamId: string; classId: string }>();
  const {
    navigation: { projectId, itemId, subjectId },
  } = useGradingContext();
  const {
    data: teamData,
    loading: teamLoading,
    error: teamError,
  } = useSchoolClassTeam({ classUuid: classId, teamUuid: teamId });
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useProductSubmissionToGrade(projectId, itemId, subjectId, true);

  const {
    userInfo: { firstName, lastName },
  } = useUserInfo();
  const printRef = useRef<HTMLDivElement>(null);
  const onPrint = useReactToPrint({
    content: () => printRef.current,
  });

  const loading = productLoading || teamLoading;
  const error = productError || teamError;

  const lastSubmissionDate = useMemo(() => {
    if (!productData) {
      return null;
    }

    return productData.project.product.submission?.updatedAt;
  }, [productData]);

  if (loading) {
    return <SharedLoadingSpinner size='small' />;
  }

  if (error) {
    return null;
  }

  const { team } = teamData!.schoolClass;
  const { product } = productData!.project;

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
    <Card className={styles.card}>
      <Card.Header>
        <TeamHeader memberCount={team.students.nodes.length} teamName={team.name} />
        {lastSubmissionDate && (
          <div className={styles.lastSubmissionDate}>
            {t('user.grading.lastSubmittedOn', {
              date: parseCreatedDate(lastSubmissionDate),
            })}
          </div>
        )}
      </Card.Header>
      <TeamMemberList teamMembers={team.students.nodes} />
      {!product.submission && (
        <div className={styles.emptyContainer}>
          <EmptyProductIcon />
        </div>
      )}
      <Card.Body className={styles.cardBody}>
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
      </Card.Body>
      {product.submission && (
        <Card.Footer className={styles.cardFooter}>
          <GradingBodyMessaging
            contextId={product.submission.id}
            type={CONVERSATION_CONTEXT_TYPES.PRODUCT_SUBMISSION}
          />
        </Card.Footer>
      )}
    </Card>
  );
};
