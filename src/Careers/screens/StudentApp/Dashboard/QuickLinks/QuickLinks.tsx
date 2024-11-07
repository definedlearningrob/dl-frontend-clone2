import {
  useAssessmentAttemptStatusQuery,
  useOverallProgressQuery,
} from '@graphql/dc/students/hooks';
import { useTranslation } from 'react-i18next';
import { compact } from 'lodash-es';
import { useMutation } from '@apollo/client';
import { AssessmentAttemptStatus } from '@graphql/dc/shared/types';

import { ReactComponent as FinalReport } from '@dc/svg/file_document.svg';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import createAssessmentAttemptMutation from '@dc/graphql/student/mutations/createAssessmentAttempt';
import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';

import { NavTile } from '@shared/components/NavTile/NavTile';
import { ReactComponent as CareerReviewSurveyIcon } from '@shared/assets/icons/task.svg';
import { ReactComponent as RefreshIcon } from '@shared/assets/icons/refresh.svg';
import { ReactComponent as ChartIcon } from '@shared/assets/icons/chart_bar_2.svg';
import { formatDateTime } from '@shared/utils/date';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

export const QuickLinks = () => {
  const { data } = useAssessmentAttemptStatusQuery();
  const { data: overallProgressData } = useOverallProgressQuery();
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TStudentInfo>();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const lastAssessmentDate = data?.assessmentProgress?.attempt?.updatedAt;

  const isAssessmentEnabled = userInfo.settings.assessmentEnabled;

  const hasAssessment =
    isAssessmentEnabled && lastAssessmentDate && userInfo.hasCompletedAssessment;

  const canAccessFinalReport =
    overallProgressData?.overallProgress?.enrolledInCourse || hasAssessment;

  const hasFinishedAssessment =
    data?.assessmentProgress?.attempt?.status === AssessmentAttemptStatus.FINISHED;

  const hasAssessmentInProgress =
    data?.assessmentProgress?.attempt?.status === AssessmentAttemptStatus.IN_PROGRESS;

  const [createAssessmentAttempt, { loading: creatingAttempt }] = useMutation(
    createAssessmentAttemptMutation,
    {
      variables: { input: {} },
      refetchQueries: [{ query: assessmentAttemptStatusQuery }],
      awaitRefetchQueries: true,
    }
  );

  const assessmentInProgressTitle = t('student.dashboard.continueAssessment');

  const assessmentTitle = hasAssessment
    ? t('student.dashboard.retakeAssessment')
    : t('student.dashboard.takeAssessment');

  const linksToRender = compact([
    hasAssessment && {
      title: t('student.dashboard.assessmentRecommendation'),
      to: 'choose-pathway',
      Icon: ChartIcon,
    },
    isAssessmentEnabled && {
      title: hasAssessmentInProgress ? assessmentInProgressTitle : assessmentTitle,
      to:
        hasAssessment || hasAssessmentInProgress
          ? '/onboarding'
          : '/onboarding/assessment/step/1/question/1',
      Icon: hasAssessment ? RefreshIcon : FinalReport,
      ...(lastAssessmentDate && {
        subtitle: t('student.dashboard.assessmentUpdated', {
          date: formatDateTime(lastAssessmentDate),
        }),
      }),
      ...(((!hasAssessment && !hasAssessmentInProgress) || hasFinishedAssessment) && {
        onClick: createAssessmentAttempt,
        isLoading: creatingAttempt,
      }),
    },
    {
      title: t('student.dashboard.carerReviewSurvey'),
      to: '/career-review-survey',
      Icon: CareerReviewSurveyIcon,
    },
    canAccessFinalReport && {
      title: t('student.dashboard.finalReport'),
      to: '/final-report',
      Icon: FinalReport,
    },
  ]);

  return (
    <>
      <h5 className='text-sm xxxl:text-base mb-sm'>{t('student.dashboard.highlights')}</h5>
      <ul className='flex flex-col gap-sm'>
        {linksToRender.map((link, index) => (
          <li key={link.title}>
            <NavTile key={index} {...link} size={isFullHD ? 'base' : 'small'} />
          </li>
        ))}
      </ul>
    </>
  );
};
