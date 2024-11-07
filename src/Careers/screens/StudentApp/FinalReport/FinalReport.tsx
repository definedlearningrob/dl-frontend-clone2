import { useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useTranslation } from 'react-i18next';
import { useFinalReportQuery, useMarkFinalReportAsSeenMutation } from '@graphql/dc/students/hooks';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { ReactComponent as PrintIcon } from '@dc/svg/print.svg';
import { FinalReportNavigation } from '@dc/components/FinalReport/FinalReportNavigation/FinalReportNavigation';
import { FinalReportAssessmentResults } from '@dc/components/FinalReport/FinalReportAssessmentResults/FinalReportAssessmentResults';
import { FinalReportExploredCourses } from '@dc/components/FinalReport/FinalReportExploredCourses/FinalReportExploredCourses';
import { FinalReportRecommendedCourses } from '@dc/components/FinalReport/FinalReportRecommendedCourses/FinalReportRecommendedCourses';

import SharedButton from '@shared/components/Button/Button';
import Card from '@shared/components/Card/Card';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export const FinalReport = () => {
  const printableRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [markFinalReportAsSeen] = useMarkFinalReportAsSeenMutation();
  const {
    data: finalReportData,
    loading,
    error,
  } = useFinalReportQuery({ variables: { track: true }, fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (!!finalReportData?.finalReport) {
      markFinalReportAsSeen({ variables: { input: {} } });
    }
  }, [finalReportData]);

  if (loading) {
    return <SharedLoadingSpinner size='small' />;
  }

  if (error || !finalReportData) {
    return <div className='text-center'>{t('common.messages.dataLoadingError')}</div>;
  }

  const { finalReport, userInfo } = finalReportData;

  const hasAssessmentAttempt = !!finalReport.assessmentAttempt;

  return (
    <SharedMainContent>
      <div ref={printableRef}>
        <div className='flex justify-between items-center mb-base'>
          <h1 className='mb-0 text-lg'>{t('student.finalReport.title')}</h1>
          <ReactToPrint
            content={() => printableRef.current}
            trigger={() => (
              <SharedButton Icon={PrintIcon} variant='primary'>
                {t('student.finalReport.print')}
              </SharedButton>
            )}
          />
        </div>
        <div className='flex gap-base xxxl:gap-md items-start'>
          <div ref={printableRef} className='flex flex-col gap-md w-2/3'>
            {hasAssessmentAttempt && (
              <Card>
                <FinalReportAssessmentResults
                  finalReport={finalReport}
                  studentName={`${userInfo.firstName} ${userInfo.lastName}`}
                />
              </Card>
            )}
            <Card>
              <FinalReportExploredCourses courses={finalReport.currentCourses} />
            </Card>
            {hasAssessmentAttempt && (
              <Card>
                <FinalReportRecommendedCourses
                  recommendedCourses={finalReport.recommendedCourses}
                />
              </Card>
            )}
          </div>
          <Card className='w-1/3 sticky top-lg'>
            <FinalReportNavigation hasAssessmentResults={hasAssessmentAttempt} />
          </Card>
        </div>
      </div>
    </SharedMainContent>
  );
};
