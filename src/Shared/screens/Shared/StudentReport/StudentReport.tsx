import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { MainContent } from '@shared/components/MainContent/MainContent';
import { StudentReportSummary } from '@shared/screens/Shared/StudentReport/StudentReportSummary/StudentReportSummary';
import Avatar from '@shared/components/Avatar/Avatar';
import { STUDENT_REPORT_PROGRESS_BY_USER } from '@shared/graphql/user/query/studentReportProgressByUser';
import { STUDENT_REPORT_PROGRESS_BY_STUDENT } from '@shared/graphql/student/query/studentReportProgressByStudent';
import { useRole } from '@shared/hooks/useRole';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { ProgressDetails } from '@shared/screens/Shared/StudentReport/ProgressDetails';

import { TextWithSkeleton } from './TextWithSkeleton';
import { PerformanceIndicators } from './PerformanceIndicators/PerformanceIndicators';

export const StudentReport = () => {
  const { t } = useTranslation();
  const { isStudent } = useRole();
  const { planId, studentUuid } = useParams<{ planId: string; studentUuid: string }>();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const studentReportQuery = isStudent
    ? STUDENT_REPORT_PROGRESS_BY_STUDENT
    : STUDENT_REPORT_PROGRESS_BY_USER;

  const { data, loading } = useQuery(studentReportQuery, {
    variables: {
      planId,
      studentUuid,
    },
  });

  const { studentReport } = data || {};

  return (
    <MainContent className='pt-xs'>
      <div className='flex flex-col gap-xxs xxxl:gap-xs mb-sm'>
        <h4 className='mb-0 text-base xxxl:text-lg leading-base'>
          {t('studentGoalReport.reportTitle')}
        </h4>
        <div className='flex gap-xs items-center text-xs leading-lg font-medium'>
          <div className='flex items-center gap-xxs'>
            <Avatar
              className='border rounded-full text-neutral-300'
              label={studentReport?.overallData.studentFullName || '- -'}
              size='32'
              theme='light'
            />
            <TextWithSkeleton loading={loading} text={studentReport?.overallData.studentFullName} />
          </div>
          <div className='w-xxs h-xxs rounded-full bg-neutral-400' />
          <TextWithSkeleton loading={loading} text={studentReport?.overallData.planName} />
        </div>
      </div>
      <div className='flex flex-col gap-base xxxl:gap-md'>
        <StudentReportSummary isLoading={loading} overallData={studentReport?.overallData} />
        <ProgressDetails isLoading={loading} plan={studentReport?.plan} />
        <PerformanceIndicators
          data={studentReport?.goalPerformanceIndicatorsData}
          isLoading={loading}
        />
      </div>
    </MainContent>
  );
};
