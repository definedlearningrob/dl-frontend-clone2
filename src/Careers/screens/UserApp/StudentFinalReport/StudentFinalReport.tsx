import { useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStudentFinalReportQuery } from '@graphql/dc/users/hooks';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { ReactComponent as PrintIcon } from '@dc/svg/print.svg';
import { FinalReportNavigation } from '@dc/components/FinalReport/FinalReportNavigation/FinalReportNavigation';
import { FinalReportAssessmentResults } from '@dc/components/FinalReport/FinalReportAssessmentResults/FinalReportAssessmentResults';
import { FinalReportExploredCourses } from '@dc/components/FinalReport/FinalReportExploredCourses/FinalReportExploredCourses';
import { FinalReportRecommendedCourses } from '@dc/components/FinalReport/FinalReportRecommendedCourses/FinalReportRecommendedCourses';

import SharedButton from '@shared/components/Button/Button';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import Card from '@shared/components/Card/Card';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

function UserAppStudentAssessmentResults() {
  const printableRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { data, loading, error } = useStudentFinalReportQuery({
    variables: {
      track: true,
      uuid: id,
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    setBackNavButton(true, `/students/${id}`);

    return () => {
      setBackNavButton(false, null);
    };
  }, []);

  if (loading) {
    return <SharedLoadingSpinner size='small' />;
  }

  if (error || !data?.student) {
    return <div className='text-center'>{t('common.messages.dataLoadingError')}</div>;
  }

  const {
    student,
    student: { finalReport },
  } = data;

  const hasAssessmentAttempt = !!finalReport.assessmentAttempt;

  return (
    <SharedMainContent>
      <div ref={printableRef} className='user-student-assessment-results'>
        <div className='final-report'>
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
                    studentName={`${student.firstName} ${student.lastName}`}
                  />
                </Card>
              )}
              <Card>
                <FinalReportExploredCourses courses={finalReport.currentCourses} />
              </Card>
              <Card>
                <FinalReportRecommendedCourses
                  recommendedCourses={finalReport.recommendedCourses}
                />
              </Card>
            </div>
            <Card className='w-1/3 sticky top-lg'>
              <FinalReportNavigation hasAssessmentResults={hasAssessmentAttempt} />
            </Card>
          </div>
        </div>
      </div>
    </SharedMainContent>
  );
}

export default UserAppStudentAssessmentResults;
